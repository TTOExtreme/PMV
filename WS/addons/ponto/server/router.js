const Router = require('koa-router');
const auth = require('../../../app/handlers/gerencia_usr_grp/ath/auth');
const checkpermission = require('../../../app/handlers/gerencia_usr_grp/ath/check_permission');
const cfg = require('./db');

var lst_ponto = require('./rotines/lst')
var mail_ponto = require('./rotines/mail')

const router = new Router();

router.post('/mail_ponto', auth, mail_ponto);
router.post('/lst_ponto', auth, (ctx, next) => checkpermission(ctx, next, [cfg.permissions.acc_tab_ponto]), lst_ponto);

module.exports = router;