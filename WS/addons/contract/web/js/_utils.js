function getSaldo(v) {
    var sald = getEmpenho(v);
    for (l = 0; l < v.pays.length; l++) {
        var d = new Date(v.pays[l].data.substring(0, v.pays[l].data.indexOf("T")));
        var d1 = new Date();
        if (d.getFullYear() == d1.getFullYear()) {
            sald -= v.pays[l].value;
        }
    }
    var htm = "" + rs(sald) + "";

    return htm;
}

function getValueAdtiv(v) {
    var sald = v.value;
    for (l = 0; l < v.adtiv.length; l++) {
        sald += v.adtiv[l].value;
    }
    return sald;
}

function getAdtivperc(v) {
    var sald = 0;
    for (l = 0; l < v.adtiv.length; l++) {
        sald += v.adtiv[l].value;
    }
    sald = (sald / v.value) * 100;
    return sald.toFixed(2);
}

function getAdtivTot(v) {
    var sald = 0;
    for (l = 0; l < v.adtiv.length; l++) {
        sald += v.adtiv[l].value;
    }
    return sald;
}

function getmedsaldo(v) {
    var sald = 0;
    for (l = 0; l < v.pays.length; l++) {
        sald += v.pays[l].value;
    }
    return sald / v.pays.length;
}

function getStatus(v) {
    var t4 = getdays(v);
    if (t4 < 0) { return 'Vencido'; }
    if (t4 == 0) { return 'Vencimento Hoje'; }
    if (t4 == 1) { return '1 Dia Rest.'; }
    if (t4 <= 150) { return t4 + ' Dias Rest.'; }
    return 'Ativo';
}

function getStatuscolor(v) {
    var t4 = getdays(v);
    if (t4 < 0) { return 'ctrct_col_venc'; }
    if (t4 <= 30) { return 'ctrct_col_0'; }
    if (t4 <= 60) { return 'ctrct_col_1'; }
    if (t4 <= 90) { return 'ctrct_col_2'; }
    if (t4 <= 120) { return 'ctrct_col_3'; }
    if (t4 <= 150) { return 'ctrct_col_4'; }
    return 'ctrct_col_atv';
}

function getdays(v) {
    var t1 = new Date(v.ini_data);
    var t2 = new Date();
    if (indb.login.timestamp != 0) {
        t2 = new Date(indb.login.timestamp);
    }
    var t4 = Math.round(((t1 - t2) / (1000 * 60 * 60 * 24)) + (v.periodo / 12) * 365);
    return t4;
}

function getAlerta(v) {

    var htm = "";
    if (isinconsist(v)) {
        htm += "<img title='Inconsistência no Pagamento' style='max-width:20px; margin:5px' src='./img/pag.gif'></img>";
    }
    if (isalert(v)) {
        htm += "<img title='Necessita abrir nova licitação' style='max-width:20px; margin:5px' src='./img/lic.gif'></img>";
    }
    return htm;
}

function isinconsist(v) {
    var sald = getmedsaldo(v);
    var fixed = getValueAdtiv(v) / v.periodo;

    if (v.pay_times == 1) {
        fixed = getValueAdtiv(v) / v.periodo;
    }
    if (v.pay_times == 2) {
        fixed = getValueAdtiv(v) / (v.periodo / 12);
    }
    if (v.pay_times == 3) {
        fixed = getValueAdtiv(v);
    }

    if (sald > fixed) {
        return true;
    }
    return false;
}

function isalert(v) {
    if (getdays(v) <= 120 && getdays(v) > 0) {
        return true;
    }
    return false;
}

function paydate(v, date) {
    var t1 = new Date(v.ini_data.substring(0, v.ini_data.indexOf("T")));
    var t2 = new Date(date);
    var t3 = (((t1.getFullYear() - t2.getFullYear()) * 12) + (t1.getMonth() - t2.getMonth()) + v.periodo);
    var days = t1.getDate() - t2.getDate();
    if (t3 >= 0) {
        if (t3 == 0) {
            if (days >= 0 && t3 == 0) {
                return true;
            }
        } else {
            return true;
        }
    }
    return false;
}

function renewable(v) {
    if (v.renewable > 0) {
        var d = getdays(v);
        if (d <= 120 && d >= 0) {
            return true;
        }
    }
    return false;
}

function getEmpenho(v) {
    var t1 = new Date(v.ini_data.substring(0, v.ini_data.indexOf("T")));
    var t2 = new Date();
    var t3 = new Date(t1.getFullYear() + (v.periodo / 12), t1.getMonth(), t1.getDay());
    if (indb.login.timestamp != 0) {
        t2 = new Date(indb.login.timestamp);
    }
    var emp = [];
    if (v.pay_times == 1) { //mes=
        emp[0] = getValueAdtiv(v) / v.periodo;
        if (t1.getFullYear() == t2.getFullYear()) {
            return (emp[0] * (11 - t1.getMonth()));
        }
        if (t1.getFullYear() > t2.getFullYear()) {
            return 2;
        }
        if (t1.getFullYear() < t2.getFullYear()) {
            var r = 0;
            if (t2.getFullYear() == t3.getFullYear()) {
                var m = v.periodo - (11 - t1.getMonth());
                r = emp[0] * m;
            } else {
                r = (emp[0] * 12);
            }
            return r;
        }
    }
    if (v.pay_times == 2) { //ano
        return getValueAdtiv(v);
    }
    if (v.pay_times == 3) { //integral
        return getValueAdtiv(v);
    }
    return getValueAdtiv(v);
}

function sorttable(name) {
    var n = 0;
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById(name);
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.getElementsByTagName("TR");
        for (i = 0; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i];
            y = rows[i + 1];
            if (i == 0) {} else {
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