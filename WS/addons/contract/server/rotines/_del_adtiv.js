var db = require('../../../../app/mysql/db_execute');
var dbnames = require('../../../../config/db');
var cfg = require('../db');

function exe(id_adtiv) {

    var sql = "DELETE FROM " + dbnames.dbnames.database_name + "." + cfg.dbnames.ctrct_rlt_adtiv +
        " WHERE id_adtiv=" + id_adtiv + ";";
    db(sql);
    return "deleted";
}

module.exports = exe;