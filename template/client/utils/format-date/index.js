'use strict';

let formatVal = ( source )=>{
    return (match)=>{
        let pre = '';
        let len = match.length - ('' + source).length;
        if ( len > 0 ) {
            for ( let i = 0 ; i < len ; i++ ){
                pre += '0';
            }
        }
        return pre + ('' + source);
    };
};

/**
 * [date format]
 * @param  {[type]} time   [description]
 * @param  {[type]} format [description]
 * @return {[type]}        [description]
 */
const formatDate = (time , format)=>{
    if ( typeof time !== 'number' && Object.prototype.toString.call(time) !== '[object Date]' ) {
        return time;
    }
    format = format ? format : 'yyyy-MM-dd HH:mm:ss';

    time = new Date(+time);
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let date = time.getDate();
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();
    let milliseconds = time.getMilliseconds();

    // console.log('[date format] year : month : date : hour : minute :second : milliseconds. ' , year , month , date , hour , minute , second , milliseconds);
    return format.replace(/y+/g ,formatVal(year))
        .replace(/M+/g ,formatVal(month))
        .replace(/d+/g ,formatVal(date))
        .replace(/H+/g ,formatVal(hour))
        .replace(/m+/g ,formatVal(minute))
        .replace(/sss/g ,formatVal(milliseconds))
        .replace(/s+/g , formatVal(second));
};

export default formatDate;
