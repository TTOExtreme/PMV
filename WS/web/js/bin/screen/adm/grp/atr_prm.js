var permlist = [];

function atr_prm(name) {
    var prmlst = "";
    push_grp_prm(name, function(ac_prm) {
        for (i = 0; i < indb.permissions.length; i++) {
            if (ac_prm.indexOf(indb.permissions[i].name + "\"") > -1) {
                prmlst += "<tr><td><div title='" + indb.permissions[i].name + "'><input type='checkbox' id='" + indb.permissions[i].name +
                    "' onclick='parent.select_perm(document.getElementById(\"" + indb.permissions[i].name + "\"),\"" + indb.permissions[i].name + "\");' checked>" + indb.permissions[i].desc + "</div>";
                permlist.push({ perm: indb.permissions[i].name, state: true, last: true });
            } else {
                prmlst += "<tr><td><div title='" + indb.permissions[i].name + "'><input type='checkbox' id='" + indb.permissions[i].name +
                    "' onclick='parent.select_perm(document.getElementById(\"" + indb.permissions[i].name + "\"),\"" + indb.permissions[i].name + "\");'>" + indb.permissions[i].desc + "</div>";
                permlist.push({ perm: indb.permissions[i].name, state: false, last: false });
            }
        }
        var mb = document.getElementById("msg_box");
        mb.contentDocument.write("<link rel = \"stylesheet\" type=\"text/css\" href=\"../../../css/main.css\">" +
            "<center><table class='z20'><tr><td><center><h3>Selecione as permissões:</h3><center></td></tr>" +
            "<tr><td><center><div style='overflow-y:scroll;max-height:400px;'><table>" + prmlst + "</table></div></center></td></tr>" +
            "<tr><td><center><button onclick='parent.reset();'>Voltar</button>" +
            "<button onclick= parent.send_atr_prm(0,'" + name + "');>Adicionar</button></center></td></tr></table><center>" +
            "");
        mb.setAttribute("class", "z10");
    })
}

function select_perm(chk, perm) {
    for (i = 0; i < permlist.length; i++) {
        if (permlist[i].perm == perm) {
            permlist[i].state = chk.checked;
        }
    }
}

function send_atr_prm(i, usr) {
    var loc = cfg.dbcon + "/atr_prm_grp";
    if (permlist[i].state != permlist[i].last) {
        if (permlist[i].state) {
            loc = cfg.dbcon + "/atr_prm_grp";
        } else {
            loc = cfg.dbcon + "/rem_prm_grp";
        }

        p2p_send({ perm: permlist[i].perm, grp: usr }, loc, function(result) {
            if (result.status == 'added' || result.status == 'removed') {
                if (i + 1 < permlist.length) {
                    send_atr_prm(i + 1, usr);
                } else {
                    reloadmainframe(20);
                }
            } else {
                if (lang[result.status] == undefined) {
                    pops(result.status);
                } else {
                    pops(lang[result.status]);
                }
            }
        })
    } else {
        if (i + 1 < permlist.length) {
            send_atr_prm(i + 1, usr);
        } else {
            reloadmainframe(20);
        }
    }
}


function push_grp_prm(grp, callback) {
    p2p_send({ grp: grp, status: "ping" }, cfg.dbcon + "/get_prm_grp", function(result) {
        if (result.status == "pong") {
            var r = result.data;
            callback(r);
        } else {
            pops("Erro ao se comunicar com o servidor");
        }
    })
}