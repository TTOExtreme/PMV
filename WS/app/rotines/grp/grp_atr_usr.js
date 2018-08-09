var db = require('../../mysql/connector');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');
var guid = require('../../rotines/usr/get_id_user');
var ggid = require('../../rotines/grp/get_id_name');

function exe(usr, grp) {
    if (usr == null || grp == null) { return ("fail") }

    var sql = "INSERT INTO " + dbnames.dbnames.database_name + '.' + dbnames.dbnames.rltgroupuser +
        " (usr_id, grp_id) VALUES ('" + usr + "','" + grp + "');";

    db.query(sql);
    return ("added");
}

module.exports = exe;