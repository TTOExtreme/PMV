var db = require('../../../../app/mysql/db_execute');
var dbnames = require('../../../../config/db');
var cfg = require('../db');

var ggs = require('../../../../app/rotines/grp/get_son');
var ggf = require('../../../../app/rotines/grp/get_father');
var ggu = require('../../../../app/rotines/grp/get_grp_usrid');
var ggus = require('../../../../app/rotines/grp/get_usrs');

var gpf = require('./_get_pay_files');

function exe(usrid) {

    var grpid = ggu(usrid);

    var sql = "";
    var res = [];

    sql = "SELECT * FROM " + dbnames.dbnames.database_name + "." + cfg.dbnames.ctrct_table +
        " LEFT JOIN " + dbnames.dbnames.database_name + "." + cfg.dbnames.ctrct_rlt_grp +
        " ON " + cfg.dbnames.ctrct_rlt_grp + ".ctrct_id=id_ctrct" +
        " LEFT JOIN " + dbnames.dbnames.database_name + "." + cfg.dbnames.ctrct_rlt_usr +
        " ON " + cfg.dbnames.ctrct_rlt_usr + ".ctrct_id=id_ctrct" +
        " WHERE `grp_id` IS NULL AND " + cfg.dbnames.ctrct_rlt_usr + ".usr_id IS NULL;";

    var rows = [];
    var results = db(sql);
    rows = Object.keys(results).map(i => JSON.parse(JSON.stringify(results[i])));
    if (rows[0] == undefined) { rows = [] }
    res.push.apply(res, rows);


    var r = recg(grpid);
    r.forEach(element => {
        sql = "SELECT * FROM " + dbnames.dbnames.database_name + "." + cfg.dbnames.ctrct_table +
            " LEFT JOIN " + dbnames.dbnames.database_name + "." + cfg.dbnames.ctrct_rlt_grp +
            " ON " + cfg.dbnames.ctrct_rlt_grp + ".ctrct_id=id_ctrct" +
            " WHERE `grp_id`=" + element + ";";

        var rows = [];
        var results = db(sql);
        rows = Object.keys(results).map(i => JSON.parse(JSON.stringify(results[i])));
        if (rows[0] == undefined) { rows = [] }
        res.push.apply(res, rows);
    });

    var r = recu(grpid);
    r.forEach(element => {
        sql = "SELECT * FROM " + dbnames.dbnames.database_name + "." + cfg.dbnames.ctrct_table +
            " LEFT JOIN " + dbnames.dbnames.database_name + "." + cfg.dbnames.ctrct_rlt_usr +
            " ON " + cfg.dbnames.ctrct_rlt_usr + ".ctrct_id=id_ctrct" +
            " LEFT JOIN " + dbnames.dbnames.database_name + "." + cfg.dbnames.ctrct_rlt_grp +
            " ON " + cfg.dbnames.ctrct_rlt_grp + ".ctrct_id=id_ctrct" +
            " WHERE " + cfg.dbnames.ctrct_rlt_usr + ".usr_id=" + element.usr_id + ";";

        var rows = [];
        var results = db(sql);
        rows = Object.keys(results).map(i => JSON.parse(JSON.stringify(results[i])));
        if (rows[0] == undefined) { rows = [] }
        res.push.apply(res, rows);
    });

    res = gpf(res);

    return res;
}

module.exports = exe;

function recg(grplst) {
    var r = [];
    grplst.forEach((grpid) => {
        if (ggf(grpid.grp_id) != -1 || ggs(grpid.grp_id) != -1) {
            var grps = ggs(grpid.grp_id);

            if (grps.length > 0) {
                grps.forEach(e => {
                    r.push.apply(r, recg(e.grps_id));
                })
            }
            r.push(grpid.grp_id);
        }
    });
    return r;
}

function recu(grplst) {
    var r = [];
    var grps = recg(grplst);

    if (grps.length > 0) {
        grps.forEach(e => {
            if (ggf(e) != -1 || ggs(e) != -1) {
                r.push.apply(r, ggus(e));
            }
        })

    }
    return r;
}