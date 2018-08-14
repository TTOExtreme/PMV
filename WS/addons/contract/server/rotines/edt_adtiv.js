var db = require('../../../../app/mysql/db_execute');
var dbnames = require('../../../../config/db');
var cfg = require('../db');

var crt = require('./_edt_adtiv');

function exe(ctx, next) {
    ctx.body.route += ",Edt_Adtiv";
    var usrid = ctx.body.data.id;

    var ret = "error_incode";

    var n = ctx.body.data.data.id;
    var i = ctx.body.data.data.ini_data;
    var f = ctx.body.data.data.file;
    var v = ctx.body.data.data.value;
    if (n != undefined &&
        f != undefined &&
        v != undefined
    ) {
        ret = crt(usrid, v, i, n, f);
    }
    ctx.body.data.data = { data: ret, status: "pong" };
    next();
}

module.exports = exe;