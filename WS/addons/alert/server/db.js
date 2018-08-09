var hostfolder = '/opt/Files/web/Files/ponto/';

var permissions = {
    acc_tab_alert: 'acc_tab_addon-alert',
    adm_alert: 'adm_alert'
}

var permlist = [{
    name: permissions.acc_tab_alert,
    desc: "(VIEW)(DEF)adm_alertlertas"
}, {
    name: permissions.adm_alert,
    desc: "(VIEW)(ADM) Tab de Configuração Alertas"
}]

module.exports = { permissions, permlist, hostfolder }