var db = require('./db');
var pcr = require('../../../app/rotines/prm/create');
var ptu = require('../../../app/rotines/prm/prm_usr');

function exe() {
    pcr(400, db.permlist[0].name, db.permlist[0].desc);
    pcr(401, db.permlist[1].name, db.permlist[1].desc);
    ptu("admin", db.permissions.adm_alert);
    ptu("admin", db.permissions.acc_tab_alert);
}

module.exports = exe;