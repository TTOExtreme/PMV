function lst_grp() {
    load_grp(() => {
        ext_reload_groups(() => {
            var p = document.getElementById("list_tb");
            p.innerHTML = "";
            var newElement = document.createElement('tr');
            newElement.setAttribute('id', "list_header");
            newElement.setAttribute('class', "list_header");
            newElement.innerHTML = "" +
                "<td>Nº " +
                "<div class='dropdown'><button class='filter' onclick='sortTable(0)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb01' type=\"text\" onkeyup=\"filterTable(0,'tb01')\"></div></div></td>" +
                "</td><td>Nome " +
                "<div class='dropdown'><button class='filter' onclick='sortTable(1)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb02' type=\"text\" onkeyup=\"filterTable(1,'tb02')\"></div></div></td>" +
                "</td><td> Criado por " +
                "<div class='dropdown'><button class='filter' onclick='sortTable(2)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb03' type=\"text\" onkeyup=\"filterTable(2,'tb03')\"></div></div></td>" +
                "</td><td>Herança " +
                "<div class='dropdown'><button class='filter' onclick='sortTable(3)'>▼</button><button class='filter'>F</button><div class='dropdown-filter-content'><input id='tb04' type=\"text\" onkeyup=\"filterTable(3,'tb04')\"></div></div></td>" +
                "</td>";
            p.appendChild(newElement);

            var ptable = indb.vis_groups
            if (ptable[0] != undefined) {
                for (i = 0; i < ptable.length; i++) {
                    var v = ptable[i];
                    var newElement = document.createElement('tr');
                    newElement.setAttribute('class', "table_tr");
                    newElement.innerHTML = "<td class='list_tb_td'>" + v.id_grp +
                        "</td><td class='list_tb_td'>" + get_grp_name(v) +
                        "</td><td class='list_tb_td'>" + get_user_name(v.grp_crt_usr) +
                        "</td><td class='list_tb_td'>" + v.heranca + "</td>";
                    p.appendChild(newElement);
                }
            }
        });
    });
}

lst_grp();