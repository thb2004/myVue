<template>
	<div class='box'>
		<div class="scada">
			<div class='main-middle'>
				<el-tabs v-model="activeName" @tab-click='changeTab'>
					<el-tab-pane label="新建scada微服务" name="one">
						<div class="compenent-form">
				    		<el-form rel='form' :model='oneForm' :label-width='labelWidth' ref='oneForm' :rules='rules'>
								<el-row>
									<el-col :md='10'>
										<el-form-item label='实例名称' prop='caseName'>
										   <el-input v-model="oneForm.caseName" placeholder='请输入实例名称'></el-input>
										</el-form-item>
									</el-col>
									<!-- <el-col :md='{span:9,offset:2}'>
										<el-form-item label="部门" prop='dept'>
										    <el-select v-model="oneForm.dept" @change='getModule' placeholder="请选择" clearable filterable>
											                 						<el-option v-for='(item,index) in deptList' :key='index' :label='item.label' :value='item.value'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
									
									<el-col :md='9'>
										<el-form-item label="产品模块" prop='module'>
										    <el-select v-model="oneForm.module" placeholder="请选择" clearable filterable>
																                    <el-option v-for='(item,index) in moduleList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
									
									<el-col :md='{span:9,offset:2}'>
										<el-form-item label="环境类型" prop='envType'>
										    <el-select v-model="oneForm.envType" @change='getApp' placeholder="请选择" clearable filterable>
																                    <el-option v-for='(item,index) in envList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
									
									<el-col :md='9'>
										<el-form-item label="应用" prop='application'>
										    <el-select v-model="oneForm.application" @change='getAppInfo' placeholder="请选择" clearable filterable>
																                   <el-option v-for='(item,index) in applicationList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col> -->

									<el-col :md='{span:10,offset:2}'>
										<el-form-item label='镜像名' prop='imageName'>
										    <el-select v-model="oneForm.imageName" @change='getVersion("oneForm")' @focus='getImageName' placeholder="请选择" clearable filterable>
							                   <el-option v-for='(item,index) in imageNameList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										   <!-- <el-input v-model="oneForm.imageName" placeholder="请输入镜像名" type='textarea'></el-input> -->
										</el-form-item>
									</el-col>

									<el-col :md='10'>
										<el-form-item label='系统管理员' prop='sysAdmin'>
										   <!-- <el-input v-model="oneForm.sysAdmin" :disabled='false'></el-input> -->
										   <el-autocomplete v-model="oneForm.sysAdmin" :disabled='false' :fetch-suggestions="querySearch">
											   	<template slot-scope="{ item }">
											   	    <div>{{ item.label }}</div>
											   	</template>
										   </el-autocomplete>
										</el-form-item>
									</el-col>

									<el-col :md='{span:10,offset:2}'>
										<el-form-item label="版本" prop='version'>
										    <el-select v-model="oneForm.version" placeholder="请选择" clearable filterable>
							                   <el-option v-for='(item,index) in oneFormVersionList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
											<!-- <el-input v-model="oneForm.version" placeholder="请输入版本号"></el-input> -->
										</el-form-item>
									</el-col>


									<el-col :md='10'>
										<el-form-item label='应用管理员' prop='appAdmin'>
											<el-autocomplete v-model="oneForm.appAdmin" :disabled='false' :fetch-suggestions="querySearch">
												<template slot-scope="{ item }">
												    <div>{{ item.label }}</div>
												</template>
											</el-autocomplete>
										   <!-- <el-input v-model="oneForm.appAdmin" :disabled='false'></el-input> -->
										</el-form-item>
									</el-col>

									<el-col :md='{span:10,offset:2}'>
										<el-form-item label='备注' prop='opComment'>
										   <el-input v-model="oneForm.opComment" placeholder="请输入备注" type='textarea'></el-input>
										</el-form-item>
									</el-col>

									<el-col :md='10'>
										<el-form-item label='Config' prop='param1'>
										   <el-input v-model="oneForm.param1" placeholder="请输入Config" type='textarea' :rows='15'></el-input>
										</el-form-item>
									</el-col>
									
									<el-col :md='{span:10,offset:2}'>
										<el-form-item label='RegisterClient' prop='param2'>
										   <el-input v-model="oneForm.param2" placeholder="请输入RegisterClient" type='textarea' :rows='15'></el-input>
										</el-form-item>
									</el-col>			    								
								</el-row>

								<div class='btn-group-lg'>
								    <el-button @click="submitForm('oneForm')" :disabled='btnDisabled'>添 加</el-button>
								    <el-button @click="resetForm('oneForm')">重 置</el-button>
								</div>
				    		</el-form>
						</div>

						<div class="empty"></div>

						<div class="compenent-form">
							<el-row class='m-t20' :gutter='30'>
								<el-col :md='1'>
									<el-button @click='refresh' type='primay' class='fa fa-refresh search-btn'></el-button>
								</el-col>

								<el-col :md='{span:5,offset:12}'>
								    <el-select v-model="status" placeholder="请选择">
					                   <el-option label='全部' value='0'></el-option>
					                   <el-option label='可用' value='1'></el-option>
					                   <el-option label='不可用' value='-1'></el-option>
								    </el-select>
								</el-col>
								<el-col :md='6'>
									<el-input v-model="searchText" placeholder='请输入搜索条件'>
										<el-button @click='search' slot="append" icon="el-icon-search" class='search-btn'></el-button>
									</el-input>
								</el-col>
							</el-row>
							<v-table 
								:data='oneTableData' 
								:tableHeadName='oneTableHeadName'
								:showOperator='true'
								:isShowIcon='true'
								:operatorTexts='["Config","RegisterClient",""]'
								:showNoMargin='true'
								labelName='查看详情'
								@editRow='viewDetail'
								@startApp='startApp'
								@stopApp='stopApp'
								@editApp='editApp'
								width='100'
								class='m-t20'
							></v-table>

							<div class="block pagination-wraper">
							   <el-pagination
							   	 v-if='oneTableData.length > 0'
							   	 @size-change='sizeChange'
							   	 @current-change='currentChange'
							     :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]"
							     :current-page.sync="oneCurrentPage"
							     layout="total, sizes, prev, pager, next, jumper"
							     :page-size='onePageSize'
							     :total="oneTotal">
							   </el-pagination>
							</div>
						</div>
					</el-tab-pane>

					<el-tab-pane label="我的审批列表" name="two">
						<div class="compenent-form">
							<el-row :gutter='30'>
								<el-col :md='1'>
									<el-button @click='approvalRefresh' type='primay' class='fa fa-refresh search-btn'></el-button>
								</el-col>

								<el-col :md='{span:5,offset:12}'>
								    <el-select v-model="approvalStatus" placeholder="请选择">
					                   <el-option label='全部' value='0'></el-option>
					                   <el-option label='可用' value='1'></el-option>
					                   <el-option label='不可用' value='-1'></el-option>
								    </el-select>
								</el-col>
								<el-col :md='6'>
									<el-input v-model="approvalSearchText" placeholder='请输入搜索条件'>
										<el-button @click='approvalSearch' slot="append" icon="el-icon-search" class='search-btn'></el-button>
									</el-input>
								</el-col>
							</el-row>
							<v-table 
								:data='twoTableData' 
								:tableHeadName='twoTableHeadName'
								:showOperator='false'
								@reject='reject'
								@approve='approve'
								class='m-t20'
							></v-table>

							<div class="block pagination-wraper">
							   <el-pagination
							   	 v-if='twoTableData.length > 0'
							   	 @size-change='sizeChange'
							   	 @current-change='currentChange'
							     :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]"
							     :current-page.sync="twoCurrentPage"
							     layout="total, sizes, prev, pager, next, jumper"
							     :page-size='twoPageSize'
							     :total="twoTotal">
							   </el-pagination>
							</div>
						</div>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>

	    <el-dialog
	      :visible.sync="dialogVisible"
	      @close="dialogVisible = false"
    	  title="编辑"
    	  width='60%'
    	  
    	 >
			<el-form :model='dialogForm' label-width='120px' ref='dialogForm' :rules='rules'>
				<el-row :gutter='30'>
					<el-col :md='12'>
						<el-form-item label='实例名称' prop='caseName'>
						   <el-input v-model="dialogForm.caseName" placeholder='请输入实例名称'></el-input>
						</el-form-item>
					</el-col>
					<el-col :md='12'>
						<el-form-item label='副本数' prop='replica'>
						   <el-input-number v-model="dialogForm.replica" placeholder='请输入副本数' clearable :min='0'></el-input-number>
						</el-form-item>
					</el-col>

					<el-col :md='12'>
						<el-form-item label='镜像名' prop='imageName'>
						    <el-select v-model="dialogForm.imageName" @change='getVersion("dialogForm")' placeholder="请选择" clearable filterable>
			                   <el-option v-for='(item,index) in imageNameList' :label='item.label' :value='item.value' :key='index'></el-option>
						    </el-select>
						   <!-- <el-input v-model="dialogForm.imageName" placeholder="请输入镜像名"></el-input> -->
						</el-form-item>
					</el-col>
								    
					<el-col :md='12'>
						<el-form-item label='版本号' prop='version'>
						    <el-select v-model="dialogForm.version" placeholder="请选择" clearable filterable>
			                   <el-option v-for='(item,index) in dialogFormVersionList' :label='item.label' :value='item.value' :key='index'></el-option>
						    </el-select>
						   <!-- <el-input v-model="dialogForm.version" placeholder="请输入版本号"></el-input> -->
						</el-form-item>

					</el-col>

					<el-col :md='12'>
						<el-form-item label='Config' prop='param1'>
						   <el-input v-model="dialogForm.param1" placeholder="请输入Config" type='textarea' :rows='10'></el-input>
						</el-form-item>
					</el-col>
					<el-col :md='12'>
						<el-form-item label='RegisterClient' prop='param2'>
						   <el-input v-model="dialogForm.param2" placeholder="请输入RegisterClient" type='textarea' :rows='10'></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<div class="text-right">
					<el-button type="primary" @click="submitForm('dialogForm')" :dsiabled='btnDisabled'>变 更</el-button>
					<el-button @click="dialogVisible = false">取 消</el-button>
				</div>
			</el-form>
    	</el-dialog>

		<el-dialog
			title='查看详情'
			:visible.sync="paramDialogVisible"
			width="50%"
		>
			<div>
				<el-input readonly type='textarea' :rows='10' v-model='param' ref='myTextarea'></el-input>
			</div>

			<div class='text-right m-tb15'>
		    	<span slot="footer" class="dialog-footer">
		    		<el-button type="primary" @click='copy' class='fa fa-copy'></el-button>
		    	  	<el-button type="primary" @click="paramDialogVisible=false">关 闭</el-button>
		    	</span>
	    	</div>
		</el-dialog>
	</div>

</template>

<style lang='scss'>
	.scada {
		.main-middle {
			padding: 0;
		}
		.el-tabs__header,.compenent-form,{
			padding: 0 20px;
		}
		.el-table .cell {
			overflow: visible;
		}
		.Status span {
			margin-right: 5px;
		}
	}
	.search-btn {
		background: #148EF5 !important;
		color: #fff !important;
	}
</style>

<script type="text/javascript">
	export default {
		data () {
			return {
				param: '',
				id: '',					//记录当前的table行对应的ID
				dialogVisible: false,
				paramDialogVisible: false,
				disabled: true,
				btnDisabled: false,
				labelWidth: '10rem',
				activeName: 'one',
				oneForm: {
					caseName: '',		//实例名称
					dept: '',			//部门
					module: '',			//模块
					envType: '',
					application: '',	//应用
					version: '',		//版本
					param1: '',
					param2: '',
					sysAdmin: '',		//系统管理员
					appAdmin: '',		//应用管理员
					opComment: '',		//备注
					imageName: '',		//镜像名
				},
				dialogForm: {
					caseName: '',		//实例名称
					replica: '',		//副本数
					version: '',		//版本号
					param1: '',			//param1
					param2: '',			//params2
					imageName: '',		//镜像名
				},
				oneInitData: {
					memory: '2gb',			//内存
				},
				deptList: [],
				moduleList: [],
				dialogFormVersionList: [],
				imageNameList: [],
				oneFormVersionList: [],
				envList: [
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
				applicationList: [],
				hostList: [],
				masteHostList: [],
				slaveHostList: [],
				oneTableData: [
					
				],
				oneTableHeadName: {
					'CommonName': '名称',
					'Port': '端口',
					'ImageName': '镜像名',
					'Replica': '副本数',
					'Version': '版本号',
					'CreateTime': '创建时间',
					'ModifyTime': '变更时间',
					'SystemManager': '系统管理员',
					'Manager': '应用管理员',
					'Status': '服务状态',
					'State': '操作状态',
					'MonitorLink': '监控连接',
					'opComment': '操作'
				},
				onePageSize: 10,		//每页显示数		
		 		oneCurrentPage: 1,	//当前页码	
				oneTotal: 1,		//总页数
				twoTableData: [],
				twoTableHeadName: {
					Creator: '申请人',
					Type: '操作类型',
					approvalStatus: '状态',
					Desc: '描述',
					approvalOperator: '操作'
				},
				twoPageSize: 10,
				twoCurrentPage: 1,
				twoTotal: 1,
				approvalStatus: '0',
				approvalPrevStatus: '0',
				approvalSearchText: '',
				approvalPreSearchText: '',

				status: '0',			//状态
				preStatus: '0',			//记录搜索时候所选的状态
				preText: '',			//记录搜索时候所输入的文字
				searchText: '',
				rules: {
					caseName: [{
						required: true,
						message: '请输入实例名称',
						trigger: 'blur'
					}],
					dept: [{
						required: true,
						message: '请选择部门',
						trigger: 'change'
					}],
					envType: [{
						required: true,
						message: '请选择环境',
						trigger: 'change'
					}],
					module: [{
						required: true,
						message: '请选择产品模块',
						trigger: 'change'
					}],
					application: [{
						required: true,
						message: '请选择应用',
						trigger: 'change'
					}],
					version: [{
						required: true,
						message: '请选择版本',
						trigger: 'change'
					}],
					replica: [{
						required: true,
						message: '请输入副本数',
						trigger: 'blur'
					}],
					param2: [{
						required: true,
						message: '请输入RegisterClient',
						trigger: 'blur'
					}],
					param1: [{
						required: true,
						message: '请输入Config',
						trigger: 'blur'
					}],
					memory: [{
						required: true,
						message: '请选择内存',
						trigger: 'change'
					}],
					sysAdmin: [{
						required: true,
						message: '请输入系统管理员',
						trigger: 'blur'
					}],
					appAdmin: [{
						required: true,
						message: '请输入应用管理员',
						trigger: 'blur'
					}],
					opComment: [{
						required: true,
						message: '请输入备注',
						trigger: 'blur'
					}],
					imageName: [{
						required: true,
						message: '请选择镜像名',
						trigger: 'change'
					}],
				}
			}
		},
		methods: {
			/*获取模块数据*/
			getModule (staticid) {
				//清空产品模块和环境/应用/系统管理员/应用管理员
				let formObj = this.oneForm;
				formObj.module = '';
				formObj.application = '';
				formObj.envType = ''
				formObj.sysAdmin = '';
				formObj.appAdmin = ''
				this.moduleList = [];
				this.applicationList = [];

				app.post('/Gaea_api/getAllProcessDept', {
					staticid
				}, res => {
					for (let i of res.data.data) {
						i.label = i.module;
						i.value = i.staticid;
						this.moduleList.push(i)
					}
				})
			},
			copy () {
				this.$refs['myTextarea'].select(); 					// 选择对象
				document.execCommand("Copy"); 						// 执行浏览器复制命令
				this.$message({
		          message: '复制成功',
		          type: 'success',
		          customClass: 'my-message',
		          duration: 800,
		        });
			},
			querySearch (queryString, cb) {
				queryString && app.post('/Gaea_api/getUserlike', {
					search: queryString
				}, res => {
					for (let item of res.data.data) {
						item.label = item.cn_name + item.uid;
						item.value = item.uid
					}
					cb(res.data.data || [])
				}, err => {
				}, false)
			},
			/*获取版本号*/
			getVersion (imagename, flag) {
				let imageName = this[imagename].imageName
				//清空版本号
				!flag && (this[imagename].version = '');
				this[imagename + 'VersionList'] = [];
				imageName && app.post('/caas/v1/getversionbyname', {
					imagename: imageName
				}, res => {
					for (let i of res.data.Data.imgversions) {
						this[imagename + 'VersionList'].push({
							label: i,
							value: i
						})
					}
					this[imagename + 'VersionList'] = this[imagename + 'VersionList'].sort( (a, b) => {
						return b.value - a.value;
					})
				})
			},

			/*获取镜像名*/
			getImageName (val) {
				this.imageNameList = []
				val && app.post('/caas/v1/getimagename', {

				}, res => {
					for (let i of res.data.Data.imagesname) {
						this.imageNameList.push({
							label: i,
							value: i
						})
					}
				})
			},
			/*切换标签页*/
			changeTab (vm) {
				if (vm.name === 'two') {
					this.getApprovalList('init')
				}
			},
			/*获取审批数据*/
			getApprovalList (opType) {
				let status = '';
				let offset = '0';
				let searchtext = ''
				switch (opType) {
					case 'search': 				//搜索按钮
						//当前页码重置为第一页
						this.twoCurrentPage = 1;
						//记录此刻的搜索状态
						this.approvalPrevStatus = status = this.approvalStatus;
						offset = '0'
						//记录此刻的搜索文字
						this.approvalPreSearchText = searchtext = this.approvalSearchText;
						break;
					case 'pageChange':
						status = this.approvalPrevStatus;
						searchtext = this.approvalPreSearchText;
						offset = this.twoPageSize * (this.twoCurrentPage - 1) + ''
						break;
					case 'init':
						//初始化分页参数
						this.twoPageSize = 10;
						this.twoCurrentPage = 1;
						status = '0';
						offset = '0';
						searchtext = '';
						break;
					case 'refresh':
						this.twoPageSize = 10;
						this.twoCurrentPage = 1;
						status = '0';
						offset = '0';
						searchtext = '';
						break;
				} 
				let params = {
					status,
					pagesize: this.twoPageSize + '',
					offset,
					searchtext,
				}
				app.post('/caas/v1/approvallist', params, res => {
					this.twoTableData = []
					for (let i of res.data.Data.approvals) {
						i.approvalStatus = i.Status === '1' ? '待审核' : i.Status === '2' ? '审核通过' : '拒绝'
						i.approvalOperator = i.Status
						this.twoTableData.push(i)
					}
					this.twoTableData.reverse()
					this.twoTotal = res.data.Data.counts;
				})
			},

			/*获取应用数据*/
			getApp (val) {
				//清空应用/系统管理员/应用管理员
				let formObj = this.oneForm;
				formObj.application = '';
				formObj.sysAdmin = '';
				formObj.appAdmin = ''
				this.applicationList = [];
				val && app.post('/Gaea_api/getApplication', {
					dept: app.tools.findValInArray(formObj.dept, this.deptList),
					env: formObj.envType,
				}, res => {
					for (let i of res.data.data) {
						i.label = i.app_name;
						i.value = i.app_id;
						this.applicationList.push(i)
					}
				})
			},
			/*获取应用对应的信息*/
			getAppInfo (appId) {
				//系统管理员，应用管理员和应用标识清空
				let formObj = this.oneForm;
				formObj.sysAdmin = ''
				formObj.appAdmin = ''
				appId && app.post('/Gaea_api/getAppmanager', {
					appId
				}, res => {
					formObj.sysAdmin = res.data.data.sys;
					formObj.appAdmin = res.data.data.app;
					/*如果返回值为空，则输入框可手工输入*/
					if (!formObj.sysAdmin || !formObj.appAdmin) {
						this.disabled = false
					}
				})  
			},
			sizeChange (pageSize) {
				this[this.activeName + 'PageSize'] = pageSize
				let fn = this.activeName === 'one' ? this.getAppList : this.getApprovalList
				fn('pageChange')
			},

			currentChange (currentPage) {
				this[this.activeName + 'CurrentPage'] = currentPage
				let fn = this.activeName === 'one' ? this.getAppList : this.getApprovalList
				fn('pageChange')
			},
			resetForm (formName) {
				app.tools.resetFormData(this[formName], this.oneInitData)
			},
			error () {
				this.btnDisabled = false;
				this.$alert('提交失败', {
					title: '提示',
					type: 'error'
				})
			},
			/*新增app*/
			newApp (res) {
				let code = res.data.Code;
				this.btnDisabled = false;
				this.$alert(res.data.Message, {title: '提示',type: 'info'})
				if (code === '2000000') {			//添加成功，则刷新列表
					this.getAppList('addApp')
				}
			},
			/*变更app*/
			upgradeApp (res) {
				this.btnDisabled = false;
				let code = res.data.Code;
				this.$alert(res.data.Message, {
					title: '提示',
					type: 'info'
				})
				if (code === '2000000') {			//变更成功
					this.dialogVisible = false;
					this.getAppList('refresh')
				}
			},
			/*提交表单*/
			submitForm (formName) {
				let formObj = formName === 'dialogForm' ? this.dialogForm : this[this.activeName + 'Form']
				let url = '',
					fn = null,
					params = {};
				switch(formName) {
					case 'oneForm':
						url = '/caas/v1/newapp';
						params = {
							replica: '1',
							commonname: formObj.caseName,		//实例名称					
							appid: 'scada' || formObj.application,			//应用id
							appname: 'scada' || app.tools.findValInArray(formObj.application, this.applicationList),		//应用名称
							orgname: 'scada' || app.tools.findValInArray(formObj.dept, this.deptList),						//部门名
							departmentname: 'scada' || app.tools.findValInArray(formObj.module, this.moduleList),			//模块名
							version: formObj.version,
							manager: formObj.appAdmin,
							systemmanager: formObj.sysAdmin,
							param1: formObj.param1,
							param2: formObj.param2,
							desc: formObj.opComment,			//备注
							imagename: formObj.imageName,	//镜像名
						}
						fn = this.newApp
						break;
					case 'dialogForm':
						url = '/caas/v1/upgradeapp';
						params = {
							appid: this.id + '',
							replica: formObj.replica + '',
							commonname: formObj.caseName,
							version: formObj.version + '',
							param1: formObj.param1,
							param2: formObj.param2,
							imagename: formObj.imageName,	//镜像名
						}
						fn = this.upgradeApp;
				}

				this.$refs[formName].validate((valid) => {
					if (valid) {					//必填数据校验成功。。请求接口
						this.btnDisabled = true;	//按钮禁用
						app.post(url, params, fn, this.error)
					}
				})
			},
			/*启动app*/
			startApp ({row, $index}) {
				this.$confirm('确定启动应用?', {
					title: '提示',
					type: 'warning',
					callback: (action, instance) => {
						if (action === 'confirm') {
							app.post('/caas/v1/startapp', {
								"appids": [row.Id + '']
							}, res => {
								let code = res.data.Code
								this.$alert(res.data.Message, {
									title: '提示',
									type: 'info'
								})
								if (code === '2000000') {
									this.getAppList('refresh')
								}
							})
						}
					}
				})
				
			},
			approve ({row, $index}) {
				this.$confirm('确定要审核通过?', {
					title: '提示',
					type: 'warning',
					callback: (action, instance) => {
						if (action === 'confirm') {
							app.post('/caas/v1/approve', {
								approvalids: [row.Id + '']
							}, res => {
								let code = res.data.Code
								this.$alert(res.data.Message, {
									title: '提示',
									type: 'info'
								})
								if (code === '2000000') {
									this.getApprovalList('refresh')
								}
							})
						}
					}
				})
			},

			reject ({row, $index}) {
				this.$confirm('确定驳回?', {
					title: '提示',
					type: 'warning',
					callback: (action, instance) => {
						if (action === 'confirm') {
							app.post('/caas/v1/reject', {
								"approvalids": [row.Id + '']
							}, res => {
								let code = res.data.Code
								this.$alert(res.data.Message, {title: '提示',type: 'info'})
								if (code === '2000000') {
									this.getAppList('refresh')
								}
							})
						}
					}
				})
			},
			/*停止app*/
			stopApp ({row, $index}) {
				this.$confirm('确定停止应用?', {
					title: '提示',
					type: 'warning',
					callback: (action, instance) => {
						if (action === 'confirm') {
							app.post('/caas/v1/stopapp', {
								"appids": [row.Id + '']
							}, res => {
								let code = res.data.Code
								this.$alert(res.data.Message, {title: '提示',type: 'info'})
								if (code === '2000000') {
									this.getAppList('refresh')
								}
							})
						}
					}
				})
			},
			/*编辑app*/
			editApp ({row, $index}) {
				let formObj = this.dialogForm; 
				this.id = row.Id;
				app.post('/caas/v1/getsingleapp', {
					appid: this.id + ''
				}, res => {
					let code = res.data.Code
					let data = res.data.Data.app
					if (code === '2000000') {
						this.dialogVisible = true;
						formObj.caseName = data.CommonName;				//实例名称
						formObj.replica = data.Replica
						formObj.version = data.Version
						formObj.param1 = data.Params1
						formObj.param2 = data.Params2
						formObj.imageName = data.ImageName
						this.getVersion('dialogForm', true)
					}
				})
				
			},

			viewDetail ({row, title}) {
				this.paramDialogVisible = true
				if (title === 'Config') {
					this.param = row.Params1
				} else {
					this.param = row.Params2
				}
			},

			refresh () {
				this.getAppList('refresh')
			},

			approvalRefresh () {
				this.getApprovalList('refresh')
			},
			approvalSearch () {
				this.getApprovalList('search')
			},

			search () {
				this.getAppList('search')
			},

			/*获取部门下拉框数据*/
			getDept () {
				app.post('/Gaea_api/getAllProcessDept', {}, res => {
					for (let i of res.data.data) {
						i.label = i.org;
						i.value = i.staticid;
						this.deptList.push(i)
					}
				})
			},
			/*获取mysql列表数据*/
			getAppList (opType) {
				let status = '';
				let offset = '0';
				let searchtext = ''
				switch (opType) {
					case 'search': 				//搜索按钮
						//当前页码重置为第一页
						this.oneCurrentPage = 1;
						//记录此刻的搜索状态
						this.preStatus = status = this.status;
						offset = '0'
						//记录此刻的搜索文字
						this.preText = searchtext = this.searchText;
						break;
					case 'pageChange':
						status = this.preStatus;
						searchtext = this.preText;
						offset = this.onePageSize * (this.oneCurrentPage - 1) + ''
						break;
					case 'addApp':
						//初始化分页参数
						this.onePageSize = 10;
						this.oneCurrentPage = 1;
						status = '0';
						offset = '0';
						searchtext = '';
						break;
					case 'refresh':
						this.onePageSize = 10;
						this.oneCurrentPage = 1;
						status = '0';
						offset = '0';
						searchtext = '';
						break;
				} 
				app.post('/caas/v1/applist', {
					status,
					pagesize: this.onePageSize + '',
					offset,
					searchtext,
				}, res => {
					this.oneTableData = []
					for (let i of res.data.Data.apps) {
						let normalStatus = 0
						let disabledStatus = 0
						i.CreateTime = app.tools.formatDate(i.CreateTime)
						i.ModifyTime = app.tools.formatDate(i.ModifyTime)
						i.opComment = i.State
						for (let j of i.Status.split(';')) {
							if (j === '1') {
								i.normalStatus = ++normalStatus;
							} else {
								i.disabledStatus = ++disabledStatus;
							}
						}
						this.transferState(i)
						this.oneTableData.push(i)
					}
					this.oneTotal = res.data.Data.counts;
				})
			},

			transferState (i) {
				switch (i.State) {
					case '1':
						i.State = '申请创建';
						break;
					case '2':
						i.State = '创建中';
						break;
					case '3':
						i.State = '创建完成';
						break;
					case '4':
						i.State = '申请升级';
						break;
					case '5':
						i.State = '升级中';
						break;
					case '6':
						i.State = '升级完成';
						break;
					case '7':
						i.State = '申请下线';
						break;
					case '8':
						i.State = '下线中';
						break;
					case '9':
						i.State = '下线完成';
						break;
				}
			},
		},

		created () {
			//获取部门数据
			this.getDept()
			//获取mysql列表数据
			this.getAppList('addApp')
			//获取镜像名
			//this.getImageName()
		}
	}

</script>