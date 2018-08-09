//group
function load_grp_add() {
    loadScript("/bin/screen/adm/grp/add.js");
}

function load_grp_edt() {
    loadScript("/bin/screen/adm/grp/edt.js");
}

function load_grp_lst() {
    loadScript("/bin/screen/adm/grp/lst.js");
}

function load_grp_del() {
    loadScript("/bin/screen/adm/grp/del.js");
}

function load_grp_atr_prm() {
    loadScript("/bin/screen/adm/grp/atr_prm.js");
}

function load_grp_atr() {
    loadScript("/bin/screen/adm/grp/atr.js");
}

function load_grp_rem() {
    loadScript("/bin/screen/adm/grp/rem.js");
}

function load_grp_rem_prm() {
    loadScript("/bin/screen/adm/grp/rem_prm.js");
}

//users
function load_usr_add() {
    loadScript("/bin/screen/adm/usr/add.js");
}

function load_usr_edt() {
    loadScript("/bin/screen/adm/usr/edt.js");
}

function load_usr_lst() {
    loadScript("/bin/screen/adm/usr/lst.js");
}

function load_usr_del() {
    loadScript("/bin/screen/adm/usr/del.js");
}

function load_usr_atr_prm() {
    loadScript("/bin/screen/adm/usr/atr_prm.js");
}

function load_usr_atr() {
    loadScript("/bin/screen/adm/usr/atr.js");
}

function load_usr_rem() {
    loadScript("/bin/screen/adm/usr/rem.js");
}

function load_usr_rem_prm() {
    loadScript("/bin/screen/adm/usr/rem_prm.js");
}
//aux

function load_log_lst() {
    loadScript("/bin/screen/adm/index.js");
}

function get_grp_name(grp) {
    if (grp.grpf_id != null) {
        for (k = 0; k < indb.vis_groups.length; k++) {
            var gs = indb.vis_groups[k];
            if (gs.id_grp == grp.grpf_id) {
                return get_grp_name(gs) + " > " + grp.grp_name;
            }
        }
    } else {
        return grp.grp_name;
    }
}

function get_user_name(id) {
    for (j = 0; j < indb.vis_users.length; j++) {
        if (indb.vis_users[j].id_usr == id) {
            return indb.vis_users[j].usr_name;
        }
    }
    return "-";
}


function get_grp_name_id(gid) {
    var gt = indb.vis_groups;
    for (k = 0; k < gt.length; k++) {
        if (gt[k].id_grp == gid) {
            var r = (get_grp_name(gt[k]));
            return r;
        }
    }
    return "-!-";
}

function get_grp_id_name(gname) {
    var gt = indb.vis_groups;
    var ng = gname.substring(gname.lastIndexOf(">"));
    for (k = 0; k < gt.length; k++) {
        if (gt[k].grp_name.indexOf(ng)) {
            var r = (get_grp_name(gt[k]));
            return r;
        }
    }
    return "-!-";
}