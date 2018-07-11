import Vue from 'vue'
import Router from 'vue-router'
import homeRouter from './modules/home'

Vue.use(Router)

export default new Router({
  routes: [...homeRouter]
})
