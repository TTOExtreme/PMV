var max = cfg.maxlist;
var lod = {};

var header = "";
var srch = "";

function lst_usr_edt() {
    load(() => {
        if (indb.vis_users == [] || indb.vis_groups == []) {
            console.log("reload users");
            ext_reload_users(() => {
                ext_reload_groups(() => {
                    lst_usr();
                });
            });
            return;
        } else {
            header = document.createElement('tr');
            header.setAttribute('id', "list_header");
            header.setAttribute('class', "list_header");
            header.innerHTML = "<td class='list_contrs_td'></td>" +
                "<td>Nº " +
                "</td><td>Usuário " +
                "</td><td>Nome " +
                "</td><td>Matricula " +
                "</td><td>CPF " +
                "</td><td>Grupo " +
                "</td><td> Ultimo Login " +
                "</td>";
            srch = document.createElement('tr');
            srch.setAttribute('id', "list_header");
            srch.setAttribute('class', "list_header");
            srch.innerHTML = "<td class='list_contrs_td'></td>" +
                "<td><input class='filter_input' id='tb01' type=\"text\" onkeyup=\"search(0,'tb01')\"></td>" +
                "<td><input class='filter_input' id='tb02' type=\"text\" onkeyup=\"search(1,'tb02')\"></td>" +
                "<td><input class='filter_input' id='tb03' type=\"text\" onkeyup=\"search(2,'tb03')\"></td>" +
                "<td><input class='filter_input' id='tb04' type=\"text\" onkeyup=\"search(3,'tb04')\"></td>" +
                "<td><input class='filter_input' id='tb05' type=\"text\" onkeyup=\"search(4,'tb05')\"></td>" +
                "<td><input class='filter_input' id='tb06' type=\"text\" onkeyup=\"search(5,'tb06')\"></td>" +
                "<td><input class='filter_input' id='tb07' type=\"text\" onkeyup=\"search(6,'tb07')\"></td>";
            var p = document.getElementById("list_tb");
            p.innerHTML = "";
            p.appendChild(header);
            p.appendChild(srch);
            search(0, 'tb01');
        }
    });
}

function search(i, id) {
    var txt = document.getElementById(id).value;
    var json = {
        src: "1",
        id_usr: "",
        user: "",
        usr_name: "",
        matric: "",
        cpf: "",
        grp_id: "",
        last_login: ""
    }
    if (i == 0) { json.id_usr = txt; }
    if (i == 1) { json.user = txt; }
    if (i == 2) { json.usr_name = txt; }
    if (i == 3) { json.matric = txt; }
    if (i == 4) { json.cpf = txt; }
    if (i == 5) { json.grp_id = txt; }
    if (i == 6) { json.last_login = txt; }

    WSPush(json, () => {
        reload_list();
        document.getElementById(id).focus();
    })
}

function WSPush(json, callback) {
    p2p_send(json, cfg.dbcon + "/lst_usr", function (result) {
        if (result.status == "pong") {
            indb.vis_users = result.data;
            save(() => {
                callback();
            })
        } else {
            pops("Erro ao se comunicar com o servidor");
        }
    })
}

function reload_list() {
    var ptable = indb.vis_users;
    var p = document.getElementById("list_tb");
    p.innerHTML = "";
    p.appendChild(header);
    p.appendChild(srch);

    if (ptable[0] != undefined) {
        for (i = 0; i < ptable.length; i++) {
            var v = ptable[i];
            var newElement = document.createElement('tr');
            if (i >= max) { newElement.style.display = "none"; }
            var t = v.user;
            newElement.setAttribute('id', t);
            newElement.setAttribute('class', "table_tr");
            var ll = v.last_login;
            if (ll == null) { ll = "-"; } else {
                ll = ll.substring(0, ll.indexOf("T"));
            }
            var htm = "<td class='list_contrs_td'>" +
                "<div class='dropdown'>" +
                "<button class='dropbtn opt_bot'>Opções</button>" +
                "<div class='dropdown-content'>" +
                "<input type=\"button\" value=\"Editar\" onclick=\"edt('" + v.user + "')\">" +
                "<input type=\"button\" value=\"Resetar Senha\" onclick=\"rst('" + v.user + "')\">";

            if (indb.permissions.findIndex(x => x.name === "acc_edtusers_prm") > 0) {
                if (lod.atr != true) {
                    lod.atr = true;
                    loadMainScripter("/bin/screen/adm/usr/atr_prm.js");
                }
                htm += "<input type=\"button\" value=\"Permissões\" onclick=\"atr_prm('" + v.user + "')\">";
            }
            if (indb.permissions.findIndex(x => x.name === "acc_edtusers_del") > 0) {
                if (lod.del != true) {
                    lod.del = true;
                    loadMainScripter("/bin/screen/adm/usr/del.js");
                }
                htm += "<input type=\"button\" value=\"Excluir\" onclick=\"del_usr('" + v.user + "')\">";
            }
            if (indb.permissions.findIndex(x => x.name === "acc_edtusers_rem") > 0) {
                if (lod.rem != true) {
                    lod.rem = true;
                    loadMainScripter("/bin/screen/adm/usr/rem.js");
                }
                htm += "<input type=\"button\" value=\"Remov. de Grupo\" onclick=\"rem_usr_grp('" + v.user + "','" + get_grp_name_id(v.grp_id) + "')\">";
            }
            if (indb.permissions.findIndex(x => x.name === "acc_edtusers_atr") > 0) {
                if (lod.atrg != true) {
                    lod.atrg = true;
                    loadMainScripter("/bin/screen/adm/usr/atr.js");
                }
                htm += "<input type=\"button\" value=\"Atrb. a Grupo\" onclick=\"atr_usr_grp('" + v.user + "')\">";
            }

            htm += "</div>" +
                "</div></td>" +
                "<td class='list_tb_td' title='" + v.id + "'>" + v.id_usr +
                "</td><td class='list_tb_td' title='" + v.user + "'>" + v.user +
                "</td><td class='list_tb_td' style='max-width:200px;' title='" + v.usr_name + "'>" + v.usr_name +
                "</td><td class='list_tb_td' title='" + v.matric + "'>" + v.matric +
                "</td><td class='list_tb_td' title='" + v.cpf + "'>" + v.cpf +
                "</td><td class='list_tb_td' style='max-width:200px;' title='" + get_grp_name_id(v.grp_id) + "'>" + get_grp_name_id(v.grp_id) +
                "</td><td class='list_tb_td' title='" + ll + "'>" + ll + "</td>";
            newElement.innerHTML = htm;
            p.appendChild(newElement);
        }
    }
}


lst_usr_edt();

function edt(name) {
    var usr;
    for (i = 0; i < indb.vis_users.length; i++) {
        if (indb.vis_users[i].user == name) {
            usr = indb.vis_users[i];
        }
    }
    var mb = document.getElementById("msg_box");
    mb.contentDocument.write("<link rel = \"stylesheet\" type=\"text/css\" href=\"../../../css/main.css\">" +
        "<center><table class='z20'>" +
        "<tr><td><center>Usuário:</td><td><input id='user' type='text' value='" + usr.user + "'></td></tr>" +
        "<tr><td><center>Nome:</td><td><input id='name' type='text' value='" + usr.usr_name + "'></td></tr>" +
        "<tr><td><center>Matricula:</td><td><input id='matric' type='text' value='" + usr.matric + "'></td></tr>" +
        "<tr><td><center>CPF:</td><td><input id='cpf' type='text' value='" + usr.cpf + "'></td></tr>" +
        "<tr><td><center><button onclick='parent.reset();'>Voltar</button>" +
        "<button onclick= parent.edtdoc(document,'" + name + "');>Editar</button></center></td></tr></table><center>" +
        "");
    mb.setAttribute("class", "z10");
}

function edtdoc(doc, usr) {
    var usrn = doc.getElementById('user').value;
    var nam = doc.getElementById('name').value;
    var mtc = doc.getElementById('matric').value;
    var cpf = doc.getElementById('cpf').value;
    if (!!usrn &&
        !!nam &&
        !!mtc &&
        !!cpf
    ) {
        var par = {
            user: usr,
            usern: usrn,
            name: nam,
            matric: mtc,
            cpf: cpf
        }
        p2p_send(par, cfg.dbcon + "/edt_usr", function (result) {
            if (result.data == 'added') {
                pops('Editado com sucesso');
            } else {
                if (lang[result.data] == undefined) {
                    pops(result.data);
                } else {
                    pops(lang[result.data]);
                }
            }
            reloadmainframe(50);
        })
    } else {
        pops("Preencha todos os campos");
    }
}

function rst(usr) {
    var pss = prompt("Nova senha:", "");
    if (pss == null) { return; }

    if (pss != "") {
        var par = {
            user: usr,
            pass: sha2(usr + pss + indb.salt)
        }
        p2p_send(par, cfg.dbcon + "/rst_usr", function (result) {
            if (result.data == 'added') {
                pops("Resetado");
            } else {
                if (lang[result.data] == undefined) {
                    pops(result.data);
                } else {
                    pops(lang[result.data]);
                }
            }
        })
    } else {
        pops("Campo vazio");
    }
}

function reset() {
    var mb = document.getElementById("msg_box");
    mb.setAttribute("class", "z-10");
    mb.setAttribute('src', '');
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

var actpos = 1; //position for list

function nexttable(val) {
    var table, tr;

    table = document.getElementById("list_tb");
    tr = table.getElementsByTagName("tr");
    if ((actpos + val < tr.length && actpos + val + cfg.maxlist > tr.length) || actpos + val + cfg.maxlist < tr.length) {
        for (i = actpos; i < actpos + cfg.maxlist; i++) {
            if (tr[i]) {
                tr[i].style.display = "none";
            }
        }

        for (i = actpos + val; i < actpos + val + cfg.maxlist; i++) {
            if (tr[i]) {
                tr[i].style.display = "";
            }
        }
        actpos += val;
    }
}

function prevtable(val) {
    var table, tr;

    table = document.getElementById("list_tb");
    tr = table.getElementsByTagName("tr");

    for (i = actpos; i < actpos + cfg.maxlist; i++) {
        if (tr[i]) {
            tr[i].style.display = "none";
        }
    }
    if (actpos - val < 1) { actpos = val + 1; }

    for (i = actpos - val; i < actpos - val + cfg.maxlist; i++) {
        if (tr[i]) {
            tr[i].style.display = "";
        }
    }

    actpos -= val;
}