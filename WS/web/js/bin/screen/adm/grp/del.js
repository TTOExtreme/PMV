function del_grp(name) {
    var reason = prompt("Motivo:");
    if (reason == null) { return; }
    if (reason == "") {
        pops("descreva um motivo para a exclusão");
        return;
    }
    p2p_send({ reason: reason, grp: name }, cfg.dbcon + "/del_grp", function(result) {
        if (result.data == 'removed') {
            if (lang[result.data] == undefined) {
                pops("Contate o Administrador:\n" + JSON.stringify(result));
            } else {
                pops(lang[result.data]);
            }
            RELOADINDB(() => { parent.reloadmainframe(10); });
        } else {
            if (lang[result.data] == undefined) {
                pops("Contate o Administrador:\n" + JSON.stringify(result));
            } else {
                pops(lang[result.data]);
            }
        }
    })
}