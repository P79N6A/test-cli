import Vue from 'vue';
import Vuex from 'vuex';

import dialog from '../../modules/dialog';
import loading from '../../modules/loading';
import lightDialog from '../../modules/light-dialog';

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        dialog,
        loading,
        lightDialog
    }
});
