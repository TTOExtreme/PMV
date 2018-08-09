var gperm = require('../../../rotines/prm/get_prm_user');
var gusern = require('../../../rotines/grp/get_id_name');
var cfg = require('../../../../config/index');
var dbnames = require('../../../../config/db');
var crtusr = require('../../../rotines/grp/create');
var colors = require('colors');

function func(ctx, next) {
    ctx.body.route += ",Crt_grp";
    var uid = ctx.body.data.id;

    var oname = ctx.body.data.data.name;
    var oheran = ctx.body.data.data.heranca;

    if (oheran != undefined &&
        oname != undefined) {
        if (gusern(oname) < 0) {
            var r = crtusr(oname, ctx.body.data.user, oheran);
            ctx.body.data.data = { status: "pong", data: r };
        } else {
            ctx.body.status = "grp_exist";
            ctx.body.desc = "Group already exist";
        }
    } else {
        ctx.body.status = "error_incode";
        ctx.body.desc = "Name or Heredity not defined";
    }
    return ctx;
}

module.exports = func