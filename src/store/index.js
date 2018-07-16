export default {
	state: {
		count: 0,
		plugins: { // 插件状态
			loading: { // 加载框
				show: false, // 加载框是否已显示
				text: '' // 显示文字
			}
		},
		labelPosition: 'left',
		userLevel:  '',		//用户级别
		username: '',		//用户姓名
		cnname: '',		   //用户中文姓名 
		windowHeight: 0,
		innerHeight: 0,
		bannerHeight: '350',
		pages: { // 路由页面对象
			home: 'firstHomeContent', // 设置首页路由模块
			login: 'login',
			navbarIndex: 0, // 页导航栏下标
			back: null, // 设定的返回页面
			to: '', // 去的页面
			from: '', // 来的页面
			stack: [], // 页面栈
			keepAlive: [], // 要缓存的页面栈
			status: true, // 页面跳转状态 true为新面页  false为返回页面
			transitiont: 'slide', // 页面过度效果用的是Animate.css动态库
			params: {}, // 页面参数
			title: '首页', //main页面头部内容
			activeName: '0', //折叠菜单活动项索引
			tabIndex: 0, //一级菜单索引
			childTabIndex: -1, //一级菜单下的子菜单索引
			mainHeadTitle: {
				firstHomeContent: {
					index: 0,
				},
				X86ResourceFirstPage: {
					title: '资源申请变更',
					childTitle: 'x86资源',
					index: 0,
				},
				openResourceFirstPage: {
					title: '资源申请变更',
					childTitle: '开源数据库资源',
					index: 0,
				},
				/*copyApplyFirstPage: {
					title: '资源申请变更',
					childTitle: '备份资源',
					index: 0,
				},*/
				resourceSaveApplyFirstPage: {
					title: '资源申请变更',
					childTitle: '存储资源',
					index: 0,
				},
				middleResourceFirstPage: {
					title: '资源申请变更',
					childTitle: '中间件资源',
					index: 0,
				},
				IPResourceFirstPage: {
					title: '资源申请变更',
					childTitle: 'IP资源',
					index: 0,
				},
				myMattersFirstPage: {
					title: '我的事项',
					index: 0,
				},
				workMange: {
					title: '工单管理',
					index: 0,
				},
				myMattersProcessingList: {
					index: 0,
				},
				/*sysMange: {
					title: '系统管理',
					index: 0,
				},*/
				secondHomeContent: {
					index: 1,
				},
				VirtualMachineApply: {
					title: '虚拟化管理',
					index: 1,
				},
				LinuxBatchInitFirstPage: {
					title: 'Linux系统初始化',
					index: 1,
				},
				linuxMangeFirstPage: {
					title: 'Linux批量管理',
					index: 1,
				},
				netMangeAutoView: {
					title: '网络管理',
					index: 1,
				},
				IPList: {
					title: '网络管理',
					index: 1,
				},
				netVlanList: {
					title: '网络管理',
					index: 1,
				},
				LinuxBatchStandardizationFirstPage: {
					title: 'Linux批量标准化',
					index: 1,
				},
				automationFirstPage: {
					title: '监控自动化',
					index: 1,
				},
				history: {
					title: '历史记录',
					index: 1,
				},
				otherFirstPage: {
					title: '其他',
					index: 1,
				},
				threeHomeContent: {
					index: 2,
				},
				selfService: {
					title: '自助服务',
					index: 2,
				},
				slowSQL: {
					title: '慢SQL监控',
					index: 2,
				},
				MYSQLMange: {
					title: 'MySQL管理',
					index: 2,
				},
				NosqlMange: {
					title: 'NoSQL管理',
					index: 2,
				},
				dataSetsMange: {
					title: '数据库集群管理',
					index: 2,
				},

				DMLDDL: {
					title: 'DDL/DML操作',
					index: 2,
				},

				MySqlCopyMange: {
					title: 'MySQL备份恢复管理',
					index: 2,
				},
				performanceStatistics: {
					title: '性能统计及报表',
					index: 2,
				},
				platformGuide: {
					title: '平台自助流程指引',
					index: 2,
				},
				backMange: {
					title: '后台管理',
					index: 2,
				},
				authorityCenter: {
					title: '平台用户授权',
					index: 3,
				},

			},
			menuList: [{
				text: '云资源平台',
				isShow: true,
			},{
				text: '云系统平台',
				isShow: true,
			},{
				text: '云数据库平台',
				isShow: true,
			}, {
				text: '云管理平台',
				isShow: true,
			},{
				text: '云容器平台',
				isShow: true,
			}],
			leftMenuList: [
				[{
						text: '首页',
						name: 'firstHomeContent',
						path:'firstHomeContent',
						icon: require('../assets/images/home.png'),
						blueIcon: require('../assets/images/blueHome.png'),
					}, {
						text: '资源申请变更',
						value: [{
							text: 'x86资源',
							name: 'X86ResourceFirstPage',
						}, {
							text: '开源数据库资源',
							name: 'openResourceFirstPage'
						}, /*{
							text: '备份资源',
							name: 'copyApplyFirstPage'
						},*/ {
							text: '存储资源',
							name: 'resourceSaveApplyFirstPage'
						}, {
							text: '中间件资源',
							name: 'middleResourceFirstPage'
						}, {
							text: 'IP资源',
							name: 'IPResourceFirstPage'
						}],
						isAccordion: true,
						icon: require('../assets/images/resource.png'),
						blueIcon: require('../assets/images/blueResource.png'),
					},

					{
						text: '我的事项',
						name: 'myMattersFirstPage',
						icon: require('../assets/images/matters.png'),
						blueIcon: require('../assets/images/blueMatters.png'),
					}, {
						text: '工单管理',
						name: 'workMange',
						icon: require('../assets/images/workOrder.png'),
						blueIcon: require('../assets/images/blueWorkOrder.png'),
						isShow: true
					}, /*{
						text: '系统管理',
						name: 'sysMange',
						icon: require('../assets/images/sysMange.png')
					},*/
				],
				[{
						text: '首页',
						name: 'secondHomeContent',
						icon: require('../assets/images/home.png'),
						blueIcon: require('../assets/images/blueHome.png'),
					}, {
						text: '虚拟化管理',
						name: 'VirtualMachineApply',
						icon: require('../assets/images/virtual.png'),
						blueIcon: require('../assets/images/blueVirtual.png'),
					}, {
						text: 'Linux系统初始化',
						name: 'LinuxBatchInitFirstPage',
						icon: require('../assets/images/init.png'),
						blueIcon: require('../assets/images/blueInit.png'),
						isShow: true

					}, {
						text: 'Linux批量管理',
						name: 'linuxMangeFirstPage',
						icon: require('../assets/images/batchMange.png'),
						blueIcon: require('../assets/images/blueBatchMange.png'),
						isShow: true

					}, {
						text: '网络管理',
						name: 'netMangeAutoView',
						icon: require('../assets/images/netMange.png'),
						blueIcon: require('../assets/images/blueNetMange.png'),
						isShow: true

					}, {
						text: 'Linux批量标准化',
						name: 'LinuxBatchStandardizationFirstPage',
						icon: require('../assets/images/batchStandardization.png'),
						blueIcon: require('../assets/images/blueBatchStandardization.png'),
						isShow: true
					}, {
						text: '监控自动化',
						name: 'automationFirstPage',
						icon: require('../assets/images/automation.png'),
						blueIcon: require('../assets/images/blueAutomation.png'),
						isShow: true
					}, {
						text: '历史记录',
						name: 'history',
						icon: require('../assets/images/history.png'),
						blueIcon: require('../assets/images/blueHistory.png'),
						isShow: true
					}, {
						text: '其他',
						name: 'otherFirstPage',
						icon: require('../assets/images/other.png'),
						blueIcon: require('../assets/images/blueOther.png'),
						isShow: true
					},

				],
				[{
						text: '首页',
						name: 'threeHomeContent',
						icon: require('../assets/images/home.png'),
						blueIcon: require('../assets/images/blueHome.png'),
					}, {
						text: '自助服务',
						name: 'selfService',
						icon: require('../assets/images/selfService.png'),
						blueIcon: require('../assets/images/blueSelfService.png'),
					}, {
						text: '慢SQL监控',
						name: 'slowSQL',
						icon: require('../assets/images/slowSql.png'),
						blueIcon: require('../assets/images/blueSlowSql.png'),
					}, {
						text: 'MySQL管理',
						name: 'MYSQLMange',
						icon: require('../assets/images/sql.png'),
						blueIcon: require('../assets/images/blueSql.png'),
						isShow: true
					}, {
						text: 'NoSQL管理',
						name: 'NosqlMange',
						icon: require('../assets/images/noSql.png'),
						blueIcon: require('../assets/images/blueNoSql.png'),
						isShow: true
					}, {
						text: '数据库集群管理',
						name: 'dataSetsMange',
						icon: require('../assets/images/dataSets.png'),
						blueIcon: require('../assets/images/blueDataSets.png'),
						isShow: true
					}, {
						text: 'DDL DML操作',
						name: 'DMLDDL',
						icon: require('../assets/images/dml.png'),
						blueIcon: require('../assets/images/blueDml.png'),
						isShow: true
					}, {
						text: 'MySQL备份恢复管理',
						name: 'MySqlCopyMange',
						icon: require('../assets/images/recovery.png'),
						blueIcon: require('../assets/images/blueRecovery.png'),
						isShow: true
					},
					/*{
						text: '性能统计及报表',
						name: 'performanceStatistics'
					},*/
					{
						text: '平台自助服务流程指引',
						name: 'platformGuide',
						icon: require('../assets/images/guide.png'),
						blueIcon: require('../assets/images/blueGuide.png'),
					},
					{
						text: '后台管理',
						name: 'backMange',
						icon: require('../assets/images/backMange.png'),
						blueIcon: require('../assets/images/blueBackMange.png'),
						isShow: true
					}
				],
				[{
					text: '权限中心',
					name: 'authorityCenter',
					icon: require('../assets/images/auth.png'),
					blueIcon: require('../assets/images/blueAuth.png'),
				}],
				[{
					text: '首页',
					name: 'developing',
					icon: require('../assets/images/home.png'),
					blueIcon: require('../assets/images/blueHome.png'),
				}],
			],
			leftMenuIndex: 0, //侧边栏对应的索引号
			leftMenuChildIndex: 0, //侧边栏子菜单对应的索引号
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
		/**
		 * 获取缓存的页面
		 * @AuthorHTL
		 * @DateTime  2018-04-17T10:28:17+0800
		 * @param     {state}                 state vuex状态对象
		 */
		getKeepAlive(state) {
			return state.pages.home + ',' + state.pages.keepAlive.join(',')
		},
		getUserLevel (state) {
			return state.userLevel
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
		setUserLevel (state, userLevel) {
			state.userLevel = userLevel
		},
		setLeftMenuList (state, userLevel) {
			for (let i of state.pages.leftMenuList) {
				for (let j of i) {
					j.hasOwnProperty('isShow') && (j.isShow = ['0', '1'].indexOf(userLevel) != -1)
				}
			}
		},
		setMenuList (state, userLevel) {
			for (let i of state.pages.menuList) {
				switch (i.text) {
					case '云系统平台':
						i.isShow = ['0','1','4'].indexOf(userLevel) != -1
						break;
					case '云管理平台':
						i.isShow = userLevel === '0';
						break;
				}
			}
		},
		setCnname (state, name) {
			state.cnname = name
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
		/**
		 * 重置侧边栏索引(切换头部导航栏时避免保存了第一个页面的状态)
		 * @AuthorHTL
		 * @DateTime  2018-04-17T09:23:36+0800
		 * @param     {Object}                 state vuex状态对象
		 */
		resetLeftMenuIndex(state) {
			state.pages.activeName = '0'; //折叠菜单活动项索引
			state.pages.tabIndex = 0; //一级菜单索引
			state.pages.childTabIndex = -1; //一级菜单下的子菜单索引
		},
		/**
		 * 设置侧边栏一级菜单对应的活动项索引
		 * @AuthorHTL
		 * @DateTime  2018-04-18T15:44:50+0800
		 * @param     {Object}                 state vuex状态对象
		 * @param     {Number}                 index [索引号]
		 */
		setMainMenuIndex(state, index) {
			state.pages.tabIndex = index; //一级菜单索引
		},

		/**
		 * 设置侧边栏二级级菜单对应的活动项索引
		 * @AuthorHTL
		 * @DateTime  2018-04-18T15:44:50+0800
		 * @param     {Object}                 state vuex状态对象
		 * @param     {Number}                 index [索引号]
		 */
		setChildMenuIndex(state, index) {
			state.pages.childTabIndex = index; //一级菜单索引
		},

		/**
		 * 修改页面主体部分标题内容
		 * @AuthorHTL
		 * @DateTime  2018-04-17T13:30:55+0800
		 * @param     {Object}                 state vuex状态对象
		 * @param     {String}                 title 
		 */
		setTitle(state, title) {
			state.pages.title = title
		},
		setCount (state, count) {
			state.count = count
		},
	},
}