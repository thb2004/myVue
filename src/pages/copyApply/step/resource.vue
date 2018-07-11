<template>
    <div class='box'>
    	<div class='copy-apply'>
	    	<div class='main-top'>
		    	<p class='title'>资源信息</p>
		    	<v-form 
			    	:formData='formData'
					:isShowProductModule='isShowProductModule'
					:isShowSearchInput='isShowSearchInput'
					:isShowNoData='isShowNoData'
					:activeClass='activeClass'
					:label-width='labelWidth'
					@emitFromChild='emitFromChild'
					@querySearch='querySearch'
					@focus='focus' 
			    	ref='form'>
		    	</v-form>
				<div class='btn-group-lg'>
		    		<el-button type="primary" @click="save('form')" size='small'>保存</el-button>
					<el-button @click="resetForm"  size='small'>重置</el-button>
		    	</div>
		    </div>
	    </div>
    </div>
</template>
<style lang='scss'>
	.copy-apply {
		.main-top {
			margin-bottom: 0;
		}
	}
</style>
<script type="text/javascript">
	import { mapMutations } from "vuex";
	export default {
		name: 'copyApply',
		data () {
			return {
				labelWidth: '9.33rem',
				formData: {
					groupId: {
						groupId: '',
						labelName: '部门',
						selectData: [],
					},
					moduleId: {
						moduleId: '',
						labelName: '产品模块',
						selectData: [],
					},
					env: {
						env: '',
						labelName: '环境类型',
						selectData: [
							{
								label: '(传统)生产环境',
								value: 'F'
							},
							{
								label: '(传统)测试环境',
								value: 'T'
							},
							{
								label: '(传统)容灾环境',
								value: 'D'
							},
							{
								label: '(开源)开发环境',
								value: 'DEV'
							},
							{
								label: '(开源)测试环境',
								value: 'SIT'
							},
							{
								label: '(开源)uat环境',
								value: 'UAT'
							},
							{
								label: '(开源)ver环境',
								value: 'VER'
							},
							{
								label: '(开源)生产环境',
								value: 'PRD'
							},
							{
								label: '(开源)容灾环境',
								value: 'DIS'
							},
						],
					},
					applicationId: {
						applicationId: '',
						labelName: '应用名称',
						selectData: [],
					},
					applicationManager: {
						applicationManager: '',
						labelName: '应用管理员',
						type: 'input',
					},
					systemManager: {
						systemManager: '',
						labelName: '系统管理员',
						type: 'input',
					},
				},
				productModuleSelArr: [],	//产品模块下拉框选项
				isShowProductModule: false,	//产品模块下拉框是否展示选择产品模块选项
				isShowSearchInput: false,	//产品模块下拉框是否展示模糊搜索输入框
				isShowNoData: false,		//产品模块下拉框是否展示暂无数据
				activeClass: '',
				applicationName: '',
			}
		},
		methods: {
			//保存数据
			save (formName) {
				//先校验必填数据
				let validatorFieldArr = ['groupId', 'moduleId', 'env', 'applicationId' ,'applicationManager', 'systemManager']
				let url = '/Gaea_api/requestFrom'
				let res = ''
				let params = {
					resourceType: 'backupAdd',
					applicationName: this.formData.applicationName,
					userid: this.$store.state.username
				};
				for (let key of validatorFieldArr) {
					if (!this.formData[key][key]) {
						res = this.formData[key].labelName + '必填'
						break;
					}
				}
				if (res) {
					this.$alert(res, {
						title: '提示',
						type: 'info'
					})
					return;
				}
				for (let key of validatorFieldArr) {
					params[key] = this.formData[key][key]
				}
				this.saveData(url, params)
			},
			saveData (url, params) {
				app.post(url, params, res => {
					app.go({path: 'X86ResourceProcessingList', params: {ticketNumber: res.data.data.ticketNum, taskId: res.data.data.taskId}})
				})
			},
			//重置表单
			resetForm() {
				app.tools.resetData(this.formData)
			},
			emitFromChild(key) {
				app.tools.emitFromChild(this, key)
			},
			querySearch (querySearch) {
				app.tools.querySearch(this, querySearch)
			},
			focus () {
				app.tools.focus(this)
			},
			/*获取领域下拉框数据*/
			getRegionData () {
				app.post('/Gaea_api/getAllProcessDept', {}, res => {
					for (let i of res.data.data) {
						i.label = i.org;
						i.value = i.staticid;
						this.formData.groupId.selectData.push(i)
					}
				})
			},
			getApplicationData () {
				app.post('/Gaea_api/getApplication', {}, res => {
					for (let i of res.data.data) {
						i.label = i.appName;
						i.value = i.appName;
						this.formData.applicationId.selectData.push(i)
					}
				})
			},
			getSysMangerData () {
				app.post('/workflow/application/list/', {}, res => {
					!this.formData.manager && (this.formData.manager = {})
					for (let i of res.data) {
						i.label = i.cn_name + ' ' + i.uid;
						i.value = i.uid;
						this.formData.manager.selectData.push(i)
					}
					this.formData = Object.assign({}, this.formData)
				})
			},
			//获取从申请类型-结尾的表单动态内容
			getData (url, params) {
				app.post(url, params, res => {
					let data = {}
					for (let i of res.data.data) {
						i.labelName = i.lableName
						i[i.cloumn] = i.defaultValue || ''
						i.disabled = i.disabled != 'true' ? false : true
						i.type = i.inputType
						data[i.cloumn] = i
						if (i.inputType === 'select') {
							data[i.cloumn].selectData = []
							let obj = JSON.parse(i.value)
							for (let key in obj) {
								data[i.cloumn].selectData.push({
									label: obj[key],
									value: key
								})
							}
						}
					}
					//未声明的变量动态加载的数据需assign.避免视图不review
					this.formData = Object.assign({}, this.formData, data)
				})
			}
		},
		beforeRouteEnter (to, from, next) {
			next( vm => {
				app.tools.resetData(vm.formData)  	
			})
		},
		created () {
			//获取领域下拉选项
			this.getRegionData()
			//获取应用名称下拉框选项
			this.getApplicationData()
			//获取系统管理员下拉框选项
			this.getSysMangerData()

			this.getData('/Gaea_api/getDeployfrom', {
				typeCode: 'backupAdd'
			})
	
		}
	}
</script>