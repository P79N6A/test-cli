/* eslint-disable valid-jsdoc */
/**
 * [删除ClassName]
 * @param {*} element 
 * @param {*} className 
 */
function removeClassName(element , className){
    if ( !hasClassName(element , className) ){
        return element;
    }
    element.className = ' ' + element.className.trim() + ' ';
    element.className = element.className.replace(' ' + className + ' ' , ' ').trim();
    return element;
}
/**
 * [添加className]
 * @param {*} element 
 * @param {*} className 
 */
function addClassName(element , className){
    if ( hasClassName(element , className) ){
        return element;
    }
    element.className = element.className.trim() + ' ' + className.trim();
    return element;
}

/**
 * [判断是否包含对应的className]
 * @param {*} element 
 * @param {*} className 
 */
function hasClassName(element , className){
    if ( (' ' + element.className.trim() + ' ').indexOf(' ' + className.trim() + ' ') >= 0 ){
        return true;
    }
    return false;
}

export {removeClassName , addClassName , hasClassName};