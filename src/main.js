// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import Handle from './components/Handle'
import Foot from './components/Foot'
import select from './components/select'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
  error:'../static/images/imgerror.png',
  loading:'../static/images/index.svg',
})

Vue.config.productionTip = false
 Vue.prototype.$axios =Axios
Vue.component('Handle',Handle)
Vue.component('Footer',Foot)
Vue.component('select-input',select)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
