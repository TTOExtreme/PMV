var db = require('../../../../app/mysql/db_execute');
var dbnames = require('../../../../config/db');
var cfg = require('../db');

var crt = require('./_edt_ctract');

function exe(ctx, next) {
    ctx.body.route += ",Edt_Contract";
    var usrid = ctx.body.data.id;

    var ret = "error_incode";

    var on = ctx.body.data.data.id;
    var n = ctx.body.data.data.name;
    var u = ctx.body.data.data.num;
    var d = ctx.body.data.data.desc;
    var i = ctx.body.data.data.ini_data;
    var p = ctx.body.data.data.periodo;
    var np = ctx.body.data.data.npays;
    var v = ctx.body.data.data.value;
    var r = ctx.body.data.data.renewable;
    var f = ctx.body.data.data.file;
    if (on != undefined &&
        n != undefined &&
        u != undefined &&
        d != undefined &&
        i != undefined &&
        p != undefined &&
        np != undefined &&
        v != undefined &&
        r != undefined &&
        f != undefined
    ) {
        ret = crt(usrid, on, n, u, d, i, p, np, v, r, f);
    }
    ctx.body.data.data = { data: ret, status: "pong" };
    next();
}

module.exports = exe;