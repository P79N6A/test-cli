<template>
    <div class="dialog" v-show="dialog.isShow">
        <div class="ui-dialog-box">
            <div class="ui-dialog">
                <div class="ui-dialog-header">
                    <h3 class="ui-dialog-header-title">{{dialog.title}}</h3>
                </div>
                <div class="ui-dialog-body">
                    <div class="ui-dialog-content">
                        {{dialog.message}}
                    </div>
                </div>
                <div class="ui-dialog-footer">
                    <button class="ui-btn ui-btn-strokeGray" v-if="dialog.isCancel" @click="canlFunc">{{dialog.canl}}</button>
                    <button class="ui-btn" @click="subFunc">{{dialog.sub}}</button>
                </div>
                <i class="iconfont icon-close" @click="canlFunc"></i>
            </div>
        </div>
        <div class="ui-dialog-mask"></div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        name: 'ui-dialog',
        computed:mapState(['dialog']),
        methods:{
            canlFunc(){
                let canlBack = this.dialog.canlBack;
                let canlBackData = this.dialog.canlBackData || undefined;
                this.$store.commit('hideDialog');
                if ( canlBack ){
                    canlBack(canlBackData);
                }
            },
            subFunc(){
                let callBack = this.dialog.callBack;
                let callBackData = this.dialog.callBackData || undefined;
                this.$store.commit('hideDialog');
                if ( callBack ){
                    callBack(callBackData);
                }
            }
        }
    };
</script>

<style lang="scss">
    .dialog .ui-dialog-box{
        z-index: 9999;
    }
    .dialog .ui-dialog-mask{
        z-index: 9998;
    }
</style>
