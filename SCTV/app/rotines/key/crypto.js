var key = require('./key_set');
var cfg = require('../../../config')

const exe = (usr, pass, ret1) => {
    var crypto = key();
    var keypass = usr + pass + ":#:"; // identificator
    var arrbyte = []; //key
    var arrbyte1 = []; //pass
    for (var i = 0; i < crypto.length; i++) { arrbyte.push(crypto.charCodeAt(i)); }
    for (var i = 0; i < keypass.length; i++) { arrbyte1.push(keypass.charCodeAt(i)); }
    for (var i = 0; i < arrbyte.length; i++) { arrbyte[i] += arrbyte1[i % arrbyte1.length]; }
    var s = "";
    for (var i = 0; i < arrbyte.length; i++) { s += (arrbyte[i]).toString(36); }
    return s;

};
module.exports = exe;