<template>
	<div class="box">
		<div class="mysql-mange">
			<div class='main-middle'>
				<el-tabs v-model="activeName">
					<el-tab-pane label="MySQL安装" name="one">
						<div class="compenent-form">
							<p class="my-remark"><span>提示：请分别选择部门，应用等； centos 6操作系统版本建议选mariadb 10.1.18；mariadb 10.2及以上版本仅支持centos 7（默认只有生产环境安装zabbix并注册监控）</span></p>
							<el-form :model="oneForm" :label-width="labelWidth">
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
								</el-row>

								<el-row>
									<el-col :md='9' class='required'>
										<el-form-item label="应用">
										    <el-select v-model="oneForm.region" placeholder="请选择" clearable filterable>
				         						<el-option v-for='(item,index) in oneRegionList' :key='index' :value='item.value' :label='item.label'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
								
									<el-col :md='{span:9,offset:2}' class='required'>
										<el-form-item label="集群架构">
										    <el-select v-model="oneForm.cluster" placeholder="请选择" @change='showIpInput'>
				         						<el-option value="0" label='选择集群架构'></el-option>
		                 						<el-option value="1" label='单节点'></el-option>
		                 						<el-option value="2" label='一主一从'></el-option>
		                 						<el-option value="3" label='一主两从'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :md='9' class='required'>
										<el-form-item label="版本">
										    <el-select v-model="oneForm.version" placeholder="请选择">
				         						<el-option value="0" label='选择版本'></el-option>
		                 						<el-option value="5" label='mariadb 10.2.13'></el-option>
		                 						<el-option value="1" label='mariadb 10.1.18'></el-option>
		                 						<el-option value="2" label='mariadb 10.1.16'></el-option>
		                 						<el-option value="3" label='mariadb 10.1.11'></el-option>
		                 						<el-option value="4" label='mariadb 10.0.20'></el-option>
		                 						<el-option value="6" label='mariadb 10.3.7'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
									<el-col :md='{span:9,offset:2}' class='required'>
										<el-form-item label="字符集">
										    <el-select v-model="oneForm.unicode" placeholder="请选择">
										    	<el-option value="0" label='选择字符集'></el-option>
				         						<el-option value="1" label='utf8mb4'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
								</el-row>

								<el-row>
									<el-col :md='20' class='required'>
										<el-form-item label="集群描述">
										    <el-input
										      type="textarea"
										      placeholder="注：南海机器请标明南海"
										      v-model="oneForm.clusterDesc">
										    </el-input>
										</el-form-item>
									</el-col>
								</el-row>

								<el-row>
									<el-col :md='9' class='required'>
										<el-form-item label="IP1:">
										    <el-input v-model="oneForm.IP1" placeholder='192.168.30...'></el-input>
										</el-form-item>
									</el-col>
								</el-row>

								<el-row v-show='isShowIp2'>
									<el-col :md='9' class='required'>
										<el-form-item label="IP2:">
										    <el-input v-model="oneForm.IP2" placeholder='192.168.30...'></el-input>
										</el-form-item>
									</el-col>
								</el-row>

								<el-row v-show='isShowIp3'>
									<el-col :md='9' class='required'>
										<el-form-item label="IP3:">
										    <el-input v-model="oneForm.IP3" placeholder='192.168.30...'></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<div class="btn-group-lg">
									<el-button type="primary" @click="onSubmit('exe')" :disabled='btnDisabled'>执 行</el-button>
									<el-button @click="resetForm('one')">重 置</el-button>
								</div>
							</el-form>
						</div>
					</el-tab-pane>

					<el-tab-pane label="MySQL实例列表清单" name="two">
						<div class="compenent-form">
							<el-form :model="twoForm" :label-width="labelWidth">
								<el-row>	
									<el-col :md='9'>
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
									<el-col :md='{span:9,offset:2}'>
										<el-form-item label="环境">
										    <el-select v-model="twoForm.envType" placeholder="请选择" @change='getAppList' clearable filterable>
				         						<el-option v-for='(item,index) in twoEnvTypeList' :key='index' :value='item.value' :label='item.label'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
									<el-col :md='9'>
										<el-form-item label="应用">
										    <el-select v-model="twoForm.region" placeholder="请选择" clearable filterable>
				         						<el-option v-for='(item,index) in twoRegionList' :key='index' :value='item.value' :label='item.label'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
									<el-col :md='{span:9,offset:2}'>
										<el-form-item label="主机名(模糊查询)">
											<el-input
											  placeholder="请输入主机名"
											  v-model="twoForm.host">
											</el-input>
										</el-form-item>
									</el-col>
									<el-col :md='9'>
										<el-form-item label="IP(模糊查询)">
										    <el-input
										      placeholder="请输入IP"
										      v-model="twoForm.IPPort">
										    </el-input>
										</el-form-item>

									</el-col>
									<el-col :md='{span:9,offset:2}'>
										<el-form-item label="Role(模糊查询)">
											<el-input v-model="twoForm.role"></el-input>
										</el-form-item>
									</el-col>

									
								</el-row>
								<div class='btn-group-lg'>
									<el-button type="primary" @click="onSubmit('twoExe')" :disabled='btnDisabled'>查 询</el-button>
									<el-button @click="resetForm('two')">重 置</el-button>
								</div>
							</el-form>
						</div>
						<div class="empty"></div>

						<div class="compenent-form">
							<v-table 
							   :data='twoTableData' 
							   :tableHeadName='twoTableHeadName'
							   :isShowComments='true'
							   @openRemarkDialog='view'
							   class='m-t20 two-table'
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

					<el-tab-pane label="processlist监控及kill" name="three">
						<div class="compenent-form">
							<el-form :model="threeForm" :label-width="labelWidth">
								<el-row>
									<el-col>
										<el-form-item label="主机过滤" class='title'>
										    <el-checkbox v-model="threeForm.proEnv">仅生产环境</el-checkbox>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :md='9'>
										<el-form-item label="部门">
										    <el-select 
											    v-model="threeForm.dept" 
											    @change='selectDept("three")'
											    placeholder="请选择" 
											    clearable 
											    filterable
										    >
				         						<el-option v-for='(item,index) in  threeDeptList' :key='index' :value='item.value' :label='item.label'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='{span:9,offset:2}'>
										<el-form-item label="环境">
										    <el-select v-model="threeForm.envType" placeholder="请选择" @change='getAppList' clearable filterable>
										        <el-option v-for='(item,index) in (threeForm.proEnv ? proEnvList : threeEnvTypeList)' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='9'>
										<el-form-item label="应用">
										    <el-select v-model="threeForm.region" clearable filterable placeholder="请选择" @change='getHostList'>
				         						<el-option v-for='(item,index) in threeRegionList' :key='index' :value='item.value' :label='item.label'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='{span:9,offset:2}'>
										<el-form-item label="主机">
										    <el-select v-model="threeForm.host" placeholder="请选择" @change='startStatusProcessing' clearable filterable>
				         						<el-option v-for='(item,index) in threeHostList' :key='index' :value='item.value' :label='item.label'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='9'>
										<el-form-item label="IP:PORT">
										    <el-input
										      placeholder="请输入IP:PORT"
										      v-model="threeForm.IPPort">
										    </el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</el-form>
						</div>
						<el-tabs v-model="processActiveName" type="border-card">
							<el-tab-pane label="processlist实时查询及kill" name="threeFirst">
								<div class="compenent-form">
									<el-form :model="threeFirstForm" :label-width="labelWidth">
										<el-row>
											<el-col>
												<p class='title'>状态.执行时间.关键字和时间过滤</p>
											</el-col>										
											<el-col>
												<el-form-item label-width='0'>
												    <el-checkbox v-model="threeFirstForm.sleep">显示sleep连接</el-checkbox>
												    <el-checkbox v-model="threeFirstForm.slave">显示slave连接</el-checkbox>
												</el-form-item>
											</el-col>

											<el-col :md='9'>
												<el-form-item label="SQL执行时间">
												    <el-input
												      placeholder="请输入最少执行时间"
												      v-model="threeFirstForm.minTime">
												    </el-input>
												</el-form-item>
											</el-col>

											<el-col :md='{span:9,offset:2}'>
												<el-form-item label="关键字">
												    <el-input
												      placeholder="请输入"
												      v-model="threeFirstForm.keyword">
												    </el-input>
												</el-form-item>
											</el-col>
										</el-row>
										<div class='btn-group-lg'>
										    <el-button type="primary" @click="onSubmit('threeQuery')" :disabled='btnDisabled'>查 询</el-button>
											<el-button @click="resetForm('threeFirst')">重 置</el-button>
										</div>
									</el-form>

									<el-form :model="threeFirst2Form" :label-width="labelWidth">
										<el-row>
											<el-col>
												<p class='title m-b20'>实时Processlist kill 操作</p>
											</el-col>
											<el-col :md='9'>
												<el-form-item label="线程号">
												    <el-input
												      placeholder="请输入线程号，多个线程之间用；分隔"
												      v-model="threeFirst2Form.threadNo">
												    </el-input>
												</el-form-item>
											</el-col>

											<el-col :md='{span:9,offset:2}'>
												<el-form-item label="关键字">
												    <el-input
												      placeholder="请输入"
												      v-model="threeFirst2Form.keyword">
												    </el-input>
												</el-form-item>
											</el-col>

											<el-col :md='9'>
												<el-form-item label="执行时间大于">
													<el-col :md='10'>
														<el-input
														  placeholder="请输入"
														  v-model="threeFirst2Form.exeTime">
														</el-input>
													</el-col>

													<el-col :md='4' width='20px'>
														秒的
													</el-col>
						    						    
													<el-col :md='10'>
						    						    <el-select v-model="threeFirst2Form.seconds" placeholder="请选择">
								         						<el-option value="1" label='Select'></el-option>
						                 						<el-option value="2" label='Update'></el-option>
						                 						<el-option value="3" label='Insert'></el-option>
						                 						<el-option value="4" label='Delete'></el-option>
						    						    </el-select>
													</el-col>
												</el-form-item>	
											</el-col>
										</el-row>

										<div class='btn-group-lg'>
										    <el-button type="primary" @click="onSubmit('threeKill')" :disabled='btnDisabled'>kill</el-button>
											<el-button @click="resetForm('threeFirst2')">重 置</el-button>
										</div>

									</el-form>
								</div>
								<div class="empty"></div>
								<div class="compenent-form">
									<p class='title m-b10'>主机状态显示</p>
									<v-table 
										:data='hostTableData' 
										:tableHeadName='hostTableHeadName'
										:showOperator='false'
									></v-table>
								</div>

								<div class="compenent-form">
									<p class='title m-b10'>进程列表</p>
									<v-table 
										:data='threeFirstTableData' 
										:tableHeadName='threeFirstTableHeadName'
										:showOperator='false'
										class='three-first-table'
									></v-table>
									<div class="block pagination-wraper">
									   <el-pagination
									   	 v-if='threeFirstTableData.length > 0'
									   	 @size-change='sizeChange'
									   	 @current-change='currentChange'
									     :page-sizes="[10, 15, 20, 25, 30, 35, 40, 45, 50]"
									     layout="total, sizes, prev, pager, next, jumper"
									     :page-size='threeFirstPageSize'
									     :total="threeFirstTotal">
									   </el-pagination>
									</div>
								</div>
							</el-tab-pane>
							<el-tab-pane label="processlist历史查询" name="threeSecond">
								<div class="compenent-form">
									<el-form :model="threeSecondForm" :label-width="labelWidth">
										<el-row>
											<el-col>
												<p class='title'>状态.执行时间.关键字和时间过滤</p>
											</el-col>
											<el-col>
												<el-form-item label-width='0'>
												    <el-checkbox v-model="threeSecondForm.sleep">显示sleep连接</el-checkbox>
												    <el-checkbox v-model="threeSecondForm.slave">显示slave连接</el-checkbox>
												</el-form-item>
											</el-col>
										</el-row>

										<el-row>
											<el-col :md='11'>
												<el-form-item label="查询时间范围">
													<el-col :md='11'>
							              				<el-date-picker
						              				      v-model="threeSecondForm.startDate"
						              				      type="date"
						              				      popper-class='my-animation'
						              				      value-format='yyyy-MM-dd HH:mm:ss'
						              				      placeholder="开始时间">
							              				</el-date-picker>
													</el-col>

													<el-col :md='{span:1,offset:1}'>
														-
													</el-col>

													<el-col :md='11'>
														<el-date-picker
						              				      v-model="threeSecondForm.endDate"
						              				      type="date"
						              				      value-format='yyyy-MM-dd HH:mm:ss'
						              				      placeholder="结束时间">
							              				</el-date-picker>
													</el-col>
												</el-form-item>
											</el-col>

											<el-col :md='7' class='width-inherit'>
												<el-form-item label="SQL执行时间(秒)" :label-width='labelWidth'>
												    <el-input
												      placeholder="请输入最少执行时间"
												      v-model="threeSecondForm.minTime">
												    </el-input>
												</el-form-item>
											</el-col>

											<el-col :md='5' class='width-inherit'>
												<el-form-item label="关键字" :label-width='labelWidth5'>
												    <el-input
												      placeholder="请输入info关键字"
												      v-model="threeSecondForm.keyword">
												    </el-input>
												</el-form-item>
											</el-col>
										</el-row>

										<div class="btn-group-lg">
										    <el-button type="primary" @click="onSubmit('threeQuery')" :disabled='btnDisabled'>查 询</el-button>
										    <el-button @click="resetForm('threeSecond')">重 置</el-button>
									    </div>
									</el-form>
								</div>
								<div class="empty"></div>
								<div class='compenent-form'>
									<p class='title m-b10'>主机状态显示</p>
									<v-table 
										:data='hostTableData' 
										:tableHeadName='hostTableHeadName'
										:showOperator='false'
									></v-table>
								
									<p class='title m-b10'>进程列表</p>
									<v-table 
										:data='threeSecondTableData' 
										:tableHeadName='threeSecondTableHeadName'
										:showOperator='false'
										class='three-second-table'
									></v-table>
									<div class="block pagination-wraper">
									   <el-pagination
									   	 v-if='threeSecondTableData.length > 0'
									   	 @size-change='sizeChange'
									   	 @current-change='currentChange'
									     :page-sizes="[10, 15, 20, 25, 30, 35, 40, 45, 50]"
									     layout="total, sizes, prev, pager, next, jumper"
									     :page-size='threeSecondPageSize'
									     :total="threeSecondTotal">
									   </el-pagination>
									</div>
								</div>
							</el-tab-pane>
						</el-tabs>
					</el-tab-pane>

					<!-- <el-tab-pane label="MySQL参数设置" name="four">
					
					</el-tab-pane>
					
					<el-tab-pane label="DB表迁移" name="five">
						<div class="compenent-form">
							<p class="my-remark">提示：请分别选择DB迁移的源端和目的端的域,主机,DB,表并执行</p>
							<el-form :model='fiveForm' :label-width='labelWidth'>
								<el-row>
									<el-col :md='9'>
										<el-form-item label="迁移类型选择">
										    <el-select v-model="fiveForm.moveType" placeholder="请选择">
									         						<el-option v-for='(item,index) in fiveFormMoveTypeList' :key='index' :value='item.value' :label='item.label'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
					
									<el-col>
										<p class='title m-b20'>DB迁移的源端<span>（尽量选择从库中导出）</span></p>
									</el-col>
								
									<el-col :md='9'>
										<el-form-item label="源端域">
										    <el-select v-model="fiveForm.region" placeholder="请选择" clearable filterable>
									         						<el-option v-for='(item,index) in fiveFormRegionList' :key='index' :value='item.value' :label='item.label'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
					
									<el-col :md='{span:9,offset:2}'>
										<el-form-item label="源端主机">
										    <el-select v-model="fiveForm.host" placeholder="请选择" clearable filterable>
									         						<el-option v-for='(item,index) in fiveFormHostList' :key='index' :value='item.value' :label='item.label'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
					
									<el-col :md='9'>
										<el-form-item label="源端DB">
										    <el-select v-model="fiveForm.DB" placeholder="请选择" clearable filterable>
									         						<el-option v-for='(item,index) in fiveFormDBList' :key='index' :value='item.value' :label='item.label'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
					
									<el-col>
										<p class='title m-b20'>DB迁移的目的端<span>（主库导入）</span></p>
									</el-col>
					
									<el-col :md='9'>
										<el-form-item label="目的端域">
										    <el-select v-model="fiveForm.targetRegion" placeholder="请选择" clearable filterable>
									         						<el-option v-for='(item,index) in fiveFormTargetRegionList' :key='index' :value='item.value' :label='item.label'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
					
									<el-col :md='{span:9,offset:2}'>
										<el-form-item label="源端主机">
										    <el-select v-model="fiveForm.targetHost" placeholder="请选择" clearable filterable>
									         						<el-option v-for='(item,index) in fiveFormTargetHostList' :key='index' :value='item.value' :label='item.label'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
					
									<el-col :md='20'>
										<P class='bold'>目的端Server非系统DB列表显示</P>
										<el-form-item label-width='0'>
										    <el-input
										      type="textarea"
										      :rows="3"
										      v-model="fiveForm.display">
										    </el-input>
										</el-form-item>
									</el-col>
					
									<el-col :md='20'>
										<P class='bold'>操作备注</P>
										<el-form-item label-width='0'>
										   <el-input
										      type="textarea"
										      :rows="2"
										      placeholder="操作备注（注明操作原因）"
										      v-model="fiveForm.comments">
										    </el-input>
										</el-form-item>
									</el-col>
					
								</el-row>
								<div class='btn-group-lg'>
								    <el-button type="primary" @click="onSubmit('exe')" :disabled='btnDisabled'>执 行</el-button>
								    <el-button @click="resetForm">重 置</el-button>
								</div>
							</el-form>
						</div>
						<div class="empty"></div>
					
						<div class="compenent-form">
							<el-row class='m-tb15'>
								<el-col :span='2'>
									<p>执行进度</p>
								</el-col>
								<el-col :span='16'>
									<el-progress :percentage="0" :show-text='false'></el-progress>
								</el-col>
							</el-row>
							<el-row>
								<el-col>
									<p class='bold'>执行输出结果</p>
								</el-col>
								<el-col :span='18'>
								   <el-input
								      type="textarea"
								      :rows="3"
								      v-model="fiveForm.exeResult">
								    </el-input>
								</el-col>
							</el-row>
						</div>
					
					</el-tab-pane>
					
					<el-tab-pane label="DB表迁移记录" name="six">
					
					</el-tab-pane> -->
				</el-tabs>
			</div>

			<el-dialog
			   title="安装详情"
			  :visible.sync="dialogVisible"
			  width="50%"
			  @close='dialogVisibile=false'
			  >
				<ul class='clearfix my-detail-ul'>
					<li v-for='(value,key) in twoTableHeadName' :key='key' :class='key'>
						<span>{{value}}:</span><span>{{rowData[key]}}</span>
					</li>
				</ul>
				<div class='text-right'>
				   <el-button type="primary" @click='dialogVisible=false'>关 闭</el-button>
				</div>
			</el-dialog>
		</div>
	</div>

</template>
<style lang='scss'>
.mysql-mange {
	.main-middle {
		padding: 0;
	}
	.el-tabs__header,.compenent-form,{
		padding: 0 20px;
	}
	.m-tb15 {
		p {
			line-height: 30px;
		}
		.el-progress-bar {
			margin-top: 12px;
		}
	}
	.my-detail-ul li {
		float: left;
		padding-left: 0;
		width: 40%;
		line-height: 30px;
		span:first-child {
			width: 80px;
			display: inline-block;
			text-align: right;
			margin-right: 10px
		}
	}
	.two-table {
		.cell {
			.group_dns, .role {
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
	.group_dns {
		width: 100%;
	}
	.three-second-table,.three-first-table {
	    .cell {
	      .INFO {
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
</style>

<script type="text/javascript">
	export default {
		data () {
			return {
				labelWidth: '140px',
				labelWidth5: '70px',
				activeName: 'one',
				timer: null,				//获取状态定时器
				btnDisabled: false,
				dialogVisible: false,
				rowData: {},
				processActiveName: 'threeFirst',
				isShowIp2: true,			//是否显示iP2输入框
				isShowIp3: true,			//是否显示iP3输入框
				oneForm: {
					envType: '',
					dept: '',			//部门
					cluster: '0',			//集群架构
					region: '',				//应用
					version: '0',			//版本
					unicode: '1',			//字符集
					clusterDesc: '',		//集群描述
					IP1: '',
					IP2: '',
					IP3: '',
				},
				oneDeptList: [],
				oneEnvTypeList: [],
				oneRegionList: [],

				twoForm: {
					dept: '',			//部门
					envType: '',			//环境
					region: '',				//应用
					IPPort: '',				//ip端口
					role: '',				//模糊查询
					host: '',			//主机名
				},
				//twoHostList: [],
				twoDeptList: [],
				twoEnvTypeList: [],
				twoRegionList: [],
				twoTableHeadName: {},
				twoTableData: [],
				twoAllTableData: [],
				twoPageSize: 10,				//table表单每页显示数		
		 		twoCurrentPage: 1,			//table表单当前页码	
				twoTotal: 10,	
				twoTableData: [],
				twoTableHeadName: {
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

				threeForm: {
					proEnv: true,			//生产环境
					dept: '',				//部门
					envType: '',
					region: '',				//域
					host: '',				//主机
					IPPort: '',				//IP与接口
				},
				threeDeptList: [],
				threeHostList: [],
				threeRegionList: [],
				threeBusiDepList: [],
				threeEnvTypeList: [],
				proEnvList: [{
					label: '生产环境',
					value: 3
				}],
				threeFirstForm: {
					sleep: false,
					slave: false,
					minTime: '',
					keyword: '',			//关键字
				},
				threeFirst2Form: {
					keyword: '',
					threadNo: '',			//线程号
					keyword: '',			//关键字
					exeTime: '',			//执行时间
					seconds: '1',
				},
				threeSecondForm: {
					sleep: false,
					slave: false,
					minTime: '',
					keyword: '',
					startDate: '',
					endData: '',
				},
				hostTableData: [],
				hostTableHeadName: {
					ip: 'Host',
					os_load: 'OS load',
					Threads_running: 'Threads_running',
					Threads_connected: 'Threads_connected',
				},

				threeFirstTableData: [],
				threeFirstAllTableData: [],
				threeFirstTableHeadName: { //DB创建及账号访问授权申请table表头名
					TID: '进程ID',
					USER: 'User',
					HOST: "Host",
					DB: 'DB',
					COMMAND: 'Command',
					TIME: 'Time',
					STATE: "State",
					INFO: "Info",
					PROGRESS: 'Progress',
					MEMORY_USED: 'Menmory_used'
		 		},
		 		threeFirstCurrentPage: 1,	
				threeFirstPageSize: 10,
				threeFirstTotal: 10,

				threeSecondTableData: [],
				threeSecondAllTableData: [],
				threeSecondTableHeadName: {
					TID: '进程ID',
					USER: 'User',
					HOST: "Host",
					DB: 'DB',
					COMMAND: 'Command',
					TIME: 'Time',
					STATE: "State",
					INFO: "Info",
					PROGRESS: 'Progress',
					MEMORY_USED: 'Menmory_used'
				},
				threeSecondCurrentPage: 1,	
				threeSecondPageSize: 10,
				threeSecondTotal: 1,

				fiveForm: {
					moveType: '',			//迁移类型
					region: '',				//y源端域
					host: '',				//源端主机
					DB: '',					//源端db
					targetRegion: '',		//U目的端域
					targetHost: '',			//目的端主机
					display: '',			//展示
					comments: '',			//备注
					exeResult: '',			//执行输出结果
				},
				fiveFormMoveTypeList: [],
				fiveFormRegionList: [],
				fiveFormHostList: [],
				fiveFormDBList: [],
				fiveFormTargetRegionList: [],
				fiveFormTargetHostList: [],
			}
		},
		methods: {
			view (row) {
				this.rowData = row;
				this.dialogVisible = true;
			},
			/*选择部门*/
			selectDept (formName) {
				/*环境/应用/主机清空*/
				this[formName + 'Form'].envType = ''
				this[formName+ 'Form'].region = ''
				this[formName + 'RegionList'] = []
				this[formName + 'Form'].host = ''
				this[formName + 'HostList'] = []
			},
			showIpInput (val) {
				let formObj = this[this.activeName + 'Form']
				formObj.IP1 = formObj.IP2 = formObj.IP3 ='';
				this.isShowIp2 = true;
				this.isShowIp3 = true;
				if (val == 1) {
					this.isShowIp2 = false;
					this.isShowIp3 = false;
				} else if (val == 2) {
					this.isShowIp3 = false;
				} else if (val == 4) {
					
				}
			},
			validatorForm (type) {
				let msg = '',
					msg3 = '',
					msg2 = '';
				let formObj = this[this.activeName +'Form']
				let formObj1 = this.threeFirst2Form
				if (type === 'exe') {
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
					} else if (formObj.unicode === '0' || !formObj.unicode) {
						msg = '请选择字符集类型'
					} else if (!formObj.clusterDesc) {
						msg = '请输入集群描述'
					} else if (!formObj.IP1) {
						msg = '请输入IP1！'
					} else if (formObj.cluster <= 2) {
						msg = app.validator.ipValidate(formObj.IP1.trim())
						return msg ? msg : formObj.cluster === '1' ? '' 
										 : !formObj.IP2 ? '请输入IP2！' 
										 : formObj.IP2 === formObj.IP1 ? 'IP不能相同'
										 : app.validator.ipValidate(formObj.IP2.trim())
					} else if (formObj.cluster >= 3) {
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
				} else if (type === 'twoExe') {
					if (!formObj.dept && !formObj.envType && !formObj.region && !formObj.IPPort && !formObj.role && !formObj.host) {
						msg = '请输入查询条件后，再点击查询按钮!!'
					}
				} else if (type === 'threeQuery') {
					if (!formObj.IPPort && (!formObj.region || !formObj.host)) {
						msg = '请输入IP:PORT 或者选择主机应用和主机,然后再查询！'
					} else if (formObj.IPPort && formObj.host) {
						msg = '输入IP:PORT 和选择主机 只能二选一！'
					}
				} else if (type === 'threeKill') {
					if (!formObj.IPPort && (!formObj.region || !formObj.host)) {
						msg = '请输入IP:PORT 或者选择主机应用和主机,然后再查询！'
					} else if (formObj.IPPort && formObj.host) {
						msg = '输入IP:PORT 和选择主机 只能二选一！'
					} else if (!formObj1.threadNo && !formObj1.keyword && !formObj1.exeTime) {
						msg = '输入线程号或者关键字或执行时间大于多少的才能Kill！'
					} else if (formObj1.threadNo && (formObj1.keyword || formObj1.exeTime)) {
						msg = '线程号和关键字还有执行时间只能三选一！'
					} else if (formObj1.keyword && (formObj1.threadNo || formObj1.exeTime)) {
						msg = '线程号和关键字还有执行时间只能三选一！'
					} else if (formObj1.exeTime && (formObj1.keyword || formObj1.threadNo)) {
						msg = '线程号和关键字还有执行时间只能三选一！'
					}
				}
				return msg
			},
			exeSuccess (response) {
				let formObj = this[this.activeName + 'Form']
				this.btnDisabled = false
				formObj.IP1 = formObj.IP2 = formObj.IP3 = ''
				if (response.data.code != '505') {
					this.$alert(response.data.msg, {title: '提示',type: 'info'})
				}
			},
			twoExeSuccess (response) {
				//清空table数据
				this[this.activeName + 'AllTableData'] = []
				let res = response.data.data.mysql_instance_query
				//将请求到的数据加入table中
				for (let i of res) {
					this[this.activeName + 'AllTableData'].push(i)
				}
				this[this.activeName + 'Total'] = this[this.activeName + 'AllTableData'].length;
				app.tools.changeTable(this)
				this.btnDisabled = false

			},
			threeQuerySuccess (response) {
				let tabName = this.processActiveName
				//清空table数据
				this.btnDisabled = false
				this[tabName + 'AllTableData'] = []
				let res = response.data.data && response.data.data.process_list || []
				this.$alert(response.data.msg, {title: '提示',type: 'info'})
				//将请求到的数据加入table中
				for (let i of res) {
					this[tabName + 'AllTableData'].push(i)
				}
				this[tabName + 'Total'] = this[tabName + 'AllTableData'].length;
				app.tools.changeTable(this, tabName)
			},
			threeKillSuccess (response) {
				let res = response.data.data.process_list
				let code = response.data.code
				this.btnDisabled = false
				if (code === 'Gaea10042') {
					this.threeFirstAllTableData = []
					//将请求到的数据加入table中
					for (let i of res) {
						this.threeFirstAllTableData.push(i)
					}
					this.threeFirstTotal = this.threeFirstAllTableData.length;
					//重新计算分页
					app.tools.changeTable(this, 'threeFirst')
					this.$alert('kill成功，processlist已重新查询!!', {title: '提示',type: 'info'})
				} else if (code != '505') {
					this.$alert(response.data.msg, {title: '提示',type: 'info'})
				}
			},
			error () {
				this.$alert('操作失败', {
					title: '提示',
					type: 'info'
				})
				this.btnDisabled = false
			},
			onSubmit (type) {
				let url = '', params = {};
				let msg = this.validatorForm(type)
				let formObj = this[this.activeName + 'Form']
				let successFn = null;
				let v_view_sleep_check = this.threeFirstForm.sleep ? 1 : 0
				let v_view_slave_check = this.threeFirstForm.slave ? 1: 0
				let ipport_query = formObj.IPPort && formObj.IPPort.trim();
				if (formObj.IPPort && this.activeName === 'three') {
					if (!formObj.IPPort.match(/[:：]/g)) {
						ipport_query = formObj.IPPort + ":3306"
					} else {
						ipport_query = formObj.IPPort.replace(/[:：].*$/g,':3306')
					}	
				}
				if (msg) {
					this.$alert(msg, {title: '提示',type: 'info'})
					return;
				}
				if (type === 'exe') {
					url = '/Gaea_database/mysqlWebInstall'
					params = {
						deptId: formObj.dept,
						appId: formObj.region,
						cluster_archi: formObj.cluster,
						mysql_version: formObj.version,
						//mysql_unicode: formObj.unicode,
						role_desc: formObj.clusterDesc,
						IP1: formObj.IP1.trim(),
						IP2: formObj.IP2.trim(),
						IP3: formObj.IP3.trim(),
						userMip: this.$store.state.username
					}
				} else if (type === 'twoExe') {
					url = '/Gaea_database/mysqlInstanceQuery'
					params = {
						deptId: formObj.dept || 0,
						envId: formObj.envType || 0,
						appId: formObj.region || 0,
						role_query: formObj.role,
						ipport_query,
						hostName: formObj.host
					}

				} else if (type === 'threeQuery') {
					let form = this.processActiveName === 'threeFirst' ? this.threeFirstForm : this.threeSecondForm
					url = '/Gaea_database/processListQuery'
					params = {
						ps_op_type: this.processActiveName === 'threeFirst' ? 0 : 1,
						server_id: formObj.host,
						ipport_query,
						text_exe_time: form.minTime || '',
						v_view_sleep_check,
						v_view_slave_check,
						text_key_word: form.keyword || '',
						time_start: form.startDate || '',
                        time_end: form.endDate || ''
					}
				}  else if (type === 'threeKill') {
					url = '/Gaea_database/processListKill'
					params = {
						server_id: formObj.host,
						ipport_query,
						kill_thread_id: this.threeFirst2Form.threadNo,
						kill_key_word: this.threeFirst2Form.keyword,
						text_exe_time_kill: this.threeFirst2Form.exeTime,
						kill_type: this.threeFirst2Form.seconds,
						userMip: this.$store.state.username
					}
				}
				//请求接口并禁用按钮
				if (['exe','threeKill'].indexOf(type) != -1) {
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
			sizeChange (pageSize) {
				app.tools.sizeChange(this, pageSize, this.activeName === 'two' ? 'two' : this.processActiveName)
			},
			currentChange (currentPage) {
				app.tools.currentChange(this, currentPage, this.activeName === 'two' ? 'two' : this.processActiveName)
			},
			//关闭对话框需将数据清空
			closeDialog () {
				this.dialogVisible = false
			},
			editRow (row) {
				this.exe_sql = row.log;
				this.dialogVisible = true;
				
			},
			resetForm (name) {
				app.tools.resetFormData(this[name + "Form"])
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
			      this.twoDeptList.push(i)
			      this.threeDeptList.push(i)
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
			      this.twoEnvTypeList.push(i)
			      this.threeEnvTypeList.push(i)
			    }
			  })
			},
			getHostList (val) {
				//主机清空
				this[this.activeName + 'Form'].host = ''
				this[this.activeName + 'HostList'] = []
				//主机清空同时清除定时器
				this.activeName === 'three' && clearInterval(this.timer)
				val && app.post('/Gaea_database/getServer', {
				  appId: val + ''
				}, response => {
				  for (let i of response.data.data.serverList) {
				    this[this.activeName + 'HostList'].push({
				      label: i.role + i.ip + ':' + i.port,
				      value: i.tag_id
				    })
				  }
				})
			},

			/*获取应用下拉框内容*/
			getAppList () {
				let formObj = this[this.activeName + 'Form']
				let deptId = formObj.dept
				let envId = formObj.envType
				//应用/主机清空
				formObj.region = ''
				this[this.activeName + 'RegionList'] = []
				formObj.host = ''
				this[this.activeName + 'HostList'] = []

				deptId && envId && app.post('/Gaea_database/getApp', {
				  deptId,
				  envId,
				  appType: 0,
				  userMip: this.$store.state.username
				}, response => {
				  for (let i of response.data.data.appList) {
				    i.label = i.appName
				    i.value = i.appId
				    this[this.activeName + 'RegionList'].push(i)
				  }
				})
			},

			getMysqlInstanceList () {
				app.post('/Gaea_database/mysqlInstanceList', {

				}, response => {
					let res = response.data.data.mysql_instance_list
					//清空table数据
					this.twoAllTableData = []
					//将请求到的数据加入table中
					for (let i of res) {
						this.twoAllTableData.push(i)
					}
					this.twoTotal = this.twoAllTableData.length;
					app.tools.changeTable(this, 'two')
				})
			},

			startStatusProcessing (val) {
				//获取Mysql管理/processlist监控及kill/状态显示
				if (!val) {
					clearInterval(this.timer)
				} else {
					this.timer = window.setInterval(this.getProcessListStatus, 2000)
				}
			},

			getProcessListStatus () {
				app.post('/Gaea_database/processListStatus', {
					server_id: this.threeForm.host + ''
				}, response => {
					let res = response.data.data.load_list
					//清空table数据
					this.hostTableData = []
					//将请求到的数据加入table中
					for (let i of res) {
						this.hostTableData.push(i)
					}
				}, err => {}, false)
			}
		},
		created () {
			/*获取部门下拉框选项内容*/
			this.getDeptList();
			//获取环境下拉列表数据
			this.getEnvList();	
			//获取mysql实例列表清单显示
			this.getMysqlInstanceList()

		},
		destroyed () {
			//组件销毁清除定时器
			clearInterval(this.timer)
		}
	}
</script>