var db = require('../../mysql/db_execute');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');

var ggs = require('../grp/get_son');
var ggf = require('../grp/get_father');
var ggu = require('../grp/get_grp_usrid');
var ggus = require('../grp/get_usrs');

var gu = require('./get');
var gun = require('./get_usr_id');

function exe(usrid, data) {
    var g = ggu(usrid);
    v = rec(g);
    return v;
}

module.exports = exe;

function recg(grpid) {
    var r = [];
    var grps = ggs(grpid);

    if (grps.length > 0) {
        grps.forEach(e => {
            r.push.apply(r, recg(e.grps_id));
        })
    }
    r.push.apply(r, grpid);
    return r;
}

function rec(gs) {
    var r = [];

    recg(gs).forEach(f => {
        if (ggf(f.grp_id) != -1 || ggs(f.grp_id) != -1) {
            var ug = ggus(f.grp_id);
            ug.forEach(e => {
                var v = gu(gun(e.usr_id));
                if (v[0] != undefined) {
                    r.push(v[0]);
                }
            })
        }
    })

    return r;
}