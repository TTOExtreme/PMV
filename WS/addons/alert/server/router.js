const Router = require('koa-router');
const auth = require('../../../app/handlers/gerencia_usr_grp/ath/auth');
const checkpermission = require('../../../app/handlers/gerencia_usr_grp/ath/check_permission');
const cfg = require('./db');

var alert_set = require('./rotines/set')
var fup = require('./rotines/fileupload')
var fpopup = require('./rotines/fileuploadpopup')

const router = new Router();

var km = require('koa-multer');
var pay_up = km({ dest: "/opt/WS/addons/alert/web/img/" });

router.post('/alert_set', auth, (ctx, next) => checkpermission(ctx, next, [cfg.permissions.adm_alert]), alert_set);
router.post('/alertUP', pay_up.single("file"), fup);
router.post('/alertpopUP', pay_up.single("file"), fpopup);

module.exports = router;