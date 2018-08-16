var db = require('./db');
var pcr = require('../../../app/rotines/prm/create');
var ptu = require('../../../app/rotines/prm/prm_usr');

function exe() {
    pcr(300, db.permlist[0].name, db.permlist[0].desc);
    ptu("admin", db.permissions.acc_tab_ponto);
}

module.exports = exe;