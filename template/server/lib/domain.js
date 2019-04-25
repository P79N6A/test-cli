/*global process */
const {getDomain} = require('@futu/render/domain');

/** 
 * 获取host
*/
module.exports = async(host)=>{
    let domain = await getDomain(host);
    let ipoFutu5Static = process.env.NODE_ENV === 'production' ? domain.futu5.STATIC_FUTUNN + '/futu5/ipo' : domain.futu5.IPO_FUTU5;

    domain.futu5.IPO_FUTU5_STATIC = ipoFutu5Static;
    return domain;
};