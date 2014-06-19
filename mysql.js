var dbsv = require('mysql');
var _conn = dbsv.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'db_erwin'
});

function MySql() {
    console.log('New MySql()');
}
MySql.prototype.Connect = function() {
    if (_conn) {
        _conn.connect(function(err) {
            if (err) {
                console.log('MySql: ' + err);
            } else {
                console.log("MySql: Connect!");
            }
        });
    }
};
MySql.prototype.Query = function(sql, callback) {
    _conn.query(sql, function(error, result, fields) {
        if (error) {
            console.log("MySql: " + error);
        } else {
            callback(result);
        }
    });
};


MySql.prototype.getUserData = function(id, callback){
    var qr = 'SELECT * FROM users u, relationship r, guild_list g, avatars a WHERE u.user_id = ' + id + ' AND r.user_id = u.user_id AND a.user_id = u.user_id AND g.user_id = u.user_id';
    this.Query(qr, function(res){
        return callback(res[0]);
    });
};

module.exports = MySql;