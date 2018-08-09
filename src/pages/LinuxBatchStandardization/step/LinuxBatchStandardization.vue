<template>
	<div class="box">
		<div class="linux-standardization">
			<div class="main-middle">
				<el-tabs v-model="activeName">
					<el-tab-pane label="ROOT免认证" name="one">
						<el-form :model='oneForm' :label-width='labelWidth' ref='oneForm' :rules='rules'>
							<el-row>
								<el-col :md='20'>
									<el-form-item label="IP列表" prop='iplist'>
									    <el-input
									      type="textarea"
									      :rows='6'
									      :placeholder="'填写格式如下：\nIP1;password \nIP2;password\n或者格式如下：\nIP1\nIP2'"
									      v-model="oneForm.iplist">
									    </el-input>
									</el-form-item>
								</el-col>
								<el-col>
									<el-form-item>
										<el-checkbox 
											label="cmdb机器管理权限校验" 
											true-label='true'
											false-label='false'
											v-model='oneForm.bo_cmdb'
										></el-checkbox>
									</el-form-item>
								</el-col>
							</el-row>
							<div class="text-center m-tb15">	
								<el-button @click="submitForm('oneForm')" class='btn-lg' :disabled='btnDisabled'>提 交</el-button>
							</div>
						</el-form>
					</el-tab-pane>

					<el-tab-pane label="Linux标准化" name="two">
						<el-form :model='twoForm' :label-width='labelWidth' ref='twoForm' :rules='rules1'>
							<el-row>
								<el-col :md='9'>
									<el-form-item label="分类" prop='appdb'>
										<el-tooltip placement="right">
										  <div slot="content">
										  	应用  ：针对开源类的应用，数据盘挂载/apps 下<br>
										  	应用（云主机）：专门针对美的云的系统，会改非标准主机名，数据盘挂载/apps 下<br>
										  	应用（传统）: 针对传统类应用，比如商业套件。装NFS，不挂盘<br>
										  	数据库（开源）：针对开源数据库，xfs，python，perl 包，数据盘挂载/apps 下<br>
										  	EBS（RHEL6.3）: EBS RHEL6.3 专用<br>
										  	Oracle（RHEL6.9）：专门针对oracle的linux机器标准化,无apps用户<br>
										  </div>
										  <el-button style='position:absolute;left:102%' class='fa fa-info fa-lg' circle></el-button>
										</el-tooltip>
									    <el-select v-model="twoForm.appdb" placeholder="请选择">
	                 						<el-option label="应用" value="app"></el-option>
	                 						<el-option label="数据库(开源)" value="db"></el-option>
	                 						<el-option label="应用(云主机)" value="yunapp"></el-option>
	                 						<el-option label="应用(传统)" value="ortapp"></el-option>
	                 						<el-option label="EBS(RHEL6.3)" value="ebs"></el-option>
	                 						<el-option label="Oracle(RHEL6.9)" value="oracle"></el-option>
									    </el-select>
									</el-form-item>
								</el-col>	
								<el-col :md='20'>
									<el-form-item label="IP列表" prop='iplist'>
									    <el-input
									      type="textarea"
									      :rows='5'
									      :placeholder="'格式如下：\nIP1 \nIP2'"
									      v-model="twoForm.iplist">
									    </el-input>
									</el-form-item>
								</el-col>
								<el-col>
									<el-form-item>
										<el-checkbox 
											label="cmdb机器管理权限校验"
											true-label='true'
											false-label='false' 
											v-model='twoForm.bo_cmdb'
										>
											
										</el-checkbox>
									</el-form-item>
								</el-col>
							</el-row>
							<div class="text-center m-tb15">	
								<el-button @click="submitForm('twoForm')" class='btn-lg' :disabled='btnDisabled'>提 交</el-button>
							</div>
						</el-form>
					</el-tab-pane>

					<el-tab-pane label="应用安装" name="three">
						<el-form :model='threeForm' :label-width='labelWidth' ref='threeForm' :rules='rules1'>
							<el-row>
								<el-col :md='20'>
									<el-form-item label="IP列表" prop='iplist'>
									    <el-input
									      type="textarea"
									      :rows='5'
									      :placeholder="'填写格式如下：\nIP1 \nIP2 \nIP3'"
									      v-model="threeForm.iplist">
									    </el-input>
									</el-form-item>
								</el-col>
							</el-row>

							<el-row class='checkbox-group'>
								<el-col>
									<el-form-item>
								        <el-checkbox label="Zabbix client" v-model="threeForm.zabbixclient"
											true-label='true'
											false-label='false'
								        ></el-checkbox>
								        <el-checkbox label="Zabbix client(开源数据库)" 
									        v-model="threeForm.zabbixclientdb"
									        true-label='true'
											false-label='false'
								        ></el-checkbox>
								        <el-checkbox label="Tomcat" 
									        @change='isShowTomcat=!isShowTomcat' 
									        v-model="threeForm.tomcat"
									        true-label='true'
											false-label='false'
								        ></el-checkbox>
								        <el-checkbox label="jdk" 
									        @change='isShowJDK=!isShowJDK' 
									        v-model="threeForm.jdk"
									        true-label='true'
											false-label='false'
								        ></el-checkbox>
								        <el-checkbox label="Nginx" 
									        v-model="threeForm.nginx"
									        true-label='true'
											false-label='false'
								        ></el-checkbox>
								        <el-checkbox label="备份客户端" 
									        v-model="threeForm.backupclient"
									        true-label='true'
											false-label='false'
								        ></el-checkbox>
								        <el-checkbox label="zookeeper" 
									        v-model="threeForm.zookeeper"
									        true-label='true'
											false-label='false'
								        ></el-checkbox>
								        <el-checkbox label="python2.7" 
									        v-model="threeForm.ipython"
									        true-label='true'
											false-label='false'
								        ></el-checkbox>
								        <el-checkbox label="splunk client" 
									        v-model="threeForm.splunk"
									        true-label='true'
											false-label='false'
								        ></el-checkbox>
								        <el-checkbox label="命令" 
									        @change='isShowCommand=!isShowCommand,threeForm.cli_content=""' 
									        v-model="threeForm.cli"
									        true-label='true'
											false-label='false'
								        ></el-checkbox>
									</el-form-item>
								</el-col>
							</el-row>

							<el-row v-show='isShowTomcat'>
								<el-col :md='9'>
									<el-form-item label="Tomcat版本">
										<el-select v-model="threeForm.tomcat_version" placeholder="请选择">
						                    <el-option label="Tomcat 8.0" value="8.0"></el-option>
						                    <el-option label="Tomcat 8.5" value="8.5"></el-option>
						                    <el-option label="Tomcat 7.0" value="7.0"></el-option>
									    </el-select>
									</el-form-item>
								</el-col>
							</el-row>

							<el-row v-show='isShowJDK'>
								<el-col :md='9'>
									<el-form-item label="JDK版本">
										<el-select v-model="threeForm.jdk_version" placeholder="请选择">
						                   <el-option label="JDK 1.7.x" value="1.7"></el-option>
						                   <el-option label="JDK 1.8.x" value="1.8"></el-option>
									    </el-select>
									</el-form-item>
								</el-col>
							</el-row>

							<el-row v-show='isShowCommand'>
								<el-col :md='20'>
									<el-form-item label="命令" prop='cli_content'>
									    <el-input
									      type="textarea"
									      :rows='5'
									      placeholder="command...."
									      v-model="threeForm.cli_content">
									    </el-input>
									</el-form-item>
								</el-col>
							</el-row>

							<el-row>
								<el-col>
									<el-form-item>
										<el-checkbox 
											label="cmdb机器管理权限校验"
											true-label='true'
											false-label='false' 
											v-model='threeForm.bo_cmdb'
										>
											
										</el-checkbox>
									</el-form-item>
								</el-col>
							</el-row>
							<div class="text-center m-tb15">	
								<el-button @click="submitForm('threeForm')" class='btn-lg' :disabled='btnDisabled'>提 交</el-button>
							</div>
						</el-form>
					</el-tab-pane>

					<el-tab-pane label="修改密码" name="four">
						<el-form :model='fourForm' :label-width='labelWidth' ref='fourForm' :rules='rules1'>
							<el-row>
								<el-col :md='20'>
									<el-form-item label="IP列表" prop='iplist'>
									    <el-input
									      type="textarea"
									      :rows='5'
									      :placeholder="'填写格式如下：\nIP1 \nIP2'"
									      v-model="fourForm.iplist">
									    </el-input>
									</el-form-item>
								</el-col>
							</el-row>

							<el-row>
								<el-col :md='9'>
									<el-form-item label="用户" prop='user'>
										<el-input v-model='fourForm.user' placeholder='请输入'></el-input>
									</el-form-item>
								</el-col>
							</el-row>

							<el-row>
								<el-col :md='9'>
									<el-form-item label="密码" prop='passwd'>
										<el-input v-model='fourForm.passwd' placeholder='请输入'></el-input>
									</el-form-item>
								</el-col>
							</el-row>

							<el-row>
								<el-col>
									<el-form-item>
										<el-checkbox 
											label="cmdb机器管理权限校验"
											true-label='true'
											false-label='false' 
											v-model='fourForm.bo_cmdb'
										>
											
										</el-checkbox>
									</el-form-item>
								</el-col>
							</el-row>
							<div class="text-center m-tb15">	
								<el-button @click="submitForm('fourForm')" class='btn-lg' :disabled='btnDisabled'>提 交</el-button>
							</div>
						</el-form>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</div>
</template>
<style lang='scss'>
	.linux-standardization {
		.checkbox-group {
			 .el-checkbox {
			 	width: 200px;
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
				labelWidth: '8rem',
				activeName: 'one',
				oneForm: {
					iplist: '',		//IP列表
					bo_cmdb: 'true'
				},
				twoForm: {
					appdb: '',
					bo_cmdb: 'true',
					iplist: '',
				},
				threeForm: {
					tomcat_version: '8.0',
					jdk_version: '1.7',
					iplist: '',
					zabbixclient: 'false',
					zabbixclientdb: 'false',
					tomcat: 'false',
					jdk: 'false',
					nginx: 'false',
					backupclient: 'false',
					zookeeper: 'false',
					ipython: 'false',
					splunk: 'false',
					cli: 'false',
					bo_cmdb: 'true',
					cli_content : '',
				},
				isShowTomcat: false,
				isShowJDK: false,
				isShowCommand: false,

				fourForm: {
					iplist: '',
					user: 'apps',
					passwd: '',
					bo_cmdb: 'true',
				},
				rules: {
					/*IP列表*/
					iplist: [{
						required: true,
						validator: function(rule, value, callback) {
							if (!value) {
								callback(new Error("请输入IP"));
							} else if (!app.validator.ipPassword(value)) {
								callback(new Error("请填写正确的IP格式"));
							} else {
								callback()
							}
						},
						trigger: 'change'
					}],
				},
				rules1: {
					iplist: [{
						required: true,
						validator: function(rule, value, callback) {
							if (!value) {
								callback(new Error("请输入IP"));
							} if (!app.validator.ipList(value)) {
								callback(new Error("请填写正确的IP格式"));
							} else {
								callback()
							}
						},
						trigger: 'change'
					}],
					appdb: [{
						required: true,
						message: '请选择分类',
						trigger: 'change'
					}],
					user: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}],
					passwd: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}],
					cli_content: [{
						required: true,
						validator: (rule, value, callback) => {
							if (this[this.activeName + 'Form'].cli === 'true') {
								if (!value) {
									callback(new Error("请输入命令"));
								} if (/\"/g.test(value)) {
									callback(new Error("命令中不可以有双引号，请用单引号代替"));
								} else {
									callback()
								}
							} else {
								callback()
							}
						},
						trigger: 'blur'
					}]
				},
				btnDisabled: false,
			}
		},
		methods: {

			submitForm (formName) {
				this.$refs[formName].validate((valid) => {
					let formObj = this[this.activeName + 'Form'];
					let url = '';
					let params = Object.assign(formObj, {mipuser: this.$store.state.username})
					let arr = ['zabbixclient','zabbixclientdb','tomcat','jdk','nginx','backupclient','zookeeper','ipython','splunk','cli']
					let msg = app.tools.isChecked(formObj, arr)
					console.log(valid)
					if (valid) {
						switch (this.activeName) {
							case 'one':
								url = '/auto/rootssh'
								break;
							case 'two':
								url = '/auto/bulkosinit'
								break;
							case 'three':
								url = '/auto/appsinit'
								if (!msg) {
									this.$alert('安装项至少选择一项', {title: '提示'})
									return
								}
								break;
							case 'four':
								url = '/auto/passwd'
								break;
						}
						this.btnDisabled = true
						app.post(url, params, res => {
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
			error () {
				this.$alert('提交失败', {
					title: '提示',
					type: 'error'
				})
				this.btnDisabled = false;
			},
		}
	}
</script>