var db = require('../../mysql/db_execute');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');

function exe(grp) {
    if (grp != undefined) {
        var sql = "SELECT id_grp FROM " + dbnames.dbnames.database_name + "." + dbnames.dbnames.grouptable + " WHERE `grp_name`='" + grp + "';"
        var results = db(sql);
        if (results == "") { return -1; }

        var rows = [];
        rows = Object.keys(results).map(i => JSON.parse(JSON.stringify(results[i])));
        if (rows[0] == undefined) { return -1 }
        var v;
        rows.forEach(function(value) {
            if (value.id_grp == '' || value.id_grp == undefined) { return; }
            v = (value.id_grp);
            return;
        });
        return v;
    }
    return -1;
}

module.exports = exe;