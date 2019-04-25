import Vue from 'vue';
import VueI18n from 'vue-i18n';

{{#cssUi}}
import '@futuweb/css-ui';
{{/cssUi}}
import '../scss/layout.scss';
import '../scss/history.scss';
import historyApp from '../components/history/index.vue';
import store from '../components/history/store';

Vue.config.productionTip = false;

Vue.use(VueI18n);

const i18n = new VueI18n({locale: window._i18n.locale});

new Vue({
    el: '#historyApp',
    i18n,
    store,
    render: h=>h(historyApp)
});
