<template>
	<div class="header">
		<div class='my-flex'>	
			<div class='brand'>
				<img src="../../assets/images/brand.png">
				<span>雅典娜自动化平台</span>
			</div>
			<el-menu :default-active='""+$store.state.pages.navbarIndex' mode='horizontal' @select='changePage' 
				background-color="#2A3C59"
				text-color="#fff"
				active-text-color="#ffd04b"
				class='my-menu hidden-small'
				>
				<el-menu-item v-for='(item,index) in menuList' :index="'' + index" :key="index" v-if='index != 3 || item.level=="0"'>
					{{item.text}}
				</el-menu-item>
			</el-menu>
			<div class='right-content'>
				<div class='lang'>
					<el-dropdown trigger="click">
					  <span class="el-dropdown-link">
					    <img src="../../assets/images/lang.png">简体中文<i class="el-icon-arrow-down el-icon--right"></i>
					  </span>
					  <el-dropdown-menu slot="dropdown" class='language'>
					    <el-dropdown-item>简体中文</el-dropdown-item>
					    <el-dropdown-item>日文</el-dropdown-item>
					    <el-dropdown-item>中文繁体</el-dropdown-item>
					    <el-dropdown-item>英文</el-dropdown-item>
					    <el-dropdown-item>越南语</el-dropdown-item>
					  </el-dropdown-menu>
					</el-dropdown>
				</div>
				<div class="message">
					<div class="message">
						<el-badge :value="messageNum" v-if='messageNum > 0'>
						  <img src="../../assets/images/message.png">
						</el-badge>
						<img src="../../assets/images/message.png" v-else>
					</div>
				</div>
				<div class='user'>
					<el-dropdown @command='logout' trigger="click">
					  <span class="el-dropdown-link">
					    <img src="../../assets/images/user.png">{{$store.state.cnname}}<i class="el-icon-arrow-down el-icon--right"></i>
					  </span>
					  <el-dropdown-menu slot="dropdown" class='logout'>
					  	<el-dropdown-item command='login' v-if='!$store.state.isLogin'>登录</el-dropdown-item>
					    <el-dropdown-item command='logout' class='logout-sys' v-else>退出系统</el-dropdown-item>
					  </el-dropdown-menu>
					</el-dropdown>
				</div>
			</div>
			<div class='show-small my-dropdown'>
				<el-dropdown @command='changePage' trigger="click">
					<span class="el-dropdown-link">
						<i class="fa fa-navicon"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
					    <el-dropdown-item v-for='(item,index) in menuList' :key="index" :command='index' v-if='index != 3 || item.level=="0"'>
					    	{{item.text}}
					    </el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
	</div>
</template>
<style lang='scss'>
	@import '../../css/variable';
	.header {
		.el-dropdown-link {
			cursor: pointer;
		}
		.el-dropdown {
			color: #fff;
		}
		.el-menu-item {
			padding: 0 1.33rem
		}
		.my-dropdown {
			padding-right: 8px;
			.fa-navicon {
				font-size: 14px;
			}
		}
		.brand,.right-content {
			font-size: 14px;
		}
		/*.brand {
			width: 25%
		}
		 .my-menu {
			width: 50%
		} */
		img {
			width: 1rem;
			vertical-align: middle;
			margin: 0 8px;
		}
		.my-flex {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 100%;
			.brand {
				img {
					width: 5rem;
					cursor: pointer;
				}
				span {
					color: #fff;
					vertical-align: middle;
				}
			}
			.right-content {
				display: flex;
				justify-content: flex-end;
				padding-right: 8px;
			}
			.message {
				cursor: pointer;
				margin: 0 20px;
				.el-badge__content.is-fixed {
					right: 15px;
				}
				.el-badge__content {
					padding: 0 3px;
					line-height: 16px;
					height: 16px;
					border: none;
				}
			}
		}
		.el-icon-arrow-down:before {
			content: '';
			background: url('../../assets/images/dw.png') center no-repeat;
			width: 10px;
		    height: 10px;
		    display: inline-block;
		    background-size: contain;
		}
	}
	.logout,.language {
		top: 55px !important;
		.el-dropdown-menu__item {
			padding: 0 30px;
			position: relative;
			&:before {
				content: '';
				position: absolute;
			    left: 10px;
			    top: 12px;
				width: 16px;
			    height: 16px;
			    display: inline-block;
			}
		}
		.logout-sys {
			&:before {
				background: url('../../assets/images/logout.png') center no-repeat;
				background-size: contain;
			}
		}
	}
	.el-header {
		padding: 0;
		.header {
			height: 100%;
		}
	}
</style>
<script type="text/javascript">
	import { mapMutations } from "vuex";
	export default {
		name: 'vHeader',
		data () {
			return {
				messageNum: 0,
				menuList: [{
					text: '云资源平台'
				},{
					text: '云系统平台'
				},{
					text: '云数据库平台'
				}, {
					text: '云管理平台',
					level: window.localStorage.getItem('userLevel')
				},{
					text: '云容器平台'
				}]
			}
		},
		methods: {
			...mapMutations(["setNavbarIndex",'resetLeftMenuIndex','setTitle', 'setLoginStatus', 'setCount', 'setUsername','setUserLevel', 'setLeftMenuList', 'setCnname']),
			changePage(index) {
				let pageName = ''
				switch (index) {
					case '0':
						pageName = 'firstHomeContent';
						break;
					case '1':
						pageName = 'secondHomeContent';
						break;
					case '2':
						pageName = 'threeHomeContent';
						break;
					case '3':
						pageName = 'authorityCenter';
						break;
					case '4':
						pageName = 'developing';
						break;
				}
				app.go(pageName)
				/*设置navbar Index*/
				this.setNavbarIndex(index)
			},
			/*注销登录*/
			logout (command) {
				let url = '/adm/v1/logout'
				app.post(url, {}, res => {
					this.$router.push({
						path: '/',
						/*query: {
							redirect: this.$router.currentRoute.fullPath
						}*/
					})
					window.localStorage.setItem('login', '');
					window.localStorage.setItem('userLevel', '');
					window.localStorage.setItem('cnname', '');
					this.setLoginStatus(false)
					this.setCount(0)
					this.setUsername('')
					this.setUserLevel('')
					this.setLeftMenuList('')
					this.setCnname('')
				}, err => {
					this.$alert('注销失败', {title: '提示'})
				})
				
			}
			
			
		}
	}
</script>


