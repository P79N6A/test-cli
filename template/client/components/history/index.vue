<i18n>
{
    "zh-cn": {
        "history.date" : "认购日期",
        "history.type" : "认购方式",
        "history.account" : "账户",
        "history.publishDate" : "中签公布日期",
        "history.stock": "股票",
        "history.buyCount":"认购股数",
        "history.amount":"认购金额",
        "history.status":"状态",
        "history.operator":"操作",
        "type.cash":"现金认购",
        "type.futu":"富途融资认购",
        "type.highPri":"优先认购",
        "type.margin":"银行融资认购",
        "type.zeroAsset":"0本金认购",
        "account.type.1":"港股现金账户",
        "account.type.2":"港股融资账户",
        "buyCount.shares":"股",
        "status.0":"待扣款",
        "status.1":"待公布",
        "status.2.1":"中签{buCount}股",
        "status.2.2":"未中签",
        "status.3":"已驳回",
        "status.4":"已撤销",
        "status.-2":"扣款失败",
        "operator.view":"查看",
        "operator.modify":"修改",
        "operator.cancel":"撤销",
        "history.status.date":"时间",
        "status.state.pre":"预计",
        "status.date.0":"扣款",
        "status.date.1":"公布",
        "status.date.2":"公布",
        "status.date.3":"驳回",
        "status.date.4":"撤销",
        "dialog.tips": "提示",
        "dialog.sub":"确认",
        "dialog.canl":"取消",
        "dialog.confirm": "确认",
        "dialog.next": "继续",
        "dialog.hkd": "港币",
        "dialog.cancel": "确定要撤销该新股认购申请吗？",
        "dialog.cancel.success": "撤销申请成功",
        "dialog.cancel.error": "撤销申请失败",
        "dialog.modify":"银行融资认购只支持追加，修改后您使用银行融资的金额不得少于",
        "empty":"暂无认购纪录",
        "history.oldlist":"点击查看2017年8月29日之前的认购记录"
    },
    "zh-hk":{
        "history.date" : "認購日期",
        "history.type" : "認購方式",
        "history.account" : "帳戶",
        "history.publishDate" : "中籤公佈日期",
        "history.stock": "股票",
        "history.buyCount":"認購股數",
        "history.amount":"認購金額",
        "history.status":"狀態",
        "history.operator":"操作",
        "type.cash":"現金認購",
        "type.futu":"富途孖展認購",
        "type.highPri":"優先認購",
        "type.margin":"銀行孖展認購",
        "type.zeroAsset":"0本金認購",
        "account.type.1":"港股現金帳戶",
        "account.type.2":"港股孖展帳戶",
        "buyCount.shares":"股",
        "status.0":"待扣款",
        "status.1":"待公佈",
        "status.2.1":"中籤{buCount}股",
        "status.2.2":"未中籤",
        "status.3":"已駁回",
        "status.4":"已撤銷",
        "status.-2":"扣款失敗",
        "operator.view":"查看",
        "operator.modify":"修改",
        "operator.cancel":"撤銷",
        "history.status.date":"時間",
        "status.state.pre":"預計",
        "status.date.0":"扣款",
        "status.date.1":"公佈",
        "status.date.2":"公佈",
        "status.date.3":"駁回",
        "status.date.4":"撤銷",
        "dialog.tips": "提示",
        "dialog.sub":"確認",
        "dialog.canl":"取消",
        "dialog.confirm": "確認",
        "dialog.next": "繼續",
        "dialog.hkd": "港幣",
        "dialog.cancel": "確定要撤銷該新股認購申請嗎？",
        "dialog.cancel.success": "撤銷申請成功",
        "dialog.cancel.error": "撤銷申請失敗",
        "dialog.modify":"銀行孖展認購只支持追加，修改後您使用孖展的金額不得少於",
        "empty":"暫無認購紀錄",
        "history.oldlist":"點擊查看2017年8月29日之前的認購記錄"
    },
    "en-us":{
        "history.date" : "Apply Date",
        "history.type" : "Type",
        "history.account" : "Account",
        "history.publishDate" : "Publish Date",
        "history.stock": "Stock",
        "history.buyCount":"Shares",
        "history.amount":"Amount",
        "history.status":"Current state",
        "history.operator":"Operator",
        "type.cash":"Cash Subscription",
        "type.futu":"FUTU Financing",
        "type.highPri":"Priority subscription",
        "type.margin":"Financing method",
        "type.zeroAsset":"Zero asset subscription",
        "account.type.1":"Cash Account",
        "account.type.2":"Margin Account",
        "buyCount.shares":"shares",
        "status.0":"Waiting deduction",
        "status.1":"Waiting for announcement",
        "status.2.1":"{buCount} shares allotted",
        "status.2.2":"Not Allotted",
        "status.3":"Rejected",
        "status.4":"Canceled",
        "status.-2":"Deduction failed",
        "operator.view":"View detail",
        "operator.modify":"Edit",
        "operator.cancel":"Cancel",
        "history.status.date":"Time",
        "status.state.pre":"Expected",
        "status.date.0":"deduction",
        "status.date.1":"to be announced",
        "status.date.2":"announced",
        "status.date.3":"rejection application",
        "status.date.4":"was canceled",
        "dialog.tips": "Tips",
        "dialog.sub":"confirm",
        "dialog.canl":"cancel",
        "dialog.confirm": "confirm",
        "dialog.next": "Carry on",
        "dialog.hkd": "HKD",
        "dialog.cancel": "Are you sure you want to cancel the subscription request for this new stock?",
        "dialog.cancel.success": "Successful canceled",
        "dialog.cancel.error": "Cancel failed",
        "dialog.modify":"Bank financing subscriptions only support an increase, and the amount of bank financing used after modification is not less than ",
        "empty":"No subscription record",
        "history.oldlist":"Subscription history before August 29, 2017"
    }
}
</i18n>
<template>
<div class="ipo-history-container">
    <div class="pc-list-wrapper">
        <table class="ui-table">
            <thead>
                <tr class="tr-noHover">
                    <th>{{$t('history.date')}}</th>
                    <th>{{$t('history.type')}}</th>
                    <th>{{$t('history.account')}}</th>
                    <th>{{$t('history.publishDate')}}</th>
                    <th>{{$t('history.stock')}}</th>
                    <th>{{$t('history.buyCount')}}</th>
                    <th>{{$t('history.status')}}</th>
                    <th>{{$t('history.operator')}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in historyList" :key="item.id">
                    <td>{{formatDate(item.createdAt * 1000 ,'yyyy-MM-dd')}}</td>
                    <td>
                        <span v-if="item.type == 1 && item.highPri === 0 && item.assetMargin === 0">{{$t('type.cash')}}</span>
                        <span v-if="item.type === 1 && item.highPri === 0 && item.assetMargin">{{$t('type.futu')}}</span>
                        <span v-if="item.type == 1 && item.highPri === 1">{{$t('type.highPri')}}</span>
                        <span v-if="item.type == 2 && !item.zeroAsset">{{$t('type.margin')}}</span>
                        <span v-if="item.type == 2 && item.zeroAsset">{{$t('type.zeroAsset')}}</span>
                    </td>
                    <td>
                        <span v-if="item.accountType === 'cash'">{{$t('account.type.1')}}</span> 
                        <span v-if="item.accountType === 'margin'">{{$t('account.type.2')}}</span> 
                        {{item.cardNumber}}
                    </td>
                    <td>{{formatDate(item.publishTime * 1000 ,'yyyy-MM-dd')}}</td>
                    <td>{{item.stockCode + ' ' + item.stockName}}</td>
                    <td>{{formatNumber(item.buyCount)}} {{$t('buyCount.shares')}}</td>
                    <td>
                        <span v-if="item.status == 0">{{$t('status.0')}}</span>
                        <span v-if="item.status == 1">{{$t('status.1')}}</span>
                        <span v-if="item.status == 2 && item.finalCount > 0">{{$t('status.2.1' , {buCount:formatNumber(item.finalCount)})}}</span>
                        <span v-if="item.status == 2 && item.finalCount <= 0">{{$t('status.2.2')}}</span>
                        <span v-if="item.status == 3">{{$t('status.3')}}</span>
                        <span v-if="item.status == 4">{{$t('status.4')}}</span>
                        <span v-if="item.status == -2">{{$t('status.-2')}}</span>                                
                    </td>
                    <td>
                        <a :href="'/detail?tid=' + item.id + '&stockCode=' + item.stockCode" class="ipo-link">{{$t('operator.view')}}</a>
                        <!--只有认购中的允许修改-->
                        <a class="ipo-link" v-if="item.isCanModify" @click="modifyTask(item.id , $event)">{{$t('operator.modify')}}</a>
                        <!--只有认购中的现金IPO可以撤销-->
                        <a class="ipo-link" v-if="item.isCanCancel" @click="cancelTask(item.id , $event)">{{$t('operator.cancel')}}</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="wrapper mb-history-list-wrapper">
        <div class="wrapper history-i-bar-wrapper" v-for="item in historyList" :key="item.id">
            <a class="wrapper mb-history-i-wrapper" :href="'/detail?tid=' + item.id + '&stockCode=' + item.stockCode">
                <div class="wrapper mb-i-bar-wrapper">
                    <span class="name">{{item.stockName + ' ' + item.stockCode}}.HK</span>
                    <span class="right"><i class="ui-icon icon-arrow01-right"></i></span>
                </div>
                <div class="wrapper mb-attr-wrapper">
                    <div class="mb-attr-i">
                        <div class="label">{{$t('history.buyCount')}}</div>
                        <div class="wrapper txt"><span>{{formatNumber(item.buyCount)}} {{$t('buyCount.shares')}}</span></div>
                    </div>
                    <div class="mb-attr-i">
                        <div class="label">{{$t('history.amount')}}</div>
                        <div class="wrapper txt"><span>{{formatNumber(item.buyAmount / 1000 , 2)}} HKD</span></div>
                    </div>
                    <div class="mb-attr-i">
                        <div class="label">{{$t('history.status')}}</div>
                        <div class="wrapper txt">
                            <span v-if="item.status == 0">{{$t('status.0')}}</span>
                            <span v-if="item.status == 1">{{$t('status.1')}}</span>
                            <span v-if="item.status == 2 && item.finalCount > 0">{{$t('status.2.1' , {buCount:formatNumber(item.finalCount)})}}</span>
                            <span v-if="item.status == 2 && item.finalCount <= 0">{{$t('status.2.2')}}</span>
                            <span v-if="item.status == 3">{{$t('status.3')}}</span>
                            <span v-if="item.status == 4">{{$t('status.4')}}</span>
                            <span v-if="item.status == -2">{{$t('status.-2')}}</span> 
                        </div>
                    </div>
                    <div class="mb-attr-i">
                        <div class="label">{{$t('history.status.date')}}</div>
                        <div class="wrapper txt">
                            <span v-if="item.status == -2">{{formatDate(item.processTime * 1000 , 'yyyy-MM-dd')}} {{$t('status.date.-2')}}</span>
                            <span v-if="item.status == 0">{{$t('status.state.pre')}} {{formatDate(item.processTime * 1000 , 'yyyy-MM-dd')}} {{$t('status.date.0')}}</span>
                            <span v-if="item.status == 1">{{$t('status.state.pre')}} {{formatDate(item.processTime * 1000 , 'yyyy-MM-dd')}} {{$t('status.date.1')}}</span>
                            <span v-if="item.status == 2">{{formatDate(item.processTime * 1000 , 'yyyy-MM-dd')}} {{$t('status.date.2')}}</span>
                            <span v-if="item.status == 3">{{formatDate(item.processTime * 1000 , 'yyyy-MM-dd')}} {{$t('status.date.3')}}</span>
                            <span v-if="item.status == 4">{{formatDate(item.processTime * 1000 , 'yyyy-MM-dd')}} {{$t('status.date.4')}}</span>
                        </div>
                    </div>
                </div>
            </a>
            <div class="history-i-footer-wrapper" v-if="item.isCanModify || item.isCanCancel">
                <button v-if="item.isCanModify" @click="modifyTask(item.id , $event)" class="ui-btn ui-btn-s ui-btn-strokeGray">{{$t('operator.modify')}}</button>
                <button v-if="item.isCanCancel" @click="cancelTask(item.id , $event)" class="ui-btn ui-btn-s ui-btn-strokeGray">{{$t('operator.cancel')}}</button>
            </div>
        </div>       
    </div>
    <div class="wrapper ipo-pagination-wrapper" v-if="historyList.length">
        <div class="old-wrapper"><a :href="'//' + myFutu5 + '/account/buynewstocklist'">{{$t('history.oldlist')}}</a></div>
        <div class="pagination-wrapper"><uiPagination :data="pagination" :click="goto"></uiPagination></div>
    </div>
    <!-- empty -->
    <div class="wrapper empty-container" v-if="!historyList.length">
        <span class="wrapper empty">
            <span class="empty-box"></span>
            <span class="empty-txt">{{$t('empty')}}</span>
        </span>
        <div class="wrapper old-wrapper"><a :href="'//' + myFutu5 + '/account/buynewstocklist'">{{$t('history.oldlist')}}</a></div>
    </div>
    <ui-loading></ui-loading>
    <ui-dialog></ui-dialog>
    <ui-light-dialog></ui-light-dialog>
</div>
</template>

<script>
import * as xhr from '@futuweb/tool-xhr2';
import formatNumber from '../../utils/format-number';
import formatDate from '../../utils/format-date';

import {checkResponse , handlerError} from '../../lib/response';
import getUrlKey from '../../utils/get-url-key';

import uiPagination from '@futuweb/ui-pagination/dist/vue2/Pagination.es5';
import uiLoading from '../common/loading.vue';
import uiDialog from '../common/dialog.vue';
import uiLightDialog from '../common/light-dialog.vue';

const myFutu5 = _params.myFutu5 || 'my.futu5.com';
const ipoFutu5 = _params.ipoFutu5 || 'ipo.futu5.com';

export default {
    name: 'ipo-history',
    data(){
        return {
            myFutu5,
            ipoFutu5,
            pagination:{
                page: 1,
                pageCount: 0
            },
            isCanceling: false,
            historyList: []
        };
    },
    methods:{
        formatDate,
        formatNumber,
        getCurrentTaskById(taskId){
            let historyList = this.historyList || [];
            for ( let i = 0 ; i < historyList.length ; i++ ){
                if ( +historyList[i].id === +taskId ){
                    return Object.assign({} , historyList[i]);
                }
            }
            return void 0;
        },
        /** 
         * 更改任务
        */
        modifyTask(taskId , e){
            console.log('[modifyTask]...' , taskId);
            e.preventDefault();

            taskId = +(('' + taskId).replace(/[^0-9]/g ,''));

            let task = this.getCurrentTaskById(taskId);

            if ( !task || task.zeroAsset ) return;

            //融资认购
            if ( +task.type === 2 ){
                let message = this.$t('dialog.modify') + this.formatNumber(task.marginPart / 1000 , 2) + this.$t('dialog.hkd');
                return this.$store.commit('showDialog' , {
                    title: this.$t('dialog.tips'),
                    canl: this.$t('dialog.canl'),
                    sub: this.$t('dialog.confirm'),
                    message,
                    callBack: ()=>{
                        return window.location.href = '//' + this.myFutu5 + '/ipo/apply?stockCode=' + task.stockCode + '&taskId=' + task.id;
                    }
                });
            }
            return window.location.href = '//' + this.myFutu5 + '/ipo/apply?stockCode=' + task.stockCode + '&taskId=' + task.id;

        },
        /** 
         * 撤销任务
        */
        cancelCallBack(id){
            this.$store.commit('hideDialog');
            this.$store.commit('showLoading');
            this.isCanceling = true;
            return xhr.post({url:'/api/cancelIPOTask' , data:{id} ,dataType:'JSON'})
                .then(checkResponse , handlerError)
                .then(()=>{
                    this.$store.commit('hideLoading');
                    this.$store.commit('showDialog' ,{
                        title: this.$t('dialog.tips'),
                        canl: this.$t('dialog.canl'),
                        sub: this.$t('dialog.confirm'),
                        message: this.$t('dialog.cancel.success'),
                        callBack:()=>window.location.reload(true),
                        canlBack:()=>window.location.reload(true)
                    });
                } , (error)=>{
                    this.$store.commit('hideLoading');
                    this.$store.commit('showDialog' ,{
                        title: this.$t('dialog.tips'),
                        canl: this.$t('dialog.canl'),
                        sub: this.$t('dialog.confirm'),
                        message: this.$t('dialog.cancel.error')
                    });
                }).then(()=>{
                    this.isCanceling = false;
                });
        },
        cancelTask(taskId , e){
            console.log('[cancelTask]...' , taskId);
            e.preventDefault();
            if ( this.isCanceling ) return;
            let task = this.getCurrentTaskById(taskId);
            if ( !task ) return;

            return this.$store.commit('showDialog' ,{
                title: this.$t('dialog.tips'),
                canl: this.$t('dialog.canl'),
                sub: this.$t('dialog.confirm'),
                message: this.$t('dialog.cancel'),
                callBack: this.cancelCallBack.bind(this , task.id)
            });
        },
        /** 
         * 解析数据
        */
        parseList(list){
            list = list || [];
            //是否能被修改设置 isCanModify
            for ( let i = 0 ; i < list.length ; i++ ){
                list[i].isCanModify = false;
                list[i].isCanCancel = false;
                if ( +list[i].status === 0 ){//未处理的任务，可以进行操作
                    if ( list[i].type === 2 ){//银行融资
                        if ( list[i].zeroAsset ){ //0本金认购可以撤销
                            if ( +new Date((+list[i].marginEndTime || 0) * 1000) > +new Date() ){ //支持银行融资
                                list[i].isCanCancel = true;
                            }
                        } else {
                            if ( +new Date(Math.min(list[i].marginUpdateEndTime , list[i].marginEndTime) * 1000) > +new Date() ){
                                list[i].isCanModify = true; //银行融资可以修改
                            }
                        }
                    }else if ( +new Date(list[i].endTime * 1000) > +new Date() ) {//普通
                        list[i].isCanModify = true;
                        list[i].isCanCancel = true;
                    }
                }
            }
            return list;
        },
        setHistory(history){
            console.log('[setHistory] get list.....' , history);
            this.historyList = this.parseList(history.list);
            this.pagination = {
                page: history.page,
                pageCount: history.pageCount
            };
        },
        showError(error){
            console.log('[showError] error: ' , error.message);
            this.$store.commit('showDialog' , error.message || 'error');
        },
        /** 
         * 获取历史记录
        */
        getlist(page){
            console.log('[getlist] get page... ' , page);
            this.$store.commit('showLoading');
            return xhr.get({url:'/api/getIPOHistoryList' , data:{page}})
                .then(checkResponse , handlerError)
                .then(this.setHistory.bind(this) , this.showError.bind(this))
                .then(()=>{
                    this.$store.commit('hideLoading');
                });
        },
        goto(page){
            console.log('[goto] i want go to... ' , page);
            return window.location.href = `/history?page=${page}`;
        }
    },
    mounted(){
        let self = this;
        self.$nextTick(function(){
            let page = +getUrlKey('page');
            page = Number.isInteger(page) && page > 0 && Number.isFinite(page) ? page : 1;
            self.getlist(page);
        });  
    },
    components: {uiPagination , uiLoading , uiDialog , uiLightDialog}
};
</script>