function openhome() {
    if (old_tab != null) {
        document.getElementById(old_tab + "_main").setAttribute('class', "tab_normal");
    }
    var st = document.getElementById('subtabs');
    st.innerHTML = "";
    var ht = document.getElementById('sub_holder');
    ht.style.display = "none";
    var s = document.getElementById("home_main");
    if (s != null) { s.setAttribute('class', "tab_clicked"); }
    old_tab = "home";
    old_subtab = null;
    old_subsubtab = null;
    if (indb.tabs[0] != undefined) {
        tab_mainframe("./main/" + "home" + ".html");
    } else {
        preLoadTab(() => {
            openhome();
        });
    }
}