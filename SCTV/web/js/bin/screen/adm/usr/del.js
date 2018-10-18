function del_usr(name) {
    var reason = prompt("Motivo:");
    if (reason == null) { return; }
    if (reason == "") {
        pops("descreva um motivo para a exclusão");
        return;
    }
    p2p_send({ user: name, reason: reason, status: "ping" }, cfg.dbcon + '/del_usr', function(result) {
        pops(lang[result.data]);
        reloadmainframe(100);
    })
}