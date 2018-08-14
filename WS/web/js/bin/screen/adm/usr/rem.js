var last = 0;
var max = cfg.maxlist;

function rem_usr_grp(name, grp) {
    var reason = prompt("Motivo:");
    if (reason == null) { return; }
    if (reason == "") {
        pops("descreva um motivo para a exclusão");
        return;
    }
    p2p_send({ user: name, grp: grp, reason: reason, status: "ping" }, cfg.dbcon + '/rem_grp_usr', function(result) {
        if (result.data == "removed") {
            pops(lang[result.data]);
        } else {
            pops("Contate o Administrador:\n" + JSON.stringify(result));
        }
        //lst_usr_edt();
    })
}

function recgn(grp, fathers) {
    var r = [];
    if (grp.son != undefined) {
        if (grp.son.length != -1) {
            for (j = 0; j < grp.son.length; j++) {
                if (fathers == "") {
                    r.push.apply(r, recgn(grp.son[j], grp.name + " > "));
                } else {
                    r.push.apply(r, recgn(grp.son[j], fathers + grp.name + " > "));
                }
            }
        }
    }
    r.push({
        id: grp.id,
        name: grp.name,
        name_: fathers + grp.name
    })
    return r;
}