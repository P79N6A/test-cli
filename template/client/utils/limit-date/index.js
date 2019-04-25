/**
 *
*/
function formatVal(source ){
    return function(match){
        var pre = '';
        var len = match.length - ('' + source).length;
        if ( len > 0 ) {
            for ( var i = 0 ; i < len ; i++ ){
                pre += '0';
            }
        }
        return pre + ('' + source);
    };
}
/**
 * 倒计时过滤器
 * \{{ Date.now()-10*1000*60*60*24 | limitDate }}
 * return 10天0小时0分
 */
function limitDate(time , format){
    if ( typeof time !== 'number' ) {
        return time;
    }
    format = format ? format : 'dd天HH小时mm分';
    var day = Math.floor(time / (24 * 60 * 60 * 1000));
    var hour = Math.floor((time % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    var minute = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));
    var second = Math.floor((time % (60 * 1000)) / (1000));
    // console.log('[limit date] day : hour : minute :second . ' , day , hour , minute , second);
    return format.replace(/dd/g ,formatVal(day))
        .replace(/HH/g ,formatVal(hour))
        .replace(/mm/g ,formatVal(minute))
        .replace(/ss/g ,formatVal(second));
}


export default limitDate;
