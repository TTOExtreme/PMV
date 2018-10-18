var db = require('../../mysql/db_execute');
var bcypher = require('../key/bcypher');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');

function exe(usr) {
    if (usr != undefined) {
        var sql = "SELECT * FROM " + dbnames.dbnames.database_name + "." + dbnames.dbnames.usertable + " WHERE `user`='" + usr + "';"
        var results = db(sql);
        if (results == "") { return -1; }

        var rows = [];
        rows = Object.keys(results).map(i => JSON.parse(JSON.stringify(results[i])));
        if (rows[0] == undefined) { return -1 }
        var v;
        rows.forEach(function(value) {
            if (value.id_usr == '' || value.id_usr == undefined) { return -1; }
            v = bcypher.passdecrypt(value.pass);
            return;
        });
        return v;
    }
    return -1;
}

module.exports = exe;