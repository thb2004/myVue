export default [{
  path: 'LinuxBatchStandardization',
  name: 'LinuxBatchStandardization',
  meta: {
    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve => require(['../index.vue'], resolve),
  redirect: {name:'LinuxBatchStandardizationFirstPage'},
  children: [
    {
      path: 'allResult', 
      name: 'LinuxBatchStandardizationAllResult',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../../allResult.vue'], resolve)
    },
    {
      path: 'firstPage',
      name: 'LinuxBatchStandardizationFirstPage',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../step/LinuxBatchStandardization.vue'], resolve)
    },
  ]
}]