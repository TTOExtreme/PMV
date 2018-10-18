var mysql = require('sync-mysql');
var cfg = require('../../config/index');

var connection = new mysql(cfg.db);

module.exports = connection;



/*var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "prt_adm",
    password: "8t9t3o0l2r1c"
});

module.exports = connection;
//*/