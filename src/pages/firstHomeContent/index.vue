<template>
    <div class='content-wraper'>
    	<div class='content'>
	    	<el-carousel class='main-content' :height='$store.state.bannerHeight+"px"'>
	    	    <el-carousel-item v-for="(item, index) in slideImgArr" :key="index">
	    	      <img :src="item.src" width='100%'>
	    	    </el-carousel-item>
	    	</el-carousel>
	    	<div class="empty"></div>
	    	<el-row class='clear-overflow'>
				<el-col :md='11' class='desc'>
					<p class='title'>平台简介</p>
					<dl>
						<dt class='dl-title'>简介</dt>
						<dd class='dl-dd'>云资源平台全称为云资源管理平台，旨在分配管理私有云/公有云中可被量化和驱动的资源，通过自定义审批流程保障资源的有效管控，同时借助
各云平台开放API完成资源自动化生命周期管理，最终以平台产品的方式为公司IT提供高效稳定安全的云资管平台。</dd>
					</dl>
					<dl>
						<dt class='dl-title'>
							特点
						</dt>
						<dd>
							<ul>
								<li>1.资源审批流程可定制。放弃企业OA流程审批的复杂接入，自定义资源审批流程，助力敏捷交付。</li>
								<li>2.资源驱动自研定制化。统一使用各云服务商开放的API，通过自研定制自动化驱动引擎，保证资源安全稳定的交付。</li>
							</ul>
						</dd>
					</dl>
				</el-col>
				<el-col :md='1' class='empty-div hidden-sm-and-down'>
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
		name: 'firstHomeContent',
		data () {
			return {
				slideImgArr: [
					{
						src: require('../../assets/images/1.png')
					},
					/*{
						src: require('../../assets/images/1.jpg')
					},
					{
						src: require('../../assets/images/1.jpg')
					},
					{
						src: require('../../assets/images/1.jpg')
					}*/
				]
			}
		}
	}
</script>