function crt_grp() {
    var dat = JSON.parse(sessionStorage.getItem('data'));
    var nam = document.getElementById('name').value;
    var sl = document.getElementById('heranca');
    var her = sl.selectedIndex;

    if (!!nam) {
        var par = {
            name: nam,
            heranca: her
        }

        p2p_send(par, cfg.dbcon + '/crt_grp', function(result) {
            RELOADINDB(() => {
                pops(lang.created);
                reloadmainframe(10);
            });
        })
    } else {
        pops("Preencha todos os campos");
    }
}