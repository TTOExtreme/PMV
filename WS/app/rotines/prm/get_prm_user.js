var db = require('../../mysql/db_execute');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');
var ggu = require('../grp/get_grp_usrid');
var ggf = require('../grp/get_father');
var ggp = require('../grp/get_prm_grp');
var ggh = require('../grp/get_heranca');
var gup = require('../usr/get_prm_usr');
var colors = require('colors');

function exe(usr) {
    if (usr != undefined) {
        var v = [];

        var fidl = ggu(usr);
        fidl.forEach((fid) => {
            fid = fid.grp_id;
            while (fid > -1 && ggh(fid) == 1) {
                var prms = ggp(fid);
                fid = ggf(fid);

                if (prms[0] != undefined) {
                    prms.forEach(element => {
                        if (v.indexOf(element) == -1) { v.push(element); }
                    });
                }
            }
        })
        var prms = JSON.parse(gup(usr));
        if (prms[0] != undefined) {
            prms.forEach(element => {
                v.push(element);
            });
        }
        return JSON.stringify(v);
    }
    return -1;
}

module.exports = exe;