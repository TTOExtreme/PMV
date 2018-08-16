const db = require('../db');
const fs = require('fs');
var cfg = require('../../../../config/index');
var gum = require('../../../../app/rotines/usr/get_matric_id');

function exe(ctx, next) {
    ctx.body.route += ",Alert_set";
    var data = ctx.body.data.data.data;
    //console.log(data);

    fs.writeFileSync('/opt/WS/addons/alert/web/js/alerts.json', data)

    ctx.body.data.data = { data: "modified", status: "pong" };
    next();
}

module.exports = exe;