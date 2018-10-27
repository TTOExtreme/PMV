var db = require('../../../../app/mysql/db_execute');
var dbnames = require('../../../../config/db');
var cfg = require('../db');

function exe(pay_id) {

    var sql = "DELETE FROM " + dbnames.dbnames.database_name + "." + cfg.dbnames.pay_table +
        " WHERE `pay_id`=" + pay_id + ";";
    db(sql);
    return "removed";
}

module.exports = exe;