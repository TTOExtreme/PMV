var db = require('../../../../app/mysql/db_execute');
var dbnames = require('../../../../config/db');
var cfg = require('../db');

function exe(user_id, value, data, ctrct_id, file) {

    var sql = "INSERT INTO " + dbnames.dbnames.database_name + "." + cfg.dbnames.pay_table +
        " (crt_usr_id,value,ctrct_id,data,file) VALUES (" + user_id + "," + value + "," + ctrct_id + ",'" + data + "','" + file + "');";
    var r = db(sql);
    return "added";
}

module.exports = exe;