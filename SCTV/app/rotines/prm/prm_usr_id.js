var db = require('../../mysql/db_execute');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');
var guid = require('../usr/get_id_user');
var gpid = require('./prm_id');

function exe(usr, perm) {
    if (!usr || !perm) { return ("fail to add permission") }
    var usrid = usr;
    var prmid = gpid(perm);
    if (usrid == -1 || prmid == -1) { return ("fail to add permission to user {" + usr + ">" + perm + "}") }

    var sql = "INSERT INTO " + dbnames.dbnames.database_name + '.' + dbnames.dbnames.rltpermissionuser +
        " (usr_id, prm_id) VALUES ('" + usrid + "','" + prmid + "');";

    var v = db(sql);
    return ("added");
};


module.exports = exe;