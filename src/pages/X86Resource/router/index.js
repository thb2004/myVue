export default [{
  path: 'X86Resource',
  name: 'X86Resource',
  component: resolve => require(['../index.vue'], resolve),
  redirect: {name:'X86ResourceFirstPage'},
  children: [
    {
      path: 'processingList', 
      name: 'X86ResourceProcessingList',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../../processingList.vue'], resolve)
    },
    {
      path: 'firstPage',
      name: 'X86ResourceFirstPage',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../step/resource.vue'], resolve)
    },
  ]
}]

