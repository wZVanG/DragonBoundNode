"use strict";
process.title = 'node-server';
var sv = require('./serverapp.js');
var User = require('./user.js');
var OPCODE = require("./define.js");
var Room = require("./room.js");
var e = [];
var ver = 41;
var Users = [];
var Rooms = [];
sv.SetHandler("connected", function(index) {
    console.log("[DragonSocket] Connected");
    var data = [OPCODE.SERVER.hi, ver, "Beginners", 0, 0];
    sv.SendData(index, data);
});
sv.SetHandler("disconnected", function(index) {
    console.log("[DragonSocket] Disconnected");
});
sv.SetHandler("error", function(a) {
    console.log("[DragonSocket] Error:", a)
});
e[OPCODE.CLIENT.login] = function(index, data) {
    console.log("index: " + index + " : " + data);
    var tUser = new User(data[1], data[2], index);
    Users[index] = tUser;
    var data = [OPCODE.SERVER.login_profile];
    sv.SendData(index, data);
    data = [OPCODE.SERVER.login_avatars];
    sv.SendData(index, data);
    sv.SendData(index, tUser.GetPlayerInfo());
	UpdateBoddy(index);
};
e[OPCODE.CLIENT.chat] = function(index, data) {
    var ur = Users[index];
	var msj = data[0];
	var type = data[1];
	var datas = [OPCODE.SERVER.chat, msj, ur.GetGameID(), type];
	
	if (ur.rank == 24)
	{
	    datas[3] = 5;
	}
	
	if (ur.guild != 0)
	{
	    datas[4] = ur.guild;
	}
    
    sv.SendDataAll(index, datas, false);
};
e[OPCODE.CLIENT.change_name] = function(index, data) {
    var name = data[0];
	Users[index].game_id = name;
	sv.SendData(index, Users[index].GetPlayerInfo());
	UpdateBoddy(index);
};
e[OPCODE.CLIENT.room_create] = function(index, data) {
    var rom = new Room();
    if (rom.Create(data[0], data[1], data[2], data[3])) {
        var dat = [OPCODE.SERVER.enter_room];
        sv.SendData(index, dat);
        var id = Rooms.push(rom);
        rom.SetID(id);
        rom.Join(Users[index], true);
        sv.SendData(index, rom.GetState());
        UpdateListRooms(index);
        //var d = rom.UpdateSlot(Users[index]);
        //sv.SendData(index, d);
        SendRoomPlayers(index, rom);
    }
};
e[OPCODE.CLIENT.room_join] = function(index, data) {
    //var d = rom.UpdateListRooms(index);
    console.log("data: " + data);
};

e[OPCODE.CLIENT.room_change_ready] = function(index, data) {
	var dat = [OPCODE.SERVER.changed_ready, Users[index].id, data[0]];
	Users[index].is_ready = data[0] == true ? 1: 0;
	sv.SendData(index, dat);
};

e[OPCODE.CLIENT.mobile] = function(index, data) {
    var dat = [OPCODE.SERVER.changed_mobile, Users[index].id, data[0]];
	Users[index].mobile = data[0];
	sv.SendData(index, dat);
};

function SendRoomPlayers(index, rom) {
    sv.SendData(index, rom.GetPlayers());
}

function UpdateListRooms(index) {
    var romx = [];
    Rooms.forEach(function(rom) {
        var dt = rom.toList();
        romx.push(dt);
    });
    var dat = [OPCODE.SERVER.rooms_list, romx, 0, 0];
    sv.SendDataAll(index, dat, false);
}

function UpdateBoddy(index) {
    var dat = [OPCODE.SERVER.channel_players,[]];
	var i = 0;
	Users.forEach(function(us) {
	    dat[1][i++] = us.id;
		dat[1][i++] = us.game_id;
		dat[1][i++] = us.rank;
		dat[1][i++] = us.guild;
	});
	sv.SendDataAll(index, dat, false);
}
sv.SetHandler("receive", Object.freeze(e));