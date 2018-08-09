var hostfolder = ''

var dbnames = {
    ctrct_table: '_contracts',
    ctrct_rlt_file: 'brg_ctrcts_files',
    ctrct_rlt_adtiv: 'brg_ctrcts_adtiv',
    ctrct_rlt_usr: 'brg_ctrcts_usr',
    ctrct_rlt_grp: 'brg_ctrcts_grp',
    saldo_rlt_grp: 'brg_val_grp',
    pay_table: '_payctrct'
}

var database = [{
    tname: dbnames.ctrct_table, //users
    tcols: [
        { cname: 'id_ctrct', ctype: 'INT(10) KEY AUTO_INCREMENT' },
        { cname: 'crt_usr_id', ctype: 'INT(10)' },
        { cname: 'name', ctype: 'VARCHAR(60)' },
        { cname: 'num', ctype: 'VARCHAR(60)' },
        { cname: 'descr', ctype: 'VARCHAR(1024)' },
        { cname: 'ini_data', ctype: 'TIMESTAMP(6)' },
        { cname: 'periodo', ctype: 'INT(10)' },
        { cname: 'pay_times', ctype: 'INT(10)' },
        { cname: 'value', ctype: 'FLOAT(10,2)' },
        { cname: 'renewable', ctype: 'INT(10)' },
        { cname: 'file', ctype: 'VARCHAR(60)' }
    ]
}, {
    tname: dbnames.pay_table,
    tcols: [
        { cname: 'crt_usr_id', ctype: 'INT(10)' },
        { cname: 'id_pay', ctype: 'INT(10) KEY AUTO_INCREMENT' },
        { cname: 'ctrct_id', ctype: 'INT(10)' },
        { cname: 'value', ctype: 'FLOAT(10,2)' },
        { cname: 'data', ctype: 'TIMESTAMP(6)' },
        { cname: 'file', ctype: 'VARCHAR(60)' }
    ]
}, {
    tname: dbnames.ctrct_rlt_adtiv,
    tcols: [
        { cname: 'crt_usr_id', ctype: 'INT(10)' },
        { cname: 'id_adtiv', ctype: 'INT(10) KEY AUTO_INCREMENT' },
        { cname: 'ctrct_id', ctype: 'INT(10)' },
        { cname: 'value', ctype: 'FLOAT(10,2)' },
        { cname: 'data', ctype: 'TIMESTAMP(6)' },
        { cname: 'file', ctype: 'VARCHAR(60)' }
    ]
}, {
    tname: dbnames.ctrct_rlt_file, //file
    tcols: [
        { cname: 'id_file', ctype: 'INT(10) KEY AUTO_INCREMENT' },
        { cname: 'ctrct_id', ctype: 'INT(10)' },
        { cname: 'data', ctype: 'TIMESTAMP(6)' },
        { cname: 'crt_usr_id', ctype: 'INT(10)' },
        { cname: 'file', ctype: 'VARCHAR(60)' }
    ]
}, {
    tname: dbnames.ctrct_rlt_grp,
    tcols: [
        { cname: 'grp_id', ctype: 'INT(10)' },
        { cname: 'ctrct_id', ctype: 'INT(10)' }
    ]
}, {
    tname: dbnames.ctrct_rlt_usr, //users
    tcols: [
        { cname: 'usr_id', ctype: 'INT(10)' },
        { cname: 'ctrct_id', ctype: 'INT(10)' }
    ]
}]

var permissions = {
    acc_tab_contract: 'acc_tab_addon-contract',
    acc_subtab_search: 'acc_subtabaddon-contract_search',
    acc_subtab_add: 'acc_subtabaddon-contract_add',
    acc_subtab_del: 'acc_ctraddon-contract_del',
    acc_subtab_edt: 'acc_subtabaddon-contract_edt',
    acc_subtab_atr_grp: 'acc_subtabaddon-contract_atr_grp',
    acc_subtab_atr_usr: 'acc_subtabaddon-contract_atr_usr',
    acc_subtab_rem_grp: 'acc_subtabaddon-contract_rem_grp',
    acc_subtab_rem_usr: 'acc_subtabaddon-contract_rem_usr',
    acc_subtab_add_pay: 'acc_ctraddon-contract_add_pay',
    acc_subtab_rem_pay: 'acc_ctraddon-contract_rem_pay',
    acc_subtab_edt_pay: 'acc_ctraddon-contract_edt_pay',
    acc_add_file_ctrct: 'acc_ctraddon-contract_add_file',
    acc_edt_file_ctrct: 'acc_ctraddon-contract_edt_file',
    acc_rem_file_ctrct: 'acc_ctraddon-contract_rem_file',
    acc_add_adtiv_ctrct: 'acc_ctraddon-contract_add_adtiv',
    acc_edt_adtiv_ctrct: 'acc_ctraddon-contract_edt_adtiv',
    acc_rem_adtiv_ctrct: 'acc_ctraddon-contract_rem_adtiv',

    crt_ctrct: 'crt_ctrct',
    del_ctrct: 'del_ctrct',
    edt_ctrct: 'edt_ctrct',
    atr_ctrct_grp: 'atr_ctrct_grp',
    atr_ctrct_usr: 'atr_ctrct_usr',
    rem_ctrct_grp: 'rem_ctrct_grp',
    rem_ctrct_usr: 'rem_ctrct_usr',
    lst_ctrct_glob: 'lst_ctrct_glob',
    lst_ctrct_grp: 'lst_ctrct_grp',
    lst_ctrct_usr: 'lst_ctrct_usr',
    add_file_ctrct: 'add_file_ctrct',
    edt_file_ctrct: 'edt_file_ctrct',
    rem_file_ctrct: 'rem_file_ctrct',

    crt_pay: 'crt_pay',
    del_pay: 'del_pay',
    edt_pay: 'edt_pay',
    lst_pay: 'lst_pay',

    add_adtiv: 'add_aditiv',
    edt_adtiv: 'edt_aditiv',
    del_adtiv: 'del_aditiv'
}

var permlist = [{
    name: permissions.lst_ctrct_usr,
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
    name: permissions.acc_add_file_ctrct,
    desc: "(VIEW) Associar Arquivo a contrato"
},
{
    name: permissions.acc_edt_file_ctrct,
    desc: "(VIEW) Editar Arquivo do contrato"
},
{
    name: permissions.acc_rem_file_ctrct,
    desc: "(VIEW) Remover Arquivo do contrato"
},
{
    name: permissions.acc_add_adtiv_ctrct,
    desc: "(VIEW) Associar Aditivo a contrato"
},
{
    name: permissions.acc_edt_adtiv_ctrct,
    desc: "(VIEW) Editar Aditivo do contrato"
},
{
    name: permissions.acc_rem_adtiv_ctrct,
    desc: "(VIEW) Remover Aditivo do contrato"
},
{
    name: permissions.crt_ctrct,
    desc: "(SV) Criar Contratos"
},
{
    name: permissions.del_ctrct,
    desc: "(SV) Deletar Contratos"
},
{
    name: permissions.edt_ctrct,
    desc: "(SV) Editar Contratos"
},
{
    name: permissions.atr_ctrct_grp,
    desc: "(SV) Atribuir Contrato a Grupo"
},
{
    name: permissions.atr_ctrct_usr,
    desc: "(SV) Atribuir Contrato a Usuário"
},
{
    name: permissions.rem_ctrct_grp,
    desc: "(SV) Remover Contrato do Grupo"
},
{
    name: permissions.rem_ctrct_usr,
    desc: "(SV) Remover Contrato de Usuário"
},
{
    name: permissions.lst_ctrct_grp,
    desc: "(SV) Listar Contratos do Grupo (Hierarquia)"
},
{
    name: permissions.lst_ctrct_glob,
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
    name: permissions.add_file_ctrct,
    desc: "(SV) Associar Arquivo a contrato"
},
{
    name: permissions.edt_file_ctrct,
    desc: "(SV) Editar Arquivo do contrato"
},
{
    name: permissions.rem_file_ctrct,
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