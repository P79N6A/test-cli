<template>
    <div class="light-dialog ui-toast" :class="{show:lightDialog.isShow}">{{lightDialog.message}}</div>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        name: 'ui-light-dialog',
        computed: mapState(['lightDialog'])
    };
</script>


<style lang="scss">
.light-dialog{
    position: fixed;
    top: 30%;
    left: 50%;
    z-index: 9998;
    display: block;
    width: 0;
    height: 0;
    line-height: 1.5;
    padding: 0;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    -webkit-transition: all .2s;
    transition: all .2s;
    &.show{
        top: 40%;
        min-width: 240px;
        padding: 14px;
        width: auto;
        height: auto;
    }
}
</style>
