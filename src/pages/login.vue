<template>
    <div class='box' id='login-box'>
    	<div class="header-wraper">
    		<a class="logo">
    			<img src="../assets/images/brand.png">
    		</a>
    		<div class='language'>
    			<el-breadcrumb separator="/">
    			  <el-breadcrumb-item><a @click='changeLanguage("cn")' :class='{"active":lang==="cn"}'>中文</a></el-breadcrumb-item>
    			  <el-breadcrumb-item><a @click='changeLanguage("en")' :class='{"active":lang==="en"}'>En</a></el-breadcrumb-item>
    			  <el-breadcrumb-item><a @click='changeLanguage("ja")' :class='{"active":lang==="ja"}'>日本语</a></el-breadcrumb-item>
    			</el-breadcrumb>
    			<!-- <el-dropdown  @command='changeLanguage' trigger='click'>
    			  <span class="el-dropdown-link">
    			    {{$t('message.lang')}}<i class="el-icon-arrow-down el-icon--right"></i>
    			  </span>
    			  <el-dropdown-menu slot="dropdown">
    			    <el-dropdown-item command='cn'>简体中文</el-dropdown-item>
    			    <el-dropdown-item command='en'>English</el-dropdown-item>
    			    <el-dropdown-item command='ja'>日本语</el-dropdown-item>  
    			  </el-dropdown-menu>
    			</el-dropdown> -->
    		</div>
    	</div>
		<div class='login-content'>
			<div class='login-wraper animated slideInLeft'>
				<div class="gaea" :style='{"height": $store.state.innerHeight-105+"px"}'></div>
				<el-form :model='form' ref='form' :rules='rules'>
					<h1 class='text-center'>{{$t('message.mideaLogin')}}</h1>
					<el-form-item prop='mipAccount'>
					    <el-input v-model="form.mipAccount" :placeholder='$t("message.account")' @focus='form.pwd=""' clearable autoComplete>
					    	<i slot="prefix" class="el-input__icon el-icon-user"></i>
					    	<!-- <i slot="prepend" class="fa fa-user-o fa-lg"></i> -->
					    </el-input>
					</el-form-item>

					<el-form-item prop='pwd'>
					    <el-input v-model="form.pwd" :placeholder='$t("message.password")' clearable type='password' @keyup.enter.native="submitForm('form')" ref='pwd'>
					    	<i slot="prefix" class="el-input__icon el-icon-pwd"></i>
					    	<!-- <i slot="prepend" class="fa fa-lock fa-lg"></i> -->
					    </el-input>
					</el-form-item>

					<el-form-item>
						<el-checkbox v-model="form.rememberUser">{{$t('message.rememberUser')}}</el-checkbox>
					</el-form-item>

					<el-form-item>
					    <el-button type="primary" @click="submitForm('form')" :disabled='btnDisabled'>{{$t('message.login')}}</el-button>
					</el-form-item>
					<span v-if='errorMsg' v-html='errorMsg'></span>
				</el-form>
			</div>
		</div>

		<div class="footer-wraper">
			<div class="footer-link text-center">
		        <a href="http://si.midea.com/static/service_agreement" target="_blank">{{$t('message.terms')}}</a>
		        <a href="http://si.midea.com/static/privacy_policy" target="_blank">{{$t('message.privacy')}}</a>
		        <a href="http://si.midea.com/static/contact_us" target="_blank">{{$t('message.contact')}}</a>
		        <a class="last" href="http://si.midea.com/static/complaints_center" target="_blank">{{$t('message.complaints')}}</a>
		    </div>
		    <p class="copyright text-center">Copyright © 1968-2018 <span>{{$t('message.copyright')}}</span></p>
		</div>
    </div>
</template>
<style lang='scss'>
	#login-box {
		margin: 0;
		background: url('../assets/images/bj.jpg') center no-repeat;
	    background-size: cover;
		.header-wraper {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 85px;
			padding: 0 20px;
			.logo img {
				cursor: pointer;
				height: 35px;
			}
		}
		.el-breadcrumb__inner a {
			color: #fff;
			font-weight: normal;
		}
		.el-breadcrumb__inner a:hover, .el-breadcrumb__inner.is-link:hover,.el-breadcrumb__inner a.active, .el-breadcrumb__inner.is-link.active {
			color: #409EFF;
    		cursor: pointer;
		}
		.footer-wraper {
			padding-bottom: 20px;
			font-size: 12px;
			color: #fff;
			line-height: 30px;
			.footer-link a {
				display: inline-block;
			    color: #fff;
			    &:after{
			    	position: relative;
			    	display: inline-block;
			    	top: 2px;
			    	content: "";
			    	width: 1px;
			    	height: 9pt;
			    	margin: 0 20px;
			    	background-color: #e8e9ef;
			    }
			}
			.footer-link a:last-child {
				&:after { 
					background-color: transparent;
				}
			}
		}
	}
	.login-content {
	    .login-wraper {
	    	display: flex;
	    	align-items: center;
	    	justify-content: space-around;
    		.gaea {
    			width: 650px;
    			height: 100%;
    			background: url('../assets/images/gaea.png') center no-repeat;
    	   		background-size: contain;
    		}	
		    .el-form {
		    	background: #fff;
		    	padding: 20px;
		    	width: 350px;
		    	border-radius: 5px;
		    	.el-button--primary {
		    		width: 100%;
		    	}
		    	.el-icon-user {
		    		background: url('../assets/images/people.png') center no-repeat;
		    		background-size: 16px;
		    	}
		    	.el-icon-pwd {
		    		background: url('../assets/images/lock.png') center no-repeat;
		    		background-size: 16px;
		    	}
		    }
		    h1 {
		    	font-size: 18px; 
		    	font-weight: bold;
	    		padding: 20px 0 40px 0;
		    }
	    }
	}
</style>
<script type="text/javascript">
	export default {
		data () {
			return {
				lang: 'cn',
				dialogVisible: false,
				btnDisabled: false,
				errorMsg: '',				//登录校验错误提示信息
				form: {
					mipAccount: window.localStorage.getItem('rememberUsername') || '',			//mip账户
					pwd: '',				//密码
					rememberUser: true,
				},
			}
		},
		computed: {
			rules () {
				return {
					/*mip账号*/
					mipAccount: [{
						required: true,
						message: this.$t('message.accountMsg'),
						trigger: 'blur'
					}],
					pwd: [{
						required: true,
						message: this.$t('message.pwdMsg'),
						trigger: 'blur'
					}],
				}
			}
		},
		methods: {
			/*登录之前检验数据*/
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					let redirect = this.$route.query.redirect
					let url = '/adm/v1/login'
					let params = {
						username: this.form.mipAccount,
						password: this.form.pwd,
					}
					if (valid) {
						this.btnDisabled = true;
						app.post(url, params, res => {
							let code = res.data.Code;
							this.btnDisabled = false
							if (code === "2000000") { //验证成功
								let cnname = res.data.Data.cnname
								let userLevel = res.data.Data.userlevel
								window.localStorage.setItem('rememberUsername', this.form.rememberUser ? this.form.mipAccount : '')
								this.$store.commit('setCount', 0)
								this.$store.commit('setUserLevel', userLevel)
								this.$store.commit('setUsername', this.form.mipAccount)
								this.$store.commit('setCnname', cnname)
								this.$store.commit('setMenuList', userLevel)
								this.$store.commit('setLeftMenuList', userLevel)
								/*如果url带了redirect而且redirect不为斜杠*/
								if (redirect && redirect != '/') {
									$root.$router.replace({
										path: redirect
									})
								} else {
									$root.$router.replace({
										name: 'firstHomeContent'
									})
								}
							} else {
								this.$refs['pwd'].blur()
								this.$alert(res.data.Message, {
									title: '提示',
									type: 'info'
								})
							}
						}, this.error)
					} else {
						return false;
					}
				});
			},
			error () {
				this.$refs['pwd'].blur()
				this.$alert('登录失败，请检查网络或者稍后重试', {
					title: '提示',
					type: 'info'
				})
				this.btnDisabled = false
			},
			changeLanguage (lang) {
				this.lang = lang;
				this.$i18n.locale = lang; 
			}
		},
	}
</script>