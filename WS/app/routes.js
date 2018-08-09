const Router = require('koa-router');

const auth = require('./handlers/gerencia_usr_grp/ath/auth');
const checkpermission = require('./handlers/gerencia_usr_grp/ath/check_permission');
const cfg = require('../config/db').permissions;

const lst_perms = require('./handlers/gerencia_usr_grp/prm/lst');
const lst_usr_perms = require('./handlers/gerencia_usr_grp/prm/get_usr');
const lst_grp_perms = require('./handlers/gerencia_usr_grp/prm/get_grp');

const lst_users = require('./handlers/gerencia_usr_grp/usr/lst');
const lst_groups = require('./handlers/gerencia_usr_grp/grp/lst');
const lst_log = require('./handlers/gerencia_usr_grp/log/lst');

const crt_usr = require('./handlers/gerencia_usr_grp/usr/add');
const crt_grp = require('./handlers/gerencia_usr_grp/grp/add');

const edt_usr = require('./handlers/gerencia_usr_grp/usr/edt');
const edt_own = require('./handlers/gerencia_usr_grp/usr/upd');
const rst_usr = require('./handlers/gerencia_usr_grp/usr/rst');
const edt_grp = require('./handlers/gerencia_usr_grp/grp/edt');

const del_usr = require('./handlers/gerencia_usr_grp/usr/del');
const del_grp = require('./handlers/gerencia_usr_grp/grp/del');

const atr_prm_usr = require('./handlers/gerencia_usr_grp/prm/atr_usr');
const atr_prm_grp = require('./handlers/gerencia_usr_grp/prm/atr_grp');

const rem_prm_usr = require('./handlers/gerencia_usr_grp/prm/rem_usr');
const rem_prm_grp = require('./handlers/gerencia_usr_grp/prm/rem_grp');

const atr_grp_usr = require('./handlers/gerencia_usr_grp/grp/atr_usr');
const atr_grp_grp = require('./handlers/gerencia_usr_grp/grp/atr_grp');

const rem_grp_usr = require('./handlers/gerencia_usr_grp/grp/rem_usr');
const rem_grp_grp = require('./handlers/gerencia_usr_grp/grp/rem_grp');

const router = new Router()

router.post('/login', auth, (ctx, next) => checkpermission(ctx, next, [cfg.login]));
router.post('/permissions', auth, (ctx, next) => checkpermission(ctx, next, [cfg.lst_prm, cfg.lst_prm_glob]), lst_perms);

router.post('/get_prm_usr', auth, (ctx, next) => checkpermission(ctx, next, [cfg.lst_usr_prm]), lst_usr_perms);
router.post('/get_prm_grp', auth, (ctx, next) => checkpermission(ctx, next, [cfg.lst_grp_prm]), lst_grp_perms);

router.post('/crt_usr', auth, (ctx, next) => checkpermission(ctx, next, [cfg.crt_usr]), crt_usr);
router.post('/crt_grp', auth, (ctx, next) => checkpermission(ctx, next, [cfg.crt_grp]), crt_grp);

router.post('/edt_usr', auth, (ctx, next) => checkpermission(ctx, next, [cfg.edt_usr]), edt_usr);
router.post('/edt_own', auth, (ctx, next) => checkpermission(ctx, next, [cfg.edt_own]), edt_own);
router.post('/rst_usr', auth, (ctx, next) => checkpermission(ctx, next, [cfg.rst_usr]), rst_usr);
router.post('/edt_grp', auth, (ctx, next) => checkpermission(ctx, next, [cfg.edt_grp]), edt_grp);

router.post('/del_usr', auth, (ctx, next) => checkpermission(ctx, next, [cfg.del_usr]), del_usr);
router.post('/del_grp', auth, (ctx, next) => checkpermission(ctx, next, [cfg.del_grp]), del_grp);

router.post('/lst_usr', auth, (ctx, next) => checkpermission(ctx, next, [cfg.lst_usr, cfg.lst_usr_glob]), lst_users);
router.post('/lst_grp', auth, (ctx, next) => checkpermission(ctx, next, [cfg.lst_grp, cfg.lst_grp_glob]), lst_groups);
router.post('/lst_log', auth, (ctx, next) => checkpermission(ctx, next, [cfg.lst_log]), lst_log);

router.post('/atr_prm_usr', auth, (ctx, next) => checkpermission(ctx, next, [cfg.atr_prm_usr]), atr_prm_usr);
router.post('/atr_prm_grp', auth, (ctx, next) => checkpermission(ctx, next, [cfg.atr_prm_grp]), atr_prm_grp);

router.post('/rem_prm_usr', auth, (ctx, next) => checkpermission(ctx, next, [cfg.rem_prm_usr]), rem_prm_usr);
router.post('/rem_prm_grp', auth, (ctx, next) => checkpermission(ctx, next, [cfg.rem_prm_grp]), rem_prm_grp);

router.post('/atr_grp_usr', auth, (ctx, next) => checkpermission(ctx, next, [cfg.atr_usr_grp]), atr_grp_usr);
router.post('/atr_grp_grp', auth, (ctx, next) => checkpermission(ctx, next, [cfg.atr_grp_grp]), atr_grp_grp);

router.post('/rem_grp_usr', auth, (ctx, next) => checkpermission(ctx, next, [cfg.rem_usr_grp]), rem_grp_usr);
router.post('/rem_grp_grp', auth, (ctx, next) => checkpermission(ctx, next, [cfg.rem_grp_grp]), rem_grp_grp);


module.exports = router;