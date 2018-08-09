function openconfig() {
    if (old_tab != null) {
        document.getElementById(old_tab + "_main").setAttribute('class', "tab_normal");
    }
    var st = document.getElementById('subtabs');
    st.innerHTML = "";
    var ht = document.getElementById('sub_holder');
    ht.style.display = "none";
    document.getElementById("config_main").setAttribute('class', "tab_clicked");
    old_tab = "config";
    old_subtab = null;
    old_subsubtab = null;
    if (indb.tabs[0] != undefined) {
        tab_mainframe("./main/" + "config" + ".html");
    } else {
        preLoadTab(() => {
            openconfig();
        });
    }
}