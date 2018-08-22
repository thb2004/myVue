<template>
  <div id="app">
      <v-router-view />
      <!-- <v-loading ref="loading" v-if="$store.state.plugins.loading.show" :text='$store.state.plugins.loading.text' ></v-loading> -->
  </div>
</template>

<script>
import 'babel-polyfill'
import { mapGetters,mapMutations } from 'vuex'
import axios from 'axios'
export default {
  name: 'app',
  created () {
    window.$root = this;
    window.axios = axios;  
  },
  methods: {
    ...mapMutations(["setPageStack","setNavbarIndex"]),
  },
  watch: {
    $route (to, from) {
      let index = '';
      /*监听路由变化董改更改navbarIndex*/
      this.setNavbarIndex(to.meta.navPath)
      
      //更新页面栈
      this.setPageStack({
        to: to,
        from: from
      })
    }
  }
}
</script>

<style>

</style>
