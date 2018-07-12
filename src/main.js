
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { Loading, Message, MessageBox} from 'element-ui'
import ElementUI from 'element-ui'
import i18n from './i18n/i18n'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import 'vue2-animate/dist/vue2-animate.min.css'
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
import $ from 'jquery'
import qs from 'qs'
import offline from 'offline'
import ScrollBar from 'vue2-scrollbar'
Vue.component('vue-scrollbar', ScrollBar)
console.log('thb2345')
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.prototype.$qs = qs;
const store = new Vuex.Store(stores)
let count = 0 
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
	store.commit('setLeftMenuList', window.localStorage.getItem('userLevel'))
	Message.closeAll()
	if (offline()) {
		Message.warning({
			title: '警告',
          	message: '网络异常,请先检查网络',
          	duration: 1500,
		})
	}
	if (to.meta.requireAuth) { 			// 判断该路由是否需要登录权限
		if (store.getters.getLogin) {	//已经登录，判断是否会话已过期
			if (from.name === 'login') {						//从登陆页面过来。不需校验token
				next();
			} else {
				axios.get('/adm/v1/validatetoken?' + new Date().getTime()).then(res => {
					if (res.data.Code === '505') {	//会话过期
						MessageBox.alert('会话已过期，请重新登录', {
							title: '提示',
							type: 'warning',
							callback: (action, instance) => {
								next({
									path: '/',
								})
							}
						})
					} else {
						next();
					}
				}).catch(err => {
					next();
				})
			}
		} else {					//未登录，跳转到登录页
			next({
				path: '/',
			})
		}	
	} else {
		next();
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
// http响应拦截器
axios.interceptors.response.use(response => {
	let code = response.data.code || response.data.Code
	if (code === '505') {		//会话过期
		count === 0 && MessageBox.alert('会话已过期，请重新登录', {
			title: '提示',
			type: 'warning',
			callback: (action, instance) => {
				count = 0
				router.replace({
					path: '/'
				})
			}
		})
		count = 1
	} else {
		return response
	}
}, error => {
	return Promise.reject(error)
})
//初始化
let init = () => {
	//设置<html>的fontSize，作为rem的基数
	let fontSize = (innerWidth/100).toFixed(0);
	document.getElementsByTagName('html')[0].style.fontSize = fontSize + 'px'
	let sideBarWidth = 15*fontSize < 145 ? 145 : 15*fontSize
	store.commit('setBannerHeight', (innerWidth-sideBarWidth-60)/5.23)
	if (innerWidth < 500) {
		store.commit('setLabelPosition', 'top');
	} else {
		store.commit('setLabelPosition', 'left');
	}
}
init()