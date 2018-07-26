<template>
	<div class="box">
		<div class="back-mange">
			<div class="main-middle">
				<el-tabs v-model="activeName">
					<el-tab-pane label="平台权限管理" name="one">
						<div class="compenent-form">
							<el-form rel='form' :model='oneForm' :label-width='labelWidth'>
								<el-row>
									<el-col :md='9' class='required'>
										<el-form-item label="部门">
										    <el-select 
											    v-model="oneForm.dept"
											    @change='selectDept("one")' 
											    placeholder="请选择" 
											    clearable 
											    filterable
										    >
					         					<el-option v-for='(item,index) in oneDeptList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='{span:9,offset:2}' class='required'>
									  <el-form-item label="环境">
									      <el-select v-model="oneForm.envType" placeholder="请选择" @change='getAppList' clearable filterable>
									          <el-option v-for='(item,index) in oneEnvTypeList' :label='item.label' :value='item.value' :key='index'></el-option>
									      </el-select>
									  </el-form-item>
									</el-col>

									<el-col :md='9' class='required'>
										<el-form-item label="应用">
										    <el-select v-model="oneForm.application" placeholder="请选择" clearable filterable>
		                 						<el-option v-for='(item,index) in oneApplicationList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
								</el-row>
								<div class='btn-group-lg'>
								    <el-button type="primary" @click="onSubmit('query')" :disabled='btnDisabled'>查 询</el-button>
								    <el-button @click="resetForm">重 置</el-button>
								</div>
								<el-row>
									<el-col :md='18'>
										<template>
										  <el-transfer 
											  v-model="dbaList" 
											  @change='addClear'
											  :data="dbaListData"
											  :titles="['此应用权限组的DBA列表', '待选DBA']"
										  ></el-transfer>
										</template>
									</el-col>

									<el-col :md='6' class='my-select'>
										<p class='select-title'>当前登录用户对应的应用</p>
										<select multiple v-model='oneForm.userApplication' class='user-application'>
											<option v-for='(item,index) in userApplicationList' :key='index' :value='item.app_id'>{{item.app_name}}</option>
										</select>
									</el-col>
								</el-row>
							</el-form>
						</div>

					</el-tab-pane>
					
					<el-tab-pane label="DDL/DML自动手动入库开关" name="two">
						<div class="compenent-form">
							<el-form rel='form' :model='twoForm' :label-width='labelWidth'>
								<el-row>
									<el-col :md='9' class='required'>
										<el-form-item label="部门">
										    <el-select 
											    v-model="twoForm.dept"
											    @change='selectDept("two")'  
											    placeholder="请选择" 
											    clearable 
											    filterable
											>
										    	<el-option v-for='(item,index) in twoDeptList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='{span:9,offset:2}' class='required'>
										<el-form-item label="环境">
										    <el-select v-model="twoForm.envType" placeholder="请选择" clearable filterable>
		                 						<el-option :value="2" label='UAT环境'></el-option>
		                 						<el-option :value="3" label='生产环境'></el-option>
		                 						<el-option :value="6" label='VER环境'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
								</el-row>

								<div class="btn-group-lg">
									<el-button type="primary" @click="onSubmit('twoQuery')" :dsiabled='btnDisabled'>查 询</el-button>
									<el-button @click="resetForm">重 置</el-button>
								</div>
							</el-form>
						</div>
						<div class="empty"></div>
						<div class="compenent-form">
							<v-table 
							   :data='twoTableData' 
							   :tableHeadName='twoTableHeadName'
							   :isShowComments='false'
							   :operatorTexts='["开启","关闭",""]'
							   @editRow='openAndClose'
							   class='m-t20'
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
						</div>
					</el-tab-pane>

					<!-- <el-tab-pane label="添加用户或修改权限" name="three">
						<div class="compenent-form">
							<el-form rel='form' :model='threeForm' :label-width='100px'>
								<el-row>
									<el-col :md='12'>
										<el-form-item label="MIP账号">
											<el-input v-model="threeForm.mip" placeholder='请输入'></el-input>
										</el-form-item>
									</el-col>
					
									<el-col :md='12'>
										<el-form-item label="选择角色">
						    			    <el-select v-model="threeForm.role" placeholder="请选择">
						                        <el-option v-for='(item,index) in threeRoleList' :label='item.label' :value='item.value' :key='index'></el-option>
						    			    </el-select>
										</el-form-item>
									</el-col>
								</el-row>
								<div class="btn-group-lg">
									<el-button type="primary" @click="onSubmit" :dsiabled='btnDisabled' style='width: 200px'>添加用户并修改权限</el-button>
									<el-button @click="resetForm">重 置</el-button>
								</div>
							</el-form>
						</div>
						<div class="empty"></div>
					</el-tab-pane> -->

				</el-tabs>
			</div>
		</div>
	</div>
</template>


<style lang='scss'>
	.back-mange {
	  .main-middle {
	    padding: 0;
	  }
	  .el-tabs__header,.compenent-form,{
	    padding: 0 20px;
	  }
	  .user-application {
  	    height: 246px;
	  	option {
	  		line-height: 30px;
    		margin: 10px;
    		color: #606266;
	  	}
	  }
	  .el-transfer-panel .el-transfer-panel__header .el-checkbox .el-checkbox__label {
	  	font-size: 15px;
	  }
	  .my-select {
	  	border: 1px solid #ebeef5;
  	    border-radius: 5px;
	  }
	  .select-title {
	  	line-height: 40px;
  	    background: #f5f7fa;
  	    padding-left: 40px;
  	    border-bottom: 1px solid #ebeef5;
  	    color: #303133;
	  }
	  .el-transfer-panel {
	  	width: 38%;
	  }
	}
</style>

<script type="text/javascript">
	export default {
		data () {
			return {
				labelWidth: '140px',
				activeName: 'one',
				dbaList: [],
				dbaListData: [],
				dbaAllListData: [],
				oneForm: {
					dept: '',
					envType: '',
					application: '',
					userApplication: [],
				},
				prevDept: '',
				prevEnvType: '',
				prevApplication: '',
				oneEnvTypeList: [],
				oneDeptList: [],
				oneApplicationList: [],
				userApplicationList: [],

				
				btnDisabled: false,
				twoPageSize: 10,			//每页显示数
				twoTotal: 10,			//总数量
				twoCurrentPage: 1,		//当前页码数
				twoTableData: [],		
				twoTableHeadName: {
					domain_name: '部门名',
					app_name: '应用名',
					on_off: '是否需要审批'
				},
				twoAllTableData: [],

				twoForm: {
					dept: '',			//部门
					envType: '',		//环境类型
				},
				twoDeptList: [],

				threeForm: {
					MYSQL: '',
					role: '',
					roleDesc: ''
				},
				threeRoleList: [],
				threeMYSQLList: [],

				fourForm: {
					mip: '',
					role: '',
				},
				fourRoleList: []
			}
		},
		methods: {
			addClear(value, direction, movedKeys){
				let url = '/Gaea_database/appDBAManage'
				let idArr = []
				let nameArr = []
				let mipArr = []
				let params = {}
				
				for (let i of movedKeys) {
					idArr.push(this.dbaAllListData[i].id)
					nameArr.push(this.dbaAllListData[i].name)
					mipArr.push(this.dbaAllListData[i].dba_mip)
				}
				if (direction === 'right') {			//删除权限
					params = {
						app_dba_id: idArr.join(';'),
						//app_dba_id: idArr[0],
						op_type: 'delete',
						dba_mip: '',
						appId: '',
						userMip: this.$store.state.username,
					}
				} else {
					params = {
						app_dba_id: '',
						appId: this[this.activeName + 'Form'].application,
						dba_mip: mipArr.join(';'),
						//dba_name: nameArr[0],
						op_type: 'add',
						userMip: this.$store.state.username,
					}
				}
				app.post(url, params, res => {
					if (res.data.code != '505') {
						this.$alert(res.data.msg, {title: '提示',type: 'info'})
					}
					app.post('/Gaea_database/appDBAQuery', {
						deptId: this.prevDept,
						envId: this.prevEnvType,
						userMip: this.$store.state.username,
						appId: this.prevApplication,
					}, this.oneSuccess, this.error)
				})
			},
			validatorForm (type) {
				let msg = ''
				let formObj = this[this.activeName + 'Form']
				if (type === 'query') {
					if (!formObj.dept) {
						msg = '请选择部门'
					} else if (!formObj.envType) {
						msg = '请选择环境类型'
					} else if (!formObj.application) {
						msg = '请选择应用'
					}
				} else if (type === 'twoQuery') {
					if (!formObj.dept) {
						msg = '请选择部门'
					} else if (!formObj.envType) {
						msg = '请选择环境类型'
					} 
				}
				return msg
			},
			oneSuccess (response) {
				let res = response.data.data
				this.btnDisabled = false
				this.userApplicationList = [];
				this.dbaListData = [];
				this.dbaAllListData = [];
				this.dbaList = [];
				/*获取用户应用*/
				for (let i of res.user_app_list) {
					this.userApplicationList.push(i)
				}

				/*获取待选dba数据*/

				for(let i = 0; i < res.all_dba_list.length; i++) {
					this.dbaList.push(this.dbaListData.length)
					this.dbaListData.push({
						key: i,
						label: res.all_dba_list[i].dba_name,
						dba_id: res.all_dba_list[i].dba_id,
						dba_mip: res.all_dba_list[i].dba_mip,
					})
					this.dbaAllListData.push({
						name: res.all_dba_list[i].dba_name,
						id: res.all_dba_list[i].dba_id,
						dba_mip: res.all_dba_list[i].dba_mip,
					})
				}
				/*获取dba数据*/
				for (let i = 0; i < res.app_dba_list.length; i++) {
					this.dbaListData.push({
						key: this.dbaListData.length,
						label: res.app_dba_list[i].app_dba_name,
						dba_id: res.app_dba_list[i].app_dba_id,
						dba_mip: res.app_dba_list[i].dba_mip
					})
					this.dbaAllListData.push({
						name: res.app_dba_list[i].app_dba_name,
						id: res.app_dba_list[i].app_dba_id,
						dba_mip: res.app_dba_list[i].dba_mip,
					})
				}

			},
			twoSuccess (response) {
				let list = response.data.data.automatic_list
				this.btnDisabled = false
				this.twoAllTableData = []
				for (let i of list) {
					this.twoAllTableData.push(i)
				}
				this.twoTotal = this.twoAllTableData.length;
				//重新计算分页
				app.tools.changeTable(this)

			},
			error () {							//点击提交按钮调用接口失败回调处理函数
				this.$alert('查询失败', {
					title: '提示',
					type: 'info'
				})
				this.btnDisabled = false
			},
			onSubmit (type) {
				let res = this.validatorForm(type);
				let url = ''
				let params = {}
				let formObj = this[this.activeName + 'Form']
				if (res) {
					this.$alert(res, {
						title: '提示', type: 'info'
					})
					return
				}
				if (type === 'query') {
					url = '/Gaea_database/appDBAQuery'
					params = {
						deptId: formObj.dept,
						envId: formObj.envType,
						userMip: this.$store.state.username,
						appId: formObj.application,
					}
					this.prevDept = formObj.dept
					this.prevEnvType = formObj.envType
					this.prevApplication = formObj.application
				} else if (type === 'twoQuery') {
					url = '/Gaea_database/automaticQuery'
					params = {
						deptId: formObj.dept,
						envId: formObj.envType,
						userMip: this.$store.state.username
					}
				}
				this.btnDisabled = true
				app.post(url, params, this[this.activeName + 'Success'], this.error)
			},
			resetForm () {
				app.tools.resetFormData(this[this.activeName + "Form"])
			},

			sizeChange (pageSize) {
				app.tools.sizeChange(this, pageSize)
			},
			currentChange (currentPage) {
				app.tools.currentChange(this, currentPage)
			},
			/*获取部门下拉框数据*/
			getDeptList () {
			  app.post('/Gaea_database/getDept', {
			    userMip: this.$store.state.username
			  }, res => {
			    for (let i of res.data.data.deptList) {
			      i.label = i.deptName;
			      i.value = i.deptId;
			      this.twoDeptList.push(i)
			    }
			  })
			},
			getDBAQuery () {
				let url = '/Gaea_database/appDBAQuery'
				let params = {
					deptId: '',
					envId: '',
					userMip: this.$store.state.username,
					appId: '',
				}
				app.post(url, params, res => {
						/*获取用户应用*/
					for (let i of res.data.data.user_app_list) {
						this.userApplicationList.push(i)
					}
					for (let i of res.data.data.deptList) {
						i.label = i.deptName;
						i.value = i.deptId;
						this.oneDeptList.push(i)
					}
				})
			},

			//获取环境列表数据
			getEnvList () {
			  //环境数据清空
			  app.post('/Gaea_database/getEnv', {
			    
			  }, response => {
			    for (let i of response.data.data.envList) {
			      i.label = i.envName;
			      i.value= i.envId;
			      this.oneEnvTypeList.push(i)
			    }
			  })
			},
			selectDept (name) {
				//环境和应用清空
				let formObj = this[name + 'Form']
				formObj.envType = ''
				//应用清空
				formObj.application = ''
				this[this.activeName + 'ApplicationList'] = []
			},
			/*获取所属域下拉框内容*/
			getAppList () {
				let formObj = this[this.activeName + 'Form']
				let deptId = formObj.dept
				let envId = formObj.envType
				//应用清空
				formObj.application = ''
				this[this.activeName + 'ApplicationList'] = []
				deptId && envId && app.post('/Gaea_database/getApp', {
				  deptId,
				  envId,
				  appType: 1,
				  userMip: this.$store.state.username
				}, response => {
				  for (let i of response.data.data.appList) {
				    i.label = i.appName
				    i.value = i.appId
				    this[this.activeName + 'ApplicationList'].push(i)
				  }
				})

			},
			openAndClose ({row, title, $index}) {
				let url = '/Gaea_database/onOffAutomatic'
				let op_type = title === '开启' ? 'on' : 'off'
				let params = {
					resources_id: row.resources_id,
					op_type,
				}
				if ((row.on_off === '是' && op_type === 'on') || (row.on_off === '否' && op_type === 'off')) {		//当前开启状态为是则不可点击开启按钮
					this.$alert('当前已是' + title + '状态,不可再' + title, {title: '提示', type: 'info'})
					return
				}
				app.post(url, params, res => {
					if (res.data.code != '505') {
						this.$alert(res.data.msg, {title: '提示', type: 'info'})
					}
					if (res.data.code === 'Gaea20062' || res.data.code === 'Gaea10062') {	//开启或者关闭成功成功
						this.twoTableData[$index].on_off = row.on_off === '是' ? '否' : '是'
					}
				})
			},

		},
		created () {
			/*获取部门下拉框选项内容*/
			this.getDeptList();
			//获取环境下拉列表数据
			this.getEnvList();
			//获取当前登录用户对应的应用
			this.getDBAQuery();
		}
	}
</script>