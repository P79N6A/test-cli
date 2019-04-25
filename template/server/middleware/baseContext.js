'use strict';

const config = require('../config');
const JsonResponse = require('../lib/JsonResponse');
const {getLocation} = require('../lib/ipip-datx');
/**
 * [getHomeUrl 获取首页地址]
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
function getHomeUrl(ctx){
    return ()=>{
        // return `${ctx.protocol}://${ctx.host}`;
        return `https://${ctx.host}`;
    };
}
/**
 * [getRealIp 获取IP]
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
function getRealIp(ctx){
    let headers = ctx.headers;
    //配置在nginx里面
    let realIp = headers['remote-host'];
    if ( !realIp && headers['x-real-ip']) {
        realIp = headers['x-real-ip'];
    }
    if ( !realIp && headers['x-forwarded-for']) {
        let ipoList = (headers['x-forwarded-for'] || '').split(',');
        realIp = ipoList[ipoList.length - 1];
    }
    return ()=>{
        return realIp;
    };
}
/**
 * getclientip
 *
 * @param {*} ctx
 * @returns
 */
function getClientIp(ctx){
    let headers = ctx.headers;
    //配置在nginx里面
    let clientIp = '';
    if ( headers['x-forwarded-for']) {
        clientIp = (headers['x-forwarded-for'] || '').split(',')[0];
    }
    if ( !clientIp && headers['x-real-ip']) {
        clientIp = headers['x-real-ip'];
    }
    if ( !clientIp ){
        clientIp = headers['remote-host'] || '127.0.0.1';
    }
    return ()=>{
        return clientIp;
    };
}
/**
 * [removeCookie 删除cookie]
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
function removeCookie(ctx){
    let domain = '.' + getRealHost(ctx)();
    return (name, opts = {})=>{
        if ( !name ) {
            return;
        }    
        opts = Object.assign({expires: new Date(1), path: '/', domain: domain}, opts);
        ctx.cookies.set(name, '', opts);
    };
}

/**
 *futu5 双域名支持
 *
 * @param {*} ctx
 * @returns
 */
function getRealHost(ctx){
    let domain = /(^|(\w+\.))futunn.com$/img.test(ctx.host) ? 'futunn.com' : 'futu5.com';
    return ()=>{
        return domain;
    };
}

/**
 *获取语言
 *
 * @param {*} ctx
 * @returns
 */
function getLang(ctx){
    let lang = '';
    try{
        let userAgent = ctx.request.header['user-agent'];
        //nn客户端
        let langArr = userAgent.match(/CliLang\/(\w*-\w*)/i);
        lang = langArr ? langArr[1] : '';
    }catch(err){
        console.log('[getLang] user agent...... ' + err);
    }

    //没有 ， ip归属地查询
    if ( !lang && !(lang.toLowerCase() in config.lang) ){
        lang = getLocation(getClientIp(ctx)()) || '';
    }

    if ( !lang && !(lang.toLowerCase() in config.lang) ){
        lang = 'zh-cn';
    }
    return ()=>{
        return lang;   
    };
}
/**
 *获取鉴权参数
 *
 * @param {*} ctx
 * @returns
 */
function getWebSig(ctx){
    let uid = +ctx.cookies.get('uid');
    let webSig = ctx.cookies.get('web_sig');

    if ( !Number.isFinite(uid) || !Number.isInteger(uid) || uid <= 0 ){
        uid = 0;
    }
    if ( typeof webSig !== 'string' ){
        webSig = '';
    }
    return ()=>{
        return {uid , webSig};
    };
}

/**
 *
 *
 * @param {*} ctx
 * @param {*} next
 */
exports.baseContext = async(ctx, next)=>{
    //删除cookie
    ctx.cookies.remove = removeCookie(ctx);
    //获取首页地址
    ctx.getHomeUrl = getHomeUrl(ctx);
    //获取服务IP
    ctx.getRealIp = getRealIp(ctx);
    //获取客户端请求IP
    ctx.getClientIp = getClientIp(ctx);
    //获取host
    ctx.getRealHost = getRealHost(ctx);
    //获取语言
    ctx.getLang = getLang(ctx);
    //鉴权
    ctx.getWebSig = getWebSig(ctx);
    //处理json格式输出
    ctx.JsonResponse = new JsonResponse(ctx);
    await next();
};
