var gperm = require('../../../rotines/prm/get_prm_user');
var cfg = require('../../../../config/db');
var login = require('../../../rotines/usr/loginupdate');
var colors = require('colors');

function func(ctx, next, perm) {
    ctx.body.route += ",Permission";
    var d = new Date().getTime();

    var uid = ctx.body.data.id;
    var perms = JSON.stringify(gperm(uid));
    if (perms != -1) {
        for (i = 0; i < perm.length; i++) {
            if (perms.indexOf(perm[i]) > -1) {
                if (perm[i] == cfg.permissions.login) {
                    login(uid);
                }
                next();
                return ctx;
            }
        }
        ctx.body.status = "not_authorized";
        ctx.body.desc = "Permission denied: " + perm;
    } else {
        ctx.body.status = "not_authorized";
        ctx.body.desc = "Cannot Load Permissions";
    }
    return ctx;
}

module.exports = func