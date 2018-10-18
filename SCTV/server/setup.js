var db = require('../config/db');
var dbase = require('../app/mysql/db_execute');
var pcr = require('../app/rotines/prm/create');
var ptu = require('../app/rotines/prm/prm_usr_id');
var colors = require('colors');

function exe() {
    var sql = "CREATE DATABASE IF NOT EXISTS " + db.dbnames.database_name + ";";
    console.log(sql.green)
    dbase(sql)
    db.database.forEach(function (value) {
        console.log(colors.gray(value))
        sql = "CREATE TABLE IF NOT EXISTS ";
        sql += db.dbnames.database_name + '.' + value.tname + "(";
        var i = true;
        value.tcols.forEach(function (value) {
            if (i) { i = false; } else { sql += ' , '; }
            sql += value.cname + ' ' + value.ctype;
        })
        sql += ');'
        console.log(sql.green)
        dbase(sql);
    });
    var i = 100;
    db.permList.forEach(function (v) {
        console.log(colors.gray(v))
        pcr(i, v.name, v.desc);
        ptu(1, v.name);
        i++;
    })
}
exe();
module.exports = exe;