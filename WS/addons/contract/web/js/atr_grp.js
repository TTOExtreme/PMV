var last = 0;
var max = cfg.maxlist;


function lst_ctrct() {
    getlist(() => {
        var ptable = indb.addons['ctrct'];
        var p = document.getElementById("list_tb");
        p.innerHTML = "";
        var newElement = document.createElement('tr');
        newElement.setAttribute('id', "list_header");
        newElement.setAttribute('class', "list_header");
        newElement.innerHTML = "<td class='list_contrs_td'></td>" +
            "<td>ID " +
            "<div class='dropdown'><button class='filter'onclick='sortTable(0)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb01' type=\"text\" onkeyup=\"filterTable(0,'tb01')\"></div></div></td>" +
            "</td><td>P.C.Nº " +
            "<div class='dropdown'><button class='filter'onclick='sortTable(0)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb01' type=\"text\" onkeyup=\"filterTable(0,'tb01')\"></div></div></td>" +
            "</td><td>Nome " +
            "<div class='dropdown'><button class='filter'onclick='sortTable(2)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb03' type=\"text\" onkeyup=\"filterTable(2,'tb03')\"></div></div></td>" +
            "</td><td>Grupo " +
            "</td>";
        p.appendChild(newElement);
        if (ptable != undefined) {
            for (i = 0; i < ptable.length; i++) {
                var v = ptable[i];
                var ch = v.renewable;
                var num = v.num;
                if (ch > 0) { num += "-" + v.renewable }
                var newElement = document.createElement('tr');
                var t = v.id_ctrct;
                var d = v.ini_data;
                d = d.substring(0, d.indexOf("T"));
                newElement.setAttribute('id', t);
                newElement.setAttribute('class', 'table_tr');
                newElement.innerHTML = "<td class='list_contrs_td'>" +
                    "<div class='dropdown'>" +
                    "<button class='dropbtn opt_bot'>Opções</button>" +
                    "<div class='dropdown-content'>" +
                    "<input type=\"button\" value=\"Atribuir a Grupo\" onclick=\"atr_usr_grp('" + v.id_ctrct + "')\">" +
                    "</div>" +
                    "</div></td>" +
                    "<td class='list_tb_td'>" + v.id_ctrct +
                    "</td><td class='list_tb_td'>" + num +
                    "</td><td class='list_tb_td'>" + v.name +
                    "</td><td class='list_tb_td'>" + get_grp_name_id(v.grp_id) +
                    "</td>";
                p.appendChild(newElement);
            }
        } else {
            getlist(() => {
                lst_ctrct();
            });

        }
    })
}

function atr_usr_grp(name) {
    if (indb.vis_groups.length < 1) {
        ext_reload_groups(() => {
            atr_usr_grp(name);
        })
    } else {
        var gt = indb.vis_groups;
        var grpopt = "";
        for (i = 0; i < gt.length; i++) {
            grpopt += "<option>" + get_grp_name(gt[i]) + "</option>";
        }
        var htm = "<link rel = \"stylesheet\" type=\"text/css\" href=\"../../screens/css/main.css\">" +
            "<center><table class='z20'><tr><td><center><h3>Selecione o Grupo:</h3><center></td></tr>" +
            "<tr><center><td><select id='selection'>" + grpopt + "</select></td></center></tr>" +
            "<tr><td><center><button onclick='parent.reset();'>Voltar</button>" +
            "<button onclick= parent.send_atr_prm(document.getElementById(\"selection\"),'" + name + "');>Adicionar</button></center></td></tr></table><center>";

        var mb = document.getElementById("msg_box");
        mb.contentDocument.write(htm);
        mb.setAttribute('class', 'z10');
    }
}

function send_atr_prm(select, usr) {
    var grp = select.options[select.selectedIndex].value;
    grp = grp.substring(grp.lastIndexOf(">") + 2);
    p2p_send({ grp: grp, ctrct: usr }, cfg.dbcon + "addons/atr_ctrct_grp", function (result) {
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
        reloadmainframe(50);
    })
}

function reset() {
    var mb = document.getElementById("msg_box");
    mb.setAttribute("class", "z-10");
    mb.setAttribute('src', '');
}

function getlist(callback) {
    if (indb.vis_groups.length < 1) {
        ext_reload_groups(() => {
            getlist(callback);
        })
    } else {
        p2p_send({ status: "ping" }, cfg.dbcon + "addons/lst_ctrct_grp", function (result) {
            if (result.status == "pong") {
                indb.addons['ctrct'] = result.data;
                callback();
            } else {
                pops("Erro ao se comunicar com o servidor");
            }
        })
    }
}

lst_ctrct();