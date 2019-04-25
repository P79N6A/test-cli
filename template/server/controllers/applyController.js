'use strict';

const monitor = require('@futu/monitor');
const config = require('../config');

const cashService = require('../services/cashService');
const ipoService = require('../services/ipoService');
const tradePassword = require('@futu/trade-password');

const {isNeedHideHeader} = require('../utils/agent');

const { getLogger } = require('../utils');
const getDomain = require('../lib/domain');

const {STATUS_APPLY_ERROR , STATUS_ASSET_POWER_ERROR , STATUS_APPLY_STOCK_ERROR , STATUS_APPLY_STOCK_EXIST_ERROR} = require('../enums/status');

/** 
 * 
 属性ID及名称
ID: 511236    名称：认购页面访问量
ID: 511237    名称：获取账户和股票信息
ID: 511238    名称：获取账户和股票信息-成功
ID: 511239    名称：获取账户和股票信息-失败
ID: 511240    名称：获取购买力-成功
ID: 511241    名称：获取购买力-失败
ID: 511242    名称：提交新股认购
ID: 511243    名称：提交新股认购-成功
ID: 511244    名称：提交新股认购-失败
ID: 511245    名称：提交新股认购-交易密码-错误
ID: 511246    名称：修改新股认购
*/
/**
 *
 *ipo认购页面
 * @param {*} ctx
 * @param {*} user
 */
exports.render = async(ctx , isLogin)=>{
    let {code , stockCode} = ctx.request.query || '';
    if ( !code && !stockCode ){
        return await ctx.redirect('/list'); 
    }
    let domain = await getDomain(ctx.getRealHost());
    monitor.report(511236);
    return await ctx.render('apply' , {
        lang: config.lang[ctx.getLang()], 
        sideBarSec:'ipo' , 
        isLogin , 
        ipoFutu5Static: domain.futu5.IPO_FUTU5_STATIC,
        hideHeader: isNeedHideHeader(ctx.request.header['user-agent'])
    });
};
/** 
 * 获取账户列表
*/
exports.getApplyBaseInformation = async(ctx)=>{
    const logger = getLogger(config.uls.cmd , config.uls.ipoCmd , ctx.getWebSig().uid , ctx.getClientIp());
    monitor.report(511237);
    try{
        let {code , stockCode} = ctx.request.query || '';
        if ( !code && !stockCode){
            throw new Error('认购股票参数错误');
        }
        code = code || stockCode;
        //1.账户列表
        //2.股票信息
        //3.认购信息
        let [accountList , stockList] =  await Promise.all([cashService.getAccountListByGroup(ctx , 1) , ipoService.getNewStockList(ctx , code , 0 , 1 ,1)]);
        
        if ( !stockList || stockList.totalCount <= 0 ){
            throw new Error('认购股票参数错误');
        }
        
        accountList = accountList.HKEX_STOCK || [];
        let stockInfo = stockList.list[0] || {};
        let accounts = [];
        for ( let i = 0 ; i < accountList.length ; i++ ){
            accounts.push({
                accountId: accountList[i].account_id,
                isMargin: accountList[i].type === 'margin' ? true : false,
                accountDesc: accountList[i].card_desc + ' ' + accountList[i].card_number_protected,
                interestRate: accountList[i].type === 'margin' ? 6800 : 0
            });
        }

        let stock = {
            stockId : stockInfo.id, //股票id,
            stockCode: stockInfo.stockCode || '',
            stockDesc : '' + stockInfo.stockCode + ' ' + stockInfo.stockName, //股票描述

            isSupportMagrin : stockInfo.supportMargin,//是否支持融资
            isSupportZeroAsset : stockInfo.supportZeroAsset || 0 , //是否支持0本金认购
            isSupportHighPri : stockInfo.supportHighPri, //支持优先认购

            marginEndTime : stockInfo.marginEndTime * 1000, //融资认购结束时间
            marginUpdateEndTime : stockInfo.marginUpdateEndTime * 1000, //融资认购更改时间
            deductTime : stockInfo.deductTime * 1000 ,  
            publishTime : stockInfo.publishTime * 1000, 
            endTime : stockInfo.endTime * 1000, //认购结束时间
            highPriEndTime : (stockInfo.highPriEndTime || 0) * 1000,

            interest : stockInfo.marginInterest || 0, //融资利率
            isMarginDanger : (stockInfo.marginAmountUsage || 0) > 70 ? 1 : 0, //融资池紧张
            isHasMarginAvailableAmount : stockInfo.marginAvailableAmount ? 1 : 0,

            reserveRate : stockInfo.reserveRate || 0,
            marginInterest : stockInfo.marginInterest, //融资利率
            marginLeverage : Math.max(Math.floor(+stockInfo.marginLeverage) , 0) + 1,//融资杠杆
            
            marginApplyThresholdAmount : stockInfo.marginApplyThresholdAmount || 0, //融资一手门槛
            zeroAssetAccountId : stockInfo.zeroAssetAccountId || 0 , //0本金认购账户
            
            isHasZeroAssetAvailableAmount : stockInfo.zeroAssetAvailableAmount ? 1 : 0, //是否还有钱
            cashFee : 'cashFee' in stockInfo ? stockInfo.cashFee || 0 : 50000, //普通认购手续费
            marginFee : 'marginFee' in stockInfo ? stockInfo.marginFee || 0 : 100000
        };

        let detailList = stockInfo.applyList || [];
        let detail = false;
        for ( let i = 0 ; i < detailList.length ; i++ ){
            if ( !detailList[i].highPri ){
                detail = Object.assign({} , detailList[i] , {highPri:0});
                break;
            }
        }
        monitor.report(511238);
        logger.notice(`user get stock info : ${stockCode} , ${accounts.length} , ${typeof detail}`);
        return ctx.JsonResponse.success({accounts , stock , detail});
    }catch(err){
        logger.error(`user get ipo apply info error===> code: ${err.code} , message: ${err.message}`);
        monitor.report(511239);
        return ctx.JsonResponse.error(STATUS_APPLY_ERROR , ctx.i18n.__('获取认购信息失败，请稍后重试'));
    }
};
/** 
 * 获取购买力
*/
exports.getAssetPower = async (ctx)=>{
    const logger = getLogger(config.uls.cmd , config.uls.ipoCmd , ctx.getWebSig().uid , ctx.getClientIp());
    
    try{
        let query = ctx.request.query || {};

        let {stockId , tid , accountId , onlyUseCash , zeroAsset} = query;

        stockId = +stockId || 0;
        tid = +tid || 0;
        accountId = +accountId || 0;
        onlyUseCash = +onlyUseCash;
        zeroAsset = +zeroAsset || 0;
        
        if ( stockId <= 0 || !Number.isInteger(stockId) || !Number.isFinite(stockId) ){
            throw new Error('认购股票参数错误');
        }
        if ( accountId <= 0 || !Number.isInteger(accountId) || !Number.isFinite(accountId) ){
            throw new Error('认购账户参数错误');
        }
        if ( !Number.isInteger(tid) || !Number.isFinite(tid) ){
            throw new Error('认购任务参数错误');
        }
        if ( !Number.isInteger(onlyUseCash) || !Number.isFinite(onlyUseCash) ){
            throw new Error('认购只用现金参数错误');
        }
        if ( !Number.isInteger(zeroAsset) || !Number.isFinite(zeroAsset) ){
            throw new Error('认购0本金参数错误');
        }

        let assetPower = await ipoService.getAssetPower(ctx , accountId , stockId , tid , onlyUseCash , zeroAsset);
        logger.notice(`[getAssetPower] get assets success. ==>stock: ${stockId}`);
        monitor.report(511240);
        return ctx.JsonResponse.success(Object.assign({stockId , tid , accountId , onlyUseCash , zeroAsset} , assetPower));
    }catch(err){
        logger.error(`[assets] user get asset power error===> code: ${err.code} , message: ${err.message}`);
        monitor.report(511241);
        return ctx.JsonResponse.error(STATUS_ASSET_POWER_ERROR , ctx.i18n.__('获取购买力失败，请稍后重试'));
    }
};

/** 
 * 认购新股
*/
exports.applyStock = async (ctx)=>{
    const logger = getLogger(config.uls.cmd , config.uls.ipoCmd , ctx.getWebSig().uid , ctx.getClientIp());
    monitor.report(511242);
    try{
        let { 
            accountId, 
            isMarginIpo, 
            assetMargin, 
            buyAmount, 
            buyCount, 
            cashPart, 
            stockId, 
            zeroAsset, 
            tid, 
            password } = ctx.request.body || {};

        accountId = +accountId || 0;
        isMarginIpo = +isMarginIpo ? 1 : 0,
        assetMargin = +assetMargin || 0;
        buyAmount = +buyAmount || 0;
        buyCount = +buyCount || 0;
        cashPart = +cashPart || 0;
        stockId = +stockId || 0;
        zeroAsset = +zeroAsset ? 1 : 0;
        tid = +tid || 0;
        password = typeof password === 'string' ? password.trim() : '';
        
        if ( accountId <= 0 || !Number.isInteger(accountId) || !Number.isFinite(accountId) ){
            return ctx.JsonResponse.error(STATUS_APPLY_STOCK_ERROR , ctx.i18n.__('认购账户参数错误'));
        }
        if ( stockId <= 0 || !Number.isInteger(stockId) || !Number.isFinite(stockId) ){
            return ctx.JsonResponse.error(STATUS_APPLY_STOCK_ERROR , ctx.i18n.__('认购股票参数错误'));
        }
        if ( buyCount <= 0 || !Number.isInteger(buyCount) || !Number.isFinite(buyCount) ){
            return ctx.JsonResponse.error(STATUS_APPLY_STOCK_ERROR , ctx.i18n.__('认购数量参数错误'));
        }
        if ( buyAmount <= 0 || !Number.isInteger(buyAmount) || !Number.isFinite(buyAmount) ){
            return ctx.JsonResponse.error(STATUS_APPLY_STOCK_ERROR , ctx.i18n.__('认购金额参数错误'));
        }
        if ( cashPart <= 0 || !Number.isInteger(cashPart) || !Number.isFinite(cashPart) || cashPart > buyAmount ){
            return ctx.JsonResponse.error(STATUS_APPLY_STOCK_ERROR , ctx.i18n.__('认购现金参数错误'));
        }
        if ( assetMargin < 0 || !Number.isInteger(assetMargin) || !Number.isFinite(assetMargin) || assetMargin > cashPart ){
            return ctx.JsonResponse.error(STATUS_APPLY_STOCK_ERROR , ctx.i18n.__('认购现金参数错误'));
        }
        if ( isMarginIpo === 0 ){
            if ( cashPart !== buyAmount ){
                return ctx.JsonResponse.error(STATUS_APPLY_STOCK_ERROR , ctx.i18n.__('认购金额参数错误'));
            }
        }else {
            if ( cashPart > buyAmount ){
                return ctx.JsonResponse.error(STATUS_APPLY_STOCK_ERROR , ctx.i18n.__('认购金额参数错误'));
            }
        }
        if ( tid < 0 || !Number.isInteger(tid) || !Number.isFinite(tid) ){
            return ctx.JsonResponse.error(STATUS_APPLY_STOCK_ERROR , ctx.i18n.__('认购任务参数错误'));
        }
        if ( zeroAsset < 0 || !Number.isInteger(zeroAsset) || !Number.isFinite(zeroAsset) ){
            return ctx.JsonResponse.error(STATUS_APPLY_STOCK_ERROR , ctx.i18n.__('认购0本金参数错误'));
        }
        if ( !password ){
            return ctx.JsonResponse.error(STATUS_APPLY_STOCK_ERROR , ctx.i18n.__('交易密码不能为空'));
        }
        if ( zeroAsset && (!isMarginIpo || tid) ){
            return ctx.JsonResponse.error(STATUS_APPLY_STOCK_ERROR , ctx.i18n.__('认购0本金参数错误'));
        }

        let accountList = await cashService.getAccountListByGroup(ctx , 1);
        accountList = accountList.HKEX_STOCK || [];

        let account = false;
        for ( let i = 0 ; i < accountList.length ; i++ ){
            if ( accountId === accountList[i].account_id ){
                account = accountList[i];
                break;
            }
        }
        if ( !account ){
            logger.error('[apply] account not exist.');
            return ctx.JsonResponse.error(STATUS_APPLY_STOCK_ERROR , ctx.i18n.__('认购账户参数错误'));
        }

        //验证交易密码
        let tradePwdResult =  await tradePassword.verify(account , password);

        //交易密码错误
        if ( tradePwdResult.code !== 0 ){
            let message = ctx.i18n.__('交易密码校验有误');
            if ( tradePwdResult.code === tradePassword.NEED_SET_TRADE_PWD ){
                message = ctx.i18n.__('尚未设置过交易密码');
            }
            monitor.report(511245);
            logger.error(`[apply] trade password error: code : ${tradePwdResult.code} message: ${tradePwdResult.message}`);
            return ctx.JsonResponse.error(tradePwdResult.code , message);
        }

        let data = { 
            accountId, 
            isMarginIpo, 
            assetMargin, 
            buyAmount, 
            buyCount, 
            cashPart, 
            stockId, 
            zeroAsset, 
            taskId: tid
        };
        if ( tid ){
            monitor.report(511246);
        }
        monitor.report(511243);
        logger.notice(`[apply] user apply stock: ${stockId} , ${tid}`);
        return ctx.JsonResponse.success(await ipoService.applyStock(ctx , data));
    }catch(err){
        logger.error(`[apply] user apply stock error==> code: ${err.code}  , message: ${err.message}.`);
        monitor.report(511244);
        if ( +err.code === 3159 || +err.result === 3159 ){
            return ctx.JsonResponse.error(STATUS_APPLY_STOCK_EXIST_ERROR , ctx.i18n.__('已申购过此股票'));
        }
        return ctx.JsonResponse.error(STATUS_APPLY_STOCK_ERROR , err.message);
    }
};