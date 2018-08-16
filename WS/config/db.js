var dbnames = {
    database_name: 'PMV_WSPV_B',

    //base tables
    log: '_log',
    usertable: '_users',
    grouptable: '_group',
    cryptkey: '_',
    permissiontable: '_permission',

    //relative tables
    rltpermissionuser: 'brg_perm_user',
    rltpermissiongroup: 'brg_perm_group',
    rltgroupuser: 'brg_user_group',
    rltgroupgroup: 'brg_group_group'
}


var database = [
    {
        tname: dbnames.log,
        tcols: [
            { cname: 'id', ctype: 'INT(10) KEY AUTO_INCREMENT' },
            { cname: 'user', ctype: 'VARCHAR(60)' },
            { cname: 'data', ctype: 'TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP' },
            { cname: 'ret', ctype: 'MEDIUMTEXT' },
            { cname: 'sen', ctype: 'MEDIUMTEXT' },
            { cname: 'route', ctype: 'VARCHAR(60)' },
            { cname: 'worktime', ctype: 'VARCHAR(60)' },
            { cname: 'success', ctype: 'INT(1)' }
        ]
    }, {
        tname: dbnames.usertable, //users
        tcols: [
            { cname: 'id_usr', ctype: 'INT(10) KEY AUTO_INCREMENT' },
            { cname: 'user', ctype: 'VARCHAR(60)' },
            { cname: 'usr_name', ctype: 'VARCHAR(60)' },
            { cname: 'matric', ctype: 'VARCHAR(30)' },
            { cname: 'cpf', ctype: 'VARCHAR(30)' },
            { cname: 'pass', ctype: 'VARCHAR(4096)' },
            { cname: 'auth', ctype: 'VARCHAR(1024)' },
            { cname: 'last_login', ctype: 'TIMESTAMP(6) NULL' }
        ]
    },
    {
        tname: dbnames.grouptable, //users
        tcols: [
            { cname: 'id_grp', ctype: 'INT(10) KEY AUTO_INCREMENT' },
            { cname: 'grp_name', ctype: 'VARCHAR(30)' },
            { cname: 'grp_crt_usr', ctype: 'INT(10)' },
            { cname: 'heranca', ctype: 'INT(1)' }
        ]
    },
    {
        tname: dbnames.cryptkey, //crypto
        tcols: [
            { cname: 'io', ctype: 'VARCHAR(4096)' }
        ]
    },
    {
        tname: dbnames.permissiontable, //permition table
        tcols: [
            { cname: 'id_prm', ctype: 'INT(10) KEY AUTO_INCREMENT' },
            { cname: 'permission', ctype: 'VARCHAR(60)' },
            { cname: 'prm_desc', ctype: 'VARCHAR(200)' }
        ]
    },
    {
        tname: dbnames.rltpermissionuser, //bridge from user to permitions
        tcols: [
            { cname: 'usr_id', ctype: 'INT(10)' },
            { cname: 'prm_id', ctype: 'INT(10)' }
        ]
    },
    {
        tname: dbnames.rltgroupuser, //bridge from group to permitions
        tcols: [
            { cname: 'usr_id', ctype: 'INT(10)' },
            { cname: 'grp_id', ctype: 'INT(10)' }
        ]
    },
    {
        tname: dbnames.rltgroupgroup, //bridge from group to permitions
        tcols: [
            { cname: 'grps_id', ctype: 'INT(10)' },
            { cname: 'grpf_id', ctype: 'INT(10)' }
        ]
    },
    {
        tname: dbnames.rltpermissiongroup, //bridge from user to group
        tcols: [
            { cname: 'grp_id', ctype: 'INT(10)' },
            { cname: 'prm_id', ctype: 'INT(10)' }
        ]
    }
];

var permissions = {
    //permissions names
    login: 'login',
    crt_usr: 'crt_usr',
    edt_usr: 'edt_usr',
    rst_usr: 'edt_usr',
    edt_own: 'edt_own',
    edt_grp: 'edt_grp',
    crt_grp: 'crt_grp',
    crt_prm: 'crt_prm',
    del_usr: 'del_usr',
    del_grp: 'del_grp',
    del_prm: 'del_prm',
    lst_usr: 'lst_usr',
    lst_grp: 'lst_grp',
    lst_prm: 'lst_prm',
    lst_log: 'lst_log',
    lst_usr_prm: 'lst_usr_prm',
    lst_grp_prm: 'lst_grp_prm',
    lst_usr_glob: 'lst_usr_glob',
    lst_grp_glob: 'lst_grp_glob',
    lst_prm_glob: 'lst_prm_glob',
    atr_prm_usr: 'atr_prm_usr',
    atr_prm_grp: 'atr_prm_grp',
    atr_usr_grp: 'atr_usr_grp',
    atr_grp_grp: 'atr_grp_grp',
    rem_prm_usr: 'rem_prm_usr',
    rem_prm_grp: 'rem_prm_grp',
    rem_usr_grp: 'rem_usr_grp',
    rem_grp_grp: 'rem_grp_grp',

}

var permList = [
    //usuario default
    {
        name: permissions.login,
        desc: '(SV)(DEF) Efetuar o login (bloquear usuario)'
    },
    {
        name: permissions.edt_own,
        desc: '(SV)(DEF) Editar Senha'
    },
    {
        name: permissions.lst_prm,
        desc: '(SV)(DEF) Listar Permissões'
    },

    //usuario
    {
        name: permissions.crt_usr,
        desc: '(SV) Criar Usuário'
    },
    {
        name: permissions.rst_usr,
        desc: '(SV) Resetar a Senha'
    },
    {
        name: permissions.edt_usr,
        desc: '(SV) Editar Usuário'
    },
    {
        name: permissions.del_usr,
        desc: '(SV) Deletar Usuário'
    },
    {
        name: permissions.lst_usr,
        desc: '(SV) Listar Usuarios'
    },
    {
        name: permissions.lst_usr_prm,
        desc: '(SV) Listar Permissões de Usuarios'
    },
    {
        name: permissions.atr_prm_usr,
        desc: '(SV) Atribuir Permissão'
    },
    {
        name: permissions.lst_usr_glob,
        desc: '(SV)(ADM) Listar Usuarios'
    },
    {
        name: permissions.lst_prm_glob,
        desc: '(SV)(ADM) Listar Permissões'
    },
    {
        name: permissions.lst_log,
        desc: '(SV)(ADM) Listar Log'
    },
    {
        name: permissions.atr_usr_grp,
        desc: '(SV) Atribuir Usuário a Grupo'
    },
    {
        name: permissions.rem_prm_usr,
        desc: '(SV) Remover Permissões do Usuário'
    },
    {
        name: permissions.rem_usr_grp,
        desc: '(SV) Remover Usuário do Grupo'
    },

    //grupo
    {
        name: permissions.edt_grp,
        desc: '(SV) Editar Grupo'
    },
    {
        name: permissions.crt_grp,
        desc: '(SV) Criar Grupo'
    },
    {
        name: permissions.del_grp,
        desc: '(SV) Deletar Grupo'
    },
    {
        name: permissions.lst_grp,
        desc: '(SV) Listar Grupos'
    },
    {
        name: permissions.lst_grp_prm,
        desc: '(SV) Listar Permissões de Grupos'
    },
    {
        name: permissions.lst_grp_glob,
        desc: '(SV)(ADM) Listar Grupos'
    },
    {
        name: permissions.atr_prm_grp,
        desc: '(SV) Atribuir Permissões a Grupo'
    },
    {
        name: permissions.atr_grp_grp,
        desc: '(SV) Atribuir Grupo a Grupo'
    },
    {
        name: permissions.rem_prm_grp,
        desc: '(SV) Remover Permissões do Grupo'
    },
    {
        name: permissions.rem_grp_grp,
        desc: '(SV) Remover Grupo do Grupo'
    },


    //acesso a tabs
    {
        name: 'acc_tab_adm',
        desc: '(VIEW) Aba Administração'
    },
    //users
    {
        name: 'acc_subtabadm_users',
        desc: '(VIEW) Sub Aba Usuarios'
    },
    {
        name: 'acc_subsubtabadmusers_add',
        desc: '(VIEW) Criar Usuário'
    },
    {
        name: 'acc_subsubtabadmusers_edt',
        desc: '(VIEW) Editar Usuário'
    },
    {
        name: 'acc_edtusers_del',
        desc: '(VIEW) Deletar Usuário'
    },
    {
        name: 'acc_edtusers_prm',
        desc: '(VIEW) Editar Permissões do Usuário'
    },

    {
        name: 'acc_edtusers_atr',
        desc: '(VIEW) Atribuir Usuário a Grupo'
    },
    {
        name: 'acc_edtusers_rem',
        desc: '(VIEW) Remover Usuário do Grupo'
    },
    //group
    {
        name: 'acc_subtabadm_group',
        desc: '(VIEW) Sub Aba Grupo'
    },
    {
        name: 'acc_subsubtabadmgroup_add',
        desc: '(VIEW) Criar Grupo'
    },
    {
        name: 'acc_subsubtabadmgroup_edt',
        desc: '(VIEW) Editar Grupo'
    },
    {
        name: 'acc_edtgroup_del',
        desc: '(VIEW) Deletar Grupo'
    },
    {
        name: 'acc_edtgroup_prm',
        desc: '(VIEW) Editar Permissões do Grupo'
    },
    {
        name: 'acc_edtgroup_atr',
        desc: '(VIEW) Atribuir Grupo a Grupo'
    },
    {
        name: 'acc_edtgroup_rem',
        desc: '(VIEW) Remover Grupo do Grupo'
    }
];

module.exports = { database, dbnames, permList, permissions };