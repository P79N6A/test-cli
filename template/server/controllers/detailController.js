'use strict';

const monitor = require('@futu/monitor');
const config = require('../config');

const {isNeedHideHeader} = require('../utils/agent');

const cashService = require('../services/cashService');
const ipoService = require('../services/ipoService');

const { getLogger } = require('../utils');
const getDomain = require('../lib/domain');

const {STATUS_DETAIL_ERROR} = require('../enums/status');
/**
 *
 *ipo历史记录页面
 * @param {*} ctx
 * @param {*} user
 */
exports.render = async(ctx , isLogin)=>{
    let tid = +ctx.request.query.tid || 0;
    let stockCode = ctx.request.query.stockCode || '';
    // 兼容牛牛客户端不带tid请求
    if (tid < 0 || !Number.isInteger(tid) || !Number.isFinite(tid) ){
        return await ctx.redirect('/history');
    }
    if ( +stockCode <= 0 || !Number.isInteger(+stockCode) || !Number.isFinite(+stockCode) ){
        return await ctx.redirect('/history');
    }
    let domain = await getDomain(ctx.getRealHost());
    const logger = getLogger(config.uls.cmd , config.uls.ipoCmd , ctx.getWebSig().uid , ctx.getClientIp());
    try{
        let detail = await ipoService.getIPODetail(ctx , tid , stockCode);
        // 没有认购记录，跳转帮助
        if ( !detail || (Array.isArray(detail) && detail.length < 1) ) {
            return await ctx.redirect(`//${domain.futu5.HELP_FUTU5}/faq/topic2303`);
        }
    }catch(err){
        logger.error(`[render] user get ipo error: ${err.message}`);
    }
    monitor.report(506457);
    return await ctx.render('detail' , {
        lang: config.lang[ctx.getLang()], 
        sideBarSec:'history-stock' , 
        isLogin , 
        ipoFutu5Static: domain.futu5.IPO_FUTU5_STATIC,
        hideHeader: isNeedHideHeader(ctx.request.header['user-agent'])
    });
};

/**
 *获取任务详情
 *
 * @param {*} ctx
 * @returns
 */
exports.getIPODetail = async(ctx)=>{
    monitor.report(506458);
    const logger = getLogger(config.uls.cmd , config.uls.ipoCmd , ctx.getWebSig().uid , ctx.getClientIp());
    try{
        let tid = +ctx.request.query.tid || 0;
        let stockCode = ctx.request.query.stockCode || '';
        // 兼容牛牛客户端不带tid请求
        if (tid < 0 || !Number.isInteger(tid) || !Number.isFinite(tid) ){
            throw Error('任务ID参数错误');
        }
        if ( +stockCode <= 0 || !Number.isInteger(+stockCode) || !Number.isFinite(+stockCode) ){
            throw Error('股票Code错误');
        }
        let result = await Promise.all([ipoService.getIPODetail(ctx , tid , stockCode) , cashService.getAccountListByGroup(ctx , 1)]);
        let detail = result[0];

        let hkAccountList = result[1].HKEX_STOCK || [];
        for ( var i = 0 ; i < hkAccountList.length ; i++ ){
            if ( +hkAccountList[i].account_id === +detail.accountId ){
                detail.accountDesc = hkAccountList[i].card_desc + ' ' + hkAccountList[i].card_number_protected;
                break;
            }
        }
        monitor.report(506459);
        return ctx.JsonResponse.success(detail);
    }catch(err){
        logger.error(`user get ipo detail error: ${err.message}`);
        monitor.report(506460);
        return ctx.JsonResponse.error(STATUS_DETAIL_ERROR , ctx.i18n.__('获取任务详情失败'));
    }
};