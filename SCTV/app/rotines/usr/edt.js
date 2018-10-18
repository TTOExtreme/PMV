var db = require('../../mysql/connector');
var bcypher = require('../key/bcypher');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');

const insert = (usero, usr, name, matricula, cpf) => {
    if (!usr || !usero || !name || !matricula || !cpf) { return ""; }

    var sql = "UPDATE " + dbnames.dbnames.database_name + '.' + dbnames.dbnames.usertable +
        " SET `user`='" + usr +
        "', `usr_name`='" + name +
        "', `matric`='" + matricula +
        "', `cpf`='" + cpf + "' WHERE `user`='" + usero + "'";

    db.query(sql);
    return ("modified");
};

module.exports = insert;