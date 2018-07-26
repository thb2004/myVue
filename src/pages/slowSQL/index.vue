<template>
    <div class='box'>
    	<div class="slow-sql">
    		<div class='main-middle'>
	    		<el-tabs 
	    			v-model="activeName"
	    		>
					<el-tab-pane label="慢SQL日志查询" name="one">
						<div class="compenent-form">
							<el-form rel='form' :model='oneForm' :label-width='labelWidth'>
								<el-row :gutter='16'>
									<el-col :md='9'>
										<el-form-item label="服务器查询方式">
										    <el-select v-model="oneForm.serverQueryMethod" placeholder="请选择" @change='setDisabled'>
		                 						<!-- <el-option value="1" label='所有Mysql服务器'></el-option> -->
					                            <el-option value="2" label='某个Mysql服务器域'></el-option>
					                            <el-option value="3" label='某个Mysql实例'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='9'>
										<el-form-item label-width='0'>
										    <el-checkbox v-model="oneForm.chooseSever" :disabled='oneFormDisabled' @change='getServerDomainList'>仅生产环境</el-checkbox>
										</el-form-item>
									</el-col>
								</el-row>

								<el-row>
									<el-col>
										<p class="title m-b20">选择服务器或实例(实例：选择部门应用主机或输入IP)</p>
									</el-col>
								</el-row>

								<el-row>
									<el-col :md='9' :class='{"required":oneForm.serverQueryMethod==="2"}'>
										<el-form-item label="部门">
										    <el-select v-model="oneForm.busiDep" placeholder="请选择" :disabled='oneFormDisabled' @change='getServerDomainList' clearable filterable>
												<el-option v-for='(item,index) in oneDeptList' :key='index' :label='item.label' :value='item.value'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='{span:9,offset:2}' :class='{"required":oneForm.serverQueryMethod==="2"}'>
										<el-form-item label="应用">
										    <el-select v-model="oneForm.serverDomain" placeholder="请选择" :disabled='oneFormDisabled' @change='getServerList' clearable filterable>
		                 						<el-option v-for='(item,index) in oneFormServerDomainList' :key='index' :value='item.value' :label='item.label'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='9'>
										<el-form-item label="主机">
										    <el-select v-model="oneForm.case" placeholder="请选择" :disabled='oneFormCaseDisabled' clearable filterable>
		                 						<el-option v-for='(item,index) in oneFormServerList' :key='index' :value='item.value' :label='item.label'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='{span:9,offset:2}' v-show='oneForm.serverQueryMethod==="3"'>
										<el-form-item label="IP">
										    <el-input
										      placeholder="请输入IP"
										      v-model="oneForm.Ip">
										    </el-input>
										</el-form-item>

									</el-col>


								</el-row>

								<el-row>
									<el-col>
										<p class="title m-b20">时间查询</p>
									</el-col>
									<el-col :md='9'>
										<el-form-item label="查询方式">
										    <el-select v-model="oneForm.queryMode" placeholder="按时间范围查询" @change='setTimeDisabled'>
					              				<el-option value="0" label='按时间范围查询'></el-option>
					              				<el-option value="1" label='所有时间'></el-option>
					              				<el-option value="2" label='今天'></el-option>
					              				<el-option value="3" label='昨天'></el-option>
					              				<el-option value="4" label='前天'></el-option>
					              				<el-option value="5" label='最近3天'></el-option>
					              				<el-option value="6" label='最近7天'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='{span:9,offset:2}'>
										<el-form-item label="时间查询范围">
											<el-col :md='11'>
					              				<el-date-picker
				              				      v-model="oneForm.startDate"
				              				      :disabled='oneFormTimeDisabled'
				              				      format='yyyy-MM-dd HH:mm:ss'
				              				      value-format='yyyy-MM-dd HH:mm:ss'
				              				      type="datetime"
				              				      popper-class='my-animation'
				              				      placeholder="选择日期时间">
					              				</el-date-picker>
											</el-col>
											<el-col :md='{span:1,offset:1}'>
												-
											</el-col>
											<el-col :md='11'>
					              				<el-date-picker
				              				      v-model="oneForm.endDate"
				              				      :disabled='oneFormTimeDisabled'
				              				      format='yyyy-MM-dd HH:mm:ss'
				              				      value-format='yyyy-MM-dd HH:mm:ss'
				              				      type="datetime"
				              				      placeholder="选择结束日期">
					              				</el-date-picker>
											</el-col>
										</el-form-item>
									</el-col>
								</el-row>

								<el-row>
									<el-col>
										<p class="title m-b20">查询方式</p>
									</el-col>

									<el-col :md='9'>
										<el-form-item label="慢查询查询方式">
										    <el-select v-model="oneForm.slowQueryMode" placeholder="请选择" @change='changeSelectOption'>
					              				<el-option value="1" label='单条慢SQL语句查询'></el-option>
					              				<el-option value="2" label='慢SQL汇总分析'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='{span:9,offset:2}'>
										<el-form-item label="排序方式">
										    <el-select v-model="oneForm.sortType" placeholder="请选择">
					              				<el-option value="2" label='按时间排序' v-if='!showOption'></el-option>
					              				<el-option value="3" label='按耗时排序' v-if='!showOption'></el-option>
					              				<el-option value="1" label='按CRC32排序' v-if='!showOption'></el-option>

					              				<el-option value="1" label='按出现次数排序' v-if='showOption'></el-option>
					              				<el-option value="2" label='按总耗时排序' v-if='showOption'></el-option>
					              				<el-option value="3" label='按平均执行时间排序' v-if='showOption'></el-option>
					              				<el-option value="4" label='按平均扫描行数排序' v-if='showOption'></el-option>
					              				<el-option value="5" label='按总体成本排序(次数×平均扫描行数)' v-show='showOption'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
								</el-row>
								<transition 
									name='fade'
									enter-active-class="animated slideInDown"
									leave-active-class="animated slideOutUp"
								>
									<el-row 
										v-if='!open'
									>
										<el-col>
											<p class="title m-b20">用户过滤</p>
										</el-col>
										<el-col :md='9'>
											<el-form-item label="过滤类型">
											    <el-select v-model="oneForm.filterType" placeholder="请选择">
						              				<el-option value="0" label='选择发起用户过滤类型'></el-option>
						              				<el-option value="1" label='仅包含用户列表'></el-option>
						              				<el-option value="2" label='排除用户列表'></el-option>		
											    </el-select>
											</el-form-item>
										</el-col>

										<el-col :md='{span:9,offset:2}'>
											<el-form-item label="用户列表">
											    <el-input v-model="oneForm.userList" placeholder='请输入用户名列表，多用户用逗号分隔！'></el-input>
											</el-form-item>
										</el-col>

										<el-col>
											<p class="title m-b20">排除</p>
										</el-col>
										<el-col :md='9'>
											<el-form-item label="sql执行时间超过">
											    <el-input v-model="oneForm.timeThreshold" placeholder='请输入SQL执行时间阈值'></el-input>
											</el-form-item>
										</el-col>

										<el-col :md='{span:9,offset:2}'>
											<el-form-item label="排除" class='exclude'>
											    <el-input v-model="oneForm.tableName" placeholder='请输入单个超时SQL表名'></el-input>
											</el-form-item>
										</el-col>

									</el-row>
								</transition>
								<div class="condition m-t20 text-center">
									<div>
										<i 
											:class='["condition-icon","animated",open ? "slideInDown" : "slideOutUp"]' 
											@click='openAndClose' 
											:style='styleObj'
										>
											{{tips}}
										</i>
									</div>
								</div>

								<div class='btn-group-lg'>
								    <el-button type="primary" @click="onSubmit" :loading='loading' :disabled='btnDisabled'>查 询</el-button>
								    <el-button @click="resetForm">重 置</el-button>
								</div>

							</el-form>
						</div>

						<div class="empty"></div>
						<div class="compenent-form m-t20">
							<div v-if='!showOption'>
								<v-table 
									@openRemarkDialog='editRow'
									:data='oneTableData' 
									:tableHeadName='oneTableHeadName'
									:isShowComments='true'
									:operatorText='"查看语句"'
									:labelName='"查看语句"'
								></v-table>

								<div class="block pagination-wraper">
								   <el-pagination
								   	 v-if='oneTableData.length > 0'
								   	 @size-change='sizeChange'
								   	 @current-change='currentChange'
								     :page-sizes="[10, 15, 20, 25, 30, 35, 40, 45, 50]"
								     layout="total, sizes, prev, pager, next, jumper"
								     :current-page.sync='oneCurrentPage'
								     :page-size='onePageSize'
								     :total="oneTotal">
								   </el-pagination>
								</div>
							</div>

							<div v-else>
								<v-table 
									@openRemarkDialog='editRow'
									:data='oneDetailTableData' 
									:tableHeadName='oneDetailTableHeadName'
									:isShowComments='true'
									:operatorText='"查看语句"'
									:labelName='"查看语句"'
									class='two-table'
								></v-table>
								<div class="block pagination-wraper">
								   <el-pagination
								   	 v-if='oneDetailTableData.length > 0'
								   	 @size-change='sizeChange'
								   	 @current-change='currentChange'
								   	 :current-page.sync='oneDetailCurrentPage'
								     :page-sizes="[10, 15, 20, 25, 30, 35, 40, 45, 50]"
								     layout="total, sizes, prev, pager, next, jumper"
								     :page-size='oneDetailPageSize'
								     :total="oneDetailTotal">
								   </el-pagination>
								</div>
							</div>
						</div>

					</el-tab-pane>

					<!-- <el-tab-pane label="慢SQL TOP统计" name="two" v-if='false'>
						<div class="compenent-form">	
							<el-form rel='form' :model='twoForm' :label-width='labelWidth'>
								<el-row>
									<el-col :md='9'>
										<el-form-item label=" 环境类型">
										    <el-select v-model="twoForm.envType" placeholder="请选择" clearable filterable>
							                 						<el-option v-for='(item,index) in twoEnvTypeList' :key='index' :value='item.value' :label='item.label'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
								</el-row>
					
								<el-row>
									<el-col>
										<p class="title m-b20">时间查询</p>
									</el-col>
									<el-col :md='9'>
										<el-form-item label="查询方式">
										    <el-select v-model="twoForm.queryMode" placeholder="按时间范围查询" @change='setTimeDisabled'>
					              				<el-option value="0" label='按时间范围查询'></el-option>
					              				<el-option value="1" label='所有时间'></el-option>
					              				<el-option value="2" label='今天'></el-option>
					              				<el-option value="3" label='昨天'></el-option>
					              				<el-option value="4" label='前天'></el-option>
					              				<el-option value="5" label='最近3天'></el-option>
					              				<el-option value="6" label='最近7天'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
					
									<el-col :md='{span:9,offset:2}'>
										<el-form-item label="时间查询范围">
											<el-col :md='11'>
					              				<el-date-picker
									              				      v-model="twoForm.startDate"
									              				      :disabled='oneFormTimeDisabled'
									              				      type="datetime"
									              				      placeholder="选择日期时间">
					              				</el-date-picker>
											</el-col>
											<el-col :md='{span:1,offset:1}'>
												-
											</el-col>
											<el-col :md='11'>
					              				<el-date-picker
									              				      v-model="twoForm.endDate"
									              				      :disabled='oneFormTimeDisabled'
									              				      type="datetime"
									              				      placeholder="选择结束日期">
					              				</el-date-picker>
											</el-col>
										</el-form-item>
									</el-col>
								</el-row>
					
								<div class='btn-group-lg'>
								    <el-button type="primary" @click="onSubmit" :disabled='btnDisabled'>查 询</el-button>
								    <el-button @click="resetForm">重 置</el-button>
								</div>
					
							</el-form>
						</div>
					
						<div class="empty"></div>
					
						<div class="compenent-form">
							<v-table 
								@openRemarkDialog='editRow'
								:data='twoTableData' 
								:tableHeadName='twoTableHeadName'
								:isShowComments='true'
								:operatorText='"查看语句"'
								:labelName='"查看语句"'
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
					
					</el-tab-pane> -->

	    		</el-tabs>
	    	</div>
		    <el-dialog
	    	  :title="title"
	    	  :visible.sync="dialogVisible"
	    	  width="50%"
	    	  @close='dialogVisible=false'
	    	  >
	    	  	<div style='word-break: break-word;'>{{exe_sql}}</div>
	    	  	<div class="text-right">
	    	  		<el-button type="primary" @click="dialogVisible=false">关 闭</el-button>
	    	  	</div>
	    	</el-dialog>
    	</div>
    </div>
</template>
<style lang='scss'>
.slow-sql {
	.main-middle {
		padding: 0;
	}
	.el-tabs__header,.compenent-form,{
		padding: 0 20px;
	}
	.condition {
		.condition-icon {
			animation-iteration-count: infinite;
			animation-duration: 4s;
			cursor: pointer;
			padding-right: 30px;
			line-height: 30px;
			display: inline-block;
			letter-spacing: 10px;
		}
		
		
	}
	.two-table {
	    .cell {
	      .sql {
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
	.slow-sql .el-dialog {
		li {
			float: left;
			padding-left: 0;
			width: 50%;
			label {
				display: inline-block;
				width: 100px;
				text-align: right;
			}
		} 
	}
</style>
<script type="text/javascript">
	export default {
		data () {
			return {
				loading: false,
				open: 'true',
				labelWidth: '10rem',
				oneDeptList: [],
				btnDisabled: false,
				oneFormIsFocus: false,					//是否聚焦
				oneFormDisabled: false,					//慢sql日志查询生产环境/事业部/服务器域是否禁用
				oneFormCaseDisabled: true,				//慢sql日志查询选择实例下拉框是否禁用
				oneFormServerDomainList: [],			//慢sql日志查询服务器域下拉框数据
				oneFormTimeDisabled: false,				//慢sql日志查询时间框是否禁用
				oneFormServerList: [],					//慢sql日志查询选择实例下拉框数据
				title: '查询语句详情',					//查看详情对话框标题
				activeName: 'one',						//tab选项绑定值
				
				oneForm: {								//平台访问权限表单数据
					serverQueryMethod: '2',				//服务器查询方式
					chooseSever: true,					//选择服务器或者实例
					busiDep: '',						//事业部
					serverDomain: '',					//服务器域
					case: '',							//实例
					queryMode: '0',						//查询方式
					startDate: '',						//起始时间
					endDate: '',						//终止时间
					filterType: '0',						//过滤类型
					userList: '',						//用户列表
					timeThreshold: '',					//sql执行时间阈值
					tableName: '',						//表名
					slowQueryMode: '1',
					sortType: '2',
					Ip: '',
				},
				oneFormInitData: {
					serverQueryMethod: '2',				//服务器查询方式
					chooseSever: true,					//选择服务器或者实例
					queryMode: 'disabled',					//查询方式
					filterType: '0',						//过滤类型
					slowQueryMode: 'disabled',
					sortType: 'disabled',
				},
				showOption: false,
				exe_sql: '',
				oneTableData:[],		
				oneTableHeadName: {
					crc32: 'CRC32',
					server: '服务器',
					port: '端口',
					timestamp: '时间',
					total_time: '耗时',
					rows_examined: '扫描行数',
					rows_send: '返回行数',
					user: '发起用户',
					host: '发起服务器'
				},
				onePageSize: 10,		//每页显示数		
		 		oneCurrentPage: 1,	//当前页码	
				oneTotal: 10,		//总页数
				
				oneAllTableData: [],
				oneDetailTableData: [],
				oneDetailAllTableData: [],
				oneDetailTableHeadName: {
					crc32: 'CRC32',
					all_count: '总次数',
					sum_total_time: '总耗时',
					avg_total_time: '平均耗时',
					sum_rows_examined: '总扫描行数',
					avg_rows_examined: '平均扫描行数',
					user: '发起用户',
					sql: '慢查询',
					server: '服务器',
					host: '来自服务器'
				},
		 		oneDetailPageSize: 10,		//每页显示数		
		 		oneDetailCurrentPage: 1,	//当前页码	
				oneDetailTotal: 10,		//总页数
		 		
				
				twoTableData: [],
				twoTableHeadName: {
					server: '服务器',
					port: '端口',
					role: '服务器角色',
					coun: '慢SQL数',
					avg_time: '平均慢查询耗时',
					max_query_time: '最慢查询耗时',
					sum_total_time: '总耗时统计',
				},
				twoForm: {
					queryMode: '',
					envType: '',
					startDate: '',						//起始时间
					endDate: '',						//终止时间
				},
				twoEnvTypeList: [],
				twoFormTimeDisabled: false,				//慢sql日志查询时间框是否禁用
				twoPageSize: 1,		//每页显示数		
		 		twoCurrentPage: 1,	//当前页码	
				twoTotal: 10,		//总页数
				dialogVisible: false,
				tips: '更多条件',
			}
		},
		computed: {
			styleObj () {
				let picName = this.open ? 'down' : 'up';
				let picUrl = require('../../assets/images/' + picName + '.png')
				return {
					'background': "url(" + picUrl + ") no-repeat center right / 30px 30px",
				}
			}
		},
		methods: {
			openAndClose () {
				this.open = !this.open;
				this.tips = this.open ? '更多条件' : '收起条件'
			},
			changeSelectOption (val) {
				if (val === '2') {
					this.oneForm.sortType = '1'
					this.showOption = true
				} else {
					this.showOption = false
					this.oneForm.sortType = '2'
				}
			},
			/**
			 * 设置选择服务器域或实例是否禁用
			 * @AuthorHTL
			 * @DateTime  2018-04-27T14:26:21+0800
			 */
			setDisabled (val) {
				if (val === '1') {
					this.oneFormDisabled = true;
					this.oneFormCaseDisabled = true;
				} else if (val === '2') {
					this.oneFormDisabled = false;
					this.oneFormCaseDisabled = true;
				} else if (val === '3') {
					this.oneFormDisabled = false;
					this.oneFormCaseDisabled = false;
				}
			},
			/**
			 * 设置时间下拉框是否禁用
			 * @AuthorHTL
			 * @DateTime  2018-04-27T14:55:47+0800
			 */
			setTimeDisabled (val) {
				if (val === '0') {
					this[this.activeName + 'FormTimeDisabled'] = false;
				} else {
					this[this.activeName + 'FormTimeDisabled'] = true;
				}
			},
			/**
			 * 获取服务器域下拉框数据
			 * @AuthorHTL
			 * @DateTime  2018-04-27T14:33:17+0800
			 * @return    {[type]}                 [description]
			 */
			getServerDomainList (val) {
				let formObj = this[this.activeName + 'Form']
				//将选择服务器域清空
				formObj.serverDomain = ''
				this[this.activeName + 'FormServerDomainList'] = []
				//主机清空
				//将选择实例清空
				formObj.case = ''
				this[this.activeName + 'FormServerList'] = []
				formObj.busiDep && app.post('/Gaea_database/slowQueryApp', {
					deptId: formObj.busiDep,
                    chkOnlyProd: formObj.chooseSever ? '1' : '0',
                    userMip: this.$store.state.username
				}, response => {
					for (let i of response.data.data.appList) {
						i.label = i.appName
						i.value = i.appId
						this[this.activeName + 'FormServerDomainList'].push(i)
					}
				})
			},
			/**
			 * 获取实例列表
			 * @AuthorHTL
			 * @DateTime  2018-04-27T14:44:42+0800
			 * @return    {[type]}                 [description]
			 */
			getServerList (val) {
				//主机清空
				//将选择实例清空
				this[this.activeName + 'Form'].case = ''
				this[this.activeName + 'FormServerList'] = []
				val && app.post('/Gaea_database/getServerDest', {
					appId: val + ''
				}, response => {
					for (let i of response.data.data.serverList) {
						this[this.activeName + 'FormServerList'].push({
							label: i.role + i.ip + ':' + i.port,
							value: i.tag_id
						})
					}
				})
			},

			validatorForm () {
				let formObj = this[this.activeName + 'Form'];
				if (formObj.serverQueryMethod === '3') {
					if (formObj.Ip) {
						return app.validator.ipValidate(formObj.Ip.trim())
					} else {
						if (!formObj.busiDep) {
							return '请选择部门应用主机或输入IP'
						} else if (!formObj.serverDomain) {
							return '请选择应用主机或输入IP'
						} else if (!formObj.case) {
							return '请选择主机或输入IP'
						}
					}
					
				} else {
					if (!formObj.busiDep) {
						return '请选择部门'
					} else if (!formObj.serverDomain) {
						return '请选择应用'
					}
				}

				if (formObj.userList != '' && (formObj.filterType === '0')) {
					return '请在下拉列表选择发起用户过滤类型！！'
				}

			},
			
			onSubmit () {
				let url = '',
					params = {},
					formObj = this[this.activeName + 'Form'],
					time_type = formObj.queryMode,
					time_start = formObj.startDate,
					time_end = formObj.endDate,
					sort_type = formObj.sortType,
					msg = this.validatorForm();
				if (msg) {
					this.$alert(msg, {title: '提示',type: 'info'})
					return;
				}
				this.btnDisabled = true;
				this.loading = true
				if (this.activeName === 'one') {
					url = '/Gaea_database/slowQueryLog'
					params = {
						mysql_type_list: formObj.serverQueryMethod,	//服务器查询方式
	                    mysql_domain_list: formObj.serverDomain,	//服务器域
	                    one_host: formObj.case,						//实例
	                    time_type,									//时间查询方式
	                    time_start,									//开始时间
	                    time_end,									//结束时间
	                    sort_type,									
	                    query_type: formObj.slowQueryMode,				//查询方式
	                    query_user: formObj.userList,				//查询用户
	                    query_user_type: formObj.filterType,			//过滤类型
	                    sql_exe_time: formObj.timeThreshold,			//sql执行时间
	                    exclude_table: formObj.tableName,    			//表名
	                    IP: formObj.Ip || ''
					}
				} else {
					url = '/Gaea_database/slowQueryTop'
					params = {
						time_type,
                        time_start,
                        time_end,
                        sort_type,
                        domain_type: formObj.envType,
					}
				}
				app.post(url, params, this.successFn, err => {
					this.$alert('查询失败', {
						title: '提示',
						type: 'info'
					})
					this.loading = false;
					this.btnDisabled = false;
				})
			},
			successFn (response) {
				this.btnDisabled = false;
				this.loading = false;
				let name = this.showOption ? 'oneDetail' : 'one'
				this[name + 'AllTableData'] = [];
				let code = response.data.code
				if (code === 'Gaea10020') {
					for (let i of response.data.data.slow_query_log) {
						this[name + 'AllTableData'].push(i)
					}
				} else if (code === 'Gaea30020') {
					this.$alert(response.data.msg, {title: '提示',type: 'info'})
				}
				this[name + 'Total'] = this[name + 'AllTableData'].length;
				app.tools.changeTable(this, name)

				
			},
			sizeChange (pageSize) {
				app.tools.sizeChange(this, pageSize, this.showOption ? 'oneDetail' : '')
			},
			currentChange (currentPage) {
				app.tools.currentChange(this, currentPage, this.showOption ? 'oneDetail' : '')
			},
			editRow (row) {
				this.exe_sql = row.log || row.sql;
				this.dialogVisible = true;
				
			},
			resetForm () {
				app.tools.resetFormData(this[this.activeName + "Form"], this.oneFormInitData)
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
					}
				})
			},
			//获取环境列表数据
			getEnvList () {
				app.post('/Gaea_database/getEnv', {
					
				}, response => {
					for (let i of response.data.data.envList) {
						i.label = i.envName;
						i.value= i.envId;
						this.oneEnvTypeList.push(i)
					}
				})
			},

		},
		created () {
			/*获取部门下拉框选项内容*/
			this.getDeptList();
			//获取环境下拉列表数据
			this.getEnvList();	
		}
	}
</script>