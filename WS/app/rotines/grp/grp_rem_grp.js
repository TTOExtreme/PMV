var db = require('../../mysql/connector');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');
var guid = require('../../rotines/usr/get_id_user');
var ggid = require('../../rotines/grp/get_id_name');
var ggu = require('../../rotines/grp/get_grp_usrid');

function exe(grp, grpf) {

    var sql = "DELETE FROM " + dbnames.dbnames.database_name + '.' + dbnames.dbnames.rltgroupgroup +
        " WHERE `grpf_id`=" + grpf + " AND `grps_id`=" + grp + ";";

    db.query(sql);
    return ("removed");
}

module.exports = exe;