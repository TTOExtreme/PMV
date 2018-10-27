var db = require('../../../../app/mysql/db_execute');
var dbnames = require('../../../../config/db');
var cfg = require('../db');
var ins = require('./_add_file_ctract');
var insa = require('./_add_adtiv');

function exe(usr_id, id_old, id_new) {
    var f = get_files(id_old);
    for (i = 0; i < f.length; i++) {
        ins(usr_id, id_new, "FROM_UNIXTIME('" + f[i].data.replace("T", " ").replace("Z", " ") + "')", f[i].file);
    }
    var f = get_adtiv(id_old);
    for (i = 0; i < f.length; i++) {
        insa(usr_id, f[i].value, id_new, "FROM_UNIXTIME('" + f[i].data.replace("T", " ").replace("Z", " ") + "')", f[i].file);
    }
    return "copy"
}

module.exports = exe;


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