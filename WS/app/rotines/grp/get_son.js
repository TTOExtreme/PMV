var db = require('../../mysql/db_execute');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');

function exe(grp) {
    if (grp != undefined) {

        var sql = "SELECT grps_id FROM " + dbnames.dbnames.database_name + "." + dbnames.dbnames.rltgroupgroup + " WHERE `grpf_id`='" + grp + "';"
        var results = db(sql);
        if (results == "") { return -1; }

        var rows = [];
        rows = Object.keys(results).map(i => JSON.parse(JSON.stringify(results[i])));
        if (rows[0] == undefined) { return -1 }
        var v = [];

        return rows;
    }
    return -1;
}

module.exports = exe;