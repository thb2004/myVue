<template>
    <div class='box'>
    	<div class='authority-center'>
    		<div class='main-middle'>
				<el-form :model='form' label-width='9.33rem' ref='form' :rules='rules'>
					<el-row class='padd-t20'>
						<el-col :md='11'>
							<el-form-item label="用户名" prop='username'>
							    <el-input v-model="form.username" placeholder='请输入mip账号'></el-input>
							</el-form-item>
						</el-col>
						<el-col :md='6'>
							<el-form-item label="用户级别" prop='userLevel'>
							    <el-input-number v-model="form.userLevel" :min="0" :max="4" controls-position="right"></el-input-number>
							</el-form-item>
						</el-col>
						<el-col :md='6' class='text-right'>
							<el-button type="primary" class='btn-lg' @click="submitForm('form')" :disabled='btnDisabled'>提 交</el-button>
						</el-col>
					</el-row>
				</el-form>
		    
	    		
	    	</div>
	    </div>
    </div>
</template>
<script type="text/javascript">
	export default {
		data () {
			return {
				form: {
					username: '',			//用户名
					userLevel: 1
				},
				rules: {
					username: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}],
					userLevel: [{
						required: true,
						message: '请输入用户级别',
						trigger: 'blur'
					}],
				},
				btnDisabled: false,
			}
		},
		methods: {
			submitForm (formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let url = '/adm/v1/setuserlevel'
						this.btnDisabled = true
						app.post(url, {
							username: this.form.username,
							userlevel: this.form.userLevel + ''
						}, res => {
							this.btnDisabled = false
							if (res.data.code != '505') {
								this.$alert(res.data.Message, {title: '提示',type: 'info'})
							}
						}, this.error)
					} else {
						return false;
					}
				});
			},
			error () {
				this.$alert('提交失败', {
					title: '提示',
					type: 'info'
				})
				this.btnDisabled = false
			},
		},
	}
</script>