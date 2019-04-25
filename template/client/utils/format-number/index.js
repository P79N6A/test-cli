'use strict';

let format = (source , pre)=>{
    let formatStr = '';
    for ( let i = 0 ; i < source.length ; i++ ){
        formatStr = '' + source[source.length - i - 1] + formatStr;
        if ( (i + 1) % 3 === 0 && (i + 1) !== source.length ) {
            formatStr = pre + formatStr;
        }
    }
    return formatStr;
};
/**
 * [description]
 * @param  {[type]} num [description]
 * @param  {[type]} pre [description]
 * @param  {[type]} fix [description]
 * @return {[type]}     [description]
 */
const formatNumber = ( num , pre , fix)=>{
    if ( typeof num !== 'number' ) {
        return num;
    }
    if ( typeof pre === 'number' ){
        fix = pre;
        pre = ',';
    }
    num = fix ? num.toFixed(fix) : '' + num;
    pre = pre ? pre : ',';
    let source = num.split('.');
    let dir = source[0][0] === '-' ? '-' : '';
    if ( dir ){
        source[0] = source[0].replace(/^\-/ , '');
    }
    return dir + format(source[0] , pre) + (source[1] ? '.' + format(source[1] , pre) : '');
};
//Intl.NumberFormat().format(-1500000)
export default formatNumber;
