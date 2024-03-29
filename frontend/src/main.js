import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.config.ignoredElements = ["xml", "block"];

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
