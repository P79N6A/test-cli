<i18n>
{
    "zh-cn": {
        "请输入富途证券交易密码" : "请输入富途证券交易密码",
        "交易密码错误，请重试" : "交易密码错误，请重试",
        "重试" : "重试",
        "忘记密码" : "忘记密码"
    },
    "zh-hk":{
        "请输入富途证券交易密码" : "請輸入富途证券交易密碼",
        "交易密码错误，请重试" : "交易密碼錯誤，請重試",
        "重试" : "重試",
        "忘记密码" : "忘記密碼"
    },
    "en-us":{
        "请输入富途证券交易密码" : "Futu trading password",
        "交易密码错误，请重试" : "Trading password error , try again.",
        "重试" : "Retry",
        "忘记密码" : "Forget"
    }
}
</i18n>

<template>
    <div ref="password">
        <div class="ui-dialog-box passwordBox" :class="{'android-top':isAndroid,ios12: ios12,'ui-show': isShowPwdProps}" v-show="isShowPwdProps">
            <div class="ui-dialog ui-center">
                <div class="ui-dialog-header">
                    <h3 class="ui-dialog-header-title">{{dtitle|| $t('请输入富途证券交易密码')}}</h3>
                </div>
                <div class="ui-dialog-body ui-form">
                    <div class="noticeInfo">{{notice}}</div>
                    <div class="ui-form-item" :class="{'ui-focus':focused}">
                        <div class="pwdList ui-form-text" @click="inputFocus()">
                            <div class="cell"  v-for="(item, index) in passwordList" :key="index" :class="{cursor: index == pwdValueProps.length && focused, dot: item}">
                                <span class="inner"></span>
                            </div>
                        </div>
                        <input type="tel" name="txtPassword" v-model="pwdValueProps" @click="inputFocus($event)" @change="scroll" @blur="scroll" autocomplete="off" autocorrect="off" maxlength="6">
                        
                    </div>
                    <div class="addInfo" v-if="addition">{{addition}}</div>
                </div>
                <i class="ui-icon ui-dialog-close icon-close" @click="onClose()"></i>
            </div>
        </div>

        <div class="ui-dialog-box passwordRetryBox" :class="{'ui-show': isShowErrorProps}" v-show="isShowErrorProps">
            <div class="ui-dialog ui-center ui-noHeader">
                <div class="ui-dialog-body">{{$t('交易密码错误，请重试')}}</div>
                <div class="ui-dialog-footer">
                    <div class="try-agian">
                        <button class="ui-btn" @click="retry()">{{$t('重试')}}</button>
                        <!-- <input type="tel" class="try-agian-input" @click="retry()"> -->
                    </div>
                    <a :href="forgetUrl" class="ui-btn ui-btn-strokeGray">{{$t('忘记密码')}}</a>
                </div>
                <i class="ui-icon ui-dialog-close icon-close" @click="onClose()"></i>
            </div>
        </div>
        <div class="ui-dialog-mask" v-show="isShowPwdProps || isShowErrorProps"></div>
    </div>
</template>


<script>
    let browser = require('@futuweb/tool-browser');

    const {myFutu5} = window._params || {};

    module.exports = {
        props: {
            isShowPwd: {    // 是否显示密码弹窗
                required: false,
                type: Boolean
            },
            pwdValue: {
                required: false,
                type: String,
                default: ''
            },    
            isShowError: {  // 是否显示密码错误提示弹框 
                required: false,
                type: Boolean
            },           
            dtitle: {   // 标题
                required: false,
                type: String
            },            
            notice: {   // 提示文本
                required: false,
                type: String
            },          
            addition: {   // 补充文本
                required: false,
                type: String
            },
            clearPwd: {
                default: false,
                type: Boolean
            },            
            forgetUrl: {   // 忘记密码url
                default: '//' + myFutu5 + '/password/modify-trade-psw#/forget',
                type: String
            }
        },
        data() {
            return {
                isShowPwdProps: this.isShowPwd,
                pwdValueProps: this.pwdValue,
                isShowErrorProps: this.isShowError,
                focused: true,
                ios12: browser.isFTNN() && this.getIosMVersion() >= 12,
                passwordList: [false, false, false, false, false, false],
                isAndroid: browser.isAndroid() ? true : false, //android机子的话，密码框放在页面顶部，防止被键盘挡住  Jin  2018-04-26
                scroll: () => {}
            };
        },
        watch: {
            isShowPwd: {
                handler(value) {
                    this.isShowPwdProps = value;

                    if(value){
                        setTimeout(() => {
                            this.inputFocus();
                        }, 0);
                    } else {
                        this.pwdValueProps = '';
                    }
                    this.updatePassword(this.pwdValueProps);
                    // 显示错误提示框时触发页面滚动，解决密码框键盘收起时提示框按钮错位的问题
                    value && this.scroll();
                }, 
                deep: true
            },

            pwdValue: {
                handler(value) {
                    this.pwdValueProps = value;
                }, 
                deep: true
            },

            isShowError: {
                handler(value) {
                    this.isShowErrorProps = value;
                }, 
                deep: true
            },

            pwdValueProps(value) {
                this.updatePassword(value);
            }
        },
        mounted() {
            // iOS 12+ 版本牛牛 APP 内显示错误提示框（键盘收起）时按钮实际操作位置与显示位置偏移的问题
            if (browser.isFTNN() && this.getIosMVersion() >= 12) {
                this.scroll = () => {
                    setTimeout(()=>{
                        window.scroll();
                    },0);
                };
            }
        },
        methods: {
            onClose() { // 关闭密码回调
                this.isShowPwdProps = false;
                this.isShowErrorProps = false;
                this.$emit('onClose', false);
            },
            onSubmit() {    // 提交密码回调
                this.isShowPwdProps = false;
                this.$emit('onSubmit', this.pwdValueProps);
                if (this.clearPwd) {
                    this.pwdValueProps = '';
                }
            },
            updatePassword(v) {
                this.passwordList = [false, false, false, false, false, false];
                for(let i = 0; v && i < v.length && i < 6; i++){
                    this.passwordList[i] = true;
                }
                if(v && v.length === 6){
                    this.inputBlur();
                    setTimeout(() => {
                        this.onSubmit();
                    }, 100);
                }
            },
            inputFocus(e) {
                if(e){
                    e.stopPropagation();
                }
                let $input = this.$refs.password.querySelector('input[name="txtPassword"]');
                $input.focus();
                this.scroll();
                this.focused = true;
            },
            inputBlur() {
                let $input = this.$refs.password.querySelector('input[name="txtPassword"]');
                $input.blur();
                this.scroll();
                this.focused = false;
            },
            retry() {
                this.$emit('onRetry');
                this.passwordList = [false, false, false, false, false, false];
                setTimeout(() => {
                    this.inputFocus();
                }, 0);
                this.isShowPwdProps = true;
                this.isShowErrorProps = false;
            },
            // 获取 iOS 主版本
            getIosMVersion() {
                let isIos = navigator.userAgent.toLowerCase().match(/cpu \w+ os (.*?) like mac os/);
                return isIos ? isIos[1].split('_')[0] : 0;
            }
        }
    };    
</script>
   

<style scoped>
    .passwordBox.ios12{
        margin-top: 20px;
    }
    /*密码弹框*/
    .passwordBox.android-top{
        margin-top: 0!important;
    }
    .passwordBox .ui-dialog .ui-dialog-body {
        display: block;
        padding: 26px 20px 38px;
        position: relative;
        min-height: 68px;
    }
    .passwordBox .ui-dialog-header-title {
        text-align: center;
        color: #284058;
    }
    .passwordBox .ui-form-item {
        position: relative;
    }
    .passwordBox .ui-form-text {
        padding: 0;
        border-left: 1px solid #C8D0DC;
        border-top: 1px solid #C8D0DC;
        border-right: 1px solid #C8D0DC;
    }
    .passwordBox .ui-form-text:focus {
        border-color: #3378dd;
    }
    .passwordBox .ui-form-tips4error {
        text-align: left;
    }
    .passwordBox .pwdList {
        display: block;
        height: 44px;
        width: auto;
        background: #fff;
        border-top: 1px solid #c8d0dc;
    }
    .passwordBox .pwdList .cell {
        position: relative;
        float: left;
        height: 42px;
        width: 43px;
        box-sizing: border-box;
        border-right: 1px solid #c8d0dc;
        background: #fff;
    }

    .passwordBox .pwdList .cell.cursor .inner {
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -8px 0 0 -1px;
        height: 16px;
        width: 1px;
        background-color: transparent;
        animation: blink 1s infinite;
    }

    @keyframes blink {
        0% {
            background-color: #2D4056;
        }

        50% {
            background-color: #2D4056;
        }

        51% {
            background-color: transparent;
        }

        99% {
            background-color: transparent;
        }

        100% {
            background-color: #2D4056;
        }
    }
    .passwordBox .pwdList .cell:last-child {
        border-right: none;
    }
    .passwordBox .pwdList .cell.dot .inner {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 6px;
        height: 6px;
        margin: -3px 0 0 -3px;
        border-radius: 10px;
        background-color: #284058;
    }

    .passwordBox input{
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        text-indent: -999em;
        font-size: 1px;
        -ms-transform: scale(0);
        -webkit-transform: scale(0);
        -moz-transform: scale(0);
        -o-transform: scale(0);
        transform: scale(0);
        background-color: transparent;
        color: transparent;
    }
    .passwordBox .forgetPwd {
        text-align: right;
    }
    .passwordBox .forgetPwd a {
        font-size: 14px;
    }
    .passwordRetryBox .try-agian{
        position: relative;
        display: inline-block;
    }
    .passwordRetryBox .try-agian .try-agian-input{
        position: absolute;
        z-index: 2;
        left: 6px;
        top: 0;
        width: 1px;
        height: 1px;
        background: transparent;
        border: 0;
        text-indent: -999em;
        color: transparent;
        overflow: hidden;
    }
    .addInfo {
        font-size: 14px;
        height: 14px;
        color: #B0BAC4;
        text-align: center;
        position: relative;
        top: 12px;
    }
    /* 移动端 */
    @media screen and (max-device-width: 768px) {
        .passwordRetryBox .try-agian .try-agian-input{
            width: 128px;
            height: 42px;
        }
    }
</style>
