<template>
    <div class='box'>
    	<div class="set-mange">
    		<div class='main-middle'>
    			<el-tabs v-model="activeName">
    				<el-tab-pane label="部门应用查询" name="one">
		    			<div class="compenent-form">
				    		<el-form :modal='oneForm' :label-width='labelWidth'>
								<el-row>
									<el-col :md='9' class='required'>
										<el-form-item label="部门">
										    <el-select 
											    v-model="oneForm.dept" 
											    @change='selectDept("oneForm")' 
											    placeholder="请选择" 
											    clearable 
											    filterable
										    >
				         						<el-option v-for='(item,index) in deptList' :key='index' :label='item.label' :value='item.value'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='{span:9,offset:2}' class='required'>
										<el-form-item label="环境" clearable filterable>
										    <el-select v-model="oneForm.envType" placeholder="请选择" @change='getAppList' clearable filterable>
							                    <el-option v-for='(item,index) in envTypeList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='9' class='required'>
										<el-form-item label="应用">
										    <el-select v-model="oneForm.application" placeholder="请选择" clearable filterable>
							                   <el-option v-for='(item,index) in applicationList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
								</el-row>
								<div class='btn-group-lg'>
								    <el-button type="primary" @click="onSubmit" :loading='loading' :disabled='queryBtnDisabled'>查 询</el-button>
								    <el-button @click="resetForm">重 置</el-button>
								</div>
				    		</el-form>
			    		</div>
			    	</el-tab-pane>
    				<el-tab-pane label="IP查询" name="two">
		    			<div class="compenent-form">
				    		<el-form :modal='twoForm' :label-width='labelWidth'>
								<el-row>
									<el-col :md='9' class='required'>
										<el-form-item label="集群类型">
										    <el-select placeholder="请选择" v-model="twoForm.setsType">
				         						<el-option label='Mysql' value='mysql'></el-option>
				         						<el-option label='Redis' value='redis'></el-option>
				         						<el-option label='Mongodb' value='mongodb'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
									<el-col :md='{span:9,offset:2}' class='required'>
										<el-form-item label="IP:">
										    <el-input v-model="twoForm.ip" placeholder='请输入IP'></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<div class='btn-group-lg'>
								    <el-button type="primary" @click="onSubmit" :loading='loading' :disabled='queryBtnDisabled'>查 询</el-button>
								    <el-button @click="resetForm">重 置</el-button>
								</div>
				    		</el-form>
			    		</div>
			    	</el-tab-pane>
		    	</el-tabs>
		    	<div class="empty"></div>
	    		<el-tabs v-model="childActiveName">
					<el-tab-pane label="Mysql集群管理" name="one">
						
						<div v-for='(item,index) in mysqlClusterList'>
							<div class="compenent-form">
								<p class='title m-b10'>集群名称：{{item.mysql_cluster_name}}</p>
								<v-table 
									@editRow='editRow'
									:data='item.dnsTableData' 
									:tableHeadName='item.dnsTableHeadName'
									:isShowComments='true'
									:index='index'
									:operatorTexts='operatorTexts'
									:width='width'
								></v-table>

								<v-table 
									:data='item.mysql_cluster_detail' 
									:tableHeadName='item.tableHeadName'
									:showOperator='false'
									:index='index'
									@tdClick='tdClick'
								></v-table>
								<div class='text-center m-t20 m-b20'>
									<el-button type="primary" @click="openAddNodeDialog(item.mysql_cluster_id)" class='btn-lg'>新增节点</el-button>
									<el-button @click='transfer(item.mysql_cluster_id,index)' class='btn-lg'>切换主从</el-button>
									<el-button @click='clusterOffline(item.mysql_cluster_id,item.mysql_cluster_name)' :disabled='queryBtnDisabled' class='btn-lg'>集群下线</el-button>
								</div>
							</div>
							<div class="empty"></div>
						</div>
					</el-tab-pane>

					<el-tab-pane label="Redis集群管理" name="two">
						<div v-for='(item,index) in redisClusterList'>
							<div class="compenent-form">
								<p class='title'>集群名称：{{item.redis_cluster_name}}</p>
								<v-table 
									@editRow='editRow'
									:index='index'
									:data='item.dnsTableData' 
									:tableHeadName='item.dnsTableHeadName'
									:isShowComments='true'
									:operatorTexts='redisOperatorTexts'
									:width='width'
								></v-table>

								<v-table 
									:data='item.redis_cluster_detail' 
									:tableHeadName='item.tableHeadName'
									:showOperator='false'
									:index='index'
									@tdClick='tdClick'
								></v-table>
								<div class='text-center m-t20 m-b20'>
									<el-button @click='openChangePwdDialog(item.redis_cluster_id)' class='btn-lg'>修改密码</el-button>
									<el-button @click='clusterOffline(item.redis_cluster_id,item.redis_cluster_name)' :disabled='queryBtnDisabled' class='btn-lg'>集群下线</el-button>
								</div>
							</div>
							<div class="empty"></div>
						</div>
					</el-tab-pane>

					<el-tab-pane label="Mongodb集群管理" name="three">
						<div v-for='(item,index) in mongodbClusterList'>
							<div class="compenent-form">
								<p class='title'>集群名称：{{item.mongodb_cluster_name}}</p>
								<v-table 
									@editRow='editRow'
									:data='item.dnsTableData' 
									:tableHeadName='item.dnsTableHeadName'
									:showOperator='false'
									:index='index'
								></v-table>

								<v-table 
									:data='item.mongodb_cluster_detail' 
									:tableHeadName='item.tableHeadName'
									:showOperator='false'
									:index='index'
									@tdClick='tdClick'
								></v-table>
								<div class='text-center m-t20 m-b20'>
									<el-button @click='clusterOffline(item.mongodb_cluster_id,item.mongodb_cluster_name)' :disabled='queryBtnDisabled' class='btn-lg'>集群下线</el-button>
								</div>
							</div>
							<div class="empty"></div>
						</div>
					</el-tab-pane>
	    		</el-tabs>
    		</div>
    	</div>
    	<el-dialog
    	  :title="dialogTitle"
    	  :visible.sync="secondDialogVisible"
    	  width="50%"
    	  class='my-dialog'
    	  @close='closeDialog("secondDialogVisible")'
    	>
			<el-form label-width='85px'>
				<el-form-item label='新增节点IP'>
				    <el-input
				      placeholder="请输入新增节点IP,不同IP之间用';'分隔，格式如下，如1.1.1.1;1.1.1.2"
				      type='textarea'
				      :rows='5'
				      v-model="ip">
				    </el-input>
				</el-form-item>

				<el-form-item label='数据导出源'>
				    <el-select v-model="exportSource" placeholder="请选择">
 						<el-option v-for='(item,index) in exportSourceList' :key='index' :label='item.label' :value='item.value'></el-option>
				    </el-select>
				</el-form-item>
			</el-form>
			<div class='flex' v-if='isShowBar'><p>执行进度</p><el-progress :percentage="percentage" :show-text='false'></el-progress></div>
			<div v-if='exeResult === "failure"'>
				<p class='my-remark'><span>执行失败！</span></p>
			</div>

			<div v-else-if='exeResult === "success"'>
			   <p class='success'><span>执行成功!</span></p>
			</div>

			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="addNode" :disabled='queryBtnDisabled'>确 定</el-button>
	    	    <el-button type="primary" @click="closeDialog('secondDialogVisible')">取 消</el-button>
	    	</span>
   		</el-dialog>

   		<el-dialog
    	  title="请输入新redis密码:"
    	  :visible.sync="changPwdDialogVisible"
    	  width="50%"
    	  @close='newPwd=""'
    	>
			<el-input
			  placeholder="请输入新密码"
			  v-model="newPwd">
			</el-input>

			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="changePwd" :disabled='queryBtnDisabled'>确 定</el-button>
	    	    <el-button type="primary" @click="cancelPwd">取 消</el-button>
	    	</span>
			
    	</el-dialog>

    	<el-dialog
    	  :title="title"
    	  :visible.sync="dialogVisible"
    	  width="50%"
    	  class='my-dialog'
    	  @close='closeDialog("dialogVisible")'
    	>
			<div v-if='title==="注销读写域名"'>
				<el-transfer 
					v-model="loginOutValue" 
					:data="logoutReadWriteDNS"
					:titles="['所有域名', '注销的域名']">
				</el-transfer>
				<div class='m-tb15'>
					<el-checkbox v-model="allCheck">注销整个节点</el-checkbox>
				</div>
				<div class='text-right m-tb15'>
					<el-button type="primary" @click="logoutDns" :disabled='queryBtnDisabled'>注销域名</el-button>
		    	    <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
		    	</div>
			</div>
			<div v-if='title==="新增只读域名"'>
				<el-transfer 
					v-model="addDnsValue" 
					:data="addDNS"
					:titles="['集群所有IP', '新增域名IP']">
				</el-transfer>

				<div>
					<p class='m-tb15'>读域名</p>
					<el-input
					  placeholder="请输入读域名，如：3306-R-MIP-PRD-MIP401-MYC9.service.dcnh.consul（南海）"
					  v-model="consul_dns">
					</el-input>
				</div>
				<div class='text-right m-tb15'>
					<el-button type="primary" @click="addDns" :disabled='queryBtnDisabled'>新增域名</el-button>
		    	    <el-button type="primary" @click='closeDialog("dialogVisible")'>关 闭</el-button>
		    	</div>
			</div>
			<div v-if='title==="变更域名"'>
				<p class="my-remark">域名请按照域名规范：端口-域名服务类型-应用标识-数据库类型简称</p>
				<el-form label-width='100px'>
					<el-row>
						<el-col :md='12'>	
							<el-form-item label='原域名'>
							</el-form-item>
						</el-col>
						<el-col :md='12'>	
							<el-form-item label='新域名'>
							</el-form-item>	
						</el-col>
						<el-col :md='12' class='m-b20 border-b'>
							<el-form-item label='读写域名'>
							    <el-input
							      placeholder="请输入域名"
							      v-model="readWriteDns" disabled>
							    </el-input>
							</el-form-item>
						</el-col>
						<el-col :md='12' class='m-b20 border-b'>
							<el-form-item>
							    <el-input
							      placeholder="请输入域名"
							      v-model="refReadWriteDns">
							    </el-input>
							</el-form-item>
						</el-col>

						<el-col :md='12'>
							<el-form-item label='读域名1'>
							    <el-input
							      placeholder="请输入域名"
							      v-model="firstReadDns" disabled>
							    </el-input>
							</el-form-item>
						</el-col>

						<el-col :md='12'>
							<el-form-item>
							    <el-input
							      placeholder="请输入域名"
							      v-model="refFirstReadDns">
							    </el-input>
							</el-form-item>
						</el-col>

						<el-col :md='12'>
							<el-form-item label='读域名2'>
							    <el-input
							      placeholder="请输入域名"
							      v-model="secondReadDns" disabled>
							    </el-input>
							</el-form-item>
						</el-col>

						<el-col :md='12'>
							<el-form-item>
							    <el-input
							      placeholder="请输入内容"
							      v-model="refSecondReadDns" :disabled='refSecondDisabled'>
							    </el-input>
							</el-form-item>
						</el-col>
						
					</el-row>
				</el-form>

				<div class='text-right m-tb15'>
					<el-button type="primary" @click="changeDns" :disabled='queryBtnDisabled'>变更域名</el-button>
		    	    <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
		    	</div>
				
			</div>
    	</el-dialog>
    </div>
</template>
<style lang='scss'>
.set-mange {
	.main-middle {
		padding: 0;
	}
	.el-tabs__header,.compenent-form,{
		padding: 0 20px;
	}
}
.box {
	.my-dialog {
		 .el-input--suffix .el-input__inner,.el-input__inner {
		 	width: 100%;
		 }
	}
	.zabbix_status span {
		cursor: pointer;
	}
	.my-dialog {
		.el-select {
			width: 100%;
		}
		.flex {
		  p {
		    line-height: 60px;
		    width: 100px;
		    text-align: right;
		    padding-right: 12px;
		    box-sizing: border-box;
		  }
		  .el-progress {
		    flex: 8;
		    margin-top: 27px;
		  }
		}
		.el-transfer-panel {
			width: 40%;
		}
	}
}
.status-disabled {
	color: #FC8DA3
}
.status-enabled {
	color: #40BB5D
}
</style>

<script type="text/javascript">
	export default {
		data () {
			return {
				activeName: 'one',
				tableIndex: 0,
				index: 0,
				loading: false,
				labelWidth: '10rem',
				width: '300px',
				allCheck: false,
				percentage: 0,
				exeResult: '',
				title: '',
				ip: '',
				exportSourceList: [],
				exportSource: '',
				dialogTitle: '',
				consul_dns: '',
				loginOutValue: [],
				addDnsValue: [],
				logoutReadWriteDNS: [],
				addDNS: [],
				readWriteDns: '',
				refReadWriteDns: '',
				firstReadDns: '',
				refFirstReadDns: '',
				secondReadDns: '',
				refSecondReadDns: '',
				operatorTexts: ['注销读写域名', '新增只读域名', '变更域名'],
				redisOperatorTexts: ['注销读写域名', '变更域名', ''],
				mysqlClusterList: [],
				mongodbClusterList: [],
				redisClusterList: [],
				queryBtnDisabled: false,
				childActiveName: 'one',
				oneForm: {
					dept: '',
					envType: '',
					application: '',
				},
				twoForm: {
					setsType: 'mysql',
					ip: '',
				},
				twoFormInitData: {
					setsType: 'mysql',
				},
				deptList: [],
				envTypeList: [],
				applicationList: [],
				mysqlDNSTableData: [],
				mysqlDetailTableHeadName: {},
				dialogVisible: false,
				secondDialogVisible: false,
				changPwdDialogVisible: false,
				newPwd: '',
				cluster_name: '',
				cluster_id: '',
				cluster_type: '',
				op_type: '',
				refSecondDisabled: false,
				chooseEnvId: '',
				timer: null,
				isShowBar: false
			}
		},
		methods: {
			tdClick ({row,index,column,tableIndex}) {
				let status = row.zabbix_status
				let flag = status === 'Disabled' ? true : false
				let type = this.childActiveName === 'one' ? 'mysql' : this.childActiveName === 'two' ? 'redis' : 'mongodb'
				let tips = flag ? "Enabled" : "Disabled"
				let className = flag ? 'status-enabled' :'status-disabled'
				if (column.label === "zabbix_status") {
					if (status === 'None') {
						this.$alert('未挂载Zabbix监控!', {
							title: '提示',
							type: 'info'
						})
					} else {
						this.$confirm('<div>确认将该节点状态切换为' + '"' +'<span class=' + className +'>' + tips + '?</span>' + '"' + '</div>', {
							title: '提示',
							type: 'warning',
							dangerouslyUseHTMLString: true,
							callback: (action, instance) => {
								if (action === 'confirm') {
									app.post('/Gaea_database/zabbixStatus', {
										envId: this.chooseEnvId,
										op_type: flag ? '1' : '0',
										hostName: row.hostname
									}, res => {
										let code = res.data.code
										//开启关闭成功										
										if ( code === 'Gaea10057' || code === 'Gaea20057') {
											//this[type + 'ClusterList'][tableIndex][type + '_cluster_detail'][index].zabbix_status = flag ? "Enabled" : 'Disabled'
											for (let i of this[type + 'ClusterList'][tableIndex][type + '_cluster_detail']) {
												if (i.ip === row.ip) {
													i.zabbix_status = flag ? "Enabled" : 'Disabled'
												}
											}
										}
										if (code != '505') {
											this.$alert(res.data.msg, {
												title: '提示',
												type: 'info'
											})
										}
									})
								}
							}
						})
					}
				}
			},
			/*切换主从*/
			transfer (cluster_id, index) {
				let arr = this.mysqlClusterList[index].mysql_cluster_detail
				let ipPort = ''
				for (let i of arr) {
					if (i.is_master == 0) {		//找到第一个中断循环
						ipPort = i.ip + ':10001'
						break
					}
				}
				if (ipPort) {
					window.open('http://' + ipPort, 'newWindow')
				} else {
					this.$alert('无可切换的从ip', {
						title: '提示',
						type: 'info'
					})
				}
			},
			error () {
				this.$alert('查询失败', {
					title: '提示',
					type: 'info'
				})
				this.queryBtnDisabled = false
				this.loading = false
			},
			changePwd () {
				this.$alert('成功提交新密码,执行结果请查看邮件~', {
					title: '提示',
					type: 'info'
				})
				this.changPwdDialogVisible = false
				app.post('/Gaea_database/redisChangePwd', {
					redis_cluster_id: this.cluster_id,
					new_pwd: this.newPwd,
					userMip: this.$store.state.username
				}, res => {
					
				}, this.error, false)
			},
			cancelPwd () {
				this.newPwd = '';
				this.changPwdDialogVisible = false;
				this.$alert('您没有修改密码!', {
					title: '提示',
					type: 'info'
				})
			},
			//弹出修改密码框
			openChangePwdDialog (cluster_id) {
				this.cluster_id = cluster_id
				this.changPwdDialogVisible = true;
			},
			//集群下线
			clusterOffline (cluster_id, cluster_name) {
				let msg = ''
				if (this.childActiveName === 'one') {
					msg = 'mysql'
				} else if (this.childActiveName === 'two') {
					msg = 'redis'
				} else {
					msg = 'mongodb'
				}
				this.$confirm('<div><p class="bold-550">确定将集群 <span class="bold-normal enabled-color">' + cluster_name + '下线(删除)</span></p><span class="confirm-style">注:下线后，集群数据将从数据库中删除</span></div>', {
					title: '提示',
					type: 'warning',
					dangerouslyUseHTMLString: true,
					callback: (action, instance) => {
						if (action === 'confirm') {
							this.queryBtnDisabled = true
							app.post('/Gaea_database/' + msg + 'ClusterOffline', {
								[msg + '_cluster_id']: cluster_id,
								userMip: this.$store.state.username,
							}, res => {
								this.queryBtnDisabled = false
								this.$alert(res.data.msg, {
									title: '提示',
									type: 'info'
								});
							}, this.error, true, '集群正在下线~')
						}
					}
				})
			},
			//添加节点
			addNode () {
				let exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])((;\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]))?$/; 
				
				if (!exp.test(this.ip)) {
					this.$alert("请输入正确IP格式且最多只能输入2个IP地址，谢谢,", {
						title: '提示',
						type: 'info'
					})
					return
				} else if (!this.exportSource) {
					this.$alert("请选择备份数据来源，谢谢", {
						title: '提示',
						type: 'info'
					})
					return
				}
				this.queryBtnDisabled = true
				//进度条百分比恢复初始化，避免第一次调用到一半失败再次调用时显示第一次失败的进度值,现将失败成功提示隐藏
				this.percentage = 0;
				this.exeResult = ''
				app.post('/Gaea_database/mysqlAddNode', {
					cluster_id: this.cluster_id,
					ip_list: this.ip.replace(/;/g,'_'),
					sources_ip_id: this.exportSource,
					userMip: this.$store.state.username
				}, res => {
					this.$alert(res.data.msg, {
						title: '提示',
						type: 'info'
					})
					this.queryBtnDisabled = false
					if (res.data.code === 'Gaea10024') { //成功之后调用进度条接口
						this.ip = ''
						this.exeResult = 'success'
						/*this.isShowBar = true;
						this.timer = window.setInterval( () => {
							this.showBar(res.data.data.node_id)
						}, 800)*/
					} else {
						this.exeResult = 'failure'
					}
					
				}, this.error)
			},
			showBar (node_id) {
				app.post('/Gaea_database/showProcessBar', {
					node_id,
				}, res => {
					let code = res.data.code
					this.percentage = res.data.data.iprogress_bar
					if (code === 'Gaea10031') {			//请求接口成功
						if (res.data.data.iprogress_bar >= 100) {
							//安装节点进度完成，则将输入框ip清空，避免用户再次安装
							clearInterval(this.timer)
							this.ip = ''
							this.exeResult = 'success'
						}
					} else {
						clearInterval(this.timer)
						this.isShowBar = false;
						this.exeResult = 'failure'
					}
					
					this.queryBtnDisabled = false
				}, this.error)
			},
			//打开添加节点对话框
			openAddNodeDialog (cluster_id) {
				this.dialogTitle = '新增集群节点'
				this.cluster_id = cluster_id
				this.secondDialogVisible = true
				this.queryBtnDisabled = true
				this.exportSourceList = []
				app.post('/Gaea_database/consulManage', {
					cluster_id,
					cluster_type: 'mysql',
					op_type: 'add'
				}, response => {
					for (let i of response.data.data.cluster_ip_id) {
						this.exportSourceList.push({
							label: i.ip + '(' + (i.is_master === 'master' ? '主' : '从') + ')',
							value: i.tag_id
						})
					}
					this.queryBtnDisabled = false
				}, this.error)
			},
			/*注销域名*/
			logoutDns () {
				//先获取右边要注销的域名
				//先遍历挪到右边的数组
				let newArr = []
				for (let i of this.loginOutValue) {
					newArr.push(this.logoutReadWriteDNS[i].id)
				}
				let dns_list_redis = newArr.join('&')
				let left_dns_count = this.logoutReadWriteDNS.length - this.loginOutValue.length;
				let isChecked = this.allCheck;
				if (!isChecked && !dns_list_redis) {
					this.$alert('请填写要注销的域名！', {
						title: '提示',
						type: 'info'
					})
					return
				} else {
					this.$confirm("确认注销" + this.cluster_type +" consul域名？", {
						title: '提示',
						type: 'warning',
						callback: (action, instance) => {
							if (action === 'confirm') {
								this.queryBtnDisabled = true
								app.post('/Gaea_database/deleteConsulDns', {
									cluster_id: this.cluster_id + '',
									dns_delete: dns_list_redis,
									is_checked: isChecked ? '1' : '0',
									dns_count: left_dns_count + '',
									cluster_type: this.cluster_type,
									userMip: this.$store.state.username
								}, res => {
									let code = res.data.code
									this.queryBtnDisabled = false
									//注销成功后,右边注销的域名清空
									if ( code === 'Gaea10028' || code === 'Gaea20028') { //Gaea10028代表Mysql注销成功,Gaea20028代表redis 注销域名成功
										this.dialogVisible = false
									}
									this.$alert(res.data.msg, {
										title: '提示',
										type: 'info'
									});
								}, this.error, true, '正在注销域名~')
							}
						}

					})
				}
			},
			//添加域名
			addDns () {
				//先获取右边要注销的域名
				//先遍历挪到右边的数组
				let type = this.childActiveName === 'one' ? 'mysql' : this.childActiveName === 'two' ? 'redis' : 'mongodb'
				let newArr = []
				for (let i of this.addDnsValue) {
					newArr.push(this.addDNS[i].ip)
				}
				let ip_list_redis = newArr.join('_')
				let left_ip_count = this.addDNS.length - this.addDnsValue.length;
				let isChecked = this.allCheck;
				let vm = this;
				if (!ip_list_redis) {
					this.$alert('请填写IP！', {
						title: '提示',
						type: 'info'
					})
					return
				}
				if (!this.consul_dns) {
					this.$alert('请填写域名！', {
						title: '提示',
						type: 'info'
					})
					return
				}
				this.$confirm("确定新增Mysql域名？", {
					title: '提示',
					type: 'warning',
					callback: (action, instance) => {
						if (action === 'confirm') {
							this.queryBtnDisabled = true
							app.post('/Gaea_database/addConsulDns', {
								cluster_id: this.cluster_id,
								tag_ip_add: ip_list_redis,
								add_read_dns: this.consul_dns,
								ip_count: left_ip_count,
								cluster_type: this.cluster_type,
								cluster_name: this.cluster_name,
								userMip: this.$store.state.username
							}, res => {
								let code = res.data.code
								let obj = this[type + 'ClusterList'][this.tableIndex]
								let len = Object.keys(obj.dnsTableHeadName).length
								this.$alert(res.data.msg, {
									title: '提示',
									type: 'info'
								})
								if (code === 'Gaea10029') {				//添加域名成功
									this.dialogVisible = false;
									if (len === 1) {
										obj.dnsTableHeadName = {
											dns0: '读写域名',
											dns1: '读域名'
										}
									} else {
										for (let j = 0; j <= len; j++) { 
											obj.dnsTableHeadName['dns' + j] = j === 0 ? '读写域名' : '读域名' + j
										}
									}
									obj.dnsTableHeadName = Object.assign({}, obj.dnsTableHeadName)
									obj.dnsTableData[this.index]['dns' + len] = this.consul_dns
									obj.dnsTableData[this.index] = Object.assign({}, obj.dnsTableData[this.index])
								}
								this.queryBtnDisabled = false
							}, this.error, true, '正在新增Mysql域名~')
						}
					}
				})
			},
			//变更域名
			changeDns () {
				let type = this.childActiveName === 'one' ? 'mysql' : this.childActiveName === 'two' ? 'redis' : 'mongodb'
				if (!this.refReadWriteDns) {
					this.$alert('请填写读写域名！', {
						title: '提示',
						type: 'info'
					})
					return
				} else if (!this.refFirstReadDns) {
					this.$alert('请填写读域名1！', {
						title: '提示',
						type: 'info'
					})
					return
				} else if (!this.refSecondDisabled && !this.refSecondReadDns) {
					this.$alert('请填写读域名2！', {
						title: '提示',
						type: 'info'
					})
					return
				}
				this.$confirm("确认变更" + this.cluster_type + " consul域名？", {
					title: '提示',
					type: 'warning',
					callback: (action, instance) => {
						if (action === 'confirm') {
							this.queryBtnDisabled = true
							app.post('/Gaea_database/changeConsulDns', {
								cluster_id: this.cluster_id,
								cluster_type: this.cluster_type,
								new_w_dns: this.refReadWriteDns,
								new_r_dns_1: this.refFirstReadDns,
								new_r_dns_2: this.refSecondReadDns,
								old_w_dns: this.readWriteDns,
								old_r_dns_1: this.firstReadDns,
								old_r_dns_2: this.secondReadDns,
								userMip: this.$store.state.username
							}, res => {
								let code = res.data.code
								let obj = this[type + 'ClusterList'][this.tableIndex].dnsTableData[this.index]
								if (code === 'Gaea10030') {		//变更成功
									this.dialogVisible = false
									obj.dns0 = this.refReadWriteDns
									this.refFirstReadDns && (obj.dns1 = this.refFirstReadDns)
									this.refSecondReadDns && (obj.dns2 = this.refSecondReadDns)
									this.refReadWriteDns = ''
									this.refFirstReadDns = ''
									this.refSecondReadDns = ''
								}
								this.queryBtnDisabled = false
								this.$alert(res.data.msg, {
									title: '提示',
									type: 'info'
								});
							}, this.error, true, '正在变更域名~')
						}
					}

				})

			},
			changeDnsShow (response) {
				let res = response.data.data.consul_old_domain_name;
				for (let item of res) {
					this.readWriteDns = item.old_w_dns;
					this.firstReadDns = item.old_r_dns;
					this.secondReadDns = item.old_r2_dns;
					if (!this.secondReadDns || this.secondReadDns === 'None') {
						this.refSecondDisabled = true
					}
				}
			},
			/*显示对话框要添加域名*/
			addDnsShow (response) {
				let res = response.data.data.cluster_ip_id;
				this.addDNS = []
				for (let i = 0; i < res.length; i++) {
					this.addDNS.push({
						key: i,
						label: res[i].ip + '(' + (res[i].is_master === 'master' ? '主' : '从') + ')',
						id: res[i].tag_id,
						ip: res[i].ip
					})
				}
			},
			//关闭对话框需将数据清空
			closeDialog (dialogName) {
				this[dialogName] = false;
				this.ip = ''
				this.exportSource = ''
				this.percentage = 0
				this.exeResult = ''
				this.allCheck = false
				this.loginOutValue = []
				this.logoutReadWriteDNS = [],

				this.addDnsValue = []
				this.addDNS = []
				this.consul_dns = ''

				this.refReadWriteDns = ''
				this.refFirstReadDns = ''
				this.refSecondReadDns = ''
				
			},
			editRow ({row, title, $index, tableIndex}) {
				this.tableIndex = tableIndex;
				this.index = $index
				/*根据点击的按钮不同切换对话框的标题文字*/
				this.title = title
				this.cluster_type = this.childActiveName === 'one' ? 'mysql' : this.childActiveName === 'two' ? 'redis' : 'mongodb'
				this.cluster_id = row[this.cluster_type + '_cluster_id'];
				this.cluster_name = row[this.cluster_type + '_cluster_name']
				this.op_type = title === '注销读写域名' ? 'delete' : title === '新增只读域名' ? 'add' : 'change'
				let url = '/Gaea_database/consulManage',
					params = {
						cluster_type: this.cluster_type,
						cluster_id: this.cluster_id,
						op_type: this.op_type
					}
				app.post(url, params,this[this.op_type + 'DnsShow'])
				this.dialogVisible = true
				
			},
			/*显示对话框要删除域名*/
			deleteDnsShow (response) {
				let res = response.data.data.consul_domain_id_name;
				this.logoutReadWriteDNS = []
				for (let i = 0; i < res.length; i++) {
					this.logoutReadWriteDNS.push({
						key: i,
						label: res[i].domain_name,
						id: res[i].domain_id,
					})
				}
			},
			resetForm (form) {
				app.tools.resetFormData(this[this.activeName + 'Form'], this[this.activeName + 'FormInitData'])
			},

			/*获取部门下拉框数据*/
			getDeptList () {
				app.post('/Gaea_database/getDept', {
					userMip: this.$store.state.username
				}, res => {
					for (let i of res.data.data.deptList) {
						i.label = i.deptName;
						i.value = i.deptId;
						this.deptList.push(i)
					}
				})
			},
			validatorForm () {
				let formObj = this[this.activeName + 'Form']
				let msg = ''
				switch (this.activeName) {
					case 'one':
						if (!formObj.dept) {
							msg = '请选择部门'
						} else if (!formObj.envType) {
							msg = '请选择环境'
						} else if (!formObj.application) {
							msg = '请选择应用'
						}
						return msg
					case 'two':
						return !formObj.ip ? '请输入Ip' : app.validator.ipValidate(formObj.ip.trim())
				}		
			},
			onSubmit () {
				//检验form
				let res = this.validatorForm()
				let url = ''
				let params = {}
				let formObj = this[this.activeName + 'Form']
				let cluster_type = formObj.setsType === 'mysql' ? 1 : formObj.setsType === 'redis' ? 2 : formObj.setsType === 'mongodb' ? 3: ''
				if (res) {
					this.$alert(res, {
						title: '提示',
						type: 'info'
					})
					return
				}
				switch (this.activeName) {
					case 'one':
						url = '/Gaea_database/dbClusterManageQuery';
						params = {
							deptId: formObj.dept,
							envId: formObj.envType,
							appId: formObj.application
						}
						//table数据清空
						this.mysqlClusterList = [];
						this.redisClusterList = [];
						this.mongodbClusterList = [];
						break;
					case 'two':
						url = '/Gaea_database/dbClusterManageQueryIp';
						params = {
							cluster_type, 
							IP: formObj.ip
						};
						break;
				}
				//按钮禁用
				this.queryBtnDisabled = true
				this.loading = true
				app.post(url, params, this[this.activeName + 'Query'], this.error)
			},
			twoQuery (response) {
				let formObj = this[this.activeName + 'Form']
				//根据筛选类型对应的table清空
				this[formObj.setsType + 'ClusterList'] = []
				this.childActiveName = formObj.setsType === "mysql" ? 'one' : formObj.setsType === "redis" ? 'two' : formObj.setsType === "mongodb" ? 'three' : ''
				this.querySuccess(response)
			},
			oneQuery (response) {
				this.querySuccess(response)
			},
			querySuccess (response) {
				let code = response.data.code
				this.queryBtnDisabled = false
				this.loading = false
				if (code === 'Gaea10022' || code === 'Gaea10068') {			//接口返回成功,记录选择的环境id
					for (let key in response.data.data) {
						for (let i of response.data.data[key]) {
							let keyName = key.substring(0, key.lastIndexOf('_'))
							let dnsArr = i[keyName + '_dns'];
							let obj = {
								[keyName + '_id']: i[keyName + '_id'],
								[keyName + '_name']: i[keyName + '_name'],
							}
							//将mysql集群table表单详情头部弄出来
							i.tableHeadName = {
								ip: '节点IP',
								port: '端口',
								hostname: '主机名',
								is_master: '主从关系',
								zabbix_status: 'zabbix_status',
							}
							if (key === 'mongodb_cluster_list') {
								i.tableHeadName = {
									ip: '节点IP',
									port: '端口',
									hostname: '主机名',
									zabbix_status: 'zabbix_status',
								}
							};
							i.dnsTableData = []
							i.dnsTableHeadName = {
								dns0: '读写域名',
								dns1: '读域名1',
								dns2: '读域名2',
							}
							//将mysql集群table读写域名头部弄出来
							for (let j = 0; j < dnsArr.length; j++) {
								obj['dns' + j] = dnsArr[j]
								if (keyName === 'mongodb_cluster') {
									i.dnsTableHeadName['dns' + j] = '域名' + (j + 1)
								} else {
									if (dnsArr.length === 1) {
										i.dnsTableHeadName = {
											dns0: '域名'
										}
									} else if (dnsArr.length === 2) {
										i.dnsTableHeadName = {
											dns0: '读写域名',
											dns1: '读域名'
										}
									} else {
										i.dnsTableHeadName['dns' + j] = j === 0 ? '读写域名' : '读域名' + j
									}
								}
								
							}
							dnsArr.length > 0 && i.dnsTableData.push(obj)
						}
					}
					this.mysqlClusterList = response.data.data.mysql_cluster_list
					this.mongodbClusterList = response.data.data.mongodb_cluster_list
					this.redisClusterList = response.data.data.redis_cluster_list
					if (this.activeName === 'one') {
						this.chooseEnvId = this.oneForm.envType + ''
					}
				} else if (code != '505') {
					this.$alert(response.data.msg, {
						title: '提示',
						type: 'info'
					})
				}
			},
			//获取环境列表数据
			getEnvList () {
				//环境数据清空
				app.post('/Gaea_database/getEnv', {
					
				}, response => {
					for (let i of response.data.data.envList) {
						i.label = i.envName;
						i.value= i.envId;
						this.envTypeList.push(i)
					}
				})
			},
			/*选择部门*/
			selectDept (formName) {
				/*环境*/
				this[formName].envType = ''

				//应用
				this[formName].application = ''
				this.applicationList = []
			},
			//获取应用列表数据
			getAppList (val) {
				//应用
				let formObj = this[this.activeName + 'Form']
				formObj.application = ''
				this.applicationList = []
				formObj.dept && app.post('/Gaea_database/getApp', {
					deptId: formObj.dept,
					appType: 0,
                    envId: val,
                    userMip: this.$store.state.username
				}, response => {
					for (let i of response.data.data.appList) {
						i.label = i.appName
						i.value = i.appId
						this.applicationList.push(i)
					}
				})
			},
		},
		created () {
			/*获取部门下拉框选项内容*/
			this.getDeptList();
			//获取环境下拉列表数据
			this.getEnvList();
		},
		destroyed () {
			//组件销毁，清除timer
			clearInterval(this.timer)
		},
	}
</script>