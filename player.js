/**
 * Created by CarlosX on 21/06/2014.
 */
var cls = require("./lib/class"),
    _ = require("underscore"),
    Utils = require("./utils"),
    check = require("./format").check,
    Messages = require("./message"),
    Types = require("./gametypes");

module.exports = Player = Character.extend({
    init: function(connection, dserver) {
        var self = this;
        this.server = dserver;
        this.connection = connection;
        this.hasEnteredGame = false;
        this.group = 1;
        this._super(this.connection.id, "player");

        this.connection.listen(function(message) {
            var action = parseInt(message[0]);
            log.debug("Received: "+message);

            if(!check(message)) {
                self.connection.close("Invalid "+Types.getMessageTypeAsString(action)+" message format: "+message);
                return;
            }
            if(!self.hasEnteredGame && action == Types.Messages.CLIENT.login){
                self.ver = message[1];
                self.idg  = message[2];
                self.session = message[3];
                MySql.getUserData(self.idg, function(res){
                    self.player_data(res);
                    self.login_profile();
                    self.login_avatars();
                    self.my_player_info();
                    self.server.addPlayer(self);
                    self.server.enter_callback(self);
                    self.hasEnteredGame = true;
                });
            }else if(self.hasEnteredGame && action == Types.Messages.CLIENT.chat){
                var msg = Utils.sanitize(message[1]);
                var type = message[2];
                if(msg && msg !== "") {
                    log.debug("msg: " + msg);
                    self.broadcast(new Messages.Chat(self, msg, type), false);
                }
            }
        });
        this.connection.onClose(function() {
            if(self.exit_callback) {
                self.exit_callback();
            }
        });
    },
    send: function(message) {
        this.connection.send(message);
    },

    broadcast: function(message, ignoreSelf) {
        if(this.broadcast_callback) {
            this.broadcast_callback(message, ignoreSelf === undefined ? true : ignoreSelf);
        }
    },
    onExit: function(callback) {
        this.exit_callback = callback;
    },
    onMessage: function(callback) {
        this.message_callback = callback;
    },

    onBroadcast: function(callback) {
        this.broadcast_callback = callback;
    },

    onBroadcastToZone: function(callback) {
        this.broadcastzone_callback = callback;
    },

    player_data : function(a){
        var self = this;
        self.user_id = a.user_id;
        self.location_type = a.location_type;
        self.room_number = a.room_number;
        self.game_id = a.game_id;
        self.rank = a.rank;
        self.gp = a.gp;
        self.gold = a.gold;
        self.cash = a.cash;
        self.gender = a.gender;
        self.un_lock = a.un_lock;
        self.photo_url = a.photo_url;
        self.name_changes = a.name_changes;
        self.power_user = a.power_user;
        self.tournament = a.tournament;
        self.plus10gp = a.plus10gp;
        self.mobile_fox = a.mobile_fox;
        self.country = a.country;
        self.flowers = a.flowers;
        self.position = a.position;
        self.is_master = 0;
        self.is_ready = 0;
        self.is_bot = 0;
        self.mobile = a.mobile;
        self.head = a.head;
        self.body = a.body;
        self.eyes = a.eyes;
        self.flag = a.flag;
        self.background = a.background;
        self.foreground = a.foreground;
        self.event1 = a.event1;
        self.event2 = a.event2;
        self.guild = a.guild == "0" ? 0 : a.guild;
        self.guild_job = a.guild_job;
        self.relationship_status = a.relationship_status;
        self.relationship_with_id = a.relationship_with_id;
        self.relationship_with_rank = a.relationship_with_rank;
        self.relationship_with_photo = a.relationship_with_photo;
        self.relationship_with_name = a.relationship_with_name;
        self.relationship_with_gender = a.relationship_with_gender;
        self.avatars = [self.head, self.body, self.eyes, self.flag, self.foreground, self.background];
        self.room_id = -1;
    },

    player_info : function(){
        var data = [
            this.user_id,
            this.location_type,
            this.room_number,
            this.game_id,
            this.rank,
            this.gp,
            this.gold,
            this.cash,
            this.gender,
            this.un_lock,
            this.head,
            this.body,
            this.eyes,
            this.flag,
            this.background,
            this.foreground,
            this.event1,
            this.event2,
            this.photo_url,
            this.guild,
            this.guild_job,
            this.name_changes,
            this.power_user,
            this.tournament,
            this.plus10gp,
            this.mobile_fox,
            this.country,
            this.flowers,
            this.relationship_status,
            this.relationship_with_id,
            this.relationship_with_rank,
            this.relationship_with_photo,
            this.relationship_with_name,
            this.relationship_with_gender
        ];
        return data;
    },

    login_profile : function(){
        this.send([Types.Messages.SERVER.login_profile]);
    },
    login_avatars : function(){
        this.send([Types.Messages.SERVER.login_avatars]);
    },
    my_player_info : function(){
        this.send([Types.Messages.SERVER.my_player_info,this.player_info()]);
    }
});
