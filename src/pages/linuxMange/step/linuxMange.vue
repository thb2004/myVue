<template>
	<div class="box">
		<div class="linux-mange">
			<div class="main-middle">
				<el-tabs v-model="activeName" @tab-click='tabClick'>
					<el-tab-pane label="临时借用ROOT" name="one">
						<el-form :model='oneForm' :label-width='labelWidth' ref='oneForm' :rules='rules'>
							<el-row>
								<el-col :md='20'>
									<el-form-item label="主机列表" prop='ipList'>
									    <el-input
									      type="textarea"
									      :rows='5'
									      :placeholder="'格式如下：\nIP1 \nIP2'"
									      v-model="oneForm.ipList">
									    </el-input>
									</el-form-item>
								</el-col>	
							</el-row>

							<el-row>
								<el-col :md='8'>
									<el-form-item label="借用用户" prop='user'>
										<el-input v-model="oneForm.user"  placeholder='请输入'></el-input>
									</el-form-item>
								</el-col>

								<el-col :md='8'>
									<el-form-item label="借用期限">
									    <el-date-picker
									        v-model="oneForm.startDate"
									        :picker-options="pickerOptions"
									        type="datetime"
									        placeholder="默认三小时内有效"
									        format='yyyy/MM/dd HH:mm:ss'
									        value-format='yyyy/MM/dd HH:mm:ss'
									        popper-class='my-animation'
									    >
									    </el-date-picker>
									</el-form-item>
								</el-col>
								<el-col :md='8'>
									<el-form-item>
										  <el-checkbox 
											  label="永久有效" 
											  true-label='true'
								        	  false-label='false'
											  v-model='oneForm.forever'
										  >
										  	
										  </el-checkbox>  
									</el-form-item>
								</el-col>

								<el-col>
									<el-form-item>
										<el-checkbox 
											label="cmdb机器管理权限校验"
											true-label='true'
								        	false-label='false' 
											v-model='oneForm.cmdbcheck'
										>
											
										</el-checkbox>
									</el-form-item>
								</el-col>

								
							</el-row>
							<div class='text-center m-tb15'>
								<el-button @click="submitForm('oneForm')" :disabled='btnDisabled' class='btn-lg'>提 交</el-button>
							</div>
						</el-form>
					</el-tab-pane>

					<!-- <el-tab-pane label="历史记录" name="two">
						<el-tabs v-model="historyActiveName">
							<el-tab-pane label="执行结果" name="exeRes">
								<p class='title m-b20'>执行结果:</p>	
								<el-form :model='twoForm' label-width='0'>
									<el-form-item label-width='0'>
										<el-col :md='18'>
											<el-input readonly type='textarea' :rows='20' v-model='twoForm.exeResult'></el-input>
										</el-col>
									</el-form-item>
								</el-form>
							</el-tab-pane>
					
							<el-tab-pane label="操作记录" name="operRecord">
								<v-table 
									:data='operRecordTableData' 
									:tableHeadName='operRecordTableHeadName' 
									:isShowComments='true'
									labelName='详情'
									@openRemarkDialog='viewDetail'
								>
									
								</v-table>
					
								<div class="block pagination-wraper">
								   <el-pagination
								     v-if='operRecordTableData.length>0'
								   	 @size-change='sizeChange'
								   	 @current-change='currentChange'
								     :page-sizes="[10, 15, 20, 25, 30, 35, 40, 45, 50]"
								     layout="total, sizes, prev, pager, next, jumper"
								     :page-size='operRecordPageSize'
								     :total="operRecordTotal">
								   </el-pagination>
								</div>
							</el-tab-pane>
						</el-tabs>
					</el-tab-pane> -->

					<el-tab-pane label="非标准主机命令执行" name="three">
						<el-form :model='threeForm' :label-width='labelWidth' ref='threeForm' :rules='rules'>
							<el-row>
								<el-col :md='20'>
									<el-form-item label="IP列表" prop='password'>
									    <el-input
									      type="textarea"
									      :rows='5'
									      :placeholder="'请输入IP+英文分号+用户+分号+密码,如：\nIP1;user;passwd'"
									      v-model="threeForm.password">
									    </el-input>
									</el-form-item>
								</el-col>

								<el-col>
									<el-form-item>
								        <el-checkbox label="命令" 
									        @change='isShowCommand=!isShowCommand' 
									        v-model="threeForm.cli"
									        true-label='true'
											false-label='false'
								        ></el-checkbox>
						                <el-checkbox label="splunk client(user 填写root,安装在/opt下)"  
						        	        v-model="threeForm.splunk"
						        	        true-label='true'
						        			false-label='false'
						                ></el-checkbox>
						            </el-form-item>
								</el-col>

								<el-col :md='20' v-show='isShowCommand'>
									<el-form-item label="命令">
									    <el-input
									      type="textarea"
									      :rows='5'
									      placeholder="command...."
									      v-model="threeForm.cli_content">
									    </el-input>
									</el-form-item>
								</el-col>

								<el-col>
									<el-form-item>
										<el-checkbox 
											label="cmdb机器管理权限校验" 
											true-label='true'
							        		false-label='false'
											v-model='threeForm.cmdbcheck'
										>
											
										</el-checkbox>
									</el-form-item>
								</el-col>
	
							</el-row>
							<div class="text-center">
								<el-button @click="submitForm('threeForm')" type='primary' :disabled='btnDisabled' class='btn-lg'>提 交</el-button>
							</div>
						</el-form>
					</el-tab-pane>

					<el-tab-pane label="文本操作" name="four">
						<el-form :model='fourForm' :label-width='labelWidth' ref='fourForm' :rules='rules'>
							<el-row>
								<el-col :md='20'>
									<el-form-item label="IP列表" prop='ipList'>
									    <el-input
									      type="textarea"
									      :rows='5'
									      :placeholder="'填写格式如下：\nIP1 \nIP2 \nIP3'"
									      v-model="fourForm.ipList">
									    </el-input>
									</el-form-item>
								</el-col>

								<el-col :md='13'>
									<el-form-item label="文件名称" prop='filename'>
									    <el-input
									      :placeholder="fourForm.filenamePlaceholder"
									      v-model="fourForm.filename">
									    </el-input>
									</el-form-item>
								</el-col>

								<el-col>
									<el-form-item>
								        <!-- <el-checkbox label="这一行存在  " 
									        @change='isShowExits=!isShowExits' 
									        v-model="fourForm.exits"
									        true-label='true'
											false-label='false'
								        ></el-checkbox>
						                <el-checkbox label="这一行删除"  
						        	        v-model="fourForm.delete"
						        	        @change='isShowDelete=!isShowDelete' 
						        	        true-label='true'
						        			false-label='false'
						                ></el-checkbox>
				                        <el-checkbox label="这一行替换"  
				                	        v-model="fourForm.replace"
				                	        @change='isShowReplace=!isShowReplace' 
				                	        true-label='true'
				                			false-label='false'
				                        ></el-checkbox> -->
				                        <el-checkbox label="全文替换 (含备份)"  
						        	        v-model="fourForm.textChange"
						        	        @change='isShowTextChange=!isShowTextChange,fourForm.radio=""' 
						        	        true-label='true'
						        			false-label='false'
						                ></el-checkbox>
						            </el-form-item>
								</el-col>
							</el-row>
							<!-- <el-row v-show='isShowExits'>
								<el-col :md='9'>
									<el-form-item label="存在">
									    <el-input
									      placeholder="ipadrress..."
									      v-model="fourForm.filename">
									    </el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row v-show='isShowDelete'>
								<el-col :md='9'>
									<el-form-item label="不存在">
									    <el-input
									      placeholder="ipadrress..."
									      v-model="fourForm.filename">
									    </el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row v-show='isShowReplace'>
								<el-col :md='9'>
									<el-form-item label="原内容">
									    <el-input
									      placeholder="ipadrress..."
									      v-model="fourForm.filename">
									    </el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row v-show='isShowReplace'>
								<el-col :md='9'>
									<el-form-item label="新内容">
									    <el-input
									      placeholder="ipadrress..."
									      v-model="fourForm.filename">
									    </el-input>
									</el-form-item>
								</el-col>
							</el-row> -->
							<el-row v-show='isShowTextChange'>
								<el-col :md='13'>
									<el-form-item label="内容" prop='cli_content'>
									    <el-input
									      type='textarea'
									      :rows='5'
									      :placeholder="fourForm.contentPlaceholder"
									      v-model="fourForm.cli_content">
									    </el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col>
									<el-form-item label='模板'>
										<el-radio-group v-model="fourForm.radio" @change='chooseTemplate'>
										    <el-radio label="1">Linux DNS 变更</el-radio>
										    <el-radio label="2">Linux 密码策略 变更</el-radio>
										    <el-radio label="3">Linux NTP 服务</el-radio>
										 </el-radio-group>
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
											v-model='fourForm.cmdbcheck'
										></el-checkbox>
									</el-form-item>
								</el-col>
							</el-row>
							<div class="text-center">
								<el-button @click="submitForm('fourForm')" type='primary' :disabled='btnDisabled' class='btn-lg'>提 交</el-button>
							</div>
						</el-form>
					</el-tab-pane>

					<!-- <el-tab-pane label="备份安装" name="five">
						<el-form :model='fiveForm' :label-width='labelWidth' ref='fiveForm' :rules='rules'>
							<el-row>
								<el-col>
									<el-form-item label="IP列表" prop='copyIpList'>
									    <el-input ref='fiveIPListInput'
									      type="textarea"
									      :rows='6'
									      :placeholder="'非标准化机器请输入IP+英文分号+密码,如：\nIP1;password1\nIP2;password2\n标准机器请输入IP+英文分号	\nIP1;\nIP2;'"
									      v-model="fiveForm.copyIpList">
									    </el-input>
									</el-form-item>
								</el-col>

								<el-col>
									<el-form-item>
										<el-checkbox 
											label="cmdb机器管理权限校验" 
											true-label='true'
								        	false-label='false'
											v-model='fiveForm.cmdbcheck'
										>
										</el-checkbox>
									</el-form-item>
								</el-col>	
							</el-row>
							<div class="text-center">
								<el-button @click="submitForm('fiveForm')" type='primary' :disabled='btnDisabled' class='btn-lg'>提交</el-button>
							</div>
						</el-form>
					</el-tab-pane> -->

					<el-tab-pane label="老机器标准化" name="six">
						<el-form :model='sixForm' :label-width='labelWidth' ref='sixForm' :rules='rules'>
							<el-row>
								<el-col>
									<el-form-item label="IP列表" prop='hostList'>
									    <el-input
									      type="textarea"
									      :rows='6'
									      :placeholder="'填写格式如下：\nIP1;password \nIP2;password\n或者格式如下\nIP1 \nIP2'"
									      v-model="sixForm.hostList">
									    </el-input>
									</el-form-item>
								</el-col>

								<el-col>
									<el-form-item>
										<el-checkbox 
											label="cmdb机器管理权限校验" 
											true-label='true'
								        	false-label='false'
											v-model='sixForm.cmdbcheck'
										>
											
										</el-checkbox>
									</el-form-item>
								</el-col>
							</el-row>
							<div class="text-center m-b20">
								<el-button @click="submitForm('sixForm')" type='primary' :disabled='btnDisabled' class='btn-lg'>提 交</el-button>
							</div>
						</el-form>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
		<el-dialog
			title='操作详细信息'
			:visible.sync="dialogVisible"
			width="50%"
		>
			<div>
				<el-input readonly type='textarea' :rows='20' v-model='operDetailMsg'></el-input>
			</div>

			<div class='text-right m-tb15'>
		    	<span slot="footer" class="dialog-footer">
		    	  	<el-button type="primary" @click="dialogVisible=false">关 闭</el-button>
		    	</span>
	    	</div>
		</el-dialog>
	</div>
</template>
<style lang='scss' scoped>
	
</style>

<script type="text/javascript">
	export default {
		data () {
			return {
				pickerOptions: {
					disabledDate(time) {
						let curDate = new Date();
						return time.getTime() <= new Date(curDate.getTime() - 24*60*60*1000).getTime()
					},
				},
				dialogVisible: false,
				operDetailMsg: '',
				labelWidth: '8rem',
				activeName: 'one',
				historyActiveName: 'exeRes',
				oneForm: {
					ipList: '',			//主机列表
					user: 'apps',			//用户
					startDate: '',			//开始日期
					forever: 'false',
					cmdbcheck: 'true',
				},

				twoForm: {
					exeResult: ''
				},
				operRecordTableData: [],
				operRecordAllTableData: [],
				operRecordTableHeadName: {
					iplist: '主机',
					task: '执行操作',
					bo: '状态',
					itime: '操作时间',
				},
				operRecordPageSize: 10,
				operRecordTotal: 10,
				operRecordCurrentPage: 1,

				threeForm: {
					password: '',
					splunk: 'false',
					cli: 'false',
					cli_content: '',
					cmdbcheck: 'true',
				},
				isShowCommand: false,
				fourForm: {
					ipList: '',
					cmdbcheck: 'true',
					textChange: 'false',
					contentPlaceholder: 'command...',
					filename: '',
					filenamePlaceholder: '如: /etc/resolv.conf',
					cli_content: '',
					radio: '',
				},
				isShowExits: false,
				isShowDelete: false,
				isShowReplace: false,
				isShowTextChange: false,


				fiveForm: {
					copyIpList: '',
					cmdbcheck: 'true',
				},
				sixForm: {
					hostList: '',
					cmdbcheck: 'true',
				},

				rules: {
					/*IP列表*/
					hostList: [{
						validator: function(rule, value, callback) {
							if (!value) {
								callback(new Error("请输入IP"));
							}else if (!app.validator.ipPassword(value)) {
								callback(new Error("请填写正确的IP格式"));
							} else {
								callback()
							}
						},
						trigger: 'change',
						required: true,
					}],
					ipList: [{
						required: true,
						validator: function(rule, value, callback) {
							if (!value) {
								callback(new Error("请输入IP"));
							} else if (!app.validator.ipList(value)) {
								callback(new Error("请填写正确的IP格式"));
							} else {
								callback()
							}
						},
						trigger: 'change'
					}],
					password: [{
						required: true,
						validator: function(rule, value, callback) {
							if (!value) {
								callback(new Error("请输入IP"));
							} else if (!app.validator.ipUserPwd(value)) {
								callback(new Error("格式错误请输入IP+英文分号+用户+分号+密码"));
							} else {
								callback()
							}
						},
						trigger: 'change'
					}],
					copyIpList: [{
						required: true,
						validator: function(rule, value, callback) {
							if (!value) {
								callback(new Error("请输入IP"));
							} else if (!app.validator.ipPwdOrIp(value)) {
								callback(new Error("请填写正确的IP格式"));
							} else {
								callback()
							}
						},
						trigger: 'change'
					}],
					user: [{
						required: true,
						message: '请输入用户',
						trigger: 'blur'
					}],
					startDate: [{
						required: true,
						message: '请选择借用期限',
						trigger: 'blur'
					}],
					filename: [{
						required: true,
						message: '请输入文件名称',
						trigger: 'blur'
					}],
					cli_content: [{
						validator: (rule, value, callback) => {
							if (this.isShowTextChange && !this.fourForm.cli_content) {
								callback(new Error("请输入内容"));
							} else {
								callback()
							}
						},
						required: true,
						trigger: 'blur'
					}],
				},
				btnDisabled: false,
			}
		},
		methods: {
			submitForm (formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.btnDisabled = true
						let formObj = this[this.activeName + 'Form']
						let iplist = formObj.ipList || formObj.copyIpList || formObj.hostList || formObj.password
						let url = ''
						let params = {
							iplist,
							bo_cmdb: formObj.cmdbcheck + '',
							mipuser: this.$store.state.username
						}
						switch (this.activeName) { 
							case 'one':
								url = '/auto/rootself';
								params.user = formObj.user;
								params.forever = formObj.forever + '';
								params.timer = formObj.startDate;
								break;
							case 'three':
								url = '/auto/cliself'
								params.cli = formObj.cli;
								params.splunk = formObj.splunk;
								params.cli_content = formObj.cli_content.replace(/\"/g,'');
								break;
							case 'four':
								url = '/auto/bulkfile';
								params.filename = formObj.filename
								params.cli_content = formObj.cli_content
								params.textchange = formObj.textChange
								break;
							case 'six':
								url = '/auto/oldbosinit';
								break;
						}
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
				//跳转到执行过结果页面
			},

			tabClick (tab) {
				if (tab.name === 'two') {
					let url = '/auto/allresult'
					app.post(url, {
						mipuser: this.$store.state.username
					}, res => {
						let code = res.data.code;
						this.operRecordAllTableData = []
						if (code === '100001') {
							this.twoForm.exeResult = res.data.data[0].info
							for (let i of res.data.data) {
								i.bo = i.bo === '0' ? '运行中' : i.bo === '2' ? '失败' : '成功'
								this.operRecordAllTableData.push(i)
							}
							this.operRecordTotal = this.operRecordAllTableData.length;
							//重新计算分页
							app.tools.changeTable(this, 'operRecord')
						}
					})
				}
			},

			error () {
				this.$alert('提交失败', {
					title: '提示',
					type: 'error'
				})
				this.btnDisabled = false
			},

			chooseTemplate (val) {
				let formObj = this[this.activeName + 'Form']
				formObj.textChange = 'true'
				this.isShowTextChange = true
				switch (val) {
					case '1': 		//Linux DNS 变更
						formObj.cli_content = formObj.contentPlaceholder = "domain  midea.com\nnameserver 10.18.0.100\nnameserver 10.16.11.106"
						formObj.filename = formObj.filenamePlaceholder = "/etc/resolv.conf"

						break;
					case '2':		//Linux 密码策略 变更
						formObj.cli_content = formObj.contentPlaceholder = "#\n# Please note that the parameters in this configuration file control the\n# behavior of the tools from the shadow-utils component. None of these\n# tools uses the PAM mechanism, and the utilities that use PAM (such as the\n# passwd command) should therefore be configured elsewhere. Refer to\n# /etc/pam.d/system-auth for more information.\n#\n\n# *REQUIRED*\n#   Directory where mailboxes reside, _or_ name of file, relative to the\n#   home directory.  If you _do_ define both, MAIL_DIR takes precedence.\n#   QMAIL_DIR is for Qmail\n#\n#QMAIL_DIR      Maildir\nMAIL_DIR        /var/spool/mail\n#MAIL_FILE      .mail\n\n# Password aging controls:\n#\n#       PASS_MAX_DAYS   Maximum number of days a password may be used.\n#       PASS_MIN_DAYS   Minimum number of days allowed between password changes.\n#       PASS_MIN_LEN    Minimum acceptable password length.\n#       PASS_WARN_AGE   Number of days warning given before a password expires.\n#\nPASS_MAX_DAYS    90\nPASS_MIN_DAYS    0\nPASS_MIN_LEN     8\nPASS_WARN_AGE   7\n\n#\n# Min/max values for automatic uid selection in useradd\n#\nUID_MIN                   500\nUID_MAX                 60000\n\n#\n# Min/max values for automatic gid selection in groupadd\n#\nGID_MIN                   500\nGID_MAX                 60000\n\n#\n# If defined, this command is run when removing a user.\n# It should remove any at/cron/print jobs etc. owned by\n# the user to be removed (passed as the first argument).\n#\n#USERDEL_CMD    /usr/sbin/userdel_local\n\n#\n# If useradd should create home directories for users by default\n# On RH systems, we do. This option is overridden with the -m flag on\n# useradd command line.\n#\nCREATE_HOME     yes\n\n# The permission mask is initialized to this value. If not specified, \n# the permission mask will be initialized to 022.\nUMASK           077\n\n# This enables userdel to remove user groups if no members exist.\n#\nUSERGROUPS_ENAB yes\n\n# Use SHA512 to encrypt password.\nENCRYPT_METHOD SHA512\n"
						formObj.filename = formObj.filenamePlaceholder = "/etc/login.defs"
						break;
					case '3': 		//Linux NTP 服务
						formObj.cli_content = formObj.contentPlaceholder = "tinker panic 0\nrestrict 127.0.0.1\nrestrict default kod nomodify notrap\nserver ntp.midea.com.cn iburst\ndriftfile /var/lib/ntp/drift"
						formObj.filename = formObj.filenamePlaceholder = "/etc/ntp.conf"
						break;
				}
			},

			viewDetail (row, index) {
				this.dialogVisible = true
				this.operDetailMsg = row.info
			},

			sizeChange (pageSize) {
				app.tools.sizeChange(this, pageSize, this.historyActiveName)
			},
			currentChange (currentPage) {
				app.tools.currentChange(this, currentPage, this.historyActiveName)
			},
		}
	}
</script>