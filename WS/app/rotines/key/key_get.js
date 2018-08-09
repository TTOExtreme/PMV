var db = require('../../mysql/connector');
var dbnames = require('../../../config/db')
var cfg = require('../../../config')

const insert = () => {
    var sql = 'SELECT io FROM ' + dbnames.dbnames.database_name + '.' + dbnames.dbnames.cryptkey + ';';
    var results = db.query(sql);
    if (results == "") { return null; }

    var rows = [];
    rows = Object.keys(results).map(i => JSON.parse(JSON.stringify(results[i])));
    if (rows[0] != undefined) {
        return (rows[0].io);
    } else {
        return null
    }

    rows.forEach(function(value) {
        return value.io;
    })
};

module.exports = insert;