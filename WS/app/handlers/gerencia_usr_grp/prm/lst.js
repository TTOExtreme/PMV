var gperm = require('../../../rotines/prm/get_prm_user');
var ggperm = require('../../../rotines/prm/get_prm_global');
var cfg = require('../../../../config/index');
var db = require('../../../../config/db');
var colors = require('colors');

function func(ctx, next) {
    var uid = ctx.body.data.id;
    var perms = gperm(uid);
    if (JSON.stringify(perms).indexOf(db.permissions.lst_prm_glob) > -1) {
        ctx.body.route += ",Lst_prm_Glob";
        perms = ggperm();
    } else {
        ctx.body.route += ",Lst_prm";
    }
    ctx.body.data.data = { status: "pong", data: perms };
    return ctx;
}

module.exports = func