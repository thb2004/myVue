export default [{
  path: 'IPResource',
  name: 'IPResource',
  meta: {
    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve => require(['../index.vue'], resolve),
  redirect: {name:'IPResourceFirstPage'},
  children: [
    {
      path: 'processingList', 
      name: 'IPResourceProcessingList',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../../processingList.vue'], resolve)
    },
    {
      path: 'firstPage',
      name: 'IPResourceFirstPage',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../step/resource.vue'], resolve)
    },
  ]
}]