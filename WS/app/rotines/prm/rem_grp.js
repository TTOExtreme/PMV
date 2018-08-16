var db = require('../../mysql/db_execute');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');
var guid = require('../usr/get_id_user');
var gpid = require('./prm_id');

function exe(usrid, prmid) {
    if (usrid == -1 || prmid == -1) { return ("fail to remove permission") }

    var sql = "DELETE FROM " + dbnames.dbnames.database_name + '.' + dbnames.dbnames.rltpermissiongroup +
        " WHERE `grp_id`='" + usrid + "' AND `prm_id`='" + prmid + "';";

    var v = db(sql);
    return ("removed");
};


module.exports = exe;