/**
 * [formatNumberCeilByBit 向上取]
 * @param  {[type]} number [description]
 * @param  {[type]} bit    [description]
 * @return {[type]}        [description]
 */
function formatNumberCeilByBit(number , bit){
    return Math.ceil(number / Math.pow(10 , bit)) * Math.pow(10 , bit);
}
/**
 * [formatNumberFloorByBit 向下取]
 * @param  {[type]} number [description]
 * @param  {[type]} bit    [description]
 * @return {[type]}        [description]
 */
function formatNumberFloorByBit(number , bit){
    return Math.floor(number / Math.pow(10 , bit)) * Math.pow(10 , bit);
}

export {formatNumberFloorByBit , formatNumberCeilByBit};