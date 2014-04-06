var OPCODE = require("./define.js");

function User(id, session, index, a) {
    this.id = id;
    this.session = session;
    this.index = index;
    // if is valid user
    this.user_id = a.user_id;
    this.location_type = a.location_type;
    this.room_number = a.room_number;
    this.game_id = a.game_id;
    this.rank = a.rank;
    this.gp = a.gp;
    this.gold = a.gold;
    this.cash = a.cash;
    this.gender = a.gender;
    this.un_lock = a.un_lock;
    this.photo_url = a.photo_url;
    this.name_changes = a.name_changes;
    this.power_user = a.power_user;
    this.tournament = a.tournament;
    this.plus10gp = a.plus10gp;
    this.mobile_fox = a.mobile_fox;
    this.country = a.country;
    this.flowers = a.flowers;
    this.position = a.position;
    this.is_master = 0;
    this.is_ready = 0;
    this.is_bot = 0;
    this.mobile = a.mobile;
    this.head = a.head;
    this.body = a.body;
    this.eyes = a.eyes;
    this.flag = a.flag;
    this.background = a.background;
    this.foreground = a.foreground;
    this.event1 = a.event1;
    this.event2 = a.event2;
    this.guild = a.guild == "0" ? 0 : a.guild;
    this.guild_job = a.guild_job;
    this.relationship_status = a.relationship_status;
    this.relationship_with_id = a.relationship_with_id;
    this.relationship_with_rank = a.relationship_with_rank;
    this.relationship_with_photo = a.relationship_with_photo;
    this.relationship_with_name = a.relationship_with_name;
    this.relationship_with_gender = a.relationship_with_gender;
    this.avatars = [this.head, this.body, this.eyes, this.flag, this.foreground, this.background];
    this.room_id = -1;
}
User.prototype.GetGameID = function() {
    return this.game_id;
}
User.prototype.GetPlayerInfo = function() {
    var data = [OPCODE.SERVER.my_player_info, [this.user_id, this.location_type, this.room_number, this.game_id, this.rank, this.gp, this.gold, this.cash, this.gender, this.un_lock, this.head, this.body, this.eyes, this.flag, this.background, this.foreground, this.event1, this.event2, this.photo_url, this.guild, this.guild_job, this.name_changes, this.power_user, this.tournament, this.plus10gp, this.mobile_fox, this.country, this.flowers, this.relationship_status, this.relationship_with_id, this.relationship_with_rank, this.relationship_with_photo, this.relationship_with_name, this.relationship_with_gender]];
    return data;
}
User.prototype.UpdateAvatars = function() {
    this.avatars = [this.head, this.body, this.eyes, this.flag, this.foreground, this.background];
}
User.prototype.UpdateRoomNumber = function(id) {
    this.room_number = id;
}
module.exports = User;