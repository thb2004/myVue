<template>
    <div class='box'>
    	<div class="copy-mange">
    		<div class="main-middle">
	    		<el-tabs v-model="activeName">
					<el-tab-pane label="数据恢复" name="one">
						<div class="compenent-form">
							<el-form rel='form' :model='oneForm' :label-width='labelWidth'>
								<el-row>
									<el-col>
										<p class='title m-b20'>数据恢复由生产环境恢复到非生产环境，请选择数据恢复的源主机和目标主机，恢复截止时间</p>
									</el-col>
									<el-col :md='9' class='required'>
										<el-form-item label="部门">
										    <el-select v-model="oneForm.dept" placeholder="请选择" @change='clearData'  clearable filterable>
										    	<el-option v-for='(item,index) in oneDeptList' :key='index' :label='item.label' :value='item.value'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='{span:9,offset:2}' class='required'>
										<el-form-item label="环境">
										    <el-select v-model="oneForm.envType" placeholder="请选择" @change='getAppList' clearable filterable>
										    	<el-option v-for='(item,index) in oneEnvTypeList' :key='index' :label='item.label' :value='item.value'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col>
										<p class='title m-b20'>选择数据来源</p>
									</el-col>

									<el-col :md='9' class='required'>
										<el-form-item label="源应用">
										    <el-select v-model="oneForm.sourceApplication" placeholder="请选择" @change='getServerList("source")' clearable filterable>
										    	<el-option v-for='(item,index) in onesourceApplicationList' :key='index' :label='item.label' :value='item.value'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='{span:9,offset:2}' class='required'>
										<el-form-item label="源主机IP">
										    <el-select v-model="oneForm.sourceHostIp" placeholder="请选择" @change='getHostName("source")'>
										    	<el-option v-for='(item,index) in onesourceHostIpList' :key='index' :label='item.label' :value='item.value'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='9'>
										<el-form-item label='源主机名'>
										   <el-input v-model="oneForm.sourceHostName" disabled></el-input>
										</el-form-item>
									</el-col>

									<el-col>
										<p class='title m-b20'>选择恢复目标</p>
									</el-col>

									<el-col :md='9' class='required'>
										<el-form-item label="目标应用">
										    <el-select v-model="oneForm.targetApplication" placeholder="请选择" @change='getServerList("target")' clearable filterable>
										    	<el-option v-for='(item,index) in onetargetApplicationList' :key='index' :label='item.label' :value='item.value'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='{span:9,offset:2}' class='required'>
										<el-form-item label="目标主机IP">
										    <el-select v-model="oneForm.targetHostIp" placeholder="请选择"  @change='getHostName("target")'>
										    	<el-option v-for='(item,index) in onetargetHostIpList' :key='index' :label='item.label' :value='item.value'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='9'>
										<el-form-item label='目标主机名'>
										   <el-input v-model="oneForm.targetHostName" disabled></el-input>
										</el-form-item>
									</el-col>

									<el-col>
										<p class='title m-b20'></p>
									</el-col>

									<el-col :md='9' class='required'>
										<el-form-item label='恢复时间'>
										   <el-date-picker
									         v-model="oneForm.recoveryTime"
									         type="datetime"
									         value-format='yyyy-MM-dd HH:mm:ss'
									         popper-class='my-animation'
									         placeholder="选择时间">
									       </el-date-picker>
										</el-form-item>
									</el-col>

									<el-col :md='{span:9,offset:2}' class='required'>
										<el-form-item label="审批DBA">
										    <el-select v-model="oneForm.DBA" placeholder="请选择" clearable filterable>
										    	<el-option v-for='(item,index) in oneDBAList' :key='index' :label='item.label' :value='item.value'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

								</el-row>

								<div class='btn-group-lg'>
								    <el-button type="primary" @click="onSubmit" :disabled='btnDisabled'>提 交</el-button>
								    <el-button @click="resetForm('one')">重 置</el-button>
								</div>
							</el-form>
						</div>
					</el-tab-pane>

					<el-tab-pane label="数据覆盖" name="two">
						<el-tabs v-model="childActiveName">
							<el-form rel='form' :model='twoForm' :label-width='labelWidth'>
								<div class="compenent-form">
									<el-row>
										<el-col>
											<p class='title m-b20'>数据覆盖由生产环境覆盖到非生产环境，请选择数据覆盖的源主机和目标主机</p>
										</el-col>

										<el-col :md='9'>
											<el-form-item label="部门">
											    <el-select v-model="twoForm.dept" placeholder="请选择" @change='clearData' clearable filterable>
											    	<el-option v-for='(item,index) in twoDeptList' :key='index' :label='item.label' :value='item.value'></el-option>
											    </el-select>
											</el-form-item>
										</el-col>

										<el-col :md='{span:9,offset:2}'>
											<el-form-item label="环境">
											    <el-select v-model="twoForm.envType" placeholder="请选择" @change='getAppList' clearable filterable>
											    	<el-option v-for='(item,index) in twoEnvTypeList' :key='index' :label='item.label' :value='item.value'></el-option>
											    </el-select>
											</el-form-item>
										</el-col>

										<el-col>
											<p class='title m-b20'>选择数据来源</p>
										</el-col>

										<el-col :md='9'>
											<el-form-item label="源应用">
											    <el-select v-model="twoForm.sourceApplication" placeholder="请选择" @change='getServerList("source")' clearable filterable>
											    	<el-option v-for='(item,index) in twosourceApplicationList' :key='index' :label='item.label' :value='item.value'></el-option>
											    </el-select>
											</el-form-item>
										</el-col>

										<el-col :md='{span:9,offset:2}'>
											<el-form-item label="源主机IP">
											    <el-select v-model="twoForm.sourceHostIp" placeholder="请选择" @change='getHostName("source")'>
											    	<el-option v-for='(item,index) in twosourceHostIpList' :key='index' :label='item.label' :value='item.value'></el-option>
											    </el-select>
											</el-form-item>
										</el-col>

										<el-col :md='9'>
											<el-form-item label='源主机名'>
											   <el-input v-model="twoForm.sourceHostName" disabled></el-input>
											</el-form-item>
										</el-col>

										<el-col :md='{span:9,offset:2}' v-if='childActiveName==="three"'>
											<el-form-item label="源库">
											    <el-select v-model="twoForm.sourceDB" placeholder="请选择">
											    	<el-option v-for='(item,index) in twosourceDBList' :key='index' :label='item.label' :value='item.value'></el-option>
											    </el-select>
											</el-form-item>
										</el-col>

										<el-col :md='9' v-if='childActiveName==="three"'>
											<el-form-item label='源表'>
											   <el-input v-model="twoForm.sourceTable" placeholder='多个表用英文逗号隔开,如table1,table2,table3...'></el-input>
											</el-form-item>
										</el-col>

										<el-col :md='{span:9,offset:2}' v-if='childActiveName==="two"'>
											<el-form-item label='源库'>
											   <el-input v-model="twoForm.sourceLib" placeholder='多个库用英文逗号隔开,如db1,db2,db3...'></el-input>
											</el-form-item>
										</el-col>

										<el-col>
											<p class='title m-b20'>选择覆盖目标</p>
										</el-col>

										<el-col :md='9'>
											<el-form-item label="目标应用">
											    <el-select v-model="twoForm.targetApplication" placeholder="请选择" @change='getServerList("target")' clearable filterable>
											    	<el-option v-for='(item,index) in twotargetApplicationList' :key='index' :label='item.label' :value='item.value'></el-option>
											    </el-select>
											</el-form-item>
										</el-col>

										<el-col :md='{span:9,offset:2}'>
											<el-form-item label="目标主机IP">
											    <el-select v-model="twoForm.targetHostIp" placeholder="请选择"  @change='getHostName("target")'>
											    	<el-option v-for='(item,index) in twotargetHostIpList' :key='index' :label='item.label' :value='item.value'></el-option>
											    </el-select>
											</el-form-item>
										</el-col>

										<el-col :md='9'>
											<el-form-item label='目标主机名'>
											   <el-input v-model="twoForm.targetHostName" disabled></el-input>
											</el-form-item>
										</el-col>

										<el-col :md='{span:9,offset:2}' v-if='childActiveName==="two"'>
											<el-form-item label='目标库'>
											   <el-input v-model="twoForm.targetLib" placeholder='多个库用英文逗号隔开,如db1,db2,db3...'></el-input>
											</el-form-item>
										</el-col>

										<el-col :md='{span:9,offset:2}' v-if='childActiveName==="three"'>
											<el-form-item label="目标库">
											    <el-select v-model="twoForm.targetDB" placeholder="请选择">
											    	<el-option v-for='(item,index) in twotargetDBList' :key='index' :label='item.label' :value='item.value'></el-option>
											    </el-select>
											</el-form-item>
										</el-col>


										<el-col>
											<p class='title m-b20'></p>
										</el-col>

										<el-col :md='9'>
											<el-form-item label="审批DBA">
											    <el-select v-model="twoForm.DBA" placeholder="请选择">
											    	<el-option v-for='(item,index) in twoDBAList' :key='index' :label='item.label' :value='item.value'></el-option>
											    </el-select>
											</el-form-item>
										</el-col>

										<el-col v-if='childActiveName==="one"'>
											<el-form-item>
											    <el-checkbox v-model="twoForm.isMaster">是否建立主从关系</el-checkbox>
											</el-form-item>
										</el-col>	
									</el-row>
								</div>
							</el-form>
							<el-tab-pane label="所有库覆盖" name="one">
								<div class="text-center m-b20">
									<el-button class='btn-lg' @click="onSubmit('1')" :disabled='btnDisabled'>所有库覆盖</el-button>
								</div>
							</el-tab-pane>

							<el-tab-pane label="部分库覆盖" name="two">
								<div class="text-center m-b20">
									<el-button class='btn-lg' @click="onSubmit('2')" :disabled='btnDisabled'>部分库覆盖</el-button>
								</div>
							</el-tab-pane>

							<el-tab-pane label="部分表覆盖" name="three">
								<div class="text-center m-b20">
									<el-button class='btn-lg' @click="onSubmit('3')" :disabled='btnDisabled'>部分表覆盖</el-button>
								</div>
							</el-tab-pane>
						</el-tabs>
						
					</el-tab-pane>

					<!-- <el-tab-pane label="DB备份设置" name="three">
						<div class="compenent-form">
							<el-form rel='form' :model='threeForm' :label-width='labelWidth'>
								<el-row>
									<el-col>
										<p class='title m-b20'>选择数据来源</p>
									</el-col>
					
									<el-col :md='9'>
										<el-form-item label="DB域">
										    <el-select v-model="threeForm.DB" placeholder="请选择">
										    	<el-option v-for='(item,index) in threeDBist' :key='index' :label='item.label' :value='item.value'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
					
									<el-col :md='{span:9,offset:2}'>
										<el-form-item label="DB实例">
										    <el-select v-model="threeForm.DBCase" placeholder="请选择">
										    	<el-option v-for='(item,index) in threeDBCaseList' :key='index' :label='item.label' :value='item.value'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
					
									<el-col :md='9'>
										<el-form-item label="备份周期">
										    <el-select v-model="threeForm.backupCycle" placeholder="请选择">
										    	<el-option v-for='(item,index) in threeBackupCycleList' :key='index' :label='item.label' :value='item.value'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
					
									<el-col :md='{span:9,offset:2}'>
										<el-form-item label='备份时间点'>
										   <el-date-picker
									         v-model="threeForm.backupTime"
									         type="datetime"
									         value-format='yyyy-MM-dd HH:mm:ss'
									         placeholder="选择时间">
									       </el-date-picker>
										</el-form-item>
									</el-col>
					
									<el-col :md='20'>
										<el-form-item label='备注'>
											<el-input
												placeholder='请输入'
												type='textarea'
												:rows='2'
												v-model='threeForm.comments'
											></el-input>
										</el-form-item>
									</el-col>
								</el-row>
					
								<div class='btn-group-lg'>
								    <el-button type="primary" @click="onSubmit" :disabled='btnDisabled'>提 交</el-button>
								    <el-button @click="resetForm">重 置</el-button>
								</div>
							</el-form>
						</div>
					</el-tab-pane> -->
					
					<el-tab-pane label="DB备份日志查看" name="four">
						<div class="compenent-form">
							<el-form rel='form' :model='fourForm' :label-width='labelWidth'>
								<el-row>
									<el-col :md='9'>
										<el-form-item label="部门">
										    <el-select v-model="fourForm.dept" placeholder="请选择" @change='clearRelatedData' clearable filterable>
		                 						<el-option v-for='(item,index) in fourDeptList' :key='index' :label='item.label' :value='item.value'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='{span:9,offset:2}'>
										<el-form-item label="环境">
										    <el-select v-model="fourForm.envType" placeholder="请选择" @change='getApp' clearable filterable>
							                    <el-option v-for='(item,index) in fourEnvTypeList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='9'>
										<el-form-item label="应用">
										    <el-select v-model="fourForm.application" @change='getHost' placeholder="请选择" clearable filterable>
							                   <el-option v-for='(item,index) in fourApplicationList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='{span:9,offset:2}'>
										<el-form-item label="主机">
										    <el-select v-model="fourForm.host" placeholder="请选择"  clearable filterable>
							                   <el-option v-for='(item,index) in fourHostList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='9'>
										<el-form-item label='IP'>
										   <el-input v-model="fourForm.IP" placeholder='请输入IP' clearable></el-input>
										</el-form-item>
									</el-col>

									<el-col :md='{span:9,offset:2}'>
										<el-form-item label="备份结果">
										    <el-select v-model="fourForm.backupRes" placeholder="请选择" clearable>
										    	<el-option label='失败' :value='3'></el-option>
										    	<el-option label='成功' :value='2'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='9'>
										<el-form-item label="备份时间大于(秒)">
										    <el-input v-model="fourForm.backupTime" placeholder='请输入' clearable></el-input>
										</el-form-item>
									</el-col>
					
									<el-col :md='{span:9,offset:2}'>
										<el-form-item label="备份文件大于(M)">
										    <el-input v-model="fourForm.backupSize" placeholder='请输入' clearable></el-input>
										</el-form-item>
									</el-col>

									<el-col :md='9'>
										<el-form-item label="备份时间">
										    <el-date-picker
									          v-model="fourForm.date"
									          type="daterange"
									          align="right"
										      unlink-panels
										      range-separator="至"
										      start-placeholder="选择开始日期"
										      end-placeholder="选择结束日期"
										      value-format='yyyy-MM-dd HH:mm:ss'
										      
										      :picker-options="pickerOptions"
										      :default-time="['00:00:00', '23:59:00']"
										    >
										    </el-date-picker>
										</el-form-item>
									</el-col>
								</el-row>
					
								<div class='btn-group-lg'>
								    <el-button type="primary" @click="onSubmit" :disabled='btnDisabled'>查 询</el-button>
								    <el-button @click="resetForm('four')">重 置</el-button>
								</div>
							</el-form>
						</div>

						<div class="empty"></div>

						<div class="compenent-form">
							<v-table 
								:data='fourTableData' 
								:tableHeadName='fourTableHeadName'
								:showOperator='false'
								:isSetTableHeadWidth='true'
								:tableHeadObj='tableHeadObj'
								:showTips='showTips'
								class='m-t20 four-table'
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
						</div>
					</el-tab-pane>
	    		</el-tabs>
    		</div>
    	</div>
    </div>
</template>
<style lang='scss'>
.copy-mange {
  .main-middle {
    padding: 0;
  }
  .el-tabs__header,.compenent-form,{
    padding: 0 20px;
  }
  .four-table, {
	    .cell {
	      .backup_result_log,.role,.name {
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
};
</style>
<script type="text/javascript">
	export default {
		data () {
			return {
				pickerOptions: {
					shortcuts: [
						{
				            text: '今天',
				            onClick(picker) {
				              const date = new Date()
				              date.setHours(0, 0, 0, 0)
				              picker.$emit('pick',[date,new Date()]);
				            }
				        }, 
				        {
				            text: '昨天',
				            onClick(picker) {
				              const date = new Date();
				              date.setTime(date - 3600 * 1000 * 24);
				              picker.$emit('pick',[app.tools.formatDate(new Date(date),2) + ' 00:00:00',app.tools.formatDate(new Date(date),2) + ' 23:59:00']);
				              
				        	}
				        }, 
				        {
				            text: '一周前',
				            onClick(picker) {
				              const date = new Date();
				              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
				              picker.$emit('pick', [date,new Date()]);
				            }
				        },
				        {
				        	text: '最近30天',
				            onClick(picker) {
				              const date = new Date();
				              date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
				              picker.$emit('pick', [date,new Date()]);
				            }
				        },
				        {
				        	text: '这个月',
				            onClick(picker) {
				              const firstDate = new Date();
				              firstDate.setDate(1); //第一天

				              const endDate = new Date(firstDate);

				              endDate.setMonth(firstDate.getMonth()+1);

				              endDate.setDate(0);
				              picker.$emit('pick', [firstDate, endDate]);
				            }
				        },
				        {
				        	text: '上个月',
				            onClick(picker) {
				              var nowdays = new Date();  
				              var year = nowdays.getFullYear();  
				              var month = nowdays.getMonth();  
				              if(month==0)  
				              {  
				                  month=12;  
				                  year=year-1;  
				              }  
				              if (month < 10) {  
				                  month = "0" + month;  
				              }  
				              var firstDay = year + "/" + month + "/" + "01";//上个月的第一天  
				                
				                
				                
				              var myDate = new Date(year, month, 0);  
				              var lastDay = year + "/" + month + "/" + myDate.getDate();//上个月的最后一天  
				              picker.$emit('pick', [new Date(firstDay),new Date(lastDay)]);
				            }
				        }
					]
				},

				labelWidth: '140px',
				btnDisabled: false,
				childActiveName: 'one',
				activeName: 'one',
				oneForm: {
					dept: '',								//部门
					envType: '',							//环境类型
					sourceApplication: '',					//源应用
					sourceHostIp: '',						//源主机ip
					sourceHostName: '',						//源主机名
					targetApplication: '',					//目标应用
					targetHostIp: '',						//目标主机ip
					targetHostName: '',						//目标主机名
					recoveryTime: '',						//恢复时间
					DBA: '',								//审批dba
				},

				oneDeptList: [],
				oneEnvTypeList: [],
				onesourceApplicationList: [],
				onesourceHostIpList: [],
				onetargetApplicationList: [],
				onetargetHostIpList: [],
				oneDBAList: [],

				twoForm: {
					dept: '',								//部门
					envType: '',							//环境类型
					sourceApplication: '',					//源应用
					sourceHostIp: '',						//源主机ip
					sourceHostName: '',						//源主机名
					targetApplication: '',					//目标应用
					targetHostIp: '',						//目标主机ip
					targetHostName: '',						//目标主机名
					DBA: '',								//审批dba
					isMaster: false,						//是否主从
					sourceLib: '',							//源库
					targetLib: '',							//目标库
					sourceDB: '',							//源db
					sourceTable: '',						//源表
					targetDB: '',							//目标db
				},
				twosourceDBList: [],
				twotargetDBList: [],
				twoDeptList: [],
				twoEnvTypeList: [],
				twosourceApplicationList: [],
				twosourceHostIpList: [],
				twotargetApplicationList: [],
				twotargetHostIpList: [],
				twoDBAList: [],
				threeForm: {
					DB: '',
					DBCase: '',
					backupCycle: '',
					backupTime: '',
					comments: ''
				},
				threeDBist: [],
				threeDBCaseList: [],
				threeBackupCycleList: [],

				fourForm: {
					dept: '',				//部门
					envType: '',			//环境
					application: '',		//应用
					host: '',				//主机
					IP: '',					//ip
					backupRes: '',			//备份结果
					backupTime: '',			//备份时间
					backupSize: '',			//备份文件大小
					date: [app.tools.formatDate(new Date(),2) + ' 00:00:00',app.tools.formatDate(new Date())],//备份时间
				},
				fourTableHeadName: {
					id: 'ID',
					name: '应用',
					ip: 'IP',
					role: 'ROLE',
					backup_type: '备份类型',
					backup_result_type: '备份结果状态',
					backup_start_time: '备份开始时间',
					backup_end_time: '备份结束时间',
					backup_cost_time: '备份花费时间(分)',
					backup_file_size: '备份文件大小(M)',
					backup_result_log: '备份结果日志',
					create_time: '创建时间'
				},
				tableHeadObj: {
					id: '50',

					backup_result_type: '110',
					backup_start_time: '110',
					backup_end_time: '110',
					backup_cost_time: '110',
					backup_file_size: '110',
					backup_result_log: '110',
				},
				showTips: {
					name: true,
					role: true,
					backup_result_log: true,
				},
				fourDeptList: [],
				fourEnvTypeList: [],
				fourApplicationList: [],
				fourHostList: [],
				fourTableData: [],
				fourAllTableData: [],
				fourPageSize: 10,
				fourCurrentPage: 1,
				fourTotal: 10,
			}
		},
		methods: {
			error () {
				this.$alert('操作失败', {
					title: '提示',
					type: 'info'
				})
				this.btnDisabled = false
			},
			sizeChange (pageSize) {
				app.tools.sizeChange(this, pageSize)
			},
			currentChange (currentPage) {
				app.tools.currentChange(this, currentPage)
			},
			onSubmit (type) {
				let res = this.validatorForm (type)
				let url = '/Gaea_database/dataRecovery'
				let formObj = this[this.activeName + 'Form']
				let params = {
					source_id: formObj.sourceHostIp + '',
					dest_id: formObj.targetHostIp + '',
					time: formObj.recoveryTime,
					review_dba_id: formObj.DBA + '',
					userMip: this.$store.state.username,
				}
				if (res) {
					this.$alert(res, {title: '提示',type: 'info'})
					return
				}
				if (typeof type === 'string') {
					url = '/Gaea_database/dataCover'
					params = {
						source_id: formObj.sourceHostIp + '',
						dest_id: formObj.targetHostIp + '',
						review_dba_id: formObj.DBA + '',
						userMip: this.$store.state.username,
						cover_type: type + '',
					}
					if (type === '1') {				//1代表所有库覆盖
						params.is_checked = formObj.isMaster
						params.source_db = ''
						params.dest_db = ''
						params.source_table = ''
					} else if (type === '2') {		//2代表部分库覆盖
						params.source_db = formObj.sourceLib
						params.dest_db = formObj.targetLib
						params.is_checked = ''
						params.source_table = ''
					} else {						//部分表覆盖
						params.is_checked = ''
						params.source_db = formObj.sourceDB
						params.dest_db = formObj.targetDB
						params.source_table = formObj.sourceTable
					}
				}
				this.btnDisabled = true
				if (this.activeName === 'four') {
					url = '/Gaea_database/dbBackupLogQuery'
					console.log(formObj)
					params = {
						appId: formObj.application || 0,
						serverId: formObj.host || 0,
						IP: formObj.IP.trim(),
						backup_status: formObj.backupRes || 0,
						backup_cost_time: formObj.backupTime,
						backup_file_size: formObj.backupSize,
						query_start_time: formObj.date && formObj.date[0] || '',
						query_end_time: formObj.date && formObj.date[1] || '',
					}
					app.post(url, params, res => {
						this.btnDisabled = false
						let code = res.data.code
						this[this.activeName + 'AllTableData'] = []
						if (code === 'Gaea10071') {						//成功
							for (let i of res.data.data.dbBackupLogList) {
								i.backup_end_time = app.tools.formatDate(i.backup_end_time)
								i.backup_start_time = app.tools.formatDate(i.backup_start_time)
								this[this.activeName + 'AllTableData'].push(i)
							}
							this[this.activeName + 'Total'] = this[this.activeName + 'AllTableData'].length;
							app.tools.changeTable(this)
						} else if (code != '505') {						//失败给出错误提示
							this.$alert(res.data.msg, {title: '提示',type: 'info'})
						}

					}, this.error)
					return;
				}
				this.$confirm("确认提交？", {
					title: '提示',type: 'info',
					callback: (action, instance) => {
						if (action === 'confirm') {
							app.post(url, params, res => {
								let code = res.data.code
								if (code === 'Gaea10033' || code === 'Gaea10032') {		//成功
									this.$alert('已发送邮件至审批DBA，结果请查看邮件~', {title: '提示',type: 'info'})
								} else if (code != '505') {
									this.$alert(res.data.msg, {title: '提示',type: 'info'})
								}
								this.btnDisabled = false
							}, this.error)
						} else {
							this.btnDisabled = false
						}
					}
				})
			},
			validatorForm (type) {
				let msg = ''
				let formObj = this[this.activeName + 'Form']
				if (this.activeName === 'four') {
					if (formObj.dept && !formObj.application) {
						return '请选择部门/应用'
					}
					if (formObj.IP.trim()) {
						return app.validator.ipValidate(formObj.IP.trim())
					}
				} else if (!formObj.dept) {
					msg = '请选择部门'
				} else if (!formObj.envType) {
					msg = '请选择环境类型'
				} else if (!formObj.sourceApplication) {
					msg = '请选择源应用'
				} else if (!formObj.sourceHostIp) {
					msg = '请选择源主机'
				} else if (type === '2' && !formObj.sourceLib) {
					msg = '请填写源库'
				} else if (type === '3' && !formObj.sourceTable) {
					msg = '请填写源表'
				} else if (!formObj.targetApplication) {
					msg = '请选择目标应用'
				} else if (!formObj.targetHostIp) {
					msg = '请选择目标主机'
				} else if (type === '2' && !formObj.targetLib) {
					msg = '请填写目标库'
				} else if (typeof type === 'object' && !formObj.recoveryTime) {
					msg = '恢复时间不能为空!!'
				} else if (!formObj.DBA) {
					msg = '请选择审批DBA!!'
				} else if (typeof type === 'object' && formObj.recoveryTime) {
					msg = this.validateTime()
				}
				return msg
			},
			validateTime () {
				let msg = ''
				let d = new Date();
				d.setDate(d.getDate() - 2);
				let year = d.getFullYear();
				let mon = ('00' + (d.getMonth() + 1)).substr(-2);
				let day = ('00' + d.getDate()).substr(-2);
				let two_day = year + '-' + mon + '-' + day + ' 01:00:00'
				let currentTime = new Date().getTime();
				let chooseTime = new Date(this[this.activeName + 'Form'].recoveryTime).getTime()
				if (chooseTime > currentTime) {
					msg = '恢复时间应早于当前时间！'
				} else if (this[this.activeName + 'Form'].recoveryTime <= two_day) {
					msg = '恢复时间应晚于' + two_day
				}
				return msg
			},
			clearData (val) {
				let formObj = this[this.activeName + 'Form']
				//环境清空
				formObj.envType = ''

				//目标应用清空
				formObj.targetApplication = ''
				this[this.activeName + 'targetApplicationList'] = []

				//目标主机ip清空
				formObj.targetHostIp = ''
				this[this.activeName + 'targetHostIpList'] = []

				//目标主机名清空
				formObj.targetHostName = ''
				this[this.activeName + 'targetHostNameList'] = []



				//源应用清空
				formObj.sourceApplication = ''
				this[this.activeName + 'sourceApplicationList'] = []

				//源主机ip清空
				formObj.sourceHostIp = ''
				this[this.activeName + 'sourceHostIpList'] = []

				//源主机名清空
				formObj.sourceHostName = ''
				this[this.activeName + 'sourceHostNameList'] = []

				if (this.childActiveName === 'three') {
					//源DB清空
					formObj.sourceDB = ''
					this[this.activeName + 'sourceDBList'] = []
					//目标DB清空
					formObj.targetDB = ''
					this[this.activeName + 'targetDBBList'] = []
				}

				//查询目标应用
				val && app.post('/Gaea_database/getAppDest', {
					deptId: val,
                    userMip: this.$store.state.username
				}, response => {
					for (let i of response.data.data.appListDest) {
						i.label = i.appName
						i.value = i.appId
						this[this.activeName + 'targetApplicationList'].push(i)
					}
				})
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
						this.fourDeptList.push(i)
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
						this.fourEnvTypeList.push(i)
					}
				})
			},
			//获取源主机名
			getHostName (type) {
				let formObj = this[this.activeName + 'Form']
				if (this.childActiveName === 'three') {
					//DB清空
					formObj[type+ 'DB'] = ''
					this[this.activeName + type + 'DBList'] = []
					this.getDbList(type)
				}
				app.post('/Gaea_database/getHostName', {
					tag_id: formObj[type + 'HostIp'] + '',
				}, response => {
					formObj[type + 'HostName'] = response.data.data[0].hostName || '';
				})
			},
			getDbList (type) {
				app.post('/Gaea_database/getDB', {
					serverId: this[this.activeName + 'Form'][type + 'HostIp'] + ''
				}, res => {
					for (let i of res.data.dbList) {
						i.label = i.dbName
						i.value = i.dbName
						this[this.activeName + type + 'DBList'].push(i)
					}
				})
			},
			//获取主机列表
			getServerList (type) {
				let formObj = this[this.activeName + 'Form']
				//主机IP清空
				formObj[type + 'HostIp'] = ''
				this[this.activeName + '' + type + 'HostIpList'] = []

				//主机名清空
				formObj[type + 'HostName'] = ''
				this[this.activeName + '' + type + 'HostNameList'] = []


				if (this.childActiveName === 'three') {
					//DB清空
					formObj[type + 'DB'] = ''
					this[this.activeName + type + 'DBList'] = []
				}
				let appId = formObj[type + 'Application'] + '';
				let url = '/Gaea_database/' + (type === 'target' ? 'getServerDest' : 'getServer')
				appId && app.post(url, {
					appId
				}, response => {
					for (let i of response.data.data.serverList) {
						this[this.activeName + '' + type + 'HostIpList'].push({
							label: i.role + i.ip + ':' + i.port,
							value: i.tag_id
						})
					}
				})
			},
			//获取目标应用
			getAppList (val) {
				let formObj = this[this.activeName + 'Form']
				//源应用清空
				formObj.sourceApplication = ''
				this[this.activeName + 'sourceApplicationList'] = []

				//源主机ip清空
				formObj.sourceHostIp = ''
				this[this.activeName + 'sourceHostIpList'] = []

				//源主机名清空
				formObj.sourceHostName = ''
				this[this.activeName + 'sourceHostNameList'] = []

				if (this.childActiveName === 'three') {
					//源DB清空
					formObj.sourceDB = ''
					this[this.activeName + 'sourceDBDBList'] = []
				}
				//查询源应用
				val && app.post('/Gaea_database/getApp', {
					deptId: this[this.activeName + 'Form'].dept,
					appType: 0,
                    envId: val,
                    userMip: this.$store.state.username
				}, response => {
					for (let i of response.data.data.appList) {
						i.label = i.appName
						i.value = i.appId
						this[this.activeName + 'sourceApplicationList'].push(i)
					}
				})
			},

			//获取DBAlist数据
			getDBAList () {
				app.post('/Gaea_database/getDBAList', {
					appId: '',
					getType: '2'
				}, response => {
					for (let i of response.data.data.dbaList) {
						this[this.activeName + 'DBAList'].push({
							label: i.dbaName,
							value: i.id
						})
						this.twoDBAList.push({
							label: i.dbaName,
							value: i.id
						})
					}
				})
			},

			resetForm (name) {
				app.tools.resetFormData(this[name + "Form"])
			},
			/*清除联动关系的数据*/
			clearRelatedData () {
				//清空环境所选内容
				this[this.activeName + 'Form'].envType=""
				//清空应用
				this[this.activeName + 'Form'].application = ''
				this[this.activeName + 'Form'].host = ''
				//清空主机
				this[this.activeName + 'ApplicationList'] = []
				this[this.activeName + 'HostList'] = []
			},
			/*获取应用数据*/
			getApp (val) {
				//应用/主机清空/审批人清空
				let formObj = this[this.activeName + 'Form']
				formObj.application = ''
				formObj.host = ''
				this[this.activeName + 'ApplicationList'] = []
				this[this.activeName + 'HostList'] = []
				val && app.post('/Gaea_database/getApp', {
					deptId: formObj.dept,
                    envId: val,
                    appType: 0,
                    userMip: this.$store.state.username
				}, response => {
					for (let i of response.data.data.appList) {
						i.label = i.appName
						i.value = i.appId
						this[this.activeName + 'ApplicationList'].push(i)
					}
				})
			},
			/*获取主机*/
			getHost (val) {
				let formObj = this[this.activeName + 'Form']
				//主机清空
				formObj.host = ''
				this[this.activeName + 'HostList'] = []

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
			}

		},
		created () {
			/*获取部门下拉框选项内容*/
			this.getDeptList();
			//获取环境下拉列表数据
			this.getEnvList();
			//获取DBA数据
			this.getDBAList()
		}
	}
</script>