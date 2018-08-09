//preload the .js necessary files
var root = "http://" + document.location.host + "/WSPV/js/";
var libs = [
    root + "bin/utils/index.js",
    root + "bin/extdb/index.js",
    root + "bin/indb/index.js",
    root + "bin/auth/index.js",
    root + "bin/lang/index.js",
    root + "bin/cfg/index.js",
    root + "bin/screen/index.js"
]

var loading = true;

function loader(libid) {
    if (libs[libid] != undefined) {
        $.getScript(libs[libid], function () { loader(libid + 1); })
    } else {
        loading = false;
    }
}

function loadScript(scrp) {
    if (!loading) {
        $.getScript(root + scrp, function () { });
    } else {
        setTimeout(function () { loadScript(scrp); }, 1000);
    }
}

function loadAddonScript(scrp) {
    if (!loading) {
        $.getScript(cfg.incon + scrp, function () { });
    } else {
        setTimeout(function () { loadScript(scrp); }, 1000);
    }
}

function loadAddonMainScript(scrp) {
    if (!loading) {
        libs.push(cfg.incon + scrp, function () { });
    } else {
        $.getScript(cfg.incon + scrp, function () { });
    }
}

function loadAddonScriptCall(scrp, callback) {
    if (!loading) {
        $.getScript(cfg.incon + scrp, function () { callback(); });
    } else {
        setTimeout(function () { loadScriptCall(scrp, callback); }, 1000);
    }
}

function wait_Load(callback) {
    if (!loading) {
        callback();
    } else {
        setTimeout(function () { wait_Load(callback); }, 1000);
    }
}

function loadMainScripter(scpt) {
    if (loading) {
        libs.push(root + scpt)
    } else {
        $.getScript(root + scpt, function () { });
    }
}

loader(0);