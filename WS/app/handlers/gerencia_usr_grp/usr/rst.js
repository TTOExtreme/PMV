var cfg = require('../../../../config/index');
var dbnames = require('../../../../config/db');
var rstusr = require('../../../rotines/usr/rst');
var colors = require('colors');

var gusern = require('../../../rotines/usr/get_id_user');

function func(ctx, next) {
    ctx.body.route += ",Rst_usr";
    var uid = ctx.body.data.id;

    var ousr = ctx.body.data.data.user;
    var opass = ctx.body.data.data.pass;

    if (ousr != undefined &&
        opass != undefined
    ) {
        if (uid != -1) {
            if (gusern(ousr) > 0) {
                var r = rstusr(ousr, opass);
                ctx.body.data.data = { status: "pong", data: r };
                return ctx;
            } else {
                ctx.body.status = "usr_not_exist";
                ctx.body.desc = "User dont Exist"
                return ctx;
            }
        }
    } else {
        ctx.body.status = "error_incode";
        ctx.body.desc = "Error on input"
        return ctx;
    }
}

module.exports = func