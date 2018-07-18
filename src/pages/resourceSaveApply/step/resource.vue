<template>
    <div class='box'>
    	<div class='resourece-save-apply'>
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
			    	ref='form'
		    	>
		    	</v-form>
	    	</div>
	    	<div class="empty"></div>
	    	<div class='main-middle'>
		    	<el-tabs v-model="activeName">
		    	    <el-tab-pane label="SAN申请" name="SANApply">
		    	    	<v-table 
							@editRow='editRow'
							:data='SANApplyTableData' 
							:tableHeadName='SANApplyTableHeadName'  
						></v-table>

	    	    	    <div class='btn-wraper btn-add'>
	    	    	    	<button @click="validatorTableLength">+</button>
	    	    	    </div>
		    	    </el-tab-pane>
		    	    <el-tab-pane label="SAN回收" name="SANRecycle">
		    	    	<v-table 
							@editRow='editRow'
							:data='SANRecycleTableData' 
							:tableHeadName='SANRecycleTableHeadName'  
						></v-table>

	    	    	    <div class='btn-wraper btn-add'>
	    	    	    	<button @click="validatorTableLength">+</button>
	    	    	    </div>
		    	    </el-tab-pane>
		    	    <el-tab-pane label="NAS申请" name="NASApply">
		    	    	<v-table 
							@editRow='editRow'
							:data='NASApplyTableData' 
							:tableHeadName='NASApplyTableHeadName'  
						></v-table>

	    	    	    <div class='btn-wraper btn-add'>
	    	    	    	<button @click="validatorTableLength">+</button>
	    	    	    </div>
		    	    </el-tab-pane>
		    	    <el-tab-pane label="NAS回收" name="NASRecycle">
		    	    	<v-table 
							@editRow='editRow'
							:data='NASRecycleTableData' 
							:tableHeadName='NASRecycleTableHeadName' 
						></v-table>

	    	    	    <div class='btn-wraper btn-add'>
	    	    	    	<button @click="validatorTableLength">+</button>
	    	    	    </div>
		    	    </el-tab-pane>
    	    	    <el-tab-pane label="NAS变更" name="NASChange">
    	    	    	<v-table
    						@editRow='editRow'
    						:data='NASChangeTableData' 
    						:tableHeadName='NASChangeTableHeadName' 
    					></v-table>

        	    	    <div class='btn-wraper btn-add'>
        	    	    	<button @click="validatorTableLength">+</button>
        	    	    </div>
    	    	    </el-tab-pane>
		    	</el-tabs>
		    	<div class='my-remark'><span>备注:便于后期管理，主机备注长度不限，详细为主</span></div>
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
		    	:formData='activeName === "SANApply" ? SANApplyDialogFormData
		    			 : activeName === "SANRecycle" ? SANRecycleDialogFormData 
		    			 : activeName === "NASApply" ? NASApplyDialogFormData
		    			 : activeName === "NASChange" ? NASChangeDialogFormData
		    			 : NASRecycleDialogFormData'
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
	    	    	<el-button @click="dialogVisible = false">取 消</el-button>
	    		</el-col>
	    	</el-row>
    	</el-dialog>
    </div>
</template>
<script type="text/javascript">
	export default {
		data () {
			return {
					title: '添加',
					applicationName: '',		//应用名称text值
					index: 0,					//table表格索引
					activeClass: '',			
					productModuleSelArr: [],	//产品模块下拉框选项
					isShowProductModule: false,	//产品模块下拉框是否展示选择产品模块选项
					isShowSearchInput: false,	//产品模块下拉框是否展示模糊搜索输入框
					isShowNoData: false,		//产品模块下拉框是否展示暂无数据
					activeName: 'SANApply',
					dialogVisible: false,
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
					SANApplyTableData: [],
			        SANApplyTableHeadName: {},
			        SANApplyDialogFormData: {},

			        SANRecycleDialogFormData: {},

			        NASApplyDialogFormData: {},

			        NASChangeDialogFormData: {},

			        NASRecycleDialogFormData: {},

			        SANRecycleTableData: [],

			        SANRecycleTableHeadName: {},

			        NASApplyTableData: [],

			        NASApplyTableHeadName: {},

			        NASRecycleTableData: [],

			        NASRecycleTableHeadName: {},

			        NASChangeTableData: [],

			        NASChangeTableHeadName: {},

			        NASChangeDialogFormData: {},
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
			//添加数据
			addData (formName) {
				//向表格添加数据
				//校验表单数据
				let formData = this[this.activeName + 'DialogFormData'];
				let tableData = this[this.activeName + 'TableData'];
				let tableHeadName = this[this.activeName + 'TableHeadName'];
				let storageType = this.activeName === 'SANApply' ? 'sanAdd' :
								  this.activeName === 'SANRecycle' ? 'sanRecycle' :
								  this.activeName === 'NASApply' ? 'nasAdd' : 
								  this.activeName === 'NASChange' ? 'nasUpdate': 'nasRecycle'
				let obj = {
					storageType,
				}
				let res = app.validator.isFormCheck(formData, 'resourceSave')
				if (res) {
					this.$alert(res, {
						title: '提示',type: 'info'
					})
					return;
				}

				//如果是编辑
				if (this.title === '编辑') {
					for (let key in formData) {
						tableData[this.index][key] = formData[key][key].toString()
					}
				} else {
					for (let key in formData) {
						obj[key] = formData[key][key].toString()
						tableHeadName[key] = formData[key].labelName
					}
					tableData.push(obj)
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
			save (formName) {
				/*校验数据*/
				let res = app.validator.isFormCheck(this.formData)
				let url = '/Gaea_api/requestFrom'
				let resourceType = 'storage'
				let params = {
					json: this[this.activeName + 'TableData'],
					resourceType,
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
					return;
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
			resetForm(formName) {
				app.tools.resetData(this.formData)
			},
			querySearch (querySearch) {
				app.tools.querySearch(this, querySearch)
			},
			focus () {
				app.tools.focus(this)
			},
			emitFromChild(key) {
				app.tools.emitFromChild(this, key)
			},
			getData (url, params, type) {
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
					this[type + 'TableHeadName'] = Object.assign({}, labelObj)
					this[type + 'DialogFormData'] = Object.assign({}, data)
				})
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
		},
		created () {
			//获取san申请表格下拉框的下拉选项
			this.getData('/Gaea_api/getDeployfrom', {
				typeCode: 'sanAdd'
			}, 'SANApply')

			//获取san回收表格下拉框的下拉选项

			this.getData('/Gaea_api/getDeployfrom', {
				typeCode: 'sanRecycle'
			}, 'SANRecycle')

			//获取nas申请表格下拉框的下拉选项

			this.getData('/Gaea_api/getDeployfrom', {
				typeCode: 'nasAdd'
			}, 'NASApply')

			//获取nas回收表格下拉框的下拉选项
			this.getData('/Gaea_api/getDeployfrom', {
				typeCode: 'nasRecycle'
			}, 'NASRecycle')

			//获取nas变更表格下拉框的下拉选项
			this.getData('/Gaea_api/getDeployfrom', {
				typeCode: 'NASChange'
			}, 'NASChange') 

			//获取领域下拉选项
			this.getRegionData()
		}
	}
</script>