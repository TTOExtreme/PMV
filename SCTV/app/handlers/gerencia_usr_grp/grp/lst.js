var gperm = require('../../../rotines/prm/get_prm_user');
var glst = require('../../../rotines/grp/lst');
var gglst = require('../../../rotines/grp/lst_glob');
var cfg = require('../../../../config/index');
var db = require('../../../../config/db');
var colors = require('colors');

function func(ctx, next) {
    var perms = JSON.stringify(gperm(ctx.body.data.id));
    var uid = ctx.body.data.id;
    if (perms.indexOf(db.permissions.lst_grp_glob) > -1) {
        ctx.body.route += ",Lst_grp_Glob";
        ctx.body.data.data = { data: gglst(), status: "pong" };
    } else {
        ctx.body.route += ",Lst_grp";
        ctx.body.data.data = { data: glst(uid), status: "pong" };
    }
    return ctx;
}

module.exports = func