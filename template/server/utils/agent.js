/* eslint-disable valid-jsdoc */
/**
  是否是牛牛客户端
*/
function isNN(userAgent){
    return userAgent.match(/futunn/i) ? true : false;
}
exports.isNN = isNN;
/**
 * 判断是否是手机QQ的webview
 * @return bool
 */
function isMobileQQAgent(userAgent) {
    return userAgent.match(/(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d\.]+)/i) || userAgent.match(/\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/i);
}
exports.isMobileQQAgent = isMobileQQAgent;
/**
   futu token
*/
function isFutuToken(userAgent) {
    return userAgent.match(/fututoken/i) ? true : false;
}
exports.isFutuToken = isFutuToken;
/**
 *是否需要隐藏头部
 *
 * @param {*} userAgent
 * @returns
 */
exports.isNeedHideHeader = function isNeedHideHeader(userAgent) {
    return isNN(userAgent) || isMobileQQAgent(userAgent) || isFutuToken(userAgent);
};