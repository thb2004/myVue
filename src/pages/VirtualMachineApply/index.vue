<template>
	<div class="box">
		<div class="virtual-machinet">
			<div class='main-middle'>
				<el-tabs v-model="activeName">
					<el-tab-pane label="虚拟机自动申请列表" name="one">
						<v-table 
							:data='oneTableData' 
							:tableHeadName='oneTableHeadName'
							:isShowComments='true'
							:labelName='"来源主机"'
							:operatorText='"查看详情"'
							@openRemarkDialog='viewDetail'
						></v-table>
						<div class="block pagination-wraper">
						   <el-pagination
						   	 v-if='oneTableData.length > 0'
						   	 @size-change='sizeChange'
						   	 @current-change='currentChange'
						     :page-sizes="[10, 15, 20, 25, 30, 35, 40, 45, 50]"
						     layout="total, sizes, prev, pager, next, jumper"
						     :page-size='onePageSize'
						     :total="oneTotal">
						   </el-pagination>
						</div>
					</el-tab-pane>

					<el-tab-pane label="虚拟机手动申请列表" name="two">
						<div class='text-right m-b10'>
						    <el-button type="primary" @click="handApply" class='btn-lg'>手动申请</el-button>
						</div>
						<v-table 
							:data='twoTableData' 
							:tableHeadName='twoTableHeadName'
							:showOperator='false'
							@cellClick='cellClick'
							class='virtual-machine-list'
						></v-table>
						<div class="block pagination-wraper">
						   <el-pagination
						   	 v-if='twoTableData.length > 0'
						   	 @size-change='sizeChange'
						   	 @current-change='currentChange'
						     :page-sizes="[10, 15, 20, 25, 30, 35, 40, 45, 50]"
						     layout="total, sizes, prev, pager, next, jumper"
						     :page-size='twoPageSize'
						     :total="twoTotal">
						   </el-pagination>
						</div>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	    <el-dialog
    	  :title="title"
    	  :visible.sync="dialogVisible"
    	  width='60%'
    	  @close="dialogVisible = false"
    	  >
    	  	<!-- <ul class='dialog-ul clearfix'>
    	  		<li v-for='(val,key) in sourceDetail'>
    	  			<label>{{val}}:</label>
    	  			<span>{{sourceData[key]}}</span>
    	  		</li>
    	  	</ul>
    	  	<div class="title">其他信息</div>
    	  	<ul class='other-info'>
    	  		<li><label>产品模块:</label><span> {{sourceData.app_name}}</span></li>
    	  		<li><label>应用名称:</label><span> {{sourceData.app_name}}</span></li>
    	  		<li><label>系统管理员:</label><span> {{sourceData.sysadmin_name}}</span></li>
    	  		<li><label>应用管理员:</label><span> {{sourceData.appadmin_name}}</span></li>
    	  	</ul> -->

			<v-table 
    			:data='detailTableData' 
    			:tableHeadName='detailTableDataHeadName'
    			:showOperator='false'
    			type='expand'
    		></v-table>



	    	<span slot="footer" class="dialog-footer">
	    	    <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
	    	</span>
    	</el-dialog>

    	<el-dialog
    	  title="执行结果"
    	  :visible.sync="exeResDialogVisible"
    	  width='50%'
    	  @close="exeResDialogVisible = false"
    	  >
    	  <p v-html='otherInfo'></p>
			<span slot="footer" class="dialog-footer">
	    	    <el-button type="primary" @click="exeResDialogVisible = false">关 闭</el-button>
	    	</span>
    	</el-dialog>

    	<el-dialog
    	  title="详细信息"
    	  :visible.sync="detailDialogVisible"
    	  width='50%'
    	  @close="detailDialogVisible = false"
    	  >
    	  <ul class='other-info'>
			<li><label>虚拟机名称:</label><span>{{detailInfo.vmname}}</span></li>
  			<li><label>IP地址:</label><span>{{detailInfo.ipaddress}}</span></li>
  			<li><label>产品模块:</label><span>{{detailInfo.pm_name}}</span></li>
  			<li><label>应用名称:</label><span>{{detailInfo.app_name}}</span></li>
  			<li><label>系统管理员:</label><span>{{detailInfo.sysadmin_name}}</span></li>
  			<li><label>应用管理员:</label><span>{{detailInfo.appadmin_name}}</span></li>
  			<li><label>存储位置:</label><span>{{detailInfo.vc_dstore}}</span></li>
  		</ul>
  			<span slot="footer" class="dialog-footer">
	    	    <el-button type="primary" @click="detailDialogVisible = false">关 闭</el-button>
	    	</span>
    	</el-dialog>

    	<el-dialog
    	  title="Debug信息"
    	  :visible.sync="debugDialogVisible"
    	  width='50%'
    	  @close="debugDialogVisible = false"
    	  >
    	  	<div>
				<el-input readonly type='textarea' :rows='20' v-model='debugInfo'></el-input>
			</div>
			<span slot="footer" class="dialog-footer">
	    	    <el-button type="primary" @click="debugDialogVisible = false">关 闭</el-button>
	    	</span>
    	</el-dialog>

    	<el-dialog
    	  title="手动申请"
    	  :visible.sync="handDialogVisible"
    	  width='50%'
    	  @close="closeDialog"
    	  class='hand-dialog'
    	  >
			<el-form :model='dialogForm' label-width='93px' ref='dialogForm' :rules='rules'>
				<el-row :gutter='30'>
					<el-col :md='12'>
						<el-form-item label="部门" prop='department'>
						    <el-select v-model="dialogForm.department" placeholder="请选择"  @change='getProductModule' clearable filterable>
			                    <el-option v-for='(item,index) in departmentList' :label='item.label' :value='item.value' :key='index'></el-option>
						    </el-select>
						</el-form-item>
					</el-col>

					<el-col :md='12'>
						<el-form-item label="产品模块" prop='productModule'>
						    <el-select v-model="dialogForm.productModule" placeholder="请选择" clearable filterable @change='chooseModule'>
			                    <el-option v-for='(item,index) in productModuleList' :label='item.label' :value='item.value' :key='index'></el-option>
						    </el-select>
						</el-form-item>
					</el-col>

					<el-col :md='12'>
						<el-form-item label="系统环境" prop='env'>
						    <el-select v-model="dialogForm.env" placeholder="请选择" @change='getIpNet' filterable clearable>
			                    <el-option v-for='(item,index) in envList' :label='item.label' :value='item.value' :key='index'></el-option>
						    </el-select>
						</el-form-item>
					</el-col>

					<el-col :md='12'>
						<el-form-item label="应用名称" prop='applicationName'>
						    <el-select v-model="dialogForm.applicationName" placeholder="请选择" @change='getAdmin' filterable clearable>
			                    <el-option v-for='(item,index) in applicationNameList' :label='item.label' :value='item.value' :key='index'></el-option>
						    </el-select>
						</el-form-item>
					</el-col>

					<el-col :md='12'>
						<el-form-item label="应用管理员" prop='appadmin'>
						    <el-select 
							    v-model="dialogForm.appadmin"
							    :loading="loading"
							    :remote-method="remoteMethod"
							    placeholder="请输入"
							    remote 
							    clearable 
							    filterable
						    >
			                    <el-option v-for='(item,index) in appadminList' :label='item.label' :value='item.value' :key='index'></el-option>
						    </el-select>
						</el-form-item>
					</el-col>

					<el-col :md='12'>
						<el-form-item label="系统管理员" prop='sysadmin'>
						    <el-select 
							    v-model="dialogForm.sysadmin"
							    :loading="loading"
							    :remote-method="remoteMethod1"
							    placeholder="请输入"
							    remote 
							    clearable 
							    filterable
						    >
			                    <el-option v-for='(item,index) in sysadminList' :label='item.label' :value='item.value' :key='index'></el-option>
						    </el-select>
						</el-form-item>
					</el-col>

					<el-col :md='12'>
						<el-form-item label="操作系统" prop='os'>
						    <el-select v-model="dialogForm.os" placeholder="请选择" filterable clearable>
			                    <el-option v-for='(item,index) in osList' :label='item.label' :value='item.value' :key='index'></el-option>
						    </el-select>
						</el-form-item>
					</el-col>

					<el-col :md='12' v-show='isShowProductNet'>
						<el-form-item :label="ipNetLableName" prop='productNet'>
						    <el-select v-model="dialogForm.productNet" placeholder="请选择" clearable filterable>
			                    <el-option v-for='(item,index) in productNetList' :label='item.label' :value='item.value' :key='index'></el-option>
						    </el-select>
						</el-form-item>
					</el-col>

					<el-col :md='12'>
						<el-form-item label="部署数量" prop='num'>
							<el-input-number v-model="dialogForm.num"  placeholder='请输入' controls-position="right" :min='1'></el-input-number>
						</el-form-item>
					</el-col>

					<el-col :md='12'>
						<el-form-item label="内存配置" prop='memoryConfig'>
						    <el-select v-model="dialogForm.memoryConfig" placeholder="请选择" clearable filterable>
						    	<el-option v-for='(item,index) in memoryConfigList' :label='item.label' :value='item.value' :key='index'></el-option>
						    </el-select>
						</el-form-item>
					</el-col>

					<el-col :md='12'>
						<el-form-item label="磁盘配置" prop='diskConfig'>
						    <el-select v-model="dialogForm.diskConfig" placeholder="请选择" clearable filterable>
						    	<el-option v-for='(item,index) in diskConfigList' :label='item.label' :value='item.value' :key='index'></el-option>
						    </el-select>
						</el-form-item>
					</el-col>

					<el-col :md='12'>
						<el-form-item label="CPU配置" prop='cpuConfig'>
						    <el-select v-model="dialogForm.cpuConfig" placeholder="请选择" clearable filterable>
						    	<el-option v-for='(item,index) in cpuConfigList' :label='item.label' :value='item.value' :key='index'></el-option>
						    </el-select>
						</el-form-item>
					</el-col>

					<el-col :md='12'>
						<el-form-item label="使用期限" prop='duration'>
						    <el-date-picker
						          v-model="dialogForm.duration"
						          type="date"
						          format='yyyy-MM-dd'
						          value-format='yyyy-MM-dd'
						          popper-class='my-animation'
						          placeholder="开始日期">
						    </el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :md='8'>
						<el-form-item>
							<el-button @click="resetForm">重 置</el-button>
						</el-form-item>
					</el-col>

					<el-col :md='16' class='text-right'>
						<el-form-item>
						    <el-button type="primary" @click="submitForm('dialogForm')" :dsiabled='btnDisabled'>提 交</el-button>
						    <el-button @click="closeDialog">取 消</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
    	</el-dialog>
	</div>
</template>

<style lang='scss'>
	.virtual-machine-list {
		.job_status {
			cursor: pointer;
			.success {
				color: #2B99F6
			}
			.recycled {
				color: #20CC61
			}
			.failure {
				color: #E2532B
			}
			.ongoing {
				color: #FFBD32
			}
		}
		.detail_info, .debug_info {
			cursor: pointer;
			color: #2495F5;
		}
	}
	.dialog-ul {
		li {
			float: left;
			width: 50%;
			padding: 0;
			line-height: 40px;
			label {
				display: inline-block;
				width: 120px;
				text-align: right;
				margin-right: 10px;
			}
		}
	}
	.other-info {
		li {
			line-height: 30px;
			label {
				display: inline-block;
				width: 120px;
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
				debugInfo: '',
				otherInfo: '',
				detailInfo: {
					
				},
				title: '来源详情',
				dialogVisible: false,
				exeResDialogVisible: false,
				detailDialogVisible: false,
				debugDialogVisible: false,
				handDialogVisible: false,
				btnDisabled: false,
				activeName: 'one',
				onePageSize: 10,			//每页显示数
				oneTotal: 1,			//总数量
				oneCurrentPage: 1,		//当前页码数
				oneTableData: [],		
				oneTableHeadName: {
					doc_subject: '申请任务工单',
					fd_03: '起草人',
					fd_name: 'DBA',
					doc_create_time: '申请时间'
				},
				oneAllTableData: [],
				detailTableData: [],
				detailTableDataHeadName: {
					start_time: '日期',
					hostname: '主机名',
					ipaddress: 'IP',
					vc_cluster: 'Cluster',
					mem_count: 'RAM(GB)',
					cpu_count: 'vCPU(Core)',
					disk_storage: '硬盘',
					system_os: '操作系统'

				},
				/*sourceDetail: {
					vmname: '虚拟机名称',
					vc_dstore: '存储位置',
					//ipaddress: 'IP地址',
					cpu_count: 'vCPU(Core)',
					disk_storage: '硬盘',
					start_time:'日期',
					//system_os: '操作系统',
					vc_center: 'vCenter',
					job_status: '执行结果',
					mem_count: 'RAM(GB)',
				},*/
				/*sourceData: {
					hostname: '',
					ipaddress: '',
					cpu_count: '',
					disk_storage: '',
					start_time:'',
					system_os: '',
					vc_center: '',
					job_status: '',
					vc_cluster: '',
					mem_count: '',
					app_name: '',
					appadmin_name: '',
					sysadmin_name: '',
				},*/
				twoTableData: [],
				twoTableHeadName: {
					start_time: '日期',
					hostname: '主机名',
					ipaddress: 'IP地址',
					vc_center: 'vCenter',
					vc_cluster: 'Cluster',
					mem_count: 'RAM(GB)',
					cpu_count: 'vCPU(Core)',
					system_os: '操作系统',
					job_status: '执行结果',
					detail_info: '详细信息',
					debug_info: 'Debug信息'
				},
				twoAllTableData: [],
				twoPageSize: 10,			//每页显示数
				twoTotal: 1,			//总数量
				twoCurrentPage: 1,		//当前页码数
				dialogForm: {
					applicationName: '',		//应用名称
					env: '',					//环境
					department: '',				//部门
					productModule: '',			//产品模块
					appadmin: '',				//应用管理员
					sysadmin: '',				//系统管理员
					os: '',						//操作系统
					num: '',					//部署数量
					memoryConfig: '',			//内存配置i
					diskConfig: '',				//磁盘配置
					cpuConfig: '',				//cpu配置i
					duration: '',				//使用期限
					productNet: '',				//生产网段
				},
				ipNetLableName: '生产网段',
			    cpuConfigList: [
			    	{
			    		label: '4 core',
						value: '4'
			    	},
			    	{
			    		label: '6 core',
						value: '6'
			    	},
			    	{
			    		label: '8 core',
						value: '8'
			    	},
			    	{
			    		label: '16 core',
						value: '16'
			    	},
			    	{
			    		label: '32 core',
						value: '32'
			    	},
			    	{
			    		label: '64 core',
						value: '64'
			    	},
			    ],
				diskConfigList: [
					{
						label: '100 GB',
						value: '100'
					},
					{
						label: '200 GB',
						value: '200'
					},
					{
						label: '300 GB',
						value: '300'
					},
					{
						label: '400 GB',
						value: '400'
					},
					{
						label: '500 GB',
						value: '500'
					},
				],
			    memoryConfigList: [
			    	{
			    		label: '6 GB',
			    		value: '6'
			    	},
			    	{
			    		label: '8 GB',
			    		value: '8'
			    	},
			    	{
			    		label: '12 GB',
			    		value: '12'
			    	},
			    	{
			    		label: '16 GB',
			    		value: '16'
			    	},
			    	{
			    		label: '24 GB',
			    		value: '24'
			    	},
			    	{
			    		label: '32 GB',
			    		value: '32'
			    	},
			    	{
			    		label: '64 GB',
			    		value: '64'
			    	},
			    ],
				sysadminList: [],
				loading: false,
				appadminList: [],
				applicationNameList: [],
				envList: [],
				departmentList: [],
				productModuleList: [],
				osList: [],
				productNetList: [],			//生产网段列表
				isShowProductNet: false,
				rules: {
					department: [{
						required: true,
						message: '请选择部门',
						trigger: 'change'
					}],
					productModule: [{
						required: true,
						message: '请选择产品模块',
						trigger: 'change'
					}],
					env: [{
						required: true,
						message: '请选择环境',
						trigger: 'change'
					}],
					applicationName: [{
						required: true,
						message: '请选择应用名称',
						trigger: 'change'
					}],
					appadmin: [{
						required: true,
						message: '应用管理员必填',
						trigger: 'change'
					}],
					sysadmin: [{
						required: true,
						message: '系统管理员必填',
						trigger: 'change'
					}],
					os: [{
						required: true,
						message: '请选择操作系统',
						trigger: 'change'
					}],
					num: [{
						required: true,
						message: '部署数量必填',
						trigger: 'blur'
					}],
					memoryConfig: [{
						required: true,
						message: '请选择内存配置',
						trigger: 'change'
					}],
					diskConfig: [{
						required: true,
						message: '请选择磁盘配置',
						trigger: 'change'
					}],
					cpuConfig: [{
						required: true,
						message: '请选择CPU配置',
						trigger: 'change'
					}],
					duration: [{
						required: true,
						message: '使用期限必填',
						trigger: 'change'
					}],
					productNet: [{
						validator: (rule, value, callback) => {
							if (this.isShowProductNet) {
								if (!value) {
									callback(new Error('请选择生产网段'));
								} else {
									callback()
								}
							} else {
								callback()
							}
						},
						trigger: 'change',
						required: true,
					}],
				},
			}
		},
		methods: {
			/*根据应用名称获取管理员信息*/
			getAdmin (val) {
				let formObj = this.dialogForm
				let res = app.tools.findInArr(val, this.applicationNameList)
				this.appadminList = []
				this.sysadminList = []
				this.appadminList.push({
					label: res.appadmin + res.appadmin_id,
					value: res.appadmin
				})
				this.sysadminList.push({
					label: res.sysadmin + res.sysadmin_id,
					value: res.sysadmin
				})
				formObj.appadmin = res.appadmin
				formObj.sysadmin = res.sysadmin
			},
			handApply () {
				this.handDialogVisible = true
				this.isShowProductNet = false
				this.getFormContent();
			},

			onSubmit () {
				
				
			},
			sizeChange (pageSize) {
				app.tools.sizeChange(this, pageSize)
			},
			currentChange (currentPage) {
				app.tools.currentChange(this, currentPage)
			},
			viewDetail (row) {
				this.dialogVisible = true
				//清空数据
				this.detailTableData = []
				app.post('/auto/getlistserver', {
					mipuser: this.$store.state.username,
					fd_id: row.fd_id
				}, res => {
					for (let i of res.data.data) {
						i.start_time = i.start_time.split(/\s/)[0]
						this.detailTableData.push(i)
					}
				}, err => {}, false)
			},
			cellClick ({row,column,cell}) {
				if (column.label === '执行结果') {
					this.exeResDialogVisible = true
					this.otherInfo = ''
					this.getJobMore(row.id + '')
				} else if (column.label === '详细信息') {
					this.detailDialogVisible = true
					this.getServerListInfo(row.id + '')
				} else if (column.label === 'Debug信息') {
					this.debugDialogVisible = true
					this.debugInfo = ''
					this.getDebugInfo(row.id + '')
				}
			},
			getServerListInfo (server_id) {
				for (let key in this.detailInfo) {
					this.detailInfo[key] = ''
				}
				app.post('/auto/serverlistinfo', {
					server_id,
					mipuser: this.$store.state.username
				}, res => {
					this.detailInfo = Object.assign({}, res.data.data || {})
				})
			},
			getJobMore (server_id) {
				app.post('/auto/jobmore', {
					server_id,
					mipuser: this.$store.state.username
				}, res => {
					this.otherInfo = res.data.other_info
				})
			},
			getDebugInfo (server_id) {
				app.post('/auto/debugserver', {
					server_id,
					mipuser: this.$store.state.username
				}, res => {
					this.debugInfo = res.data.data[0].debug_data
				})
			},
			resetForm () {
				app.tools.resetFormData(this.dialogForm)
			},
			closeDialog () {
				this.handDialogVisible = false;
				app.tools.resetFormData(this.dialogForm)
			},
			/*获取产品模块数据*/
			getProductModule (val) {
				let formObj = this.dialogForm
				//将产品模块/环境/应用名称/应用管理员/系统管理员清空	
				formObj.productModule = ''
				this.productModuleList = []
				formObj.applicationName = ''
				this.applicationNameList = []
				formObj.appadmin = ''
				this.appadminList = [];
				formObj.sysadmin = ''
				this.sysadminList = []
				val && app.tools.getSphereProductModule(val, this.productModuleList)
			},
			/*选择产品模块*/
			chooseModule () {
				//环境/应用名称/应用管理员/系统管理员清空	
				let formObj = this.dialogForm
				formObj.applicationName = ''
				this.applicationNameList = []
				formObj.appadmin = ''
				this.appadminList = []
				formObj.sysadmin = ''
				this.sysadminList = []
				let dept = app.tools.findValInArray(formObj.department, this.departmentList)
				let pm = app.tools.findValInArray(formObj.productModule, this.productModuleList)
				dept && pm && app.tools.getSphereApplicationName({
					dept,
					env: '',
					pm
				}, this.applicationNameList)
			},
			getIpNet (val) {
				switch (val) {
					case 1:
						this.isShowProductNet = true;
						this.ipNetLableName = '生产网段'
						break;
					case 213:
						this.isShowProductNet = true;
						this.ipNetLableName = '555网段'
						break;
					case 214:
						this.isShowProductNet = true;
						this.ipNetLableName = '666网段'
						break;
					default:
						this.isShowProductNet = false;
				}
				[1,213,214].indexOf(val) != -1 && this.getIpNetData (app.tools.findValInArray(val, this.envList))
				
			},
			getIpNetData (stgprd) {
				this.productNetList = []
				this.dialogForm.productNet = ''
				app.post('/auto/getipnet', {
					stgprd
				}, res => {
					for (let i of res.data.data) {
						i.label = i.op_group;
						i.value = i.id;
						this.productNetList.push(i)
					}
				})
			},
			submitForm (formName) {
				let formObj = this.dialogForm
				this.$refs[formName].validate((valid) => {
					if (valid) {
						app.post('/auto/allautovm', {
							mipuser: this.$store.state.username,
							stgprd: formObj.env + '',
							ipnet: formObj.productNet + '',
							app_name: formObj.applicationName,
							sysadmin_name: formObj.sysadmin,
							appadmin_name: formObj.appadmin,
							dept: formObj.department + '',
							pm: formObj.productModule + '',
							system_os: formObj.os + '',
							apply_count: formObj.num + '',
							cpu_count: formObj.cpuConfig + '',
							mem_count: formObj.memoryConfig + '',
							disk_storage: formObj.diskConfig + '',
							timerend: formObj.duration.replace(/-/g,'/'),
						}, res => {
							if (res.data.code === '100001') {
								this.dialogVisible = false;
							}
							this.$alert(res.data.msg, {
								title: '提示',
								type: 'warning'
							})
						}, this.error)
					} else {
						return false;
					}
				});
			},
			error () {
				this.$alert('提交失败', {
					title: '提示',
					type: 'warning'
				})
			},
			searchRemote (query, name) {
				if (query !== '') {
					this.loading = true;
					this[name] = [];
					app.post('/Gaea_api/getUserlike', {
						search: query
					}, res => {
						this.loading = false
						for (let item of res.data.data) {
							item.label = item.cn_name + item.uid;
							item.value = item.cn_name
							this[name].push(item)
						}
					}, err => {
						this.loading = false
					}, false)
				} else {
					this[name] = [];
				}
			},
			remoteMethod1 (query) {
				this.searchRemote(query, 'sysadminList')
			},
			remoteMethod (query) {
				this.searchRemote(query, 'appadminList')
			},
			getOs () {
				app.post('/auto/ossystem', {
					mipuser: this.$store.state.username
				}, res => {
					for (let i of res.data.data) {
						i.label = i.op_name
						i.value= i.id
						this.osList.push(i)
					}
				}, err => {}, false)
			},
			getFormContent () {
				let formObj = this.dialogForm
				app.post('/auto/getallautovm', {
					mipuser: this.$store.state.username
				}, res => {
					res = JSON.parse(res.data.data)
					//反显部门
					formObj.department = parseInt(res.dept_id)
					let deptRes = app.tools.findValInArray(parseInt(res.dept_id), this.departmentList)
					if (!deptRes) {	//res不存在则代表数组中没有这个值
						this.departmentList.push({
							label: res.dept_name,
							value: parseInt(res.dept_id)
						})
					}
					//反显模块名
					formObj.productModule = parseInt(res.pm_id)
					let moduleRes = app.tools.findValInArray(parseInt(res.pm_id), this.productModuleList)
					if (!moduleRes) {	//res不存在则代表数组中没有这个值
						this.productModuleList.push({
							label: res.pm_name,
							value: parseInt(res.pm_id)
						})
					}
					//反显系统环境
					formObj.env = parseInt(res.stgprd_id)
					let envRes = app.tools.findValInArray(parseInt(res.stgprd_id), this.envList)
					if (!envRes) {	//res不存在则代表数组中没有这个值
						this.envList.push({
							label: res.op_name,
							value: parseInt(res.stgprd_id)
						})
					}
					//获取网段数据
					[1,213,214].indexOf(formObj.env) != -1 && this.getIpNetData(res.op_name)
					switch (formObj.env) {
						case 1:
							this.isShowProductNet = true;
							this.ipNetLableName = '生产网段'
							break;
						case 213:
							this.isShowProductNet = true;
							this.ipNetLableName = '555网段'
							break;
						case 214:
							this.isShowProductNet = true;
							this.ipNetLableName = '666网段'
							break;
						default:
							this.isShowProductNet = false;
					}
					//根据部门及产品模块获取应用下拉列表
					this.applicationNameList = []
					app.tools.getSphereApplicationName({
						dept: res.dept_name,
						env: '',
						pm: res.pm_name
					}, this.applicationNameList)

					//反显结束时间
					formObj.duration = res.end_time
					//反显部署数量
					formObj.num = res.apply_count

					//反显cpu配置
					formObj.cpuConfig = res.cpu_count
					let cpuRes = app.tools.findValInArray(res.cpu_count, this.cpuConfigList)
					if (!cpuRes) {	//res不存在则代表数组中没有这个值
						this.cpuConfigList.push({
							label: res.app_name,
							value: res.app_name
						})
					}

					//反显内存配置
					formObj.memoryConfig = res.mem_count
					let memoryRes = app.tools.findValInArray(res.mem_count, this.memoryConfigList)
					if (!memoryRes) {	//res不存在则代表数组中没有这个值
						this.memoryConfigList.push({
							label: res.app_name,
							value: res.app_name
						})
					}

					//反显磁盘配置配置
					formObj.diskConfig = res.disk_storage
					let diskRes = app.tools.findValInArray(res.disk_storage, this.diskConfigList)
					if (!diskRes) {	//res不存在则代表数组中没有这个值
						this.diskConfigList.push({
							label: res.app_name,
							value: res.app_name
						})
					}
				}, err => {}, false)
			},
			/*获取网络类别*/
			getNetType () {
				app.post('/auto/getstgprd', {}, res => {
					for (let i of res.data.data) {
						i.label = i.op_name;
						i.value = i.id;
						this.envList.push(i)
					}
				})
			},
			//获取虚拟化列表
			getVirInfoShow () {
				app.post('/auto/virinfoshow', {
					mipuser: this.$store.state.username
				}, res => {
					for (let i of res.data.data) {
						this.oneAllTableData.push(i)
					}
					this.oneTotal = this.oneAllTableData.length;
					app.tools.changeTable(this, 'one')
				}, err => {}, false)
			},

			getListServer () {
				app.post('/auto/getlistserver', {
					mipuser: this.$store.state.username,
					fd_id: '9283733052'
				}, res => {
					for (let i of res.data.data) {
						i.detail_info = '查看详情';
						i.debug_info = '查看'
						i.start_time = i.start_time.split(/\s/)[0]
						this.twoAllTableData.push(i)
					}
					this.twoTotal = this.twoAllTableData.length;
					app.tools.changeTable(this, 'two')
				}, err => {}, false)
			},
		},
		created () {
			//获取部门数据
			app.tools.getSphereDept(this.departmentList)
			//获取操作系统数据
			this.getOs()
			this.oneTableData = this.oneTableData.slice(0,this.onePageSize)
			this.twoTableData = this.twoTableData.slice(0,this.twoPageSize)
			//获取环境
			this.getNetType()
			//获取虚拟化流程列表
			this.getVirInfoShow()
			//获取虚拟机手动申请列表
			this.getListServer()
		}
	}
</script>