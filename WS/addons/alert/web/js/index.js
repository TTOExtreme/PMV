var json = '';
var maxcont = 720;
var maxtitle = 360;
function lst_load() {
    load(() => {
        loadJSON(function (json1) {
            var htm = "<tr><td>"
            if (indb.permissions.findIndex(x => x.name === "adm_alert") > 0) {
                htm += "<button style='margin-left:20px' onclick='edt();'>Editar</button>";
            }

            htm += "</td></tr>";
            document.getElementById('mf_table_controls').innerHTML = htm;
            json = JSON.parse(json1);
            if (json[0] != undefined) {
                var p = document.getElementById("list_tb");
                p.setAttribute('style', "margin-left:10px; width:98vw;heigth:98vh;")

                p.innerHTML = "<tr class='alert_tr'>" +
                    "<td rowspan='2'>" +
                    "<table class='alert_div'><tr><td class='alert_main'><div class='alert_div_1' onclick=\"openAlert('" + json[1].num + "');\"><img class='img_1' src='./img/1.png'><div class='text_0'><p><b style='font-size:22pt;'>" + json[1].title + "</b></p><p> " + json[1].descr + "</p></div></div></td></tr></table>" +
                    "</td><td>" +
                    "<table class='alert_div'><tr><td class='alert_main'><div class='alert_div' onclick=\"openAlert('" + json[2].num + "');\"><center class='descr'><b class ='b'>" + json[2].title + "</b></center><div class='text'>" + json[2].descr + "</div></div></td></tr></table>" +
                    "</td><td>" +
                    "<table class='alert_div'><tr><td class='alert_main'><div class='alert_div' onclick=\"openAlert('" + json[3].num + "');\"><center class='descr'><b>" + json[3].title + "</b></center><div class='text'>" + json[3].descr + "</div></div></td></tr></table>" +
                    "</td></tr>" +
                    "<tr  class='alert_tr'><td>" +
                    "<table class='alert_div'><tr><td class='alert_main'><div class='alert_div' onclick=\"openAlert('" + json[4].num + "');\"><center class='descr'><b>" + json[4].title + "</b></center><div class='text'>" + json[4].descr + "</div></div></td></tr></table>" +
                    "</td><td>" +
                    "<table class='alert_div'><tr><td class='alert_main'><div class='alert_div' onclick=\"openAlert('" + json[5].num + "');\"><center class='descr'><b>" + json[5].title + "</b></center><div class='text'>" + json[5].descr + "</div></div></td></tr></table>" +
                    "</td></tr>";
            }
        })
    })
}

function edt() {
    var htm = "<tr><td>"
    if (indb.permissions.findIndex(x => x.name === "adm_alert") > 0) {
        htm += "<button style='margin-left:20px' onclick='lst_load();'>Voltar</button>";
        htm += "<button style='margin-left:20px' onclick='savestate();'>Salvar</button>";
    }

    htm += "</td></tr>";
    document.getElementById('mf_table_controls').innerHTML = htm;
    if (json[0] != undefined) {
        var p = document.getElementById("list_tb");
        p.setAttribute('style', "margin-left:10px; width:98vw;heigth:98vh;")

        p.innerHTML =
            "<tr class='table_tr'><td><b>(Aviso 1)</b></td><td>Titulo:<pre id='t01'>Max:" + maxtitle + "</pre></td><td><input maxlength='" + maxtitle + "' id='title01' value='" + json[1].title + "' onkeyup='tich(\"01\");'></td><td>Conteudo:<pre id='d01'>Max:" + maxcont + "</pre></td><td style='width:60vw'><textarea onkeyup='coch(\"01\");' maxlength='" + maxcont + "' style='text-align:justify;resize:none;width:100%' type='text' id='descr01'>" + json[1].descr + "</textarea></td></tr>" +
            "<tr class='table_tr'><td><b>(Aviso 2)</b></td><td>Titulo:<pre id='t02'>Max:" + maxtitle + "</pre></td><td><input maxlength='" + maxtitle + "' id='title02' value='" + json[2].title + "' onkeyup='tich(\"02\");'></td><td>Conteudo:<pre id='d02'>Max:" + maxcont + "</pre></td><td style='width:60vw'><textarea onkeyup='coch(\"02\");' maxlength='" + maxcont + "' style='text-align:justify;resize:none;width:100%' type='text' id='descr02'>" + json[2].descr + "</textarea></td></tr>" +
            "<tr class='table_tr'><td><b>(Aviso 3)</b></td><td>Titulo:<pre id='t03'>Max:" + maxtitle + "</pre></td><td><input maxlength='" + maxtitle + "' id='title03' value='" + json[3].title + "' onkeyup='tich(\"03\");'></td><td>Conteudo:<pre id='d03'>Max:" + maxcont + "</pre></td><td style='width:60vw'><textarea onkeyup='coch(\"03\");' maxlength='" + maxcont + "' style='text-align:justify;resize:none;width:100%' type='text' id='descr03'>" + json[3].descr + "</textarea></td></tr>" +
            "<tr class='table_tr'><td><b>(Aviso 4)</b></td><td>Titulo:<pre id='t04'>Max:" + maxtitle + "</pre></td><td><input maxlength='" + maxtitle + "' id='title04' value='" + json[4].title + "' onkeyup='tich(\"04\");'></td><td>Conteudo:<pre id='d04'>Max:" + maxcont + "</pre></td><td style='width:60vw'><textarea onkeyup='coch(\"04\");' maxlength='" + maxcont + "' style='text-align:justify;resize:none;width:100%' type='text' id='descr04'>" + json[4].descr + "</textarea></td></tr>" +
            "<tr class='table_tr'><td><b>(Aviso 5)</b></td><td>Titulo:<pre id='t05'>Max:" + maxtitle + "</pre></td><td><input maxlength='" + maxtitle + "' id='title05' value='" + json[5].title + "' onkeyup='tich(\"05\");'></td><td>Conteudo:<pre id='d05'>Max:" + maxcont + "</pre></td><td style='width:60vw'><textarea onkeyup='coch(\"05\");' maxlength='" + maxcont + "' style='text-align:justify;resize:none;width:100%' type='text' id='descr05'>" + json[5].descr + "</textarea></td></tr>" +
            "<tr class='table_tr'><td><b>(Aviso 1)</b></td><td colspan='4'><form id='frm1' target='mf'><input id='file01' name='file' type='file' multiple='multiple'></form></td></tr>" +
            "<tr class='table_tr'><td><b>(PopUp)</b></td><td colspan='4'><form id='frm0' target='mf'><input id='filepopup' name='file' type='file' multiple='multiple'></form></td></tr>";
        tich('01');
        tich('02');
        tich('03');
        tich('04');
        tich('05');
        coch('01');
        coch('02');
        coch('03');
        coch('04');
        coch('05');
    }
}

function tich(num) {
    var len = document.getElementById('title' + num).value.length;
    document.getElementById('t' + num).innerText = "Max:" + (maxtitle - len) + "";
}

function coch(num) {
    var len = document.getElementById('descr' + num).value.length;
    document.getElementById('d' + num).innerText = "Max:" + (maxcont - len) + "";
}

function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', './js/alerts.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function savestate() {
    savestate_01();
    savestate_popup();
    json[1].title = document.getElementById('title01').value;
    json[2].title = document.getElementById('title02').value;
    json[3].title = document.getElementById('title03').value;
    json[4].title = document.getElementById('title04').value;
    json[5].title = document.getElementById('title05').value;

    json[1].descr = document.getElementById('descr01').value;
    json[2].descr = document.getElementById('descr02').value;
    json[3].descr = document.getElementById('descr03').value;
    json[4].descr = document.getElementById('descr04').value;
    json[5].descr = document.getElementById('descr05').value;

    p2p_send({ data: JSON.stringify(json) }, cfg.dbcon + 'addons/alert_set', function (result) {
        pops(lang[result.data]);
        if (result.data == 'modified') {
            reloadmainframe(10);
        }
    })

}

function savestate_01() {
    var file = document.getElementById('file01');
    if (file.files[0] != undefined) {
        var form = document.getElementById('frm1');
        form.setAttribute('method', 'POST');
        form.setAttribute('enctype', "multipart/form-data");
        form.setAttribute('target', "mf");
        form.setAttribute('action', cfg.dbcon + 'addons/alertUP');
        //*/
        form.submit();
        console.log("sended: " + cfg.dbcon + 'addons/alertUP');
    }
}

function savestate_popup() {
    var file = document.getElementById('filepopup');
    if (file.files[0] != undefined) {
        var form = document.getElementById('frm0');
        form.setAttribute('method', 'POST');
        form.setAttribute('enctype', "multipart/form-data");
        form.setAttribute('target', "mf");
        form.setAttribute('action', cfg.dbcon + 'addons/alertpopUP');
        //*/
        form.submit();
    }
}

lst_load();