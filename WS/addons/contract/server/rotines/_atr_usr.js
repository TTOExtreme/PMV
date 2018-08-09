var db = require('../../../../app/mysql/db_execute');
var dbnames = require('../../../../config/db');
var cfg = require('../db');

function exe(usr_id, ctrct_id) {

    var sql = "INSERT INTO " + dbnames.dbnames.database_name + "." + cfg.dbnames.ctrct_rlt_usr +
        " (usr_id,ctrct_id) VALUES (" + usr_id + "," + ctrct_id + ");";
    db(sql);
    return "added";
}

module.exports = exe;