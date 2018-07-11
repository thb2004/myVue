export default [{
  path: 'other',
  name: 'other',
  meta: {
    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve => require(['../index.vue'], resolve),
  redirect: {name:'otherFirstPage'},
  children: [
    {
      path: 'allResult', 
      name: 'otherAllResult',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../../allResult.vue'], resolve)
    },
    {
      path: 'firstPage',
      name: 'otherFirstPage',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../step/other.vue'], resolve)
    },
  ]
}]