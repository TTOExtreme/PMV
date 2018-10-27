loadAddonScript('/contract/web/js/_payopen.js');
loadAddonScript('/contract/web/js/_ctrctopen.js');
loadAddonScript('/contract/web/js/_files.js');
loadAddonScript('/contract/web/js/_adtiv.js');
loadAddonScriptCall('/contract/web/js/_utils.js', () => { lst_ctrct() });

function lst_ctrct() {
    getlist(() => {
        wait_Load(() => {
            var ptable = indb.addons['ctrct'];
            var h = document.getElementById("table_header");
            h.innerHTML = "<tr style='white-space:nowrap; width:100%; font-size:9pt;'>" +
                "<td style='padding-right: 10px;'><b>Legenda:</b></td>" +
                "<td class='ctrct_col_0' style='width:15px;height:15px;padding:0;'></td><td style='padding-right: 10px;'> Menos de 30 dias</td></td>" +
                "<td class='ctrct_col_1' style='width:15px;height:15px;padding:0;'></td><td style='padding-right: 10px;'> Menos de 60 dias</td></td>" +
                "<td class='ctrct_col_2' style='width:15px;height:15px;padding:0;'></td><td style='padding-right: 10px;'> Menos de 90 dias</td></td>" +
                "<td class='ctrct_col_3' style='width:15px;height:15px;padding:0;'></td><td style='padding-right: 10px;'> Menos de 120 dias</td></td>" +
                "<td class='ctrct_col_4' style='width:15px;height:15px;padding:0;'></td><td style='padding-right: 10px;'> Menos de 150 dias</td></td>" +
                "<td class='ctrct_col_atv' style='width:15px;height:15px;padding:0;'></td><td style='padding-right: 10px;'> Ativo</td></td>" +
                "<td class='ctrct_col_venc' style='width:15px;height:15px;padding:0;'></td><td style='padding-right: 10px;'> Venc.</td></td>" +
                "<td><img style='width:15px;' src='./img/pag.png'></img></td><td style='padding-right: 10px;'> Inconsistência</td></td>" +
                "<td><img style='width:15px;' src='./img/lic.png'></img></td><td style='padding-right: 10px;'> Abrir nova licitação</td></td>";

            document.getElementById('mf_table_controls').innerHTML = "<tr><td><input type='checkbox' onchange='mvenc();' id='svenc'> Mostrar vencidos</td></tr>";

            var p = document.getElementById("list_tb");
            p.innerHTML = "";
            var newElement = document.createElement('tr');
            newElement.setAttribute('id', "list_header");
            newElement.setAttribute('class', "list_header");
            newElement.innerHTML = "<td style='max-width:5px;width:5px;'>Alertas" +
                "</td><td>P.C.Nº " +
                "<div class='dropdown'><button class='filter'onclick='sortTable(1)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb01' type=\"text\" onkeyup=\"filterTable(1,'tb01')\"></div></div></td>" +
                "</td><td>Nome " +
                "<div class='dropdown'><button class='filter'onclick='sortTable(2)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb03' type=\"text\" onkeyup=\"filterTable(2,'tb03')\"></div></div></td>" +
                "</td><td>Data Inicio " +
                "<div class='dropdown'><button class='filter'onclick='sortTable(4)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb04' type=\"text\" onkeyup=\"filterTable(4,'tb04')\"></div></div></td>" +
                "</td><td>Periodo " +
                "<div class='dropdown'><button class='filter'onclick='sortTable(5)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb05' type=\"text\" onkeyup=\"filterTable(5,'tb05')\"></div></div></td>" +
                "</td><td>Vlr. Empenhado " +
                "<div class='dropdown'><button class='filter'onclick='sortTable(6)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb06' type=\"text\" onkeyup=\"filterTable(6,'tb06')\"></div></div></td>" +
                "</td><td>Saldo Atual " +
                "</td><td>Pagto." +
                "</td><td>Status/Venc." +
                "</td>";
            p.appendChild(newElement);
            if (ptable[0] != undefined) {
                for (i = 0; i < ptable.length; i++) {
                    var v = ptable[i];
                    var ch = v.renewable;
                    var num = v.num;
                    if (ch > 0) { num += "-" + v.renewable }
                    var newElement = document.createElement('tr');
                    var t = v.username;
                    var d = v.ini_data;
                    d = d.substring(0, d.indexOf("T"));
                    newElement.setAttribute('id', t);

                    newElement.setAttribute('class', getStatuscolor(v) + " table_tr");
                    newElement.setAttribute('onclick', "openctrct(" + JSON.stringify(v) + ")");
                    if (getdays(v) <= 120) {
                        newElement.setAttribute('title', "Necessita abrir nova licitação.");
                    }
                    if (getStatus(v) == 'Vencido') {
                        newElement.setAttribute('title', "Vencido");
                    }
                    newElement.innerHTML = "<td style='max-width:5px;width:5px;'>" + getAlerta(v) +
                        "</td><td class='list_tb_td'>" + num +
                        "</td><td class='list_tb_td'>" + v.name +
                        "</td><td class='list_tb_td'>" + dateformat(d) +
                        "</td><td class='list_tb_td'>" + v.periodo +
                        "</td><td class='list_tb_td'>" + rs(getEmpenho(v)) +
                        "</td><td class='list_tb_td'>" + getSaldo(v) +
                        "</td><td class='list_tb_td'>" + getmodepagto(v) +
                        "</td><td class='list_tb_td'>" + getStatus(v) +
                        "</td>";
                    p.appendChild(newElement);
                }
                mvenc();
                sortprio();
            }
        });
    });
}

lst_ctrct();

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

function mvenc() {
    var ch = document.getElementById('svenc').checked
    table = document.getElementById("list_tb");
    tr = table.getElementsByTagName("tr");
    for (i = 1; i < tr.length; i++) {
        if (tr[i].className.indexOf('ctrct_col_venc') > -1) {
            if (ch) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function sortprio() {
    var n = 0;
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("list_tb");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.getElementsByTagName("TR");
        for (i = 0; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i];
            y = rows[i + 1];
            if (i == 0) { } else {
                if (x.className.toLowerCase() > y.className.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}