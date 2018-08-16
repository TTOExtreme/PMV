var db = require('../../mysql/db_execute');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');
var gauth = require('../key/auth_generate');

function exe(usr) {
    if (usr != undefined) {
        var sql = "SELECT * FROM " + dbnames.dbnames.database_name + "." + dbnames.dbnames.usertable + " WHERE `id_usr`='" + usr + "';"
        var results = db(sql);
        if (results == "") { return -1; }

        var rows = [];
        rows = Object.keys(results).map(i => JSON.parse(JSON.stringify(results[i])));
        if (rows[0] == undefined) { return -1 }
        var v;
        rows.forEach(function(value) {
            if (value.auth == '' || value.auth == undefined || value.auth == null || cfg.cfg.ath_changer) {
                var ath = gauth();
                var sql = "UPDATE " + dbnames.dbnames.database_name + "." + dbnames.dbnames.usertable + " SET `auth`='" + ath + "' WHERE `id_usr`='" + usr + "';"
                db(sql);
                v = ath;
            } else {
                v = (value.auth);
            }
            return;
        });
        return v;
    }
    return -1;
}

module.exports = exe;