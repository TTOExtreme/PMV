var db = require('../../../../app/mysql/db_execute');
var dbnames = require('../../../../config/db');
var cfg = require('../db');

function exe(id) {

    var sql = "SELECT * FROM " + dbnames.dbnames.database_name + "." + cfg.dbnames.ctrct_table + " WHERE `id_ctrct`=" + id + ";";
    var results = db(sql);
    if (results == "") { return -1; }
    var rows = [];

    rows = Object.keys(results).map(i => JSON.parse(JSON.stringify(results[i])));
    if (rows[0] == undefined) { return -1 }
    if (rows[0].id_ctrct != undefined) {
        return rows[0]
    }
    return -1;
}

module.exports = exe;