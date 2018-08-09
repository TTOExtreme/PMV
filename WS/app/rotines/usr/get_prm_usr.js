var db = require('../../mysql/db_execute');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');
var guid = require('./get_id_user');
var gpid = require('../prm/prm_get');

function exe(userid) {
    if (userid == -1) { return ("fail") }
    var sql = "SELECT * FROM " + dbnames.dbnames.database_name + '.' + dbnames.dbnames.rltpermissionuser +
        " RIGHT JOIN " + dbnames.dbnames.database_name + '.' + dbnames.dbnames.permissiontable + " ON prm_id=id_prm WHERE usr_id='" + userid + "' ;";
    var results = db(sql);
    if (results == "") { return -1; }
    var rows = [];
    rows = Object.keys(results).map(i => JSON.parse(JSON.stringify(results[i])));
    if (rows[0] == undefined) { return -1 }
    var v = [];
    for (i = 0; i < rows.length; i++) {
        if (rows[i].prm_id == '' || rows[i].prm_id == undefined) { return -1; }
        v.push({ name: rows[i].permission, desc: rows[i].prm_desc });
    }
    return JSON.stringify(v);
};


module.exports = exe;