var db = require('../../mysql/db_execute');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');
var guid = require('../usr/get_id_user');
var gpid = require('../prm/prm_get');

function exe(grpid) {
    if (grpid == -1) { return "fail"; }

    var sql = "SELECT * FROM " + dbnames.dbnames.database_name + '.' + dbnames.dbnames.rltpermissiongroup +
        " RIGHT JOIN " + dbnames.dbnames.database_name + '.' + dbnames.dbnames.permissiontable + " ON prm_id=id_prm WHERE grp_id='" + grpid + "';";

    var results = db(sql);
    if (results == "") { return []; }
    var rows = [];
    rows = Object.keys(results).map(i => JSON.parse(JSON.stringify(results[i])));
    if (rows[0] == undefined) { return -1 }
    var v = [];
    rows.forEach(function(value) {
        if (value.prm_id == '' || value.prm_id == undefined) { return -1; }
        v.push({ name: value.permission, desc: value.prm_desc });
    });
    return v;
};


module.exports = exe;