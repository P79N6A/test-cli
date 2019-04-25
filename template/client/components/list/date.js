'use strict';

let date = {};

/**
 * 获取一周的数据
 * @param Date firstDate 一周中的这一天，如果为空，则今天为第一天
 * @return Array 一周的日期数组
 */
date.getOneWeek = function(firstDate){
    if(!firstDate) firstDate = new Date();
    let firstDateTime = firstDate.getTime();
    // 返回值
    let ret = [];

    // 开始获取日期
    for(let i = 0; i < 7; i++){
        ret[i] = new Date(firstDateTime + i * 24 * 3600 * 1000);
    }

    return ret;

};

/**
 * 获取N周的数据
 * @param Integer count 返回多少周的日期
 * @param Date firstDate 第一天，如果为空，则第一天为今天
 * @param Integer dateIndex firstDate是在返回数据的第几周
 */
date.getWeeks = function(count, firstDate, dateIndex) {
    if(!firstDate) firstDate = new Date();
    let firstDateTime = firstDate.getTime();
    if(!dateIndex) dateIndex = 0;

    let ret = [];
    for(let i = 0; i < count; i++){
        ret = ret.concat(date.getOneWeek(new Date(firstDateTime - (dateIndex - i) * 7 * 24 * 3600 * 1000)));
    }
    return ret;
};

/**
 * 将日期转换为8位数字，例如20170506
 */
date.date2number = function(dateObj){
    return dateObj.getFullYear() * 10000 + (dateObj.getMonth() + 1) * 100 + dateObj.getDate();
};

/**
 * 获取两个日期间相差的天数
 * 只看日期，不看时间
 */
date.getDeltaDays = function(dateObj1, dateObj2){
    // 先获取当日0点的日期对象，去除时间差异
    dateObj1 = new Date(dateObj1.getFullYear(), dateObj1.getMonth(), dateObj1.getDate(), 0, 0, 0, 0);
    dateObj2 = new Date(dateObj2.getFullYear(), dateObj2.getMonth(), dateObj2.getDate(), 0, 0, 0, 0);
    return Math.round((dateObj2 - dateObj1) / 24 / 3600 / 1000);
};

/**
 * 将日期转换为字符串
 * @param Date dataObj 日期
 * @param String separator 分隔符
 * @return String 格式化后的字符串
 */
date.format = function(dateObj, separator){
    if(!separator) separator = '/';
    let str = '' + date.date2number(dateObj);
    return str.substr(0,4) + separator +
        str.substr(4,2) + separator +
        str.substr(6,2);
};

export default date;
