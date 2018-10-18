var db = require('../../mysql/connector');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');

const insert = (id, name, desc) => {
    if (!name || !desc) { return ""; }

    var sql = "INSERT INTO " + dbnames.dbnames.database_name + '.' + dbnames.dbnames.permissiontable +
        " (id_prm,permission,prm_desc) VALUES ('" + id + "','" + name + "','" + desc + "')";

    db.query(sql);
    return ("created");
};

module.exports = insert;