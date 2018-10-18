var db = require('../../mysql/db_execute');
var dbnames = require('../../../config/db');
var cfg = require('../../../config');
var color = require('colors');

var ggf = require('../grp/get_father');
var ggs = require('../grp/get_son');
var ggn = require('../grp/get_name');
var ggu = require('../grp/get_grp_usrid');
var ggh = require('../grp/get_heranca');
var ggh = require('../grp/get_creator');
var ggus = require('../grp/get_usrs');

var gun = require('./get_name_id');
var gum = require('./get_matric_id');
var guc = require('./get_cpf_id');
var gu = require('./get_usr_id');
var gul = require('./get_lastlogin_id');

function exe(usrid) {
    var sql = "SELECT id_usr,user,usr_name,matric,cpf,last_login,grp_id FROM " + dbnames.dbnames.database_name + "." + dbnames.dbnames.usertable + " LEFT JOIN " + dbnames.dbnames.database_name + "." + dbnames.dbnames.rltgroupuser + " ON `usr_id`=`id_usr` WHERE `user`='" + usrid + "';";
    var results = db(sql);
    if (results == "") { return []; }
    var rows = [];
    rows = Object.keys(results).map(i => JSON.parse(JSON.stringify(results[i])));
    if (rows[0] == undefined) { rows = []; }

    return rows;
}

module.exports = exe;