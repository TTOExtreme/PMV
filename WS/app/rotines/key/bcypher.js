var crp = require('crypto-js');
var kg = require('./key_set');

function sha2(mess) {
    var r = crp.SHA512(mess);
    var ret = "";
    (r).toString().split('').forEach((e) => {
        ret += (e.charCodeAt(0) + 12).toString(16);
    });
    return ret;
}


function crypt(key, mess) {
    var r = crp.AES.encrypt(mess, key);
    var ret = "";
    (r).toString().split('').forEach((e) => {
        ret += (e.charCodeAt(0) + 7).toString(16);
    });
    return ret;
}

function uncrypt(key, crypt_mess) {
    var dec1 = "";
    if (crypt_mess == "0") { return "0"; }
    crypt_mess.match(/.{1,2}/g).forEach((e) => {
        dec1 += String.fromCharCode(parseInt(e, 16) - 7);
    })
    var r = crp.AES.decrypt((dec1), key);
    return r.toString(crp.enc.Utf8);
}

function passcrypt(pass) {
    return crypt(kg(), pass);
}

function passdecrypt(pass) {
    return uncrypt(kg(), pass);
}

module.exports = { crypt, uncrypt, sha2, passcrypt, passdecrypt };