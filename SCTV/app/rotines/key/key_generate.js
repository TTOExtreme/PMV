var rs = require('randomstring');
const ger_crypt = () => {
    return rs.generate({
        charset: 'VFRPRXh0cmVtZS1MdWNhc1JhbWFsaG9DYW1hcm90dG8tMTIvMDMvMTk5OC1HZW5lcmF0ZWQtaW4tMTA6MzMtMDMvMDQvMjAxOA',
        length: 32
    }).toString();
};
module.exports = ger_crypt;