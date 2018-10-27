var hostfolder = ''

var dbnames = {
    sctv_crc: '_crc',//criança
    sctv_respv: '_respv',//responsavel
    sctv_gprt: '_gprt',//grau de parentesco
    sctv_adr: '_adr',//endereço
}

var database = [{
    tname: dbnames.sctv_crc, //criança
    tcols: [
        { cname: 'id_crc', ctype: 'INT(10) PRYMARY KEY AUTO_INCREMENT' },
        { cname: 'name', ctype: 'VARCHAR(60)' },
        { cname: 'rg', ctype: 'VARCHAR(60)' },
        { cname: 'cpf', ctype: 'VARCHAR(1024)' },
        { cname: 'data_nasc', ctype: 'TIMESTAMP(6)' },
        { cname: 'sch_id', ctype: 'INT(10)' },
        { cname: 'adr_id', ctype: 'INT(10)' }
    ]
}, {
    tname: dbnames.sctv_respv,//responsavel
    tcols: [
        { cname: 'id_respv', ctype: 'INT(10) PRYMARY KEY AUTO_INCREMENT' },
        { cname: 'name', ctype: 'VARCHAR(60)' },
        { cname: 'rg', ctype: 'VARCHAR(60)' },
        { cname: 'cpf', ctype: 'VARCHAR(1024)' },
        { cname: 'data_nasc', ctype: 'TIMESTAMP(6)' },
        { cname: 'gprt_id', ctype: 'INT(10)' },
        { cname: 'adr_id', ctype: 'INT(10)' }
    ]
}, {
    tname: dbnames.sctv_gprt,//grau de parentesco
    tcols: [
        { cname: 'id_gprt', ctype: 'INT(10) KEY AUTO_INCREMENT' },
        { cname: 'gprt', ctype: 'VARCHAR(60)' }
    ]
}, {
    tname: dbnames.sctv_adr, //endereço
    tcols: [
        { cname: 'id_adr', ctype: 'INT(10) KEY AUTO_INCREMENT' },
        { cname: 'cep', ctype: 'INT(10)' },
        { cname: 'name_str', ctype: 'VARCHAR(120)' },
        { cname: 'brr_id', ctype: 'INT(10)' },
        { cname: 'cdd', ctype: 'VARCHAR(60)' }
    ]
}]

var permissions = {
    acc_tab_ctPront: 'acc_tab_addon-ctPront',
    acc_subtab_search: 'acc_subtabaddon-ctPront_search',
    acc_subtab_crt: 'acc_subtabaddon-ctPront_crt',
    acc_subtab_edt: 'acc_subtabaddon-ctPront_edt',
    acc_subtab_edt: 'acc_ctaddon-ctPront_edt',
    acc_subtab_del: 'acc_ctaddon-ctPront_del',
    acc_subtab_atr_grp: 'acc_ctaddon-ctPront_atr_grp',
    acc_subtab_atr_usr: 'acc_ctaddon-ctPront_atr_usr',
    acc_subtab_rem_grp: 'acc_ctaddon-ctPront_rem_grp',
    acc_subtab_rem_usr: 'acc_ctaddon-ctPront_rem_usr',
    acc_subtab_rem_usr: 'acc_ctaddon-ctPront_add_file',
    acc_subtab_rem_usr: 'acc_ctaddon-ctPront_edt_file',
    acc_subtab_rem_usr: 'acc_ctaddon-ctPront_rem_file',

    acc_tab_ctdash: 'acc_tab_addon-ctDash',




    crt_pront: 'crt_pront',
    del_pront: 'del_pront',
    edt_pront: 'edt_pront',
    atr_pront_grp: 'atr_pront_grp',
    atr_pront_usr: 'atr_pront_usr',
    rem_pront_grp: 'rem_pront_grp',
    rem_pront_usr: 'rem_pront_usr',
    lst_pront_glob: 'lst_pront_glob',
    lst_pront_grp: 'lst_pront_grp',
    lst_pront_usr: 'lst_pront_usr',
    add_file_pront: 'add_file_pront',
    edt_file_pront: 'edt_file_pront',
    rem_file_pront: 'rem_file_pront',

}

var permlist = [{
    name: permissions.lst_pront_usr,
    desc: "(SV)(DEF) Listar Contratos"
},
{
    name: permissions.lst_pay,
    desc: "(SV)(DEF) Listar Pagamentos"
},
{
    name: permissions.acc_tab_contract,
    desc: "(VIEW) Aba Contratos"
},
{
    name: permissions.acc_subtab_search,
    desc: '(VIEW) Busca de Contratos'
},
{
    name: permissions.acc_subtab_add,
    desc: '(VIEW) Criar Contratos'
},
{
    name: permissions.acc_subtab_del,
    desc: '(VIEW) Deletar Contratos'
},
{
    name: permissions.acc_subtab_edt,
    desc: '(VIEW) Editar Contratos'
},
{
    name: permissions.acc_subtab_atr_grp,
    desc: '(VIEW) Atribuir Contratos a Grupo'
},
{
    name: permissions.acc_subtab_atr_usr,
    desc: '(VIEW) Atribuir Contratos a Usuário'
},
{
    name: permissions.acc_subtab_rem_grp,
    desc: '(VIEW) Remover Contrato de Grupo'
},
{
    name: permissions.acc_subtab_rem_usr,
    desc: '(VIEW) Remover Contrato de Usuário'
},
{
    name: permissions.acc_subtab_add_pay,
    desc: '(VIEW) Adicionar Pagamento'
},
{
    name: permissions.acc_subtab_rem_pay,
    desc: '(VIEW) Remover Pagamento'
},
{
    name: permissions.acc_subtab_edt_pay,
    desc: '(VIEW) Editar Pagamento'
},
{
    name: permissions.acc_add_file_pront,
    desc: "(VIEW) Associar Arquivo a contrato"
},
{
    name: permissions.acc_edt_file_pront,
    desc: "(VIEW) Editar Arquivo do contrato"
},
{
    name: permissions.acc_rem_file_pront,
    desc: "(VIEW) Remover Arquivo do contrato"
},
{
    name: permissions.acc_add_adtiv_pront,
    desc: "(VIEW) Associar Aditivo a contrato"
},
{
    name: permissions.acc_edt_adtiv_pront,
    desc: "(VIEW) Editar Aditivo do contrato"
},
{
    name: permissions.acc_rem_adtiv_pront,
    desc: "(VIEW) Remover Aditivo do contrato"
},
{
    name: permissions.crt_pront,
    desc: "(SV) Criar Contratos"
},
{
    name: permissions.del_pront,
    desc: "(SV) Deletar Contratos"
},
{
    name: permissions.edt_pront,
    desc: "(SV) Editar Contratos"
},
{
    name: permissions.atr_pront_grp,
    desc: "(SV) Atribuir Contrato a Grupo"
},
{
    name: permissions.atr_pront_usr,
    desc: "(SV) Atribuir Contrato a Usuário"
},
{
    name: permissions.rem_pront_grp,
    desc: "(SV) Remover Contrato do Grupo"
},
{
    name: permissions.rem_pront_usr,
    desc: "(SV) Remover Contrato de Usuário"
},
{
    name: permissions.lst_pront_grp,
    desc: "(SV) Listar Contratos do Grupo (Hierarquia)"
},
{
    name: permissions.lst_pront_glob,
    desc: "(SV)(ADM) Listar Contratos"
},
{
    name: permissions.crt_pay,
    desc: "(SV) Criar Pagamento"
},
{
    name: permissions.del_pay,
    desc: "(SV) Deletar Pagamento"
},
{
    name: permissions.edt_pay,
    desc: "(SV) Editar Pagamento"
},
{
    name: permissions.add_file_pront,
    desc: "(SV) Associar Arquivo a contrato"
},
{
    name: permissions.edt_file_pront,
    desc: "(SV) Editar Arquivo do contrato"
},
{
    name: permissions.rem_file_pront,
    desc: "(SV) Remover Arquivo do contrato"
},
{
    name: permissions.add_adtiv,
    desc: "(SV) Associar Aditivi a contrato"
},
{
    name: permissions.edt_adtiv,
    desc: "(SV) Editar Aditivo do contrato"
},
{
    name: permissions.del_adtiv,
    desc: "(SV) Remover Aditivo do contrato"
}
]

module.exports = { permissions, permlist, dbnames, database, hostfolder }