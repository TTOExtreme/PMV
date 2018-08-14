var gusern = require('../../../rotines/usr/get_id_user');
var ggrpn = require('../../../rotines/grp/get_id_name');
var cfg = require('../../../../config/index');
var gau = require('../../../rotines/grp/grp_atr_usr');
var ggu = require('../../../rotines/grp/get_grp_usrid');
var colors = require('colors');

function func(ctx, next) {
    ctx.body.route += ",Atr_usr_grp";
    var uid = ctx.body.data.user;

    var ousr = ctx.body.data.data.user;
    var ogrp = ctx.body.data.data.grp;

    if (ousr != undefined &&
        ogrp != undefined) {
        ogrp = ogrp.substring(ogrp.lastIndexOf(">") + 1).replace(" ", "");
        var ouid = gusern(ousr);
        var ogid = ggrpn(ogrp);
        console.log(ouid);
        console.log(ogid);
        if (ouid > -1 && ogid > -1) {
            //if (ggu(ouid) == -1) {
            var r = gau(ouid, ogid);
            ctx.body.data.data = { data: r, status: "pong" }
                /*} else {
                    ctx.body.status = "rel_exist";
                    ctx.body.desc = "User already have a Group";
                }//*/
        } else {
            ctx.body.status = "usr_not_exist";
            ctx.body.desc = "User not Exist";
        }
    } else {
        ctx.body.status = "error_incode";
        ctx.body.desc = "User or Group not defined";
    }
    return ctx;
}
module.exports = func