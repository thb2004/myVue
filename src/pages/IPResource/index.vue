<template>
    <div class='box'>
    	<div class='ip-resource'>
    		<div class='main-middle'>
		    	<el-tabs v-model="activeName">
		    		<div :style='{"padding-right": $store.state.labelWidth}'>
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
		    	    <el-tab-pane label="IP申请" name="IPApply">
		    	    	<div class="empty"></div>
						<v-table 
							@editRow='editRow'
							:data='IPApplyTableData' 
							:tableHeadName='IPApplyTableHeadName'  
						></v-table>

	    	    	    <div class='btn-wraper btn-add'>
	    	    	    	<button @click="validatorTableLength">+</button>
	    	    	    </div>
		    	    </el-tab-pane>
		    	    <el-tab-pane label="IP回收" name="IPRecycle">
		    	    	<div class="empty"></div>
		    	    	<v-table 
							@editRow='editRow'
							:data='IPRecycleTableData' 
							:tableHeadName='IPRecycleTableHeadName'  
						></v-table>

	    	    	    <div class='btn-wraper btn-add'>
	    	    	    	<button @click="validatorTableLength">+</button>
	    	    	    </div>
		    	    </el-tab-pane>
			    </el-tabs>

	    	    <div class='btn-group-lg'>
	        		<el-button type="primary" @click="save('form')">保 存</el-button>
	    			<el-button @click="resetForm('form')">重 置</el-button>
	        	</div>
    		</div>
	   </div>

   	    <el-dialog
       	  :title="title"
       	  :visible.sync="dialogVisible"
       	  :close-on-click-modal='false'
       	  width="50%"
       	  @close='closeDialog'
       	  >
   	    	<v-form 
   		    	ref='form' 
   		    	:formData='activeName === "IPApply" ? IPApplyDialogFormData : IPRecycleDialogFormData'
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

<style lang='scss'>
	@import '../../css/variable';
	.box .ip-resource {
		.main-middle {
			padding: 0;
		}
		.el-tabs__header {
			margin-bottom: 0
		}
		.el-tabs__header, .component-table{
			padding: 0 $baseSize*2;
		}
	}
</style>

<script type="text/javascript">
	export default {
		data () {
			return {
				title: '添加',
				index: 0,					//table表格索引
				activeClass: '',			
				productModuleSelArr: [],	//产品模块下拉框选项
				isShowProductModule: false,	//产品模块下拉框是否展示选择产品模块选项
				isShowSearchInput: false,	//产品模块下拉框是否展示模糊搜索输入框
				isShowNoData: false,		//产品模块下拉框是否展示暂无数据
				activeName: 'IPApply',
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
									label: '开发环境',
									value: 'DEV'
								},
								{
									label: '测试环境',
									value: 'SIT'
								},
								{
									label: 'uat环境',
									value: 'UAT'
								},
								{
									label: 'ver环境',
									value: 'VER'
								},
								{
									label: '生产环境',
									value: 'PRD'
								},
								{
									label: '容灾环境',
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
				IPApplyTableData: [],
		        IPApplyTableHeadName: {},
		        IPRecycleTableData: [],
		        IPRecycleTableHeadName: {},
		        IPApplyDialogFormData: {},
			    IPRecycleDialogFormData: {},
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
				let obj = {}
				let res = app.validator.isFormCheck(formData)
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
				let resourceType = this.activeName === 'IPApply' ? 'ipAdd' : 'ipRecycle'
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
				}
				for (let key in this.formData) {
					params[key] = this.formData[key][key]
				}
				this.saveData(url, params)
			},
			saveData (url, params) {
				app.post(url, params, res => {
					app.go({path: 'processingList', query: {ticketNumber: res.data.data.ticketNum, taskId: res.data.data.taskId}})
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
			//获取IP申请表格下拉框的下拉选项
			app.tools.getFormData(this, {
				typeCode: 'ipAdd'
			}, 'IPApply')
			
			//获取IP回收表格下拉框的下拉选项
			app.tools.getFormData(this, {
				typeCode: 'ipRecycle'
			}, 'IPRecycle')
			
			//获取领域下拉选项
			this.getRegionData()
		}

	}
</script>