function crt_ctrct() {

    var num = document.getElementById('num').value;
    var nam = document.getElementById('name').value;
    var des = document.getElementById('desc').value;
    var val = document.getElementById('value').value;
    var dat = document.getElementById('ini_data').value;
    var ch = document.getElementById('renewable');
    if (ch.checked) { ch = 1; } else { ch = 0; }
    var per = document.getElementById('periodo');
    var npays = document.getElementById('npays');
    var file = document.getElementById('file');
    if (file.files[0]) {


        per = per.options[per.selectedIndex].value;
        npays = npays.options[npays.selectedIndex].value;

        if (num != undefined &&
            nam != undefined &&
            des != undefined &&
            val != undefined &&
            dat != undefined &&
            per != undefined
        ) {
            if (val.indexOf(",") == -1) { val = val + ",00"; }
            val = val.replace(".", "").replace(".", "").replace(",", ".");
            var form = document.getElementById('frm');
            file = getData();
            document.getElementById('fname').setAttribute('value', file);
            form.setAttribute('method', 'POST');
            form.setAttribute('enctype', "multipart/form-data");
            form.setAttribute('target', "mf");
            form.setAttribute('action', cfg.dbcon + 'addons/ctrctUP');
            //*/
            form.submit();

            var par = {
                name: nam,
                num: num,
                desc: des,
                ini_data: dat,
                periodo: per,
                npays: npays,
                value: val,
                renewable: ch,
                file: file
            }

            p2p_send(par, cfg.dbcon + 'addons/crt_ctrct', function(result) {
                pops(lang[result.data]);
                if (result.data == 'created') {
                    reloadmainframe(10);
                }
            })
        } else {
            pops("Preencha todos os campos");
        } //*/
    } else {
        pops("Associe um Arquivo");
    }

}

function ren() {
    var ch = document.getElementById('renewable');
    if (ch.checked) {
        document.getElementById('ren').setAttribute('style', '');
    } else {
        document.getElementById('ren').setAttribute('style', 'display:none');
    }
}