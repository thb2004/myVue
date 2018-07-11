export default [{
  path: 'openResource',
  name: 'openResource',
  meta: {
    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve => require(['../index.vue'], resolve),
  redirect: {name:'openResourceFirstPage'},
  children: [
    {
      path: 'processingList', 
      name: 'openResourceProcessingList',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../../processingList.vue'], resolve)
    },
    {
      path: 'firstPage',
      name: 'openResourceFirstPage',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../step/resource.vue'], resolve)
    },
  ]
}]