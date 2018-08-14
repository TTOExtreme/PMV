var db = require('../../../../app/mysql/db_execute');
var dbnames = require('../../../../config/db');
var cfg = require('../db');

var crt = require('./_add_file_ctract');

function exe(ctx, next) {
    ctx.body.route += ",Add_file_Contract";
    var usrid = ctx.body.data.id;

    var ret = "error_incode";

    var n = ctx.body.data.data.id;
    var f = ctx.body.data.data.file;
    var d = "CURRENT_TIMESTAMP";
    if (n != undefined &&
        d != undefined &&
        f != undefined
    ) {
        ret = crt(usrid, n, d, f);
    }
    ctx.body.data.data = { data: ret, status: "pong" };
    next();
}

module.exports = exe;