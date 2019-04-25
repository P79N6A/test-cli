const monitor = require('@futu/monitor');

const ServiceRequest = require('../lib/ServiceRequest');
const config = require('../config');
const {cmlbHeaders} = require('../utils/cmlbHelper');

const { getLogger } = require('../utils');

const ipoEndPoint = config.endPoint.ipo;

const REQUEST_HEADERS = {
    cmlbId: ipoEndPoint.cmlbId, 
    isDev : config.isDevEnv,
    cmd: config.uls.cmd,
    subCmd: config.uls.ipoCmd
};

/**
 *
 * IPO服务
 * @param {*} ctx
 * @param {*} serviceId
 * @param {*} methodId
 * @returns
 */
function request(ctx ,serviceId , methodId) {
    monitor.report(504073);
    
    let {uid , webSig} = ctx.getWebSig();
    let ip = ctx.getRealIp();

    let logger = getLogger(config.uls.cmd , config.uls.ipoCmd , uid , ip);

    let service = new ServiceRequest(Object.assign({} , REQUEST_HEADERS , {uid , clientIp:ip}));
    let headers = {};

    headers.ip = ip;
    headers.serviceid = serviceId;
    headers.methodid = methodId;
    headers.lang = config.lang[ctx.getLang()];
    headers.domain = ctx.getRealHost();

    headers.uid = uid;
    headers.websig = decodeURIComponent(webSig);
    logger.notice('[request] get request now. ' + REQUEST_HEADERS.cmlbId + ' , ' + headers.serviceid + ' , ' + headers.methodid + ' , ' + ctx.getLang());
    return service.getRequest(cmlbHeaders(headers));
}


/**
 *[获取历史记录]
 *
 * @param {*} ctx
 * @returns
 */
exports.getIPOHistoryList = async (ctx , page , size)=>{
    return request(ctx , 0x700D , 0x5).get('ipo-task/get-task-list' , {page, size});
};

/**
 *[获取记录详情]
 *
 * @param {*} ctx
 * @returns
 */
exports.getIPODetail = async (ctx , tid , stockCode)=>{
    return request(ctx , 0x7014 , 0x1).get('ipo-front/task-detail' , {tid, stockCode});
};

/**
 * 撤销任务
 *
 * @param {*} ctx
 * @param {*} tid
 * @returns
 */
exports.cancelTask = async(ctx , tid)=>{
    return request(ctx , 0x700D , 0x6).post('ipo-task/cancel-task' , {tid});
};

/** 
 * 获取股票列表
*/
exports.getNewStockList = async(ctx , stockCode = '', withoutApplyList = 1 , page = 1, size = 1000)=>{
    return request(ctx , 0x700D , 0x1).get('ipo-task/get-new-stock-list' , {stockCode , withoutApplyList , page , size});
};

/** 
 * 获取购买力
*/
exports.getAssetPower = async(ctx , accountId, stockId, tid, onlyUseCash, zeroAsset)=>{
    return request(ctx , 0x700D , 0x9).get('ipo-task/get-asset-power' , {accountId, stockId, tid, onlyUseCash, zeroAsset}); 
};
/** 
 * 创建任务
*/
exports.applyStock = async(ctx , data)=>{
    return request(ctx , 0x700D , 0xa).post('ipo-task/apply-new-stock' , data);
};