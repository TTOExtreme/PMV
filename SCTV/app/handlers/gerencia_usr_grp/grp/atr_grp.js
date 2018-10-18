var ggrpn = require('../../../rotines/grp/get_id_name');
var cfg = require('../../../../config/index');
var dbnames = require('../../../../config/db');
var agg = require('../../../rotines/grp/grp_atr_grp');
var colors = require('colors');

function func(ctx, next) {
    ctx.body.route += ",Atr_grp_grp";

    var ogrp1 = ctx.body.data.data.grpf;
    var ogrp2 = ctx.body.data.data.grps;

    if (ogrp1 != undefined &&
        ogrp2 != undefined) {
        ogrp1 = ogrp1.substring(ogrp1.lastIndexOf(">") + 1).replace(" ", "");
        var g1 = ggrpn(ogrp1);
        var g2 = ggrpn(ogrp2);
        if (g1 > -1 && g2 > -1 && g1 != g2) {
            var r = agg(ogrp2, ogrp1);
            ctx.body.data.data = { data: r, status: "pong" };
        } else {
            ctx.body.status = "grp_not_exist";
            ctx.body.desc = "Group not exist";
        }
    } else {
        ctx.body.status = "error_incode";
        ctx.body.desc = "Group not defined";
    }
    return ctx;
}

module.exports = func