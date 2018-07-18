<template>
	<div class="box">
		<div class="linux-batch-init">
			<div class='main-middle'>
				<el-form :model='form' :label-width='labelWidth' ref='form' :rules='rules'>
					<el-row>
						<el-col :md='20'>
							<el-form-item label="主机列表" prop='ipaddress'>
							    <el-input
							      type="textarea"
							      :rows='5'
							      :placeholder="'格式如下：\nIP1;password\nIP2;password'"
							      v-model="form.ipaddress">
							    </el-input>
							</el-form-item>
						</el-col>
						<el-col :md='9'>
							<el-form-item label="部门" prop='domain'>
							    <el-select v-model="form.domain " placeholder="请选择" clearable filterable  @change='getProductModule'>
				                    <el-option v-for='(item,index) in deptList' :label='item.label' :value='item.value' :key='index'></el-option>
							    </el-select>
							</el-form-item>
						</el-col>

						<el-col :md='{span:9,offset:2}'>
							<el-form-item label="产品模块" prop='pm'>
							    <el-select v-model="form.pm" placeholder="请选择" clearable filterable @change='chooseModule'>
				                    <el-option v-for='(item,index) in productModuleList' :label='item.label' :value='item.value' :key='index'></el-option>
							    </el-select>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col :md='9'>
							<el-form-item label="环境" prop='prdstg'>
							    <el-select v-model="form.prdstg" placeholder="请选择" clearable filterable @change='chooseEnv'>
							    	<el-option v-for='(item,index) in envList' :label='item.label' :value='item.value' :key='index'></el-option>
							    </el-select>
							</el-form-item>
						</el-col>
						<el-col :md='{span:9,offset:2}'>
							<el-form-item label="应用系统名称" prop='appname'>
							    <el-select v-model="form.appname" placeholder="请选择" clearable filterable @change='getAdmin'>
				                    <el-option v-for='(item,index) in appnameList' :label='item.label' :value='item.value' :key='index'></el-option>
							    </el-select>
							</el-form-item>
						</el-col>

					</el-row>	

					<el-row>
						<el-col :md='9'>
							<el-form-item label="分类" prop='appdb'>
							    <el-select v-model="form.appdb" placeholder="请选择" @change='setCheckbox' clearable filterable>
				                    <el-option label="应用" value="app"></el-option>
				                    <el-option label="应用(云主机)" value="yunapp"></el-option>
				                    <el-option label="数据库(开源)" value="db"></el-option><el-option label="EBS(RHEL6.3)" value="ebs"></el-option>
				                    <el-option label="Oracle(RHEL6.9)" value="oracle"></el-option>
							    </el-select>
							</el-form-item>
						</el-col>
						<el-col :md='{span:9,offset:2}'>
							<el-form-item label="系统管理员" prop='sysadmin'>
							    <el-select 
								    v-model="form.sysadmin"
								    :loading="loading"
								    :remote-method="remoteMethod"
								    placeholder="请输入"
								    remote 
								    clearable 
								    filterable
							    >
				                    <el-option v-for='(item,index) in sysadminList' :label='item.label' :value='item.value' :key='index'></el-option>
							    </el-select>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col :md='9'>
							<el-form-item label="应用管理员" prop='appadmin'>
							    <el-select 
								    v-model="form.appadmin"
								    :loading="loading"
								    :remote-method="remoteMethod1"
								    placeholder="请输入"
								    remote 
								    clearable 
								    filterable
							    >
				                    <el-option v-for='(item,index) in appadminList' :label='item.label' :value='item.value' :key='index'></el-option>
							    </el-select>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row v-show='isShowCheckbox' class='checkbox-group'>
						<el-col :md='24'>
							<el-form-item>
						        <el-checkbox label="系统初始化"
						        	v-model='form.osinit'
						        	true-label='true'
									false-label='false'
						        ></el-checkbox>
						        <el-checkbox label="Zabbix client"
						        	v-model='form.zabbixclient'
						        	true-label='true'
									false-label='false'
						        ></el-checkbox>
						        <el-checkbox label="Tomcat" @change='showJdk'
						        	v-model='form.tomcat'
						        	true-label='true'
									false-label='false'
						        ></el-checkbox>
						        <el-checkbox label="Nginx"
						        	v-model='form.nginx'
						        	true-label='true'
									false-label='false'
						        ></el-checkbox>
						        <el-checkbox label="Zookepper"
						        	v-model='form.zookeeper'
						        	true-label='true'
									false-label='false'
						        ></el-checkbox>
						        <el-checkbox label="备份客户端"
						        	v-model='form.backupclient'
						        	true-label='true'
									false-label='false'
						        ></el-checkbox>
						        <el-checkbox label="Apache"
						        	v-model='form.apache'
						        	true-label='true'
									false-label='false'
						        ></el-checkbox>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row v-show='isShowJDK'>
						<el-col :md='9'>
							<el-form-item label="Tomcat版本">
								<el-select v-model="form.tomcat_version" placeholder="请选择">
				                    <el-option label="Tomcat 8.0" value="8.0"></el-option>
				                    <el-option label="Tomcat 8.5" value="8.5"></el-option>
				                    <el-option label="Tomcat 7.0" value="7.0"></el-option>
							    </el-select>
							</el-form-item>
						</el-col>
						<el-col :md='{span:9,offset:2}'>
							<el-form-item label="JDK版本">
								<el-select v-model="form.jdk_version" placeholder="请选择">
				                   <el-option label="JDK 1.7.x" value="1.7"></el-option>
				                   <el-option label="JDK 1.8.x" value="1.8"></el-option>
							    </el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<div class="text-center padd-b10">
						<el-button @click="submitForm('form')" size='small' class='btn-lg' :disabled='btnDisabled'>提 交</el-button>
					</div>
				</el-form>
			</div>
		</div>
	</div>
</template>

<style lang='scss'>
	.linux-batch-init {
		.el-form {
			padding-top: 20px;
		}
		.checkbox-group {
			 .el-checkbox {
			 	width: 120px;
			 }
			.el-checkbox+.el-checkbox {
				margin-left: 0
			}
		}
	}
</style>

<script type="text/javascript">
	export default {
		data () {
			return {
				btnDisabled: false,
				labelWidth: '120px',
				form: {
					ipaddress: '',		//主机列表
					domain: '',			//部门
					pm: '',				//产品模块
					prdstg: '',			//环境
					appdb: '',	//分类
					appname: '',//应用系统名称
					sysadmin: '',		//系统管理员
					appadmin: '',	//应用管理员
					osinit: 'true',
					zabbixclient: 'false',
					tomcat: 'false',
					apache: 'false',
					nginx: 'false',
					zookeeper: 'false',
					backupclient: 'false',
					bo_cmdb: 'false',
					tomcat_version: '8.0',		//tomcat版本
					jdk_version: '1.7',			//JDK版本
				},
				envList: [
					{
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
					},
				],
				deptList: [],
				appnameList: [],
				appadminList: [],
				sysadminList: [],
				productModuleList: [],
				isShowCheckbox: true,
				isShowJDK: false,
				loading: false,
				rules: {
					/*IP列表*/
					ipaddress: [{
						required: true,
						validator: function(rule, value, callback) {
							if (!value) {
								callback(new Error("请输入IP"));
							} else if (!app.validator.validatorIp(value)) {
								callback(new Error("请填写正确的IP格式,如IP1;password"));
							} else {
								callback()
							}
						},
						trigger: 'change'
					}],
					domain: [{
						required: true,
						message: '请选择部门',
						trigger: 'change'
					}],
					pm: [{
						required: true,
						message: '请选择产品模块',
						trigger: 'change'
					}],
					prdstg: [{
						required: true,
						message: '请选择环境',
						trigger: 'change'
					}],
					appname: [{
						required: true,
						message: '请选择应用系统名称',
						trigger: 'change'
					}],
					appadmin: [{
						required: true,
						message: '请输入应用管理员',
						trigger: 'change'
					}],
					sysadmin: [{
						required: true,
						message: '请输入系统管理员',
						trigger: 'change'
					}],
					appdb: [{
						required: true,
						message: '请选择分类',
						trigger: 'change'
					}],
				},

			}
		},
		methods: {
			showJdk (flag) {
				this.isShowJDK = flag === 'true' ? true : false
			},

			getProductModule (val) {
				let formObj = this.form
				/*产品模块/环境/应用系统名称/系统管理员/应用管理员清空*/
				formObj.pm = ''
				this.productModuleList = []
				formObj.prdstg = ''

				formObj.appname = ''
				this.appnameList = []
				formObj.sysadmin = ''
				this.sysadminList = []
				formObj.appadmin = ''
				this.appadminList = []
				val && app.tools.getSphereProductModule(val, this.productModuleList)
			},
			/*选择产品模块*/
			chooseModule () {
				let formObj = this.form
				//环境/应用名称/应用管理员/系统管理员清空	
				formObj.prdstg = ''
				formObj.appname = ''
				this.appnameList = []
				formObj.sysadmin = ''
				this.sysadminList = []
				formObj.appadmin = ''
				this.appadminList = []
			},
			/*选择环境*/
			chooseEnv () {
				let formObj = this.form
				let dept = app.tools.findValInArray(formObj.domain, this.deptList)
				let env = formObj.prdstg
				let pm = app.tools.findValInArray(formObj.pm, this.productModuleList)
				//应用名称/应用管理员/系统管理员清空	
				formObj.appname = ''
				this.appnameList = []
				formObj.appadmin = ''
				this.appadminList = []
				formObj.sysadmin = ''
				this.sysadminList = []
				dept && env && pm && app.tools.getSphereApplicationName({
					dept,
					env,
					pm
				}, this.appnameList)
			},

			/*根据应用名称获取管理员信息*/
			getAdmin (val) {
				this.appadminList = []
				this.sysadminList = []
				let formObj = this.form
				let res = app.tools.findInArr(val, this.appnameList)
				this.appadminList.push({
					label: res.appadmin + res.appadmin_id,
					value: res.appadmin_id
				})
				this.sysadminList.push({
					label: res.sysadmin + res.sysadmin_id,
					value: res.sysadmin_id
				})
				formObj.appadmin = res.appadmin_id
				formObj.sysadmin = res.sysadmin_id
			},

			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					let params = Object.assign(this.form, {mipuser: this.$store.state.username})
					let arr = ['zabbixclient','osinit','tomcat','jdk','nginx','backupclient','zookeeper','apache']
					let msg = app.tools.isChecked(this.form, arr)
					if (!msg) {
						this.$alert('安装项至少选择一项', {
							title: '提示',
							type: 'info'
						})
						return
					}
					if (valid) {
						this.btnDisabled = true
						app.post('/auto/osinit', params, res => {
							this.btnDisabled = false
							if (res.data.code != '505') {
								this.$alert(res.data.msg, {
									title: '提示',
									type: 'info'
								})
							}
						}, this.error)
					} else {
						return false;
					}
				});
			},
			error (err) {
				this.$alert('提交失败', {
					title: '提示',
					type: 'error'
				})
				this.btnDisabled = false
			},

			/*根据选择的分类内容来设置checkbox的状态*/

			setCheckbox (val) {
				if (val === 'db') {			//选择数据库
					this.isShowCheckbox = false
					this.isShowJDK = false
					this.form.tomcat_version = '8.0',		
					this.form.jdk_version = '1.7',			
					this.form.osinit = 'true'
				} else if (val === 'app') {
					this.isShowCheckbox = true
				}
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
							item.value = item.uid
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
				this.searchRemote(query, 'appadminList')
			},
			remoteMethod (query) {
				this.searchRemote(query, 'sysadminList')
			},
		},
		created () {
			//获取部门数据
			app.tools.getSphereDept(this.deptList)
		}		
	}
</script>