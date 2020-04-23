import '../node_modules/chota/dist/chota.min.css';

import { ValidationObserver, ValidationProvider } from 'vee-validate';
import Vue from 'vue';

import App from './App.vue';
import router from './router';
import { formatDate } from './shared/date-util';
import store from './store';
import i18n from './i18n';

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

Vue.filter("date", formatDate);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
