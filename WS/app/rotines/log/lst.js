var db = require('../../mysql/db_execute');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');
var color = require('colors');

function exe(index) {
    var d1 = new Date().getTime();
    var sql = "SELECT id,user,data,route,success,worktime FROM " + dbnames.dbnames.database_name + "." + dbnames.dbnames.log + " ORDER BY `id` DESC LIMIT 50;";

    var results = db(sql);
    if (results == "") { return []; }
    var rows = [];
    rows = Object.keys(results).map(i => JSON.parse(JSON.stringify(results[i])));
    if (rows[0] == undefined) { return [] }
    var tout = new Date().getTime();
    console.log(color.green("" + (tout - d1) + " M"));
    return rows;
}

module.exports = exe;