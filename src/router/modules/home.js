export default [
	{
		path: '/home',	
		name: 'home',
		meta: {
		  requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
		},
		component: resolve => require(['../../pages/index'], resolve),
		redirect: {path:'*'},
		children: [
			
			
		]
	},
	{
		path: '/',
		name: 'review',
		component: resolve => require(['../../pages/review'], resolve),
		meta: {
		  requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
		},
	},
]