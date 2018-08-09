var gperm = require('../../../rotines/prm/get_prm_user');
var glst = require('../../../rotines/log/lst');
var cfg = require('../../../../config/index');
var db = require('../../../../config/db');
var colors = require('colors');

function func(ctx, next) {

    var uid = ctx.body.data.id;
    var index = ctx.body.data.data.index;

    ctx.body.route += ",Lst_log";
    ctx.body.data.data = { data: glst(index), status: "pong" };

    return ctx;
}

module.exports = func