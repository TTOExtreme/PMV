var db = require('../../mysql/connector');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');
var ggid = require('../../rotines/grp/get_id_name');
var ggb = require('../../rotines/grp/get_father');

function exe(grps, grpf) {
    if (grps == undefined || grpf == undefined) { return ("fail to add group to group {" + grps + ">" + grpf + "}") }
    var usrid = ggid(grps);
    var grpid = ggid(grpf);
    if (ggb(usrid) > -1) {
        return "rlt_grp_exist";
    }
    if (usrid == -1 || grpid == -1) { if (cfg.cfg.debug) { console.log("fail to add group to group {" + grps + ">" + grpf + "}"); } return "rlt_grp_exist" }

    var sql = "INSERT INTO " + dbnames.dbnames.database_name + '.' + dbnames.dbnames.rltgroupgroup +
        " (grps_id, grpf_id) VALUES ('" + usrid + "','" + grpid + "');";

    db.query(sql);
    return ("added");
}

module.exports = exe;