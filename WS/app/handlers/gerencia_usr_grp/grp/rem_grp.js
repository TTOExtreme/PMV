var ggi = require('../../../rotines/grp/get_id_name');
var ggf = require('../../../rotines/grp/get_father');
var cfg = require('../../../../config/index');
var dbnames = require('../../../../config/db');
var rug = require('../../../rotines/grp/grp_rem_grp');
var colors = require('colors');

function func(ctx, next) {
    ctx.body.route += ",Rem_grp_grp";

    var grps = ctx.body.data.data.grps;
    var reason = ctx.body.data.data.reason;

    if (grps != undefined &&
        reason != undefined) {
        var g1 = ggi(grps.substring(grps.lastIndexOf(">") + 1).replace(" ", ""));
        var g2 = ggf(g1);
        if (g1 > -1 && g2 > -1) {
            var r = rug(g1, g2);
            ctx.body.data.data = { data: r, status: "pong" };
        } else {
            ctx.body.status = "grp_not_exist";
            ctx.body.desc = "Group not exist";
        }
    } else {
        ctx.body.status = "error_incode";
        ctx.body.desc = "Not defined";
    }
    return ctx;
}

module.exports = func