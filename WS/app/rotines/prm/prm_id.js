var db = require('../../mysql/db_execute');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');

function exe(usr) {
    if (usr != undefined) {

        var sql = "SELECT * FROM " + dbnames.dbnames.database_name + "." + dbnames.dbnames.permissiontable + " WHERE `permission`='" + usr + "';"
        var results = db(sql);
        if (results == "") { return -1; }

        var rows = [];
        rows = Object.keys(results).map(i => JSON.parse(JSON.stringify(results[i])));
        if (rows[0] == undefined) { return -1 }
        var v;
        rows.forEach(function(value) {
            if (value.id_prm == '' || value.id_prm == undefined) { return -1; }
            v = value.id_prm
            return v;
        });
        return v;
    }
    return -1;
}

module.exports = exe;