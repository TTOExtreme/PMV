var db = require('../../../../app/mysql/db_execute');
var dbnames = require('../../../../config/db');
var cfg = require('../db');

function exe(id_ctrct) {

    var sql = "DELETE FROM " + dbnames.dbnames.database_name + "." + cfg.dbnames.ctrct_table +
        " WHERE id_ctrct=" + id_ctrct + ";";
    db(sql);
    return "deleted";
}

module.exports = exe;