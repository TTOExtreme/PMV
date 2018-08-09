loadMainScripter('libs/crypto-js/crypto-js.js');

function sha2(mess) {
    var r = CryptoJS.SHA512(mess);
    var ret = "";
    (r).toString().split('').forEach((e) => {
        ret += (e.charCodeAt(0) + 12).toString(16);
    });
    return ret;
}

function hasher(key, mess) {
    var r = CryptoJS.AES.encrypt(mess, key);
    var ret = "";
    (r).toString().split('').forEach((e) => {
        ret += (e.charCodeAt(0) + 7).toString(16);
    });
    return ret;
}

function unhasher(key, crypt_mess) {
    var dec1 = "";
    if (crypt_mess == "0") { return "0"; }
    crypt_mess.match(/.{1,2}/g).forEach((e) => {
        dec1 += String.fromCharCode(parseInt(e, 16) - 7);
    })
    var r = CryptoJS.AES.decrypt((dec1), key);
    return r.toString(CryptoJS.enc.Utf8);
}