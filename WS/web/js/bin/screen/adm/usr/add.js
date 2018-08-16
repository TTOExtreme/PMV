function crt_usr() {
    var dat = JSON.parse(sessionStorage.getItem('data'));
    var usr = document.getElementById('user').value;
    var pss1 = document.getElementById('pass1').value;
    var pss2 = document.getElementById('pass2').value;
    var nam = document.getElementById('name').value;
    var mtc = document.getElementById('matric').value;
    var cpf = document.getElementById('cpf').value;
    if (pss1 == pss2 &&
        !!usr &&
        !!pss1 &&
        !!pss2 &&
        !!nam &&
        !!mtc &&
        !!cpf
    ) {
        var par = {
            user: usr,
            pass: sha2(usr + pss1 + indb.salt),
            name: nam,
            matric: mtc,
            cpf: cpf
        }
        p2p_send(par, cfg.dbcon + '/crt_usr', function(result) {
            pops(lang.created);
            reloadmainframe(50);
        })
    } else {
        pops("Preencha todos os campos");
    }
}