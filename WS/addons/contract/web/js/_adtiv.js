function lst_adtiv(ctrct_data) {
    var ctrct_data_prs = (ctrct_data);
    var ptable = ctrct_data_prs.adtiv;
    var htm = "<table style='width:100%'><tr class='list_header ctrct_dat'><td>Aditivos</td></tr>";
    if (ptable != undefined) { //atatched files
        for (i = 0; i < ptable.length; i++) {
            var v = ptable[i];
            htm +=
                "<tr class='table_tr' onclick='openAdtiv(" + JSON.stringify(v) + "," + JSON.stringify(ctrct_data) + ")'>" +
                "<td class='list_tb_td'>Aditivo - " + i + "</td>" +
                "</tr>";
        }
    }
    htm += "</table>";
    return htm;
}

function openAdtiv(v, w) {
    document.getElementById('mf_table_header').setAttribute('style', 'display:none');
    var htm = "<tr><td><button style='margin-left:20px' onclick='openctrct(" + JSON.stringify(w) + ");'>Voltar</button>";

    if (indb.permissions.findIndex(x => x.name === "acc_ctraddon-contract_edt_adtiv") > 0) {
        htm += "<button style='margin-left:20px' onclick='edt_adtiv(" + JSON.stringify(v) + ");'>Edt. Aditivo</button>";
    }
    if (indb.permissions.findIndex(x => x.name === "acc_ctraddon-contract_rem_adtiv") > 0) {
        htm += "<button style='margin-left:20px' onclick='rem_adtiv(" + JSON.stringify(v) + "," + JSON.stringify(w) + ");'>Rem. Aditivo</button>";
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
        "<tr><td colspan='6'><iframe style='width:99%;height:80vh;' src='" + cfg.localfiles + "/adtiv/" + v.file + ".pdf'></td></tr>";
}

function openmainAdtiv(v, w) {
    document.getElementById('mf_table_header').setAttribute('style', 'display:none');
    var htm = "<tr><td><button style='margin-left:20px' onclick='openctrct(" + JSON.stringify(w) + ");'>Voltar</button>";

    htm += "</td></tr>";
    document.getElementById('mf_table_controls').innerHTML = htm;
    var p = document.getElementById("list_tb");
    p.setAttribute('class', 'list_tb')
    p.innerHTML = "<tr><td colspan='6'><iframe style='width:99%;height:80vh;' src='" + cfg.localfiles + "/ctrct/" + v + ".pdf'></td></tr>";
}


function add_adtiv(v) {
    var htm = "<link rel = 'stylesheet' type='text/css' href='../../screens/css/main.css'>" +
        "<script type='text/javascript' src='../../js/libs/jquery.min.js'></script>" +
        "<script type='text/javascript' src='../../js/mainscripter.js'></script>" +
        "<script type='text/javascript' src='./js/_adtiv.js'></script>" +
        "<form id='frm' target='mf' method='post' enctype='multipart/form-data'>" +
        "<center><table class='ctrct_tb' style='margin-top:20px'><tr class='table_tr'><td><center><h3>Adicionar Aditivo:</h3><center></td></tr>" +
        "<tr><td style='display:none;'><input id='fname' name='fname' type='text'></td></center></tr>" +
        "<tr class='table_tr'><td><center><b>Supressão:</b><input id='adsu' type='checkbox' onclick='adsuclick();'></td></center></tr>" +
        "<tr class='table_tr'><td><center><b>Valor:</b><b id='mi' style='display:none;'>-</b><b id='pl'>+</b><input id='value' type='text'></td></center></tr>" +
        "<tr class='table_tr'><td><center><b>Data:</b><input id='data' type='date'></td></center></tr>" +
        "<tr class='table_tr'><td><center><b>Arquivo:</b><input id='file' name='file' type='file'  multiple='multiple'></td></center></tr>" +
        "<tr><td><center><button onclick='parent.reset();'>Voltar</button>" +
        "<button onclick='add_adtiv_sub(" + JSON.stringify(v) + ");'>Adicionar</button></center></td></tr></table></center>" +
        "<iframe style='display: none' name='mf' id='mf'></iframe>";

    var mb = document.getElementById("msg_box");
    mb.contentDocument.write(htm);
    mb.setAttribute('class', 'z10');
}

function adsuclick() {
    if (document.getElementById('adsu').checked) {
        document.getElementById('pl').style.display = 'none';
        document.getElementById('mi').style.display = '';
    } else {
        document.getElementById('pl').style.display = '';
        document.getElementById('mi').style.display = 'none';
    }
}

function add_adtiv_sub(v) {
    var file = document.getElementById('file');
    var val = document.getElementById('value').value;
    var dat = document.getElementById('data').value;
    var adsu = document.getElementById('adsu');
    if (val.indexOf(",") == -1) { val = val + ",00"; }
    val = val.replace(".", "").replace(".", "").replace(",", ".");
    if (adsu.checked) { val = 0 - val; }
    if (file.files[0]) {
        var form = document.getElementById('frm');
        file = getData();

        document.getElementById('fname').setAttribute('value', file);
        form.setAttribute('method', 'POST');
        form.setAttribute('enctype', "multipart/form-data");
        form.setAttribute('target', "mf");
        form.setAttribute('action', cfg.dbcon + 'addons/adtivUP');
        //*/
        form.submit();

        var par = {
            id: v.id_ctrct,
            ini_data: dat,
            value: val,
            file: file
        }
        p2p_send(par, cfg.dbcon + 'addons/add_adtiv', function(result) {
                pops(lang[result.data]);
                if (result.data == 'added') {
                    parent.reopenctrct(v);
                    parent.reset();
                }
            }) //*/
    } else {
        pops("Associe o Arquivo do Aditivo/Anexo");
    }
}

function reopenctrct(v) {
    getlist(() => {
        var ptable = indb.addons['ctrct'];
        if (ptable[0] != undefined) {
            for (i = 0; i < ptable.length; i++) {
                if (ptable[i].id_ctrct == v.id_ctrct) {
                    openctrct(ptable[i]);
                    return;
                }
            }
        }
    })
}


function edt_adtiv(v) {
    var htm = "<link rel = 'stylesheet' type='text/css' href='../../screens/css/main.css'>" +
        "<script type='text/javascript' src='../../js/libs/jquery.min.js'></script>" +
        "<script type='text/javascript' src='../../js/mainscripter.js'></script>" +
        "<script type='text/javascript' src='./js/_adtiv.js'></script>" +
        "<form id='frm' target='mf' method='post' enctype='multipart/form-data'>" +
        "<center><table class='ctrct_tb' style='margin-top:20px'><tr class='table_tr'><td><center><h3>Adicionar Aditivo:</h3><center></td></tr>" +
        "<tr><td style='display:none;'><input id='fname' name='fname' type='text'></td></center></tr>" +
        "<tr class='table_tr'><td><center><b>Supressão:</b><input id='adsu' type='checkbox' onclick='adsuclick();'></td></center></tr>" +
        "<tr class='table_tr'><td><center><b>Valor:</b><b id='mi' style='display:none;'>-</b><b id='pl'>+</b><input id='value' type='text' value='" + rs(v.value) + "'></td></center></tr>" +
        "<tr class='table_tr'><td><center><b>Data:</b><input id='data' type='date' value='" + (v.data.substring(0, v.data.indexOf("T"))) + "'></td></center></tr>" +
        "<tr class='table_tr'><td><center><b>Arquivo:</b><input id='file' name='file' type='file'  multiple='multiple'></td></center></tr>" +
        "<tr><td><center><button onclick='parent.reset();'>Voltar</button>" +
        "<button onclick='edt_adtiv_sub(" + JSON.stringify(v) + ");'>Editar</button></center></td></tr></table></center>" +
        "<iframe style='display: none' name='mf' id='mf'></iframe>";

    var mb = document.getElementById("msg_box");
    mb.contentDocument.write(htm);
    mb.setAttribute('class', 'z10');
}

function edt_adtiv_sub(v) {
    var val = document.getElementById('value').value;
    var dat = document.getElementById('data').value;
    if (adsu.checked) { val = 0 - val; }
    var file = document.getElementById('file');
    if (file.files[0]) {

        var form = document.getElementById('frm');
        file = getData();

        document.getElementById('fname').setAttribute('value', file);
        form.setAttribute('method', 'POST');
        form.setAttribute('enctype', "multipart/form-data");
        form.setAttribute('target', "mf");
        form.setAttribute('action', cfg.dbcon + 'addons/adtivUP');
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

        var par = {
            id: v.id_adtiv,
            ini_data: dat,
            file: file,
            value: val
        }
        p2p_send(par, cfg.dbcon + 'addons/edt_adtiv', function(result) {
            pops(lang[result.data]);
            if (result.data == 'modified') {
                parent.reopenctrct(v);
                parent.reset();
            }
        })
    } else {
        pops("Preencha todos os campos");
    } //*/
}

function rem_adtiv(v, w) {
    var reason = prompt("Motivo:");
    if (reason == null) { return; }
    if (reason == "") {
        pops("descreva um motivo para a exclusão");
        return;
    }
    p2p_send({ id: v.id_adtiv, reason: reason, status: "ping" }, cfg.dbcon + 'addons/del_adtiv', function(result) {
        pops(lang[result.data]);
        if (result.data == 'deleted') {
            reopenctrct(w);
            parent.reset();
        }
    })
}