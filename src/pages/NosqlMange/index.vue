<template>
	<div class="box">
		<div class="content-box nosql-mange">
			<div class='main-middle'>
				<el-tabs v-model="activeName">
					<el-tab-pane label="Redis安装" name="one">
						<div>
							<p class="my-remark m-b10"><span>提示：请分别选择部门，应用等；redis-4.0.8仅支持centos 7（默认只有生产环境安装zabbix并注册监控）</span></p>
							<el-form rel='form' :label-width="$store.state.labelWidth" :style='{"padding-right": $store.state.labelWidth}'>
								<el-row>
									<el-col :md='12' class='required'>
										<el-form-item label="部门">
										    <el-select v-model="oneForm.dept" placeholder="请选择" clearable filterable
												@change='selectDept("one")'
										    >
					         					<el-option v-for='(item,index) in oneDeptList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='12' class='required'>
									  <el-form-item label="环境">
									      <el-select v-model="oneForm.envType" placeholder="请选择" @change='getAppList' clearable filterable>
									          <el-option v-for='(item,index) in oneEnvTypeList' :label='item.label' :value='item.value' :key='index'></el-option>
									      </el-select>
									  </el-form-item>
									</el-col>

									<el-col :md='12' class='required'>
										<el-form-item label="应用">
										    <el-select v-model="oneForm.region" placeholder="请选择" clearable filterable>
		                 						<el-option v-for='(item,index) in oneRegionList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='12' class='required'>
										<el-form-item label="集群架构">
										    <el-select v-model="oneForm.cluster" placeholder="请选择" @change='showIpInput'>
		                 						<el-option value="0" label='选择集群架构'></el-option>
		                 						<el-option value="1" label='单节点'></el-option>
		                 						<el-option value="2" label='一主一从'></el-option>
		                 						<el-option value="3" label='三节点哨兵高可用架构'></el-option>
		                 						<el-option value="4" label='三节点coids分布式架构'></el-option>
		                 						<el-option value="5" label='redis-cluster架构'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
									<el-col :md='12' class='required'>
										<el-form-item label="版本">
										    <el-select v-model="oneForm.version" placeholder="请选择" :disabled='oneFormVersionDisabled'>
		                 						<el-option value="0" label='选择版本'></el-option>
		                 						<el-option value="3" label='4.0.8'></el-option>
		                 						<el-option value="1" label='4.0.1'></el-option>
		                 						<el-option value="2" label='3.2.4'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='24' class='required'>
										<el-form-item label="集群描述">
										    <el-input v-model="oneForm.clusterDesc" placeholder='请输入'></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :md='12' class='required'>
										<el-form-item label="IP1:">
										    <el-input v-model="oneForm.IP1" placeholder='192.168.30...'></el-input>
										</el-form-item>
									</el-col>
								</el-row>

								<el-row>
									<el-col :md='12' v-if='isShowIp2' class='required'>
										<el-form-item label="IP2:">
										    <el-input v-model="oneForm.IP2" placeholder='192.168.30...'></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :md='12' v-if='isShowIp3' class='required'>
										<el-form-item label="IP3:">
										    <el-input v-model="oneForm.IP3" placeholder='192.168.30...'></el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</el-form>
							<div class='btn-group-lg'>
							    <el-button type="primary" @click="onSubmit('exe')" :disabled='btnDisabled'>执 行</el-button>
							    <el-button @click="resetForm('oneForm')">重 置</el-button>
							</div>
						</div>

						<div class="empty"></div>
						
						<div>
							<el-form rel='form' :model='one1Form' :label-width="$store.state.labelWidth" :style='{"padding-right": $store.state.labelWidth}'>
								<el-row>
									<el-col>
										<p class='title m-b20'>Redis实例列表清单</p>
									</el-col>
									<el-col :md='12'>
										<el-form-item label="部门">
										    <el-select v-model="one1Form.dept" placeholder="请选择" clearable filterable
												@change='selectDept("one1")'
										    >
					         					<el-option v-for='(item,index) in one1DeptList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
									<el-col :md='12'>
										<el-form-item label="环境">
										    <el-select v-model="one1Form.envType" placeholder="请选择" @change='getAppList(true)' clearable filterable>
										        <el-option v-for='(item,index) in one1EnvTypeList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='12'>
										<el-form-item label="应用">
											<el-select v-model="one1Form.region" placeholder="请选择" clearable filterable>
												<el-option v-for='(item,index) in one1RegionList' :key='index' :label='item.label' :value='item.value'></el-option>
											</el-select>
										</el-form-item>
									</el-col>

									<el-col :md='12'>
										<el-form-item label="主机名(模糊查询)">
											<el-input
											  placeholder="请输入主机名"
											  v-model="one1Form.host">
											</el-input>
										</el-form-item>
									</el-col>

									<el-col :md='12'>
										<el-form-item label="IP(模糊查询)">
										    <el-input v-model="one1Form.IPPort" placeholder='请输入IP'></el-input>
										</el-form-item>
									</el-col>

									<el-col :md='12'>
										<el-form-item label="Role(模糊查询)">
											<el-input v-model="one1Form.role"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</el-form>
							<div class='btn-group-lg'>
							    <el-button type="primary" @click="onSubmit('query')" :disabled='btnDisabled'>查 询</el-button>
					    		<el-button @click="resetForm('one1Form')">重 置</el-button>
							</div>
							<v-table 
							   :data='oneTableData' 
							   :tableHeadName='oneTableHeadName'
							   :isShowComments='true'
							   :showTips='showTips'
							   @openRemarkDialog='view'
							   class='redis-table my-table'
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
						</div>
					</el-tab-pane>

					<el-tab-pane label="Mongodb安装" name="three">
						<div>
							<p class="my-remark m-b10"><span>提示：请分别选择部门，应用等（默认只有生产环境安装zabbix并注册监控）</span></p>
							<el-form rel='form' :model='threeForm' :label-width="$store.state.labelWidth" :style='{"padding-right": $store.state.labelWidth}'>
								<el-row>
									<el-col :md='12' class='required'>
										<el-form-item label="部门">
										    <el-select v-model="threeForm.dept" placeholder="请选择" clearable filterable
												@change='selectDept("three")'
										    >
					         					<el-option v-for='(item,index) in threeDeptList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='12' class='required'>
									  <el-form-item label="环境">
									      <el-select v-model="threeForm.envType" placeholder="请选择" @change='getAppList' clearable filterable>
									          <el-option v-for='(item,index) in threeEnvTypeList' :label='item.label' :value='item.value' :key='index'></el-option>
									      </el-select>
									  </el-form-item>
									</el-col>

									<el-col :md='12' class='required'>
										<el-form-item label="应用">
										    <el-select v-model="threeForm.region" placeholder="请选择" clearable filterable>
		                 						<el-option v-for='(item,index) in threeRegionList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='12' class='required'>
										<el-form-item label="集群架构">
										    <el-select v-model="threeForm.cluster" placeholder="请选择" @change='showIpInput'>
		                 						<el-option value="0" label='选择集群架构'></el-option>
		                 						<el-option value="1" label='单节点'></el-option>
		                 						<el-option value="2" label='一主两从架构'></el-option>
		                 						<el-option value="3" label='三节点Sharding架构'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
									<el-col :md='12' class='required'>
										<el-form-item label="版本">
										    <el-select v-model="threeForm.version" placeholder="请选择">
		                 						<el-option value="0" label='选择版本'></el-option>
		                 						<el-option value="1" label='3.4.2'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='24' class='required'>
										<el-form-item label="集群描述">
										    <el-input v-model="threeForm.clusterDesc" placeholder='请输入'></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :md='12' class='required'>
										<el-form-item label="IP1:">
										    <el-input v-model="threeForm.IP1" placeholder='192.168.30...'></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :md='12' v-if='isShowIp2' class='required'>
										<el-form-item label="IP2:">
										    <el-input v-model="threeForm.IP2" placeholder='192.168.30...'></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :md='12' v-if='isShowIp3' class='required'>
										<el-form-item label="IP3:">
										    <el-input v-model="threeForm.IP3" placeholder='192.168.30...'></el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</el-form>
							<div class='btn-group-lg'>
							    <el-button type="primary" @click="onSubmit('exe')" :disabled='btnDisabled'>执 行</el-button>
							    <el-button @click="resetForm('threeForm')">重 置</el-button>
							</div>
						</div>

						<div class="empty"></div>
							
						<div>
							<el-form rel='form' :model='three1Form' :label-width="$store.state.labelWidth" :style='{"padding-right": $store.state.labelWidth}'>
								<el-row>
									<el-col>
										<p class='title m-b20'>Mongodb实例列表清单</p>
									</el-col>
									<el-col :md='12'>
										<el-form-item label="部门">
										    <el-select v-model="three1Form.dept" placeholder="请选择" clearable filterable @change='selectDept("three1")'>
					         					<el-option v-for='(item,index) in three1DeptList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
									<el-col :md='12'>
										<el-form-item label="环境">
										    <el-select v-model="three1Form.envType" placeholder="请选择" @change='getAppList(true)' clearable filterable>
										        <el-option v-for='(item,index) in three1EnvTypeList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='12'>
										<el-form-item label="应用">
											<el-select v-model="three1Form.region" placeholder="请选择">
												<el-option v-for='(item,index) in three1RegionList' :key='index' :label='item.label' :value='item.value'></el-option>
											</el-select>
										</el-form-item>
									</el-col>

									<el-col :md='12'>
										<el-form-item label="主机名(模糊查询)">
											<el-input
											  placeholder="请输入主机名"
											  v-model="three1Form.host">
											</el-input>
										</el-form-item>
									</el-col>

									<el-col :md='12'>
										<el-form-item label="IP(模糊查询)">
										    <el-input v-model="three1Form.IPPort" placeholder='请输入IP'></el-input>
										</el-form-item>
									</el-col>

									

									<el-col :md='12'>
										<el-form-item label="Role(模糊查询)">
											<el-input v-model="three1Form.role"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</el-form>
							<div class='btn-group-lg'>
							    <el-button type="primary" @click="onSubmit('query')" :disabled='btnDisabled'>查 询</el-button>
					    		<el-button @click="resetForm('three1Form')">重 置</el-button>
							</div>
							<v-table 
							   :data='threeTableData' 
							   :tableHeadName='threeTableHeadName'
							   :isShowComments='true'
							   :showTips='showTips'
							   @openRemarkDialog='view'
							   class='redis-table my-table'
							></v-table>

							<div class="block pagination-wraper">
							   <el-pagination
							       v-if='threeTableData.length > 0'
							       @size-change='sizeChange'
							       @current-change='currentChange'
							     :page-sizes="[10, 15, 20, 25, 30, 35, 40, 45, 50]"
							     layout="total, sizes, prev, pager, next, jumper"
							     :page-size='threePageSize'
							     :total="threeTotal">
							   </el-pagination>
							</div>
						</div>
						
					</el-tab-pane>

					<el-tab-pane label="Influxdb安装" name="four">
						<div>
							<el-form rel='form' :model='fourForm' :label-width="$store.state.labelWidth" :style='{"padding-right": $store.state.labelWidth}'>
								<el-row>
									<el-col :md='12' class='required'>
										<el-form-item label="部门">
										    <el-select v-model="fourForm.dept" placeholder="请选择" clearable filterable
												@change='selectDept("four")'
										    >
					         					<el-option v-for='(item,index) in fourDeptList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='12' class='required'>
									  <el-form-item label="环境">
									      <el-select v-model="fourForm.envType" placeholder="请选择" @change='getAppList' clearable filterable>
									          <el-option v-for='(item,index) in fourEnvTypeList' :label='item.label' :value='item.value' :key='index'></el-option>
									      </el-select>
									  </el-form-item>
									</el-col>

									<el-col :md='12' class='required'>
										<el-form-item label="应用">
										    <el-select v-model="fourForm.region" placeholder="请选择" clearable filterable>
		                 						<el-option v-for='(item,index) in fourRegionList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>


									<el-col :md='24' class='required'>
										<el-form-item label="集群描述">
										    <el-input v-model="fourForm.clusterDesc" placeholder='请输入'></el-input>
										</el-form-item>
									</el-col>

									<el-col :md='12' class='required'>
										<el-form-item label="IP:">
										    <el-input v-model="fourForm.IP" placeholder='192.168.30...'></el-input>
										</el-form-item>
									</el-col>

								</el-row>
							</el-form>
							<div class='btn-group-lg'>
							    <el-button type="primary" @click="onSubmit('exe')" :disabled='btnDisabled'>执 行</el-button>
							    <el-button @click="resetForm('fourForm')">重 置</el-button>
							</div>
						</div>
						
					</el-tab-pane>

				</el-tabs>

			</div>

			<el-dialog
			   title="安装详情"
			  :visible.sync="dialogVisibile"
			  width="50%"
			  @close='dialogVisibile=false'
			  >
				<ul class='clearfix'>
					<li v-for='(value,key) in oneTableHeadName' :key='key' :class='key'>
						<span>{{value}}:</span><span>{{rowData[key]}}</span>
					</li>
				</ul>
				<div class='text-right'>
				   <el-button type="primary" @click='dialogVisibile=false'>关 闭</el-button>
				</div>

			</el-dialog>

		</div>
	</div>

</template>
<style lang='scss'>
@import '../../css/variable';
.nosql-mange {
	.main-middle {
		padding: 0;
	}
	.el-tabs__header,.my-table, .my-remark, .title{
		padding: 0 $baseSize*2;
	}
	.redis-table {
		 .cell {
	      .group_dns, .role{
	        span {
	          display:block;
	          width:100%;
	          white-space: nowrap;
	          overflow: hidden;
	          text-overflow: ellipsis
	        }
	      }
	    }
	}
}
	.nosql-mange .el-dialog {
		li {
			float: left;
			padding-left: 0;
			width: 50%;
			line-height: 30px;
			span:first-child {
				width: 25%;
				display: inline-block;
				text-align: right;
				padding-right: 5%;
				vertical-align: top;
			}
			span:last-child {
				display: inline-block;
				width: 70%
			}
		}
		.group_dns {
			width: 100%;
			span:first-child {
				width: 12.5%;
				padding-right: 2.5%;
			}
		} 
	}
</style>
<script type="text/javascript">
	export default {
		data () {
			return {
				labelWidth: '140px',
				dialogVisibile: false,
				rowData: {},		//每行数据
				btnDisabled: false,	//提交按钮是否禁用
				activeName: 'one',
				oneFormVersionDisabled: false,	//版本下拉框是否禁用
				isShowIp2: true,			//是否显示iP2输入框
				isShowIp3: true,			//是否显示iP3输入框
				onePageSize: 10,				//table表单每页显示数		
		 		oneCurrentPage: 1,			//table表单当前页码	
				oneTotal: 10,				//table表单总页数
				twoPageSize: 10,				//请table表单每页显示数		
		 		twoCurrentPage: 1,			//table表单当前页码	
				twoTotal: 10,				//table表单总页数
				oneTableData: [],			//table数据		
				oneAllTableData: [],
				oneTableHeadName: {			//table表头名
					id: 'ID',
					ip: "IP",
					hostname: "Hostname",
					port: 'Port',
					dep_name: "部门",
					role: "Role",
					group_dns: "域名",
					app_type: "环境",
					app_administrator: '应用管理员',
					DBA: '系统管理员',
					create_time: "创建时间",
				},
				oneForm: {
					version: '0',
					dept: '',				//部门
					envType: '',			//环境
					region: '',				//应用
					cluster: '0',			//集群架构
					clusterDesc: '',		//集群架构描述
					IP1: '',
					IP2: '',
					IP3: '',
				},
				one1Form: {
					dept: '',
					envType: '',
					region: '',			//应用
					IPPort: '',				//IP端口
					role: '',				//role
					host: '',				//主机名

				},
				one1EnvTypeList: [],
				one1DeptList: [],
				one1RegionList: [],
				oneEnvTypeList: [],
				oneDeptList: [],
				oneRegionList: [],

				threePageSize: 10,				//table表单每页显示数		
		 		threeCurrentPage: 1,			//table表单当前页码	
				threeTotal: 10,				//table表单总页数
				threeTableData: [],			//table数据
				threeAllTableData: [],
				threeTableHeadName: {			//table表头名
					id: 'ID',
					ip: "IP",
					hostname: "Hostname",
					port: 'Port',
					dep_name: "部门",
					role: "Role",
					group_dns: "域名",
					app_type: "环境",
					app_administrator: '应用管理员',
					DBA: '系统管理员',
					create_time: "创建时间",
				},
				showTips: {
					role: true,
					group_dns: true,
				},
				threeForm: {
					version: '0',
					dept: '',				//部门
					envType: '',			//环境
					region: '',				//应用
					cluster: '0',			//集群架构
					clusterDesc: '',		//集群架构描述
					IP1: '',
					IP2: '',
					IP3: '',
				},
				three1Form: {
					dept: '',
					envType: '',
					region: '',			//应用
					IPPort: '',				//IP端口
					role: '',				//role
					host: '',				//主机名

				},
				three1EnvTypeList: [],
				three1DeptList: [],
				three1RegionList: [],
				threeEnvTypeList: [],
				threeDeptList: [],
				threeRegionList: [],


				fourForm: {
					dept: '',				//部门
					envType: '',			//环境
					region: '',				//应用
					clusterDesc: '',		//集群架构描述
					IP: '',
				},
				
				fourEnvTypeList: [],
				fourDeptList: [],
				fourRegionList: [],

				twoTableData: [],			//table数据
				twoTableHeadName: {			//table表头名
					index: '序号',
					operatorTime: '操作时间',
					sourceIp: '源IP',
					sourceDb: '源DB',
					sourcePort: '源端口',
					targetIp: '目的IP',
					targetPort: '目的端口',
					operator: '操作人',
					status: '审核中',
				},	
				
				twoForm: {
					sourceIp: '',			//源IP,
					sourcePort: '',			//源端口
					sourceDb: '',			//源db
					keyword: '',			//关键字
					targetIp: '',			//目的ip
					targetPort: '',			//目的端口
					targetDb: '',			//目的db名
				}
			}
		},
		methods: {
			view (row) {
				this.rowData = row;
				this.dialogVisibile = true;

			},
			/*选择部门*/
			selectDept (formName) {
				/*环境/应用/清空*/
				
				this[formName + 'Form'].envType = ''
				this[formName+ 'Form'].region = ''
				this[formName + 'RegionList'] = []
			},
			sizeChange (pageSize) {
				app.tools.sizeChange(this, pageSize)
			},
			currentChange (currentPage) {
				app.tools.currentChange(this, currentPage)
			},
			exeSuccess (response) {
				let formObj = this[this.activeName + 'Form']
				formObj.IP1 = formObj.IP2 = formObj.IP3 = formObj.IP = ''
				this.btnDisabled = false
				if (response.data.code != '505') {
					this.$alert(response.data.msg, {title: '提示',type: 'info'})
				}
			},
			querySuccess (response) {
				let type = this.activeName === 'one' ? 'redis' :
						  this.activeName === 'three' ? 'mongodb' : ''
				let res = response.data.data[type + '_instance_query']
				//清空table数据
				this[this.activeName + 'AllTableData'] = []
				//将请求到的数据加入table中
				for (let i of res) {
					this[this.activeName + 'AllTableData'].push(i)
				}
				this[this.activeName + 'Total'] = this[this.activeName + 'AllTableData'].length;
				app.tools.changeTable(this)

				this.btnDisabled = false
			},
			twoSubmitSuccess (response) {
				//将接口返回的数据加入table列表中
				for (let i of response.data.log_list2) {
					this.twoTableData.unshift({
						index: '1',
						operatorTime: '',
						sourceIp: i.source_ip,
						sourceDb: i.source_db,
						sourcePort: i.source_port,
						targetIp: i.target_ip,
						targetDb: i.target_db,
						targetPort: i.target_port,
						operator: i.op_user,
					})
				}
				this.btnDisabled = false
			},
			error () {
				this.$alert('查询失败', {
					title: '提示',
					type: 'info'
				})
				this.btnDisabled = false
			},

			validatorForm (type) {
				let msg = '',
					msg2 = '',
					msg3 = '';
				let formObj = type === 'exe' ? this[this.activeName + 'Form'] : type === 'query' ? this[this.activeName + '1Form'] : ''
				if (this.activeName === 'four') {
					if (!formObj.dept) {
						msg = '请选择部门'
					} else if (!formObj.envType) {
						msg = '请选择环境'
					} else if (!formObj.region) {
						msg = '请选择应用'
					} else if (!formObj.clusterDesc) {
						msg = '请输入集群描述'
					} else if (!formObj.IP) {
						msg = '请输入IP！'
					} else if (formObj.IP) {
						msg = app.validator.ipValidate(formObj.IP.trim())
					}
				} else if (type === 'exe') {
					if (!formObj.dept) {
						msg = '请选择部门'
					} else if (!formObj.envType) {
						msg = '请选择环境'
					} else if (!formObj.region) {
						msg = '请选择应用'
					} else if (formObj.cluster === '0' || !formObj.cluster) {
						msg = '请选择集群架构'
					} else if (formObj.version === '0' || !formObj.version) {
						msg = '请选择版本类型'
					} else if (!formObj.clusterDesc) {
						msg = '请输入集群描述'
					} else if (!formObj.IP1) {
						msg = '请输入IP1！'
					} else if (this.activeName === 'one' && formObj.cluster <= 2 || (this.activeName === 'three' && formObj.cluster == 1)) {
						msg = app.validator.ipValidate(formObj.IP1.trim())
						return msg ? msg : formObj.cluster === '1' ? '' 
										 : !formObj.IP2 ? '请输入IP2！' 
										 : formObj.IP2 === formObj.IP1 ? 'IP不能相同'
										 : app.validator.ipValidate(formObj.IP2.trim())
					} else if (this.activeName === 'one' && formObj.cluster >= 3 || (this.activeName === 'three' && formObj.cluster >= 2)) {
						if (!formObj.IP3) {
							msg = '请输入IP3！'
						} else {
							if (!formObj.IP2) {
								msg = '请输入IP2！'
							} else {
								msg = app.validator.ipValidate(formObj.IP1.trim())
								msg2 = app.validator.ipValidate(formObj.IP2.trim())
								msg3 = app.validator.ipValidate(formObj.IP3.trim())
								return msg ? msg : msg2 ? msg2 : msg3 ? msg3 : (formObj.IP1 === formObj.IP2 || formObj.IP1 === formObj.IP3 || formObj.IP2 === formObj.IP3) ? 'IP不能相同' : ''
							}
						}
						
					}	
				} else if (type === 'query') {
					if (!formObj.dept && !formObj.envType && !formObj.region && !formObj.IPPort && !formObj.role && !formObj.host) {
						msg = '请输入查询条件后，再点击查询按钮!!'
					}
				}
				
				return msg
			},

			onSubmit (type) {
				let url = '', params = {};
				let msg = this.validatorForm(type)
				let formObj = type === 'exe' ? this[this.activeName + 'Form'] : 
							  type === 'query' ? this[this.activeName + '1Form'] : ''
				let successFn = null;
				let str = this.activeName === 'one' ? 'redis' :
						  this.activeName === 'three' ? 'mongodb' : 
						  this.activeName === 'four' ? 'influxdb' : ''
				if (msg) {
					this.$alert(msg, {title: '提示',type: 'info'})
					return;
				}
				if (type === 'exe') {
					url = '/Gaea_database/' + str + 'WebInstall'
					params = {
						deptId: formObj.dept,
						appId: formObj.region,
						cluster_archi: formObj.cluster,
						[str + '_version']: formObj.version,
						role_desc: formObj.clusterDesc,
						IP1: formObj.IP1.trim(),
						IP2: formObj.IP2.trim(),
						IP3: formObj.IP3.trim(),
						userMip: this.$store.state.username,
					}
					if (str === 'influxdb') {
						params = {
							deptId: formObj.dept,
							appId: formObj.region,
							role_desc: formObj.clusterDesc,
							IP: formObj.IP.trim(),
							userMip: this.$store.state.username
						}
					}
				} else if (type === 'query') {
					url = '/Gaea_database/' + str + 'InstanceQuery'
					params = {
						deptId: formObj.dept || 0,
						envId: formObj.envType || 0,
						appId: formObj.region || 0,
						role_query: formObj.role,
						ipport_query: formObj.IPPort.trim(),
						hostName: formObj.host
					}
				}
				//请求接口并禁用按钮
				if (type === 'exe') {
					this.$confirm('确认执行？', {
						title: '提示',
						type: 'warning',
						callback: (action, instance) => {
							if (action === 'confirm') {
								this.btnDisabled = true
								app.post(url, params, this[type + 'Success'], this.error)
							}
						}
					})
				} else {
					this.btnDisabled = true
					app.post(url, params, this[type + 'Success'], this.error)
				}
				
			},

			showIpInput (val) {
				let formObj = this[this.activeName + 'Form']
				formObj.IP1 = formObj.IP2 = formObj.IP3 ='';
				this.isShowIp2 = true;
				this.isShowIp3 = true;
				this[this.activeName + 'FormVersionDisabled'] = false;
				formObj.version = '0'
				if (val == 1) {
					this.isShowIp2 = false;
					this.isShowIp3 = false;
				} else if (val == 2) {
					if (this.activeName === 'one') {
						this.isShowIp3 = false;
					}
				} else if (val == 4) {
					this[this.activeName + 'FormVersionDisabled'] = true;
					formObj.version = '3'
				}
			},
			/*获取应用下拉框内容*/
			getAppList (flag) {
				let formObj = this[flag === true ? this.activeName + '1Form' : this.activeName + 'Form']
				let deptId = formObj.dept
				let envId = formObj.envType
				//应用/主机清空
				formObj.region = ''
				this[flag === true ? this.activeName + '1RegionList' : this.activeName + 'RegionList'] = []
				deptId && envId && app.post('/Gaea_database/getApp', {
				  deptId,
				  envId,
				  appType: 0,
				  userMip: this.$store.state.username
				}, response => {
				  for (let i of response.data.data.appList) {
				    i.label = i.appName
				    i.value = i.appId
				    this[flag === true ? this.activeName + '1RegionList' : this.activeName + 'RegionList'].push(i)
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
			      this.one1EnvTypeList.push(i)
			      this.threeEnvTypeList.push(i)
			      this.three1EnvTypeList.push(i)
			      this.fourEnvTypeList.push(i)
			    }
			  })
			},
			
			
			resetForm (formName) {
				app.tools.resetFormData(this[formName])
			},
			/*获取部门下拉框数据*/
			getDeptList () {
			  app.post('/Gaea_database/getDept', {
			    userMip: this.$store.state.username
			  }, res => {
			    for (let i of res.data.data.deptList) {
			      i.label = i.deptName;
			      i.value = i.deptId;
			      this.oneDeptList.push(i)
			      this.one1DeptList.push(i)
			      this.threeDeptList.push(i)
			      this.three1DeptList.push(i)
			      this.fourDeptList.push(i)
			    }
			  })
			},

			getRedisInstanceList () {
				app.post('/Gaea_database/redisInstanceList', {

				}, response => {
					let res = response.data.data.redis_instance_list
					//清空table数据
					this.oneAllTableData = []
					//将请求到的数据加入table中
					for (let i of res) {
						this.oneAllTableData.push(i)
					}
					this.oneTotal = this.oneAllTableData.length;
					app.tools.changeTable(this, 'one')
				})
			},

			getMongodbInstanceList () {
				app.post('/Gaea_database/mongodbInstanceList', {

				}, response => {
					let res = response.data.data.mongodb_instance_list
					//清空table数据
					this.threeAllTableData = []
					//将请求到的数据加入table中
					for (let i of res) {
						this.threeAllTableData.push(i)
					}
					this.threeTotal = this.threeAllTableData.length;
					app.tools.changeTable(this, 'three')
				})
			},

		},

		created () {
			/*获取部门下拉框选项内容*/
			this.getDeptList();
			//获取环境下拉列表数据
			this.getEnvList();

			//获取Redis实例列表清单显示
			this.getRedisInstanceList()

			//获取Redis实例列表清单显示
			this.getMongodbInstanceList()
		}
	}
</script>