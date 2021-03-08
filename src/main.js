import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'

//引入swiper
import 'swiper/dist/js/swiper'
import 'swiper/dist/css/swiper.min.css'

import Mint from 'mint-ui'
import 'mint-ui/lib/style.min.css'  //需要单独引入CSS
Vue.use(Mint);

import axios from 'axios'
import newAxios from '@/components/JS/NewAxios'
Vue.prototype.axios = axios
Vue.prototype.newAxios = newAxios

Vue.filter('getActors',(data) => {
  var actors = data.map(item => item.name)
  return actors.join(' ')
});

import Scroll from './components/Scroll';
Vue.component('Scroll',Scroll);

import Loading from './components/Loading';
Vue.component('Loading',Loading);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
