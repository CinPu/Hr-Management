import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/store'
import VeeValidate from 'vee-validate'
import Vuetify from 'vuetify';
import MultiFiltersPlugin from './plugins/MultiFilters'

Vue.use(Vuetify)
Vue.use(VeeValidate)
Vue.use(MultiFiltersPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
