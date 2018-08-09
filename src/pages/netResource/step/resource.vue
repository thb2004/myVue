<template>
    <div class='box'>
    	<div class='net-resource'>
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
		    	    <el-tab-pane label="F5自动化表单" name="F5">
		    	    	<div class="empty"></div>
						<v-table 
							@editRow='editRow'
							:data='F5TableData' 
							:tableHeadName='F5TableHeadName'  
						></v-table>

	    	    	    <div class='btn-wraper btn-add'>
	    	    	    	<button @click="validatorTableLength">+</button>
	    	    	    </div>
		    	    </el-tab-pane>
		    	    <el-tab-pane label="DNS自动化表单" name="DNS">
		    	    	<div class="empty"></div>
		    	    	<v-table 
							@editRow='editRow'
							:data='DNSTableData' 
							:tableHeadName='DNSTableHeadName'  
						></v-table>

	    	    	    <div class='btn-wraper btn-add'>
	    	    	    	<button @click="validatorTableLength">+</button>
	    	    	    </div>
		    	    </el-tab-pane>

		    	     <el-tab-pane label="防火墙" name="networkFIR">
		    	    	<div class="empty"></div>
		    	    	<v-table 
							@editRow='editRow'
							:data='networkFIRTableData' 
							:tableHeadName='networkFIRTableHeadName'  
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
   		    	:formData='activeName === "F5" ? F5DialogFormData : activeName === "DNS" ? DNSDialogFormData : networkFIRDialogFormData'
   		    	:span='12'
		    	:isOffset='false'
		    	:isGutter='true'
		    	:labelWidth='activeName === "networkFIR" ? "100px" : activeName === "F5" ? "140px" : "155px"'
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
	.net-resource {
		.main-middle {
			padding: 0;
		}
		.el-tabs__header,.compenent-form,{
			padding: 0 20px;
		}
		.component-table {
			padding: 20px 20px 0 20px;
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
				activeName: 'F5',
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
						selectData: [{
							label: '开发环境',
							value: 'DEV'
						}, {
							label: '测试环境',
							value: 'SIT'
						}, {
							label: 'uat环境',
							value: 'UAT'
						}, {
							label: 'ver环境',
							value: 'VER'
						}, {
							label: '生产环境',
							value: 'PRD'
						}, {
							label: '容灾环境',
							value: 'DIS'
						}, ],
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
				F5TableData: [],
		        F5TableHeadName: {},
		        DNSTableData: [],
		        DNSTableHeadName: {},
		        F5DialogFormData: {},
			    DNSDialogFormData: {},
			    networkFIRTableData: [],
			    networkFIRTableHeadName: {},
			    networkFIRDialogFormData: {},
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
				let res = app.validator.isFormCheck(formData, true)
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
				let resourceType = this.activeName === 'F5' ? 'networkF5' : this.activeName === 'DNS' ? 'networkDNS' : 'networkFIR'
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
					app.go({path: 'netResourceProcessingList', params: {ticketNumber: res.data.data.ticketNum, taskId: res.data.data.taskId}})
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

						if (i.cloumn === 'ipdress' || i.cloumn === 'toipdress') {
							i.placeholder = '格式如下：\nIP1 \nIP2'
						} else if (i.cloumn === 'toport') {
							i.placeholder = '格式如下：\nPORT1 \nPORT2'
						} else if (i.cloumn === 'ipAddressport') {
							i.placeholder = '格式如下：\nIP1:PORT \nIP2:PORT'
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
			//获取F5申请表格下拉框的下拉选项
			this.getData('/Gaea_api/getDeployfrom', {
				typeCode: 'networkF5'
			}, 'F5')
			//获取DNS表格下拉框的下拉选项
			this.getData('/Gaea_api/getDeployfrom', {
				typeCode: 'networkDNS'
			}, 'DNS')

			//获取防火墙表格下拉框的下拉选项
			this.getData('/Gaea_api/getDeployfrom', {
				typeCode: 'networkFIR'
			}, 'networkFIR')

			//获取领域下拉选项
			this.getRegionData()
		}

	}
</script>