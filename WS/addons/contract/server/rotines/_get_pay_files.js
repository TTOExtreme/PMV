var db = require('../../../../app/mysql/db_execute');
var dbnames = require('../../../../config/db');
var cfg = require('../db');

function exe(rows) {

    for (i = 0; i < rows.length; i++) {
        rows[i].pays = get_pay(rows[i].id_ctrct);
        rows[i].files = get_files(rows[i].id_ctrct);
        rows[i].adtiv = get_adtiv(rows[i].id_ctrct);
    }
    return rows;
}

function get_pay(id) {
    var sql = "SELECT * FROM " + dbnames.dbnames.database_name + "." + cfg.dbnames.pay_table + " WHERE `ctrct_id`=" + id + ";";
    var results = db(sql);
    var rows = [];

    rows = Object.keys(results).map(i => JSON.parse(JSON.stringify(results[i])));
    if (rows[0] == undefined) { rows = [] }
    return rows;
}

function get_files(id) {
    var sql = "SELECT * FROM " + dbnames.dbnames.database_name + "." + cfg.dbnames.ctrct_rlt_file + " WHERE `ctrct_id`=" + id + ";";
    var results = db(sql);
    var rows = [];

    rows = Object.keys(results).map(i => JSON.parse(JSON.stringify(results[i])));
    if (rows[0] == undefined) { rows = [] }
    return rows;
}

function get_adtiv(id) {
    var sql = "SELECT * FROM " + dbnames.dbnames.database_name + "." + cfg.dbnames.ctrct_rlt_adtiv + " WHERE `ctrct_id`=" + id + ";";
    var results = db(sql);
    var rows = [];

    rows = Object.keys(results).map(i => JSON.parse(JSON.stringify(results[i])));
    if (rows[0] == undefined) { rows = [] }
    return rows;
}

module.exports = exe;