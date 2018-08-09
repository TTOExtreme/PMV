var gusern = require('../../../rotines/usr/get_id_user');
var cfg = require('../../../../config/index');
var delusr = require('../../../rotines/usr/del');
var colors = require('colors');

function func(ctx, next) {
    ctx.body.route += ",Del_usr";
    var uid = ctx.body.data.id;

    var ousr = ctx.body.data.data.user;
    var or = ctx.body.data.data.reason;

    if (ousr != undefined &&
        or != undefined) {
        if (gusern(ousr) > -1) {
            var r = delusr(ousr, or);
            ctx.body.data.data = { status: "pong", data: r };
        } else {
            ctx.body.status = "usr_not_exist";
            ctx.body.desc = "User not exist";
        }
    } else {
        ctx.body.status = "error_incode";
        ctx.body.desc = "Not Defined";
        return ctx;
    }
}

module.exports = func