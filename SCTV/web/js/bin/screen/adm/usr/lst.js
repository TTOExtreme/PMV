var last = 0;
var max = cfg.maxlist;

var header = "";
var srch = "";

function lst_usr() {
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
            header.innerHTML = "" +
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
            srch.innerHTML = "" +
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
            if (i >= max) { last = max; }
            var t = v.user;
            newElement.setAttribute('id', t);
            newElement.setAttribute('class', "table_tr");
            var ll = v.last_login;
            if (ll == null) { ll = "-"; } else {
                ll = ll.substring(0, ll.indexOf("T"));
            }
            newElement.innerHTML = "" +
                "<td class='list_tb_td' title='" + v.id_usr + "'>" + v.id_usr +
                "</td><td class='list_tb_td' title='" + v.user + "'>" + v.user +
                "</td><td class='list_tb_td' style='max-width:200px;' title='" + v.usr_name + "'>" + v.usr_name +
                "</td><td class='list_tb_td' title='" + v.matric + "'>" + v.matric +
                "</td><td class='list_tb_td' title='" + v.cpf + "'>" + v.cpf +
                "</td><td class='list_tb_td' style='max-width:200px;'title='" + get_grp_name_id(v.grp_id) + "'>" + get_grp_name_id(v.grp_id) +
                "</td><td class='list_tb_td' title='" + ll + "'>" + ll + "</td>";
            p.appendChild(newElement);
        }
    }
}

lst_usr();