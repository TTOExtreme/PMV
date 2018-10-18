var gperm = require('../../../rotines/prm/get_prm_user');
var glst = require('../../../rotines/usr/lst');
var gglst = require('../../../rotines/usr/lst_glob');
var glsts = require('../../../rotines/usr/lsts');
var gglsts = require('../../../rotines/usr/lst_globs');
var cfg = require('../../../../config/index');
var db = require('../../../../config/db');
var colors = require('colors');

function func(ctx, next) {

    var uid = ctx.body.data.id;
    var data = ctx.body.data.data;
    var perms = JSON.stringify(gperm(uid));
    if (perms.indexOf(db.permissions.lst_grp_glob) > -1) {
        if (data.src == '1') {
            ctx.body.route += ",Lst_usr_Glob_search";
            ctx.body.data.data = { data: gglsts(uid, data), status: "pong" };
        } else {
            ctx.body.route += ",Lst_usr_Glob";
            ctx.body.data.data = { data: gglst(uid), status: "pong" };
        }
    } else {
        if (data.id_usr != undefined) {
            ctx.body.route += ",Lst_usr_search";
            ctx.body.data.data = { data: glsts(uid, data), status: "pong" };
        } else {
            ctx.body.route += ",Lst_usr";
            ctx.body.data.data = { data: glst(uid), status: "pong" };
        }
    }
    return ctx;

}

module.exports = func