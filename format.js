/**
 * Created by CarlosX on 21/06/2014.
 */
var _ = require('underscore'),
    Types = require("./gametypes");

(function() {
    FormatChecker = Class.extend({
        init: function() {
            this.formats = [];
            this.formats[Types.Messages.CLIENT.login] = ['n', 'n', 's', 'n', 'n']
            this.formats[Types.Messages.CLIENT.chat]  = ['s', 'n']
        },

        check: function(msg) {
            var message = msg.slice(0),
                type = message[0],
                format = this.formats[type];

            message.shift();

            if(format) {
                if(message.length !== format.length) {
                    return false;
                }
                for(var i = 0, n = message.length; i < n; i += 1) {
                    if(format[i] === 'n' && !_.isNumber(message[i])) {
                        return false;
                    }
                    if(format[i] === 's' && !_.isString(message[i])) {
                        return false;
                    }
                }
                return true;
            }
            /*else if(type === Types.Messages.WHO) {
                // WHO messages have a variable amount of params, all of which must be numbers.
                return message.length > 0 && _.all(message, function(param) { return _.isNumber(param) });
            }*/
            else {
                log.error("Unknown message type: "+type);
                return false;
            }
        }
    });

    var checker = new FormatChecker;

    exports.check = checker.check.bind(checker);
})();