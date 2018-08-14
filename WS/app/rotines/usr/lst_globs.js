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

function exe(usrid, data) {
    //var d1 = new Date().getTime();
    var wr = "";

    if (data.id_usr != "") { if (wr == "") { wr += " WHERE " } wr += "`id_usr` LIKE '%" + data.id_usr + "%'"; }
    if (data.usr_name != "") { if (wr == "") { wr += " WHERE " } else { wr += " AND " } wr += "`usr_name` LIKE '%" + data.usr_name + "%'"; }
    if (data.user != "") { if (wr == "") { wr += " WHERE " } else { wr += " AND " } wr += "`user` LIKE '%" + data.user + "%'"; }
    if (data.matric != "") { if (wr == "") { wr += " WHERE " } else { wr += " AND " } wr += "`matric` LIKE '%" + data.matric + "%'"; }
    if (data.cpf != "") { if (wr == "") { wr += " WHERE " } else { wr += " AND " } wr += "`cpf` LIKE '%" + data.cpf + "%'"; }
    if (data.last_login != "") { if (wr == "") { wr += " WHERE " } else { wr += " AND " } wr += "`last_login` LIKE '%" + data.last_login + "%'"; }
    //AND  `grp_id` LIKE '%" + data.grp_id + "%'
    var sql = "SELECT id_usr,usr_name,user,matric,cpf,last_login,grp_id FROM " + dbnames.dbnames.database_name + "." + dbnames.dbnames.usertable +
        " LEFT JOIN " + dbnames.dbnames.database_name + "." + dbnames.dbnames.rltgroupuser + " ON `usr_id`=`id_usr` " + wr + " LIMIT 20;";
    var results = db(sql);
    //console.log(sql);
    if (results == "") { return []; }
    var rows = [];
    rows = Object.keys(results).map(i => JSON.parse(JSON.stringify(results[i])));
    if (rows[0] == undefined) { return [] }
    //console.log(color.red(rows));
    //var tout = new Date().getTime();
    //console.log(color.green("" + (tout - d1) + " M"));
    return rows;
}

module.exports = exe;