var db = require('../../mysql/connector');
var dbnames = require('../../../config/db');
var keyger = require('./key_generate');
var key1 = require('./key_get');
var cfg = require('../../../config')

const insert = (passkey) => {
    var sql = 'INSERT INTO ' + dbnames.dbnames.database_name + '.' + dbnames.dbnames.cryptkey + " (`io`) VALUES ('" + passkey + "');";
    var r = db.query(sql);
    return;
};

module.exports = insert;