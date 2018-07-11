<template>
	  <transition v-if="!noTransition" name="custom-classes-transition" :enter-active-class="enter" :leave-active-class="leave">
	    <keep-alive :include="$store.getters.getKeepAlive">
	      <router-view></router-view>
	    </keep-alive>
	  </transition>
	  <transition 
	  	  v-else
	  	  :duration="{ enter: 100, leave: 100 }"
		  name='fade'
		  mode='out-in'
		  enter-active-class="animated fadeIn"
		  leave-active-class="animated fadeOut"
	   >
		  <keep-alive :include="$store.getters.getKeepAlive">
		    <router-view></router-view>
		  </keep-alive>
	  </transition>
</template>


<script>
	import {mapGetters, mapMutations} from 'vuex'
	export default {
		data () {
			return {
				keepAlive: true,
				enter: "slideInRight fast",
				leave: "slideOutLeft fast",
			}
		},
		props: {
			noTransition: Boolean
		},
		methods: {
			...mapMutations(['setKeepAlive'])
		},
		watch: {
			/**
			 * 监视路由跳转
			 * @AuthorHTL
			 * @DateTime  2018-04-17T10:20:41+0800
			 * @param     {Object}                 to   去的路由
			 * @param     {Object}                 from 来的路由
			 */
			$route(to, from) {
				this.enter = !this.pages.status ?
		          `${this.pages.transitiont}InLeft fast` :
		          `${this.pages.transitiont}InRight fast`;
		        this.leave = !this.pages.status ?
		          `${this.pages.transitiont}OutRight fast` :
		          `${this.pages.transitiont}OutLeft fast`;
			}
		},
		computed: {
	      ...mapGetters({
	        pages: "getPages",
	        KeepAlive: "getKeepAlive"
	      })
	    },
	}
</script>