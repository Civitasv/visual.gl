import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/Router.js'
import "@/assets/css/app.css"
import vuetify from '@/plugins/vuetify'
Vue.config.productionTip = false


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
