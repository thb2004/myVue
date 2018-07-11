/**
 * 负责引入与安装各组件
 */

import Vue from 'vue'

import * as vHeader from './header'
import * as vLeftMenu from './leftMenu'
import * as vMainHeader from './mainHeader'
import * as vRouterView from './routerView'
import * as vForm from './form'
import * as vTable from './table'
import * as vLoading from './loading'
const cmps = {
	...vHeader,			// 标题栏
	...vLeftMenu,		// 侧边栏
	...vMainHeader,		// 主页头部
	...vRouterView,		// 路由组件
	...vForm,			//表单组件
	...vTable,			//table组件
	...vLoading,			//加载框组件
}


for (let i in cmps) {
  Vue.component(i, cmps[i])
}