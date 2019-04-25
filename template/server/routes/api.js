'use strict';

const router = require( 'koa-router')();

const {ticketVerify} = require('../middleware/ticketVerify');

const historyController = require('../controllers/historyController');
const detailController = require('../controllers/detailController');
const applyController = require('../controllers/applyController');

const listController = require('../controllers/listController');
router.prefix('/api');

router.get('/getIPOHistoryList', ticketVerify , historyController.getIPOHistoryList);
router.post('/cancelIPOTask', ticketVerify , historyController.cancelIPOTask);

router.get('/getIPODetail', ticketVerify , detailController.getIPODetail);

router.get('/getApplyBaseInformation', ticketVerify , applyController.getApplyBaseInformation);
router.get('/getAssetPower', ticketVerify , applyController.getAssetPower);

router.post('/applyStock' , ticketVerify , applyController.applyStock);

router.get('/getIPOList', ticketVerify, listController.getIPOList);
module.exports = router;