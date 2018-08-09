function opencontato() {
    if (old_tab != null) {
        document.getElementById(old_tab + "_main").setAttribute('class', "tab_normal");
    }
    var st = document.getElementById('subtabs');
    st.innerHTML = "";
    var ht = document.getElementById('sub_holder');
    ht.style.display = "none";
    document.getElementById("contato_main").setAttribute('class', "tab_clicked");
    old_tab = "contato";
    old_subtab = null;
    old_subsubtab = null;
    if (indb.tabs[0] != undefined) {
        tab_mainframe("./main/" + "contato" + ".html");
    } else {
        preLoadTab(() => {
            opencontato();
        });
    }
}


function form1(doc) {
    var area = doc.getElementById('area');
    area = area.options[area.selectedIndex].text;
    var per = doc.getElementById('per').value;
    var mess = doc.getElementById('mess').value;
    var nam = doc.getElementById('name').value;
    var mtc = doc.getElementById('matric').value;
    var cpf = doc.getElementById('cpf').value;
    if (!!area &&
        !!mess &&
        !!nam &&
        !!mtc &&
        !!per &&
        !!cpf
    ) {
        var loc = "addons/mail_ponto";

        if (area == "Holerite") {
            loc = "addons/mail_holerite"
        }
        p2p_send({ name: nam, matric: mtc, mess: mess + "\nPeriodo: " + per + "\nArea: " + area, cpf: cpf }, cfg.dbcon + loc, function(result) {
            if (result.status == 'sended') {
                pops(lang[result.status]);
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

function load_contato() {
    var nam = doc.getElementById('name').value;
    var mtc = doc.getElementById('matric').value;
    var cpf = doc.getElementById('cpf').value;

    nam.value = indb.login.name;
    mtc.value = indb.login.matric;
}