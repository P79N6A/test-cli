'use strict';
/* global process , __dirname*/
const path = require('path');

//设置环境变量
const rootPath = process.env.PM2_ROOT_PATH || __dirname;
const rootPathObj = path.parse(rootPath);

//pm2配置文件
module.exports = {
    apps: [{
        name: rootPathObj.base,
        script: path.join(rootPath, 'server/index.js'),
        cwd: rootPath,
        instances: 2,
        watch: false,
        env: {
            'NODE_ENV': 'production',
            'localLevel': 3,
            'netLevel': 5,
            'ulsAppId': 4163
        },
        exec_mode: 'cluster',
        max_memory_restart: '2G',
        //日志地址
        error_file: `/data/var/nodejs/log/${rootPathObj.base}_error.log`,
        out_file: `/data/var/nodejs/log/${rootPathObj.base}_access.log`,
        log_date_format:'YYYY-MM-DD HH:mm:ss.SSSZ',
        listen_timeout: 10000,
        kill_timeout: 10000,
        restart_delay: 20000, //异常情况
        max_restarts: 10
    }]
};
