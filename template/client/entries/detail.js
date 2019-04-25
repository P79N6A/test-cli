import Vue from 'vue';
import VueI18n from 'vue-i18n';

{{#cssUi}}
import '@futuweb/css-ui'
{{/cssUi}}
import '../scss/layout.scss';
import '../scss/detail.scss';
import detailApp from '../components/detail/index.vue';
import store from '../components/detail/store';

Vue.config.productionTip = false;

Vue.use(VueI18n);

const i18n = new VueI18n({locale: window._i18n.locale});

new Vue({
    el: '#detailApp',
    i18n,
    store,
    render: h=>h(detailApp)
});
