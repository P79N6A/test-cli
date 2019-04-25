'use strict';

const monitor = require('@futu/monitor');
const config = require('../config');

const {isNeedHideHeader} = require('../utils/agent');

const cashService = require('../services/cashService');
const ipoService = require('../services/ipoService');

const { getLogger } = require('../utils');
const getDomain = require('../lib/domain');

const {STATUS_HISTORY_ERROR , STATUS_HISTORY_CANCEL_ERROR} = require('../enums/status');
/**
 *
 *ipo历史记录页面
 * @param {*} ctx
 * @param {*} user
 */
exports.render = async(ctx , isLogin)=>{
    monitor.report(504064);
    let domain = await getDomain(ctx.getRealHost());
    await ctx.render('history' , {
        lang: config.lang[ctx.getLang()], 
        sideBarSec:'history-stock' , 
        isLogin , 
        ipoFutu5Static: domain.futu5.IPO_FUTU5_STATIC,
        hideHeader: isNeedHideHeader(ctx.request.header['user-agent'])
    });
};

/**
 *获取历史记录
 *
 * @param {*} ctx
 * @returns
 */
exports.getIPOHistoryList = async(ctx)=>{
    monitor.report(504065);
    const logger = getLogger(config.uls.cmd , config.uls.ipoCmd , ctx.getWebSig().uid , ctx.getClientIp());
    try{
        let page = +ctx.request.query.page || 1;

        logger.notice(`user want get ipo history list . page : ${ctx.request.query.page}`);

        if ( page <= 0 || !Number.isInteger(page) || !Number.isFinite(page) ){
            logger.notice(`user want get ipo history list . page is ${page}`);
            page = 1;
        }

        let result = await Promise.all([ipoService.getIPOHistoryList(ctx , page , 15) , cashService.getAccountListByGroup(ctx , 1)]);

        let historyData = result[0];
        let accountList = result[1].HKEX_STOCK || [];

        let accountListMap = {};
        
        accountList.forEach((accout)=>{
            accountListMap[accout.account_id] = {
                cardNumber: accout.card_number_protected,
                accountType: accout.type
            };
        });

        for ( let i = 0 ; i < historyData.list.length ; i++ ){
            historyData.list[i].cardNumber = accountListMap[historyData.list[i].accountId].cardNumber || '';
            historyData.list[i].accountType = accountListMap[historyData.list[i].accountId].accountType || '';
        }
        logger.notice(`user get ipo history list success . page is ${page}`);
        monitor.report(504066);
        return ctx.JsonResponse.success(historyData);
    }catch(err){
        logger.error(`user get ipo history list error: ${err.message}`);
        monitor.report(504067);
        return ctx.JsonResponse.error(STATUS_HISTORY_ERROR , ctx.i18n.__('获取历史记录失败'));
    }
};

/**
 *撤销任务
 *
 * @param {*} ctx
 * @returns
 */
exports.cancelIPOTask = async(ctx)=>{
    monitor.report(504068);
    const logger = getLogger(config.uls.cmd , config.uls.ipoCmd , ctx.getWebSig().uid , ctx.getClientIp());
    try{
        let id = +ctx.request.body.id || 0;
        logger.notice(`user want cancel task . id : ${ctx.request.query.id}`);
        if ( id <= 0 || !Number.isInteger(id) || !Number.isFinite(id) ){
            throw Error('任务ID参数错误');
        }
        monitor.report(504069);
        logger.notice(`user cancel task success . id : ${id}`);
        return ctx.JsonResponse.success(await ipoService.cancelTask(ctx , id));
    }catch(err){
        logger.error(`user cancel ipo task error: ${err.message}`);
        monitor.report(504070);
        return ctx.JsonResponse.error(STATUS_HISTORY_CANCEL_ERROR , ctx.i18n.__('撤销任务失败'));
    }
};