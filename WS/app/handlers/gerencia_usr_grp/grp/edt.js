var gperm = require('../../../rotines/prm/get_prm_user');
var gusern = require('../../../rotines/grp/get_id_name');
var cfg = require('../../../../config/index');
var dbnames = require('../../../../config/db');
var edtgrp = require('../../../rotines/grp/edt');
var colors = require('colors');

function func(ctx, next) {
    ctx.body.route += ",Edt_grp";
    var uid = ctx.body.data.id;

    var onameo = ctx.body.data.data.name;
    var oname = ctx.body.data.data.namen;
    var oheran = ctx.body.data.data.heranca;

    if (oheran != undefined &&
        onameo != undefined &&
        oname != undefined) {
        if (gusern(onameo) > -1) {
            var r = edtgrp(onameo, oname, oheran);
            ctx.body.data.data = { status: "pong", data: r };
        } else {
            ctx.body.status = "grp_not_exist";
            ctx.body.desc = "Group Not exist";
        }
    } else {
        ctx.body.status = "error_incode";
        ctx.body.desc = "Name or Heredity not defined";
    }
    return ctx;
}

module.exports = func