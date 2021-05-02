import Vue from 'vue'
import App from './App.vue'
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

Vue.use(VueMaterial);

Vue.config.productionTip = false

Vue.config.errorHandler = (err) => {
  if (process.env.NODE_ENV !== 'production') {
    // Show any error but this one
    if (err.message !== "Cannot read property 'badInput' of undefined") {
      console.error(err);
    }
  }
};

new Vue({
  render: h => h(App),
}).$mount('#app')
