<template>
	<div class="leftMenu">
		<el-scrollbar style='height: 100%;'>
			<el-menu 
				background-color="#2A3C59"
	      		text-color="#fff"
	      		active-text-color="#ffd04b"
	      		:default-active='$store.state.pages.to'
	      		:default-openeds='[$route.meta.navTitle ? $route.meta.navTitle : ""]'
	      		unique-opened
	      		router
      		>
				<el-submenu :index="item.text" v-for='(item,mainIndex) in menuList' v-if='item.isAccordion' :key='mainIndex'>
					<template slot="title">
					 <i
						class='el-icon- my-icon'
					 	:style='{"backgroundImage":"url("+item.icon+")"}'
					 ></i>
			         <span>{{item.text}}</span>
			       </template>
					<el-menu-item v-for='(childItem, index) in item.children' 
						:key='index' 
						:index='childItem.path'
						:class="{'active':childItem.name===$store.state.pages.to}"
					>
						{{childItem.text}}
					</el-menu-item>
	                
				</el-submenu>

				<el-menu-item v-else-if='item.name==="platformGuide"' @click='open' index="">
					<template slot="title">
						<i
							class='el-icon- my-icon'
						 	:style='{"backgroundImage":"url("+(item.name!=$store.state.pages.to ? item.icon : item.blueIcon ? item.blueIcon : item.icon)+")"}'
						 ></i>
						<span>{{item.text}}</span>
					</template>
				</el-menu-item>

				<el-menu-item v-else :index="item.path" :class="{'active':item.name===$store.state.pages.to}">
					<template slot="title">
						<i
							class='el-icon- my-icon'
						 	:style='{"backgroundImage":"url("+(item.name!=$store.state.pages.to ? item.icon : item.blueIcon ? item.blueIcon : item.icon)+")"}'
						 ></i>
						<span>{{item.text}}</span>
					</template>
				</el-menu-item>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<style lang='scss'>
	@import '../../css/variable';
	.leftMenu {
		height: 100%;
		background: $sideBarBg;
		.my-icon {
			width: 18px;
		    height: 18px;
		    background-size: 100%
		}
		li {
			overflow: hidden;
		    text-overflow: ellipsis;
		    white-space: nowrap;
		} 
		li.is-active, li {
			color: #fff !important;
			background-color: #2A3C59 !important;
		}
		li.active {
			background-color: #223047 !important;
			color: #FFD04B !important;
			&:after {
				content: '';
			    position: absolute;
			    left: 0;
			    top: 0;
			    width: 2px;
			    height: 100%;
			    background: #2A8ED1;
			}
		}
		.el-submenu__title {
			font-size: 15px;
		}
		.el-scrollbar__wrap {
			overflow-x: hidden;
		}
	}
	
</style>
<script type="text/javascript">
	import { mapGetters } from "vuex";
	export default {
		name: 'vLeftMenu',
		computed: {
			...mapGetters(['getPages']),
			menuList () {
				return this.getPages.leftMenuObj[this.getPages.navbarIndex]
			},
		},
		methods: {
			open (link) {
				window.open('http://wiki.midea.com/pages/viewpage.action?pageId=5432499')
			}
		},
	}
</script>


