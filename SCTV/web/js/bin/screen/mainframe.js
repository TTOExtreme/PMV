function tab_mainframe(file) {
    document.getElementById('mainframe').setAttribute('src', file);
}

function reloadmainframe(time) {
    setTimeout(function() {
        parent.document.getElementById("mainframe").contentWindow.location.reload(true);
    }, time);
}


function sub_mainframe(file) {
    parent.document.getElementById('mainframe').setAttribute('src', file);
}


function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("list_tb");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.getElementsByTagName("TR");
        for (i = 0; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if (i == 0) {
                    x.innerHTML = x.innerHTML.replace("▼", "▲");
                } else {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            } else if (dir == "desc") {
                if (i == 0) {
                    x.innerHTML = x.innerHTML.replace("▲", "▼");
                } else {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
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

function filterTable(pos, ele) {
    var input, filter, table, tr, td, leng = 0;
    input = document.getElementById(ele);
    filter = input.value.toUpperCase();
    table = document.getElementById("list_tb");
    tr = table.getElementsByTagName("tr");
    for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[pos];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1 && leng < 20) {
                tr[i].style.display = "";
                leng++;
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}


function getData() {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var hh = today.getHours();
    var mi = today.getMinutes();
    var se = today.getSeconds();
    var na = today.getMilliseconds();
    if (dd < 10) { dd = '0' + dd }
    if (mm < 10) { mm = '0' + mm }
    if (hh < 10) { hh = '0' + hh }
    if (mi < 10) { mi = '0' + mi }
    if (se < 10) { se = '0' + se }

    today = yyyy + '-' + mm + '-' + dd + "-" + hh + "." + mi + "." + se + "." + na;
    return today;
}