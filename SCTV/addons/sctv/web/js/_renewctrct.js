function renew_ctrct(v) {
    v.renewable += 1;
    var ch = v.renewable;
    var num = v.num;
    if (ch > 0) {
        ch = "checked";
        num += "-" + v.renewable
    } else { ch = ""; }
    var dt = new Date(v.ini_data.substring(0, v.ini_data.indexOf("T")));
    dt.setFullYear(dt.getFullYear() + 1);

    var htm = "" +

        "<tr><td class='table_tr td_01'><b>Nº:</b> " + num + "</td>" +
        "<td class='table_tr  td_02'><b>Nome:</b> " + v.name + "</td></tr>" +
        "<tr style='background:#fff;height:5px;'><td colspan='2'></td></tr>" +
        "<tr><td class='table_tr td_01' colspan='2'><center><b>Status/Vencimento:</b> " + getStatus(v) + "</td></tr>" +
        "<tr style='background:#fff;height:5px;'><td colspan='2'></td></tr>" +

        "<tr><td class='table_tr td_01'><b>Data Inicio:</b> " + dateformat(v.ini_data.substring(0, v.ini_data.indexOf("T"))) + "</td>" +
        "<td class='table_tr  td_02'><b>Periodo:</b> " + v.periodo + " Meses</td></tr>" +

        "<tr><td class='table_tr td_01'><b>Pagamento:</b> " + getmodepagto(v) + "</td>" +
        "<td class='table_tr  td_02'><b>Valor:</b>" + rs(v.value) + "</td></tr>" +

        "<tr><td class='table_tr' colspan='2'><b>Descrição:</b> " + v.descr + "</td></tr>" +
        "<tr class='table_tr'><td colspan='2'><b>Supressão:</b><input id='adsu' type='checkbox' onclick='adsuclick();'></td></center></tr>" +
        "<tr class='table_tr'><td colspan='2'><b>Valor:</b><b id='mi' style='display:none;'>-</b><b id='pl'>+</b><input value='" + rs(0) + "' id='valuea' type='text'></td></center></tr>" +

        "<tr><td class='table_tr' colspan='2'>" +
        "<input id='num' type='text' style='display:none;' value='" + v.num + "'>" +
        "<input id='name' type='text' style='display:none;' value='" + v.name + "'>" +
        "<textarea style='display:none; width: 500px;height: 200px;' id='desc' type='text'>" + v.descr + "</textarea>" +
        "<input id='ini_data' type='date' style='display:none;' value='" + gdate(dt) + "'>" +
        "<input id='renewable' style='display:none;'  type='text' value='" + v.renewable + "'>" +
        "<input id='periodo' style='display:none;' type='text' value= '" + v.periodo + "'>" +
        "<input id='npays' type='text' value='" + v.pay_times + "' style='display:none;' >" +
        "<b>Aditivo: </b><form id='frm' target='mf' method='post' enctype='multipart/form-data'><input id='file' type='file' name='file' multiple='multiple'>" +
        "<input id='fname' style='display:none;' type='text' name='fname' value='" + v.file + "'></form>" +
        "</td></tr>" +
        "</table>";

    document.getElementById('list_tb').innerHTML = htm;
    document.getElementById('mf_table_controls').innerHTML =
        "<td><table><tr><td><input type='button' value='Voltar' onclick='openctrct(" + JSON.stringify(v) + ");'></td><td><input type='button' value='Adicionar' onclick='rnwctrct(" + JSON.stringify(v) + ");'></td></tr></table></td>";
}

function rnwctrct(v) {

    var num = document.getElementById('num').value;
    var nam = document.getElementById('name').value;
    var des = document.getElementById('desc').value;
    var vala = document.getElementById('valuea').value;
    var dat = document.getElementById('ini_data').value;
    var ch = document.getElementById('renewable').value;

    var per = document.getElementById('periodo').value;
    var npays = document.getElementById('npays').value;
    var file = document.getElementById('file');

    if (vala.indexOf(",") == -1) { vala = vala + ",00"; }
    vala = vala.replace(".", "").replace(".", "").replace(",", ".");
    if (adsu.checked) { vala = 0 - vala; }

    if (num != undefined &&
        nam != undefined &&
        des != undefined &&
        vala != undefined &&
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
            value: v.value,
            renewable: ch,
            file: v.file
        }

        p2p_send(par, cfg.dbcon + 'addons/crt_ctrct', function (result) {
            if (result.data == 'created') {
                if (file.files[0] && result.ctrct.id_ctrct != undefined) {
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
                        id: result.ctrct.id_ctrct,
                        value: vala,
                        ini_data: dat,
                        file: file
                    }
                    var id_new = result.ctrct.id_ctrct;
                    p2p_send({ id_old: v.id_ctrct, id_new: id_new }, cfg.dbcon + 'addons/cp_anex', function (result) {
                        if (result.data == 'copy') {
                            p2p_send(par, cfg.dbcon + 'addons/add_adtiv', function (result) {
                                pops(lang[result.data]);
                                if (result.data == 'added') {
                                    parent.reloadmainframe(10);
                                }
                            })
                        }
                    })

                } else {
                    pops("Preencha todos os campos");
                }
            } else {
                pops(result.status);
                console.log(result);
            }
        })
    } else {
        pops("Adicionar arquivo do Aditivo/Suppressão:")
    }
}

function gdate(v) {
    var d = new Date(v);
    var dd = d.getDate() + 1;
    if (dd < 10) { dd = "0" + dd };
    var mm = d.getMonth() + 1;
    if (mm < 10) { mm = "0" + mm };
    var yy = d.getFullYear();
    return yy + "-" + mm + "-" + dd;
}