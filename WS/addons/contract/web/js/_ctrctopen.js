loadAddonScript('/contract/web/js/_renewctrct.js');

function openctrct(v) {
    var ch = v.renewable;
    var num = v.num;
    if (ch > 0) {
        num += "-" + v.renewable
    }
    var h = document.getElementById("table_header");
    h.innerHTML = "";
    document.getElementById('mf_table_header').setAttribute('style', '');
    var htm = "<tr><td><button style='margin-left:20px' onclick='closectrct();'>Voltar</button>";

    //indb.permissions.findIndex(x => x.name === "acc_ctraddon-contract_rem_pay") +
    //indb.permissions.findIndex(x => x.name === "acc_ctraddon-contract_edt_pay") +
    if (indb.permissions.findIndex(x => x.name === "acc_ctraddon-contract_add_pay") > 0) {
        htm += "<button style='margin-left:20px' onclick='add_pay(" + JSON.stringify(v) + ");'>Add. Pagamento</button>";
    }
    if (indb.permissions.findIndex(x => x.name === "acc_ctraddon-contract_add_file") > 0) {
        htm += "<button style='margin-left:20px' onclick='add_file(" + JSON.stringify(v) + ");'>Add. Anexo</button>";
        htm += "<button style='margin-left:20px' onclick='add_adtiv(" + JSON.stringify(v) + ");'>Add. Aditivo</button>";
    }
    if (renewable(v) && indb.permissions.findIndex(x => x.name === "acc_subtabaddon-contract_add") > 0) {
        htm += "<button style='margin-left:20px' onclick='renew_ctrct(" + JSON.stringify(v) + ");'>Renovar</button>";
    }

    htm += "</td></tr>";
    document.getElementById('mf_table_controls').innerHTML = htm;
    var p = document.getElementById("list_tb");
    p.setAttribute('class', 'ctrct_tb');
    p.innerHTML = "" +
        "<tr><td class='table_tr'><b>Nº:</b> " + num + "</td>" +
        "<td class='table_tr  td_02'><b>Nome:</b> " + v.name + "</td></tr>" +
        "<tr style='background:#fff;height:5px;'><td colspan='2'></td></tr>" +
        "<tr><td class='table_tr' colspan='2'><center><b>Status/Vencimento:</b> " + getStatus(v) + "</td></tr>" +
        "<tr style='background:#fff;height:5px;'><td colspan='2'></td></tr>" +

        "<tr><td class='table_tr'><b>Data Inicio:</b> " + dateformat(v.ini_data.substring(0, v.ini_data.indexOf("T"))) + "</td>" +
        "<td class='table_tr  td_02'><b>Periodo:</b> " + v.periodo + " Meses</td></tr>" +

        "<tr><td class='table_tr'><b>Pagamento:</b> " + getmodepagto(v) + "</td>" +
        "<td class='table_tr  td_02'><b>Valor do Contrato:</b> R$ " + rs(getValueAdtiv(v)) + "</td></tr>" +
        "<tr><td class='table_tr'><b>Valor Empenhado:</b> R$ " + rs(getEmpenho(v)) + "</td>" +
        "<td class='table_tr  td_02'><b>Saldo do Empenho:</b> R$ " + getSaldo(v) + "</td></tr>" +

        "<tr><td class='table_tr' colspan='2'><b>Descrição:</b> " + v.descr + "</td></tr>" +
        "<tr><td class='table_tr' colspan='2'><b>Valor Aditivado:</b> " + rs(getAdtivTot(v)) + " " + (getAdtivperc(v)) + "%</td></tr>" +
        "<tr><td colspan='4' id='pays'><table style='width:100%'><tr><td valign='top'>" + lst_pay(v) + "</td><td valign='top'>" + lst_ctrct_file(v) + "</td><td valign='top'>" + lst_files(v) + "</td></tr></table></td></tr> ";
}
//"<tr><td colspan='6'><iframe style='width:99%;height:80vh;' src='" + cfg.localfiles + "/ctrct/" + v.file + ".pdf'></td></tr>";

function closectrct() {
    reloadmainframe(10);
}

function getmodepagto(v) {
    var per = ""
    if (v.pay_times == 1) { per = "Mensal"; }
    if (v.pay_times == 2) { per = "Anual"; }
    if (v.pay_times == 3) { per = "À Vista"; }
    return per;
}