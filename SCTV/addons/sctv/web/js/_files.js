function lst_files(ctrct_data) {
    var ctrct_data_prs = (ctrct_data);
    var ptable = ctrct_data_prs.files;
    var htm = "<table style='width:100%'><tr class='list_header ctrct_dat'><td>Anexos do Contrato</td></tr>";
    if (ptable != undefined) { //atatched files
        for (i = 0; i < ptable.length; i++) {
            var v = ptable[i];
            htm +=
                "<tr class='table_tr' onclick='openfile(" + JSON.stringify(v.file) + "," + JSON.stringify(ctrct_data) + ")'>" +
                "<td class='list_tb_td'>Anexo - " + i + "</td>" +
                "</tr>";
        }
    }
    htm += "</table>";
    return htm;
}

function lst_ctrct_file(ctrct_data) {
    var htm = "<table style='width:100%'><tr class='list_header ctrct_dat'><td>Contrato</td></tr>";
    htm += "" + //for spacing
        "<tr class='table_tr' onclick='openmainfile(" + JSON.stringify(ctrct_data.file) + "," + JSON.stringify(ctrct_data) + ")'>" +
        "<td class='list_tb_td'>Contrato - " + ctrct_data.num + "</td>" +
        "</tr>"; //original file

    htm += "</table>";
    htm += lst_adtiv(ctrct_data);
    return htm;
}

function openfile(v, w) {
    document.getElementById('mf_table_header').setAttribute('style', 'display:none');
    var htm = "<tr><td><button style='margin-left:20px' onclick='openctrct(" + JSON.stringify(w) + ");'>Voltar</button>";

    if (indb.permissions.findIndex(x => x.name === "acc_ctraddon-contract_edt_file") > 0) {
        htm += "<button style='margin-left:20px' onclick='edt_file(" + JSON.stringify(v) + ");'>Edt. Anexo</button>";
    }
    if (indb.permissions.findIndex(x => x.name === "acc_ctraddon-contract_rem_file") > 0) {
        htm += "<button style='margin-left:20px' onclick='rem_file(" + JSON.stringify(v) + "," + JSON.stringify(w) + ");'>Rem. Anexo</button>";
    }
    htm += "</td></tr>";
    document.getElementById('mf_table_controls').innerHTML = htm;
    var p = document.getElementById("list_tb");
    p.setAttribute('class', 'list_tb')
    p.innerHTML = "<tr><td colspan='6'><iframe style='width:99%;height:80vh;' src='" + cfg.localfiles + "/ctrct/" + v + ".pdf'></td></tr>";
}

function openmainfile(v, w) {
    document.getElementById('mf_table_header').setAttribute('style', 'display:none');
    var htm = "<tr><td><button style='margin-left:20px' onclick='openctrct(" + JSON.stringify(w) + ");'>Voltar</button>";

    htm += "</td></tr>";
    document.getElementById('mf_table_controls').innerHTML = htm;
    var p = document.getElementById("list_tb");
    p.setAttribute('class', 'list_tb')
    p.innerHTML = "<tr><td colspan='6'><iframe style='width:99%;height:80vh;' src='" + cfg.localfiles + "/ctrct/" + v + ".pdf'></td></tr>";
}


function add_file(v) {
    var htm = "<link rel = 'stylesheet' type='text/css' href='../../screens/css/main.css'>" +
        "<script type='text/javascript' src='../../js/libs/jquery.min.js'></script>" +
        "<script type='text/javascript' src='../../js/mainscripter.js'></script>" +
        "<script type='text/javascript' src='./js/_files.js'></script>" +
        "<form id='frm' target='mf' method='post' enctype='multipart/form-data'>" +
        "<center><table class='ctrct_tb' style='margin-top:20px'><tr class='table_tr'><td><center><h3>Adicionar Anexo:</h3><center></td></tr>" +
        "<tr><center><td style='display:none;'><input id='fname' name='fname' type='text'></td></center></tr>" +
        "<tr class='table_tr'><center><td><center><b>Arquivo:</b><input id='file' name='file' type='file'  multiple='multiple'></td></center></tr>" +
        "<tr><td><center><button onclick='parent.reset();'>Voltar</button>" +
        "<button onclick='add_file_sub(" + JSON.stringify(v) + ");'>Adicionar</button></td></tr></table><center>" +
        "<iframe style='display: none' name='mf' id='mf'></iframe>";

    var mb = document.getElementById("msg_box");
    mb.contentDocument.write(htm);
    mb.setAttribute('class', 'z10');
}

function add_file_sub(v) {
    var file = document.getElementById('file');
    if (file.files[0]) {
        var form = document.getElementById('frm');
        file = getData();

        document.getElementById('fname').setAttribute('value', file);
        form.setAttribute('method', 'POST');
        form.setAttribute('enctype', "multipart/form-data");
        form.setAttribute('target', "mf");
        form.setAttribute('action', cfg.dbcon + 'addons/ctrctUP');
        //*/
        form.submit();

        var par = {
            id: v.id_ctrct,
            file: file
        }
        p2p_send(par, cfg.dbcon + 'addons/add_file_ctrct', function(result) {
                pops(lang[result.data]);
                if (result.data == 'added') {
                    parent.reopenctrct(v);
                    parent.reset();
                }
            }) //*/
    } else {
        pops("Associe o Arquivo do Anexo");
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


function edt_file(v) {
    var htm = "<link rel = 'stylesheet' type='text/css' href='../../../css/main.css'>" +
        "<script type='text/javascript' src='../../js/libs/jquery.min.js'></script>" +
        "<script type='text/javascript' src='../../js/mainscripter.js'></script>" +
        "<script type='text/javascript' src='./js/_payopen.js'></script>" +
        "<form id='frm' target='mf' method='post' enctype='multipart/form-data'>" +
        "<center><table class='z20'><tr><td colspan='2'><center><h3>Editar Anexo:</h3><center></td></tr>" +
        "<tr><center><td style='float: right;'>Data: </td><td><input value=" + v.data.substring(0, v.data.indexOf("T")) + " id='ini_data' type='date'></td></center></tr>" +
        "<tr><center><td style='float: right;'>Valor: </td><td><input value=" + rs(v.value) + " id='value' type='text'></td></center></tr>" +
        "<tr><center><td style='display:none;'><input id='fname' name='fname' type='text' value='" + v.file + "'></td></center></tr>" +
        "<tr><center><td style='float: right;'>Arquivo: </td><td><input id='file' name='file' type='file'  multiple='multiple'></td></center></tr>" +
        "<tr><td style='float: right;'><center><button onclick='parent.reset();'>Voltar</button>" +
        "<button onclick='edt_file_sub(" + JSON.stringify(v) + ");'>Editar</button></td></tr></table><center>" +
        "<iframe style='display: none' name='mf' id='mf'></iframe>";

    var mb = document.getElementById("msg_box");
    mb.contentDocument.write(htm);
    mb.setAttribute('class', 'z10');
}

function edt_file_sub(v) {
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
        form.setAttribute('action', cfg.dbcon + 'addons/ctrctUP');
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
            id: v.id_pay,
            ini_data: dat,
            file: file,
            value: val
        }
        p2p_send(par, cfg.dbcon + 'addons/edt_file_ctrct', function(result) {
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

function rem_file(v, w) {
    var reason = prompt("Motivo:");
    if (reason == null) { return; }
    if (reason == "") {
        pops("descreva um motivo para a exclusão");
        return;
    }
    p2p_send({ id: (v).id_file, reason: reason, status: "ping" }, cfg.dbcon + 'addons/del_file_ctrct', function(result) {
        pops(lang[result.data]);
        if (result.data == 'deleted') {
            reopenctrct(w);
            parent.reset();
        }
    })
}