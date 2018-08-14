function rem_grp(name) {
    var reason = prompt("Motivo:");
    if (reason == null) { return; }
    if (reason == "") {
        pops("descreva um motivo para a exclusão");
        return;
    }
    p2p_send({ grps: name, reason: reason, status: "ping" }, cfg.dbcon + '/rem_grp_grp', function(result) {
        if (result.data == "removed") {
            pops(lang[result.data]);
            lst_grp_edt();
        } else {
            pops("Contate o Administrador:\n" + JSON.stringify(result));
        }
    })
}