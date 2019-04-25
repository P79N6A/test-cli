<template>
    <div class="loading" :class="{show:loading.isShow}">
        <div class="ui-toast ui-toast-status">
            <div class="ui-toast-wrapper">
                <i class="iconLoading"></i>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        name: 'ui-loading',
        computed:mapState(['loading'])
    };
</script>


<style lang="scss">
.loading{
    position: fixed;
    top: -200px;
    left: 50%;
    z-index: 9999;
    margin-left: -60px;
    -webkit-transition: all .4s;
    transition: all .4s;
    &.show{
        top:30%;
    }
}
</style>
