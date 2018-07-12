<template>
	<el-container class='container-box'>
	  <el-header>
	  	<!-- 头部 -->
		 <v-header></v-header>
	  </el-header>

	  <div class='my-container flex'>
	    <el-aside v-if='!/developing/.test($route.name)'>
	    	<!-- 左侧导航栏 -->
	    	<v-left-menu></v-left-menu>
	    </el-aside>
	    <el-container>
	      <el-main :style='{"height": $store.state.innerHeight+"px"}'>
	      	<el-scrollbar style='height:100%;'>
		      	<!-- 右侧中心头部内容-->
		      	<div  v-if='!/HomeContent|AllResult|ProcessingList|notFound|developing/.test($route.name)'>
		      		<v-main-header></v-main-header>
		      	</div>
		      	<!-- 右侧中心主体内容-->
		      	<v-router-view noTransition />
		      	<div v-if='!/developing/.test($route.name)'>
		      		<p class='footer'>美的平台服务协议和法律声明 Copyright © 1968-2018 Midea Group.All right reserved <span>中文</span></p>
		      	</div>
	      	</el-scrollbar>
	      </el-main>
	    </el-container>

	  </div>

	</el-container>
	
</template>

<style lang='scss'>
	@import '../css/variable';
	.container-box .el-footer {
		padding: 0
	}
	.my-container {
		margin-top: 60px;
		.el-aside {
			width: 225px !important;
		}
	}
	.footer {
		z-index: 9999;
		bottom: 0;
		width: 100%;
		color: #A2A2A2;
		background: #F2F2F2;
		line-height: 50px;
		text-align: center;
		span {
			padding-left: $baseSize;
			color: #545454;
			border-left: 1px solid #979797;
		}
	}
</style>
<script type="text/javascript">
	export default {
		
	}
</script>