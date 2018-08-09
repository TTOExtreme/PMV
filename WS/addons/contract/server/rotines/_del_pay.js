var db = require('../../../../app/mysql/db_execute');
var dbnames = require('../../../../config/db');
var cfg = require('../db');

function exe(id_pay) {

    var sql = "DELETE FROM " + dbnames.dbnames.database_name + "." + cfg.dbnames.pay_table +
        " WHERE id_pay=" + id_pay + ";";
    db(sql);
    return "deleted";
}

module.exports = exe;