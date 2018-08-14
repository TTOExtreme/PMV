var au = require('./_atr_usr');

var gun = require('../../../../app/rotines/usr/get_id_user');

function exe(ctx, next) {
    ctx.body.route += ",Atr_Contract_usr";


    var idctrct = ctx.body.data.data.ctrct;
    var idusr = ctx.body.data.data.usr;

    if (idctrct != undefined &&
        idusr != undefined) {
        idusr = gun(idusr);
        if (idctrct > -1) {
            if (idusr > -1) {
                var r = au(idusr, idctrct);
                ctx.body.data.data = { data: r, status: "pong" }
            } else {
                ctx.body.status = "usr_not_exist";
                ctx.body.desc = "User not Exist";
            }
        } else {
            ctx.body.status = "ctrct_not_exist";
            ctx.body.desc = "Contract not Exist";
        }
    } else {
        ctx.body.status = "error_incode";
        ctx.body.desc = "User or Contract not defined";
    }
    return ctx;
}

module.exports = exe;