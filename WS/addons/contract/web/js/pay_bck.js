function lst_pay(ctrct_data) {
    var ctrct_data_prs = (ctrct_data);
    if (indb.vis_users.length < 1) {
        ext_reload_users(() => {
            lst_pay(ctrct_data);
        })
    } else {
        var ptable = ctrct_data_prs.pays;

        if (indb.permissions.findIndex(x => x.name === "acc_ctraddon-contract_add_pay") > 0) {
            var htm = "<tr><td><button style='margin-left:20px' onclick='closectrct();'>Voltar</button>";
            htm += "<button style='margin-left:20px' onclick='add_pay(" + JSON.stringify(ctrct_data) + ");'>Add. Pagamento</button></td></tr>";
            document.getElementById('mf_table_controls').innerHTML = htm;
        }

        var p = document.getElementById("list_tb");
        p.innerHTML = "";
        var newElement = document.createElement('tr');
        newElement.setAttribute('id', "list_header");
        newElement.setAttribute('class', "list_header");
        newElement.innerHTML = "<td class='list_contrs_td'></td>" +
            "</td><td>Data " +
            "<div class='dropdown'><button class='filter'onclick='sortTable(1)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb01' type=\"text\" onkeyup=\"filterTable(1,'tb01')\"></div></div></td>" +
            "</td><td>Valor " +
            "<div class='dropdown'><button class='filter'onclick='sortTable(2)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb02' type=\"text\" onkeyup=\"filterTable(2,'tb02')\"></div></div></td>" +
            "</td><td>Responsavel " +
            "<div class='dropdown'><button class='filter'onclick='sortTable(3)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb03' type=\"text\" onkeyup=\"filterTable(3,'tb03')\"></div></div></td>" +
            "</td><td>Abrir " +
            "</td>";
        p.appendChild(newElement);
        if (ptable != undefined) {
            for (i = 0; i < ptable.length; i++) {
                var v = ptable[i];
                var newElement = document.createElement('tr');
                var t = v.id_pay;
                var d = v.data;
                d = d.substring(0, d.indexOf("T"));
                newElement.setAttribute('id', t);

                var htm = "";
                if (indb.permissions.findIndex(x => x.name === "acc_ctraddon-contract_rem_pay") > 0) {
                    htm += "<button onclick='rem_pay(" + JSON.stringify(v) + "," + JSON.stringify(ctrct_data_prs) + ");'>Rem. Pagamento</button>";
                }
                if (indb.permissions.findIndex(x => x.name === "acc_ctraddon-contract_edt_pay") > 0) {
                    htm += "<button onclick='edt_pay(" + JSON.stringify(v) + ");'>Editar Pagamento</button>";
                }

                newElement.innerHTML = "<td class='list_contrs_td'>" +
                    "<div class='dropdown'>" +
                    "<button class='dropbtn opt_bot'>Opções</button>" +
                    "<div class='dropdown-content'>" +
                    htm +
                    "</div>" +
                    "</div></td>" +
                    "</td><td class='list_tb_td'>" + d +
                    "</td><td class='list_tb_td'>" + v.value +
                    "</td><td class='list_tb_td'>" + get_user_name(v.crt_usr_id) +
                    "</td><td class='list_tb_td'>" + "<a onclick='openpay(" + JSON.stringify(v) + "," + JSON.stringify(ctrct_data_prs) + ");'>Abrir</a>" +
                    "</td>";
                p.appendChild(newElement);
            }
        }
    }
}


function openpay(v, w) {
    document.getElementById('mf_table_header').setAttribute('style', 'display:none');
    var htm = "<tr><td><button style='margin-left:20px' onclick='lst_pay(" + JSON.stringify(w) + ");'>Voltar</button>";

    htm += "</td></tr>";
    document.getElementById('mf_table_controls').innerHTML = htm;
    var p = document.getElementById("list_tb");
    var d = v.data;
    d = d.substring(0, d.indexOf("T"));
    p.innerHTML = "" +
        "<tr class ='list_header'>" +
        "<td>Data " +
        "</td><td>Valor " +
        "</td><td>Responsavel " +
        "</td></tr>" +
        "<tr>" +
        "</td><td class='list_tb_td'>" + d +
        "</td><td class='list_tb_td'>" + v.value +
        "</td><td class='list_tb_td'>" + get_user_name(v.crt_usr_id) +
        "</td></tr>" +
        "<tr><td colspan='6'><iframe style='width:99%;height:80vh;' src='" + cfg.localfiles + "/pay/" + v.file + ".pdf'></td></tr>";
}

function add_pay(v) {
    var htm = "<link rel = 'stylesheet' type='text/css' href='../../../css/main.css'>" +
        "<script type='text/javascript' src='../../js/libs/jquery.min.js'></script>" +
        "<script type='text/javascript' src='../../js/mainscripter.js'></script>" +
        "<script type='text/javascript' src='./js/pay.js'></script>" +
        "<form id='frm' target='mf' method='post' enctype='multipart/form-data'>" +
        "<center><table class='z20'><tr><td><center><h3>Adicionar Pagamento:</h3><center></td></tr>" +
        "<tr><center><td style='float: right;'>Data: </td><td><input id='ini_data' type='date'></td></center></tr>" +
        "<tr><center><td style='float: right;'>Valor: </td><td><input id='value' type='text'></td></center></tr>" +
        "<tr><center><td style='display:none;'><input id='fname' name='fname' type='text'></td></center></tr>" +
        "<tr><center><td style='float: right;'>Arquivo: </td><td><input id='file' name='file' type='file'  multiple='multiple'></td></center></tr>" +
        "<tr><td style='float: right;'><center><button onclick='parent.reset();'>Voltar</button>" +
        "<button onclick='add_pay_sub(" + JSON.stringify(v) + ");'>Adicionar</button></td></tr></table><center>" +
        "<iframe style='display: none' name='mf' id='mf'></iframe>";

    var mb = document.getElementById("msg_box");
    mb.contentDocument.write(htm);
    mb.setAttribute('class', 'z10');
}

function reset() {

    var mb = document.getElementById("msg_box");
    mb.setAttribute("class", "z-10");
    mb.setAttribute('src', '');
}

function add_pay_sub(v) {
    var val = document.getElementById('value').value;
    var dat = document.getElementById('ini_data').value;
    var file = document.getElementById('file');
    if (file.files[0]) {
        if (
            val != undefined &&
            dat != undefined
        ) {
            if (val.indexOf(",") == -1) { val = val + ",00"; }
            val = val.replace(".", "").replace(".", "").replace(",", ".");
            var form = document.getElementById('frm');
            file = getData();

            document.getElementById('fname').setAttribute('value', file);
            form.setAttribute('method', 'POST');
            form.setAttribute('enctype', "multipart/form-data");
            form.setAttribute('target', "mf");
            form.setAttribute('action', cfg.dbcon + 'addons/payUP');
            //*/
            form.submit();

            var par = {
                id_ctrct: v.id_ctrct,
                ini_data: dat,
                value: val,
                file: file
            }
            p2p_send(par, cfg.dbcon + 'addons/crt_pay', function (result) {
                pops(lang[result.data]);
                //reloadmainframe(100);
            })
        } else {
            pops("Preencha todos os campos");
        } //*/
    }
}


function edt_pay(v) {
    var htm = "<link rel = 'stylesheet' type='text/css' href='../../../css/main.css'>" +
        "<script type='text/javascript' src='../../js/libs/jquery.min.js'></script>" +
        "<script type='text/javascript' src='../../js/mainscripter.js'></script>" +
        "<script type='text/javascript' src='./js/pay.js'></script>" +
        "<form id='frm' target='mf' method='post' enctype='multipart/form-data'>" +
        "<center><table class='z20'><tr><td><center><h3>Editar Pagamento:</h3><center></td></tr>" +
        "<tr><center><td style='float: right;'>Data: </td><td><input value=" + v.data.substring(0, v.data.indexOf("T")) + " id='ini_data' type='date'></td></center></tr>" +
        "<tr><center><td style='float: right;'>Valor: </td><td><input value=" + v.value + " id='value' type='text'></td></center></tr>" +
        "<tr><td style='float: right;'><center><button onclick='parent.reset();'>Voltar</button>" +
        "<button onclick='edt_pay_sub(" + JSON.stringify(v) + ");'>Editar</button></td></tr></table><center>" +
        "<iframe style='display: none' name='mf' id='mf'></iframe>";

    var mb = document.getElementById("msg_box");
    mb.contentDocument.write(htm);
    mb.setAttribute('class', 'z10');
}

function edt_pay_sub(v) {
    var val = document.getElementById('value').value;
    var dat = document.getElementById('ini_data').value;
    if (
        val != undefined &&
        dat != undefined
    ) {
        if (val.indexOf(",") == -1) { val = val + ",00"; }
        val = val.replace(".", "").replace(".", "").replace(",", ".");

        var par = {
            id: v.id_pay,
            ini_data: dat,
            value: val
        }
        p2p_send(par, cfg.dbcon + 'addons/edt_pay', function (result) {
            pops(lang[result.data]);
        })
    } else {
        pops("Preencha todos os campos");
    } //*/
}

function rem_pay(v, w) {
    var reason = prompt("Motivo:");
    if (reason == null) { return; }
    if (reason == "") {
        pops("descreva um motivo para a exclusão");
        return;
    }
    p2p_send({ id: (v).id_pay, reason: reason, status: "ping" }, cfg.dbcon + 'addons/del_pay', function (result) {
        pops(lang[result.data]);
        getlist(() => {
            lst_pay(w);
        })
    })
}