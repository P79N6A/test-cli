/* eslint-disable guard-for-in */
'use strict';

const monitor = require('@futu/monitor');
const config = require('../config');

const {isNeedHideHeader} = require('../utils/agent');
const ipoService = require('../services/ipoService');

const { getLogger } = require('../utils');
const getDomain = require('../lib/domain');

const {STATUS_LIST_ERROR} = require('../enums/status');
/**
 *
 *ipo历史记录页面
 * @param {*} ctx
 * @param {*} user
 */
exports.render = async(ctx , isLogin)=>{
    monitor.report(511761);
    let domain = await getDomain(ctx.getRealHost());
    return await ctx.render('list' , {
        lang: config.lang[ctx.getLang()], 
        sideBarSec:'ipo' , 
        isLogin , 
        ipoFutu5Static: domain.futu5.IPO_FUTU5_STATIC,
        hideHeader: isNeedHideHeader(ctx.request.header['user-agent'])
    });
};

/**
 *获取新股列表
 *
 * @param {*} ctx
 * @returns
 */
exports.getIPOList = async(ctx)=>{
    monitor.report(510689);
    const logger = getLogger(config.uls.cmd , config.uls.ipoCmd , ctx.getWebSig().uid , ctx.getClientIp());
    try{
        // 这里stockCode为空
        let stockCode = '';
        let result = await ipoService.getNewStockList(ctx , stockCode, 0 , 1, 1000);
        let list = result['list'] || [];
        if (list && list.length) {
            for (let key in list) {
                let newStock = list[key];
                let applyDetail;
                if (newStock['applyList']) {
                    // 优先认购去除，这里不明确applyList这个数组元素是否只有一个，先这样处理。
                    let applyList = newStock['applyList'];
                    for (let idx in applyList) {
                        if(applyList['highPri'] === 1){
                            continue;
                        }else{
                            // 取第一个不是优先认购的元素
                            applyDetail = applyList[idx];
                            break;
                        }
                    }
                }
                if (applyDetail) {
                    // 只取部分属性
                    applyDetail = {
                        status: applyDetail.status,
                        type: applyDetail.type,
                        zeroAsset: applyDetail.zeroAsset,
                        tid: applyDetail.tid,
                        marginPart: applyDetail.marginPart
                    };
                }
                let originObj = Object.assign({}, list[key]);
                // 保证只取有用的部分
                list[key] = {
                    supportMargin: originObj.supportMargin,
                    endTime: originObj.endTime,
                    publishTime: originObj.publishTime,
                    boardTime: originObj.boardTime,
                    marginEndTime: originObj.marginEndTime,
                    companyInfo: originObj.companyInfo,
                    marginUpdateEndTime: originObj.marginUpdateEndTime,
                    id: originObj.id,
                    lotSize: originObj.lotSize,
                    admission: originObj.admission,
                    prospectusUrl: originObj.prospectusUrl,
                    stockCode: originObj.stockCode,
                    stockName: originObj.stockName,
                    marginLeverage: originObj.marginLeverage,
                    price: originObj.price,
                    applyDetail: applyDetail
                };
            }
        }

        monitor.report(510690);
        return ctx.JsonResponse.success(list);
    }catch(err){
        logger.error(`user get ipo list error: ${err.message}`);
        monitor.report(510691);
        return ctx.JsonResponse.error(STATUS_LIST_ERROR , ctx.i18n.__('获取新股列表失败'));
    }
};