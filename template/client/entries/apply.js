import Vue from 'vue';
import VueI18n from 'vue-i18n';
{{#cssUi}}
import '@futuweb/css-ui';
{{/cssUi}}
import '../scss/layout.scss';
import '../scss/apply.scss';
import store from '../components/apply/store';
import router from '../components/apply/router';

Vue.config.productionTip = false;

Vue.use(VueI18n);

const i18n = new VueI18n({locale: window._i18n.locale});

new Vue({
    el: '#applyApp',
    i18n,
    store,
    router,
    // render: h=>h(applyApp)
});
