var gperm = require('../../../rotines/prm/ger_prm_user');
var ggrpn = require('../../../rotines/grp/grp_id');
var cfg = require('../../../../config/index');
var gprmn = require('../../../rotines/prm/prm_get');
var colors = require('colors');

function func(ctx, next) {
    ctx.body.route += ",Atr_prm_grp";
    var auth = ctx.request.body.auth;
    var uid = ctx.request.body.user;

    var ogrp = ctx.request.body.dt.grp;
    var oprm = ctx.request.body.dt.prm;

    ogrp = ogrp.substring(ogrp.lastIndexOf(">") + 1).replace(" ", "");
    if (ogrp != undefined &&
        oprm != undefined) {

        var g = ggrpn(ogrp);
        var p = gprmn(oprm);
        var perms = gperm(uid);
        if (g > -1) {
            if (perms.indexOf(p) > -1) {
                var r = agg(ogrp2, ogrp1);
                var ret = {
                    auth: auth,
                    status: r
                }
                ctx.body = ret;
            } else {
                var ret = {
                    auth: auth,
                    status: "not_authorized",
                    desc: "Without the Permission to Attrib to Group"
                }
                ctx.body = ret;
            }
        } else {
            var ret = {
                auth: auth,
                status: "grp_not_exist",
                desc: "Group not exist"
            }
            ctx.body = ret;
        }
    } else {
        var ret = {
            auth: auth,
            status: "error_incode",
            desc: "Group or Permission not defined"
        }
        ctx.body = ret;
    }
    return ctx;
}

module.exports = func