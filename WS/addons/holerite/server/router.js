const Router = require('koa-router');
const auth = require('../../../app/handlers/gerencia_usr_grp/ath/auth');
const checkpermission = require('../../../app/handlers/gerencia_usr_grp/ath/check_permission');
const cfg = require('./db').permissions;

var lst_holerite = require('./rotines/lst')
var mail_holerite = require('./rotines/mail')

const router = new Router();

router.post('/mail_holerite', auth, mail_holerite);
router.post('/lst_holerite', auth, (ctx, next) => checkpermission(ctx, next, [cfg.acc_tab_holerite]), lst_holerite);

module.exports = router;