export default [{
  path: 'linuxMange',
  name: 'linuxMange',
  meta: {
    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve => require(['../index.vue'], resolve),
  redirect: {name:'linuxMangeFirstPage'},
  children: [
    {
      path: 'allResult', 
      name: 'linuxMangeAllResult',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../../allResult.vue'], resolve)
    },
    {
      path: 'firstPage',
      name: 'linuxMangeFirstPage',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../step/linuxMange.vue'], resolve)
    },
  ]
}]