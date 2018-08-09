var db = require('../../mysql/connector');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');

const insert = (usr, reason) => {
    if (!usr || !reason) { return "fail"; }
    var sql = "DELETE FROM " + dbnames.dbnames.database_name + '.' + dbnames.dbnames.usertable +
        " WHERE `user`='" + usr + "';";
    db.query(sql);
    return ("deleted");
};

module.exports = insert;