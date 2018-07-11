export default [{
  path: 'LinuxBatchInit',
  name: 'LinuxBatchInit',
  meta: {
    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve => require(['../index.vue'], resolve),
  redirect: {name:'LinuxBatchInitFirstPage'},
  children: [
    {
      path: 'allResult', 
      name: 'LinuxBatchInitAllResult',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../../allResult.vue'], resolve)
    },
    {
      path: 'firstPage',
      name: 'LinuxBatchInitFirstPage',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../step/LinuxBatchInit.vue'], resolve)
    },
  ]
}]