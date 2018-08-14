var hostfolder = '/opt/Files/web/Files/ponto/';

var permissions = {
    acc_tab_ponto: 'acc_tab_addon-ponto',
    lst_ponto: 'lst_ponto'
}

var permlist = [{
    name: permissions.acc_tab_ponto,
    desc: "(VIEW)(DEF) Espelho Frequencia"
}, {
    name: permissions.lst_ponto,
    desc: "(SV)(DEF) Espelho Frequencia"
}]

module.exports = { permissions, permlist, hostfolder }