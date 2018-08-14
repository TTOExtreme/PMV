var db = require('../../../../app/mysql/db_execute');
var dbnames = require('../../../../config/db');
var cfg = require('../db');

function exe(user_id, value, data, pay_id, file) {

    var sql = "UPDATE " + dbnames.dbnames.database_name + "." + cfg.dbnames.pay_table +
        " SET `crt_usr_id`=" + user_id + ",`value`=" + value + ",`data`='" + data + "' ,`file`='" + file + "' WHERE `id_pay`=" + pay_id + ";";
    var r = db(sql);
    return "modified";
}

module.exports = exe;