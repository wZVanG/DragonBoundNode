/**
 * Created by CarlosX on 21/06/2014.
 */
var cls = require("./lib/class"),
    _ = require("underscore"),
    Utils = require("./utils"),
    Types = require("./gametypes");

var Messages = {};
module.exports = Messages;

var Message = cls.Class.extend({
});

Messages.Chat = Message.extend({
    init: function(player, message, type) {
        this.gameid = player.game_id;
        this.rank = player.rank;
        this.guild = player.guild;
        this.message = message;
        this.type = type;
    },
    serialize: function() {
        return [Types.Messages.SERVER.chat,
            this.message,
            this.gameid,
            this.rank == 24 ? 5 : this.type,
            this.guild ? this.guild : null
        ];
    }
});