
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
import $ from 'jquery'
import qs from 'qs'
import offline from 'offline'
import ScrollBar from 'vue2-scrollbar'
Vue.component('vue-scrollbar', ScrollBar)
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.prototype.$qs = qs;
const store = new Vuex.Store(stores)
let path = '';				//记录页面刷新时候url redirec所带的路径；例如？redirect=/home/firstHomeContent
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
	!path && (path = to.fullPath)
	Message.closeAll()
	if (offline()) {
		Message.warning({
			title: '警告',
          	message: '网络异常,请先检查网络',
          	duration: 1500,
		})
	}
	if (to.meta.requireAuth) { 
		let userLevel = store.getters.getUserLevel										// 判断该路由是否需要登录权限
		if (from.name === 'login' && userLevel) {	//从登陆页面过来。不需校验token
			if (userLevel === '1') {								//1代表dba权限,需不展示云管理平台
				if (to.name === 'authorityCenter') {
					next({ 
						path: '/home/firstHomeContent',
					})
					return;
				}
			} else if (userLevel === '2' || (userLevel === '3')) {	//2/3代表一般用户权限
				let noAuthorArr = [
					'workMange', 
					'MYSQLMange','NosqlMange','dataSetsMange',
					'MySqlCopyMange','backMange','DMLDDL',
					'authorityCenter', 
					'VirtualMachineApply', 'linuxMangeFirstPage','automationFirstPage',
					'LinuxBatchInitFirstPage','netMangeAutoView','IPList',
					'netVlanList','LinuxBatchStandardizationFirstPage',
					'otherFirstPage','history','secondHomeContent'
				]
				if (noAuthorArr.indexOf(to.name) != -1) {
					next({
						path: '/home/firstHomeContent',
					})
					return;
				}
			} else if (userLevel === '4') {
				let noAuthorArr = [
					'workMange', 
					'MYSQLMange','NosqlMange','dataSetsMange',
					'MySqlCopyMange','backMange','DMLDDL',
					'authorityCenter', 
					'linuxMangeFirstPage','automationFirstPage',
					'LinuxBatchInitFirstPage','netMangeAutoView','IPList',
					'netVlanList','LinuxBatchStandardizationFirstPage',
					'otherFirstPage','history',
				]
				if (noAuthorArr.indexOf(to.name) != -1) {
					next({
						path: '/home/firstHomeContent',
					})
					return;
				}
			}
			next();
		} else {
			axios.post('/adm/v1/getuserinfo?' + new Date().getTime()).then(res => {
				if (res.data.Code === '505') {	//会话过期
					next({						//query用来记录当前页面，，以便重新登录时候跳转到该页面
						path: '/',
						query: {
							redirect: path
						}
					})
				} else {
					let data = res.data.Data || {}
					let userLevel = data.userlevel;		//用户等级
					let cnname = data.cnname;			//登录中文名
					let mipAccount = data.username;		//登录mip账号
					//if (!store.getters.getUserLevel) {	//如果userlevel存在代表已经登录
					if (userLevel === '1') {
						if (to.name === 'authorityCenter') {
							next({ //1代表dba权限,需不展示云管理平台
								path: '/page404',
							})
							return;
						}
					} else if (userLevel === '2' || (userLevel === '3')) {			//2/3代表一般用户权限
						let noAuthorArr = [
							'workMange', 
							'MYSQLMange','NosqlMange','dataSetsMange',
							'MySqlCopyMange','backMange','DMLDDL',
							'authorityCenter', 
							'VirtualMachineApply', 'linuxMangeFirstPage','automationFirstPage',
							'LinuxBatchInitFirstPage','netMangeAutoView','IPList',
							'netVlanList','LinuxBatchStandardizationFirstPage',
							'otherFirstPage','history','secondHomeContent'
						]
						if (noAuthorArr.indexOf(to.name) != -1) {
							next({
								path: '/page404',
							})
							return;
						}
					} else if (userLevel === '4') {
						let noAuthorArr = [
							'workMange', 
							'MYSQLMange','NosqlMange','dataSetsMange',
							'MySqlCopyMange','backMange','DMLDDL',
							'authorityCenter', 
							'linuxMangeFirstPage','automationFirstPage',
							'LinuxBatchInitFirstPage','netMangeAutoView','IPList',
							'netVlanList','LinuxBatchStandardizationFirstPage',
							'otherFirstPage','history',
						]
						if (noAuthorArr.indexOf(to.name) != -1) {
							next({
								path: '/page404',
							})
							return;
						}
					}
					userLevel && store.commit('setUserLevel', userLevel)
					mipAccount && store.commit('setUsername', mipAccount)
					cnname && store.commit('setCnname', cnname)
					userLevel && store.commit('setMenuList', userLevel)
					userLevel && store.commit('setLeftMenuList', userLevel)
					//}
					next();
				}
			}).catch(err => {
				next();
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
	if (code === '505') {													//会话过期
		store.getters.getCount === 0 && router.replace({
			path: '/',
			query: {
				redirect: path
			}
		})
		store.commit('setCount', 1)
	}
	return response
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