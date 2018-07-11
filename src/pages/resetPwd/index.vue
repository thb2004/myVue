<template>
	<div class="box">
		<div class="reset-pwd">
			<div class="reset-pwd-content">
				<el-form :model='form' label-width='100px'>
					<h1>重置密码</h1>
					<el-form-item label='账号:'>
					    <el-input v-model="form.mipAccount" placeholder='账号' @keyup.enter.native ='submit' clearable></el-input>
					</el-form-item>

					<el-form-item label='旧密码:'>
					    <el-input v-model="form.oldPwd" placeholder='旧密码' @keyup.enter.native ='submit' clearable></el-input>
					</el-form-item>

					<el-form-item label='新密码:'>
					    <el-input v-model="form.newPwd" placeholder='新密码' @keyup.enter.native ='submit' clearable></el-input>
					</el-form-item>

					<el-form-item label='确认新密码:'>
					    <el-input v-model="form.confirmPwd" placeholder='确认新密码' @keyup.enter.native ='submit' clearable></el-input>
					</el-form-item>

					<el-form-item label='验证码:'>
					    <el-input v-model="form.checkCode" placeholder='验证码' @keyup.enter.native ='submit' clearable></el-input>
					</el-form-item>

					<el-form-item>
					    <el-button type="primary" @click="submit">提 交</el-button>
					    <el-button @click="cancel">取 消</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>
<style lang='scss'>
	.reset-pwd-content {
		display: flex;
	    align-items: center;
	    justify-content: center;
	    height: 800px;
	    background: #ccc;
	    .el-form {
	    	background: #fff;
	    	padding: 20px;
	    }
	    h1 {
	    	font-size: 18px; 
	    	border-bottom: 1px solid #E1E1E1;
	    	font-weight: bold;
	    	margin-bottom: 20px;
    		padding-bottom: 20px;
	    }
	}
</style>

<script type="text/javascript">
	
	export default {
		data () {
			return {
				form: {
					mipAccount: '',			//账户
					oldPwd: '',				//旧密码
					newPwd: '',				//新密码
					confirmPwd: '',			//确认新密码
					checkCode: '',			//验证码
				}
			}
		},
		methods: {
			submit () {

			},
			cancel () {

			},
		}
	}
</script>