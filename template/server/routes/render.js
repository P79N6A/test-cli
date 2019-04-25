'use strict';

const KoaRouter = require('koa-router');

const {checkRenderIsLogin} = require('../middleware/ticketVerify');

const historyController = require('../controllers/historyController');
const detailController = require('../controllers/detailController');
const applyController = require('../controllers/applyController');
const listController = require('../controllers/listController');

const router = new KoaRouter();

router.get('/history', checkRenderIsLogin(historyController.render));
router.get('/detail', checkRenderIsLogin(detailController.render));
router.get('/apply', checkRenderIsLogin(applyController.render));
router.get('/list', checkRenderIsLogin(listController.render));

module.exports = router;