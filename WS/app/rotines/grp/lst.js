var db = require('../../mysql/db_execute');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');

var ggf = require('./get_father');
var ggs = require('./get_son');
var ggn = require('./get_name');
var ggu = require('./get_grp_usrid');
var ggh = require('./get_heranca');
var ggc = require('./get_creator');

function exe(usrid) {
    var grpid = ggu(usrid);
    var sql = "";
    var res = [];
    var r = [];

    grpid.forEach((e) => { if (ggf(e.grp_id) != -1 || ggs(e.grp_id) != -1) { r.push.apply(r, recg(e.grp_id)) } });
    r.forEach(element => {
        sql = "SELECT * FROM " + dbnames.dbnames.database_name + "." + dbnames.dbnames.grouptable + " WHERE `id_grp`=" + element + ";";

        var rows = [];
        var results = db(sql);
        rows = Object.keys(results).map(i => JSON.parse(JSON.stringify(results[i])));
        if (rows[0] == undefined) { rows = [] }
        res.push.apply(res, rows);
    });

    return res;
}

module.exports = exe;


function recg(grpid) {
    var r = [];
    var grps = ggs(grpid);

    if (grps.length > 0) {
        grps.forEach(e => {
            var g = recg(e.grps_id);
            r.push.apply(r, g);
        })
    }
    r.push(grpid);
    return r;
}