const config = require('../config');
/**
 *多语言设置
 *
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
exports.i18nCookie = async(ctx , next)=>{
    let locale = ctx.cookies.get(config.i18n.cookie);
    if ( locale === ctx.getLang() ){
        return await next();
    }
    ctx.cookies.set(config.i18n.cookie , ctx.getLang() ,{path: '/', domain: ctx.getRealHost()});
    return await next();
};