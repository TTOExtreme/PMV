const Koa = require('koa')
const Router = require('koa-router')
const body = require('koa-bodyparser')
const appRouter = require('../app/routes')
var cors = require('koa-cors')
var cfg = require('../config/index')

var colors = require('colors')

var connect = require('connect');
var serve = require('koa-static');

const createServer = () => {
    const app = new Koa();
    const router = new Router()

    app.use(cors());
    app.use(body());

    loadAddons(router);

    router.use('/api/', appRouter.routes())
    app.use(router.routes());
    console.log(("Server Started").green);

    app.use(serve(__dirname + '/../addons/')); //host the site
    console.log("up Addon web".green);
    app.use(serve(cfg.cfg.localhost)); //host the site
    console.log("up Files web".green);
    app.use(serve(__dirname + '/../web/')) //host the site
    console.log("up main web".green);

    return app
}

module.exports = createServer

function loadAddons(router) {
    const { lstatSync, readdirSync, existsSync } = require('fs')
    const { join } = require('path')
    var path = "../addons/"
    if (existsSync(path)) {
        const isDirectory = source => lstatSync(path).isDirectory()
        const getDirectories = source => readdirSync(path).map(name => join(path, name)).filter(isDirectory);
        getDirectories().forEach(function (e) {
            console.log(("Loading Addon: " + e.substr(e.lastIndexOf("/") + 1)).green);
            var r = require(e + "/server/router");
            router.use('/api/addons', r.routes());
            var d = require(e + "/server/db");
            if (d.hostfolder != undefined && d.hostfolder != '') { }
        })
    } else {
        console.log(("Addons folder not found").red);
    }
}