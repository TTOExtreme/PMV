var db = require('../../mysql/db_execute');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');

function exe(usr) {
    if (usr != undefined) {
        var sql = "SELECT grp_id FROM " + dbnames.dbnames.database_name + "." + dbnames.dbnames.rltgroupuser + " WHERE `usr_id`='" + usr + "';"
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