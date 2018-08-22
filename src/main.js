import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { Loading, Message, MessageBox} from 'element-ui'
import ElementUI from 'element-ui'
import i18n from './i18n/i18n'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import './css/animation.min.css'
import App from './App'
import router from './router'
import './js'
import stores from './store'
import './components'
import './css/index.scss'
import './css/common.scss'
import 'element-ui/lib/theme-chalk/display.css';
import "vue2-scrollbar/dist/style/vue2-scrollbar.css"
import offline from 'offline'
import ScrollBar from 'vue2-scrollbar'
Vue.component('vue-scrollbar', ScrollBar)
Vue.use(Vuex)
Vue.use(ElementUI)
//Vue.config.productionTip = false
Vue.config.devtools = true;
Vue.prototype.$http = axios;
const store = new Vuex.Store(stores)
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
	let href = location.href
	if (!store.getters.getLogin) {
		app.tools.getRoutes(store, router, next, to)
	} else {
		next()
	}
})
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})

axios.interceptors.response.use( (res) => {
	let code = res.data.code || res.data.Code
	let href = location.href
	if (code === '505') {			//重定向
		if (store.getters.getCount === 0) {
			window.location.replace(res.data.Message + '?service=' + href)
		}
		store.commit('setCount', 1)
	}
	return res
})
//初始化
let init = () => {
	cal()
}
function cal () {
	//设置<html>的fontSize，作为rem的基数
	let fontSize = (innerWidth/100).toFixed(0);
	document.getElementsByTagName('html')[0].style.fontSize = fontSize + 'px'
	let sideBarWidth = 15*fontSize < 145 ? 145 : 15*fontSize
	store.commit('setBannerHeight', (innerWidth-sideBarWidth-60)/5.23)
	store.state.windowHeight = window.screen.availHeight - 200;
	store.state.innerHeight = window.innerHeight - 60;
	if (innerWidth < 500) {
		store.commit('setLabelPosition', 'top');
	} else {
		store.commit('setLabelPosition', 'left');
	}
}
window.onresize = function () {
	cal()
}
init()