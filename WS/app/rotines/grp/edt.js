var db = require('../../mysql/connector');
var bcypher = require('../key/crypto');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');
var guid = require('../../rotines/usr/get_id_user');

const insert = (name, namen, heredity) => {
    if (!name || !namen) { return ""; }
    if (heredity == null) { heredity = 0; }

    var sql = "UPDATE " + dbnames.dbnames.database_name + '.' + dbnames.dbnames.grouptable +
        " SET `grp_name`='" + namen + "',`heranca`='" + heredity + "' WHERE `grp_name`='" + name + "'";

    db.query(sql);
    return ("modified");
};

module.exports = insert;