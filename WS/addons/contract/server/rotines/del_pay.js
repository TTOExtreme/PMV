var db = require('../../../../app/mysql/db_execute');
var dbnames = require('../../../../config/db');
var cfg = require('../db');

var crt = require('./_del_pay');

function exe(ctx, next) {
    ctx.body.route += ",Del_Pay";
    var usrid = ctx.body.data.id;

    var ret = "error_incode";

    var n = ctx.body.data.data.id;
    var i = ctx.body.data.data.reason;
    if (n != undefined &&
        i != undefined
    ) {
        ret = crt(n);
    }
    ctx.body.data.data = { data: ret, status: "pong" };
    next();
}

module.exports = exe;