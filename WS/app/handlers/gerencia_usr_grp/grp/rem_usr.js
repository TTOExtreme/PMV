var gui = require('../../../rotines/usr/get_id_user');
var cfg = require('../../../../config/index');
var dbnames = require('../../../../config/db');
var rug = require('../../../rotines/grp/grp_rem_usr');
var colors = require('colors');

function func(ctx, next) {
    ctx.body.route += ",Rem_grp_usr";

    var user = ctx.body.data.data.user;
    var grp = ctx.body.data.data.grp;
    var reason = ctx.body.data.data.reason;

    if (user != undefined &&
        reason != undefined) {
        var g1 = gui(user);
        if (g1 > -1) {
            var r = rug(user, grp);
            ctx.body.data.data = { data: r, status: "pong" };
        } else {
            ctx.body.status = "usr_not_exist";
            ctx.body.desc = "User not exist";
        }
    } else {
        ctx.body.status = "error_incode";
        ctx.body.desc = "Not defined";
    }
    return ctx;
}

module.exports = func