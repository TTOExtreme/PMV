
function del_ctrct(v) {
    var reason = prompt("Motivo:");
    if (reason == null) { return; }
    if (reason == "") {
        pops("descreva um motivo para a exclusão");
        return;
    }
    p2p_send({ id: v.id_ctrct, reason: reason, status: "ping" }, cfg.dbcon + 'addons/del_ctrct', function (result) {
        pops(lang[result.data]);
        reloadmainframe(10);
    })
}
