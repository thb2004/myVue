<template>
    <div class='box'>
    	<div class='sys-mange'>
    		<div class='main-middle'>
	    		<p class='title m-b20'>基本信息</p>
				<el-form :model='form' :label-width='labelWidth'>
					<el-row>
						<el-col :md='11'>
							<el-form-item label="用户名">
							    <el-input v-model="form.username" placeholder='请输入'></el-input>
							</el-form-item>
						</el-col>

						<el-col :md='11'>
							<el-form-item label="手机号">
							    <el-input v-model="form.tel" placeholder='请输入'></el-input>
							</el-form-item>
						</el-col>

						<el-col :md='11'>
							<el-form-item label="姓名">
							    <el-input v-model="form.name" placeholder='请输入姓名'></el-input>
							</el-form-item>
						</el-col>

						<el-col :md='11'>
							<el-form-item label="电子邮箱">
							    <el-input v-model="form.email" placeholder='请输入电子邮箱'></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
		
				<p class='title m-b20'>证书</p>
				<el-form :model='form' :label-width='labelWidth'>
					<el-row>
						<el-col :md='11'>
							<el-form-item label="SSH Password">
							    <el-input v-model="form.password" placeholder='请输入口令'></el-input>
							</el-form-item>
						</el-col>

						<el-col :md='11'>
							<el-form-item label="SSH Private Keys(DSA)">
							    <el-input v-model="form.privateKeys" placeholder='请输入秘钥'></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>

		    	<div class='btn-group-lg'>
		    		<el-button type="primary" @click="save('form')">保存</el-button>
					<el-button @click="resetForm('form')">重置</el-button>
		    	</div>
	    		
	    	</div>
	    </div>
    </div>
</template>
<script type="text/javascript">
	export default {
		data () {
			return {
				labelWidth: '9.33rem',
				form: {
					username: '',			//用户名
					tel: '',				//手机号
					name: '',				//姓名
					email: '',				//电子邮箱
					password: '',			//口令
					privateKeys: '',		//秘钥
				}
			}
		},
		methods: {
			//添加数据
			addData (formName) {
				//向表格添加数据
				//校验表单数据
				let formData = this[this.activeName + 'DialogFormData'];
				let tableData = this[this.activeName + 'TableData'];
				let tableHeadName = this[this.activeName + 'TableHeadName'];
				let storageType = 'sanAdd'
				let res = app.validator.isFormCheck(formData)
				if (res !== true) {
					this.$alert(res, {
						title: '提示',
						type: 'info'
					})
					return;
				}

				//如果是编辑
				if (this.title === '编辑') {
					for (let key in formData) {
						tableData[this.index][key] = formData[key][key]
					}
				} else {
					let obj = {
						storageType
					}
					for (let key in formData) {
						obj[key] = formData[key][key]
						tableHeadName[key] = formData[key].labelName
					}
					tableData.push(obj)
				}
				//请求接口
				this.dialogVisible = false;
			},
			save (formName) {
				/*校验数据*/
				let res = app.validator.isFormCheck(this.formData)
				let params = {
					json: this[this.activeName + 'TableData'],
					resourceType: 'storage',
					applicationName: this.applicationName

				};
				if (res !== true) {
					this.$alert(res, {
						title: '提示',type: 'info'
						
					})
					return;
				}
				/*table表格至少填写一行*/
				if (!this[this.activeName + 'TableData'].length) {
					this.$alert("至少填写一行数据", {
						title: '提示',type: 'info'
					})
				}
				for (let key in this.formData) {
					params[key] = this.formData[key][key]
				}
				this.saveData(params)
			},
			saveData (params) {
				app.go('workMange')
				app.post('/formSubmit/ticket-request', params, res => {
					if (res.msg === 'success') {

					}
				})
			},
			resetForm(formName) {
				app.tools.resetFormData(this.form)
			},
			
		},
		created () {
			
		}
	}
</script>