<template>
	<div class='box'>
		<div class="process-flow">
			<div class="main-middle">
				<div class="compenent-form">
					<p class="title m-b20">工单详情</p>
					<ul class='work-detail-list clearfix'>
						<li>
							<label>资源类型：</label>
							<span>{{typeName}}</span>
						</li>
						<li>
							<label>所属应用：</label>
							<span>{{applicationName}}</span>
						</li>
						<li>
							<label>所属组织：</label>
							<span>{{groupId}}</span>
						</li>
						<li>
							<label>应用管理员：</label>
							<span>{{applicationManager}}</span>
						</li>
						<li>
							<label>所属模块：</label>
							<span>{{moduleId}}</span>
						</li>
						<li>
							<label>系统管理员：</label>
							<span>{{systemManager}}</span>
						</li>
					</ul>

					<v-table 
						:data='oneTableData' 
						:tableHeadName='oneTableHeadName'
						:isShowComments='false'
						:showOperator='showOperator'
						@editRow='editRow'
						@deleteRow='deleteRow'
						class='m-b20'
					>
					</v-table>
					<el-tabs 
						v-model="tabName"
						type='card'
					>
				    	<el-tab-pane label="提交申请" name="submit" v-if='leftTwoTab'>
				    		<el-button type='primary' class='m-tb15' @click='processSubmit("apply")'>提交待审批</el-button>
				    	</el-tab-pane>
				    	<el-tab-pane label="撤销" name="cancel" v-if='leftTwoTab'>
				    		<el-button type="info" class='m-tb15' @click='processSubmit("revoke")'>撤 销</el-button>
				    	</el-tab-pane>
				    	<el-tab-pane label="审批通过" name="pass" v-if='middleTwoTab'>
				    		<p class="title m-b10">审批意见</p>
				    		<div>
				    			<el-input
									type='textarea'
									v-model='yesAdvice'
									:rows='1'
				    			></el-input>
				    		</div>
				    		<div v-if='isShowStorageAudit'>
				    			<p class="title">配置更新</p>
				    			<v-table 
				    				:data='storageAuditTableData' 
				    				:tableHeadName='storageAuditTableHeadName'
				    				:isShowComments='false'
				    				@editRow='editstorageRow'
				    				@deleteRow='deleteStorageRow'
				    				class='m-b20'
				    			>
				    			</v-table>
				    			<div class='btn-wraper btn-add'>
				    				<button @click="dialogVisible = true,type=1">+</button>
				    			</div>
				    		</div>
				    		<el-button type='primary' class='m-tb15' @click='processSubmit("yes")'>提交</el-button>
				    	</el-tab-pane>
				    	<el-tab-pane label="驳回" name="reject" v-if='middleTwoTab'>
				    		<p class="title m-b10">驳回意见</p>
				    		<div>
				    			<el-input
									type='textarea'
									v-model='noAdvice'
									:rows='1'
				    			></el-input>
				    		</div>
				    		<el-button type='primary' class='m-tb15' @click='processSubmit("no")'>提交</el-button>
				    	</el-tab-pane>
				    	<el-tab-pane label="转办" name="turn" v-if='lastTab'>
				    		<p class="title">选择转办人员</p>
				    		<div class='m-tb15'>
				    			<el-button  type='primary'>选择</el-button>
				    			<el-button  type='primary'>确定</el-button>
				    		</div>
				    	</el-tab-pane>
				    </el-tabs>
			    </div>

			    <div class="empty"></div>

			    <div class="compenent-form">
					<p class="title m-b20">审批流程</p>
					<el-steps :active="activeIndex" class='m-b20'>
					  <el-step v-for='(item, index) in processingList' :key='index' :title='item.nodeName' :description="item.userName"></el-step>
					</el-steps>
				</div>

				<div class="empty"></div>

				<div class="compenent-form">
					<p class="title m-b10">审批记录</p>
	    	 		<v-table 
		    	 		:data='approveRecordTableData' 
		    	 		:tableHeadName='approveRecordTableHeadName'
		    	 		:showOperator='false'
		    		></v-table>
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
   		    	:formData='type === "2" ? oneDialogFormData : storageAuditDialogFormData'
   		    	:span='12'
		    	:isOffset='false'
		    	:isGutter='true'
		    	labelWidth='93px'
   		    	@emitFromChild='emitFromChild'
   		    >
   	    	</v-form>

	    	<el-row>
	    		<el-col :md='22' class='text-right'>
    			  	<el-button type="primary" @click="addData">确 定</el-button>
    				<el-button @click="dialogVisible = false">取 消</el-button>
	    		</el-col>
	    	</el-row>
       	</el-dialog>
	</div>

</template>
<style lang='scss'>
	.process-flow {
		.main-middle {
			padding: 0;
		}
		.compenent-form {
			padding: 0 20px
		}
		.work-detail-list {
			margin-bottom: 30px;
			li {
				line-height: 30px;
				float: left;
				padding-left: 0;
				width: 50%;
				label {
					display: inline-block;
					width: 100px;
					text-align: right;
					margin-right: 10px;
				}
			}
		}
	}
</style>
<script type="text/javascript">
	import { mapState } from "vuex";
	export default {
		data () {
			return {
				type: '',
				currentName: 'processingList',
				showOperator: true,
				title: '编辑',
				storageAuditTableData: [],
				storageAuditDialogFormData: {},
				storageAuditTableHeadName: {},
				isShowStorageAudit: false,
				leftTwoTab: false,
				middleTwoTab: false,
				lastTab: false,
				activeName: 'one',
				yesAdvice: '同意',			//审批意见
				noAdvice: '不同意',			//拒绝意见
				index: 0,					//table表格索引
				dialogVisible: false,
				oneDialogFormData: {},
				tabName: 'submit',				
				processingList: [],				//审批流程
				typeName: '',					//资源类型
				groupId: '',					//所属组织
				moduleId: '',					//所属模块
				applicationName: '',				//所属应用
				applicationManager: '',			//应用管理员
				systemManager: '',				//系统管理员
		        oneTableData: [],		//工单详情下的table数据
		        oneTableHeadName: {},	//工单详情下的tableheadname
		        approveRecordTableData: [],			//审批记录下的table数据
		        approveRecordTableHeadName: {		//审批记录下的表格头部名字
		        	taskName: '节点名称',
		            startTime: '开始时间',
		            endTime: '结束时间',
		            duraTime: '耗时',
		            remarks: '批注',
		        },
		        processInstanceId: '',
		        resourceType: '',
		        editFormData: {},
		        dataIds: '',
		        diskData: [],				//保存磁盘下拉框数据
		        activeIndex: 0,
			}
		},
		computed: {
			...mapState(['pages'])
		},
		methods: {
			processSubmit (typeApprove) {
				app.post('/Gaea_api/setApprove', {
					ticketNum: this.pages.params.ticketNumber,
					taskId: this.pages.params.taskId,
					typeApprove,
					content: this[typeApprove + 'Advice'] || '',
					user: this.$store.state.username,
				}, res => {
					if (res.data.code === '100001') {		//成功跳转我的代办列表
						app.go({path:'myMattersFirstPage',params: {ticketNumber: this.pages.params.ticketNumber, taskId: this.pages.params.taskId}})
					} else if (res.data.code != '505') {
						this.$alert(res.data.msg, {
							title: '提示',
							type: 'info'
						})
					}
				})
			},
			addRow () {
				//向表格添加数据
				//校验表单数据
				let formData = this.storageAuditDialogFormData;
				let tableData = this.storageAuditTableData;
				let tableHeadName = this.storageAuditDialogFormData;
				let res = app.validator.isFormCheck(formData)
				if (res) {
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
					for (let key in formData) {
						obj[key] = formData[key][key]
					}
					tableData.push(obj)
				}
				this.dialogVisible = false;
			},
			//添加数据
			addData (formName) {
				//向表格添加数据
				//校验表单数据
				let formData = this[this.activeName + 'DialogFormData'];
				let tableData = this[this.activeName + 'TableData'];
				let tableHeadName = this[this.activeName + 'TableHeadName'];
				let res = app.validator.isFormCheck(formData)
				let obj = {
					storageType: this.resourceType
				}
				if (res) {
					this.$alert(res, {
						title: '提示',
						type: 'info'
					})
					return;
				}
				//保存数据
				this.saveEditData()
			},
			saveEditData () {
				let formData = this[this.activeName + 'DialogFormData'];
				let tableData = this[this.activeName + 'TableData'];
				let obj = {
					id: this.dataIds.split(',')[this.index],
				}
				for (let key in formData) {
					obj[key] = String(formData[key][key])
				}
				app.post('/Gaea_api/saveUpdate', {
					obj: JSON.stringify(obj)
				}, res => {
					if (res.data.code != '505') {
						this.$alert(res.data.msg, {
							title: '提示',
							type: 'info'
						})
					}
					if (res.data.data === 'success') {		//保存成功更新table数据
						for (let key in formData) {
							tableData[this.index][key] = formData[key][key]
						}
						this.dialogVisible = false;
					}
				})
			},
			//关闭对话框需将数据清空
			closeDialog () {
				app.tools.closeDialog(this)
			},
			emitFromChild(key) {
				app.tools.emitFromChild(this, key)
			},
			editStorageRow ({row, title, $index}) {
				this.type = '1'
				this.title = title
				this.index = $index
				/*获取编辑内容并将编辑的内容赋予formdata*/
				for (let k in row) {
					this.storageAuditDialogFormData[k][k] = row[k]
				}
				this.dialogVisible = true
			},
			editRow ({row, title, $index}) {
				this.type = '2'
				this.title = title
				this.index = $index
				/*获取编辑内容并将编辑的内容赋予formdata*/
				for (let k in row) {
					if (!row[k]) {			//当前td没有数据，，则此项不能修改
						this[this.activeName + 'DialogFormData'][k].disabled = true;
						this[this.activeName + 'DialogFormData'][k].required = '';
					} else {
						this[this.activeName + 'DialogFormData'][k][k] = row[k]
					}
				}
				this.dialogVisible = true
			},
			/*删除一行数据*/
			deleteRow ({row, title, index}) {
				if (this[this.activeName + 'TableData'].length === 1) {
					this.$alert('至少保留一行请求内容', {
						title: '提示',
						type: 'info'
					})
					return
				}
				this.index = index
				this.$confirm('确认要删除？', {
					title: '提示',
					type: 'warning',
					callback: (action, instance) => {
						if (action === 'confirm') {
							this.deleteData()
						}
					}
				})
			},
			/*删除一行数据*/
			deleteStorageRow ({row, title, index}) {
				if (this.storageAuditTableData.length === 1) {
					this.$alert('至少保留一行请求内容', {
						title: '提示',
						type: 'info'
					})
					return
				}
				this.storageAuditTableData.splice(index, 1)
			},
			deleteData () {
				app.post('/Gaea_api/deleteDate', {
					dataId: this.dataIds.split(',')[this.index],
				}, res => {
					if (res.data.code != '505') {
						this.$alert(res.data.msg, {
							title: '提示',
							type: 'info'
						})
					}
					if (res.data.data === 'success') {					//删除成功
						//更新table数据
						this[this.activeName + 'TableData'].splice(this.index, 1)
					}
				})
			},
			/*获取查看详情弹出框详情数据*/
			getDetailData (workOrder) {
				app.post('/Gaea_api/getTaskinfo', {ticketNum: workOrder}, res => {
					let status = res.data.data.status
					let title = res.data.data.title
					this.processInstanceId = res.data.data.processInstanceId
					this.resourceType = res.data.data.resourceType
					this.dataIds = res.data.data.dataIds
					for (let key in res.data.data) {
						this[key] != undefined && (this[key] = res.data.data[key])
					}
					if ( status === 'draft') {
						this.leftTwoTab = true
					} else if (status === 'pending' || (status === 'dispose')) {
						this.showOperator = false
						this.middleTwoTab = true
						this.tabName = 'pass'
						if (this.resourceType === 'storage' && title != "none" && title != null && title != "null") {
							this.isShowStorageAudit = true
							this.getTableHead('storageAudit', 'storageAudit')
						}

					}
					this.getTableHead(res.data.data.resourceType, 'one')
					this.getTableBody(res.data.data.dataIds)
					//获取审批记录
					this.viewHistory(res.data.data.processInstanceId)
				})	
			},
			getStorageFormData () {

			},
			/*获取表单头部名称*/
			getTableHead (type, name) {
				app.post('/Gaea_api/getDeployfrom', {
					typeCode: type
				}, res => {
					let data = {}
					let labelObj = {}
					for (let i of res.data.data) {
						i.labelName = i.lableName
						i[i.cloumn] = i.defaultValue || ''
						i.disabled = i.disabled != 'true' ? false : true
						i.type = i.inputType
						data[i.cloumn] = i
						labelObj[i.cloumn] = i.lableName
						if (i.cloumn === 'updateType') {
							i.disabled = true
						}	
						if (i.inputType === 'select') {
							data[i.cloumn].selectData = []
							/*如果申请资源类型未mysql,redis,mongdb中的一种。。则操作系统不可修改，由版本来控制*/
							if (['mysqlAdd','redisAdd','mongodbAdd'].indexOf(type) != -1 && i.cloumn === 'os') {
								data[i.cloumn].disabled = true;
							}
							let obj = JSON.parse(i.value)
							for (let key in obj) {
								data[i.cloumn].selectData.push({
									label: obj[key],
									value: key
								})
							}
						}
						this[name + 'TableHeadName'] = Object.assign({}, labelObj)
						this[name + 'DialogFormData'] = Object.assign({}, data)
					}
				})

			},
			/*获取表单body体数据*/
			getTableBody (id) {
				app.post('/Gaea_api/getTaskdata', {
					dataIds: id
				}, res => {
					for (let i of res.data.data) {
						let obj = {}
						for (let k of i) {
							obj[k.name] = k.fillValue
						}
						this.oneTableData.push(obj)
					}
				})
			},

			/*查看审批记录*/
			viewHistory (processInstanceId) {
				app.post('/Gaea_api/getApprovalinfo', {
					processInstanceId
				}, res => {
					//table数据清空
					this.approveRecordTableData = []
					for (let i of res.data.data) {
						i.remarks = ''
						if (i.comments.length > 0) {
							for (let item of i.comments) {
								i.remarks += "处理人："+ item.userId + "； " + item.message+"  ";
							}
						}
						this.approveRecordTableData.push(i)
					}
					this.activeIndex = this.approveRecordTableData.length - 2;
				})
			},

			/*审批流程*/

			viewProcess (taskId) {
				app.post('/Gaea_api/getApproveuser', {
					taskId
				}, res => {
					for (let i of res.data.data) {
						this.processingList.push(i)
					}
				})
			},
		},
		created () {
			let pages = this.pages
			//获取工单详情
			this.getDetailData(pages.params.ticketNumber)

			//获取审批流程
			this.viewProcess(pages.params.taskId)
		},
	}
</script>