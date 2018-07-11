export default [{
  path: 'automation',
  name: 'automation',
  meta: {
    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve => require(['../index.vue'], resolve),
  redirect: {name:'automationFirstPage'},
  children: [
    {
      path: 'allResult', 
      name: 'automationAllResult',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../../allResult.vue'], resolve)
    },
    {
      path: 'firstPage',
      name: 'automationFirstPage',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../step/automation.vue'], resolve)
    },
  ]
}]