/**
 * app操作核心类
 * @example app.go()
 */
import axios from 'axios'
export default {
	serverUrl: process.env.serverUrl, // 服务器请求地址
	/**
	 * 首页跳转
	 * @param {string} [transition='slide']
	 * @param {boolean} [clear=true]
	 */
	goLogin(transition = 'slide', clear = true) {
		// 清空页面栈
		if (clear) $root.$store.commit('clearPagesStack')
		// 登录路由名称
		let login = $root.$store.getters.getPages.login
		$root.$router.replace({
			path: '/'
		})
		

	},
	go ({
		path,
		params,
		back = null,
		transition = 'slide',
		isKeepAlive = false,
		replace
	}) {
		//参数是否是字符串
		if (typeof arguments[0] === 'string') path = arguments[0];
		path.indexOf('/') === -1 ? path = {
			name: path
		} : path = {
			path: path
		}

		// 设置页面参数
		$root.$store.commit('setPages', {
			params,
			transition,
			back,
		})

		//设置页面缓存信息
		$root.$store.commit('setKeepAlive', {
			name: path.name,
			isKeepAlive,
		})

		//页面跳转
		$root.$router.push(path)
		
	},

	/**
	 * 页面跳转返回
	 * @param {number|string} back 返回参数
	 * @param {object} params 返回参数
	 * @example app.back() 默认返回前一页
	 *          app.back(-2) 数字时为后退步数
	 *          app.back('demoList') 根据 路由页面名称 返回相应的页面
	 *          app.back('/demo/list') 根据 路径 返回相应的页面
	 *          app.back({id:1}) 如果参数为对象时，将参数传给返回页
	 *          app.back("dome",{id:1}) 返回到 为页面传参
	 */
	back() {
	  let pages = $root.$store.getters.getPages // 获取vuex的页面对象
	  let back = null
	  let step = -1 // 后退步数
	  let params
	  typeof arguments[0] === 'object' ? params = arguments[0] : back = arguments[0]
	  if (arguments.length === 2) params = arguments[1]
	  // 优先处理预先设置的返回页面
	  // if (pages.back) back = pages.back
	  if (!back) {
	    // 如果没输入步数就查找一下有没预设的返回
	    pages.stack.forEach((item) => {
	      if (pages.to === item.name) {
	        // 计算后退步数
	        back = item.back
	      }
	    })
	  }
	  if (back) {
	    // 传入的参数为字符串
	    if (typeof back === 'string') {
	      // 判断是路由名称或者是路径
	      let isPath = (back.indexOf('/') === -1) ? false : true
	      // 根据名称或路由获取页面索引
	      pages.stack.forEach((item) => {
	        let name = isPath ? item.path : item.name
	        if (name === back) {
	          // 计算后退步数
	          step = -(pages.index - item.index)
	        }
	      })
	    } else if (typeof back === 'number') {
	      step = back
	    }
	  }
	  // 传参数
	  if (params) {
	    // 修改默认页面的参数
	    $root.$store.commit('setPages', {
	      params: params
	    })
	    // 修改页面栈对应页面的参数
	    $root.$store.commit('setPagesParams', {
	      key: pages.index - (-step),
	      params: params
	    })
	  }
	  $root.$router.go(step)
	},

	/**
   * 公用的post请求函数
   * @param {String} url  url地址
   * @param {Object} params  传的数据对象
   * @param {Function} successFn  执行成功的函数
   * @param {Function} errFn  执行成功的函数
   * @param {Boolean} loading=[true|false]  是否显示加载框
   * @example  app.post("url", {data:1},function(data){},function(err){})   // 显示加载框
   *           app.post("url", {data:1},function(data){},function(err){},false) // 不显示加载框
   */
  post(url, params, successFn, errFn, loading = true, showText) {
    if (loading) app.plugin.loading.show(showText)
    if (Object.keys(params).length === 0) {
    	axios.post(url + '?' + new Date().getTime()).then(data => {
    	  if (successFn) successFn(data)
    	  if (loading) app.plugin.loading.hide()
    	}).catch(data => {
    	  if (errFn) errFn(data)
    	  if (loading) app.plugin.loading.hide()
    	})
    } else {
    	axios.post(url + '?' + new Date().getTime(), params).then(data => {
    	  if (successFn) successFn(data)
    	  if (loading) app.plugin.loading.hide()
    	}).catch(data => {
    	  if (errFn) errFn(data)
    	  if (loading) app.plugin.loading.hide()
    	})
    }
    
  }
}