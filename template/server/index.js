'use strict';
const Koa = require('koa');
const config = require('./config');
const middleware = require('./middleware');

let app =  new Koa();
app.proxy = true;

middleware(app, config);

app.listen(config.server.port , ()=>{
    console.log(`${new Date()} ===> ${config.app.domain} [${app.env}] listen ${config.server.port} ...`);
});

module.exports = app;
