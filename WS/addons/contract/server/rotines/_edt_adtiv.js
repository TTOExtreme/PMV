var db = require('../../../../app/mysql/db_execute');
var dbnames = require('../../../../config/db');
var cfg = require('../db');

function exe(user_id, value, data, adtiv_id, file) {

    var sql = "UPDATE " + dbnames.dbnames.database_name + "." + cfg.dbnames.ctrct_rlt_adtiv +
        " SET `crt_usr_id`=" + user_id + ",`data`='" + data + "' ,`value`='" + value + "' ,`file`='" + file + "' ,`file`='" + file + "' WHERE `id_adtiv`=" + adtiv_id + ";";
    var r = db(sql);
    return "modified";
}

module.exports = exe;