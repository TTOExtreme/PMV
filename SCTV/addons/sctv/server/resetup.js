var db = require('./db');
var dbase = require('../../../app/mysql/db_execute');
var dbstruct = require('../../../config/db');
var pcr = require('../../../app/rotines/prm/create');
var ptu = require('../../../app/rotines/prm/prm_usr_id');
var colors = require('colors');

function exe() {
    db.permlist.forEach(function(v) {
        console.log(colors.gray(v))
        pcr(v.name, v.desc);
        ptu(1, v.name);
    })
}
module.exports = exe;