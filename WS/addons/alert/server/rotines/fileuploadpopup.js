var db = require('../../../../app/mysql/db_execute');
var dbnames = require('../../../../config/db');
var files = require('../../../../config');
var cfg = require('../db');

var fs = require('fs');

function exe(req, res) {
    var fin = req.req.file.filename;

    var fs = require("fs");
    fs.rename("/opt/WS/addons/alert/web/img/" + fin, "/opt/WS/addons/alert/web/img/0.png", () => { });
    res.body = { data: "ok", status: "pong" }
    res.status = (200);
    return res;
}
module.exports = exe;