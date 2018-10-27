loadMainScripter("libs/chart/Chart01.js");
loadAddonScript('/contract/web/js/_payopen.js');
loadAddonScript('/contract/web/js/_ctrctopen.js');
loadAddonScript('/contract/web/js/_files.js');
loadAddonScript('/contract/web/js/_adtiv.js');
loadAddonScriptCall('/contract/web/js/_utils.js', () => { dash_ctrct() });

var colors = ["#5eabc7", "#ff4c4f", "#ff9d3b", "#f5ee6e", "#54d99b", "#5eabc7", "#00a5f9", "#F9E17E", "#FFFF66", "#0000CC", "#CC9900", "#9933FF", "#d40c00", "#9e9e9e"]

function dash_ctrct() {
    wait_Load(() => {
        load(() => {
            if (indb.vis_groups.length < 1) {
                ext_reload_groups(() => {
                    dash_ctrct()
                    return;
                });
            } else {

                getlist(() => {

                    var ptable = indb.addons['ctrct'];

                    var gpsl = [];
                    var gpsn = [];
                    var rnwl = [];
                    var incl = [];

                    var pral = ["Menos de 30 Dias", "Menos de 60 Dias", "Menos de 90 Dias", "Menos de 120 Dias", "Menos de 150 Dias", "Ativos", "Vencidos"]
                    var pran = [0, 0, 0, 0, 0, 0, 0];

                    if (ptable[0] != undefined) {
                        for (i = 0; i < ptable.length; i++) {
                            var v = ptable[i];
                            // per group
                            var grpn = get_grp_usr(v);
                            if (v.usr_id == indb.login.id) {
                                document.getElementById('deptoname').innerHTML = "<pre><b style='font-size:20pt'>" + grpn + "</b></pre>"
                            }
                            var id = gpsl.findIndex(x => x === grpn);
                            if (id > -1) {
                                gpsn[gpsl.findIndex(x => x === grpn)] += 1;
                            } else {
                                gpsl.push(grpn);
                                gpsn.push(1);
                            }
                            //per Venc
                            var grpn = getdays(v)
                            var t4 = getdays(v);
                            if (t4 < 0) { pran[6]++; } else {
                                if (t4 <= 30) { pran[0]++; } else {
                                    if (t4 <= 60) { pran[1]++; } else {
                                        if (t4 <= 90) { pran[2]++; } else {
                                            if (t4 <= 120) { pran[3]++; } else {
                                                if (t4 <= 150) { pran[4]++; } else {
                                                    if (t4 > 150) { pran[5]++; }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            //per renewable
                            if (renewable(v)) {
                                rnwl.push(v);
                            }
                            //per incos/alert
                            if (isinconsist(v) && getdays(v) > 0) {
                                incl.push(v);
                            }

                        }
                    }
                    chartDPTO("QTD", gpsl, gpsn, "");
                    chartVenc("PRAZ", pral, pran, "");
                    lstRenewable(incl, "INCO")
                    lstRenewable(rnwl, "RENEW")
                });

            }

        });
    });
}

function opendpto(name) {
    var ptable = indb.addons['ctrct'];

    var gpsl = [];
    var gpsn = [];

    var pral = ["Menos de 30 Dias", "Menos de 60 Dias", "Menos de 90 Dias", "Menos de 120 Dias", "Menos de 150 Dias", "Ativos", "Vencidos"]
    var pran = [0, 0, 0, 0, 0, 0, 0];

    if (ptable[0] != undefined) {
        for (i = 0; i < ptable.length; i++) {
            var v = ptable[i];
            // per group
            var grpn = get_grp_usr(v)
            if (grpn == name) {
                //per Venc
                var grpn = getdays(v)
                var t4 = getdays(v);
                if (t4 < 0) { pran[6]++; } else {
                    if (t4 <= 30) { pran[0]++; } else {
                        if (t4 <= 60) { pran[1]++; } else {
                            if (t4 <= 90) { pran[2]++; } else {
                                if (t4 <= 120) { pran[3]++; } else {
                                    if (t4 <= 150) { pran[4]++; } else {
                                        if (t4 > 150) { pran[5]++; }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    chartVenc("PRAZ", pral, pran, name);
}

//dash_ctrct();

function lstRenewable(lst, name) {

    var p = document.getElementById(name);
    p.innerHTML = "";
    var newElement = document.createElement('tr');
    newElement.setAttribute('id', "list_header");
    newElement.setAttribute('class', "list_header");
    newElement.innerHTML = "<td style='max-width:5px;width:5px;'>Alertas" +
        "</td><td>P.C.Nº " +
        "</td><td>Nome " +
        "</td><td>Status/Venc." +
        "</td>";
    p.appendChild(newElement);
    if (lst[0] != undefined) {
        for (i = 0; i < lst.length; i++) {
            if (i > 7) { return; }
            var v = lst[i];
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
                "</td><td class='list_tb_td' style='max-width:200px;'>" + v.name +
                //"</td><td class='list_tb_td'>" + dateformat(d) +
                //"</td><td class='list_tb_td'>" + v.periodo +
                //"</td><td class='list_tb_td'>" + rs(getEmpenho(v)) +
                //"</td><td class='list_tb_td'>" + getSaldo(v) +
                //"</td><td class='list_tb_td'>" + getmodepagto(v) +
                "</td><td class='list_tb_td'>" + getStatus(v) +
                "</td>";
            p.appendChild(newElement);
        }
    }
    sorttable(name);
}

function chartDPTO(name, data, values, title) {
    var ctx = document.getElementById(name).innerHTML = "";
    var ctx = document.getElementById(name).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: data,
            datasets: [{
                label: '',
                data: values,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: title
            },
            responsive: true,
            legend: {
                display: true,
                position: 'right',
                labels: {
                    fontColor: 'rgb(0,0,0)'
                }
            },
            onClick: function (e, f) {
                //console.log(data[f[0]._index]);
                //opendpto(data[f[0]._index]);
            }
        }
    });
}

function chartVenc(name, data, values, title) {
    var col = ["#000000", "#ff4c4f", "#ff9d3b", "#f5ee6e", "#54d99b", "#5eabc7", "#00a5f9"]

    var ctx = document.getElementById(name).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: data,
            datasets: [{
                label: '',
                data: values,
                backgroundColor: col,
                borderColor: col,
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: title
            },
            responsive: true,
            legend: {
                display: true,
                position: 'right',
                labels: {
                    fontColor: 'rgb(0,0,0)'
                }
            },
            onClick: function (e, f) {
                //console.log(data[f[0]._index]);
            }
        }
    });
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

function get_grp_usr(v) {
    if (v.username[0] != undefined) {
        var grpid = get_grp_name_id(v.username[0].grp_id);
        return grpid;
    } else {
        return "-!-"
    }
}