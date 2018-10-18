var db = require('../../mysql/connector');
var bcypher = require('../key/bcypher');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');

const insert = (usr, pass) => {
    if (!usr || !pass) { return ""; }

    var sql = "UPDATE " + dbnames.dbnames.database_name + '.' + dbnames.dbnames.usertable +
        " SET `pass`='" + bcypher.passcrypt(pass) + "' WHERE `user`='" + usr + "'";

    db.query(sql);
    return ("added");
};

module.exports = insert;