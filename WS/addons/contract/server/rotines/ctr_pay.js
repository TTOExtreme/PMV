var db = require('../../../../app/mysql/db_execute');
var dbnames = require('../../../../config/db');
var cfg = require('../db');

var crt = require('./_ctr_pay');

function exe(ctx, next) {
    ctx.body.route += ",Crt_Pay";
    var usrid = ctx.body.data.id;

    var ret = "error_incode";

    var n = ctx.body.data.data.id_ctrct;
    var i = ctx.body.data.data.ini_data;
    var v = ctx.body.data.data.value;
    var f = ctx.body.data.data.file;
    if (n != undefined &&
        i != undefined &&
        v != undefined &&
        f != undefined
    ) {
        ret = crt(usrid, v, i, n, f);
    }
    ctx.body.data.data = { data: ret, status: "pong" };
    next();
}

module.exports = exe;