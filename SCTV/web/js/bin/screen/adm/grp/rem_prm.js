function lst_grp_atr() {
    ext_reload_groups(() => {
        var p = document.getElementById("list_tb");
        p.innerHTML = "";
        var newElement = document.createElement('tr');
        newElement.setAttribute('id', "list_header");
        newElement.setAttribute('class', "list_header");
        newElement.innerHTML = "<td class='list_contrs_td'>" +
            "<td>Nº " +
            "<div class='dropdown'><button class='filter' onclick='sortTable(1)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb01' type=\"text\" onkeyup=\"filterTable(1,'tb01')\"></div></div></td>" +
            "</td><td>Nome " +
            "<div class='dropdown'><button class='filter' onclick='sortTable(2)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb02' type=\"text\" onkeyup=\"filterTable(2,'tb02')\"></div></div></td>" +
            "</td><td> Criado por " +
            "<div class='dropdown'><button class='filter' onclick='sortTable(3)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb03' type=\"text\" onkeyup=\"filterTable(3,'tb03')\"></div></div></td>" +
            "</td><td>Herança " +
            "<div class='dropdown'><button class='filter' onclick='sortTable(4)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb04' type=\"text\" onkeyup=\"filterTable(4,'tb04')\"></div></div></td>" +
            "</td>";
        p.appendChild(newElement);
        var ptable = indb.vis_groups;
        if (ptable[0] != undefined) {
            for (i = 0; i < ptable.length; i++) {
                var v = ptable[i];
                var newElement = document.createElement('tr');
                newElement.innerHTML = "<td class='list_contrs_td'>" +
                    "<div class='dropdown'>" +
                    "<button class='dropbtn opt_bot'>Opções</button>" +
                    "<div class='dropdown-content'>" +
                    "<input type=\"button\" value=\"Remover Permissão\" onclick=\"atr_prm('" + v.grp_name + "')\">" +
                    "</div>" +
                    "</div></td>" +
                    "<td class='list_tb_td'>" + v.id_grp +
                    "</td><td class='list_tb_td'>" + get_grp_name(v) +
                    "</td><td class='list_tb_td'>" + get_user_name(v.grp_crt_usr) +
                    "</td><td class='list_tb_td'>" + v.heranca + "</td>";
                p.appendChild(newElement);
            }
        }
    });
}

lst_grp_atr();

function atr_prm(name) {
    var prmlst = "";
    push_usr_prm(name, function(ac_prm) {
        for (i = 0; i < indb.permissions.length; i++) {
            if (ac_prm.indexOf(indb.permissions[i].name + "\"") == -1) {
                prmlst += "<option style='background:rgba(255,0,0,.8);' disabled='disabled' title='" + indb.permissions[i].desc + "'> - " + indb.permissions[i].name + "</option>";
            } else {
                prmlst += "<option title='" + indb.permissions[i].desc + "'>" + indb.permissions[i].name + "</option>";
            }
        }
        var mb = document.getElementById("msg_box");
        mb.contentDocument.write("<link rel = \"stylesheet\" type=\"text/css\" href=\"../../../css/main.css\">" +
            "<center><table class='z20'><tr><td><center><h3>Selecione a permissão:</h3><center></td></tr>" +
            "<tr><td><select id='selection'>" + prmlst + "</select></td></tr>" +
            "<tr><td><center><button onclick='parent.reset();'>Voltar</button>" +
            "<button onclick= parent.send_atr_prm(document.getElementById(\"selection\"),'" + name + "');>Remover</button></td></tr></table><center>" +
            "");
        mb.setAttribute("class", "z10");
    })
}

function send_atr_prm(select, grp) {
    var prm = select.options[select.selectedIndex].value;
    p2p_send({ perm: prm, grp: grp }, cfg.dbcon + "/rem_prm_grp", function(result) {
        if (result.status == 'deleted') {
            pops(lang[result.status]);
            reset();
        } else {
            if (lang[result.status] == undefined) {
                pops(result.status);
            } else {
                pops(lang[result.status]);
            }
        }
    })
}

function reset() {
    var mb = document.getElementById("msg_box");
    mb.setAttribute("class", "z-10");
    mb.setAttribute('src', '');
}

function push_usr_prm(grp, callback) {
    p2p_send({ grp: grp, status: "ping" }, cfg.dbcon + "/get_prm_grp", function(result) {
        if (result.status == "pong") {
            var r = result.data;
            callback(r);
        } else {
            pops("Erro ao se comunicar com o servidor");
        }
    })
}