var db = require('../../mysql/db_execute');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');
var gpid = require('../prm/prm_get');

function exe() {
    var sql = "SELECT * FROM " + dbnames.dbnames.database_name + '.' + dbnames.dbnames.rltpermissionuser +
        "  RIGHT JOIN " + dbnames.dbnames.database_name + '.' + dbnames.dbnames.permissiontable + " ON prm_id=id_prm;";

    var results = db(sql);
    if (results == "") { return -1; }
    var rows = [];
    rows = Object.keys(results).map(i => JSON.parse(JSON.stringify(results[i])));
    if (rows[0] == undefined) { return -1 }
    var v = new Array();
    rows.forEach(function(value) {
        if (value.prm_id == '' || value.prm_id == undefined) { return -1; }
        v.push({ name: value.permission, desc: value.prm_desc });
    });
    return JSON.stringify(v);
};


module.exports = exe;