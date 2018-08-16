var gperm = require('../../../rotines/prm/get_prm_user');
var ggid = require('../../../rotines/grp/get_id_name');
var cfg = require('../../../../config/index');
var gprmn = require('../../../rotines/prm/prm_id');
var ptg = require('../../../rotines/prm/atr_grp');
var colors = require('colors');

function func(ctx, next) {
    ctx.body.route += ",Atr_prm_grp";
    var uid = ctx.body.data.id;

    var ogrp = ctx.body.data.data.grp;
    var oprm = ctx.body.data.data.perm;

    if (ogrp != undefined &&
        oprm != undefined) {

        var g = ggid(ogrp);
        var p = gprmn(oprm);
        var perms = gperm(uid);
        if (g > -1) {
            if (perms.indexOf(oprm) > -1) {
                var r = ptg(g, p);
                ctx.body.data.data = { status: r };
            } else {
                ctx.body.status = "not_authorized";
                ctx.body.desc = "Without the Permission to Attrib to user";
            }
        } else {
            ctx.body.status = "usr_not_exist";
            ctx.body.desc = "User not exist";
        }
    } else {
        ctx.body.status = "error_incode";
        ctx.body.desc = "not defined";
    }
    return ctx;
}

module.exports = func