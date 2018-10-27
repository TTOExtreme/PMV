var db = require('../../../../app/mysql/db_execute');
var dbnames = require('../../../../config/db');
var ctr = require('./_get_ctrct_num');
var cfg = require('../db');

function exe(usr_id, name, num, desc, ini_data, period, npays, value, renewable, file) {

    var sql = "INSERT INTO " + dbnames.dbnames.database_name + "." + cfg.dbnames.ctrct_table +
        " (crt_usr_id,name,num,descr,ini_data,periodo,pay_times,value,renewable,file) VALUES ('" + usr_id + "','" + name + "','" + num + "','" + desc + "','" + ini_data + "','" + period + "','" + npays + "','" + value + "'," + renewable + ",'" + file + "');";
    db(sql);
    return ["created", ctr(num, renewable)];

}

module.exports = exe;