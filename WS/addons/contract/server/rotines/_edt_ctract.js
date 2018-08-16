var db = require('../../../../app/mysql/db_execute');
var dbnames = require('../../../../config/db');
var cfg = require('../db');

function exe(usr_id, old, name, num, desc, ini_data, period, npays, value, renewable, file) {

    var sql = "UPDATE " + dbnames.dbnames.database_name + "." + cfg.dbnames.ctrct_table +
        " SET `crt_usr_id`='" + usr_id + "',`name`='" + name + "',`num`='" + num + "',`descr`='" + desc + "',`ini_data`='" + ini_data + "',`periodo`='" + period + "',`pay_times`='" + npays + "',`value`='" + value + "',`renewable`='" + renewable + "',`file`='" + file + "' WHERE `id_ctrct`='" + old + "';";
    db(sql);
    return "modified"

}

module.exports = exe;