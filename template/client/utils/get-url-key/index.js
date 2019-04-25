
/**
 * [getUrlKey 获取url的query]
 * @param  {[type]} key [description]
 * @return {[type]}     [description]
 */
function getUrlKey(key){
    var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)');
    var result = window.location.search.substr(1).match(reg);
    console.log('result:' , result , window.location.search.substr(1));
    return result ? decodeURIComponent(result[2]) : null;
}

export default getUrlKey;