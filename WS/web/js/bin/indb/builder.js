//load into indb
var indb = {
    loaded: false,
    loaded_usrs: false,
    loaded_grps: false,
    logged: false,
    hs: "VFRPRXh0cmVtZS1MdWNhc1JhbWFsaG9DYW1hcm90dG8tMTIvMDMvMTk5OC1HZW5lcmF0ZWQtaW4tMTA6MzMtMDMvMDQvMjAxOA",
    salt: "3c423c6d3c716d71403c3d7240443f3e6f6e433e444570713f4340403c713c71453d3f3d6d706e6d3d434240703f3c43",
    p: 0,
    login: {
        id: 0,
        name: 0,
        auth: 0,
        user: 0,
        pass: 0,
        matric: 0,
        cpf: 0,
        timestamp: 0,
        data: 0
    },
    tabs: [], //array content tabs and subtabs to access
    permissions: [], //array of permissions for user
    vis_users: [], //users visible for user
    vis_groups: [], //groups visible fo user
    addons: {}, //json for addons
    log: [], //list of last logs
    log_loaded: false //list of last logs
}

function load(callback) {
    var tmp = JSON.parse(sessionStorage.getItem('indb'));
    if (tmp != undefined && tmp != "0") {
        indb = tmp;
    }
    if (!indb.loaded) {
        if (!indb.logged) {
            login_check(() => {
                callback();
            })
        } else {
            ext_preload(() => {
                indb.loaded = true;
                callback();
            });
        }
    } else {
        callback();
    }
}

function load_usr(callback) {
    var tmp = JSON.parse(sessionStorage.getItem('indb'));
    if (tmp != undefined && tmp != "0") {
        indb = tmp;
    }
    if (!indb.loaded_usrs) {
        if (!indb.logged) {
            login_check(() => {
                ext_load_users(() => {
                    indb.loaded_usrs = true;
                    callback();
                });
            })
        } else {
            ext_load_users(() => {
                indb.loaded_usrs = true;
                callback();
            });
        }
    } else {
        callback();
    }
}

function load_grp(callback) {
    var tmp = JSON.parse(sessionStorage.getItem('indb'));
    if (tmp != undefined && tmp != "0") {
        indb = tmp;
    }
    if (!indb.loaded_grps) {
        if (!indb.logged) {
            login_check(() => {
                ext_load_groups(() => {
                    indb.loaded_grps = true;
                    callback();
                });
            })
        } else {
            ext_load_groups(() => {
                indb.loaded_grps = true;
                callback();
            });
        }
    } else {
        callback();
    }
}

function save(callback) {
    if (indb.loaded) {
        sessionStorage.setItem('indb', JSON.stringify(indb));
        callback();
    } else {
        load(() => {
            save(callback);
        })
    }
}

function forcesave(callback) {
    sessionStorage.setItem('indb', JSON.stringify(indb));
    callback();
}

function DestroyINDB() {
    //sessionStorage.setItem('indb', '0');
}
/*
function RELOADINDB() {
    indb.vis_groups = [];
    indb.vis_users = [];
    indb.tabs = [];
    indb.loaded = false;
    indb.logged = false;
    ext_prereload(() => {
        sessionStorage.setItem('indb', JSON.stringify(indb));
    })

}
//*/
function RELOADINDB(callback) {
    indb.vis_groups = [];
    indb.vis_users = [];
    indb.tabs = [];
    indb.loaded = false;
    indb.logged = false;
    ext_prereload(() => {
        sessionStorage.setItem('indb', JSON.stringify(indb));
        callback();
    })

}

wait_Load(() => { load(() => { }); });