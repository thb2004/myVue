export default [{
  path: 'DMLDDL',
  name: 'DMLDDL',
  meta: {
    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve => require(['../index.vue'], resolve),
}]