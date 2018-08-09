var db = require('../../../../app/mysql/db_execute');
var dbnames = require('../../../../config/db');
var cfg = require('../db');

var crt = require('./_add_adtiv');

function exe(ctx, next) {
    ctx.body.route += ",Add_Adtiv";
    var usrid = ctx.body.data.id;

    var ret = "error_incode";

    var n = ctx.body.data.data.id;
    var f = ctx.body.data.data.file;
    var v = ctx.body.data.data.value;
    var d = "'" + ctx.body.data.data.ini_data + "'";
    if (n != undefined &&
        d != undefined &&
        v != undefined &&
        f != undefined
    ) {
        ret = crt(usrid, v, n, d, f);
    }
    ctx.body.data.data = { data: ret, status: "pong" };
    next();
}

module.exports = exe;