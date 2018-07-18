<template>
    <div class='box'>
    	<div class="x86-resource">
    		<div class='main-middle'>
		    	<el-tabs v-model="activeName">
		    		<div class="compenent-form">
			    		<v-form 
				    		:formData='formData'
				    		:isShowProductModule='isShowProductModule'
							:isShowSearchInput='isShowSearchInput'
							:isShowNoData='isShowNoData'
							:activeClass='activeClass' 
				    		@emitFromChild='emitFromChild'
							@querySearch='querySearch'
							@focus='focus'
					    	ref='form'
				    	>
				    	</v-form>
				    </div>
			    	<div class="empty"></div>
					<el-tab-pane label="申请" name="x86Add">
						<div class="compenent-form">
							<v-table 
								@editRow='editRow'
								:data='x86AddTableData' 
								:tableHeadName='x86AddTableHeadName'  
							></v-table>
						</div>

						<div class='btn-wraper btn-add'>
							<button @click="validatorTableLength">+</button>
						</div>
					</el-tab-pane>

					<el-tab-pane label="变更" name="x86Update">
						<div class="compenent-form">
							<v-table 
								@editRow='editRow'
								:data='x86UpdateTableData' 
								:tableHeadName='x86UpdateTableHeadName' 
							></v-table>
						</div>

						<div class='btn-wraper btn-add'>
							<button @click="validatorTableLength">+</button>
						</div>
					</el-tab-pane>

					<el-tab-pane label="回收" name="x86Recycle">
						<div class="compenent-form">
							<v-table 
								@editRow='editRow'
								:data='x86RecycleTableData' 
								:tableHeadName='x86RecycleTableHeadName' 
							></v-table>
						</div>

						<div class='btn-wraper btn-add'>
							<button @click="validatorTableLength">+</button>
						</div>
					</el-tab-pane>
		    	</el-tabs>

	    		<div class='btn-group-lg'>
		    		<el-button type="primary" @click="save">保 存</el-button>
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
		    	:formData='activeName === "x86Add" ? x86AddDialogFormData : activeName === "x86Update" ? x86UpdateDialogFormData : x86RecycleDialogFormData'
		    	:hiddenField='activeName === "x86Add" ? x86AddHiddenFormField : activeName === "x86Update" ? x86UpdateHiddenFormField : x86RecycleHiddenFormField'
		    	:span='12'
		    	:isOffset='false'
		    	:isShowTooltips='true'
		    	:isGutter='true'
		    	labelWidth='95px'
		    	@emitFromChild='emitFromChild'
		    >
	    	</v-form>
	    	<el-row>
	    		<el-col class='text-right'>
    			  	<el-button type="primary" @click="addData">确 定</el-button>
	    	    	<el-button @click="dialogVisible = false">取 消</el-button>
	    		</el-col>
	    	</el-row>
    	</el-dialog>
    </div>
</template>
<style lang='scss'>
	.x86-resource {
		.main-middle {
			padding: 0;
		}
		.el-tabs__header {
			margin-bottom: 0
		}
		.el-tabs__header,.compenent-form,{
			padding: 0 20px;
		}
	}
</style>
<script type="text/javascript">
	export default {
		data () {
			return {
				title: '新增',
				activeName: 'x86Add',
				x86AddHiddenFormField: {},
				x86AddSourceHiddenFormField: {},
				x86UpdateSourceHiddenFormField: {},
				x86UpdateHiddenFormField: {},
				x86RecycleSourceHiddenFormField: {},
				x86RecycleHiddenFormField: {},
				hiddenCol: {},
				dialogVisible: false,
				index: 0,					//table表格索引
				productModuleSelArr: [],	//产品模块下拉框选项
				isShowProductModule: false,	//产品模块下拉框是否展示选择产品模块选项
				isShowSearchInput: false,	//产品模块下拉框是否展示模糊搜索输入框
				isShowNoData: false,		//产品模块下拉框是否展示暂无数据
				activeClass: '',
				diskData: [],				//保存磁盘下拉框数据
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
				x86AddDialogFormData: {
					
				},
				x86UpdateDialogFormData: {
					
				},
				x86RecycleDialogFormData: {
					
				},
				x86AddTableData: [],
		        x86AddTableHeadName: {},
		        x86UpdateTableData: [],
		        x86UpdateTableHeadName: {},
		        x86RecycleTableData: [],
		        x86RecycleTableHeadName: {},
			}
		},
		methods: {
			validatorTableLength () {
				let tableData = this[this.activeName + 'TableData'];
				/*表格数据超过60行则提示用户不可再添加*/
				if (tableData.length >= 60) {
					this.$alert('table表格数据超过60条，不可再添加', {title: '提示',type: 'info'})
					return;
				} else {
					this.dialogVisible = true
				}
			},
			checkX86ChangeData () {
				let msg = '';
				let formObj = this[this.activeName + 'DialogFormData']
				let updateType = formObj['updateType']['updateType']
				for (let item in this[this.activeName + 'HiddenFormField']) {
					if (item == 'updateType' || item == updateType || item == 'masterName'|| item == 'ipAddress'|| item == 'original') {
						let val = formObj[item][item]
						if (!val && (item != 'original')) {
							return formObj[item].labelName + '必填'
						}

						if (item === 'ipAddress') {
							msg = app.validator.ipValidate(formObj[item][item])
						}
					}	
				}
				return msg;
			},
			//添加数据
			addData (formName) {
				//向表格添加数据
				//校验表单数据
				let formData = this[this.activeName + 'DialogFormData'];
				let tableData = this[this.activeName + 'TableData'];
				let tableHeadName = this[this.activeName + 'TableHeadName'];
				let res = ''
				let obj = {}
				if (this.activeName === 'x86Update') {
					res = this.checkX86ChangeData ()
				} else {
					res = app.validator.isFormCheck(formData)
				}
				if (res) {
					this.$alert(res, {
						title: '提示',type: 'info'
					})
					return;
				}

				//如果是编辑
				if (this.title === '编辑') {
					for (let key in formData) {
						if (this[this.activeName + 'HiddenFormField'][key]) {
							tableData[this.index][key] = formData[key][key].toString()
						} else {
							tableData[this.index][key] = '';
							formData[key][key] = '';
						}	
					}
				} else {
					for (let key in formData) {
						obj[key] = formData[key][key].toString()
						tableHeadName[key] = formData[key].labelName
					}
					tableData.push(obj)
				}
				this.resetHiddenFormField();
				this.dialogVisible = false;
			},
			//关闭对话框需将数据清空
			closeDialog () {
				app.tools.closeDialog(this)
				this.resetHiddenFormField();
			},
			editRow ({row, title, $index}) {
				for (let key in row) {
					row[key] && (this[this.activeName + 'HiddenFormField'][key] = true)
				}
				app.tools.editRow(this, {row, title, $index})
			},
			resetForm(formName) {
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
			save (formName) {
				/*校验数据*/
				let res = app.validator.isFormCheck(this.formData)
				let url = '/Gaea_api/requestFrom'
				let params = {
					json: this[this.activeName + 'TableData'],
					resourceType: this.activeName,
					applicationName: this.applicationName,
					userid: this.$store.state.username
				};
				if (res) {
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
					return
				}
				for (let key in this.formData) {
					params[key] = this.formData[key][key]
				}
				this.saveData(url, params)
			},
			saveData (url, params) {
				app.post(url, params, res => {
					app.go({path: 'X86ResourceProcessingList', params: {ticketNumber: res.data.data.ticketNum, taskId: res.data.data.taskId}})
				}, err => {
					this.$alert('提交失败', {
						title: '提示',
						type: 'info'
					})
				})
			},
			resetHiddenFormField () {
				this[this.activeName + 'HiddenFormField'] = Object.assign({}, this[this.activeName + 'SourceHiddenFormField'])
			},
			getData (params, type) {
				let url = '/Gaea_api/getDeployfrom'
				app.post(url, params, response => {
					let data = {}
					let labelObj = {}
					for (let i of response.data.data) {
						if (type === 'x86Update') {
							if (['updateType','masterName','ipAddress'].indexOf(i.cloumn) != -1) {
								this[type + 'HiddenFormField'][i.cloumn] = true;
								this[type + 'SourceHiddenFormField'][i.cloumn] = true;
							} else {
								this[type + 'HiddenFormField'][i.cloumn] = false;
								this[type + 'SourceHiddenFormField'][i.cloumn] = false;
							}
						}
						i.labelName = i.lableName
						i[i.cloumn] = i.defaultValue || ''
						i.disabled = i.disabled != 'true' ? false : true
						i.type = i.inputType
						data[i.cloumn] = i
						labelObj[i.cloumn] = i.lableName
						if (i.cloumn === 'disk') {
							this.diskData = JSON.parse(i.value)
						}		
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
					this[type + 'TableHeadName'] = Object.assign({}, labelObj)
					this[type + 'DialogFormData'] = Object.assign({}, data)
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
			//x86资源申请下拉框的下拉选项
			this.getData({
				typeCode: 'x86Add'
			}, 'x86Add')
			//x86资源变更表格下拉框的下拉选项
			this.getData({
				typeCode: 'x86Update'
			}, 'x86Update')

			//x86资源回收表格下拉框的下拉选项
			this.getData({
				typeCode: 'x86Recycle'
			}, 'x86Recycle')

			//获取领域下拉选项
			this.getRegionData()
		},
	}
</script>