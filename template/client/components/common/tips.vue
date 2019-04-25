<template>
    <div class="ui-notice tips-wrapper">
        <i class="ui-icon icon-warningb ui-notice-icon" @click="show"></i>
        <div class="ui-notice-wrapper" :class="{'ui-open':isShow}">
            <div class="ui-notice-content">
                <i class="ui-icon icon-close ui-notice-close" @click="hide"></i>
                <p class="ui-notice-text" v-html="tipsTxt"></p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ui-tips',
        props:['tipsTxt'],
        data(){
            return {
                isShow: false
            }
        },
        methods:{
            show:function(){
                this.isShow = true;
            },
            hide:function(){
                this.isShow = false;
            }
        }
    };
</script>
<style lang="scss" scoped>
    .tips-wrapper{
        position:relative;
        display:inline-block;
    }
</style>

