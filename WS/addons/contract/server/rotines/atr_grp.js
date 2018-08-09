var db = require('../../../../app/mysql/db_execute');
var dbnames = require('../../../../config/db');
var ag = require('./_atr_grp');
var cfg = require('../db');

var crt = require('./_atr_grp');

var gc = require('./_get_ctrct_id');
var gg = require('../../../../app/rotines/grp/get_id_name');

function exe(ctx, next) {
    ctx.body.route += ",Atr_Contract_grp";

    var ret = "error_incode";

    var idctrct = ctx.body.data.data.ctrct;
    var idgrp = ctx.body.data.data.grp;

    if (idctrct != undefined &&
        idgrp != undefined) {
        var idgrp = gg(idgrp);
        if (idctrct > -1) {
            if (idgrp > -1) {
                var r = ag(idgrp, idctrct);
                ctx.body.data.data = { data: r, status: "pong" }
            } else {
                ctx.body.status = "grp_not_exist";
                ctx.body.desc = "Group not Exist";
            }
        } else {
            ctx.body.status = "ctrct_not_exist";
            ctx.body.desc = "Contract not Exist";
        }
    } else {
        ctx.body.status = "error_incode";
        ctx.body.desc = "User or Group not defined";
    }
    return ctx;
}

module.exports = exe;