<template>
    <div class='box'>
    	<div class="middle-resourece">
    		<div class='main-top'>
				<p class='title'>资源信息</p>
				<v-form 
		    		:formData='formData'
		    		:isShowProductModule='isShowProductModule'
					:isShowSearchInput='isShowSearchInput'
					:isShowNoData='isShowNoData'
					:activeClass='activeClass' 
		    		@emitFromChild='emitFromChild'
					@querySearch='querySearch'
					@focus='focus'
			    	ref='form'>
		    	</v-form>
    		</div>
    		<div class="empty"></div>
	    	<div class='main-middle'>
				<v-table 
	    			@editRow='editRow'
	    			:data='tableData' 
	    			:tableHeadName='tableHeadName'  
	    		></v-table>
	    		<div class='btn-wraper btn-add'>
		    		<button @click="validatorTableLength">+</button>
		    	</div>

	    		<div class='btn-group-lg'>
		    		<el-button type="primary" @click="save('form')">保 存</el-button>
					<el-button @click="resetForm('form')">重 置</el-button>
		    	</div>
	    	</div>
	    </div>

	    <el-dialog
    	  :title="title"
    	  :visible.sync="dialogVisible"
    	  width="50%"
    	  @close='closeDialog'
    	  >
	    	<v-form 
		    	ref='form' 
		    	:formData='dialogFormData'
		    	:span='12'
		    	:isOffset='false'
		    	:isGutter='true'
		    	labelWidth='93px'
		    	@emitFromChild='emitFromChild'
		    >
	    	</v-form>

	    	<el-row>
	    		<el-col class='text-right'>
    			  	<el-button type="primary" @click="addData">确 定</el-button>
	    	    	<el-button @click="dialogVisible=false">取 消</el-button>
	    		</el-col>
	    	</el-row>
    	</el-dialog>
    </div>
</template>

<style lang='scss' scoped>
	@import '../../../css/variable';
	.box .main-middle {
		padding-top: $baseSize*2;
	}
	
</style>

<script type="text/javascript">
	export default {
		data () {
			return {
				title: '添加',
				dialogVisible: false,
				currentName: 'midwareAdd',
				productModuleSelArr: [],	//产品模块下拉框选项
				isShowProductModule: false,	//产品模块下拉框是否展示选择产品模块选项
				isShowSearchInput: false,	//产品模块下拉框是否展示模糊搜索输入框
				isShowNoData: false,		//产品模块下拉框是否展示暂无数据
				activeClass: '',
				formData: {
						groupId: {
							groupId: '',
							labelName: '部门',
							selectData: [],
							required: 'required'
						},
						moduleId: {
							moduleId: '',
							labelName: '产品模块',
							selectData: [],
							required: 'required'
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
							required: 'required'
						},
						applicationId: {
							applicationId: '',
							labelName: '应用名称',
							selectData: [],
							required: 'required'
						},
						applicationManager: {
							applicationManager: '',
							labelName: '应用管理员',
							type: 'input',
							required: 'required'
						},
						systemManager: {
							systemManager: '',
							labelName: '系统管理员',
							type: 'input',
							required: 'required'
						},
					},
				dialogFormData: {
					
				},
				tableData: [],
		        tableHeadName: {}
			}
		},
		methods: {
			validatorTableLength () {
				/*表格数据超过60行则提示用户不可再添加*/
				if (this.tableData.length >= 60) {
					this.$alert('table表格数据超过60条，不可再添加', {title: '提示',type: 'info'})
					return;
				} else {
					this.dialogVisible = true
				}
			},
			//添加数据
			addData (formName) {
				//向表格添加数据
				//校验表单数据
				let res = app.validator.isFormCheck(this.dialogFormData)
				let obj = {}
				if (res) {
					this.$alert(res, {
						title: '提示',type: 'info'
					})
					return;
				}

				//如果是编辑
				if (this.title === '编辑') {
					for (let key in this.dialogFormData) {
						this.tableData[this.index][key] = this.dialogFormData[key][key].toString()
					}
				} else {
					for (let key in this.dialogFormData) {
						obj[key] = this.dialogFormData[key][key].toString()
					}
					this.tableData.push(obj)
				}
				//请求接口
				this.dialogVisible = false;
			},
			//关闭对话框需将数据清空
			closeDialog () {
				app.tools.closeDialog(this)
			},
			editRow ({row, title, $index}) {
				app.tools.editRow(this, {row, title, $index})
			},
			//重置表单
			emitFromChild(key) {
				app.tools.emitFromChild(this, key)
			},
			querySearch (querySearch) {
				app.tools.querySearch(this, querySearch)
			},
			focus () {
				app.tools.focus(this)
			},
			save (formName) {
				let url = '/Gaea_api/requestFrom'
				let params = {
					json: this.tableData,
					resourceType: 'midwareAdd',
					applicationName: this.applicationName,
					userid: this.$store.state.username
				};
				/*校验数据*/
				let res = app.validator.isFormCheck(this.formData)
				if (res) {
					this.$alert(res, {
						title: '提示',type: 'info'
					})
					return;
				}
				/*table表格至少填写一行*/
				if (!this.tableData.length) {
					this.$alert("至少填写一行数据", {
						title: '提示',type: 'info'
					})
					return
				}
				for (let key in this.formData) {
					params[key] = this.formData[key][key]
				}
				this.saveData(url, params)
			},
			saveData (url, params) {
				app.post(url, params, res => {
					app.go({path: 'openResourceProcessingList', params: {ticketNumber: res.data.data.ticketNum, taskId: res.data.data.taskId}})
				}, err => {
					this.$alert('提交失败', {
						title: '提示',
						type: 'info'
					})
				})
			},
			resetForm (form) {
				app.tools.resetData(this.formData)
			},
			getData (url, params) {
				app.post(url, params, response => {
					let data = {}
					let labelObj = {}
					for (let i of response.data.data) {
						i.labelName = i.lableName
						i[i.cloumn] = i.defaultValue || ''
						i.disabled = i.disabled != 'true' ? false : true
						i.type = i.inputType
						data[i.cloumn] = i
						labelObj[i.cloumn] = i.lableName		
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
					this['tableHeadName'] = Object.assign({}, labelObj)
					this['dialogFormData'] = Object.assign({}, data)
				})
			},
			/*获取领域下拉框数据*/
			getRegionData () {
				app.post('/Gaea_api/getAllProcessDept', {
				}, res => {
					for (let i of res.data.data) {
						i.label = i.org;
						i.value = i.staticid;
						this.formData.groupId.selectData.push(i)
					}
				})
			},

		},
		created () {
			//获取中间件主机类型table表格下拉框的下拉选项
			this.getData('/Gaea_api/getDeployfrom', {
				typeCode: 'midwareAdd'
			})
			//获取领域下拉选项
			this.getRegionData()
		}
	}
</script>