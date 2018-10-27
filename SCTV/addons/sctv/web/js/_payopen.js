function lst_pay(ctrct_data) {
    var ctrct_data_prs = (ctrct_data);
    var ptable = ctrct_data_prs.pays;
    var htm = "<table style='width:100%'><tr class='list_header ctrct_dat'><td colspan='2'>Pagamentos</td></tr><tr><td>Data</td><td>Valor</td></tr>";

    if (ptable != undefined) {
        for (i = 0; i < ptable.length; i++) {
            var v = ptable[i];
            var d = v.data;
            d = d.substring(0, d.indexOf("T"));
            htm += "" +
                "<tr class='table_tr' onclick='openpay(" + JSON.stringify(v) + "," + JSON.stringify(ctrct_data) + ")'>" +
                "<td class='list_tb_td'>" + d + "</td>" +
                "<td class='list_tb_td'>R$ " + rs(v.value) + "</td>" +
                "</tr>";
        }
    }
    htm += "</table>";
    return htm;
}

function reset() {

    var mb = document.getElementById("msg_box");
    mb.setAttribute("class", "z-10");
    mb.setAttribute('src', '');
}

function openpay(v, w) {
    document.getElementById('mf_table_header').setAttribute('style', 'display:none');
    var htm = "<tr><td><button style='margin-left:20px' onclick='openctrct(" + JSON.stringify(w) + ");'>Voltar</button>";

    if (indb.permissions.findIndex(x => x.name === "acc_ctraddon-contract_edt_pay") > 0) {
        htm += "<button style='margin-left:20px' onclick='edt_pay(" + JSON.stringify(v) + "," + JSON.stringify(w) + ");'>Edt. Pagamento</button>";
    }
    if (indb.permissions.findIndex(x => x.name === "acc_ctraddon-contract_rem_pay") > 0) {
        htm += "<button style='margin-left:20px' onclick='rem_pay(" + JSON.stringify(v) + "," + JSON.stringify(w) + ");'>Rem. Pagamento</button>";
    }

    htm += "</td></tr>";
    document.getElementById('mf_table_controls').innerHTML = htm;
    var p = document.getElementById("list_tb");
    p.setAttribute('class', 'list_tb')
    var d = v.data;
    d = d.substring(0, d.indexOf("T"));
    p.innerHTML = "" +
        "<tr class ='list_header'>" +
        "<td>Data " +
        "</td><td>Valor " +
        "</td><td>Responsavel " +
        "</td></tr>" +
        "<tr class='table_tr'>" +
        "</td><td class='list_tb_td'>" + d +
        "</td><td class='list_tb_td'>R$ " + rs(v.value) +
        "</td><td class='list_tb_td'>" + get_user_name(v.crt_usr_id) +
        "</td></tr>" +
        "<tr><td colspan='6'><iframe style='width:99%;height:80vh;' src='" + cfg.localfiles + "/pay/" + v.file + ".pdf'></td></tr>";
}

function add_pay(v) {
    console.log(v);
    var htm = "<link rel = 'stylesheet' type='text/css' href='../../screens/css/main.css'>" +
        "<script type='text/javascript' src='../../js/libs/jquery.min.js'></script>" +
        "<script type='text/javascript' src='../../js/mainscripter.js'></script>" +
        "<script type='text/javascript' src='./js/_utils.js'></script>" +
        "<script type='text/javascript' src='./js/_payopen.js'></script>" +
        "<script type='text/javascript' src='./js/_files.js'></script>" +
        "<form id='frm' target='mf' method='post' enctype='multipart/form-data'>" +
        "<center><table class='ctrct_tb' style='margin-top:20px'><tr class='table_tr'><td colspan='1'><center><h3>Adicionar Pagamento:</h3><center></td></tr>" +
        "<tr class='table_tr'><td>Data: <input id='ini_data' type='date'></td></tr>" +
        "<tr class='table_tr'><td>Valor: <input id='value' type='text'></td></tr>" +
        "<tr class='table_tr'><td>Arquivo: <input id='file' name='file' type='file'  multiple='multiple'></td></center></tr>" +
        "<tr><td style='display:none;'><input id='fname' name='fname' type='text'></td></tr>" +
        "<tr><td colspan='1'><center><button onclick='parent.reset();'>Voltar</button>" +
        "<button onclick='add_pay_sub(" + JSON.stringify(v) + ");'>Adicionar</button></td></tr></table></center>" +
        "<iframe style='display: none' name='mf' id='mf'></iframe>";

    var mb = document.getElementById("msg_box");
    mb.contentDocument.write(htm);
    mb.setAttribute('class', 'z10');
}

function add_pay_sub(v) {
    var val = document.getElementById('value').value;
    if (val.indexOf(",") == -1) { val = val + ",00"; }
    var dat = document.getElementById('ini_data').value;
    var file = document.getElementById('file');
    if (file.files[0]) {
        if (
            val != undefined &&
            dat != undefined
        ) {
            if (val.indexOf(",") == -1) { val = val + ",00"; }
            val = val.replace(".", "").replace(".", "").replace(",", ".");
            if (val <= getSaldo(v)) {
                if (paydate(v, dat)) {
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
                        if (result.data == "added") {
                            parent.reopenctrct(v);
                            parent.reset();
                        }
                    });
                } else {
                    pops("Data posterior vencimento");
                }
            } else {
                pops("Valor acima do contrato");
            }
        } else {
            pops("Preencha todos os campos");
        } //*/
    } else {
        pops("Associe o Arquivo do Pagamento");
    }
}


function edt_pay(v, w) {
    var htm = "<link rel = 'stylesheet' type='text/css' href='../../screens/css/main.css'>" +
        "<script type='text/javascript' src='../../js/libs/jquery.min.js'></script>" +
        "<script type='text/javascript' src='../../js/mainscripter.js'></script>" +
        "<script type='text/javascript' src='./js/_utils.js'></script>" +
        "<script type='text/javascript' src='./js/_payopen.js'></script>" +
        "<form id='frm' target='mf' method='post' enctype='multipart/form-data'>" +
        "<center><table class='ctrct_tb' style='margin-top:20px'><tr class='table_tr'><td><center><h3>Editar Pagamento:</h3></center></td></tr>" +
        "<tr class='table_tr'><td>Data: <input value=" + v.data.substring(0, v.data.indexOf("T")) + " id='ini_data' type='date'></td></center></tr>" +
        "<tr class='table_tr'><td>Valor: <input value=" + rs(v.value) + " id='value' type='text'></td></tr>" +
        "<tr class='table_tr'><td>Arquivo: <input id='file' name='file' type='file'  multiple='multiple'></td></tr>" +
        "<tr><center><td style='display:none;'><input id='fname' name='fname' type='text' value='" + v.file + "'></td></tr>" +
        "<tr><td><center><button onclick='parent.reset();'>Voltar</button>" +
        "<button onclick='edt_pay_sub(" + JSON.stringify(v) + "," + JSON.stringify(w) + ");'>Editar</button></center></td></tr></table><center>" +
        "<iframe style='display: none' name='mf' id='mf'></iframe>";

    var mb = document.getElementById("msg_box");
    mb.contentDocument.write(htm);
    mb.setAttribute('class', 'z10');
}

function edt_pay_sub(v, w) {
    var val = document.getElementById('value').value;
    var dat = document.getElementById('ini_data').value;

    var file = document.getElementById('file');
    if (file.files[0]) {

        var form = document.getElementById('frm');
        file = getData();

        document.getElementById('fname').setAttribute('value', file);
        form.setAttribute('method', 'POST');
        form.setAttribute('enctype', "multipart/form-data");
        form.setAttribute('target', "mf");
        form.setAttribute('action', cfg.dbcon + 'addons/payUP');
        //*/
        form.submit();
    } else {
        file = v.file;
    }

    if (
        val != undefined &&
        dat != undefined
    ) {

        if (val.indexOf(",") == -1) { val = val + ",00"; }
        val = val.replace(".", "").replace(".", "").replace(",", ".");
        if (val <= w.value) {
            if (paydate(w, dat)) {
                var par = {
                    id: v.id_pay,
                    ini_data: dat,
                    file: file,
                    value: val
                }
                p2p_send(par, cfg.dbcon + 'addons/edt_pay', function (result) {
                    pops(lang[result.data]);
                    if (result.data == 'modified') {
                        parent.reopenctrct(w);
                        parent.reset();
                    }
                })
            } else {
                pops("Data posterior vencimento");
            }
        } else {
            pops("Valor acima do contrato");
        }
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
        if (result.data == 'deleted') {
            reopenctrct(w);
            parent.reset();
        }
    })
}