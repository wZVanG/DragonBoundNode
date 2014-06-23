/**
 * Created by CarlosX on 21/06/2014.
 */
var fs = require('fs');
GLOBAL.window = GLOBAL;
_ = require('underscore');
Log = require('log');
Ms = require("./mysql");;
MySql = new Ms();

function main(config) {
    var ws = require("./ws")
        DragonServer = require("./DragonServer"),
        Player = require("./Player"),
        DServers = [],
        server = new ws.SocketServer(config.port);

    switch(config.debug_level) {
        case "error":
            log = new Log(Log.ERROR); break;
        case "debug":
            log = new Log(Log.DEBUG); break;
        case "info":
            log = new Log(Log.INFO); break;
    }

    log.info("Starting DragonBound game server...");

    server.onConnect(function (connection) {
        var dserver, connect = function () {
            if(dserver){
                connection.send([9, 48, "Dev", 0, 0]);
                dserver.connect_callback(new Player(connection, dserver));
            }
        };
        dserver = _.detect(DServers, function(dserver) {
            return dserver.playerCount < config.nb_players_per_server;
        });
        connect();
    });
    server.onError(function () {
        log.error(Array.prototype.join.call(arguments, ", "));
    });

    _.each(_.range(config.nb_servers), function(i) {
        var dserver = new DragonServer('Server'+ (i+1), config.nb_players_per_server, server);
        dserver.run();
        DServers.push(dserver);
    });
    process.on('uncaughtException', function (e) {
        log.error('uncaughtException: ' + e);
    });
}
function getConfigFile(path, callback) {
    fs.readFile(path, 'utf8', function(err, json_string) {
        if(err) {
            console.error("Could not open config file:", err.path);
            callback(null);
        } else {
            callback(JSON.parse(json_string));
        }
    });
}
var defaultConfigPath = './config.json',
    customConfigPath = './config_local.json';

process.argv.forEach(function (val, index, array) {
    if(index === 2) {
        customConfigPath = val;
    }
});
getConfigFile(defaultConfigPath, function(defaultConfig) {
    getConfigFile(customConfigPath, function(localConfig) {
        if(localConfig) {
            main(localConfig);
        } else if(defaultConfig) {
            main(defaultConfig);
        } else {
            console.error("Server cannot start without any configuration file.");
            process.exit(1);
        }
    });
});