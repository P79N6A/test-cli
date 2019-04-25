import Vue from 'vue';
import Vuex from 'vuex';

import dialog from '../../modules/dialog';
import loading from '../../modules/loading';
import lightDialog from '../../modules/light-dialog';

Vue.use(Vuex);

//路由数据
let defaultApplyInfo = {
    accountId: 0,
    isMargin: 0,
    interestRate: 0,
    accountDesc:'',
    applyType: 0,
    assetMargin: 0,
    buyAmount: 0,
    buyCount: 0,
    cashPart: 0,
    expense: 0,
    fee: 50000,
    isFullCash: 0,
    isMarginIpo: 0,
    marginPart: 0,
    stockId: 0,
    stockCode:'',
    marginInterest:0,
    marginInterestDays:0,
    stockDesc:'',
    zeroAsset: 0,
    tid: 0
};

let state = Object.assign({} , defaultApplyInfo);

let mutations = {
    setApplyData: (state , newApplyInfo)=>{
        if ( !newApplyInfo ){
            state = Object.assign({} , defaultApplyInfo);
        }else {
            state = Object.assign(state , defaultApplyInfo, newApplyInfo);
        }
    }
};

let applyInfo = {state , mutations};

export default new Vuex.Store({
    modules:{
        dialog,
        loading,
        lightDialog,
        applyInfo
    }
});
