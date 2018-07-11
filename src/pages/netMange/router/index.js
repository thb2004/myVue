export default [{
  path: 'netMange',
  name: 'netMange',
  meta: {
    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve => require(['../index.vue'], resolve),
  redirect: {name:'netMangeAutoView'},
  children: [
    {
      path: 'netMangeAutoView', 
      name: 'netMangeAutoView',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../step/netMange.vue'], resolve)
    },
    {
      path: 'IPList',
      name: 'IPList',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../step/IPList.vue'], resolve)
    },
     {
      path: 'netVlanList',
      name: 'netVlanList',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../step/netVlanList.vue'], resolve)
    },
    {
      path: 'allResult', 
      name: 'netMangeAllResult',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['../../allResult.vue'], resolve)
    },
  ]
}]