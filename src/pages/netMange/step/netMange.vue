<template>
	<div class="box">
		<div class="net-mange">
			<div class="main-middle">
				<el-tabs v-model="activeName">
					<el-tab-pane label="批量增加IP" name="one">
						<el-form :model='oneForm' ref='oneForm' :label-width='labelWidth' :rules='rules'>
							<el-row>
								<el-col :md='9'>
									<el-form-item label="起止IP" prop='startIp'>
									    <el-input v-model="oneForm.startIp"  placeholder='请输入起点IP,例如：121.12.21.1'></el-input>
									</el-form-item>
								</el-col>

								<el-col :md='{span:9,offset:2}'>
									<el-form-item label="终止IP" prop='endIp'>
									    <el-input v-model="oneForm.endIp"  placeholder='请输入终点IP,例如：121.12.21.1'></el-input>
									</el-form-item>
								</el-col>
							</el-row>

							<el-row>
								<el-col :md='9'>
									<el-form-item label="网络类别" prop='netType'>
									    <el-select v-model="oneForm.netType" placeholder="请选择" @change='getRegion'
									    clearable filterable>
						                    <el-option v-for='(item,index) in oneNetTypeList' :label='item.label' :value='item.value' :key='index'></el-option>
									    </el-select>
									</el-form-item>
								</el-col>

								<el-col :md='{span:9,offset:2}'>
									<el-form-item label="所在区域" prop='region'>
									    <el-select v-model="oneForm.region" placeholder="请选择" @change='getCluster' clearable filterable>
						                    <el-option v-for='(item,index) in oneRegionList' :label='item.label' :value='item.value' :key='index'></el-option>
									    </el-select>
									</el-form-item>
								</el-col>
							</el-row>

							<el-row>

								<el-col :md='9'>
									<el-form-item label="所在集群" prop='colony'>
									    <el-select v-model="oneForm.colony" placeholder="请选择" @change='getNetwork' clearable filterable>
						                    <el-option v-for='(item,index) in oneColonyList' :label='item.label' :value='item.value' :key='index'></el-option>
									    </el-select>
									</el-form-item>
								</el-col>

								<el-col :md='{span:9,offset:2}'>
									<el-form-item label="所在网段" prop='network'>
									    <el-select v-model="oneForm.network" placeholder="请选择" clearable filterable>
						                    <el-option v-for='(item,index) in oneNetworkList' :label='item.label' :value='item.value' :key='index'></el-option>
									    </el-select>
									</el-form-item>
								</el-col>
							</el-row>

							<el-row>
								<el-col :md='9'>
									<el-form-item label="环境" prop='env'>
									    <el-select v-model="oneForm.env" placeholder="请选择" clearable filterable>
						                    <el-option v-for='(item,index) in oneEnvList' :label='item.label' :value='item.value' :key='index'></el-option>
									    </el-select>
									    <!--  v-show='item.isShow' -->
									</el-form-item>
								</el-col>
								<el-col :md='24'>
									<el-form-item>
										<el-checkbox label="全手工网段" v-model='oneForm.checkbox'></el-checkbox>
									</el-form-item>
								</el-col>
							</el-row>
							<div class="text-center m-tb15">
								<el-button @click="submitForm('oneForm')" class='btn-lg' :disabled='btnDisabled'>提 交</el-button>
							</div>
						</el-form>
					</el-tab-pane>

					<el-tab-pane label="批量增加手工IP" name="two">
						<el-form :model='twoForm' :label-width='labelWidth' ref='twoForm' :rules='rules'>
							<el-row>
								<el-col>
									<el-form-item label="IP列表" prop='hostList'>
									    <el-input
									      type="textarea"
									      :rows='5'
									      :placeholder="'请输入IP,如：\nIP1\nIP2'"
									      v-model="twoForm.hostList">
									    </el-input>
									</el-form-item>
								</el-col>

								<!-- <el-col>
									<el-form-item>
										<el-checkbox label="cmdb机器管理权限校验" v-model='twoForm.cmdbcheck'></el-checkbox>
									</el-form-item>
								</el-col> -->
						
							</el-row>
							<div class="text-center">
								<el-button @click="submitForm('twoForm')" type='primary' class='btn-lg'>提 交</el-button>
							</div>
						</el-form>
					</el-tab-pane>

					<el-tab-pane label="批量增加主机名" name="three">
						<el-form :model='threeForm' ref="threeForm" :label-width='labelWidth' :rules='rules'>
							<el-row>
								<el-col :md='9'>
									<el-form-item label="所在区域" prop='region'>
									    <el-select v-model="threeForm.region" placeholder="请选择" clearable filterable>
						                    <el-option label="顺德总部" value="s"></el-option>
						                    <el-option label="南海" value="m"></el-option>
									    </el-select>
									</el-form-item>
								</el-col>

								<el-col :md='{span:9,offset:2}'>
									<el-form-item label="机器类型" prop='machineType'>
									    <el-select v-model="threeForm.machineType" placeholder="请选择" clearable filterable>
						                    <el-option label="虚拟机" value="v"></el-option>
						                    <el-option label="物理机" value="0"></el-option>
									    </el-select>
									</el-form-item>
								</el-col>
							</el-row>

							<el-row>
								<el-col :md='9'>
									<el-form-item label="资源类型" prop='resourceType'>
									    <el-select v-model="threeForm.resourceType" placeholder="请选择" clearable filterable>
						                    <el-option label="x86" value="x"></el-option>
						                    <el-option label="小型机" value="0"></el-option>
									    </el-select>
									</el-form-item>
								</el-col>

								<el-col :md='{span:9,offset:2}'>
									<el-form-item label="操作系统" prop='os'>
									    <el-select v-model="threeForm.os" placeholder="请选择" clearable filterable>
						                    <el-option label="Linux" value="l"></el-option>
						                    <el-option label="Windows" value="w"></el-option>
									    </el-select>
									</el-form-item>
								</el-col>
							</el-row>

							<el-row>
								<el-col :md='9'>
									<el-form-item label="起始数字" prop='startNum'>
									    <el-input v-model.number='threeForm.startNum' placeholder='至少大于5000' min='5000'></el-input type='number'>
									</el-form-item>
								</el-col>

								<el-col :md='{span:9,offset:2}'>
									<el-form-item label="终止数字" prop='endNum'>
									    <el-input v-model.number='threeForm.endNum' placeholder='至少大于5000' min='5000'></el-input type='number'>
									</el-form-item>
								</el-col>
							</el-row>

							<div class="text-center m-tb15">
								<el-button @click="submitForm('threeForm')" size='small' type='primary' class='btn-lg'>提 交</el-button>
							</div>
						</el-form>
					</el-tab-pane>

					<el-tab-pane label="自动化IP概览" name="four">
						<v-table 
			    			:data='fourTableData' 
			    			:tableHeadName='fourTableHeadName'
			    			:showOperator='false'
			    			@tdClick='tdClick'
			    		></v-table>

			    		<div class="block pagination-wraper">
			    		   <el-pagination
			    		       v-if='fourTableData.length > 0'
			    		       @size-change='sizeChange'
			    		       @current-change='currentChange'
			    		     :page-sizes="[10, 15, 20, 25, 30, 35, 40, 45, 50]"
			    		     layout="total, sizes, prev, pager, next, jumper"
			    		     :page-size='fourPageSize'
			    		     :total="fourTotal">
			    		   </el-pagination>
			    		</div>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</div>
</template>
<style lang='scss'>
	.net-mange {
		.op_name,.op_group,.op_02 {
			cursor: pointer;
			color: #409EFF;
		}
	}
</style>

<script type="text/javascript">
	export default {
		data () {
			return {
				btnDisabled: false,
				labelWidth: '8rem',
				activeName: 'one',
				oneForm: {
					startIp: '',			//起止ip
					endIp: '',				//终止ip
					netType: '',			//网络类别
					region: '',				//所在区域
					colony: '',				//所在集群
					network: '',			//所在网段
					env: '',				//环境
					checkbox: false,
				},
				oneNetTypeList: [],
				oneRegionList: [],
				oneColonyList: [],
				oneNetworkList: [],
				oneEnvList: [],

				twoForm: {
					hostList: '',
					//cmdbcheck: true,
				},

				threeForm: {
					region: '',
					machineType: '',
					resourceType: '',
					os: '',
					startNum: '',
					endNum: '',
				},

				fourTableData: [],
				fourAllTableData: [],
				fourTableHeadName: {
					op_name: '网段',
					op_group: 'VLAN',
					op_04: '物理区域',
					op_05: '逻辑区域',
					op_01: '总IP数',
					op_02: '使用IP数',
					op_03: '使用率',
				},
				fourPageSize: 10,
				fourTotal: 1,
				fourCurrentPage: 1,

				rules: {
					/*IP列表*/
					hostList: [{
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
					/*起止ip*/
					startIp: [{
						required: true,
						validator: function(rule, value, callback) {
							if (!value) {
								callback(new Error("请输入起点IP"));
							} else if (!app.validator.ipCheck(value)) {
								callback(new Error("ip地址格式不正确"));
							} else {
								callback()
							}
						},
						trigger: 'change'
					}],
					endIp: [{
						required: true,
						validator: function(rule, value, callback) {
							if (!value) {
								callback(new Error("请输入终点IP"));
							} else if (!app.validator.ipCheck(value)) {
								callback(new Error("ip地址格式不正确"));
							} else {
								callback()
							}
						},
						trigger: 'change'
					}],
					/*网络类别*/
					netType: [{
						required: true,
						message: '请选择网络类别',
						trigger: 'change'
					}],
					/*所在集群*/
					colony: [{
						required: true,
						message: '请选择所在集群',
						trigger: 'change'
					}],
					/*所在网段*/
					network: [{
						required: true,
						message: '请选择所在网段',
						trigger: 'change'
					}],
					/*环境*/
					env: [{
						required: true,
						message: '请选择环境',
						trigger: 'change'
					}],
					/*所在区域*/
					region: [{
						required: true,
						message: '请选择所在区域',
						trigger: 'change'
					}],
					machineType: [{
						required: true,
						message: '请选择机器类型',
						trigger: 'change'
					}],
					resourceType: [{
						required: true,
						message: '请选择资源类型',
						trigger: 'change'
					}],
					os: [{
						required: true,
						message: '请选择操作系统',
						trigger: 'change'
					}],
					startNum: [
						{
							required: true,
							message: '请输入起始数字',
							trigger: 'blur'
						},{
							type: 'number',
							message: '不得低于5000',
							min: 5000
						},{
							pattern: /^\d+$/,
							message: '只能输入数字',
						}
					],
					endNum: [
						{
							required: true,
							message: '请输入终止数字',
							trigger: 'blur'
						},
						{
							pattern: /^\d+$/,
							message: '只能输入数字',
						},
						{
							type: 'number',
							message: '不得低于5000',
							min: 5000
						},
					],

				},

			}
		},
		methods: {
			/*根据网络类别获取所在区域内容*/
			getRegion (dept) {
				let formObj = this[this.activeName + 'Form']
				//所在区域/所在集群/所在网段/环境清空
				formObj.region = ''
				formObj.env = ''
				formObj.colony = ''
				formObj.network = ''
				this[this.activeName + 'RegionList'] = []
				this[this.activeName + 'ColonyList'] = []
				this[this.activeName + 'NetworkList'] = []
				this[this.activeName + 'EnvList'] = []
				dept && app.post('/auto/getcenter', {
					dept
				}, res => {
					for( let i of res.data.data) {
						i.label = i.op_name;
						i.value = i.id + ''
						this[this.activeName + 'RegionList'].push(i)
					}
				})
				dept && this.getEnv(dept)
			},
			/*获取环境*/
			getEnv (dept) {
				app.post('/auto/getnetseg', {
					dept,
					mipuser: this.$store.state.username
				}, res => {
					for (let i of res.data.data) {
						i.label = i.op_name;
						i.value= i.id + '';
						this[this.activeName + 'EnvList'].push(i)
					}
					
				})
			},
			/*根据所选区域获取集群内容*/
			getCluster (id_center) {
				let formObj = this[this.activeName + 'Form']
				//清除所在集群和所在网段的内容
				formObj.colony = ''
				formObj.network = ''
				this[this.activeName + 'ColonyList'] = []
				this[this.activeName + 'NetworkList'] = []
				id_center && app.post('/auto/getcluster', {
					id_center,
					mipuser: this.$store.state.username
				}, res => {
					for (let i of res.data.data) {
						i.label = i.cl_name;
						i.value= i.id + '';
						this[this.activeName + 'ColonyList'].push(i)
					}
					
				})
			},

			/*根据所在集群获取所在网段内容*/
			getNetwork (id_cl) {
				let formObj = this[this.activeName + 'Form']
				//清除所在网段的内容
				formObj.network = ''
				this[this.activeName + 'NetworkList'] = []
				id_cl && app.post('/auto/getvcnet', {
					id_cl,
					mipuser: this.$store.state.username
				}, res => {
					for (let i of res.data.data) {
						let index = i.net_name.indexOf('(')
						i.label = i.net_name.substring(0, index != -1 ? index : i.net_name.length);
						i.value = i.id + '';
						this[this.activeName + 'NetworkList'].push(i)
					}
				})
			},
			/*获取网络类别*/
			getNetType () {
				app.post('/auto/getstgprd', {}, res => {
					for (let i of res.data.data) {
						i.label = i.op_name;
						i.value = i.id + '';
						this[this.activeName + 'NetTypeList'].push(i)
					}
				})
			},
			/*页面每页显示数变化时重新分页*/
			sizeChange(pageSize) {
			  app.tools.sizeChange(this, pageSize)
			},
			/*当前页码变化时重新分页*/
			currentChange(currentPage) {
			  app.tools.currentChange(this, currentPage)
			},
			/*表单数据校验*/
			validatorForm () {

			},
			tdClick ({row, index, column, tableIndex}) {
				let url = ''
				let params = null
				switch (column.label) {
					case '网段':
						app.go({path: 'IPList', params: {ipaddress: row.op_name}})
						break;
					case 'VLAN':
						app.go({path: 'netVlanList', params: {ipaddress: row.op_name}})
						break;
					case '使用IP数':
						app.go({path: 'netVlanList', params: {ipaddress: row.op_name}})
						break;
				}
			},
			onSubmit () {},

			submitForm (formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.btnDisabled = true
						let formObj = this[this.activeName + 'Form']
						let url = ''
						let params = null
						switch (this.activeName) {
							case 'one':
								url = '/auto/ipadd';
								params = {
									ip_start: formObj.startIp,
									ip_end: formObj.endIp,
									stgprd: formObj.netType,
									vc_center: formObj.region,
									vc_cluster: formObj.colony,
									vc_net: formObj.network,
									net: formObj.env,
									manual: formObj.checkbox + '',
									mipuser: this.$store.state.username,
								};
								break;
							case 'two':
								url = '/auto/manipadd';
								params = {
									iplist: formObj.hostList,
									mipuser: this.$store.state.username,
								}
								break;
							case 'three':
								url = '/auto/hostnameadd'
								params = {
									area: formObj.region,
									machine: formObj.machineType,
									ostype: formObj.os,
									x86type: formObj.resourceType,
									num_start: formObj.startNum,
									num_end: formObj.endNum,
									mipuser: this.$store.state.username,
								}
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
			},
			error () {
				this.$alert('提交失败', {
					title: '提示',
					type: 'error'
				})
				this.btnDisabled = false
			},
			getAutoView () {
				app.post('/auto/getnetview', {
					mipuser: this.$store.state.username,
				}, res => {
					for (let i of res.data.data) {
						this.fourAllTableData.push(i)
					}
					this.fourTotal = this.fourAllTableData.length;
					app.tools.changeTable(this, 'four')
				})
			},
		},
		created () {
			/*获取网络类别*/
			this.getNetType()
			/*获取自动化概览数据*/
			this.getAutoView();
		}

	}
</script>