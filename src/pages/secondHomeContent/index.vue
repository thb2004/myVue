<template>
    <div class='content-wraper'>
    	<div class='content'>
	    	<el-carousel class='main-content' :height='$store.state.bannerHeight+"px"'>
	    	    <el-carousel-item v-for="(item, index) in slideImgArr" :key="index">
	    	      <img :src="item.src" class='banner-img'>
	    	    </el-carousel-item>
	    	</el-carousel>
	    	<div class="empty"></div>
	    	<el-row class='clear-overflow'>
				<el-col :md='11' class='desc'>
					<p class='title'>平台简介</p>
					<dl>
						<dt class='dl-title'>简介</dt>
						<dd class='dl-dd'>云系统平台全称为云系统作业调度平台，旨在为平台范围的主机提供统一作业入口，同时将
运维场景作业配置化，高效稳定的调度到制定节点完成相应动作，实现标准化自动化运维。</dd>
					</dl>
					<dl>
						<dt class='dl-title'>
							特点
						</dt>
						<dd>
							<ul>
								<li>1.运维场景标准化，作业化，配置化。</li>
								<li>2.主机接入灵活自由，兼容CMDB和自定义配置。</li>
								<li>3.调度维度灵活，支持周期/顺序执行维度，可扩展性强。</li>
							</ul>
						</dd>
					</dl>
				</el-col>
				<el-col :md='1' class='empty-div  hidden-sm-and-down'>
					<div></div>
				</el-col>
				<el-col :md='12' class='notice'>
					<p class='title'>公告</p>
					<ul>
						<li>暂定7.15发布上线</li>
					</ul>
				</el-col>
	    	</el-row>
    	</div>
    </div>
</template>
<style lang='scss' scoped>
	@import '../../css/variable';
	.content-wraper {
		min-height: calc(100% - 50px - 10px);
		margin: $baseSize $baseSize 0 $baseSize;
		.content {
			background: #fff;
			font-size: $fontSize;
			color: $fontBaseColor;
			.main-content {
				padding: 20px;
			}
			.notice {
				margin-left: 10px;
				padding: 0 20px;
			}
			.desc {
				padding: 0 20px
			}
			dl {
				margin-bottom: 24px;
			}
			p{
				line-height: 40px;
				margin-bottom: 10px;
				border-bottom: 1px solid #ccc;
			}
			li {
				line-height: 28px;
			}
		}
	}
</style>

<script type="text/javascript">
	export default {
		name: 'secondHomeContent',
		data () {
			return {
				slideImgArr: [
					{
						src: require('../../assets/images/2.png')
					},
				]
			}
		}
	}
</script>