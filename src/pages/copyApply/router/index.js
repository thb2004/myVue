export default [{
  path: 'copyApply',
  name: 'copyApply',
  meta: {
    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve => require(['../index.vue'], resolve),
  redirect: {name:'copyApplyFirstPage'},
  children: [
    {
      path: 'processingList', 
      name: 'copyApplyProcessingList',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../../processingList.vue'], resolve)
    },
    {
      path: 'firstPage',
      name: 'copyApplyFirstPage',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../step/resource.vue'], resolve)
    },
  ]
}]
