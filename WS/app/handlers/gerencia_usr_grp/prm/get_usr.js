var gperm = require('../../../rotines/prm/get_prm_user');
var ggperm = require('../../../rotines/prm/get_prm_global');
var cfg = require('../../../../config/index');
var db = require('../../../../config/db');
var guid = require('../../../rotines/usr/get_id_user');
var colors = require('colors');

function func(ctx, next) {
    ctx.body.route += ",Lst_prm_usr";
    ctx.body.route += ",Get_Permissions_List_User";
    var uid = guid(ctx.body.data.data.user);
    var perms = gperm(uid);
    ctx.body.data.data = { status: "pong", data: perms };
    return ctx;
}

module.exports = func