var db = require('../../../../app/mysql/db_execute');
var dbnames = require('../../../../config/db');
var cfg = require('../db');

var crt = require('./_del_ctract');

function exe(ctx, next) {
    ctx.body.route += ",Del_ctrct";

    var ret = "error_incode";

    var id = ctx.body.data.data.id;
    var reason = ctx.body.data.data.reason;
    if (id != undefined && reason != undefined) {
        ret = crt(id);
    }
    ctx.body.data.data = { data: ret, status: "pong" };
    next();
}

module.exports = exe;