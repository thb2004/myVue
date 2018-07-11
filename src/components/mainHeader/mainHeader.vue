<template>
	<div class="mainHeader">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>{{title}}</el-breadcrumb-item>
			<el-breadcrumb-item v-if='childTitle'>
				{{childTitle}}
			</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>

<style lang='scss'>
	@import '../../css/variable';
	.mainHeader {
		background: $bg-white;
		padding-left: 30px;
		color: #666;
		.el-breadcrumb {
			line-height: 40px;
		}
	}
</style>
<script type="text/javascript">
	import { mapMutations, mapGetters } from "vuex";
	export default {
		name: 'vMainHeader',
		data () {
			return {
				title: '首页',
				childTitle: ''
			}
		},
		computed: {
			...mapGetters(['getPages', 'getNavbarIndex']),
		},
		methods: {
			...mapMutations(['setNavbarIndex']),
			setMainHeader () {
				let obj = this.getPages.mainHeadTitle[this.getPages.to]
				if (obj) {
					this.title = obj.title
					this.childTitle = obj.childTitle
					this.setNavbarIndex(obj.index)
				} 
			}
		},
		watch: {
    		$route (to, from) {
    			this.setMainHeader()    
    		}
    	},
    	created () {
    		 this.setMainHeader() 
    	},
	}
</script>


