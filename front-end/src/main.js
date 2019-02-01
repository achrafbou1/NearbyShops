import Vue from 'vue';
import './plugins/vuetify';
import Vuelidate from 'vuelidate';
import VueFlashMessage from 'vue-flash-message';
import App from './App.vue';
import router from './router';
import store from './store';


require('vue-flash-message/dist/vue-flash-message.min.css');

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(VueFlashMessage);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
