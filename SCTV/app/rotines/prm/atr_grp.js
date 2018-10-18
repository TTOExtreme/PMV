var db = require('../../mysql/db_execute');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');
var guid = require('../usr/get_id_user');
var gpid = require('./prm_id');

function exe(usrid, prmid) {
    if (usrid == -1 || prmid == -1) { return ("fail to add permission") }

    var sql = "INSERT INTO " + dbnames.dbnames.database_name + '.' + dbnames.dbnames.rltpermissiongroup +
        " (grp_id, prm_id) VALUES ('" + usrid + "','" + prmid + "');";

    var v = db(sql);
    return ("added");
};


module.exports = exe;