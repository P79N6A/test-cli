const url = require('url');

const monitor = require('@futu/monitor');
const { getLogger } = require('../utils');

const config = require('../config');
const VerificationTicket = require('@futu/verification-ticket');
const {STATUS_NOT_LOGIN} = require('../enums/status');
const {getDomain} = require('@futu/render/domain');
/**
 *  验票
 *
 * @param {*} uid
 * @param {*} webSig
 * @param {string} [domain='futu5.com']
 * @returns
 */
async function checkTicket(uid , webSig , domain = 'futu5.com'){
    let logger = getLogger(config.uls.cmd , config.uls.verifyCmd , uid);
    if ( Number.isFinite(uid) && Number.isInteger(uid) && uid > 0 && webSig){
        let verificationTicket = new VerificationTicket();
        let data = await verificationTicket.webSig(uid, decodeURIComponent(webSig) , domain);
        if ( data.code === 0 ){
            logger.notice('[checkTicket] is login.');
            return Promise.resolve(true);
        }
        logger.error('[checkTicket] throw error.' + data.message);
    }
    logger.error('[checkTicket] throw error......');
    return Promise.reject(false);
}

/**
 *
 *验票中间件
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
exports.ticketVerify = async(ctx , next)=>{
    let {uid , webSig} = ctx.getWebSig();
    let logger = getLogger(config.uls.cmd , config.uls.verifyCmd , uid , ctx.getClientIp());
    monitor.report(504053);
    logger.notice('[ticketVerify] verify domain: ' + ctx.getRealHost());
    try{
        let result = await checkTicket(uid , webSig , ctx.getRealHost());
        if ( result ){
            monitor.report(504054);
            logger.notice('[ticketVerify] verify is allowed... ===> next');
            return await next();
        }
        logger.error('[ticketVerify] verify is not allowed...');
        throw new Error('未登录');
    }catch(err){
        monitor.report(504055);
        logger.error('[ticketVerify] verify throw error...' + JSON.stringify(err));
        return ctx.JsonResponse.error(STATUS_NOT_LOGIN , ctx.i18n.__('未登录'));
    }
};

/**
 * 查看登录状态
 *
 * @param {*} callback
 * @param {boolean} [isNeedLogin=true]
 * @returns
 */
exports.checkRenderIsLogin = (callback , isNeedLogin = true)=>{
    return async(ctx , next)=>{
        let isLogin = false;
        let {uid , webSig} = ctx.getWebSig();

        let logger = getLogger(config.uls.cmd , config.uls.verifyCmd , uid , ctx.getClientIp());

        monitor.report(504059);
        logger.notice('[checkRenderIsLogin] visit page.');
        try{
            let result = await checkTicket(uid , webSig , ctx.getRealHost());
            isLogin = result ? true : false;
            monitor.report(504060);
        }catch(err){
            monitor.report(504061);
            logger.error('[checkRenderIsLogin] checkTicket throw error. ' + JSON.stringify(err));
        }

        logger.notice('[checkRenderIsLogin] you visit host =======>' + ctx.getRealHost());

        logger.notice('[checkRenderIsLogin] is login now.... ' + isNeedLogin + ' : ' + isLogin);

        let returnUrl = '';
        try{
            let href = new url.URL(url.resolve(ctx.getHomeUrl() , ctx.request.url));
            returnUrl = url.resolve(ctx.getHomeUrl() , href.pathname);
        }catch(e){
            returnUrl = ctx.getHomeUrl();
        }

        try{
            logger.notice('[checkRenderIsLogin] return url is  ...==> ' + returnUrl);
            let domain = await getDomain(ctx.getRealHost());
            return isNeedLogin && !isLogin ? await ctx.redirect('//' + domain.futu5.PASSPORT_FUTU5 + '?target=' + encodeURIComponent(returnUrl)) : await callback(ctx , isLogin , next);
        }catch(err){
            monitor.report(504063);
            console.log(err);
            logger.error('[checkRenderIsLogin] router render error. ' + JSON.stringify(err));
            return await ctx.render('500' , {} , {forbidden:true , domain:true});
        }
    };
};
