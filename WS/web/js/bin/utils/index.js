function rs(v) {
    return v.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace(".", ";").replace(",", ".").replace(",", ".").replace(";", ",")
}

function reset() {
    var mb = document.getElementById("msg_box");
    mb.setAttribute("class", "z-10");
    mb.setAttribute('src', '');
}

function dateformat(v) {
    var d = new Date(v);
    var dd = d.getDate() + 1;
    if (dd < 10) { dd = "0" + dd };
    var mm = d.getMonth() + 1;
    if (mm < 10) { mm = "0" + mm };
    var yy = d.getFullYear();
    return dd + "/" + mm + "/" + yy;
}