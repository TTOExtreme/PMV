loadAddonScript('/contract/web/js/del.js');

function lst_ctrct() {
    getlist(() => {
        var ptable = indb.addons['ctrct'];
        var p = document.getElementById("list_tb");
        p.innerHTML = "";
        var newElement = document.createElement('tr');
        newElement.setAttribute('id', "list_header");
        newElement.setAttribute('class', "list_header");
        newElement.innerHTML = "<td class='list_contrs_td'></td>" +
            "</td><td>P.C.Nº " +
            "<div class='dropdown'><button class='filter'onclick='sortTable(0)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb01' type=\"text\" onkeyup=\"filterTable(1,'tb01')\"></div></div></td>" +
            "</td><td>Nome " +
            "<div class='dropdown'><button class='filter'onclick='sortTable(1)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb02' type=\"text\" onkeyup=\"filterTable(2,'tb02')\"></div></div></td>" +
            "</td><td>Descrição " +
            "<div class='dropdown'><button class='filter'onclick='sortTable(2)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb03' type=\"text\" onkeyup=\"filterTable(3,'tb03')\"></div></div></td>" +
            "</td><td>Data Inicio " +
            "<div class='dropdown'><button class='filter'onclick='sortTable(3)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb04' type=\"text\" onkeyup=\"filterTable(4,'tb04')\"></div></div></td>" +
            "</td><td>Periodo " +
            "<div class='dropdown'><button class='filter'onclick='sortTable(4)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb05' type=\"text\" onkeyup=\"filterTable(5,'tb05')\"></div></div></td>" +
            "</td><td>Valor " +
            "<div class='dropdown'><button class='filter'onclick='sortTable(5)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb06' type=\"text\" onkeyup=\"filterTable(6,'tb06')\"></div></div></td>" +
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

                newElement.setAttribute('class', "table_tr");
                var htm = ""
                if (indb.permissions.findIndex(x => x.name === "acc_subtabaddon-contract_edt") > 0) {
                    htm += "<button style='margin-left:0px' onclick='edt_ctrct(" + JSON.stringify(v) + ");'>Editar</button>";
                }
                if (indb.permissions.findIndex(x => x.name === "acc_ctraddon-contract_del") > 0) {
                    htm += "<button style='margin-left:0px' onclick='del_ctrct(" + JSON.stringify(v) + ");'>Remover</button>";
                }

                newElement.innerHTML = "<td class='list_contrs_td'>" +
                    "<div class='dropdown'>" +
                    "<button class='dropbtn opt_bot'>Opções</button>" +
                    "<div class='dropdown-content'>" + htm +
                    "</div>" +
                    "</div></td>" +
                    "</td><td class='list_tb_td'>" + num +
                    "</td><td class='list_tb_td' style='max-width:100px;'>" + v.name +
                    "</td><td class='list_tb_td' style='max-width:100px;'>" + v.descr +
                    "</td><td class='list_tb_td'>" + d +
                    "</td><td class='list_tb_td'>" + v.periodo +
                    "</td><td class='list_tb_td'>" + rs(v.value) +
                    "</td>";
                p.appendChild(newElement);
            }
        }
    })
}

function edt_ctrct(v) {
    var ch = v.renewable;
    var num = v.num;
    if (ch > 0) {
        ch = "checked";
        num += "-" + v.renewable
    } else { ch = ""; }
    var htm = "" +
        "<table><tr>" +
        "<td style='float: right;'>Nº: </td>" +
        "<td><input id='num' type='text' value='" + v.num + "'></td>" +
        "<td style='float: right;'>Nome: </td>" +
        "<td><input id='name' type='text' value='" + v.name + "'></td>" +
        "</tr>" +
        "<tr>" +
        "<td style='float: right;'>Descrição: </td>" +
        "<td colspan='3'><textarea style='width: 500px;height: 200px;' id='desc' type='text'>" + v.descr + "</textarea></td>" +
        "</tr>" +
        "<tr>" +
        "<td style='float: right;'>Valor: </td>" +
        "<td><input id='value' type='text' value='" + rs(v.value) + "'></td>" +
        "</tr>" +
        "<tr>" +
        "<td style='float: right;'>Data de Inicio: </td>" +
        "<td><input id='ini_data' type='date' value='" + v.ini_data.substring(0, v.ini_data.indexOf("T")) + "'></td>" +
        "<td style='float: right;'>Renovavel: </td>" +
        "<td><input id='renewable' type='checkbox' " + ch + "></td>" +
        "</tr>" +
        "<tr>" +
        "<td style='float: right;'>Periodo: </td>" +
        "<td>" +
        "<select id='periodo'>";
    if (v.periodo == 12) { htm += "<option value='12' selected='selected'>12 Meses</option>" } else { htm += "<option value='12'>12 Meses</option>"; }
    if (v.periodo == 24) { htm += "<option value='24' selected='selected'>24 Meses</option>" } else { htm += "<option value='24'>24 Meses</option>"; }
    if (v.periodo == 36) { htm += "<option value='36' selected='selected'>36 Meses</option>" } else { htm += "<option value='36'>36 Meses</option>"; }
    if (v.periodo == 48) { htm += "<option value='48' selected='selected'>48 Meses</option>" } else { htm += "<option value='48'>48 Meses</option>"; }
    if (v.periodo == 60) { htm += "<option value='60' selected='selected'>60 Meses</option>" } else { htm += "<option value='60'>60 Meses</option>"; }

    htm +=
        "</select>" +
        "</td>" +
        "<td style='float: right;'>Forma de Pagamento: </td>" +
        "<td>" +
        "<select id='npays'>";

    if (v.pay_times == 1) { htm += "<option value='1' selected='selected'>Mensal</option>" } else { htm += "<option value='1'>Mensal</option>"; }
    if (v.pay_times == 2) { htm += "<option value='2' selected='selected'>Anual</option>" } else { htm += "<option value='2'>Anual</option>"; }
    if (v.pay_times == 3) { htm += "<option value='3' selected='selected'>À Vista</option>" } else { htm += "<option value='3'>À Vista</option>"; }

    htm +=
        "</select>" +
        "</td>" +
        "</tr>" +
        "<tr>" +
        "<td style='float: right;'>Arquivo: </td>" +
        "<td><input id='file' type='file' name='file' multiple='multiple'></td>" +
        "<td style='display: none'><input id='fname' type='text' name='fname'  value='" + v.file + "'></td>" +
        "</tr>" +
        "</table>";

    document.getElementById('list_tb').innerHTML = htm;
    document.getElementById('mf_table_controls').innerHTML =
        "<td><table><tr><td><input type='button' value='Voltar' onclick='lst_ctrct();'></td><td><input type='button' value='Editar' onclick='edtctrct(" + JSON.stringify(v) + ");'></td></tr></table></td>";
}

function edtctrct(v) {

    var num = document.getElementById('num').value;
    var nam = document.getElementById('name').value;
    var des = document.getElementById('desc').value;
    var val = document.getElementById('value').value;
    var dat = document.getElementById('ini_data').value;
    var ch = document.getElementById('renewable');
    if (ch.checked) { ch = 1; } else { ch = 0; }

    var per = document.getElementById('periodo');
    var npays = document.getElementById('npays');
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

    if (val.indexOf(",") == -1) { val = val + ",00"; }
    val = val.replace(".", "").replace(".", "").replace(",", ".");
    per = per.options[per.selectedIndex].value;
    npays = npays.options[npays.selectedIndex].value;
    if (num != undefined &&
        nam != undefined &&
        des != undefined &&
        val != undefined &&
        dat != undefined &&
        per != undefined
    ) {
        var par = {
            id: v.id_ctrct,
            name: nam,
            num: num,
            desc: des,
            ini_data: dat,
            periodo: per,
            npays: npays,
            value: val,
            renewable: ch,
            file: file
        }

        p2p_send(par, cfg.dbcon + 'addons/edt_ctrct', function (result) {
            pops(lang[result.data]);
            if (result.data == 'modified') {
                reloadmainframe(10);
            }
        })
    } else {
        pops("Preencha todos os campos");
    }
}


function getlist(callback) {
    p2p_send({ status: "ping" }, cfg.dbcon + "addons/lst_ctrct", function (result) {
        if (result.status == "pong") {
            indb.addons['ctrct'] = result.data;
            callback();
        } else {
            pops("Erro ao se comunicar com o servidor");
        }
    })
}

lst_ctrct();