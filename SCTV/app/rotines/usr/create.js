var db = require('../../mysql/connector');
var bcypher = require('../key/bcypher');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');

const insert = (usr, pass, name, matricula, cpf) => {
    if (!usr || !pass || !matricula || !cpf) { return ""; }

    var sql = "INSERT INTO " + dbnames.dbnames.database_name + '.' + dbnames.dbnames.usertable +
        " (user,pass,usr_name,matric,cpf) VALUES ('" + usr + "','" + bcypher.passcrypt(pass) + "','" + name + "','" + matricula + "','" + cpf + "')";

    db.query(sql);
    return ("created");
};

module.exports = insert;