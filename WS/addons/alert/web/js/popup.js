var popuptime = 30

function openpopup() {
    var frm = document.getElementById('popup');
    frm.setAttribute('style', 'height:500px;width:400px; position:absolute; top:50vh; left:50vw;transform:translate(-50%, -50%); display:block;');
    frm.innerHTML = '' +
        "<div style='margin-left:275px;background:#ffffff;width:102px'><div class='table_tr' style='border:1px solid #303030; width:100px;' id='popbot' onclick='instaclosepopup();'><center>Fechar</center></div></div>" +
        "<div style='" +
        "-moz-border-radius: 25px 25px 25px 25px;" +
        "border-radius: 25px 25px 25px 25px;" +
        "border:5px solid #808080;" +
        "overflow: hidden;'>" +
        "<img style='height:500px;width:400px;' src='../alert/web/img/0.png'>" +
        "</div>";
    setTimeout(() => {
        closepopup();
    }, 1000);
}
//openpopup();

function instaclosepopup() {
    popuptime = 0;
    closepopup();
}

function closepopup() {
    if (popuptime > 1) {
        popuptime--;
        var frm = document.getElementById('popbot');
        frm.innerHTML = '<center>Fechar (' + popuptime + 's)</center>';
        setTimeout(() => {
            closepopup();
        }, 1000);
    } else {
        var frm = document.getElementById('popup');
        frm.setAttribute('style', 'display:none;');
    }
}