var cfg = require('../../../../config/index');
var dbnames = require('../../../../config/db');

var g_usr = require('../../../rotines/usr/get');
var g_usr_pass = require('../../../rotines/usr/get_pass_user');
var g_usr_auth = require('../../../rotines/usr/auth');
var hash = require('../../../rotines/key/bcypher');
var log = require('../../../rotines/log/add');
var colors = require('colors');

var usr;
var send = '';

function func(ctx, next) {
    var tin = new Date().getTime();
    if (ctx.request.body.data != undefined) {
        ctx.body = { data: unhashp2p(ctx.request.body.data), status: "", desc: null, route: "auth" }
        send = JSON.stringify(ctx.body.data);
        if (ctx.body.data != undefined) {
            var dt = new Date();
            if (cfg.cfg.debug) {
                console.log(colors.blue("Try Access: " + ctx.body.data.user + " AT: " + dt.getFullYear() + "-" + dt.getMonth() + "-" + dt.getDate() + "-" + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds()));
            }
            if (usr != undefined) {
                if (JSON.stringify(ctx.body.data).indexOf("{") > -1 && JSON.stringify(ctx.body.data).indexOf("}") > -1) {
                    //console.log(ctx.body.data);
                    ctx.body.data.id = usr.id_usr;
                    ctx.body.data.name = usr.usr_name;
                    ctx.body.data.user = usr.user;
                    ctx.body.data.matric = usr.matric;
                    ctx.body.data.cpf = usr.cpf;
                    ctx.body.data.auth = g_usr_auth(ctx.body.data.id);
                    if (ctx.body.data.data != '' && ctx.body.data.id != -1) {
                        var d1 = new Date().getTime();
                        next();
                        var d2 = new Date().getTime();
                        if (ctx.body.data.data != undefined) {
                            if (ctx.body.data.data.status != undefined) {
                                if (ctx.body.data.data.status == "ping") {
                                    ctx.body.data.data.status = "pong";
                                }
                            }
                        }
                    } else {
                        ctx.body.status = "wrong_usr_pass";
                        ctx.body.desc = "Erro no envio pass";
                    }
                } else {
                    ctx.body.status = "error_incode";
                    ctx.body.desc = "Erro no envio data";
                }
            } else {
                ctx.body.status = "wrong_usr_pass";
                ctx.body.desc = "Erro no envio user";
            }
        } else {
            ctx.body.status = "error_incode";
            ctx.body.desc = "Erro no envio body";
        }
    }
    var tout = new Date().getTime();
    var worktime = Math.round(tout - tin);
    if (cfg.cfg.debug && ctx.body.desc != undefined) {
        console.log((ctx.body.status + '\n' + ctx.body.desc).red);
        if (ctx.body.route.indexOf("List_log") == -1) {
            log(send, JSON.stringify(gsimple(ctx.body)), ctx.body.data.user, ctx.body.route, 0, worktime);
        }
        ctx.body.data = "";
    } else {
        if (ctx.body.status == "ping" || ctx.body.status == '') {
            ctx.body.status = "pong";
        }
        if (ctx.body.route.indexOf("Lst_log") == -1) {
            log(send, JSON.stringify(gsimple(ctx.body)), ctx.body.data.user, ctx.body.route, 1, worktime);
        }
        ctx.body.data = hashp2p(ctx.body.data);
    }

    var d3 = new Date().getTime();
    if (cfg.cfg.debug) { console.log(colors.blue(ctx.body.route)); }
    ctx.body.route = null;
    console.log(colors.green("worktime = " + worktime + " Miliseconds"));
    console.log(colors.green("unhs: " + (d1 - tin) + " proc: " + (d2 - d1) + " hs: " + (d3 - d2)));
    return ctx;
    //*/
}

function hashp2p(dat) {
    var fk = "VFRPRXh0cmVtZS1MdWNhc1JhbWFsaG9DYW1hcm90dG8tMTIvMDMvMTk5OC1HZW5lcmF0ZWQtaW4tMTA6MzMtMDMvMDQvMjAxOA";
    var dt = {
        id: dat.id,
        name: dat.name,
        auth: dat.auth,
        user: dat.user,
        pass: dat.pass,
        matric: dat.matric,
        cpf: 0,
        timestamp: new Date().getTime(),
        data: 0
    }
    dt.auth = hash.sha2(JSON.stringify(dt)); //1st pass
    dt.pass = hash.sha2(JSON.stringify(dt)); //2nd pass
    dt.data = hash.crypt(JSON.stringify(dt), JSON.stringify(dat.data)); //3rd pass
    dt.pass = 0;
    dt.cpf = dat.cpf;
    dt.auth = dat.auth;
    var hsd = hash.crypt(fk, JSON.stringify(dt)); //4rd pass
    return hsd;
}

function unhashp2p(hsh) {
    var fk = "VFRPRXh0cmVtZS1MdWNhc1JhbWFsaG9DYW1hcm90dG8tMTIvMDMvMTk5OC1HZW5lcmF0ZWQtaW4tMTA6MzMtMDMvMDQvMjAxOA";
    var dat = JSON.parse(hash.uncrypt(fk, hsh));
    usr = g_usr(dat.user)[0];
    var pass = g_usr_pass(dat.user);
    var dt = {
        id: dat.id,
        name: dat.name,
        auth: dat.auth,
        user: dat.user,
        pass: pass,
        matric: dat.matric,
        cpf: 0,
        timestamp: dat.timestamp,
        data: 0
    }
    dt.auth = hash.sha2(JSON.stringify(dt)); //1st pass
    dt.pass = hash.sha2(JSON.stringify(dt)); //2nd pass
    dt.data = hash.uncrypt(JSON.stringify(dt), dat.data);
    if (dt.data.indexOf('{') > -1) { dt.data = JSON.parse(dt.data); }
    dt.pass = pass;
    dt.cpf = dat.cpf;
    dt.auth = dat.auth;
    return dt;
}

function gsimple(dat) {
    var v = JSON.parse(JSON.stringify(dat));
    v.data = JSON.stringify(dat.data).substr(0, 32) + "...";
    return v;
}

module.exports = func