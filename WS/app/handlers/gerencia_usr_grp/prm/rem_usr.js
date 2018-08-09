var gperm = require('../../../rotines/prm/get_prm_user');
var guid = require('../../../rotines/usr/get_id_user');
var cfg = require('../../../../config/index');
var gprmn = require('../../../rotines/prm/prm_id');
var ptu = require('../../../rotines/prm/rem_usr');
var colors = require('colors');

function func(ctx, next) {
    ctx.body.route += ",Rem_prm_usr";
    var uid = ctx.body.data.id;

    var ousr = ctx.body.data.data.user;
    var oprm = ctx.body.data.data.perm;

    if (ousr != undefined &&
        oprm != undefined) {

        var u = guid(ousr);
        var p = gprmn(oprm);
        var perms = gperm(uid);
        if (u > -1 && p > -1) {
            if (perms.indexOf(oprm) > -1) {
                var r = ptu(u, p);
                ctx.body.data.data = { status: r };
            } else {
                ctx.body.status = "not_authorized";
                ctx.body.desc = "Without the Permission to Remove from user";
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