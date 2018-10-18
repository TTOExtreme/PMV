function login() {
    var s = document.getElementById('logbot');
    s.style.backgroundColor = "#004040";
    if (loading) {
        setTimeout(() => {
            login();
        }, 1000);
    } else {
        DestroyINDB();
        var usr = document.getElementById('user').value;
        var pss = document.getElementById('pass').value;
        if (usr.split("").length == 5 && !isNaN(usr)) {
            usr = "0" + usr;
        }
        if (usr.split("").length == 4 && !isNaN(usr)) {
            usr = "00" + usr;
        }
        indb.login.user = usr;
        indb.login.pass = sha2(usr + pss + indb.salt);
        s.disabled = true;
        setTimeout(() => {
            var s = document.getElementById('logbot');
            s.style.backgroundColor = "#169e7e";
            s.disabled = false;
        }, 2000);
        login_check(function() {
            parsepost(cfg.incon + '/screens/main.html');
        }, function() {
            setTimeout(() => {
                var s = document.getElementById('logbot');
                s.style.backgroundColor = "#169e7e";
                s.disabled = false;
            }, 650);
        });
    }
}

function login_check(callback, err) {
    if (indb.logged) {
        callback();
        return;
    }
    if (indb.login.user != 0 && indb.login.pass != 0) {
        p2p_send({ status: "ping" }, cfg.dbcon + '/login', function(result) {
            if (result != null) {
                if (result.status == "pong") {
                    indb.logged = true;
                    forcesave(() => {
                        callback();
                    })
                } else {
                    if (err != null) { err(); }
                    pops("Falha ao conectar no servidor");
                }
            } else {
                if (err != null) { err(); }
                pops("Usuário não existe");
            }
        }, function() {
            if (err != null) { err(); }
        })
    } else {
        if (err != null) { err(); }
        if (indb.logged) {
            pops("Falha ao reconectar");
        } else {
            if (err != null) { err(); }
        }
        //pops("Falha ao reconectar");
    }
}