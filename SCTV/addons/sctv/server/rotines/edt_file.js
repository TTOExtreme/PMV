var db = require('../../../../app/mysql/db_execute');
var dbnames = require('../../../../config/db');
var cfg = require('../db');

var crt = require('./_edt_file');

function exe(ctx, next) {
    ctx.body.route += ",Edt_File";
    var usrid = ctx.body.data.id;

    var ret = "error_incode";

    var n = ctx.body.data.data.id;
    var i = "CURRENT_TIMESTAMP";
    var f = ctx.body.data.data.file;
    if (n != undefined &&
        f != undefined
    ) {
        ret = crt(usrid, i, n, f);
    }
    ctx.body.data.data = { data: ret, status: "pong" };
    next();
}

module.exports = exe;