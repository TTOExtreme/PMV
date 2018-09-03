var db = require('../../../../app/mysql/db_execute');
var dbnames = require('../../../../config/db');
var cfg = require('../db');
var colors = require("colors");

function exe(rows) {

    for (i = 0; i < rows.length; i++) {
        rows[i].pays = get_pay(rows[i].id_ctrct);
        rows[i].files = get_files(rows[i].id_ctrct);
        rows[i].adtiv = get_adtiv(rows[i].id_ctrct);
        rows[i].username = get_username(rows[i].usr_id);
        rows[i].groupname = get_groupname(rows[i].grp_id);

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

function get_username(id) {
    var rows = [];
    if (id != undefined) {
        var sql = "SELECT id_usr,usr_name,user,matric,cpf,last_login,grp_id FROM " + dbnames.dbnames.database_name + "." + dbnames.dbnames.usertable +
            " LEFT JOIN " + dbnames.dbnames.database_name + "." + dbnames.dbnames.rltgroupuser + " ON `usr_id`=`id_usr` WHERE `id_usr`=" + id + ";";
        var results = db(sql);
        rows = Object.keys(results).map(i => JSON.parse(JSON.stringify(results[i])));
        if (rows[0] == undefined) { rows = [] }
    }
    return rows;
}

function get_groupname(id) {
    var rows = [];
    if (id != undefined) {
        var sql = "SELECT * FROM " + dbnames.dbnames.database_name + "." + dbnames.dbnames.grouptable + " WHERE `id_grp`=" + id + ";";
        var results = db(sql);
        rows = Object.keys(results).map(i => JSON.parse(JSON.stringify(results[i])));
        if (rows[0] == undefined) { rows = [] }
    }
    return rows;
}
module.exports = exe;