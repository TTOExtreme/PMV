var last = 0;
var max = cfg.maxlist;

function lst_usr_atr() {
    load_usr(() => {
        ext_reload_users(() => {
            ext_reload_groups(() => {
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
                    "</td><td> Grupo Associado " +
                    "<div class='dropdown'><button class='filter'onclick='sortTable(6)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb06' type=\"text\" onkeyup=\"filterTable(6,'tb06')\"></div></div></td>" +
                    "</td>";
                p.appendChild(newElement);

                if (ptable[0] != undefined) {
                    for (i = 0; i < ptable.length; i++) {
                        var v = ptable[i];
                        var newElement = document.createElement('tr');
                        if (i >= max) { newElement.style.display = "none"; }
                        var t = v.username;
                        newElement.setAttribute('id', t);
                        newElement.setAttribute('class', "table_tr");
                        var ll = v.grp_id;
                        if (ll == null) {
                            ll = "-";
                        } else {
                            ll = get_grp_name_id(ll);
                        }
                        newElement.innerHTML = "<td class='list_contrs_td'>" +
                            "<div class='dropdown'>" +
                            "<button class='dropbtn opt_bot'>Opções</button>" +
                            "<div class='dropdown-content'>" +
                            "<input type=\"button\" value=\"Atribuir a Grupo\" onclick=\"atr_usr_grp('" + v.user + "')\">" +
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
    });
}

//lst_usr_atr();

function atr_usr_grp(name) {
    var gt = indb.vis_groups;
    var grpopt = "";
    for (i = 0; i < gt.length; i++) {
        grpopt += "<option>" + get_grp_name(gt[i]) + "</option>";
    }
    var htm = "<link rel = \"stylesheet\" type=\"text/css\" href=\"../../../css/main.css\">" +
        "<center><table class='z20'><tr><td><center><h3>Selecione o grupo:</h3><center></td></tr>" +
        "<tr><td><center><select id='selection'>" + grpopt + "</select></center></td></tr>" +
        "<tr><td><center><button onclick='parent.reset();'>Voltar</button>" +
        "<button onclick= parent.send_atr_prm(document.getElementById(\"selection\"),'" + name + "');>Adicionar</button></center></td></tr></table><center>";

    var mb = document.getElementById("msg_box");
    mb.contentDocument.write(htm);
    mb.setAttribute('class', 'z10');
}

function send_atr_prm(select, usr) {
    var grp = select.options[select.selectedIndex].value;
    grp = grp.substring(grp.lastIndexOf(">") + 1);
    p2p_send({ grp: grp, user: usr }, cfg.dbcon + "/atr_grp_usr", function(result) {
        if (result.data == 'added') {
            if (lang[result.data] == undefined) {
                pops("Contate o Administrador:\n" + JSON.stringify(result));
            } else {
                pops(lang[result.data]);
            }
        } else {
            if (lang[result.data] == undefined) {
                pops("Contate o Administrador:\n" + JSON.stringify(result));
            } else {
                pops(lang[result.data]);
            }
        }
        //lst_usr_edt();
    })
}

function reset() {
    var mb = document.getElementById("msg_box");
    mb.setAttribute("class", "z-10");
    mb.setAttribute('src', '');
}