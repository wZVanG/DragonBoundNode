var OPCODE = require("./define.js");

function User(id, session, index) {
        this.id = id;
        this.session = session;
        this.index = index;
        // if is valid user
        this.user_id = 1;
        this.location_type = 1;
        this.room_number = 0;
        this.game_id = "test";
        this.rank = 24;
        this.gp = 0;
        this.gold = 0;
        this.cash = 0;
        this.gender = "m";
        this.unlock = 1;
        this.head = 1;
        this.body = 2;
        this.eyes = 0;
        this.flag = 0;
        this.background = 0;
        this.foreground = 0;
        this.event1 = 0;
        this.event2 = 0;
        this.photo_url = 100000014337670;
        this.guild = 0;
        this.guild_job = 1;
        this.name_changes = 1;
        this.power_user = 0;
        this.tournament = 0;
        this.plus10gp = 0;
        this.mobile_fox = 1;
        this.country = 1;
        this.flowers = 0;
        this.relationship_status = 0;
        this.relationship_with_id = 0;
        this.relationship_with_rank = 0;
        this.relationship_with_photo = 0;
        this.relationship_with_name = "";
        this.relationship_with_gender = "";
        this.position = 0;
        this.guild = "GM";
        this.is_master = 0;
        this.is_ready = 0;
        this.is_bot = 0;
		this.mobile = 0;
        this.avatars = [this.head, this.body, this.eyes, this.flag, this.foreground, this.background];
}
User.prototype.GetGameID = function() {
        return this.game_id;
}
User.prototype.GetPlayerInfo = function() {
        var data = [OPCODE.SERVER.my_player_info, [this.user_id, this.location_type, this.room_number, this.game_id, this.rank, this.gp, this.gold, this.cash, this.gender, this.unlock, this.head, this.body, this.eyes, this.flag, this.background, this.foreground, this.event1, this.event2, this.photo_url, this.guild, this.guild_job, this.name_changes, this.power_user, this.tournament, this.plus10gp, this.mobile_fox, this.country, this.flowers, this.relationship_status, this.relationship_with_id, this.relationship_with_rank, this.relationship_with_photo, this.relationship_with_name, this.relationship_with_gender]];
        return data;
}
module.exports = User;