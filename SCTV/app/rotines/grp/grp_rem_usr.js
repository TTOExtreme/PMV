var db = require('../../mysql/connector');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');
var guid = require('../../rotines/usr/get_id_user');
var ggid = require('../../rotines/grp/get_id_name');
var ggu = require('../../rotines/grp/get_id_name');

function exe(usr, grp) {
    if (usr == null || grp == null) { return ("fail") }
    var usrid = guid(usr);
    var grpid = ggu(grp);
    if (usrid == -1 || grpid == -1) { return ("fail_ne") }

    var sql = "DELETE FROM " + dbnames.dbnames.database_name + '.' + dbnames.dbnames.rltgroupuser +
        " WHERE `usr_id`=" + usrid + " AND `grp_id`=" + grpid + ";";

    db.query(sql);
    return ("removed");
}

module.exports = exe;