'use strict';
/*global process */
let appEnv = process.env.NODE_ENV;

if(appEnv === undefined || appEnv === ''){
    appEnv = 'development';
}

let envTest = process.env.NODE_TEST;
let envConfig = 'development';

if ( appEnv === 'development' ){
    if ( envTest ){
        envConfig = 'test';
    }
}else{
    envConfig = 'production';
}

module.exports = require('./' + envConfig);

module.exports.isDevEnv = appEnv === 'production' ? 0 : 1;
