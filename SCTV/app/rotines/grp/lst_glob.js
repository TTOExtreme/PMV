var db = require('../../mysql/db_execute');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');

var ggf = require('./get_father');
var ggs = require('./get_son');
var ggn = require('./get_name');
var ggu = require('./get_grp_usrid');
var ggh = require('./get_heranca');
var ggc = require('./get_creator');

function exe() {

    var sql = "SELECT * FROM " + dbnames.dbnames.database_name + "." + dbnames.dbnames.grouptable + " LEFT JOIN " + dbnames.dbnames.database_name + "." + dbnames.dbnames.rltgroupgroup + " ON `grps_id`=`id_grp`;"
    var results = db(sql);
    if (results == "") { return -1; }

    var v = [];
    var rows = [];
    rows = Object.keys(results).map(i => JSON.parse(JSON.stringify(results[i])));
    if (rows[0] == undefined) { rows = [] };

    return rows;
}

module.exports = exe;