var db = require('../../../../app/mysql/db_execute');
var dbnames = require('../../../../config/db');
var cfg = require('../db');

var ggf = require('../../../../app/rotines/grp/get_father');
var ggs = require('../../../../app/rotines/grp/get_son');
var ggn = require('../../../../app/rotines/grp/get_name');
var ggu = require('../../../../app/rotines/grp/get_grp_usrid');
var ggh = require('../../../../app/rotines/grp/get_heranca');
var ggh = require('../../../../app/rotines/grp/get_creator');
var ggus = require('../../../../app/rotines/grp/get_usrs');

var gun = require('../../../../app/rotines/usr/get_name_id');
var gum = require('../../../../app/rotines/usr/get_matric_id');
var guc = require('../../../../app/rotines/usr/get_cpf_id');
var gu = require('../../../../app/rotines/usr/get_usr_id');
var gul = require('../../../../app/rotines/usr/get_lastlogin_id');

var gperm = require('../../../../app/rotines/prm/get_prm_user');

var glg = require('./_lst_glob_grp');
var glgrp = require('./_lst-grp');

function exe(ctx) {
    ctx.body.route += ",Lst_Contracts_grp";
    var usrid = ctx.body.id;

    var uid = ctx.body.data.id;
    var perms = JSON.stringify(gperm(uid));
    var uid = ctx.body.data.id;
    if (perms.indexOf(cfg.permissions.lst_ctrct_glob) > -1) {
        ctx.body.data.data = { data: glg(uid), status: "pong" };
    } else {
        if (perms.indexOf(cfg.permissions.lst_ctrct_grp) > -1) {
            ctx.body.data.data = { data: glgrp(uid), status: "pong" };
        }
    }
    return ctx;
}

module.exports = exe;