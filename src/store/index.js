export default {
	state: {
		count: 0,
		plugins: { // 插件状态
			loading: { // 加载框
				show: false, // 加载框是否已显示
				text: '' // 显示文字
			}
		},
		labelWidth: '14rem',
		isLogin: false,
		labelPosition: 'left',
		username: '',		//用户姓名
		windowHeight: 0,
		innerHeight: 0,
		bannerHeight: '350',
		pages: { // 路由页面对象
			home: 'firstHomeContent', // 设置首页路由模块
			navbarIndex: 0, // 页导航栏下标
			back: null, // 设定的返回页面
			to: '', // 去的页面
			from: '', // 来的页面
			stack: [], // 页面栈
			keepAlive: [], // 要缓存的页面栈
			status: true, // 页面跳转状态 true为新面页  false为返回页面
			transitiont: 'slide', // 页面过度效果用的是Animate.css动态库
			params: {}, // 页面参数
			menuList: [],
			leftMenuObj: {},
		},
	},
	actions: {},

	getters: {
		/**
		 * 获取页面对象
		 * @AuthorHTL
		 * @DateTime  2018-04-17T10:27:01+0800
		 * @param     {state}                 state vuex状态对象
		 */
		getPages(state) {
			return state.pages;
		},
		getCount (state) {
			return state.count;
		},
		getLogin (state) {
			return state.isLogin
		},
		/**
		 * 获取缓存的页面
		 * @AuthorHTL
		 * @DateTime  2018-04-17T10:28:17+0800
		 * @param     {state}                 state vuex状态对象
		 */
		getKeepAlive(state) {
			return state.pages.home + ',' + state.pages.keepAlive.join(',')
		},
		
		getNavbarIndex (state) {
			return state.pages.navbarIndex
		}
	},

	mutations: {
		setBannerHeight (state, height) {
			state.bannerHeight = height
		},
		setLabelPosition (state, labelPosition) {
			state.labelPosition = labelPosition
		},
		
		setLeftMenuObj (state, obj) {
			state.pages.leftMenuObj = obj
		},
		setMenuList (state, arr) {
			state.pages.menuList = arr
		},
		setUsername (state, username) {
			state.username = username
		},
		/**
		 *
		 * 改变插件显示状态
		 * @param {any} state
		 * @param {any} {
		 *       type,
		 *       val
		 *     }
		 */
		setPluginStatu(state, {
			name,
			config
		}) {
			switch (name) {
				case 'loading':
					state.plugins.loading = config
					break
			}
		},
		/**
		 * 修改页面参数
		 * @param {any} state 
		 * @param {any} {
		 *       key,
		 *       params
		 *     } 
		 */
		setPagesParams(state, {
		  key,
		  params
		}) {
		  state.pages.stack[key].params = params
		},
		/**
		 * 设置页面参数
		 * @AuthorHTL
		 * @DateTime  2018-04-16T13:23:22+0800
		 * @param     {state}                 	vuex状态对象
		 * @param     {params}                	{object} params  页面传递的参数
		 * @param     {transitiont}            	{object} transitiont  页面跳转动画
		 * @param     {back}                  	{object} back  设定的返加页面
		 */
		setPages(state, {
			params,
			transitiont,
			back
		}) {
			if (params) state.pages.params = params;
			if (transitiont) state.pages.transitiont = transitiont;
			if (back) state.pages.back = back;
		},
		/**
		 * 清空页面栈
		 * @param {any} state vuex状态对象
		 */
		clearPagesStack(state) {
			state.pages.stack = []
		},
		/**
		 * 设置页面keepAlive的处理
		 * @AuthorHTL
		 * @DateTime  2018-04-16T13:23:22+0800
		 * @param     {state}                 	vuex状态对象
		 * @param     {any}                		name页面名称
		 * @param     {any}            			isKeepAlive 是否缓存页面 true为缓存 false为从缓存中去除
		 */
		setKeepAlive(state, {
			name,
			isKeepAlive
		}) {
			//数组中是否包含该元纯素
			let check = state.pages.keepAlive.contains(name);
			if (isKeepAlive) {
				// 不存在时插入到 keepAlive数组
				if (!check) state.pages.keepAlive.push(name)
			} else {
				//存在则移除
				if (check) state.pages.keepAlive.remove(name)
			}
		},
		/**
		 * setPageStack 更新页面栈
		 * @param {any} state vuex状态对象
		 * @param {object} to  去的页面对象
		 * @param {object} from 来的页面对象
		 */
		setPageStack(state, {to, from}) {
			state.pages.to = to.name
			state.pages.from = from.name

			// 判断新页面或已存在页面默认为新页面
			let newPage = true
			state.pages.stack.forEach((item, index, items) => {
				// 如果页面已存在为返回效果
				if (item.name === state.pages.to) {
					newPage = false
					state.pages.status = false
					// 将页面移出页面栈
					state.pages.stack.splice(index + 1)

					// state.pages.index -= 1
					state.pages.index < 1 ? state.pages.index = 0 : state.pages.index -= 1
					return false
				}
			})
			// 将新面页插入到页面栈 但首页模块不存入页面栈
			if (newPage && to.name !== state.pages.home) {
				// 读取路由的meta.keepAlive信息 如果 keepAlive等于true时就缓存页面
				// console.log(to.meta.keepAlive + "/////////" + to.name + "//////////88888888888888")
				if (to.meta.keepAlive) {
					/*if (state.pages.keepAlive.join(',').indexOf(to.name + ',') === -1) {
					   state.pages.keepAlive.push(to.name)
					 } */
					if (!state.pages.keepAlive.contains(to.name)) {
						state.pages.keepAlive.push(to.name)
					}
				}

				// 更新当前索引
				let index = state.pages.stack.length
				state.pages.index = index

				// 页面对象
				let pages = {
					name: state.pages.to, // 新页面路由名称
					path: to.path, // 新页面路径
					params: state.pages.params, // 页面参数
					from: from.name, // 来的面页对象
					index: index, // 面页索引
					back: state.pages.back, // 设定的返回页面
					keepAlive: false // 面页缓存
				}
				state.pages.status = true
				state.pages.back = null
				// 将页面添加到页面栈
				state.pages.stack.push(pages)
			}
		},
		/**
		 * 修改头部导航栏索引
		 * @AuthorHTL
		 * @DateTime  2018-04-16T18:45:54+0800
		 * @param     {[Number]}                 index [头部导航栏下标索引]
		 */
		setNavbarIndex(state, index) {
			state.pages.navbarIndex = index
		},

		setCount (state, count) {
			state.count = count
		},
		setLogin (state, isLogin) {
			state.isLogin = isLogin
		}
	},
}