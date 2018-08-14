var db = require('../../mysql/db_execute');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');

function exe(grp) {
    if (grp != undefined) {
        var sql = "SELECT usr_id FROM " + dbnames.dbnames.database_name + "." + dbnames.dbnames.rltgroupuser + " WHERE `grp_id`='" + grp + "';"
        var results = db(sql);
        if (results == "") { return []; }

        var rows = [];
        rows = Object.keys(results).map(i => JSON.parse(JSON.stringify(results[i])));
        if (rows[0] == undefined) { return [] }

        return rows;
    }
    return [];
}

module.exports = exe;