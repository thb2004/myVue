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
						<dd class='dl-dd'>云数据管理平台高度集成了MariaDB、Redis、MongoDB、TiDB等开源数据库的管理工具。亦可称之为DBA之屠龙宝刀，为开源数据库自动化部署、高可用、性能监控、故障处理等关键运维工作提供一揽子解决方案。把DBA从常规、重复、繁琐的操作任务中解放出来。使其能聚焦时间精力，持续保障业务运行，高效处理业务故障。</dd>
					</dl>
					<dl>
						<dt class='dl-title'>
							特点
						</dt>
						<dd>
							<ul>
								<li>1.高度自助，操作简便。</li>
								<li>2.标准化部署，集中化管理。</li>
								<li>3.功能完善，80%以上常规工作一键处理。</li>
								<li>4.紧跟开源数据库最新版本和特性，持续迭代精进。</li>
								<li>5.权限规范，重要操作一律先审核、后处理。</li>
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
						<li><a href="https://mp.weixin.qq.com/s/9bJriW-k1imQFseoXQZrCA" target="_blank" class='link'>雅典娜自动化平台产品在7月16日正式发布</a></li>
						<li>云资源平台和云系统平台功能和需求对接人:丁以然,程序bug对接人：刘振南</li>
						<li>云数据库平台功能和需求对接人:丁以然,程序bug对接人：郭鹏姣</li>
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
			.link {
				color: #61c23a;
				&:hover {
					text-decoration: underline;
					color: red
				}
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
						src: require('../../assets/images/3.png')
					},
				]
			}
		}
	}
</script>