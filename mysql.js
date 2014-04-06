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
}
MySql.prototype.Querry = function(sql, callback) {
    _conn.query(sql, function(error, result, fields) {
        if (error) {
            console.log("MySql: " + error);
        } else {
            callback(result);
        }
    });
}
module.exports = MySql;