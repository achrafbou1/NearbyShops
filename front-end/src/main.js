import Vue from 'vue';
import './plugins/vuetify';
import Vuelidate from 'vuelidate';
import VueFlashMessage from 'vue-flash-message';
import VueCookies from 'vue-cookies';
import App from './App.vue';
import router from './router';


require('vue-flash-message/dist/vue-flash-message.min.css');

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(VueFlashMessage);
Vue.use(VueCookies);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
