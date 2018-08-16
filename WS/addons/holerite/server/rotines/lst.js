const db = require('../db');
const fs = require('fs');
var cfg = require('../../../../config/index');
var gum = require('../../../../app/rotines/usr/get_matric_id');

function exe(ctx, next) {
    ctx.body.route += ",Lst_Holerite";
    var ret = [];
    var path = db.hostfolder + "" + gum(ctx.body.data.id);
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(file => {
            ret.push(file);
        })
    }
    ctx.body.data.data = { data: ret, status: "pong" };
    next();
}

module.exports = exe;