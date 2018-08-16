var db = require('../../../../app/mysql/db_execute');
var dbnames = require('../../../../config/db');
var cfg = require('../db');

function exe(usr_id, ctrct_id, value, ini_data, file) {

    var sql = "INSERT INTO " + dbnames.dbnames.database_name + "." + cfg.dbnames.ctrct_rlt_adtiv +
        " (crt_usr_id,value,ctrct_id,data,file) VALUES ('" + usr_id + "','" + ctrct_id + "'," + value + "," + ini_data + ",'" + file + "');";
    console.log(sql);
    db(sql);
    return "added"

}

module.exports = exe;