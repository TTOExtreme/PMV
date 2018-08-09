var db = require('../../mysql/db_execute');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');
var ggu = require('../grp/get_id_name');
var ggf = require('../grp/get_father');
var ggp = require('../grp/get_prm_grp');
var ggh = require('../grp/get_heranca');

function exe(grp) {
    if (grp != undefined) {
        var v = [];

        var fid = ggu(grp);

        var prms = ggp(fid);

        if (prms[0] != undefined) {
            prms.forEach((e) => {
                if (v.indexOf(e) == -1) { v.push(e); }
            });
        }
        fid = ggf(fid);
        while (fid > -1 && ggh(fid) == 1) {
            var prms = ggp(fid);
            fid = ggf(fid);

            if (prms[0] != undefined) {
                prms.forEach((e) => {
                    if (v.indexOf(e) == -1) { v.push(e); }
                });
            }
        }

        return JSON.stringify(v);
    }
    return -1;
}

module.exports = exe;