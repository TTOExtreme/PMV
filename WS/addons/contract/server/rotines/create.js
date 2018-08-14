var crt = require('./_crt_ctract');
var crtn = require('./_get_ctrct_num');

var au = require('./_atr_usr');

function exe(ctx, next) {
    ctx.body.route += ",Crt_Contract";
    var usrid = ctx.body.data.id;

    var ret = "error_incode";

    var n = ctx.body.data.data.name;
    var u = ctx.body.data.data.num;
    var d = ctx.body.data.data.desc;
    var i = ctx.body.data.data.ini_data;
    var p = ctx.body.data.data.periodo;
    var np = ctx.body.data.data.npays;
    var v = ctx.body.data.data.value;
    var r = ctx.body.data.data.renewable;
    var f = ctx.body.data.data.file;
    if (n != undefined &&
        u != undefined &&
        d != undefined &&
        i != undefined &&
        p != undefined &&
        v != undefined &&
        r != undefined &&
        f != undefined
    ) {
        if (crtn(u, r) == -1) {
            ret = crt(usrid, n, u, d, i, p, np, v, r, f);
            au(usrid, ret[1].id_ctrct);
        } else {
            ret = ["exists", -1]
        }
    }
    ctx.body.data.data = { data: ret[0], ctrct: ret[1], status: "pong" };
    next();
}

module.exports = exe;