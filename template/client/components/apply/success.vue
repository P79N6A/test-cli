<i18n>
    {
        "zh-cn": {
            "新股认购":"新股认购",
            "认购申请已修改":"认购申请已修改",
            "认购申请已提交":"认购申请已提交",
            "本次认购已实时冻结":"本次认购已实时冻结",
            "港币，并将于富途认购截止日扣除":"港币，并将于富途认购截止日扣除",
            "港币，将于富途认购截止日当天 16:00 扣除":"港币，将于富途认购截止日当天 16:00 扣除",
            "温馨提示：您需要在上市日前存入足够的资金，否则富途有权在上市日第一时间强制卖出您中签的股票。":"温馨提示：您需要在上市日前存入足够的资金，否则富途有权在上市日第一时间强制卖出您中签的股票。",
            "马上入金":"马上入金",
            "返回":"返回",
            "查看记录":"查看记录"
         },
        "zh-hk": {
            "新股认购":"新股認購",
            "认购申请已修改":"認購申請已修改",
            "认购申请已提交":"認購申請已提交",
            "本次认购已实时冻结":"本次認購已實時凍結",
            "港币，并将于富途认购截止日扣除":"港幣，並將於富途認購截止日扣除",
            "港币，将于富途认购截止日当天 16:00 扣除":"港幣，將於富途認購截止日當天 16:00 扣除",
            "温馨提示：您需要在上市日前存入足够的资金，否则富途有权在上市日第一时间强制卖出您中签的股票。":"溫馨提示：您需要在上市日前存入足夠的資金，否則富途有權在上市日第一時間強制賣出您中籤的股票。",
            "马上入金":"馬上入金",
            "返回":"返回",
            "查看记录":"查看記錄"
           },
        "en-us": {
            "新股认购":"IPO Subscription",
            "认购申请已修改":"Success",
            "认购申请已提交":"Success",
            "本次认购已实时冻结":"The subscription has been frozen to ",
            "港币，并将于富途认购截止日扣除":"HKD. And will be deducted from the Futu subscription deadline.",
            "港币，将于富途认购截止日当天 16:00 扣除":"HKD. And will be deducted from the Futu subscription deadline of 16:00.",
            "温馨提示：您需要在上市日前存入足够的资金，否则富途有权在上市日第一时间强制卖出您中签的股票。":"Tips: You need to deposit enough funds before the listing date, otherwise Futu has the right to force the sale of your allotted stock on the first day of the listing date.",
            "马上入金":"Immediate deposit",
            "返回":"Back",
            "查看记录":"View record"
        }
    }
</i18n>
<template>
    <div class="wrapper ipo-apply-success-wrapper">
        <p class="ui-title pc-title-wrapper"><span class="ui-title-font">{{$t('新股认购')}}</span></p>
         <div class="ipo-container ipo-success-container">
            <!-- pc上面 -->
            <div class="wrapper">
                <div class="wrapper ipo-success-tips">
                    <span class="success-tips"><i class="iconfont icon-success"></i></span>
                </div>
                <div class="wrapper ipo-success-tips">
                    <h4 class="success-title" v-if="applyInfo.tid">{{$t('认购申请已修改')}}</h4>
                    <h4 class="success-title" v-else>{{$t('认购申请已提交')}}</h4>
                </div>
                <div class="wrapper ipo-success-money-tips" v-if="applyInfo.zeroAsset === 0">
                    <p>{{$t('本次认购已实时冻结')}} <span class="yl">{{formatNumber(((applyInfo.cashPart || 0) + (applyInfo.assetMargin || 0)  + (applyInfo.fee || 0) + (applyInfo.expense || 0)) / 1000 , 2)}}</span> {{$t('港币，并将于富途认购截止日扣除')}}</p>
                </div>
                <div class="wrapper ipo-zero-asset-success-tips" v-else>
                    <p>{{$t('本次认购已实时冻结')}} <span class="yl">{{formatNumber(((applyInfo.cashPart || 0) + (applyInfo.assetMargin || 0)  + (applyInfo.fee || 0) + (applyInfo.expense || 0)) / 1000 , 2)}}</span> {{$t('港币，将于富途认购截止日当天 16:00 扣除')}}</p>
                    <p>{{$t('温馨提示：您需要在上市日前存入足够的资金，否则富途有权在上市日第一时间强制卖出您中签的股票。')}}</p>
                    <a :href="'//' + domain.myFutu5 + '/account/cashin#/bank/card?currency=hk'" class="ui-btn">{{$t('马上入金')}}</a>
                </div>
                <div class="wrapper ipo-success-tips">
                    <div class="success-link"><a href="/list">{{$t('返回')}}</a> <span class="border"></span> <a href="/history">{{$t('查看记录')}}</a></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex';

import formatNumber from '../../utils/format-number';

const params = window._params || {};

let {myFutu5} = params;

export default {
    name:'ipo-apply-success',
    data(){
        return {
            domain:{myFutu5}
        };
    },
    computed: mapState(['applyInfo']),
    methods:{
        formatNumber
    },
    mounted(){
        if ( !this.applyInfo.accountId ){
            return this.$router.replace({name:'index',path:'/'});
        }
    }
}
</script>
<style lang="scss" scoped>
$MEDIA_WIDTH:768px;

.container{
    width: 100%;
    margin-left: auto;
    margin-right: auto;
}
.wrapper{
    width: 100%;
    box-sizing: border-box;
}
.container::before,
.container::after,
.wrapper::before,
.wrapper::after{
    clear: both;
    content: "";
    display: table;
}
.pc-title-wrapper{
    border-bottom: 1px solid #DDE2EB;
}
.ipo-success-container{
    width: 827px;
    float: right;
    background: #fff;
    padding-bottom: 28px;
}
.ipo-success-tips{
    text-align: center;
}
.ipo-success-tips .success-tips{
    display: inline-block;
    margin-top: 76px;
    width: 80px;
    height: 80px;
    overflow: hidden;
}
.ipo-success-tips .success-tips i{
    font-size: 80px;
    line-height: 1;
    color: #4281e5;
}
.ipo-success-tips .success-title{
    display: inline-block;
    font-size: 20px;
    color: #284058;
    line-height: 20px;
    padding: 24px 0;
}
.ipo-success-tips .success-link{
    display: inline-block;
}
.ipo-success-tips .success-link .border{
    display: inline-block;
    width: 1px;
    height: 10px;
    background: #DDE2EB;
    margin: 0 10px;
}
.ipo-zero-asset-success-tips p{
    text-align: center;
}
.ipo-zero-asset-success-tips p:nth-of-type(1){
    width: 100%;
    box-sizing: border-box;
}
.ipo-zero-asset-success-tips p:nth-of-type(2){
    margin: 0 auto;
    font-family: PingFang-SC-Regular;
    font-size: 12px;
    color: #808F9E;
    line-height: 22px;
    margin-top: 24px;
}
.ipo-zero-asset-success-tips .ui-btn{
    margin: 0 auto;
    width: 128px;
    margin-top: 32px;
    display: block;
    margin-bottom: 20px;
    padding: 0px;
}
.ipo-success-money-tips{
    padding: 14px 28px;
    text-align: center;
    padding-top: 0;
    box-sizing: border-box;
}
.ipo-success-money-tips .yl{
    color: #FF6400;
}
@media screen and (max-device-width: $MEDIA_WIDTH) {
    .pc-title-wrapper{
        display: none;
    }
    .ipo-success-container{
        width: 100%;
        float: none;
    }
    .ipo-zero-asset-success-tips .ui-btn{
        width: auto;
        padding: 0px;
        margin-left: 20px;
        margin-right: 20px;
    }
    .ipo-zero-asset-success-tips p:nth-of-type(1){
        width: 236px;
        margin: 0 auto;
    }
    .ipo-zero-asset-success-tips p:nth-of-type(2){
        margin-left: 20px;
        margin-right: 20px;
    }
}
</style>


