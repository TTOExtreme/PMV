var db = require('../../mysql/connector');
var bcypher = require('../key/crypto');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');
var guid = require('../../rotines/usr/get_id_user');

const insert = (send, ret, user, route, success, worktime) => {

    var sql = "INSERT INTO " + dbnames.dbnames.database_name + '.' + dbnames.dbnames.log +
        " (user,ret,sen,route,success,worktime) VALUES ('" + user + "','" + ret + "','" + send + "','" + route + "'," + success + ",'" + worktime + "')";

    db.query(sql);
    return;
};

module.exports = insert;