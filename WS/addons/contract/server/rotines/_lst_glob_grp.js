var db = require('../../../../app/mysql/db_execute');
var dbnames = require('../../../../config/db');
var cfg = require('../db');

var gpf = require('./_get_pay_files');

function exe(ctx) {

    var sql = "SELECT * FROM " + dbnames.dbnames.database_name + "." + cfg.dbnames.ctrct_table +
        " LEFT JOIN " + dbnames.dbnames.database_name + "." + cfg.dbnames.ctrct_rlt_grp +
        " ON " + cfg.dbnames.ctrct_rlt_grp + ".ctrct_id=id_ctrct" +
        ";";
    var results = db(sql);
    var rows = [];

    rows = Object.keys(results).map(i => JSON.parse(JSON.stringify(results[i])));
    if (rows[0] == undefined) { rows = [] }
    rows = gpf(rows);
    return rows;
}

module.exports = exe;