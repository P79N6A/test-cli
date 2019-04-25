// eslint-disable-next-line valid-jsdoc
/**
 *
 *[统一接口层headers]
 * @param {*} headers
 * @returns
 */
exports.cmlbHeaders = (headers)=>{
    return {
        'x-futu-client-type': headers.type,
        'x-futu-client-appid': headers.appId,
        'x-futu-client-serviceid' : headers.serviceid,
        'x-futu-client-time': Math.floor(Date.now() / 1000),
        'x-futu-client-nnid': headers.uid,
        'x-futu-client-sig':headers.websig,
        'x-futu-client-sigtype': headers.sigtype || 2,
        'x-futu-client-ip': headers.ip,
        'x-futu-client-domain': headers.domain || 'futu5.com',
        'x-futu-client-lang': headers.lang,
        'x-futu-client-methodid': headers.methodid
    }; 
};