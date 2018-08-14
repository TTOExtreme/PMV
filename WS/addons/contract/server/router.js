const Router = require('koa-router');
var km = require('koa-multer');
const auth = require('../../../app/handlers/gerencia_usr_grp/ath/auth');
const checkpermission = require('../../../app/handlers/gerencia_usr_grp/ath/check_permission');
const cfg = require('./db').permissions;
var files = require('../../../config');

var lst_contratos = require('./rotines/lst');
var edt_contratos = require('./rotines/edt');
var lst_contratos_grp = require('./rotines/lst_grp');
var lst_contratos_usr = require('./rotines/lst_usr');
var add_contratos = require('./rotines/create');
var del_contratos = require('./rotines/remove');
var atr_grp_contratos = require('./rotines/atr_grp');
var rem_grp_contratos = require('./rotines/rem_grp');
var atr_usr_contratos = require('./rotines/atr_usr');
var rem_usr_contratos = require('./rotines/rem_usr');
var ctrct_up = km({ dest: files.cfg.localhost + "Files/ctrct/" });

const router = new Router();

var pay_up = km({ dest: files.cfg.localhost + "Files/pay/" });
var crt_pay = require('./rotines/ctr_pay');
var del_pay = require('./rotines/del_pay');
var edt_pay = require('./rotines/edt_pay');

var adtiv_up = km({ dest: files.cfg.localhost + "Files/adtiv/" });
var crt_adtiv = require('./rotines/add_adtiv');
var del_adtiv = require('./rotines/del_adtiv');
var edt_adtiv = require('./rotines/edt_adtiv');

var cp_anex = require('./rotines/cp_anex');

router.post('/payUP', pay_up.single("file"), require('./rotines/fileupload_pay'));
router.post('/ctrctUP', ctrct_up.single("file"), require('./rotines/fileupload'));
router.post('/adtivUP', adtiv_up.single("file"), require('./rotines/fileupload_adtiv'));
router.post('/add_file_ctrct', auth, (ctx, next) => checkpermission(ctx, next, [cfg.add_file_ctrct]), require('./rotines/add_file'));
router.post('/edt_file_ctrct', auth, (ctx, next) => checkpermission(ctx, next, [cfg.edt_file_ctrct]), require('./rotines/edt_file'));
router.post('/rem_file_ctrct', auth, (ctx, next) => checkpermission(ctx, next, [cfg.rem_file_ctrct]), require('./rotines/del_file'));

router.post('/lst_ctrct', auth, (ctx, next) => checkpermission(ctx, next, [cfg.lst_ctrct_usr, cfg.lst_ctrct_grp, cfg.lst_ctrct_glob]), lst_contratos);
router.post('/lst_ctrct_usr', auth, (ctx, next) => checkpermission(ctx, next, [cfg.lst_ctrct_usr, cfg.lst_ctrct_grp, cfg.lst_ctrct_glob]), lst_contratos_usr);
router.post('/lst_ctrct_grp', auth, (ctx, next) => checkpermission(ctx, next, [cfg.lst_ctrct_usr, cfg.lst_ctrct_grp, cfg.lst_ctrct_glob]), lst_contratos_grp);

router.post('/crt_ctrct', auth, (ctx, next) => checkpermission(ctx, next, [cfg.crt_ctrct]), add_contratos);
router.post('/del_ctrct', auth, (ctx, next) => checkpermission(ctx, next, [cfg.del_ctrct]), del_contratos);
router.post('/edt_ctrct', auth, (ctx, next) => checkpermission(ctx, next, [cfg.edt_ctrct]), edt_contratos);

router.post('/rem_ctrct_usr', auth, (ctx, next) => checkpermission(ctx, next, [cfg.rem_ctrct_usr]), rem_usr_contratos);
router.post('/atr_ctrct_usr', auth, (ctx, next) => checkpermission(ctx, next, [cfg.atr_ctrct_usr]), atr_usr_contratos);
router.post('/rem_ctrct_grp', auth, (ctx, next) => checkpermission(ctx, next, [cfg.rem_ctrct_grp]), rem_grp_contratos);
router.post('/atr_ctrct_grp', auth, (ctx, next) => checkpermission(ctx, next, [cfg.atr_ctrct_grp]), atr_grp_contratos);

//router.post('/lst_pay', auth, (ctx, next) => checkpermission(ctx, next, [cfg.lst_pay, cfg.lst_pay_glob]), add_contratos);
router.post('/crt_pay', auth, (ctx, next) => checkpermission(ctx, next, [cfg.crt_pay]), crt_pay);
router.post('/del_pay', auth, (ctx, next) => checkpermission(ctx, next, [cfg.del_pay]), del_pay);
router.post('/edt_pay', auth, (ctx, next) => checkpermission(ctx, next, [cfg.edt_pay]), edt_pay);

router.post('/add_adtiv', auth, (ctx, next) => checkpermission(ctx, next, [cfg.add_adtiv]), crt_adtiv);
router.post('/del_adtiv', auth, (ctx, next) => checkpermission(ctx, next, [cfg.del_adtiv]), del_adtiv);
router.post('/edt_adtiv', auth, (ctx, next) => checkpermission(ctx, next, [cfg.edt_adtiv]), edt_adtiv);
router.post('/cp_anex', auth, cp_anex);

module.exports = router;