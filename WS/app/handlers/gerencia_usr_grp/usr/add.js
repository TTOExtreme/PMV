var cfg = require('../../../../config/index');
var dbnames = require('../../../../config/db');
var crtusr = require('../../../rotines/usr/create');
var colors = require('colors');

var gusern = require('../../../rotines/usr/get_id_user');

function func(ctx, next) {
    ctx.body.route += ",Crt_usr";
    var uid = ctx.body.data.id;

    var ousr = ctx.body.data.data.user;
    var oname = ctx.body.data.data.name;
    var opass = ctx.body.data.data.pass;
    var omatric = ctx.body.data.data.matric;
    var ocpf = ctx.body.data.data.cpf;

    if (ousr != undefined &&
        oname != undefined &&
        opass != undefined &&
        omatric != undefined &&
        ocpf != undefined
    ) {
        if (uid != -1) {
            if (gusern(ousr) < 0) {
                var r = crtusr(ousr, opass, oname, omatric, ocpf);
                ctx.body.data.data = { status: "pong", data: r };
                return ctx;
            } else {
                ctx.body.status = "usr_exist";
                ctx.body.desc = "User Already Exist"
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