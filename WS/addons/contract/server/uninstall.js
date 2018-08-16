var db = require('./db');
var pcr = require('../../../app/rotines/prm/rem');

function exe() {
    pcr(db.permlist[0].name);
}

module.exports = exe;