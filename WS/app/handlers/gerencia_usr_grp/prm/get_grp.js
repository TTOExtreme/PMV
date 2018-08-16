var gperm = require('../../../rotines/prm/get_prm_group');
var ggperm = require('../../../rotines/prm/get_prm_global');
var cfg = require('../../../../config/index');
var db = require('../../../../config/db');
var guid = require('../../../rotines/grp/get_id_name');
var colors = require('colors');

function func(ctx, next) {
    ctx.body.route += ",Lst_prm_grp";
    ctx.body.route += ",Get_Permissions_List_Group";
    var uid = (ctx.body.data.data.grp);
    var perms = gperm(uid);
    ctx.body.data.data = { status: "pong", data: perms };
    return ctx;
}

module.exports = func