<template>
	<div class="mainHeader">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item v-if='$route.meta.navTitle'>
				{{$route.meta.navTitle}}
			</el-breadcrumb-item>
			<el-breadcrumb-item>{{$route.meta.curTitle}}</el-breadcrumb-item>
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
	export default {
		
	}
</script>


