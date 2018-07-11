export default [{
  path: 'resourceSaveApply',
  name: 'resourceSaveApply',
  meta: {
    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve => require(['../index.vue'], resolve),
  redirect: {name:'resourceSaveApplyFirstPage'},
  children: [
    {
      path: 'processingList', 
      name: 'resourceSaveApplyProcessingList',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../../processingList.vue'], resolve)
    },
    {
      path: 'firstPage',
      name: 'resourceSaveApplyFirstPage',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../step/resource.vue'], resolve)
    },
  ]
}]