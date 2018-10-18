function p2p_send(element, location, callback, err) {
    if (indb.login.user == 0) { load(() => { p2p_send(element, location, callback, err); return; }) }
    if (element != undefined) {
        indb.login.timestamp = new Date().getTime();
        indb.login.data = element;
        var hsd = hashp2p(indb.login); //4rd pass
        $.post(location, { data: hsd }, function(result) {
            if (result.status == "pong") {
                if (result.data != "") { result.data = unhashp2p(result.data); }
                indb.login.id = result.data.id;
                indb.login.name = result.data.name;
                indb.login.user = result.data.user;
                indb.login.matric = result.data.matric;
                indb.login.auth = result.data.auth;
                indb.login.cpf = result.data.cpf;
                if (result.data.data != "") {
                    var ret = JSON.parse(result.data.data); //json to return data
                    callback(ret);
                } else {
                    pops(lang["error_incode"]);
                    if (err != null) { err(); }
                }
            } else {
                pops(lang[result.status]);
                if (err != null) { err(); }
            }
        });
    } else {
        pops("Verifique seus dados");
        if (err != null) { err(); }
    }
}

function hashp2p(dat) {
    var dt = {
        id: dat.id,
        name: dat.name,
        auth: dat.auth,
        user: dat.user,
        pass: dat.pass,
        matric: dat.matric,
        cpf: 0,
        timestamp: dat.timestamp,
        data: 0
    }
    dt.auth = sha2(JSON.stringify(dt)); //1st pass
    dt.pass = sha2(JSON.stringify(dt)); //2nd pass
    dt.data = hasher(JSON.stringify(dt), JSON.stringify(dat.data)); //3rd pass
    dt.pass = 0;
    dt.auth = dat.auth;
    var hsd = hasher(indb.hs, JSON.stringify(dt)); //4rd pass
    return hsd;
}

function unhashp2p(hsh) {
    var v = unhasher(indb.hs, hsh);
    var dat = JSON.parse(v);
    var pass = indb.login.pass;
    var dt = {
        id: dat.id,
        name: dat.name,
        auth: dat.auth,
        user: indb.login.user,
        pass: pass,
        matric: dat.matric,
        cpf: 0,
        timestamp: dat.timestamp,
        data: 0
    }
    dt.auth = sha2(JSON.stringify(dt)); //1st pass
    dt.pass = sha2(JSON.stringify(dt)); //2nd pass
    dt.data = unhasher(JSON.stringify(dt), dat.data);
    dt.pass = pass;
    dt.cpf = dat.cpf;
    dt.auth = dat.auth;
    return dt;
}