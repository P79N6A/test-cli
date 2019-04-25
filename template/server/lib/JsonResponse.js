'use strict';
const config = require('../config');
const { getLogger } = require('../utils');

const { STATUS_SERVER_ERROR , STATUS_RESPONSE_ERROR } = require('../enums/status');

/**
 * Jin 2017-06-02 数据返回封装
 */
class JsonResponse {

    /**
     *Creates an instance of JsonResponse.
     * @param {*} ctx
     * @memberof JsonResponse
     */
    constructor(ctx) {
        this.ctx = ctx;
        this.logger = getLogger(config.uls.cmd , 0 , ctx.getWebSig().uid , ctx.getClientIp());
    }
    /**
     *
     *
     * @param {*} [data=[]]
     * @memberof JsonResponse
     */
    success(data = []) {
        this.ctx.set('Content-Type', 'application/json');
        this.ctx.body = {
            code: 0,
            message: this.ctx.i18n.__('成功'),
            data: data
        };
    }
    /**
     * [error 错误处理]
     * @param  {[type]} code    [description]
     * @param  {[type]} message [description]
     * @param  {Array}  data    [description]
     * @return {[type]}         [description]
     */
    error(code, message = '' , data = []) {
        this.ctx.set('Content-Type', 'application/json');
        if ( code instanceof Error ){ //代码错误
            try{
                if ( code.code ){
                    message = code.message;
                    code = code.code;
                }else{
                    message = code.message;
                    code = STATUS_SERVER_ERROR;
                }
            }catch(e){
                code = STATUS_RESPONSE_ERROR;
                message = this.ctx.i18n.__('服务器有点忙');
            }
        }else if ( typeof code === 'object' ){ //服务错误或者服务器返回错误
            try{
                message = code.message;
                code = code.code ? code.code : STATUS_SERVER_ERROR;
            }catch(e){
                code = STATUS_SERVER_ERROR;
                message = this.ctx.i18n.__('服务器有点忙');
            }
        }else if( typeof code === 'string' ){
            message = code;
            code = STATUS_RESPONSE_ERROR;
        }
        code = Number.isInteger(code) && code !== 0 ? code : STATUS_RESPONSE_ERROR;
        message = typeof message === 'string' ? message : this.ctx.i18n.__('服务器有点忙');
        this.logger.error(`[JsonResponse] throw error ===> code: ${code} , message: ${message}`);
        this.ctx.body = { code, message , data };
    }
}

module.exports = JsonResponse;
