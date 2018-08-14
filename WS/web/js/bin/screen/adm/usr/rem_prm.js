var last = 0;
var max = cfg.maxlist;

function lst_usr_atr_prm() {
    load_usr(() => {
        ext_reload_users(() => {
            var ptable = indb.vis_users;
            var p = document.getElementById("list_tb");
            p.innerHTML = "";
            var newElement = document.createElement('tr');
            newElement.setAttribute('id', "list_header");
            newElement.setAttribute('class', "list_header");
            newElement.innerHTML = "<td class='list_contrs_td'></td>" +
                "<td>Nº " +
                "<div class='dropdown'><button class='filter'onclick='sortTable(1)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb01' type=\"text\" onkeyup=\"filterTable(1,'tb01')\"></div></div></td>" +
                "</td><td>Usuário " +
                "<div class='dropdown'><button class='filter'onclick='sortTable(2)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb02' type=\"text\" onkeyup=\"filterTable(2,'tb02')\"></div></div></td>" +
                "</td><td>Nome " +
                "<div class='dropdown'><button class='filter'onclick='sortTable(3)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb03' type=\"text\" onkeyup=\"filterTable(3,'tb03')\"></div></div></td>" +
                "</td><td>Matricula " +
                "<div class='dropdown'><button class='filter'onclick='sortTable(4)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb04' type=\"text\" onkeyup=\"filterTable(4,'tb04')\"></div></div></td>" +
                "</td><td>CPF " +
                "<div class='dropdown'><button class='filter'onclick='sortTable(5)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb05' type=\"text\" onkeyup=\"filterTable(5,'tb05')\"></div></div></td>" +
                "</td><td> Ultimo Login " +
                "<div class='dropdown'><button class='filter'onclick='sortTable(6)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb06' type=\"text\" onkeyup=\"filterTable(6,'tb06')\"></div></div></td>" +
                "</td>";
            p.appendChild(newElement);
            if (ptable[0] != undefined) {
                for (i = 0; i < ptable.length; i++) {
                    var v = ptable[i];
                    var newElement = document.createElement('tr');
                    if (i >= max) { newElement.style.display = "none"; }
                    var t = v.user;
                    newElement.setAttribute('id', t);
                    var ll = v.last_login;
                    if (ll == null) { ll = "-"; } else {
                        ll = ll.substring(0, ll.indexOf("T"));
                    }
                    newElement.innerHTML = "<td class='list_contrs_td'>" +
                        "<div class='dropdown'>" +
                        "<button class='dropbtn opt_bot'>Opções</button>" +
                        "<div class='dropdown-content'>" +
                        "<input type=\"button\" value=\"Remover Permissão\" onclick=\"atr_prm('" + v.user + "')\">" +
                        "</div>" +
                        "</div></td>" +
                        "<td class='list_tb_td'>" + v.id_usr +
                        "</td><td class='list_tb_td'>" + v.user +
                        "</td><td class='list_tb_td'>" + v.usr_name +
                        "</td><td class='list_tb_td'>" + v.matric +
                        "</td><td class='list_tb_td'>" + v.cpf +
                        "</td><td class='list_tb_td'>" + ll + "</td>";
                    p.appendChild(newElement);
                }
            }
        });
    });
}

lst_usr_atr_prm();

function atr_prm(name) {
    var prmlst = "";
    push_usr_prm(name, function (ac_prm) {
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
            "<tr><td><center><select id='selection'>" + prmlst + "</select></center></td></tr>" +
            "<tr><td><center><button onclick='parent.reset();'>Voltar</button>" +
            "<button onclick= parent.send_atr_prm(document.getElementById(\"selection\"),'" + name + "');>Remover</button></center></td></tr></table><center>" +
            "");
        mb.setAttribute("class", "z10");
    })
}

function send_atr_prm(select, usr) {
    var prm = select.options[select.selectedIndex].value;
    p2p_send({ perm: prm, user: usr }, cfg.dbcon + "/rem_prm_usr", function (result) {
        if (result.status == 'deleted') {
            pops(lang[result.status]);
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
    reloadmainframe(50);
}

function push_usr_prm(usr, callback) {
    p2p_send({ user: usr, status: "ping" }, cfg.dbcon + "/get_prm_usr", function (result) {
        if (result.status == "pong") {
            var r = result.data;
            callback(r);
        } else {
            pops("Erro ao se comunicar com o servidor");
        }
    })
}