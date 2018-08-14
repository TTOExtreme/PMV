var db = require('../../mysql/db_execute');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');
var gauth = require('../key/auth_generate');

function exe(usr) {
    if (usr != undefined) {
        var sql = "UPDATE " + dbnames.dbnames.database_name + "." + dbnames.dbnames.usertable + " SET `last_login`=CURRENT_TIMESTAMP WHERE `id_usr`='" + usr + "';"
        db(sql);

        return;
    }
}

module.exports = exe;