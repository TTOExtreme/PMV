var old_tab = null;
var old_subtab = null;
var old_subsubtab = null;

function tab_Load() {
    if (indb.tabs[0] != undefined) {
        var ptable = indb.tabs;
        var p = document.getElementById("tabstable");
        p.children = "";
        if (ptable[0] != undefined && p != undefined) {
            var newElement = document.createElement('td');
            var t = "home";
            newElement.setAttribute('id', "home_main");
            newElement.setAttribute('class', "tab_normal");
            newElement.setAttribute('onClick', "openhome()");
            newElement.setAttribute('style', "width:50px");
            newElement.setAttribute('title', "Principal");
            newElement.innerHTML = "<center><img src='../img/home.png' style='height:20px'></center>";
            p.appendChild(newElement);

            var newElement = document.createElement('td');
            var t = "config";
            newElement.setAttribute('id', "config_main");
            newElement.setAttribute('class', "tab_normal");
            newElement.setAttribute('onClick', "openconfig()");
            newElement.setAttribute('style', "width:50px");
            newElement.setAttribute('title', "Alterar Senha");
            newElement.innerHTML = "<center><img src='../img/login_password.png' style='height:20px'></center>";
            p.appendChild(newElement);


            var q = document.getElementById("exit");
            var newElement = document.createElement('td');
            var t = "exit";
            newElement.setAttribute('id', "exit_main");
            newElement.setAttribute('class', "exit");
            newElement.setAttribute('onClick', "exit()");
            newElement.setAttribute('title', "Saida");
            newElement.setAttribute('style', "margin-left:96vw;position:fixed;");
            newElement.innerHTML = "<center><img src='../img/exit.png' style='height:20px;color:white;'></center>";
            q.appendChild(newElement);

            loadAddonScriptCall('/alert/web/js/popup.js', () => {
                openpopup();
            });

            ptable.forEach(function (v) {
                var newElement = document.createElement('td');
                var t = v.name;
                var h = "";
                if (t == "addon-alert") {
                    h = 'style="background:rgba(200,30,30,0.8);"';
                }
                //}
                if (t == "adm") {
                    setTimeout(() => {
                        ext_load_groups(() => { console.log("groups ready"); })
                        ext_load_users(() => { console.log("users-ready"); });
                    }, 300);
                }
                newElement.setAttribute('class', "tab_normal");

                newElement.setAttribute('id', t + "_main");
                newElement.setAttribute('onClick', "openTab('" + t + "')");
                if (t.indexOf("addon-") > -1) {
                    newElement.innerHTML = "<center " + h + ">" + lang[t.replace("addon-", '')] + "</center>";
                } else {
                    newElement.innerHTML = "<center " + h + ">" + lang[t] + "</center>";
                }
                p.appendChild(newElement);
            });

            var newElement = document.createElement('td');
            var t = "contato";
            newElement.setAttribute('id', "contato_main");
            newElement.setAttribute('class', "tab_normal");
            newElement.setAttribute('onClick', "opencontato()");
            newElement.innerHTML = "<center>Contato</center>";
            p.appendChild(newElement);

            openTab('home');
        }
    } else {
        if (!indb.loaded) {
            load(() => {
                preLoadTab(() => {
                    tab_Load();
                });
            });
        } else {
            preLoadTab(() => {
                tab_Load();
            });
        }
    }
}

function openTab(name) {
    if (old_tab != null) {
        document.getElementById(old_tab + "_main").setAttribute('class', "tab_normal");
    }
    document.getElementById(name + "_main").setAttribute('class', "tab_clicked");
    old_tab = name;
    old_subtab = null;
    old_subsubtab = null;
    if (indb.tabs[0] != undefined) {
        indb.tabs.forEach(function (v) {
            if (v.name == name) {
                var st = document.getElementById('subtabs');
                st.innerHTML = "";
                var ntab = document.createElement('tr');
                ntab.innerHTML = "<td style='opacity:0' class='subtab_normal'></td>";
                st.appendChild(ntab);
                var st = document.getElementById('subtabs');
                var ht = document.getElementById('sub_holder');
                if (v.sub.length > 0) {
                    ht.style.display = "";
                } else {
                    ht.style.display = "none";
                }
                for (i = 0; i < v.sub.length; i++) {
                    var t = v.sub[i].name;
                    var e1 = document.createElement('tr');
                    e1.innerHTML = "<td id='" + name + t + "_main' class='subtab_normal' onClick=\"opensubTab('" + name + "','" + t + "')\"><center>" + subtabs_list[t] + "</center></td>";
                    st.appendChild(e1);
                    //table for subtab
                    var e2 = document.createElement('tr');
                    e2.innerHTML = "<td><table id='" + name + t + "_sub' class='holder_subsubtab'></table></td>";
                    st.appendChild(e2);
                }
            }
        });
        if (name.indexOf('addon-') > -1) {
            tab_mainframe(cfg.incon + "/" + name.replace('addon-', '') + "/web/index.html");
        } else {
            tab_mainframe(cfg.incon + "/screens/main/" + name + ".html");
        }
    } else {
        preLoadTab(() => {
            openTab(name);
        });
    }
}

function exit() {
    parse(cfg.incon);
}

function opensubTab(name, t) {
    if (old_subtab != null) {
        document.getElementById(old_subtab + "_main").setAttribute('class', "subtab_normal");
        document.getElementById(old_subtab + "_sub").innerHTML = "";
    }
    document.getElementById(name + t + "_main").setAttribute('class', "subtab_clicked");
    old_subtab = name + t;
    old_subsubtab = null;

    var st = document.getElementById(name + t + "_sub");
    if (st == null) { return; }
    st.innerHTML = "";
    for (i = 0; i < indb.tabs.length; i++) {
        if (indb.tabs[i].name == name) {
            if (indb.tabs[i].sub != []) {
                for (j = 0; j < indb.tabs[i].sub.length; j++) {
                    if (indb.tabs[i].sub[j].name == t) {
                        var v = indb.tabs[i].sub[j];
                        if (v.sub != []) {
                            for (k = 0; k < v.sub.length; k++) {
                                var w = v.sub[k].name;
                                var sst = document.createElement('tr');
                                sst.innerHTML = "<td id='" + name + t + w + "_main' class='subsubtab_normal' onClick=\"opensubsubtab('" + name + "','" + t + "','" + w + "')\"><center>" + subtabs_list[w] + "</center></td>";
                                st.appendChild(sst);
                            }
                            if (name.indexOf('addon-') > -1) {
                                tab_mainframe(cfg.incon + "/" + name.replace('addon-', '') + "/web/" + t + ".html");
                            } else {
                                tab_mainframe("./main/" + name + "/" + t + ".html");
                            }
                            return;
                        }
                    }
                }
            }
        }
    }
}


function opensubsubtab(name, t, w) {
    if (old_subsubtab != null) {
        document.getElementById(old_subsubtab + "_main").setAttribute('class', "subsubtab_normal");
    }
    document.getElementById(name + t + w + "_main").setAttribute('class', "subsubtab_clicked");
    old_subsubtab = name + t + w;

    tab_mainframe("./main/" + name + "/" + t + "/" + w + ".html");
}

function preLoadTab(callback) {
    indb.tabs = [];
    var tabs = []
    if (indb.permissions[0] != undefined) {
        indb.permissions.forEach(function (e) {
            if (e.name.indexOf("acc_tab_") > -1) {
                var name1 = e.name.replace("acc_tab_", "");
                var sub = [];
                indb.permissions.forEach(function (f) {
                    if (f.name.indexOf("_subtab" + name1) > -1) {
                        var name2 = f.name.replace("acc_subtab" + name1 + "_", "");
                        var subsub = [];
                        indb.permissions.forEach(function (g) {
                            if (g.name.indexOf("_subsubtab" + name1 + name2) > -1) {
                                var name3 = g.name.replace("acc_subsubtab" + name1 + name2 + "_", "");
                                subsub.push({ name: name3 });
                            }
                        });
                        sub.push({
                            name: name2,
                            sub: subsub,
                        })
                    }
                });
                tabs.push({
                    name: name1,
                    sub: sub
                });
            }
        });
        var i = tabs.findIndex(x => x.name === "addon-alert");
        if (i > -1) {
            indb.tabs.push(tabs[i]);
        }
        var i = tabs.findIndex(x => x.name === "adm");
        if (i > -1) {
            indb.tabs.push(tabs[i]);
        }
        var i = tabs.findIndex(x => x.name === "addon-contract");
        if (i > -1) {
            indb.tabs.push(tabs[i]);
        }
        var i = tabs.findIndex(x => x.name === "addon-holerite");
        if (i > -1) {
            indb.tabs.push(tabs[i]);
        }
        var i = tabs.findIndex(x => x.name === "addon-ponto");
        if (i > -1) {
            indb.tabs.push(tabs[i]);
        }

        callback();
    } else {
        ext_preload(() => {
            preLoadTab(callback);
        });
    }
}

function parsepost(path) {
    save(() => {
        window.location.href = path;
    });
}

function parse(path) {
    save(() => {
        window.location.href = path;
    });
}