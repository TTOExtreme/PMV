var db = require('../../../../app/mysql/db_execute');
var dbnames = require('../../../../config/db');
var au = require('./_rem_usr');
var cfg = require('../db');

var gc = require('./_get_ctrct_id');
var gun = require('../../../../app/rotines/usr/get_name_id');

function exe(ctx, next) {
    ctx.body.route += ",_Contract_grp";

    var ret = "error_incode";

    var idctrct = ctx.body.data.data.ctrct;
    var idusr = ctx.body.data.data.usr;

    if (idctrct != undefined &&
        idusr != undefined) {
        if (idctrct > -1) {
            if (idusr > -1) {
                var r = au(idusr, idctrct);
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
        ctx.body.desc = "User or Contract not defined";
    }
    return ctx;
}

module.exports = exe;