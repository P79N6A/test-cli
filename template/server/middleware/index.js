'use strict';

/*global process*/

const json = require('koa-json');
const serve = require('koa-static');
const logger = require('koa-logger');
const koaOnError = require('koa-onerror');
// const session = require('koa-session');
const koaBody = require('koa-body');
const views = require('@futu/render');
const locale = require('koa-locale');
const i18n = require('koa-i18n');

// const RedisStore = require('../utils/redisStore');
const {baseContext} = require('./baseContext');
const {i18nCookie} = require('./i18nCookie');
const routers = require('../routes');
const { getLogger } = require('../utils');
const getDomain = require('../lib/domain');

module.exports = function (app, config) {

    //response
    app.use(json());

    //给ctx添加方法
    app.use(baseContext);

    //session
    // app.keys = ['futunn-keys', 'futu5-keys'];
    // config.session.store = new RedisStore(config.redis);
    // app.use(session(config.session , app));

    //设置i18 cookie
    app.use(i18nCookie);
    // logger
    app.use(logger());

    //静态文件z
    app.use(serve(config.staticDir.root,config.staticDir.options));

    //模版文件
    app.use(views(config.template.path, config.template.options, Object.assign(config.render , {
        modes: function(){
            return this.getWebSig();
        }
    })));
    //i18n
    locale(app);
    app.use(i18n(app, {
        directory: config.i18n.directory,
        locales: config.i18n.locales, // default Locale
        modes: [function(){
            return this.getLang();
        } , 'cookie']
    }));
    //解析body
    app.use(koaBody());

    //路由
    routers(app);

    // 500 error
    koaOnError(app, { template: config.template.path + '/500.html' });

    // 404
    app.use(async function(ctx) {
        ctx.status = 404;
        getLogger(config.uls.cmd).error('[app] render 404...');
        let domain = await getDomain(ctx.getRealHost());
        return await ctx.render('404' , {
            lang:config.lang[ctx.getLang()] ,
            ipoFutu5Static: domain.futu5.IPO_FUTU5_STATIC,
        } , {forbidden:true , domain:true});
    });

    //程序错误
    process.on('uncaughtException', function(err) {
        getLogger(config.uls.cmd).error('[app] uncaughtException : Error caught in uncaughtException event: ' + JSON.stringify(err));
    });
};
