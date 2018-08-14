function atr_grp(name) {
    var gt = indb.vis_groups;
    var grpopt = "";
    for (i = 0; i < gt.length; i++) {
        grpopt += "<option>" + get_grp_name(gt[i]) + "</option>";
    }
    var htm = "<link rel = \"stylesheet\" type=\"text/css\" href=\"../../../css/main.css\">" +
        "<center><table class='z20'><tr><td><center><h3>Selecione o grupo:</h3><center></td></tr>" +
        "<tr><td><center><select id='selection'>" + grpopt + "</select></td></tr>" +
        "<tr><td><center><button onclick='parent.reset();'>Voltar</button>" +
        "<button onclick= parent.send_atr_grp(document.getElementById(\"selection\"),'" + name + "');>Adicionar</button></td></tr></table><center>";

    var mb = document.getElementById("msg_box");
    mb.contentDocument.write(htm);
    mb.setAttribute('class', 'z10');
}

function send_atr_grp(select, grp) {
    var g = select.options[select.selectedIndex].value;
    g = g.substring(g.lastIndexOf(">") + 1);
    p2p_send({ grpf: g, grps: grp, status: "ping" }, cfg.dbcon + "/atr_grp_grp", function(result) {
        if (result.data == 'added') {
            pops(lang[result.data]);
            reset();
            lst_grp_edt();
        } else {
            if (lang[result.data] == undefined) {
                pops(result.data);
            } else {
                pops(lang[result.data]);
            }
        }
    })
}

function reset() {
    var mb = document.getElementById("msg_box");
    mb.setAttribute("class", "z-10");
    mb.setAttribute('src', '');
}