import '../node_modules/chota/dist/chota.min.css';

import moment from 'moment';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import Vue from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

Vue.filter("date", (date: Date, format: string): string => {
  if (!date) {
    return "Not set";
  } else {
    format = format ? format : "L";
    return moment(date).format(format);
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
