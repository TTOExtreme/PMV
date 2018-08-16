var cfg = require('../../../../config/index');
var dbnames = require('../../../../config/db');
var edtusr = require('../../../rotines/usr/edt');
var colors = require('colors');

var gusern = require('../../../rotines/usr/get_id_user');

function func(ctx, next) {
    ctx.body.route += ",Edt_usr";
    var uid = ctx.body.data.id;

    var ousro = ctx.body.data.data.user;
    var ousr = ctx.body.data.data.usern;
    var oname = ctx.body.data.data.name;
    var omatric = ctx.body.data.data.matric;
    var ocpf = ctx.body.data.data.cpf;

    if (ousro != undefined &&
        ousr != undefined &&
        oname != undefined &&
        omatric != undefined &&
        ocpf != undefined
    ) {
        if (uid != -1) {
            if (gusern(ousro) > 0) {
                var r = edtusr(ousro, ousr, oname, omatric, ocpf);
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