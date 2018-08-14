var db = require('../../../../app/mysql/db_execute');
var dbnames = require('../../../../config/db');
var cfg = require('../db');

var crt = require('./_cp_anex');

function exe(ctx, next) {
    ctx.body.route += ",Cp_Anex";
    var usrid = ctx.body.data.id;

    var ret = "error_incode";

    var n = ctx.body.data.data.id_old;
    var i = ctx.body.data.data.id_new;
    if (n != undefined &&
        i != undefined
    ) {
        ret = crt(usrid, n, i);
    }
    ctx.body.data.data = { data: ret, status: "pong" };
    next();
}

module.exports = exe;