function save_config() {
    var pas1 = document.getElementById('pass1').value;
    var pas2 = document.getElementById('pass2').value;
    if (pas1 == pas2 &&
        !!pas1 &&
        !!pas2
    ) {
        var par = {
            user: indb.login.user,
            pass: sha2(indb.login.user + pas1 + indb.salt)
        }
        p2p_send(par, cfg.dbcon + "/edt_own", function (result) {
            if (result.data == 'added') {
                pops('Editado com sucesso');
                reset();
                RELOADINDB(() => { });
            } else {
                if (lang[result.data] == undefined) {
                    pops(result.data);
                } else {
                    pops(lang[result.data]);
                }
            }
        })
    } else {
        pops("Preencha todos os campos");
    }
}