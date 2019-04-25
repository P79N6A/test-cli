/* eslint-disable require-jsdoc */
'use strict';

const url = require('url');
const rp = require('request-promise-native');
const { getEndpoint, getLogger, getProtected } = require('../utils');
const { STATUS_TIMEOUT, STATUS_ERROR } = require('../enums/status');

/**
 * Jin 2017-07-25 请求对象
 */
class Request {
    /**
     * [constructor 请求对象]
     * @param  {[type]} headers [请求头]
     * @param  {[type]} service [服务对象]
     * @return {[type]}         [description]
     */
    constructor(service , headers) {
        this.headers = Object.assign({ 'User-Agent': 'node-request', 'Content-Type': 'application/json' }, headers);
        this.service = service;
    }
    /**
     * [get 获取数据]
     * @param  {[type]} actUrl [description]
     * @param  {Object} query  [description]
     * @return {[type]}        [description]
     */
    async get(actUrl, query = {}) {
        this.service.logger.notice(`request get now. ${actUrl}`);
        let options = {
            uri: await this.service.getRequestUrl(actUrl),//获取请求链接
            qs: query,
            headers: this.headers,
            resolveWithFullResponse: true,
            json: true,
            timeout: 5 * 1000 //5s
        };
        return await rp(options).then(this.getResponse.bind(this) , this.handleError.bind(this));
    }
    /**
     * [post 提交数据]
     * @param  {[type]} actUrl [description]
     * @param  {Object} data   [description]
     * @return {[type]}        [description]
     */
    async post(actUrl, data = {}) {
        this.service.logger.notice(`request post now. ${actUrl}`);
        let options = {
            method: 'POST',
            uri: await this.service.getRequestUrl(actUrl),
            body: data,
            headers: this.headers,
            resolveWithFullResponse: true,
            json: true
        };
        return await rp(options).then(this.getResponse.bind(this) , this.handleError.bind(this));
    }
    /**
     * [handleError 捕获错误]
     * @param  {[type]} error [description]
     * @return {[type]}       [description]
     */
    handleError(error) {
        this.service.logger.error(`request promise was error. ${error}`);
        if (error.cause && error.cause.code === 'ESOCKETTIMEDOUT') {
            error = new Error('请求服务器超时');
            error.code = STATUS_TIMEOUT;
        } else {
            error = new Error(error.message ? error.message : '请求服务器出错');
            error.code = STATUS_ERROR;
        }
        this.service.logger.error(` request throw error: ${typeof error === 'object' ? JSON.stringify(error) : error}.`);
        return Promise.reject(error);
    }

    /**
     * [getResponse 200状态返回数据校验]
     * @param  {[type]} response [description]
     * @return {[type]}          [description]
     */
    getResponse(response){
        if (+response.statusCode === 200) { //接入层返回成功
            let result = false;
            try {
                if ( 'code' in response.body || 'result' in response.body ) { //看看有木有数据
                    result = true;
                }
            } catch (e) {
                result = false;
            }
            //接入层返回空
            if (!result) {
                console.log('=====> no body response header: ' , response.headers['x-futu-result']);
                this.service.logger.error(`server face success . but no body. response.message: ${response.headers['x-futu-result']} : ${response.headers['x-futu-resultmsg']}`);
                if ( +response.headers['x-futu-result'] === -10001 ){
                    return Promise.reject(new Error('没有权限访问'));
                }
                return Promise.reject(new Error('服务返回body数据为空'));
            }
            //有数据
            response = response.body;
            if (+response.code === 0 || +response.result === 0 ) {
                this.service.logger.notice('server request success.');
                return Promise.resolve(response.data);
                
            }
            this.service.logger.error(`server request error . throw error: ${JSON.stringify(response)} ,code: ${response.code} , result: ${response.result} , message:${response.message || response.ret_msg}`);
            return Promise.reject(response);
        }
        //接入层错误
        this.service.logger.error(`server face error . throw error: ${JSON.stringify(response)}`);
        return Promise.reject(new Error('无法连接到服务'));
    }
}

/**
 * Jin 2017-06-02 请求后端服务封装
 * eq:
 *
 *  let service = new ServiceRequest({cmlbId , isDev});
 *  let request = service.getRequest(headers);
 *
 *  request.get('/test');
 *  request.post('/test');
 */

const DEF_SERVICE_REQUEST_OPTIONS = {
    isDev : 0,
    defaultIp : '0.0.0.0',
    defaultPort : '80',
    protocol : 'http',
    cache : false,
    cmd : 0,
    subCmd : 0,
    uid: 0,
    clientIp: '0.0.0.0'
};

class ServiceRequest {
    /**
     *Creates an instance of ServiceRequest.
     * @param {*} [options=DEF_SERVICE_REQUEST_OPTIONS]
     * @memberof ServiceRequest
     */
    constructor(options = DEF_SERVICE_REQUEST_OPTIONS) { //cmlbId, isDev = 0, defaultIp = '0.0.0.0', defaultPort = '80', protocol = 'http', cache = false
        options = Object.assign({} , DEF_SERVICE_REQUEST_OPTIONS , options);
        if ( !options.cmlbId ){
            throw new Error('[ServiceRequest] cmlbId is fail.');
        }
        this.cmlbId = options.cmlbId;
        this.isDev = options.isDev;
        this.ip = options.defaultIp;
        this.port = options.defaultPort;
        this.protocol = options.protocol;
        this.cache = !!options.cache;
        this.cmd = options.cmd ;
        this.subCmd = options.subCmd;
        this.uid = options.uid;
        this.logger = getLogger(options.cmd, options.subCmd , options.uid , options.clientIp);
    }
    /**
     * [getAddress 获取ip,port]
     * @return {[type]} [address]
     */
    async getAddress() {
        if (this.ip && this.port && this.cache) {
            this.logger.notice(`get cmlb from cache: ${getProtected(this.ip)}`);
            return { ip: this.ip, port: this.port };
        }
        //获取服务接入ip和端口
        let address = await getEndpoint(this.cmlbId, this.isDev);
        if (this.ip && this.port && this.cache) { //已经设置过
            return { ip: this.ip, port: this.port };
        }
        this.ip = address.ip;
        this.port = address.port;
        this.logger.notice(`get cmlb success: ${getProtected(this.ip)}`);
        return address;
    }
    /**
     * [getRequestUrl 获取请求链接]
     * @param  {[type]} actUrl [请求的url]
     * @return {[type]}        [url]
     */
    async getRequestUrl(actUrl = '') {
        let address = await this.getAddress();
        let baseUrl = `${this.protocol}://${address.ip}:${address.port}`;
        this.logger.notice(`get request address now. address.ip = ${getProtected(address.ip)}`);
        try {
            baseUrl = url.resolve(baseUrl, actUrl);
        } catch (e) {
            baseUrl = baseUrl + actUrl;
            this.logger.warn(`get request url error: ${e}`);
        }
        return baseUrl;
    }
    /**
     * [getRequest 获取请求对象]
     * @param  {Object} headers [description]
     * @return {[type]}         [description]
     */
    getRequest(headers = {}) {
        this.logger.notice('ServiceRequest get request now.');
        return new Request(this , headers);
    }
}

module.exports = ServiceRequest;
