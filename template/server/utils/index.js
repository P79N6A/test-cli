'use strict';

const uls = require('@futu/node-uls');
const cmlb = require('@futu/node-cmlb');

/**
 * [获取服务器ip]
 * @param  {[type]} appId [description]
 * @param  {Number} isDev [description]
 * @return {[type]}       [description]
 */
exports.getEndpoint = async (appId, isDev = 0) => {
    let address = await cmlb.getAddress(appId, isDev);
    if ( !address.ip || !address.port ){
        throw new Error('getEndpoint : get base cmlb error , possible you not open it sys.');
    }
    return address;
};
/**
 * [getLogger 获取日志打印对象]
 * @param  {Number} cmd    [description]
 * @param  {Number} subCmd [description]
 * @param  {Number} uid    [description]
 * @param  {String} ip     [description]
 * @return {[type]}        [description]
 */
exports.getLogger = function ( cmd = 0, subCmd = 0, uid = 0, ip = '0.0.0.0') {
    return uls.getLogger(cmd, subCmd, uid, ip);
};
/**
 * [getProtected 敏感信息过滤]
 * @param  {[type]} str  [description]
 * @param  {[type]} code [description]
 * @return {[type]}      [description]
 */
exports.getProtected = function( str , code ){
    if ( typeof str !== 'string' ){
        str = '' + str;
    }
    code = code ? '' + code : '***';
    if ( str.length === 1 ){
        return str + code;
    }
    if ( str.length === 2 || str.length === 3 ){
        return str[0] + code + str[1];
    }
    if ( str.length === 4 ) {
        return str[0] + code + str[3];
    }
    if ( str.length <= 8 ){
        return str[0] + str[1] + code + str[str.length - 2] + str[str.length - 1];
    }
    if ( str.length <= 16 ){
        return str.slice(0 , 3) + code + str.slice(str.length - 3 , str.length);
    }
    return str.slice(0 , 5) + code + str.slice(str.length - 5 , str.length);
};
