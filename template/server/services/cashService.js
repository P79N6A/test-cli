const monitor = require('@futu/monitor');

const ServiceRequest = require('../lib/ServiceRequest');
const config = require('../config');
const {cmlbHeaders} = require('../utils/cmlbHelper');

const { getLogger } = require('../utils');

const cashEndPoint = config.endPoint.cash;

const REQUEST_HEADERS = {
    cmlbId: cashEndPoint.cmlbId, 
    isDev : config.isDevEnv,
    cmd: config.uls.cmd,
    subCmd: config.uls.cashCmd
};

/**
 * cash 服务
 *
 * @param {*} ctx
 * @param {*} serviceId
 * @param {*} methodId
 * @returns
 */
function request(ctx ,serviceId , methodId) {
    
    monitor.report(504071);

    let {uid , webSig} = ctx.getWebSig();
    let ip = ctx.getRealIp();

    let logger = getLogger(config.uls.cmd , config.uls.cashCmd , uid , ip);

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
 *[获取账户列表]
 *
 * @param {*} ctx
 * @returns
 */
exports.getAccountListByGroup = async(ctx , marketId)=>{
    return request(ctx , 0x7019 , 0x102).get('user/account-group-list' , {market_id:marketId});
};