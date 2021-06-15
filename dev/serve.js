import Vue from 'vue';
import Dev from './serve.vue';
import vuetify from "./plugins/vuetify";

import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
Vue.config.productionTip = false;

import VueHighlightJS from 'vue-highlightjs'
Vue.use(VueHighlightJS);


new Vue({
	vuetify,
  render: (h) => h(Dev),
}).$mount('#app');
