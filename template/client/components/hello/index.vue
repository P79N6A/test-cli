<i18n>
{
    "zh-cn": {
        "您好，富途证券":"您好，富途证券！"
    },
    "zh-hk":{
        "您好，富途证券": "您好，富途證券！"
    },
    "en-us":{
      "您好，富途证券": "Hello, Futu Holiding.",
    }
}
</i18n>
<template>
  <div class="wrapper hello-container">
      {{$t('您好，富途证券')}}
  </div>
</template>

<script>
{{#xhr}}
import * as xhr from '@futuweb/tool-xhr2';
{{/xhr}}
import formatNumber from '../../utils/format-number';
import formatDate from '../../utils/format-date';

import {checkResponse , handlerError} from '../../lib/response';
import getUrlKey from '../../utils/get-url-key';

import uiLoading from '../common/loading.vue';
import uiDialog from '../common/dialog.vue';
import uiLightDialog from '../common/light-dialog.vue';

const myFutu5 = _params.myFutu5 || 'my.futu5.com';

export default {
    name: 'ipo-hello',
    data(){
        return {
            myFutu5,
            isDetail: false,
            isCanceling: false,
            isShowExpense: false,
            isCanOperateTime: 0,
            detail: {},
        };
    },
    methods:{
        formatDate,
        formatNumber
    },
    mounted(){
        let self = this;
    }
};
</script>
