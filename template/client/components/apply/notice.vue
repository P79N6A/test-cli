<i18n>
    {
        "zh-cn":{
            "温馨提示：":"温馨提示：",
            "温馨提示.1":"1、富途证券新股认购支持现金认购、富途融资认购和银行融资认购。其中富途融资认购指客户使用到了富途融资进行新股认购，其中包括未交收金额和持仓股票抵押额，如果您开启统一购买力，还将包含您在美股/A股通关联账户资产抵押产生的购买力。",
            "温馨提示.2":"2、认购手续费：50港币/笔（<a href=\"//{futunn}/act/detail?id=999\">0手续费活动</a>期间，在认购截止后7个工作日返还50港币/笔），若使用到银行融资则为100港币/笔（代银行收取）。手续费和融资利息，无论是否中签，均需缴纳。手续费减免活动请以活动详情说明为准。<a href=\"//{helpFutu5}/faq/topic46\">查看收费详情</a>",
            "温馨提示.3":"3、认购资金将在发起申请后实时冻结，并将于富途认购截止日当天扣除。",
            "温馨提示.4":"4、银行融资认购不支持撤销，仅支持在富途认购截止日9:00前提交追加申请，富途认购截止日9:00后不支持追加修改。",
            "温馨提示.5":"5、因银行融资认购不可撤销，若认购期间账户风险状态处于“危险”狀态，富途将保留強平权利，请注意风险。",
            "温馨提示.6":"6、因需处理认购手续，富途认购截止时间会早于交易所公布的日期，截止时间为提前一个交易日16:00。",
            "温馨提示.7":"详情请查看 <a href=\"//{helpFutu5}/faq/topic2297\">《富途证券新股认购声明》</a>"
        },
        "zh-hk":{
            "温馨提示：":"溫馨提示：",
            "温馨提示.1":"1、富途證券新股認購支持現金認購、富途孖展認購和銀行孖展認購。其中富途孖展認購指客戶使用到了富途孖展進行新股認購，其中包括未交收金額和持倉股票抵押額，如果您開啟統一購買力，還將包含您在美股/A股通關聯帳戶資產抵押產生的購買力。",
            "温馨提示.2":"2、認購手續費：50港幣/筆（<a href=\"//{futunn}/act/detail?id=999\">0手續費活動</a>期間，在認購截止後7個工作日返還50港幣/筆），若使用到銀行孖展則為100港幣/筆（代銀行收取）。手續費和孖展利息，無論是否中籤，均需繳納。手續費減免活動請以活動詳情說明為準。 <a href=\"//{helpFutu5}/faq/topic46\">查看收費詳情</a></p>",
            "温馨提示.3":"3、認購資金將在發起申請後即時凍結，並將于富途認購截止日當天扣除。",
            "温馨提示.4":"4、銀行孖展認購不支持撤銷，僅支持在富途認購截止日9:00前提交追加申請，富途認購截止日9:00後不支持追加修改。 ",
            "温馨提示.5":"5、因銀行孖展認購不可撤銷，若認購期間帳戶風險狀態處于“危險”狀態，富途將保留砍倉權利，請注意風險。",
            "温馨提示.6":"6、因需處理認購手續，富途認購截止時間會早于交易所公布的日期，截止時間為提前一個交易日16:00。",
            "温馨提示.7":"詳情請查看 <a href=\"//{helpFutu5}/faq/topic2297\">《富途證券新股認購聲明》</a>"
        },
        "en-us":{
            "温馨提示：":"Tips: ",
            "温馨提示.1":"1.Futu Securities' IPO Subscription offers Cash Subscription, Futu Financing Service and Bank Financing Service. Futu Financing Service allows you to subscribe to IPO using the unified purchasing power from all of your stock accounts including the A-share stock account, Hong Kong stock account and US stock account (subjected to the status of your account and client must have activated the function).",
            "温馨提示.2":"2.Handling Fee: Successful IPO subscription by Cash Subscription or Futu Financing Service will have a $HKD 50 handling fee, it will be refunded within 7 working days for unsuccessful subscription. IPO subscription by Bank Financing Service will have a $100 handling fee, it will not be refunded in any case. <a <a href=\"//{helpFutu5}/faq/topic46\">View charge details</a></p>",
            "温馨提示.3":"3.The subscription amount and handling fee will be frozen once you subscribed to the IPO. The amount will be deducted by the deadline of the IPO.",
            "温馨提示.4":"4.IPO subscription by Bank Financing Service requires prior application submitted before 9:00 on the last date of the IPO. Withdrawal is not allowed.",
            "温馨提示.5":"5.Since Bank Financing IPO Subscription is irrevocable, Futu reserves the right to compulsory liquidation during the IPO subscription period if the risk level of your account appears to be “Dangerous”. Please pay attention to the risk level of your account.",
            "温馨提示.6":"6.Due to our internal process, IPO subscription deadline at Futu will be one day earlier than the date announced by the Hong Kong Stock Exchange.",
            "温馨提示.7":"For details, please refer to the \"<a href=\"//{helpFutu5}/faq/topic2297\">Futu Securities IPO Subscription Statement</a>\""
        }
    }
</i18n>

<template>
    <div class="wrapper ipo-notice-wrapper">
        <p>{{$t('温馨提示：')}}</p>
        <p>{{$t('温馨提示.1')}}</p>
        <p v-html="$t('温馨提示.2' , {futunn:domain.futunn , helpFutu5:domain.helpFutu5})"></p>
        <p>{{$t('温馨提示.3')}}</p>
        <p>{{$t('温馨提示.4')}}</p>
        <p>{{$t('温馨提示.5')}}</p>
        <p>{{$t('温馨提示.6')}}</p>
        <p v-html="$t('温馨提示.7' ,{helpFutu5:domain.helpFutu5})"></p>
    </div>
</template>
<script>
let {futunn , helpFutu5} = window._params || {};
export default {
    name:'ipo-apply-notice',
    data(){
        return {
            domain:{futunn , helpFutu5} 
        };
    }
}
</script>

<style lang="scss" scoped>
$MEDIA_WIDTH:768px;
.ipo-notice-wrapper{
    box-sizing: border-box;
    padding: 28px 30px;
    line-height: 2em;
    a{
        word-break: keep-all;
    }
}
@media screen and (max-device-width: $MEDIA_WIDTH) {
    .ipo-notice-wrapper{
        padding: 14px;
    }
}
</style>
