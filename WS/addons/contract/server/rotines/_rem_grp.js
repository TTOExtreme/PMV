var db = require('../../../../app/mysql/db_execute');
var dbnames = require('../../../../config/db');
var cfg = require('../db');

function exe(grp_id, ctrct_id) {

    var sql = "DELETE FROM " + dbnames.dbnames.database_name + "." + cfg.dbnames.ctrct_rlt_grp +
        " WHERE `grp_id`=" + grp_id + " AND`ctrct_id`=" + ctrct_id + ";";
    db(sql);
    return "removed";
}

module.exports = exe;