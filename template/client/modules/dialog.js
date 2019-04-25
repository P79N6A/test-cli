'use strict';

let i18nArr = {
    'zh-cn':{
        title:'提示',
        canl:'取消',
        sub:'确认'
    },
    'zh-hk':{
        title:'提示',
        canl:'取消',
        sub:'確認'
    },
    'en-us':{
        title:'Tips',
        canl:'Cancel',
        sub:'Confirm'
    }
};

let i18n = i18nArr[window._i18n.locale || 'zh-cn'];

const defObj = {
    isShow: false,
    isCancel: true,
    title: i18n.title,
    message: '',
    canl: i18n.canl,
    sub: i18n.sub,
    callBack:()=>{},
    callBackData:null,
    canlBack:()=>{},
    canlBackData:null,
};

export default {
    state() {
        return Object.assign({},defObj);
    },
    mutations:{
        /** 
         * 展示提示
        */
        showDialog: (state , dialogs)=>{
            if ( typeof dialogs === 'object' ){
                state = Object.assign(state,defObj,dialogs,{isShow:true});
            }else if( typeof dialogs === 'string' ){
                state = Object.assign(state,defObj,{message:dialogs,isShow:true});
            }else{
                state = Object.assign(state,defObj,{isShow:true});
            }
        },
        /** 
         * 关闭
        */
        hideDialog: (state)=>{
            state = Object.assign(state,defObj,{isShow:false});
        }
    }
};
