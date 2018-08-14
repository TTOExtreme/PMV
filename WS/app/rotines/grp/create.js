var db = require('../../mysql/connector');
var bcypher = require('../key/crypto');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');
var guid = require('../../rotines/usr/get_id_user');

const insert = (name, creator, heredity) => {
    if (!name || !creator) { return ""; }
    if (heredity == null) { heredity = 0; }
    var uid = guid(creator);
    if (uid == -1) { return "fail"; }

    var sql = "INSERT INTO " + dbnames.dbnames.database_name + '.' + dbnames.dbnames.grouptable +
        " (grp_name,grp_crt_usr,heranca) VALUES ('" + name + "','" + uid + "','" + heredity + "')";

    db.query(sql);
    return ("created");
};

module.exports = insert;