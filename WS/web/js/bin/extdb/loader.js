function ext_load_perm(callback) {
    if (indb.permissions.length < 1) {
        ext_reload_perm(callback);
    } else {
        callback();
    }
}

function ext_reload_perm(callback) {
    p2p_send({ status: "ping" }, cfg.dbcon + "/permissions", function(result) {
        if (result.status == "pong") {
            indb.permissions = JSON.parse(result.data);
            callback();
        } else {
            pops("Erro ao se comunicar com o servidor");
        }
    })
}

function ext_load_users(callback) {
    if (indb.vis_users.length < 1) {
        ext_reload_users(callback);
    } else {
        callback();
    }
}

function ext_reload_users(callback) {
    p2p_send({ status: "ping" }, cfg.dbcon + "/lst_usr", function(result) {
        if (result.status == "pong") {
            indb.vis_users = result.data;
            save(() => {
                callback();
            })
        } else {
            pops("Erro ao se comunicar com o servidor");
        }
    })
}

function ext_load_groups(callback) {
    if (indb.vis_groups.length < 1) {
        ext_reload_groups(callback);
    } else {
        callback();
    }
}

function ext_reload_groups(callback) {
    p2p_send({ status: "ping" }, cfg.dbcon + "/lst_grp", function(result) {
        if (result.status == "pong") {
            indb.vis_groups = result.data;
            save(() => {
                callback();
            })
        } else {
            pops("Erro ao se comunicar com o servidor");
        }
    })
}

function ext_preload(callback) {
    ext_load_perm(() => {
        callback();
    });
    //ext_load_groups(() => {});
    //ext_load_users(() => {});
}

function ext_prereload(callback) {
    ext_reload_perm(() => {
        callback();
    });
/*
    ext_reload_groups(() => {
        ext_reload_users(() => { console.log(indb) });
    });//*/
}