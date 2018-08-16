var db = require('../../../../app/mysql/db_execute');
var dbnames = require('../../../../config/db');
var files = require('../../../../config');
var cfg = require('../db');

var fs = require('fs');

function exe(req, res) {
    //*/
    var fin = req.req.file.filename;
    var fout = req.req.body.fname;

    var fs = require("fs");
    fs.rename(files.cfg.localhost + "Files/adtiv/" + fin, files.cfg.localhost + "Files/adtiv/" + fout + ".pdf");

    res.body = { data: fout, status: "pong" }
    res.status = (200);
    return res;
}
module.exports = exe;