function month(name) {
    var mes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    name = name.replace("01", mes[0])
        .replace("02", mes[1])
        .replace("03", mes[2])
        .replace("04", mes[3])
        .replace("05", mes[4])
        .replace("06", mes[5])
        .replace("07", mes[6])
        .replace("08", mes[7])
        .replace("09", mes[8])
        .replace("10", mes[9])
        .replace("11", mes[10])
        .replace("12", mes[11]);

    return name;
}

function lst_load() {
    load(() => {
        getlist(() => {
            var ptable = indb.addons['ponto']
            if (ptable[0] != undefined) {
                var p = document.getElementById("list_tb");
                p.setAttribute('style', "margin-left:30px; width:50vw;")
                p.innerHTML = "";

                for (i = 0; i < ptable.length; i++) {
                    var t = ptable[i];

                    var yer = t.substring(0, t.indexOf("-")).replace(" ", "");
                    var name = t.substring(0, t.indexOf("."));
                    name = name.substring(name.indexOf("-")).replace("-", "").replace(" ", "");
                    name = month(name);

                    var year = document.getElementById(yer + "_");
                    if (year == null || year == undefined) {
                        year = document.createElement('tr');
                        year.setAttribute('id', "_" + yer + "_");

                        m = document.createElement('td');
                        m.innerHTML = "<table><tr><td><button onclick=\"openYear('" + yer + "_');\">" + yer + "</button></td></tr></table><table class='hidden' id='" + yer + "_'><tr><td><a href = '" + cfg.localfiles + "ponto/" + indb.login.matric + "/" + t + "' target='_blank'>&#8594 " + name + "</a></td></tr></table>";
                        year.appendChild(m);

                        p.appendChild(year);
                    } else {
                        m = document.createElement('tr');
                        m.innerHTML = "<td><a href = '" + cfg.localfiles + "ponto/" + indb.login.matric + "/" + t + "' target='_blank'>&#8594 " + name + "</a><td>";
                        year.appendChild(m);
                    }
                    //*/
                }
            }
        })
    })
}

function getlist(callback) {
    p2p_send({ status: "ping" }, cfg.dbcon + "addons/lst_ponto", function(result) {
        if (result.status == "pong") {
            indb.addons['ponto'] = result.data;
            callback();
        } else {
            pops("Erro ao se comunicar com o servidor");
        }
    })
}

oldYear = null;

function openYear(year) {
    if (oldYear != null) {
        var h = document.getElementById(oldYear);
        h.setAttribute("class", "hidden");
    }
    var h = document.getElementById(year);
    h.setAttribute("class", "shown");
    oldYear = year;
}


function openFormulario() {
    var mb = document.getElementById("msg_box");
    mb.contentDocument.write("<link rel = \"stylesheet\" type=\"text/css\" href=\"../../../css/main.css\">" +
        "<div style ='width:100%;'><center><table class='z20'>" +
        "<tr><td style = 'float:right;'>Nome:</td><td><input id='name' type='text'></td></tr>" +
        "<tr><td style = 'float:right;'>Matricula:</td><td><input id='matric' type='text' ></td></tr>" +
        "<tr><td style = 'float:right;'>CPF:</td><td><input id='cpf' type='text' ></td></tr>" +
        "<tr><td style = 'float:right;'>Periodo relacionado:</td><td><input id='per' type='text' ></td></tr>" +
        "<tr><td style = 'float:right;'>Mensagem:</td><td><textarea style='resize: none;' id='mess' type='text'></textarea></td></tr>" +
        "<tr><td><center><button onclick='parent.reset();'>Voltar</button>" +
        "<button style = 'float:right;' onclick= parent.form(document);>Enviar</button></td></tr></table><center></div>" +
        "");
    mb.setAttribute("class", "z20");
}


function form(doc) {
    var per = doc.getElementById('per').value;
    var mess = doc.getElementById('mess').value;
    var nam = doc.getElementById('name').value;
    var mtc = doc.getElementById('matric').value;
    var cpf = doc.getElementById('cpf').value;
    if (!!mess &&
        !!nam &&
        !!mtc &&
        !!per &&
        !!cpf
    ) {
        p2p_send({ name: nam, matric: mtc, mess: mess + "\nPeriodo: " + per, cpf: cpf }, cfg.dbcon + "addons/mail_ponto", function(result) {
            if (result.status == 'sended') {
                pops(lang[result.status]);
                reset();
            } else {
                if (lang[result.status] == undefined) {
                    pops(result.status);
                } else {
                    pops(lang[result.status]);
                }
            }
        })
    } else {
        pops("Preencha todos os campos");
    }
}

function reset() {
    var mb = document.getElementById("msg_box");
    mb.setAttribute("class", "z-10");
    mb.setAttribute('src', '');
}
lst_load();