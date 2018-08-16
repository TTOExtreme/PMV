var grouplist = [];
var lod = {};

function lst_grp_edt() {
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
        grouplist = indb.vis_groups;
        if (ptable[0] != undefined) {
            for (i = 0; i < ptable.length; i++) {
                var v = ptable[i];
                var newElement = document.createElement('tr');
                newElement.setAttribute('class', 'table_tr');
                var htm = "<td class='list_contrs_td'>" +
                    "<div class='dropdown'>" +
                    "<button class='dropbtn opt_bot'>Opções</button>" +
                    "<div class='dropdown-content'>" +
                    "<input type=\"button\" value=\"Editar\" onclick=\"edt('" + v.id_grp + "')\">";

                if (indb.permissions.findIndex(x => x.name === "acc_edtgroup_prm") > 0) {
                    if (lod.atr != true) {
                        lod.atr = true;
                        loadMainScripter("/bin/screen/adm/grp/atr_prm.js");
                    }
                    htm += "<input type=\"button\" value=\"Permissões\" onclick=\"atr_prm('" + v.grp_name + "')\">";
                }
                if (indb.permissions.findIndex(x => x.name === "acc_edtgroup_del") > 0) {
                    if (lod.del != true) {
                        lod.del = true;
                        loadMainScripter("/bin/screen/adm/grp/del.js");
                    }
                    htm += "<input type=\"button\" value=\"Excluir\" onclick=\"del_grp('" + v.grp_name + "')\">";
                }
                if (indb.permissions.findIndex(x => x.name === "acc_edtgroup_atr") > 0) {
                    if (lod.atrg != true) {
                        lod.atrg = true;
                        loadMainScripter("/bin/screen/adm/grp/atr.js");
                    }
                    htm += "<input type=\"button\" value=\"Atrib. a Grupo\" onclick=\"atr_grp('" + v.grp_name + "')\">";
                }
                if (indb.permissions.findIndex(x => x.name === "acc_edtgroup_rem") > 0) {
                    if (lod.rem != true) {
                        lod.rem = true;
                        loadMainScripter("/bin/screen/adm/grp/rem.js");
                    }
                    htm += "<input type=\"button\" value=\"Remov. de Grupo\" onclick=\"rem_grp('" + v.grp_name + "')\">";
                }

                htm +=
                    "</div>" +
                    "</div></td>" +
                    "<td class='list_tb_td'>" + v.id_grp +
                    "</td><td class='list_tb_td'>" + get_grp_name(v) +
                    "</td><td class='list_tb_td'>" + get_user_name(v.grp_crt_usr) +
                    "</td><td class='list_tb_td'>" + v.heranca + "</td>";
                newElement.innerHTML = htm;
                p.appendChild(newElement);
            }
        }
    });
}

lst_grp_edt();


function edt(id) {
    var usr;
    for (i = 0; i < grouplist.length; i++) {
        if (grouplist[i].id_grp == id) {
            usr = grouplist[i];
        }
    }
    var mb = document.getElementById("msg_box");
    var her = "";
    if (usr.heranca == 0) { her += "<option selected='selected'>Não</option>" } else { her += "<option>Não</option>" }
    if (usr.heranca == 1) { her += "<option selected='selected'>Sim</option>" } else { her += "<option>Sim</option>" }
    mb.contentDocument.write("<link rel = \"stylesheet\" type=\"text/css\" href=\"../../../css/main.css\">" +
        "<center><table class='z20'>" +
        "<tr><td><center>Nome:<input id='name' type='text' value='" + usr.grp_name + "'></td></tr>" +
        "<tr><td><center>Herança:<select id='heranca'>" + her + "</select></tr>" +
        "<tr><td><center><button onclick='parent.reset();'>Voltar</button>" +
        "<button onclick= parent.edtdoc(document,'" + usr.grp_name + "');>Editar</button></td></tr>" +
        "</table></center>");
    mb.setAttribute("class", "z10");
}

function edtdoc(doc, usr) {
    var nam = doc.getElementById('name').value;
    var mtc = doc.getElementById('heranca');
    mtc = mtc.selectedIndex;
    if (nam != null &&
        mtc != null
    ) {
        var par = {
            name: usr,
            namen: nam,
            heranca: mtc
        }
        p2p_send(par, cfg.dbcon + "/edt_grp", function(result) {
            if (result.data == 'modified') {
                pops('Editado com sucesso');
                reloadmainframe(100);
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


function reset() {
    var mb = document.getElementById("msg_box");
    mb.setAttribute("class", "z-10");
    mb.setAttribute('src', '');
}