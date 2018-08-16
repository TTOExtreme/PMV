var db = require('../../../../app/mysql/db_execute');
var dbnames = require('../../../../config/db');
var cfg = require('../db');

var ggs = require('../../../../app/rotines/grp/get_son');

var gpf = require('./_get_pay_files');

function exe(usrid) {

    var res = [];

    sql = "SELECT * FROM " + dbnames.dbnames.database_name + "." + cfg.dbnames.ctrct_table +
        " LEFT JOIN " + dbnames.dbnames.database_name + "." + cfg.dbnames.ctrct_rlt_grp +
        " ON " + cfg.dbnames.ctrct_rlt_grp + ".ctrct_id=id_ctrct" +
        " LEFT JOIN " + dbnames.dbnames.database_name + "." + cfg.dbnames.ctrct_rlt_usr +
        " ON " + cfg.dbnames.ctrct_rlt_usr + ".ctrct_id=id_ctrct" +
        " WHERE `grp_id` IS NULL AND " + cfg.dbnames.ctrct_rlt_usr + ".usr_id IS NULL;";

    var rows = [];
    var results = db(sql);
    rows = Object.keys(results).map(i => JSON.parse(JSON.stringify(results[i])));
    if (rows[0] == undefined) { rows = [] }
    res.push.apply(res, rows);

    var sql = "SELECT * FROM " + dbnames.dbnames.database_name + "." + cfg.dbnames.ctrct_table +
        " LEFT JOIN " + dbnames.dbnames.database_name + "." + cfg.dbnames.ctrct_rlt_usr +
        " ON " + cfg.dbnames.ctrct_rlt_usr + ".ctrct_id=id_ctrct" +
        " WHERE " + cfg.dbnames.ctrct_rlt_usr + ".usr_id=" + usrid + ";";
    var rows = [];
    var results = db(sql);
    rows = Object.keys(results).map(i => JSON.parse(JSON.stringify(results[i])));
    if (rows[0] == undefined) { rows = [] }
    res.push.apply(res, rows);

    res = gpf(res);

    return res;
}

module.exports = exe;