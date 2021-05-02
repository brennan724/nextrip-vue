import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'

Vue.config.productionTip = false


new Vue({
  vuetify,
  el: "#app",
  components: { App },
  template: "<App/>",
  render: h => h(App)
})

// new Vue({
//   render: h => h(App),
// }).$mount('#app')


// new Vue({
//   vuetify,
//   render: h => h(App),
// }).$mount('#app')
