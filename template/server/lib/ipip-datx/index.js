/*global __dirname */
const path = require('path');
const datx = require('ipip-datx');

const datxFile = path.resolve(__dirname, './ipip.datx');
const city = new datx.City(datxFile);

/**
 *获取ip归属地
 *
 * @param {*} ip
 * @returns
 */
function getLocation(ip) {
    const locale = city.findSync(ip);
    if ( ['本机地址' , '局域网' , '中国'].includes(locale[0]) ) {
        if ( locale[1] && locale[1] === '香港' || locale[1] === '台湾' || locale[1] === '澳门' ){
            return 'zh-hk';
        }
        return 'zh-cn';
    }
    return 'en-us';
}

exports.getLocation = getLocation;