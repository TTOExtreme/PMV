var db = require('../../../../app/mysql/db_execute');
var dbnames = require('../../../../config/db');
var cfg = require('../db');

function exe(id_file) {

    var sql = "DELETE FROM " + dbnames.dbnames.database_name + "." + cfg.dbnames.ctrct_rlt_file +
        " WHERE id_file=" + id_file + ";";
    db(sql);
    return "deleted";
}

module.exports = exe;