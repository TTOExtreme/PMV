var db = require('../../mysql/db_execute');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');

function exe(grp) {
    if (grp != undefined) {

        var sql = "SELECT * FROM " + dbnames.dbnames.database_name + "." + dbnames.dbnames.rltgroupgroup + " WHERE `grps_id`='" + grp + "';"
        var results = db(sql);
        if (results == "") { return -1; }

        var rows = [];
        rows = Object.keys(results).map(i => JSON.parse(JSON.stringify(results[i])));
        if (rows[0] == undefined) { return -1 }
        var v;
        rows.forEach(function(value) {
            if (value.grps_id == '' || value.grps_id == undefined) { return -1; }
            v = value.grpf_id;
            return;
        });
        return v;
    }
    return -1;
}

module.exports = exe;