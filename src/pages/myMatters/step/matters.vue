<template>
    <div class='box'>
	    	<div class="my-matters">
	    		<div class='main-middle'>
		    		<el-tabs v-model="activeName" @tab-click='changeTab'>
						<el-form :model='form' :label-width='labelWidth'>
							<el-row>
								<el-col :md='9'>
									<el-form-item label="部门">
									    <el-select v-model="form.dept" placeholder="请选择" @change='getModule' clearable filterable>
			         						<el-option v-for='(item,index) in deptList' :key='index' :label='item.label' :value='item.value'></el-option>
									    </el-select>
									</el-form-item>
								</el-col>

								<el-col :md='{span:9,offset:2}'>
									<el-form-item label="状态">
			    						<el-select v-model="form.status" placeholder="请选择" filterable clearable>
											<el-option value='pending' label='审核中'></el-option>
											<el-option value='dispose' label='处理中'></el-option>
											<el-option value='completed' label='已完成'></el-option>
											<el-option value='draft' label='草稿'></el-option>
			    					    </el-select>
									</el-form-item>
								</el-col>

								<el-col :md='9'>
									<el-form-item label="所属模块">
										<el-select v-model="form.productModule" placeholder="请选择" clearable filterable>
						                    <el-option v-for='(item,index) in productModuleList' :label='item.label' :value='item.value' :key='index'></el-option>
									    </el-select>
									</el-form-item>
								</el-col>

								<el-col :md='{span:9,offset:2}'>
									<el-form-item label="请求类型">
									    <el-select v-model="form.requestType" placeholder="请选择" clearable filterable>
						                    <el-option v-for='(item,index) in requestTypeList' :label='item.label' :value='item.value' :key='index'></el-option>
									    </el-select>
									</el-form-item>
								</el-col>

								<el-col :md='9'>
									<el-form-item label="创建人">
									    <el-select v-model="form.creater" placeholder="请输入"  clearable filterable>
						                    <el-option v-for='(item,index) in createrList' :label='item.label' :value='item.value' :key='index'></el-option>
									    </el-select>
									</el-form-item>
								</el-col>

								<el-col :md='{span:9,offset:2}'>
	    							<el-form-item label="创建时间">
	    							    <el-date-picker
								          v-model="form.date"
								          type="daterange"
								          align="right"
									      unlink-panels
									      range-separator="至"
									      start-placeholder="选择开始日期"
									      end-placeholder="选择结束日期"
									      value-format='yyyy-MM-dd'
									      popper-class='my-animation'
									      :picker-options="pickerOptions"
	    							    >
	    							    </el-date-picker>
	    							</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :md='9'>
									<el-form-item label="工单编号">
									    <el-input v-model='form.workOrder' placeholder='请输入' clearable></el-input>
									</el-form-item>
								</el-col>
							</el-row>
						</el-form>
						<div class='btn-group-lg'>
			        		<el-button type="primary" @click="query" :disabled='queryBtnDisabled'>查 询</el-button>
			    			<el-button @click="resetForm('form')">重 置</el-button>
			        	</div>
			        	<div class="empty"></div>
			        	<div class='title-wraper'>
			        		<p class='title'>{{titleName}}</p>
			        	</div>
			    	    <el-tab-pane name="myMatters">

			    	    	
			    	    	<span slot="label">
			    	    		<el-badge :value="myMattersTotal">
			    	    		  我的待办
			    	    		</el-badge>
			    	    	</span>
							<v-table 
								:data='myMattersTableData' 
								:tableHeadName='myMattersTableHeadName'
								:showOperator='false'
								:isSort='true'
								@sort='sort'
								@tdClick='goProcessPage'
							>
								
							</v-table>

							<div class="block pagination-wraper">
							   <el-pagination
							   	 v-if='myMattersTableData.length>0'
							   	 @size-change='sizeChange'
							   	 @current-change='currentChange'
							     :page-sizes="[5, 10, 15, 20, 25]"
							     :page-size='myMattersPageSize'
							     layout="total, sizes, prev, pager, next, jumper"
							     :total="myMattersTotal">
							   </el-pagination>
							</div>

			    	    </el-tab-pane>

			    	    <el-tab-pane label="我的申请" name="myApply">
							<v-table 
								:data='myApplyTableData' 
								:tableHeadName='myApplyTableHeadName' 
								:operatorTexts='operatorTexts'
								:isSort='true'
								@sort='sort'
								@viewDetail='viewDetail'
								width='155'
							>
								
							</v-table>

							<div class="block pagination-wraper">
							   <el-pagination
							     v-if='myApplyTableData.length>0'
							     @size-change='sizeChange'
							   	 @current-change='currentChange'
							     :page-sizes="[5, 10, 15, 20, 25]"
							     :page-size='myApplyPageSize'
							     layout="total, sizes, prev, pager, next, jumper"
							     :total="myApplyTotal">
							   </el-pagination>
							</div>

			    	    </el-tab-pane>
			    	    <el-tab-pane label="我的审批" name="myApproval">
							<v-table 
								:data='myApprovalTableData' 
								:tableHeadName='myApprovalTableHeadName' 
								:operatorTexts='operatorTexts'
								:isSort='true'
								@sort='sort'
								@viewDetail='viewDetail'
								width='155'
							>
								
							</v-table>

							<div class="block pagination-wraper">
							   <el-pagination
							     v-if='myApprovalTableData.length>0'
							   	 @size-change='sizeChange'
							   	 @current-change='currentChange'
							     :page-sizes="[5, 10, 15, 20, 25]"
							     layout="total, sizes, prev, pager, next, jumper"
							     :page-size='myApprovalPageSize'
							     :total="myApprovalTotal">
							   </el-pagination>
							</div>

			    	    </el-tab-pane>
			    	</el-tabs>
	    		</div>
	    		
	    	</div>
    	<el-dialog
    	  :title="type === 'flowHistory' ? operatorTexts[1] : operatorTexts[0]"
    	  :visible.sync="dialogVisible"
    	  width="50%"
    	  @close='closeDialog'
    	 >
    	 	<div v-if='type === "flowHistory"'>
    	 		<p class="title m-b10">审批记录</p>
    	 		<v-table 
	    	 		:data='dialogTableData' 
	    	 		:tableHeadName='dialogTableHeadName'
	    	 		:showOperator='false'
	    		></v-table>
    			
				<div class='title m-tb15'>审批流程</div>
    			<el-steps :active="activeIndex">
    				<el-step v-for='(item,index) in stepList' :title='item.nodeName' :description='item.userName' :key='index'></el-step>
    			</el-steps>
	    	</div>

	    	<div v-else>
	    		<ul class='work-detail-list clearfix'>
	    			<li>
	    				<label>资源类型：</label>
	    				<span>{{typeName}}</span>
	    			</li>
	    			<li>
	    				<label class='text-right'>所属应用：</label>
	    				<span>{{applicationName}}</span>
	    			</li>
	    			<li>
	    				<label>所属组织：</label>
	    				<span>{{groupId}}</span>
	    			</li>
	    			<li>
	    				<label class='text-right'>应用管理员：</label>
	    				<span>{{applicationManager}}</span>
	    			</li>
	    			<li>
	    				<label>所属模块：</label>
	    				<span>{{moduleId}}</span>
	    			</li>
	    			<li>
	    				<label class='text-right'>系统管理员：</label>
	    				<span>{{systemManager}}</span>
	    			</li>
	    		</ul>
	    		<v-table 
		    		:data='workDetailTableData' 
		    		:tableHeadName='workDetailTableHeadName'
		    		:showOperator='false'
	    		>
    			</v-table>
	    	</div>

			<div class='text-right m-tb15'>
		    	<span slot="footer" class="dialog-footer">
		    	  	<el-button type="primary" @click="closeDialog">关 闭</el-button>
		    	</span>
	    	</div>
    	</el-dialog>
    </div>
</template>

<style lang='scss'>
	.my-matters {
		.title-wraper {
			padding: 0 20px;
		}
		.main-middle {
			padding: 0;
		}
		.el-tabs__header,.compenent-form,{
			padding: 0 20px;
		}
		.el-tab-pane {
			padding: 20px 20px 0 20px;
		}
		.el-badge__content.is-fixed {
			top: 10px;
			right: 0
		}
		.operator {
			span {
				color: #409EFF;
				cursor: pointer;
			}
		}
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
</style>
<script type="text/javascript">
	export default {
		data () {
			return {
				labelWidth: '9.33rem',
				type: '',
				dialogTableData: [],
				dialogTableHeadName: {
		        	taskName: '节点名称',
		            startTime: '开始时间',
		            endTime: '结束时间',
		            duraTime: '耗时',
		            remarks: '批注',
		        },
				titleName: '代办列表',
				operatorTexts: ['工单详情','查看流程'],
				pickerOptions: {
					shortcuts: [
						{
				            text: '今天',
				            onClick(picker) {
				              picker.$emit('pick',[new Date(),new Date()]);
				            }
				        }, 
				        {
				            text: '昨天',
				            onClick(picker) {
				              const date = new Date();
				              date.setTime(date - 3600 * 1000 * 24);
				              picker.$emit('pick', [date,date]);
				        	}
				        }, 
				        {
				            text: '一周前',
				            onClick(picker) {
				              const date = new Date();
				              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
				              picker.$emit('pick', [date,new Date()]);
				            }
				        },
				        {
				        	text: '最近30天',
				            onClick(picker) {
				              const date = new Date();
				              date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
				              picker.$emit('pick', [date,new Date()]);
				            }
				        },
				        {
				        	text: '这个月',
				            onClick(picker) {
				              const firstDate = new Date();
				              firstDate.setDate(1); //第一天

				              const endDate = new Date(firstDate);

				              endDate.setMonth(firstDate.getMonth()+1);

				              endDate.setDate(0);
				              picker.$emit('pick', [firstDate, endDate]);
				            }
				        },
				        {
				        	text: '上个月',
				            onClick(picker) {
				              var nowdays = new Date();  
				              var year = nowdays.getFullYear();  
				              var month = nowdays.getMonth();  
				              if(month==0)  
				              {  
				                  month=12;  
				                  year=year-1;  
				              }  
				              if (month < 10) {  
				                  month = "0" + month;  
				              }  
				              var firstDay = year + "-" + month + "-" + "01";//上个月的第一天  
				                
				                
				                
				              var myDate = new Date(year, month, 0);  
				              var lastDay = year + "-" + month + "-" + myDate.getDate();//上个月的最后一天  
				              picker.$emit('pick', [firstDay,lastDay]);
				            }
				        }
					]
				},
				form: {
					dept: '',						//部门
					productModule: '',				//所属模块
					date: [],						//日期
					creater: '',					//创建人
					requestType: '',				//请求类型
					status: '',						//状态
					workOrder: '',					//工单编号
				},
				deptList: [],
				typeName: '',						//资源类型
				applicationName: '',				//所属应用
				moduleId: '',						//所属模块
				groupId: '',						//所属组织
				systemManager: '',					//系统管理员
				applicationManager: '',				//应用管理员
				dialogVisible: false,
				stepList: [],
				myMattersTotal: 0,
				myMattersPageSize: 5,
				myMattersCurrentPage: 1,

				myApprovalPageSize: 5,
				myApprovalTotal: 10,
				myApprovalCurrentPage: 1,

				myApplyTotal: 10,
				myApplyPageSize: 5,
				myApplyCurrentPage: 1,
				queryBtnDisabled: false,
				activeName: 'myMatters',
				tabName: 'submit',
				form: {
					dept: '',						//部门
					productModule: '',				//所属模块
					date: [],
					creater: '',					//创建人
					requestType: '',				//请求类型
					status: '',						//状态
				},
				deptList: [],
				productModuleList: [],
				requestTypeList: [],
				createrList: [],
				statusList: [],
				myMattersTableData: [],
				myMattersAllTableData: [],
				myMattersCopyAllTableData: [],
		        myMattersTableHeadName: {
		        	ticketNumber: '工单编号',
		        	typeName: '请求类型',
		        	createPerson: '创建人',
		        	createTime: '创建时间',
		        	moduleId: '所属模块',
		        	status: '状态',
		        	operator: '操作'
		        },
		        myApplyTableData: [],
		        myApplyAllTableData: [],
		        myApplyCopyAllTableData: [],
		        myApplyTableHeadName: {
		        	ticketNumber: '工单编号',
		        	typeName: '请求类型',
		        	createPerson: '创建人',
		        	createTime: '创建时间',
		        	moduleId: '所属模块',
		        	status: '状态',
		        },
		        myApprovalTableData: [],
		        myApprovalAllTableData: [],
		        myApprovalCopyAllTableData: [],
		        myApprovalTableHeadName: {
		        	ticketNumber: '工单编号',
		        	typeName: '请求类型',
		        	createTime: '创建时间',
		        	moduleId: '所属模块',
		        	createPerson: '当前处理人',
		        	status: '状态',
		        },

		        approveRecordTableData: [],
		        approveRecordTableHeadName: {
		        	taskName: '节点名称',
		            startTime: '开始时间',
		            endTime: '结束时间',
		            duraTime: '耗时',
		            remarks: '批注',
		        },
		        workDetailTableData: [],
		        workDetailTableHeadName: {},
		        myApplyFlag: false,					//我的申请列表是否请求接口
		        myApprovalFlag: false,				//我的审批列表是否请求接口
		        activeIndex: 0,
			}
		},
		methods: {
			closeDialog () {
				//清空数据
				this.workDetailTableData = [];
				this.workDetailTableHeadName = {};
				this.dialogTableData = []
				this.stepList = [];
				this.typeName = ''
				this.applicationName = ''
				this.moduleId = ''
				this.groupId = ''
				this.systemManager = ''
				this.applicationManager = ''
				this.activeIndex = 0
				this.dialogVisible = false
			},
			sizeChange (pageSize) {
				app.tools.sizeChange(this, pageSize)
			},
			currentChange (currentPage) {
				app.tools.currentChange(this, currentPage)
			},
			/*获取查看详情弹出框详情数据*/
			getDetailData (workOrder) {
				app.post('/Gaea_api/getTaskinfo', {ticketNum: workOrder}, res => {
					for (let key in res.data.data) {
						this[key] != undefined && (this[key] = res.data.data[key])
					}
					this.getTableHead(res.data.data.resourceType)
					this.getTableBody(res.data.data.dataIds)
				})
				

			},
			/*获取表单头部名称*/
			getTableHead (type) {
				app.post('/Gaea_api/getDeployfrom', {
					typeCode: type
				}, res => {
					for (let i of res.data.data) {
						this.workDetailTableHeadName[i.cloumn] = i.lableName
					}
					this.workDetailTableHeadName = Object.assign({}, this.workDetailTableHeadName)
				})
			},
			/*获取表单body体数据*/
			getTableBody (id) {
				app.post('/Gaea_api/getTaskdata', {
					dataIds: id
				}, res => {
					let obj = {}
					for (let i of res.data.data) {
						for (let k of i) {
							obj[k.name] = k.fillValue
						}
						this.workDetailTableData.push(obj)
					}
				})
			},
			viewHistory (processInstanceId) {
				app.post('/Gaea_api/getApprovalinfo', {
					processInstanceId
				}, res => {
					//table数据清空
					this.dialogTableData = []
					for (let i of res.data.data) {
						i.remarks = ''
						if (i.comments.length > 0) {
							for (let item of i.comments) {
								i.remarks += "处理人："+ item.userId + "； " + item.message+"  ";
							}
						}
						this.dialogTableData.push(i)
					}
					this.activeIndex = this.dialogTableData.length - 2;
				})
			},
			goProcessPage ({row, index, column}) {
				if (column.label === '操作') {
					app.go({path: 'myMattersProcessingList', params: row})
				}
			},
			viewDetail ({row, type}) {
				if (type === 'viewDetail') {								//1代表点击详情
					this.getDetailData(row.ticketNumber)
				} else {								
					this.viewHistory(row.processInstanceId);				//查看历史
					this.viewProcess(row.processInstanceId);				//加载审批流程
				}
				this.dialogVisible = true;
				this.type = type;
			},
			viewProcess (taskId) {
				app.post('/Gaea_api/getApproveuserI', {
					taskId
				}, res => {
					for (let i of res.data.data) {
						this.stepList.push(i)
					}
				})
			},
			changeTab () {

				let activeName = this.activeName
				this.titleName = activeName === 'myMatters' ? '代办列表' :
								 activeName === 'myApply' ? '申请列表' : '审批列表'
				if (activeName === 'myApply') {	
					!this.myApplyFlag && this.getMyApplyData();
				} else if (activeName === 'myApproval') {
					!this.myApprovalFlag && this.getMyApprovalData();
				}

			},
			resetForm () {
				app.tools.resetFormData(this.form)
			},
			/*获取工单列表数据*/
			changeTableData () {
				let formObj = this.form
				app.post('/Gaea_api/getTicketlist', {
					groupId: formObj.dept,
					moduleId: formObj.productModule,
					createPerson: formObj.creater,
					typeCode: formObj.requestType,
					status: formObj.status,
					startDate: formObj.date[0] || '',
					endDate: formObj.date[1] || '',
					pageSize: this[this.activeName + 'PageSize'] + '',
					pageIndex: this[this.activeName + 'CurrentPage'] - 1 + ''
				}, response => {
					this.queryBtnDisabled = false;
					this[this.activeName + 'TableData'] = []
					for (let i of response.data.data) {
						this[this.activeName + 'TableData'].push(i)
					}
					this[this.activeName + 'Total'] = response.data.total;
				}, err => {
					this.queryBtnDisabled = false;
				})
			},
			/*代办数据*/
			getMyMattesData () {
				//请求我的代办todo接口查询数据
				app.post('/Gaea_api/getTasklist', {
					userId: this.$store.state.username,
					taskType: '0'
				}, response => {
					for (let i of response.data.data) {
						i.ticket && (i.ticket.taskId = i.taskId)
						i.ticket && (i.ticket.operator = i.ticket.status === 'draft' ? '申请' : '审批')
						i.ticket && this.myMattersAllTableData.push(i.ticket)
						i.ticket && this.myMattersCopyAllTableData.push(i.ticket)
					}
					this.myMattersAllTableData = this.myMattersAllTableData.sort( (a,b) => {
						return Date.parse(b.createTime) - Date.parse(a.createTime)
					})
					this.myMattersCopyAllTableData = this.myMattersCopyAllTableData.sort( (a,b) => {
						return Date.parse(b.createTime) - Date.parse(a.createTime)
					})
					this.myMattersTotal = this.myMattersAllTableData.length;
					app.tools.changeTable(this, 'myMatters')
				})
			},
			/*我的申请数据*/
			getMyApplyData () {
				/*请求我的申请数据*/
				app.post('/Gaea_api/getTasklist', {
					userId: this.$store.state.username,
					taskType: '1'
				}, response => {
					for (let i of response.data.data) {
						this.myApplyAllTableData.push(i)
						this.myApplyCopyAllTableData.push(i)
					}
					this.myApplyAllTableData = this.myApplyAllTableData.sort( (a,b) => {
						return Date.parse(b.createTime) - Date.parse(a.createTime)
					})
					this.myApplyCopyAllTableData = this.myApplyCopyAllTableData.sort( (a,b) => {
						return Date.parse(b.createTime) - Date.parse(a.createTime)
					})
					this.myApplyFlag = true
					this.myApplyTotal = this.myApplyAllTableData.length;
					app.tools.changeTable(this, 'myApply')
				})
			},
			getMyApprovalData () {
				//请求我的审批查询数据
				app.post('/Gaea_api/getTasklist', {
					userId: this.$store.state.username,
					taskType: '2'
				}, response => {
					//获得所有数据
					for (let i of response.data.data) {
						this.myApprovalAllTableData.push(i)
						this.myApprovalCopyAllTableData.push(i)
					}
					this.myApprovalAllTableData = this.myApprovalAllTableData.sort( (a,b) => {
						return Date.parse(b.createTime) - Date.parse(a.createTime)
					})
					this.myApprovalCopyAllTableData = this.myApprovalCopyAllTableData.sort( (a,b) => {
						return Date.parse(b.createTime) - Date.parse(a.createTime)
					})
					this.myApprovalFlag = true
					this.myApprovalTotal = this.myApprovalAllTableData.length;
					app.tools.changeTable(this, 'myApproval')
				})
			},
			/*获取类型下拉框数据*/
			getRequestTypeData () {
				/*获取类型下拉框数据*/
				app.post('/Gaea_api/getTypeCode', {}, response => {
					for (let i of response.data.data) {
						this.requestTypeList.push({
							label: i.name,
							value: i.code
						})
					}
				})
			},
			/*获取创始人下拉框数据*/
			getCreaterData () {
				app.post('/Gaea_api/getUser', {}, response => {
					for (let i of response.data.data) {
						this.createrList.push({
							label: i.cn_name,
							value: i.uid
						})
					}
				})
			},
			/*获取部门下拉框数据*/
		      getDeptList () {
		        app.post('/Gaea_api/getAllProcessDept', {
		        }, res => {
		          for (let i of res.data.data) {
		            i.label = i.org;
					i.value = i.staticid;
		            this.deptList.push(i)
		          }
		        })
		      },
		    /*获取所属模块*/
		    getModule (val) {
		    	/*清空所属模块数据*/
		    	this.productModuleList = []
		    	this.form.productModule = ''
		    	val && app.post('/Gaea_api/getAllProcessDept', {
		    		staticid: val
		    	}, res => {
		    		for (let i of res.data.data) {
		    			i.label = i.module;
		    			i.value = i.staticid;
		    			this.productModuleList.push(i)
		    		}
		    	})
		    },
			/*根据条件查询*/
			query () {
				let copyArr = []
				for (let i of this[this.activeName + 'CopyAllTableData']) {
					copyArr.push(i)
				}	
				app.tools.doFilter(this, copyArr, this.form)
			},
			sort ({column, prop, order}) {
				this[this.activeName + 'AllTableData'].sort( (a,b) => {
					return order === 'descending' ? Date.parse(b.createTime) - Date.parse(a.createTime) : order === 'ascending' ? Date.parse(a.createTime) - Date.parse(b.createTime) : 0
				})
				app.tools.changeTable(this)
			},

		},
		created () {
			this.getMyMattesData();
			
			//this.getMyApprovalData();
			//this.getMyApplyData();
			/*获取类型下拉框数据*/
			this.getRequestTypeData()
			/*获取创始人下拉框数据*/
			this.getCreaterData()
			/*获取模块下拉框数据u*/
			this.getDeptList()
		},
	}
</script>