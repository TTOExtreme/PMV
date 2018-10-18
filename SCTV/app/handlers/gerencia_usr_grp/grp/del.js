var gusern = require('../../../rotines/grp/get_id_name');
var cfg = require('../../../../config/index');
var delusr = require('../../../rotines/grp/del');
var colors = require('colors');

function func(ctx, next) {
    ctx.body.route += ",Del_grp";
    var uid = ctx.body.data.id;

    var ousr = ctx.body.data.data.grp;
    var or = ctx.body.data.data.reason;

    if (ousr != undefined &&
        or != undefined) {
        ousr = ousr.substring(ousr.lastIndexOf(">") + 1).replace(" ", "");
        if (gusern(ousr) > -1) {
            var r = delusr(ousr, or);
            ctx.body.data.data = { status: "pong", data: r };
        } else {
            ctx.body.status = "grp_not_exist";
            ctx.body.desc = "Group not exist";
        }
    } else {
        ctx.body.status = "error_incode";
        ctx.body.desc = "Not Defined";
    }
    return ctx;
}

module.exports = func