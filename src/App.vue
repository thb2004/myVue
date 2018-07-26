<template>
  <div id="app">
      <v-router-view />
      <v-loading ref="loading" v-if="$store.state.plugins.loading.show" :text='$store.state.plugins.loading.text' ></v-loading>
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
      switch (to.name) {
        case 'firstHomeContent':
            index = '0';
            break;
        case 'secondHomeContent':
            index = '1';
            break;
        case 'threeHomeContent':
            index = '2';
            break;
        case 'authorityCenter':
            index = '3';
            break;
        case 'developing':
            index = '4';
            break;
      }
      index && this.setNavbarIndex(index)
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
