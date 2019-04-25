/**
 * [检查返回结果]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
let checkResponse = (response)=>{
    if ( response && +response.code === 0 ){
        console.log('[checkResponse] get response success.' , response);
        return Promise.resolve(response.data);
    }
    console.error('[checkResponse] get response error.' , response);
    return Promise.reject(response);
};
/**
 * [查看错误]
 * @param  {[type]} error [description]
 * @return {[type]}       [description]
 */
let handlerError = (error)=>{
    console.error('[handlerError] request error.' , error);
    if ( error.request ){
        return Promise.reject(error.request);
    }else if( error.response ){
        return Promise.reject(error.response);
    }
    return Promise.reject(error);
};

export {checkResponse , handlerError};