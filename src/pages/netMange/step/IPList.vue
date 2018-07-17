<template>
	<div class="box">
		<div class="IP-List">
			<div class="main-middle">
				<ul class='ip-list clearfix'>
					<li v-for='(item,index) in result' :key='index'>
						<el-tooltip placement="bottom" effect="light" v-if='item.ip_status' popper-class='my-tooltip'>
							<div slot="content">
								<p><label>申请时间:</label><span>{{start_time}}</span></p>
								<p><label>应用系统:</label><span>{{app_name}}</span></p>
								<p><label>系统管理员:</label><span>{{sysadmin_name}}</span></p>
								<p><label>应用管理员:</label><span>{{appadmin_name}}</span></p>
								<p><label>部门:</label><span>{{dept_name}}</span></p>
								<p><label>功能模块:</label><span>{{pm_name}}</span></p>
								<p><label>备注:</label><span>{{ip_other}}</span></p>
							</div>
							<a 
								role="button" 
								:ip="item.ip_address"
								:status='item.ip_status'
								@click='showDialog(item, index)'
								@mouseenter='getTitle(item)'
							>
								<i class="fa fa-circle fa-lg" style="color:#3CB371" aria-hidden="true"></i> 
							</a> 
						</el-tooltip>
						<el-tooltip placement="bottom" effect="light" v-else-if='item.ip_manual == 1'>
							<a 
								role="button"
								:title="item.ip_address"
								:ip="item.ip_address"
								:status='item.ip_status'
								@click='showDialog(item, index)'
							>
								<i class="fa fa-circle fa-lg" style="color:#D2B48C" aria-hidden="true"></i>
							</a>
						</el-tooltip>
						<el-tooltip placement="bottom" effect="light" v-else>
							<div slot="content">
								{{item.ip_address}}
							</div>
							<a 
								role="button"
								:ip="item.ip_address"
								:status='item.ip_status'
								@click='showDialog(item, index)'
							>
								<i class="fa fa-circle fa-lg" style="color:gray" aria-hidden="true"></i>
							</a>
						</el-tooltip>

						<sup> {{ item.ip_address.split('.')[3] }} </sup>
					</li>
				</ul>
			</div>
		</div>

		<el-dialog
    	  :title="title"
    	  :visible.sync="dialogVisible"
    	  width="50%"
    	  @close='closeDialog'
    	>
			<el-form :model='dialogForm' :label-width='labelWidth'>
				<el-row v-show='isShowForm'>
					<el-col :md='12'>
						<el-form-item label="部门">
						    <el-select v-model="dialogForm.dept" placeholder="请选择" clearable filterable  @change='getProductModule'>
         						<el-option v-for='(item,index) in deptList' :key='index' :label='item.label' :value='item.value'></el-option>
						    </el-select>
						</el-form-item>
					</el-col>

					<el-col :md='12'>
						<el-form-item label="产品模块">
						    <el-select v-model="dialogForm.moduleId" placeholder="请选择" clearable filterable @change='chooseModule'>
			                    <el-option v-for='(item,index) in moduleList' :label='item.label' :value='item.value' :key='index'></el-option>
						    </el-select>
						</el-form-item>
					</el-col>

					<el-col :md='12'>
						<el-form-item label="环境">
						    <el-select v-model="dialogForm.env" placeholder="请选择" clearable filterable @change='chooseEnv'>
			                    <el-option v-for='(item,index) in envList' :label='item.label' :value='item.value' :key='index'></el-option>
						    </el-select>
						</el-form-item>
					</el-col>
					<el-col :md='12'>
						<el-form-item label="应用名称">
						    <el-select v-model="dialogForm.appname" placeholder="请选择" clearable filterable @change='getAdmin'>
			                    <el-option v-for='(item,index) in appnameList' :label='item.label' :value='item.value' :key='index'></el-option>
						    </el-select>
						</el-form-item>
					</el-col>

					<el-col :md='12'>
						<el-form-item label="系统管理员">
						    <el-select 
							    v-model="dialogForm.sysAdmin"
							    :loading="loading"
							    :remote-method="remoteMethod"
							    placeholder="请输入"
							    remote 
							    clearable 
							    filterable
						    >
			                    <el-option v-for='(item,index) in sysAdminList' :label='item.label' :value='item.value' :key='index'></el-option>
						    </el-select>
						</el-form-item>
					</el-col>

					<el-col :md='12'>
						<el-form-item label="应用管理员" prop='appadmin'>
						    <el-select 
							    v-model="dialogForm.appAdmin"
							    :loading="loading"
							    :remote-method="remoteMethod1"
							    placeholder="请输入"
							    remote 
							    clearable 
							    filterable
						    >
			                    <el-option v-for='(item,index) in appAdminList' :label='item.label' :value='item.value' :key='index'></el-option>
						    </el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row v-show='isShowComments'>
					<el-col :md='24'>
						<el-form-item label="备注">
							<el-input v-model='dialogForm.comments' type='textarea' :rows='2'></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<p v-show='isShowResult'>{{exeResult}}</p>
			</el-form>

	    	<el-row>
	    		<el-col :md='24' class='text-right'>
				  	<el-button type="primary" @click="onSubmit" v-show='isShowBtn' :disabled='btnDisabled'>确 定</el-button>
				  	  <el-button @click="dialogVisible = false">取 消</el-button>
		    		</el-col>
	    	</el-row>
    	</el-dialog>
	</div>
</template>
<style lang='scss'>
	.ip-list li {
		float: left;
	    width: 100px;
	    height: 50px;
	    line-height: 50px;
	    border-bottom: 1px solid #eee;
	    a {
			cursor: pointer;
		}
	}
	.my-tooltip {
		p {
			line-height: 30px;
			label {
				display: inline-block;
				width: 70px;
				text-align: right;
				vertical-align: middle;
			}
			span {
				display: inline-block;
			}
		}
	}
</style>

<script type="text/javascript">
	import { mapState } from "vuex";
	export default {
		data () {
			return {
				labelWidth: '93px',
				title: 'IP管理',
				index: 0,
				dialogForm: {
					appname: '',
					sysAdmin: '',
					appAdmin: '',
					dept: '',
					moduleId: '',
					comments: '',
					env: '',
				},
				envList: [
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
				sysAdminList: [],
				appAdminList: [],
				appnameList: [],
				deptList: [],
				moduleList: [],
				start_time: '',		//申请时间
				app_name: '',
				sysadmin_name: '',
				appadmin_name: '',
				dept_name: '',
				pm_name: '',
				ip_other: '',
				result:[],
				isShowForm: false,
				dialogVisible: false,
				isShowBtn: true,
				isShowComments: true,
				isShowResult: false,
				btnDisabled: false,
				exeResult: '',
				loading: false,
				ipaddress: '',
			}
		},
		computed: {
			...mapState(['pages'])
		},
		methods: {
			/*根据应用名称获取管理员信息*/
			getAdmin (val) {
				this.appAdminList = []
				this.sysAdminList = []
				let formObj = this.dialogForm
				let res = app.tools.findInArr(val, this.appnameList)
				this.appAdminList.push({
					label: res.appadmin + res.appadmin_id,
					value: res.appadmin
				})
				this.sysAdminList.push({
					label: res.sysadmin + res.sysadmin_id,
					value: res.sysadmin
				})
				formObj.appAdmin = res.appadmin_id
				formObj.sysAdmin = res.sysadmin_id
			},
			searchRemote (query, name) {
				if (query !== '') {
					this[name] = [];
					this.loading = true;
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
						this[name] = [];
						this.loading = false
					}, false)
				} else {
					this[name] = [];
				}
			},
			remoteMethod1 (query) {
				this.searchRemote(query, 'appAdminList')
			},
			remoteMethod (query) {
				this.searchRemote(query, 'sysAdminList')
			},
			getProductModule (val) {
				let formObj = this.dialogForm
				/*产品模块/环境/应用系统名称/系统管理员/应用管理员清空*/
				formObj.moduleId = ''
				this.moduleList = []
				formObj.env = ''

				formObj.appName = ''
				this.appnameList = []

				formObj.sysAdmin = ''
				this.sysAdminList = []

				formObj.appAdmin = ''
				this.appAdminList = []
				val && app.tools.getSphereProductModule(val, this.moduleList)
			},
			/*选择产品模块*/
			chooseModule () {
				let formObj = this.dialogForm
				//环境/应用名称/应用管理员/系统管理员清空	
				formObj.env = ''
				formObj.appname = ''
				this.appnameList = []

				formObj.sysAdmin = ''
				this.sysAdminList = []

				formObj.appAdmin = ''
				this.appAdminList = []
			},
			/*选择环境*/
			chooseEnv () {
				let formObj = this.dialogForm
				let dept = app.tools.findValInArray(formObj.dept, this.deptList)
				let env = formObj.env
				let pm = app.tools.findValInArray(formObj.moduleId, this.moduleList)
				//应用名称/应用管理员/系统管理员清空	
				formObj.appname = ''
				this.appnameList = []
				formObj.appAdmin = ''
				this.appAdminList = []
				formObj.sysAdmin = ''
				this.sysAdminList = []
				dept && env && pm && app.post('/auto/getApplication', {
					dept,
					env,
					pm
				}, res => {
					for (let i of res.data.data) {
						i.label = i.app_name;
						i.value = i.app_id;
						this.appnameList.push(i)
					}
				})
			},
			/*显示对话框*/
			showDialog (item, index) {
				this.ipaddress = item.ip_address
				this.index = index
				if (item.ip_status === '1') {
					this.title = 'IP回收'
					this.isShowForm = false
				} else {
					this.title = 'IP分配'
					this.isShowForm = true
				}
				this.dialogVisible = true
			},
			onSubmit () {
				let formObj = this.dialogForm
				let domain = app.tools.findValInArray(formObj.dept, this.deptList)
				let pm = app.tools.findValInArray(formObj.moduleId, this.moduleList)
				let params = {
					ip: this.ipaddress,
					other: formObj.comments,
					mipuser: this.$store.state.username,
					domain,
					pm,
					app_name: formObj.appname,
					sysadmin_name: formObj.sysAdmin,
					appadmin_name: formObj.appAdmin,
				}
				this.btnDisabled = true
				app.post('/auto/ipchange', params, res => {	
					this.btnDisabled = false
					if (res.data.code != '505') {
						this.$alert(res.data.msg, {
							title: '提示',
							type: 'info'
						})
					}
					if (res.data.Code === '100001') {		//成功
						this.result[this.index].ip_status = this.isShowForm ? '1' : ''
						this.isShowBtn = false
						this.isShowForm =  false;
						this.isShowComments = false;
						this.isShowResult = true;
						this.exeResult = res.data.msg
						this.title = '结果'
						this.dialogVisible = false
					}
				}, err => {
					this.btnDisabled = false
				})

			},
			closeDialog () {
				//数据重置
				this.title = 'IP管理';
				this.isShowComments = true;
				this.isShowBtn = true,
				this.exeResult = ''
				app.tools.resetFormData(this.dialogForm)
			},
			getNetVlan (ipaddress) {
				app.post('/auto/getnetvlan', {
					ipaddress,
					mipuser: this.$store.state.username,
				}, res => {
					for (let i of res.data.data) {
						this.result.push(i)
					}
				})
			},
			getTitle(item) {
				this.start_time = ''
				this.app_name = ''
				this.sysadmin_name = ''
				this.appadmin_name = ''
				this.dept_name = ''
				this.pm_name = ''
				this.ip_other = ''
				if (item.ip_status === '1') {			//只有状态为1才调取接口
					app.post('/auto/getnetvlanInfo', {
						ip: item.ip_address,
						mipuser: this.$store.state.username,
					}, res => {
						let code = res.data.code
						if (code === '100001') {
							for( let i of res.data.data) {
								this.start_time = i.start_time
								this.app_name = i.app_name
								this.sysadmin_name = i.sysadmin_name
								this.appadmin_name = i.appadmin_name
								this.dept_name = i.dept_name
								this.pm_name = i.pm_name
								this.ip_other = i.ip_other
							}
						}
					}, err => {}, false)
				}
			}
		},
		created () {
			let pages = this.pages
			//获取ipList
			this.getNetVlan(pages.params.ipaddress)

			//获取部门数据
			app.tools.getSphereDept(this.deptList)
		}
	}
</script>