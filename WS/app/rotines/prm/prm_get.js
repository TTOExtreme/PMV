var db = require('../../mysql/db_execute');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');

function exe(usr) {
    if (usr != undefined) {

        var sql = "SELECT * FROM " + dbnames.dbnames.database_name + "." + dbnames.dbnames.permissiontable + " WHERE `id_prm`='" + usr + "';"
        var results = db(sql);
        if (results == "") { return -1; }

        var rows = [];
        rows = Object.keys(results).map(i => JSON.parse(JSON.stringify(results[i])));
        if (rows[0] == undefined) { return -1 }
        var v;
        rows.forEach(function(value) {
            if (value.permission == '' || value.permission == undefined) { return -1; }
            v = {
                "name": value.permission,
                "desc": value.prm_desc
            };
            return;
        });
        return v;
    }
    return -1;
}

module.exports = exe;