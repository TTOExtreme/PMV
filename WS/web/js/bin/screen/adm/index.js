var last = 0;
var max = cfg.maxlist;

function lst_log() {
    wait_Load(() => {
        load(() => {
            if (indb.log_loaded == false) {
                loadlog(() => {
                    lst_log();
                });
                return;
            } else {
                var ptable = indb.log;
                var p = document.getElementById("list_tb");
                p.innerHTML = "";
                var newElement = document.createElement('tr');
                newElement.setAttribute('id', "list_header");
                newElement.setAttribute('class', "list_header");
                newElement.innerHTML = "" +
                    "<td>IDº " +
                    "<div class='dropdown'><button class='filter'onclick='sortTable(0)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb01' type=\"text\" onkeyup=\"filterTable(0,'tb01')\"></div></div></td>" +
                    "</td><td>Usuário " +
                    "<div class='dropdown'><button class='filter'onclick='sortTable(1)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb02' type=\"text\" onkeyup=\"filterTable(1,'tb02')\"></div></div></td>" +
                    "</td><td>Data " +
                    "<div class='dropdown'><button class='filter'onclick='sortTable(2)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb03' type=\"text\" onkeyup=\"filterTable(2,'tb03')\"></div></div></td>" +
                    "</td><td>Rota " +
                    "<div class='dropdown'><button class='filter'onclick='sortTable(3)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb04' type=\"text\" onkeyup=\"filterTable(3,'tb04')\"></div></div></td>" +
                    "</td><td>Sucesso " +
                    "<div class='dropdown'><button class='filter'onclick='sortTable(4)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb05' type=\"text\" onkeyup=\"filterTable(4,'tb05')\"></div></div></td>" +
                    "</td><td>Tempo de espera " +
                    "</td>";
                p.appendChild(newElement);
                if (ptable[0] != undefined) {
                    setTimeout(() => {
                        loadlog(() => {
                            lst_log();
                        });
                    }, 1000);
                    for (i = 0; i < ptable.length; i++) {
                        var v = ptable[i];
                        var newElement = document.createElement('tr');
                        if (i >= max) { newElement.style.display = "none"; }
                        if (i >= max) { last = max; }
                        var t = v.user;
                        newElement.setAttribute('id', t);
                        newElement.setAttribute('class', "table_tr");
                        var ll = v.data;
                        if (ll == null) { ll = "-"; } else {
                            ll = ll.substring(0, ll.indexOf("T"));
                        }
                        var s = "Sim";
                        if (v.success == 0) { s = "-" };
                        newElement.innerHTML = "" +
                            "<td class='list_tb_td' title='" + v.id + "'>" + v.id +
                            "</td><td class='list_tb_td' title='" + v.user + "'>" + v.user +
                            "</td><td class='list_tb_td' title='" + ll + "'>" + ll +
                            "</td><td class='list_tb_td' title='" + v.route + "'>" + v.route +
                            "</td><td class='list_tb_td' title='" + s + "'>" + s +
                            "</td><td class='list_tb_td' title='" + v.worktime + "'>" + v.worktime + " ms" +
                            "</td>";

                        p.appendChild(newElement);
                    }
                }
            }
        });
    });
}

lst_log();

function loadlog(callback) {
    p2p_send({ index: 0 }, cfg.dbcon + "/lst_log", function (result) {
        if (result.data != '') {
            indb.log = result.data;
            indb.log_loaded = true;
            save(() => {
                callback();
            })
        } else {
            pops("Erro ao Carregar o Log");
        }
    })
}