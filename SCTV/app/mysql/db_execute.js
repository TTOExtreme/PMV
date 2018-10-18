var db = require('./connector');
var cfg = require('../../config/index')

const insert = (sql) => {
    var r = db.query(sql);
    return r;
};

module.exports = insert;