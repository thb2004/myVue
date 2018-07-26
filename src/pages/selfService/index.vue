<template>
    <div class='box'>
    	<div class="self-service">
    		<div class='main-middle'>
	    		<el-tabs 
	    			v-model="activeName"
	    		>
					<el-tab-pane label="平台访问权限申请" name="one">
						<div class="compenent-form">
							<el-form rel='form' :model='oneForm' :label-width='labelWidth1'>
								<el-row>
									<el-col :md='6' :sm='11' class='required'>
										<el-form-item label="部门">
										    <el-select v-model="oneForm.region" placeholder="请选择" @change='getRole' clearable filterable>
										    	<el-option v-for='(item,index) in oneRegionList' :key='index' :label='item.label' :value='item.value'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row class='transfer m-b10'>
									<el-col :md='6' :sm='6'>
										<p>没有权限</p>
									</el-col>
									<el-col :md='{span:6,offset:2}' :sm='{span:6,offset:2}'>
										<p>只读权限 <span>（拥有慢查询和创建数据库的权限）</span></p>
									</el-col>
									<el-col :md='{span:6,offset:2}' :sm='{span:6,offset:2}'>
										<p>读写权限<span>（拥有DDL/DML数据库授权及慢查询权限）</span></p>
									</el-col>
								</el-row>
								<el-row class='transfer'>
									<el-col :md='6' :sm='6'>
										<select multiple style='width:100%' v-model='oneForm.noRights' @change='setButton("left")'>
											<option v-for='(item,index) in leftList' :key='index' :value='item.appId'>{{item.appName}}</option>
										</select>
									</el-col>
									<el-col :md='2' :sm='2'>
										<div class='flex'>
											<div>
												<el-button icon="el-icon-arrow-left" class='m-t10'
													size='small'
													@click='moveSelected(middleList,oneForm.readRights,leftList,leftObj, "middle")' 
													:disabled='middlePrevDisabled'>
												</el-button><br>
												<el-button icon="el-icon-arrow-right"
													size='small'
													@click='moveSelected(leftList,oneForm.noRights,middleList,middleObj, "left")' 
													:disabled='leftNextDisabled'>
												</el-button>
											</div>
										</div>
									</el-col>
									<el-col :md='6' :sm='6'>
										<select multiple style='width:100%' v-model='oneForm.readRights' @change='setButton("middle")'>
											<option v-for='(item,index) in middleList' :key='index' :value='item.appId'>{{item.appName}}</option>
										</select>
									</el-col>
									<el-col :md='2' :sm='2'>
										<div class='flex'>
											<div>
												<el-button icon="el-icon-arrow-left" class='m-t10'
													size='small'
													@click='moveSelected(rightList,oneForm.readWriteRights,middleList,middleObj, "right")' 
													:disabled='rightPrevDisabled'>
												</el-button><br>
												<el-button icon="el-icon-arrow-right"
													size='small' 
													@click='moveSelected(middleList,oneForm.readRights,rightList,rightObj, "middle")' 
													:disabled='middleNextDisabled'>
												</el-button>
											</div>
										</div>
									</el-col>
									<el-col :md='6' :sm='6'>
										<select multiple style='width:100%' v-model='oneForm.readWriteRights' @change='setButton("right")'>
											<option v-for='(item,index) in rightList' :key='index' :value='item.appId'>{{item.appName}}</option>
										</select>
									</el-col>
								</el-row>

								<el-row class='m-t20'>
									<el-col :md='22' :sm='22' class='required'>
										<el-form-item class='operator-comment' label="操作备注">
										    <el-input
										      placeholder="请输入内容"
										      v-model="oneForm.opComment"
										      type='textarea'
										      :rows='3'
										    >
										    </el-input>
										</el-form-item>
									</el-col>
								</el-row>
			
								<el-row>
									<el-col :md='6' :sm='11' class='required'>
										<el-form-item label="审批人">
										    <el-select v-model="oneForm.approver" placeholder="选择DBA" clearable filterable>
										      	<el-option v-for='(item,index) in oneApproverList' :key='index' :label='item.label' :value='item.value'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
								</el-row>

								<div class='btn-group-lg'>
								    <el-button type="primary" @click="onSubmit" :disabled='oneSubmitBtnDisabled'>提 交</el-button>
								    <el-button @click="resetForm">重 置</el-button>
								</div>
							</el-form>
						</div>

						<div class="empty"></div>

						<div class="compenent-form">
							<v-table 
								:data='oneTableData' 
								:tableHeadName='oneTableHeadName'
								:showOperator='false'
								class='m-t20 one-table'
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

					<el-tab-pane label="DB创建及访问账号申请" name="two">
						<div class="compenent-form">
							<!-- <p class="my-remark"><span>请选择Mysql授权主机所属部门，应用,主机,DB,被授权人，授权类型，授权IP范围~账号访问密码系统随机生成</span></p> -->
							<el-form rel='twoForm' :model='twoForm' :label-width='labelWidth'>
								<el-row>
									<el-col :md='9' class='required'>
										<el-form-item label="部门">
										    <el-select v-model="twoForm.region" placeholder="请选择" @change='clearData' clearable filterable>
		                 						<el-option v-for='(item,index) in oneRegionList' :key='index' :label='item.label' :value='item.value'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='{span:9,offset:2}' class='required'>
										<el-form-item label="环境">
										    <el-select v-model="twoForm.envType" placeholder="请选择" @change='getAppList' clearable filterable>
							                    <el-option v-for='(item,index) in twoEnvTypeList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
								</el-row>

								<el-row>
									<el-col :md='9' class='required'>
										<el-form-item label="应用">
										    <el-select v-model="twoForm.application" placeholder="请选择" @change='getHostList' clearable filterable>
							                   <el-option v-for='(item,index) in twoApplicationList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='{span:9,offset:2}' class='required'>
										<el-form-item label="主机">
										    <el-select v-model="twoForm.host" placeholder="请选择" @change='getDBList(true)' clearable filterable>
							                   <el-option v-for='(item,index) in twoHostList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
								</el-row>

								<el-row>
									<el-col>
										<p class='title m-b20'>DB创建申请</p>
									</el-col>
									<el-col :md='4'>
										<el-form-item :label-width='"0"'>
										    <el-checkbox v-model="twoForm.DB" @change='getDbList1'>创建DB</el-checkbox>
										</el-form-item>
									</el-col>

									<el-col :md='9'>
										<el-form-item label="DB名称" :label-width='labelWidth'>
											<el-input 
												v-model="twoForm.dbName" 
												:disabled='dbDisabled' 
												@blur='getDBList(false)'
												@keyup.native='twoForm.dbName=twoForm.dbName.replace(/\W/g, "")'
											>
											</el-input>
										</el-form-item>
									</el-col>

									<el-col :md='{span:9,offset:2}'>
										<el-form-item label="DB描述" :label-width='labelWidth'>
											<el-input 
												v-model="twoForm.DBDesc" 
												:disabled='dbDisabled'
												@keyup.native='twoForm.DBDesc=twoForm.DBDesc.replace(/[<>]/g, "")'
											></el-input>
										</el-form-item>
									</el-col>
								</el-row>

								<el-row>
									<el-col>
										<p class='title m-b20'>创建新数据库用户申请</p>
									</el-col>
									<el-col :md='4'>
										<el-form-item  :label-width='"0"'>
										    <el-checkbox v-model="twoForm.newDbUser" @change='createNewDatabase'>创建新数据库用户</el-checkbox>
										</el-form-item>
									</el-col>

									<el-col :md='9'>
										<el-form-item label="数据库用户名称" :label-width='labelWidth'>
										    <el-input 
											    v-model="twoForm.dbUsername" 
											    :disabled='dbUsernameDisabled' 
											    @blur='getDBUserList'
											    @keyup.native='twoForm.dbUsername=twoForm.dbUsername.replace(/\W/g, "")'
										    ></el-input>
										</el-form-item>
									</el-col>

								</el-row>

								<el-row>
									<el-col>
										<p class='title m-b20'>账号访问授权申请</p>
									</el-col>
									<el-col :md='9' class='required'>
										<el-form-item label='授权DB'>
										    <el-select v-model="twoForm.permission" placeholder="请选择" clearable filterable>
							                   <el-option v-for='(item,index) in twoPermissionList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='{span:9,offset:2}' class='required'>
										<el-form-item label="用户名">
										    <el-select v-model="twoForm.username" placeholder="请选择">
							                   <el-option v-for='(item,index) in twoUsernameList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :md='9' class='required'>
										<el-form-item label="权限类型">
										    <el-select v-model="twoForm.permissionType" placeholder="请选择">
										    	<el-option value="0" label='选择授权类型'></el-option>
								                <el-option value="1" label='查询权限'></el-option>
								                <el-option value="2" label='应用权限'></el-option>
								                <el-option value="4" label='view+存储过程权限'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='{span:9,offset:2}' class='required'>
										<el-form-item label="审批人">
										    <el-select v-model="twoForm.approver" placeholder="请选择" clearable filterable>
							                   <el-option v-for='(item,index) in twoApproverList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
								</el-row>

								<el-row>
									<el-col>
										<p class='title m-b20'>特殊权限录入(建议直接使用上述方式申请，手工录入，若命令不对，可能会被DBA驳回)</p>
									</el-col>
									<el-col :md='9'>
										<el-form-item label='特殊权限'>
										   <el-input type="textarea" v-model="twoForm.specialPowers" :disabled='privateDisabled' :rows='3'
													placeholder="直接输入授权命令，密码用单引号括起来，比如grant select on testdb.table_a to abc@'%'identified by 'abc'"		
										   ></el-input>
										</el-form-item>
									</el-col>

									<el-col :md='{span:9,offset:2}' class='required'>
										<el-form-item label='申请备注'>
										   <el-input type="textarea" v-model="twoForm.opComment" placeholder='请输入申请备注' :rows='3'></el-input>
										</el-form-item>
									</el-col>

								</el-row>

								<div class='btn-group-lg'>
								    <el-button type="primary" @click="onSubmit">提 交</el-button>
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
								:operatorText='"查看详情"'
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

					<el-tab-pane label="DDL/DML审核入库" name="three">
						<div class="compenent-form">
							<!-- <p class="my-remark"><span>请选择Mysql主机所属域,主机,DB,并输入执行命令~</span></p> -->
							<el-form rel='threeForm' :model='threeForm' :label-width='labelWidth'>
								<el-row>
									<el-col :md='9' class='required'>
										<el-form-item label="部门">
										    <el-select v-model="threeForm.region" placeholder="请选择" @change='clearData' clearable filterable>
		                 						<el-option v-for='(item,index) in threeRegionList' :key='index' :label='item.label' :value='item.value'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='{span:9,offset:1}' class='required'>
										<el-form-item label="环境">
										    <el-select v-model="threeForm.envType" placeholder="请选择" @change='getAppList' clearable filterable>
							                    <el-option v-for='(item,index) in threeEnvTypeList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='9' class='required'>
										<el-form-item label="应用">
										    <el-select v-model="threeForm.application" placeholder="请选择" @change='getHostList' clearable filterable>
							                   <el-option v-for='(item,index) in threeApplicationList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='{span:9,offset:1}' class='required'>
										<el-form-item label="主机">
										    <el-select v-model="threeForm.host" placeholder="请选择" @change='getDBList(false)' clearable filterable>
							                   <el-option v-for='(item,index) in threeHostList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='9' class='required'>
										<el-form-item label="DB">
										    <el-select v-model="threeForm.dbName" placeholder="请选择" clearable filterable>
							                   <el-option v-for='(item,index) in threeDBList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='{span:9,offset:1}' class='required'>
										<el-form-item label="审批人">
										    <el-select v-model="threeForm.approver" placeholder="请选择" clearable filterable>
							                   <el-option v-for='(item,index) in threeApproverList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='19' class='required'>
										<el-form-item label='DDL/DML命令'>
										   <el-input type="textarea" v-model="threeForm.command" :rows='5'></el-input>
										</el-form-item>
									</el-col>

									<el-col :md='19' class='required'>
										<el-form-item label='操作备注'>
										   <el-input type="textarea" v-model="threeForm.opComment"></el-input>
										</el-form-item>
									</el-col>

									

									<el-col :md='19'>
										<el-form-item label='检查结果输出'>
										   <el-input type="textarea" v-model="checkOutMsg" disabled></el-input>
										</el-form-item>
									</el-col>

									<el-col :md='19'>
										<el-form-item label='执行结果输出'>
										   <el-input type="textarea" v-model="resultOutPrint" disabled></el-input>
										</el-form-item>
									</el-col>

									<!-- <el-col :md='9'>
										<el-form-item label='输入日期'>
										   <el-date-picker
									         v-model="startTime"
									         format='yyyy-MM-dd HH:mm:ss'
									         value-format='yyyy-MM-dd HH:mm:ss'
									         type="datetime"
									         placeholder="选择日期时间">
									       </el-date-picker>
										</el-form-item>
									</el-col>

									<el-col :md='{span:9,offset:1}'>
										<el-form-item label='执行结果输出'>
										   <el-input type="textarea" v-model="resultOutPrint" disabled></el-input>
										</el-form-item>
									</el-col> -->

									

								</el-row>

								<div class="text-center m-b20">
									<el-button type="primary" @click="onSubmit('preCheck')" class='btn-lg'>预检查</el-button>
									<el-button type="primary" class='btn-lg' @click="onSubmit('immediate')" :disabled='threeSubmitBtnDisabled' :class='["btn-lg",threeSubmitBtnDisabled ? "my-disabled" : ""]'>提 交</el-button>
									<el-button @click="resetForm" class='btn-lg btn-normal'>重 置</el-button>
									<el-button type="primary" @click="openLink" class='btn-lg'>sql审核提交标准说明</el-button>
									<!-- <el-button type="primary" class='btn-lg' @click="onSubmit('fixedTime')" size='small' :disabled='submitJobBtn'>提交定时任务</el-button> -->
								</div>

								<!--<div  class='btn-group-lg'>
								    <el-button type="primary" @click="onSubmit">提 交</el-button>
								    <el-button @click="resetForm">重 置</el-button>
								</div> -->

							</el-form>
						</div>

						<div class="empty"></div>

						<el-tabs v-model="childActiveName">
							<el-tab-pane  label="DDL/DML操作履历" name="one">
								<div class="compenent-form">
									<v-table 
										:data='dml_ddl_TableData' 
										:tableHeadName='dml_ddl_tableHeadName'
										:showOperator='false'
										class='one-table'
									></v-table>

									<div class="block pagination-wraper">
									   <el-pagination
									   	 v-if='dml_ddl_TableData.length > 0'
									   	 @size-change='sizeChange'
									   	 @current-change='currentChange'
									     :page-sizes="[10, 15, 20, 25, 30, 35, 40, 45, 50]"
									     layout="total, sizes, prev, pager, next, jumper"
									     :page-size='dml_ddl_PageSize'
									     :total="dml_ddl_Total">
									   </el-pagination>
									</div>
								</div>

							</el-tab-pane>

							<el-tab-pane  label="待入库SQL列表" name="two">
								<!-- <div class="compenent-form">
									<el-form :label-width='170px'>
										<el-row>
											<el-col :md='19'>
												<el-form-item label='当前DDL/DML SQL显示:'>
													<el-input type="textarea" v-model="sqlShowText" :rows='5'></el-input>
												</el-form-item>
											</el-col>
										</el-row>
										<div class="text-center">
											<el-button type="primary" @click="modify" size='small' :disabled='modifyBtn' class='btn-lg'>SQL修正重提交</el-button>
										</div>
									</el-form>
								</div> -->
								<div class="compenent-form">
									<v-table 
										:data='sqlListTableData' 
										:tableHeadName='sqlListTableHeadName'
										:showOperator='false'
										class='one-table'
										@tdClick='tdClick'
									></v-table>

									<div class="block pagination-wraper">
									   <el-pagination
									   	 v-if='sqlListTableData.length > 0'
									   	 @size-change='sizeChange'
									   	 @current-change='currentChange'
									     :page-sizes="[10, 15, 20, 25, 30, 35, 40, 45, 50]"
									     layout="total, sizes, prev, pager, next, jumper"
									     :page-size='sqlListPageSize'
									     :total="sqlListTotal">
									   </el-pagination>
									</div>
								</div>
							</el-tab-pane>
						</el-tabs>

		
					</el-tab-pane>

					<el-tab-pane label="DDL/DML批量入库" name="four">
						<div class="compenent-form">
							<el-row>
								<el-col :md='{span:8,offset:8}' class='text-center m-b20'>
									<el-upload
						               :action="importFileUrl"
						               :data="upLoadData"
						               :file-list="fileList"
						               :on-success='uploadSuccess'
						               :on-error='uploadError'
						               name="fileBatch"
						            >
						               <el-button size="small" type="primary">点击上传</el-button>
						               <!-- <i class="el-icon-upload"></i>
						               <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div> -->
						            </el-upload>
								</el-col>
							</el-row>
							<!-- <p class="my-remark"><span>请选择Mysql主机所属域,主机,DB,并输入执行命令~</span></p> -->
							<el-form rel='threeForm' :model='fourForm' :label-width='labelWidth'>
								<el-row>
									<el-col :md='9' class='required'>
										<el-form-item label="部门">
										    <el-select v-model="fourForm.region" placeholder="请选择" @change='clearData' clearable filterable>
		                 						<el-option v-for='(item,index) in fourRegionList' :key='index' :label='item.label' :value='item.value'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='{span:9,offset:2}' class='required'>
										<el-form-item label="环境">
										    <el-select v-model="fourForm.envType" placeholder="请选择" @change='getAppList' clearable filterable>
							                    <el-option v-for='(item,index) in fourEnvTypeList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='9' class='required'>
										<el-form-item label="应用">
										    <el-select v-model="fourForm.application" placeholder="请选择" @change='getHostList' clearable filterable>
							                   <el-option v-for='(item,index) in fourApplicationList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='{span:9,offset:2}' class='required'>
										<el-form-item label="主机">
										    <el-select v-model="fourForm.host" placeholder="请选择" @change='getDBList(false)' clearable filterable>
							                   <el-option v-for='(item,index) in fourHostList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='9' class='required'>
										<el-form-item label="DB">
										    <el-select v-model="fourForm.dbName" placeholder="请选择" clearable filterable>
							                   <el-option v-for='(item,index) in fourDBList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='{span:9,offset:2}' class='required'>
										<el-form-item label="审批人">
										    <el-select v-model="fourForm.approver" placeholder="请选择" clearable filterable>
							                   <el-option v-for='(item,index) in fourApproverList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>
									<el-col :md='20'>
										<el-form-item label="操作备注" class='required'>
										    <el-input
										      type="textarea"
										      :rows="2"
										      placeholder="请输入内容"
										      v-model="fourForm.opComment">
										    </el-input>
										</el-form-item>
									</el-col>
								</el-row>

								<div class='text-center m-b20'>
									<el-button type="primary" @click="onSubmit('btnCheck')" class='btn-lg'>预检查</el-button>
								    <el-button type="primary" @click="onSubmit('submit')" :disabled='fourSubmitBtnDisabled' :class='["btn-lg",fourSubmitBtnDisabled ? "my-disabled" : ""]'>提 交</el-button>
								    <el-button @click="resetForm" class='btn-lg btn-normal'>重 置</el-button>
								</div>

							</el-form>
						</div>

						<div class="empty"></div>
						<el-tabs v-model="fourActiveName">
							<el-tab-pane  label="DDL/DML操作履历" name="one">
								<div class="compenent-form">
									<v-table 
										:data='fourLogTableData' 
										:tableHeadName='fourLogTableHeadName'
										:showOperator='false'
										class='one-table'
									></v-table>

									<div class="block pagination-wraper">
									   <el-pagination
									   	 v-if='fourLogTableData.length > 0'
									   	 @size-change='sizeChange'
									   	 @current-change='currentChange'
									     :page-sizes="[10, 15, 20, 25, 30, 35, 40, 45, 50]"
									     layout="total, sizes, prev, pager, next, jumper"
									     :page-size='fourLogPageSize'
									     :total="fourLogTotal">
									   </el-pagination>
									</div>
								</div>

							</el-tab-pane>

							<el-tab-pane  label="待入库SQL列表" name="two">
								<div class="compenent-form">
									<v-table 
										:data='fourSqlTableData' 
										:tableHeadName='fourSqlTableHeadName'
										:showOperator='false'
										class='one-table'
										@tdClick='tdClick'
									></v-table>

									<div class="block pagination-wraper">
									   <el-pagination
									   	 v-if='fourSqlTableData.length > 0'
									   	 @size-change='sizeChange'
									   	 @current-change='currentChange'
									     :page-sizes="[10, 15, 20, 25, 30, 35, 40, 45, 50]"
									     layout="total, sizes, prev, pager, next, jumper"
									     :page-size='fourSqlPageSize'
									     :total="fourSqlTotal">
									   </el-pagination>
									</div>
								</div>
							</el-tab-pane>
						</el-tabs>

					</el-tab-pane>
					
					<el-tab-pane label="分片环境DDL/DML审核入库" name="five" v-if='["0","1","2"].indexOf($store.state.userLevel) != -1'>
						<div class="compenent-form">
							<!-- <p class="my-remark"><span></span>请选择Mysql主机所属域,表名,并输入执行命令~</span></p> -->
							<el-form rel='threeForm' :model='fiveForm' :label-width='labelWidth'>
								<el-row>
									<el-col :md='9' class='required'>
										<el-form-item label="部门">
										    <el-select v-model="fiveForm.region" placeholder="请选择" clearable filterable @change='selectDept'>
		                 						<el-option v-for='(item,index) in fiveRegionList' :key='index' :label='item.label' :value='item.value'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='{span:9,offset:2}' class='required'>
										<el-form-item label="应用">
										    <el-select v-model="fiveForm.application" placeholder="请选择" @change='getDBAList' clearable filterable>
										    	<el-option 
											    	v-for='(item,index) in fiveApplicationList' 
											    	:key='index' 
											    	:label='item.label' 
											    	:value='item.value'
										    	>
										    	</el-option>
										    	<!-- <el-option label='渠道MMP生产环境' :value='33'></el-option>
										    	<el-option label='渠道MMP UAT环境' :value='38'></el-option> -->
										    </el-select>
										</el-form-item>
									</el-col>

									<el-col :md='20' class='required'>
										<el-form-item label="输入表名">
										    <el-input
										      placeholder="请输入内容"
										      v-model="fiveForm.tableName">
										    </el-input>
										</el-form-item>
									</el-col>

									<el-col :md='20' class='required'>
										<el-form-item label="DDL/DML命令">
										    <el-input
										      type='textarea'
										      placeholder="请输入内容"
										      :rows='5'
										      v-model="fiveForm.command">
										    </el-input>
										</el-form-item>
									</el-col>

									<el-col :md='20' class='required'>
										<el-form-item label="操作备注">
										    <el-input
										      type='textarea'
										      placeholder="请输入内容"
										      v-model="fiveForm.opComment">
										    </el-input>
										</el-form-item>
									</el-col>

									<el-col :md='9' class='required'>
										<el-form-item label="审批人">
										    <el-select v-model="fiveForm.approver" placeholder="请选择" clearable filterable>
							                   <el-option v-for='(item,index) in fiveApproverList' :label='item.label' :value='item.value' :key='index'></el-option>
										    </el-select>
										</el-form-item>
									</el-col>

									<!-- <el-col :md='20'>
										<el-form-item label="检查结果输出">
										    <el-input
										      type='textarea'
										      placeholder="请输入内容"
										      v-model="fiveCheckOutMsg">
										    </el-input>
										</el-form-item>
									</el-col> -->
								</el-row>

								<div class='text-center m-b20'>
									<el-button type="primary" @click="onSubmit('fivePreCheck')" class='btn-lg'>预检查</el-button>
								    <el-button type="primary" @click="onSubmit('submit')" :disabled='fiveSubmitBtnDisabled' :class='["btn-lg",fiveSubmitBtnDisabled ? "my-disabled" : ""]'>提 交</el-button>
								    <el-button @click="resetForm" class='btn-lg btn-normal'>重 置</el-button>
								</div>
							</el-form>
						</div>

						<div class="empty"></div>
						<el-tabs v-model="fiveActiveName">
							<el-tab-pane  label="DDL/DML操作履历" name="one">
								<div class="compenent-form">
									<v-table 
										:data='fiveLogTableData' 
										:tableHeadName='fiveLogTableHeadName'
										:showOperator='false'
										class='one-table'
									></v-table>

									<div class="block pagination-wraper">
									   <el-pagination
									   	 v-if='fiveLogTableData.length > 0'
									   	 @size-change='sizeChange'
									   	 @current-change='currentChange'
									     :page-sizes="[10, 15, 20, 25, 30, 35, 40, 45, 50]"
									     layout="total, sizes, prev, pager, next, jumper"
									     :page-size='fiveLogPageSize'
									     :total="fiveLogTotal">
									   </el-pagination>
									</div>
								</div>

							</el-tab-pane>

							<el-tab-pane label="待入库SQL列表" name="two">
								<div class="compenent-form">
									<v-table 
										:data='fiveSqlTableData' 
										:tableHeadName='fiveSqlTableHeadName'
										:showOperator='false'
										class='one-table'
										@tdClick='tdClick'
									></v-table>

									<div class="block pagination-wraper">
									   <el-pagination
									   	 v-if='fiveSqlTableData.length > 0'
									   	 @size-change='sizeChange'
									   	 @current-change='currentChange'
									     :page-sizes="[10, 15, 20, 25, 30, 35, 40, 45, 50]"
									     layout="total, sizes, prev, pager, next, jumper"
									     :page-size='fiveSqlPageSize'
									     :total="fiveSqlTotal">
									   </el-pagination>
									</div>
								</div>
							</el-tab-pane>
						</el-tabs>
					</el-tab-pane>

	    		</el-tabs>
    		</div>
    	</div>

    	<el-dialog 
	    	title='提示'
	    	:visible.sync="errorDialogVisible"
	    	width="50%"
	    >
			<h1>错误报告(错误级别是1 为警告，可以继续执行。错误级别有2 为严重错误 不可继续)</h1>
			<v-table 
				:data='errorTableData' 
				:tableHeadName='errorTableHeadName'
				:showOperator='false'
			></v-table>
			<span slot="footer" class="dialog-footer">
	    	    <el-button type="primary" @click="errorDialogVisible = false">关 闭</el-button>
	    	</span>
    	</el-dialog>

	    <el-dialog
    	  title="权限申请详情"
    	  :visible.sync="dialogVisible"
    	  width="50%"
    	  @close='closeDialog'
    	  >
    	  	<ul class='detail-ul clearfix'>
    	  		<li v-for='(val, key) in tableHeadName' :key='key' :class='activeName+"-"+key'>
    	  			<label>{{val}}:</label>
    	  			<span>{{rowDetail[key]}}</span>
    	  		</li>
    	  	</ul>
	    	<span slot="footer" class="dialog-footer">
	    	    <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
	    	</span>
    	</el-dialog>
    </div>
</template>
<style lang='scss'>
	.self-service {
		.main-middle {
			padding: 0;
		}
		.el-tabs__header,.compenent-form,{
			padding: 0 20px;
		}
		.el-upload-dragger {
			height: auto;
			.el-icon-upload {
				margin: 10px;
				font-size: 50px;
				line-height: 30px;
			}
			.el-upload__text {
				margin-bottom: 10px;
			}
		}
		.transfer {
			p {
				font-weight: 550;
				span {
					font-size: 12px;
					font-weight: normal;
				}
			}
			select {
				min-height: 200px;
				border: 1px solid #ddd;
				border-radius: 5px;
				option {
					padding: 5px 10px;
				}
			}
			.flex {
				display: flex;
				height: 200px;
				align-items: center;
				justify-content: center;
			}
		}
		.one-table {
			.cell {
				.remark,.no_success_result,.result_output {
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
		.two-table {
			.cell {
				.cmd,.remark {
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

	.detail-ul {
		li {
			float: left;
			padding-left: 0;
			width: 50%;
			line-height: 30px;
			label {
				display: inline-block;
				width: 100px;
				text-align: right;
				margin-right: 10px;
			}
		} 
		li.two-remark,li.two-cmd {
			width: 100%;
		}
		li.two-cmd span {
			display: inline-block;
			width: 80%;
			vertical-align: top;
			border: 1px solid #ddd;
			border-radius: 5px;
			padding: 10px;
		}
	}
</style>
<script type="text/javascript">
	export default {
		data () {
			return {
				fileList: [],
				labelWidth: '140px',
				labelWidth1: '100px',
				/*平台访问权限申请----------------------------------------------------------start*/
				title: '权限申请详情',					//查看详情对话框标题
				dialogVisible: false,
				privateDisabled: false,
				oneSubmitBtnDisabled: false,			//提交按钮是否禁用
				middlePrevDisabled: false,				//中间往左移动按钮是否禁用
				leftNextDisabled: false,				//左边往右移动按钮是否禁用
				rightPrevDisabled: false,				//右边往左移动按钮是否禁用
				middleNextDisabled: false,				//中间往右移动按钮是否禁用
				leftList: [],
				leftObj: [],
				middleList: [],
				middleObj: [],
				rightList: [],
				rightObj: [],
				oneApproverList: [],	//平台访问权限审批人下拉框数据
				rowDetail: {},							//table表格行数据
				activeName: 'one',						//tab选项绑定值
				childActiveName: 'one',
				oneForm: {								//平台访问权限表单数据
					region: '',			//部门
					approver: '',		//审批人
					opComment: '',		//操作备注
					noRights: [],		//无权限
					readRights: [],		//只读权限
					readWriteRights: [],//读写权限
				},
				oneRegionList: [],
				oneAllTableData: [],	//所有的表单数据
				oneTableData:[],		//平台访问权限table表单数据
				oneTableHeadName: {		//平台访问权限table表单表头名	
		 			app_manager_mip: '申请人',
		 			cmd: '角色',
		 			remark: '操作备注',
		 			sys_manager_name: '审批人',
		 			itime: '时间',
		 			auto: '状态',         
		 		},
		 		oneLabelName: {
		 			app_manager_mip: '申请人',
		 			cmd: '角色',
		 			remark: '操作备注',
		 			sys_manager_name: '审批人',
		 			itime: '时间',
		 			auto: '状态', 
		 		},
		 		dbUsernameDisabled: true,	//数据库用户名是否禁用
		 		dbDisabled: true,			//数据库是否禁用
		 		onePageSize: 10,		//平台访问权限table表单每页显示数		
		 		oneCurrentPage: 1,	//平台访问权限table表单当前页码	
				oneTotal: 10,		//平台访问权限table表单总页数
				/*平台访问权限申请----------------------------------------------------------end*/
				twoForm: {								//DB创建及账号访问授权申请表单数据
					region: '',			//部门
					env: '',			//环境
					application: '',	//应用
					host: '',				//主机
					DB: '',				//db
					dbName: '',			//db名称
					DBDesc: '',			//db描述
					newDbUser: '',		//创建新数据库用户
					dbUsername: '',		//数据库用户名称
					permission: '',		//授权db
					permissionType: '0',	//授权类型
					username: '',		//用户名
					approver: '',		//审批人
					specialPowers: '',	//特殊权限
					opComment: '',	//申请备注
				},
				twoRegionList: [],
				twoEnvTypeList: [],
				twoApplicationList: [],
				twoHostList: [],
				twoPermissionList: [],
				twoPermissionTypeList: [],
				twoUsernameList: [],
				twoApproverList: [],
				twoSubmitBtnDisabled: false,			//提交按钮是否禁用
				twoTableData:[],		//DB创建及账号访问授权申请table表单数据
				twoAllTableData:[],		//DB创建及账号访问授权申请table表单数据
				twoTableHeadName: {		//DB创建及账号访问授权申请table表头名
		 			app_manager_mip: '申请人',
		 			ip: '数据库IP',
		 			cmd: '申请内容',
		 			remark: '申请备注',
		 			sys_manager_name: '审批人',
		 			itime: '申请时间',
		 			auto: '状态',          
		 		},
		 		twoLabelName: {
		 			app_manager_mip: '申请人',
		 			ip: '数据库IP',
		 			auto: '状态',
		 			sys_manager_name: '审批人',
		 			itime: '申请时间',
		 			remark: '申请备注',
		 			cmd: '申请内容',
		 		},
 				twoPageSize: 10,		//DB创建及账号访问授权申请table表单每页显示数		
 		 		twoCurrentPage: 1,	//DB创建及账号访问授权申请table表单当前页码	
 				twoTotal: 10,		//DB创建及账号访问授权申请table表单总页数
				/*DDL/DML审核入库---------------------------------------------start*/
				threeForm: {								//DB创建及账号访问授权申请表单数据
					region: '',			//部门
					envType: '',			//环境
					application: '',	//应用
					host: '',			//主机
					dbName: '',				//db
					approver: '',		//审批人
					command: '',		//执行命令
					opComment: '',		//操作备注
				},
				threeRegionList: [],
				threeEnvTypeList: [],
				threeApplicationList: [],
				threeHostList: [],
				threeDBList: [],
				threeApproverList: [],
				threeSubmitBtnDisabled: false,			//提交按钮是否禁用
				threePageSize: 10,		//DB创建及账号访问授权申请table表单每页显示数		
		 		threeCurrentPage: 1,	//DB创建及账号访问授权申请table表单当前页码	
				threeTotal: 10,		//DB创建及账号访问授权申请table表单总页数
				dml_ddl_PageSize: 10,
				dml_ddl_CurrentPage: 1,
				dml_ddl_Total: 10,

				sqlListPageSize: 10,
				sqlListCurrentPage: 1,
				sqlListTotal: 10,

				/*DDL/DML审核入库---------------------------------------------end*/

				/*DDL/DML 批量入库---------------------------------------------start*/
				fourForm: {								//DB创建及账号访问授权申请表单数据
					region: '',			//部门
					envType: '',		//环境
					application: '',	//应用
					host: '',			//主机
					dbName: '',				//db
					approver: '',		//审批人
					opComment: '',		//操作备注
				},
				fourRegionList: [],
				fourEnvTypeList: [],
				fourApplicationList: [],
				fourHostList: [],
				fourDBList: [],
				fourApproverList: [],
				fourSubmitBtnDisabled: true,
				fourLogTableData: [],
				fourLogAllTableData: [],
				fourLogTableHeadName: {
					op_user: '操作人',
					op_type: '	操作类型',
					op_comment: '操作备注',
					db_ip: '数据库IP',
					db_port: '数据库端口',
					db_name: '数据库名称',
					exe_sql: '执行命令',
					result_output: '执行结果',
					exe_cost_time: 'cost_time',
					affected_rows: '影响行数',
					create_time: '执行时间'
				},
				fourActiveName: 'one',
				fourSqlTableData: [],
				fourSqlAllTableData: [],
				fourSqlTableHeadName: {
					id: "ID",
					op_user: '提交人',
					op_comment: '操作备注',
					db_all: '数据库IP:PORT:DB',
					exe_sql: '执行命令',
					affected_rows: '影响行数',
					status: '状态',
					no_success_result: '未成功原因/其他提示',
					create_time: '提交时间'
				},
				fourLogPageSize: 10,
				fourLogCurrentPage: 1,
				fourLogTotal: 10,

				fourSqlPageSize: 10,
				fourSqlCurrentPage: 1,
				fourSqlTotal: 10,

				errorTableData: [],
				errorDialogVisible: false,
				errorTableHeadName: {
					id: 'ID',
					exe_sql: '执行sql',
					errormessage: '错误内容',
					errlevel: '错误级别',
					affected_rows: '影响行',
				},
				/*DDL/DML 批量入库---------------------------------------------end*/

				/*分片环境DDL/DML审核入库---------------------------------------------start*/
				fiveForm: {								//DB创建及账号访问授权申请表单数据
					region: '',			//部门
					application: '',	//应用
					approver: '',		//审批人
					opComment: '',		//操作备注
					command: '',		//操作命令
					tableName: '',		//表名
				},
				fiveApplicationList: [],
				fiveLogTableData: [],
				fiveLogAllTableData: [],
				fiveLogTableHeadName: {
					op_user: '操作人',
					op_type: '	操作类型',
					op_comment: '操作备注',
					db_ip: '数据库IP',
					db_port: '数据库端口',
					db_name: '数据库名称',
					exe_sql: '执行命令',
					result_output: '执行结果',
					exe_cost_time: 'cost_time',
					affected_rows: '影响行数',
					create_time: '执行时间'
				},
				fiveActiveName: 'one',
				fiveSqlTableData: [],
				fiveSqlAllTableData: [],
				fiveSqlTableHeadName: {
					id: "ID",
					op_user: '提交人',
					op_comment: '操作备注',
					db_all: '数据库IP:PORT:DB',
					exe_sql: '执行命令',
					affected_rows: '影响行数',
					status: '状态',
					no_success_result: '未成功原因/其他提示',
					create_time: '提交时间'
				},
				fiveLogPageSize: 10,
				fiveLogCurrentPage: 1,
				fiveLogTotal: 10,

				fiveSqlPageSize: 10,
				fiveSqlCurrentPage: 1,
				fiveSqlTotal: 10,

				fiveCheckOutMsg: '',
				fiveSubmitBtnDisabled: true,
				fiveErrLevel: '',
				fiveErrMsg: '',
				fiveAffectedRows: '',
				fiveRegionList: [],
				fiveApproverList: [],
				/*分片环境DDL/DML审核入库---------------------------------------------end*/


				/*线上环境待sql列表*/
				errorLevel: '',												//错误等级
				errorMsg: '',												//错误信息
				affectedRows: '',											//影响行数
				checkOutMsg: '',											//检查结果输出
				resultOutPrint: '',											//执行结果输出
				dml_ddl_TableData: [],
				dml_ddl_AllTableData: [],
				dml_ddl_tableHeadName: {
					op_user: '操作人',
					op_type: '	操作类型',
					op_comment: '操作备注',
					db_ip: '数据库IP',
					db_port: '数据库端口',
					db_name: '数据库名称',
					exe_sql: '执行命令',
					result_output: '执行结果',
					exe_cost_time: 'cost_time',
					affected_rows: '影响行数',
					create_time: '执行时间'
				},
				startTime: '',
				sqlShowText: '',											//当前DDL/DML sql显示
				sqlListTableData: [],
				sqlListAllTableData: [],
				sqlListTableHeadName: {
					id: "ID",
					op_user: '提交人',
					op_comment: '操作备注',
					db_all: '数据库IP:PORT:DB',
					exe_sql: '执行命令',
					affected_rows: '影响行数',
					status: '状态',
					no_success_result: '未成功原因/其他提示',
					create_time: '提交时间'
				},
				threeSubmitBtnDisabled: true,
				submitJobBtn: true,
				modifyBtn: true,
				/*线上环境待sql列表*/
				oneTableData: [],
				oneAllTableData: [],
		 		twoTableData: [],
				twoAllTableData: [],

				importFileUrl: '/Gaea_database/uploadBatch',
				fileBatch: 'fileBatch',
			    upLoadData: {
			        userMip: this.$store.state.username,
			    },

			    tableHeadName: {},
			}
		},
		methods: {
			openLink () {
				window.open('http://wiki.midea.com/pages/viewpage.action?pageId=5423664')
			},
			uploadError (response, file, fileList) {
				this.$message({
		          message: '上传失败',
		          type: 'error'
		        });
			},
			uploadSuccess (response, file, fileLists) {
				this.fileList.splice(0, this.fileList.length);
				this.fileList.push({
					name: file.name
				})
				this.$message({
		          message: '上传成功',
		          type: 'success'
		        });
			},
			beforeAvatarUpload (file) {},
			/**
			 *实现穿梭框功能
			 * @AuthorHTL
			 * @DateTime  2018-04-26T19:03:37+0800
			 * @param     {[Array]}                 sourceList               源下拉框数据
			 * @param     {[Array]}                 soureceSelectedValue 	源下拉框选中的值
			 * @param     {[Array]}                 targetList               目标对象下拉框数据
			 * @param     {[Object]}                 targetObj                目标对象所保存的元数据对应的索引位置
			 * 
			 */
			moveSelected (sourceList, soureceSelectedValue, targetList, targetObj, type) {
				for (let i of sourceList) {
					if (soureceSelectedValue.indexOf(i.appId) != -1) {
						let index = targetObj['id' + i.appId] != undefined ? targetObj['id' + i.appId] : targetList.length;
						targetList.splice(index, 0, i)
					}
				}
				this[type + 'List'] = sourceList.filter( (item) => {
					return soureceSelectedValue.indexOf(item.appId) == -1
				})
			},
			clearData () {
				//清空环境所选内容
				this[this.activeName + 'Form'].envType=""
				//清空应用
				this[this.activeName + 'Form'].application = ''
				this[this.activeName + 'Form'].host = ''
				//清空主机
				this[this.activeName + 'ApplicationList'] = []
				this[this.activeName + 'HostList'] = []
			},
			//获取环境列表数据
			getEnvList () {
				//环境数据清空
				app.post('/Gaea_database/getEnv', {
					
				}, response => {
					for (let i of response.data.data.envList) {
						i.label = i.envName;
						i.value= i.envId;
						this.twoEnvTypeList.push(i)
						this.threeEnvTypeList.push(i)
						this.fourEnvTypeList.push(i)
					}
				})
			},
			//获取应用列表数据
			getAppList (val) {
				//应用/主机清空/审批人清空
				let formObj = this[this.activeName + 'Form']
				formObj.application = ''
				formObj.host = ''
				formObj.approver = ''
				this[this.activeName + 'ApplicationList'] = []
				this[this.activeName + 'HostList'] = []
				this[this.activeName + 'ApproverList'] = []
				val && formObj.region && app.post('/Gaea_database/getApp', {
					deptId: formObj.region,
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
			//获取主机列表数据
			getHostList (val) {
				//主机清空
				this[this.activeName + 'Form'].host = ''
				this[this.activeName + 'HostList'] = []
				//审批人数据清空
				this[this.activeName + 'Form'].approver = '';
				this[this.activeName + 'ApproverList'] = []
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
				val && this.getDBAList(val)
			},
			//获取DBAlist数据
			getDBAList (val) {
				//审批人数据清空
				this[this.activeName + 'Form'].approver = '';
				this[this.activeName + 'ApproverList'] = []
				val && app.post('/Gaea_database/getDBAList', {
					appId: val + '',
					getType: '1'
				}, response => {
					for (let i of response.data.data.dbaList) {
						this[this.activeName + 'ApproverList'].push({
							label: i.dbaName,
							value: i.id
						})
					}
				})
			},
			getDbList1 (flag) {
				let formObj = this.twoForm
				this.dbDisabled = !flag;
				formObj.dbName = "";
				formObj.DBDesc = "";
				if (!flag) {
					if (!formObj.newDbUser) {
						this.privateDisabled = false
					}
					//授权db清空
					formObj.permission = ''
					this.twoPermissionList = []
					formObj.host && app.post('/Gaea_database/getDB', {
						serverId: formObj.host + ''
					}, response => {
						//将接口返回的数据加入授权db中
						for (let i of response.data.dbList) {
							this.twoPermissionList.push({
								label: i.dbName,
								value: i.dbName
							})
						}
					})
				} else {
					this.privateDisabled = true
				}
			},
			//获取数据库列表数据
			getDBList (flag) {
				let formObj = this[this.activeName + 'Form']
				if (this.activeName === 'two' && formObj.host || (this.activeName === 'three') || (this.activeName === 'four')) {
					if (this.activeName === 'two') {
						//授权db清空
						formObj.permission = ''
						this.twoPermissionList = []
					} else {
						//db清空
						formObj.dbName = '';
						this[this.activeName + 'DBList'] = [];
					}
					formObj.host && app.post('/Gaea_database/getDB', {
						serverId: formObj.host + ''
					}, response => {
						if (this.activeName === 'two') {
							//将创建的db加入到授权db中
							this.twoForm.dbName && this.twoPermissionList.push({
								label: this.twoForm.dbName,
								value: this.twoForm.dbName
							})
							//将接口返回的数据加入授权db中
							for (let i of response.data.dbList) {
								this.twoPermissionList.push({
									label: i.dbName,
									value: i.dbName
								})
							}
						} else {
							for (let i of response.data.dbList) {
								this[this.activeName + 'DBList'].push({
									label: i.dbName,
									value: i.dbName
								})
							}
						}
					})
				}
				flag && this.getDBUserList()
			},

			createNewDatabase (flag) {
				this.dbUsernameDisabled = !this.dbUsernameDisabled;
				this.twoForm.dbUsername = ""
				if (!flag) {
					if (!this.twoForm.DB) {
						this.privateDisabled = false
					}
					this.getDBUserList();
				} else {
					this.privateDisabled = true
				}
			},
			//获取数据库用户名数据
			getDBUserList () {
				//用户名清空
				let formObj = this.twoForm
				formObj.username = ''
				this.twoUsernameList = []
				if (formObj.dbUsername) {
					this.twoUsernameList.push({
						label: this.twoForm.dbUsername + "@10.%",
						value: "'" + this.twoForm.dbUsername + "'@'10.%'"
					})
				} else {
					formObj.host && app.post('/Gaea_database/getDbUser', {
						serverId: formObj.host + ''
					}, response => {
						//将接口返回的数据加入用户名中
						for (let i of response.data.dbUserList) {
							this.twoUsernameList.push({
								label: i.dbUserName.replace(/'/g,""),
								value: i.dbUserName
							})
						}
					})
				}
			},
			
			setButton (type) {
				/*if (type === 'left') {
					this.leftNextDisabled = false;
					this.middlePrevDisabled = true;
					this.rightPrevDisabled = true;
					this.middleNextDisabled = true;
				} else if (type === 'middle') {
					this.leftNextDisabled = true;
					this.middlePrevDisabled = false;
					this.rightPrevDisabled = true;
					this.middleNextDisabled = false;
				} else {
					this.leftNextDisabled = true;
					this.middlePrevDisabled = true;
					this.rightPrevDisabled = false;
					this.middleNextDisabled = true;
				}*/
			},
			getRole (val) {
				/*左中右下拉框数据清空*/
				this.middleList = [];
				this.leftList = [];
				this.rightList = [];
				this.oneForm.approver = '';
				this.oneApproverList = [];
				val && app.post('/Gaea_database/getRoleList', {
					deptId: val,
					userMip: this.$store.state.username
				}, response => {
					/*中间栏数据*/
					response.data.data.onlyReadList.forEach( (item,index) => {
						this.middleList.push(item)
						this.middleObj['id' + item.appId] = index
					})
					/*左边栏数据*/
					response.data.data.noPriList.forEach( (item,index) => {
						this.leftList.push(item)
						this.leftObj['id' + item.appId] = index
					})
					/*右边栏数据*/
					response.data.data.readWriteList.forEach( (item,index) => {
						this.rightList.push(item)
						this.rightObj['id' + item.appId] = index
					})
					//审批人数据
					for (let i of response.data.data.appDBA) {
						this.oneApproverList.push({
							label: i.username_chinese,
							value: i.userid
						})
					}
				})
			},
			/*选择分片环境部门*/
			selectDept (dept) {
				//应用/审批人清空
				let formObj = this[this.activeName + 'Form']
				formObj.application = ''
				formObj.approver = ''
				formObj.fiveApproverList = []
				this[this.activeName + 'ApplicationList'] = []
				if (dept === 37) {
					this[this.activeName + 'ApplicationList'] = this[this.activeName + 'ApplicationList'].concat([{
						label: '渠道MMP生产环境',
						value: 33
					},{
						label: '渠道MMP UAT环境',
						value: 38
					}])
					
				}
			},
			validateSql (sql, type) {
				return app.tools.validateSqls(this, sql, type)
			},
			validatorForm () {
				let msg = ''
				let formObj = this[this.activeName + 'Form']
				if (this.activeName === 'one') {
					if (!formObj.region) {
						msg = '请选择部门'
					} else if (!this.middleList.length && !this.rightList.length) {
						msg = '请选择相关权限'
					} else if (!formObj.approver) {
						msg = '请选择审批人'
					} else if (!formObj.opComment) {
						msg = '请输入操作备注'
					}
				} else if (this.activeName === 'two') {
					if (!formObj.region) {
						msg = '请选择部门'
					} else if (!formObj.envType) {
						msg = '请选择环境'
					} else if (!formObj.application) {
						msg = '请选择应用'
					} else if (!formObj.host) {
						msg = '请选择主机'
					} else if (!formObj.opComment) {
						msg = '必须输入操作备注!'
					} else if (!formObj.approver) {
						msg = '请选择审批人'
					} else if (formObj.DB && !formObj.dbName) {
						msg = '请输入DB 名称'
					} else if (formObj.DB && !formObj.DBDesc) {
						msg = '请输入DB 描述'
					} else if (formObj.newDbUser && !formObj.dbUsername) {
						msg = '请输入数据库用户名'
					} else if (!formObj.specialPowers) {
						if (!formObj.permission) {
							msg = '请选择授权DB'
						} else if (formObj.permissionType === '0') {
							msg = '请选择权限类型'
						} else if (!formObj.username) {
							msg = '请选择用户名'
						}
					}
				} else if (this.activeName === 'three') {
					if (!formObj.region) {
						msg = '请选择部门'
					} else if (!formObj.envType) {
						msg = '请选择环境'
					} else if (!formObj.application) {
						msg = '请选择应用'
					} else if (!formObj.host) {
						msg = '请选择主机'
					} else if (!formObj.dbName) {
						msg = '请选择DB'
					} else if (!formObj.approver) {
						msg = '请选择审批人'
					} else if (!formObj.command) {
						msg = '必须输入执行命令!'
					} else if (!formObj.opComment) {
						msg = '必须输入操作备注!'
					} else if (/\"/g.test(formObj.command)) {
						msg = '执行语句中不能包含双引号，请用单引号代替!!'
					} else if (/\'/g.test(formObj.opComment)) {
						msg = '备注中不能包含单引号，请用双引号代替!!'
					} else {
						msg = this.validateSql(formObj.command)
					}
				} else if (this.activeName === 'four') {
					if (!formObj.region) {
						msg = '请选择部门'
					} else if (!formObj.envType) {
						msg = '请选择环境'
					}  else if (!formObj.application) {
						msg = '请选择应用'
					} else if (!formObj.host) {
						msg = '请主机'
					} else if (!formObj.dbName) {
						msg = '请选择数据库'
					} else if (!formObj.approver) {
						msg = '请选审批人'
					} else if (!formObj.opComment) {
						msg = '必须输入操作备注!'
					}
				} else {
					if (!formObj.region) {
						msg = '请选择部门'
					} else if (!formObj.application) {
						msg = '请选择应用'
					} else if (!this.fiveForm.tableName) {
						msg = '请输入表名!'
					} else if (!formObj.command) {
						msg = '请输入执行语句!'
					} else if (!formObj.opComment) {
						msg = '请输入操作备注!'
					} else if (!formObj.approver) {
						msg = '请选择审批人'
					} else if (/\"/g.test(this.fiveForm.command)) {
						msg = '执行语句中不能包含双引号，请用单引号代替!!'
					} else if (/\'/g.test(this.fiveForm.opComment)) {
						msg = '备注中不能包含单引号，请用双引号代替!!'
					} else {
						msg = msg = this.validateSql(formObj.command, 'shared')
					}
				}
				return msg
			},
			oneSuccess (response) {				//第一个tab点击提交按钮调用接口成功处理函数
				this[this.activeName + 'SubmitBtnDisabled'] = false
				if (response.data.code === 'Gaea30005') {
					this.$alert(response.data.msg, {
						title: '提示',type: 'info'
					})
					return;
				} else {
					for (let i of response.data.data.selfPriApplyList) {
						i.auto = i.apply_status
						this.oneAllTableData.unshift(i)
					}
					this.oneTotal = this.oneAllTableData.length;
					//重新计算分页
					app.tools.changeTable(this)
				}
			},
			twoSuccess (response) {
				if (response.data.code != '505') {
					this.$alert(response.data.msg, {
						title: '提示',type: 'info'
					})
				}
				for (let i of response.data.data) {
					this.twoAllTableData.unshift(i)
				}
				this.twoTotal = this.twoAllTableData.length;
				//重新计算分页
				app.tools.changeTable(this)
			},
			/*预检车成功回调函数*/
			preCheckFn (response) {
				let code = response.data.code
				let res = response.data.data
				if (response.data.code === 'Gaea20011') {
					let v_sql_all = response.data.data.v_inc_errormessage;
					let msg = app.tools.validate_dba_rule(v_sql_all)
					// 不符合DBA审计规则，直接退出，按钮不可用
					if (msg) {
						this.$alert(msg, {
							title: '提示',type: 'info'
						})
						return false;
					}
					this.submitJobBtn = false;
					this.threeSubmitBtnDisabled = false;
				}
				this.checkOutMsg = response.data.msg
				if (code != '505') {
					this.$alert(this.checkOutMsg, {
						title: '提示',type: 'info'
					})
				}
				if (res) {
					this.errorMsg = res.v_inc_errormessage;
					this.errorLevel = res.v_inc_errlevel;
					this.affectedRows = res.v_inc_affected_rows;
				}
				if (code === 'Gaea10011' || code === 'Gaea20011') {		//检查通过
					this.submitJobBtn = false;
					this.threeSubmitBtnDisabled = false;
				} else {
					this.submitJobBtn = true;
					this.threeSubmitBtnDisabled = true;
					this.affectedRows = '0';
				}
				this.resultOutPrint = ''
			},
			error (type) {							//点击提交按钮调用接口失败回调处理函数
				this.$alert('提交失败', {
					title: '提示',
					type: 'info'
				})
				if (['btnCheck','preCheck','fivePreCheck'].indexOf(type) != -1) {
					this[this.activeName + 'SubmitBtnDisabled'] = false
				}
			},
			onSubmit (type) {
				let msg = this.validatorForm ();
				let readWriteArr = [];
				let onlyReadArr = [];
				let url = '';
				let params = {};
				let opType = '';
				let successFn = this[this.activeName + 'Success'];
				let formObj = this[this.activeName + 'Form'];
				let sql = formObj.command || '', 				//sql语句
					serverId = formObj.host, 				//主机id
					dbName = formObj.dbName,
					dbaName = formObj.approver,
					opComment = formObj.opComment,
					appId = formObj.application	
				if (sql.startsWith('insert') || sql.startsWith('update') || sql.startsWith('delete')) {
					opType = 1
				} else {
					opType = 3
				}
				if (msg) {
					this.$alert(msg, {
						title: '提示',type: 'info'
					})
					return;
				}
				if (this.activeName === 'one') {
					for (let i of this.rightList) {
						readWriteArr.push(i.appId)
					}
					for (let i of this.middleList) {
						onlyReadArr.push(i.appId)
					}
					this[this.activeName + 'SubmitBtnDisabled'] = true
					url = '/Gaea_database/selfPriApply';
					params = {
						deptId: this[this.activeName + 'Form'].region,									//部门
						readWriteList: readWriteArr.join(','),										//读写权限
						onlyReadList: onlyReadArr.join(','),										//只读权限
						dbaId: dbaName,																	//审批人
						opComment: opComment,						//操作备注
						userMip: this.$store.state.username
					}
				} else if (this.activeName === 'two') {
					this[this.activeName + 'SubmitBtnDisabled'] = true
					url = '/Gaea_database/grantDbPri';
					params = {
						serverId: serverId + '',																		//主机Id
						dbName: this[this.activeName + 'Form'].permission,										//授权db数据库名
						dbaGroupId: dbaName + '',																	//审批DBA id
						grantType: this[this.activeName + 'Form'].permissionType,								//权限类型
						appId: appId + '',																			//应用Id
						dbUserName: this[this.activeName + 'Form'].username,								//DB用户名
						specialPriSql: this[this.activeName + 'Form'].specialPowers.replace(/"/g,"'"),		//特殊权限sql
						opComment: opComment,								//操作备注
						textMysqlDbName: this[this.activeName + 'Form'].dbName,								//DB名称
						textMysqlDbDesc: this[this.activeName + 'Form'].DBDesc,								//DB描述
						textMysqlDbUser: this[this.activeName + 'Form'].dbUsername,							//数据库用户名
						userMip: this.$store.state.username
					}
				} else if (this.activeName === 'three') {
					if (type === 'preCheck') {			//预检查按钮
						url = '/Gaea_database/preCheckSingle';
						params = {
							serverId,										//主机Id
							dbName,											//数据库名
							exeSql: sql,									//sql执行语句
						}
						successFn = this.preCheckFn
					} else if (type === 'immediate' || (type === 'fixedTime')) {		//立即执行按钮
						params = {
							serverId: serverId,										//主机Id
							dbName: dbName,										//数据库名
							exeSql: sql.substring(0, sql.lastIndexOf(';') != -1 ? sql.lastIndexOf(';') : sql.length),										//审批DBA中文名
							appId: appId,								//应用id
							opType: opType,																	//操作类型
							v_inc_errlevel: this.errorLevel,													//错误等级
							v_inc_errormessage: this.errorMsg,													//错误信息
							v_inc_affected_rows: this.affectedRows,												//影响行数
							opComment: opComment,								//操作备注
							userMip: this.$store.state.username
						}
						if (type === 'immediate') {
							url = '/Gaea_database/submitSingle';
							params.dbaGroupId = dbaName

						} else {
							if (!this.startTime) {
								this.$alert('预计执行时间为空，不能提交定时任务!!', {title: '提示',type: 'info'})
								return
							}
							url = '/Gaea_database/submitSingleOntime';
							params.v_inc_ontime = this.startTime
							params.dbaName = dbaName
						}
						this.checkOutMsg = '';
						this.submitJobBtn = true;
						this.threeSubmitBtnDisabled = true;
						successFn = this.immediateFn
					}
					
				} else if (this.activeName === 'four') {
					 if (type === 'btnCheck') {
							url = '/Gaea_database/preCheckBatch';
							params = {
								serverId,										//主机Id
								dbName,											//数据库名
								userMip: this.$store.state.username
							}
							successFn = this.btnCheckFn
						} else if (type == 'submit') {
							url = '/Gaea_database/submitBatch';
							params = {
								serverId,
								dbName,
								appId,		
								opComment,
								dbaGroupId: this[this.activeName + 'Form'].approver,
								userMip: this.$store.state.username
							}
							this.fourSubmitBtnDisabled = true;
							successFn = this.fourSubmitFn
					}
				} else {
					if (type === 'fivePreCheck') {
						url = '/Gaea_database/preCheckShard';
						params = {
							tableName: this.fiveForm.tableName,							
							appId: appId,		
							exeSql: sql.substring(0, sql.lastIndexOf(';') != -1 ? sql.lastIndexOf(';') : sql.length)
						}
						successFn = this.fivePreCheckFn
					} else {
						url = '/Gaea_database/submitShard';
						params = {
							tableName: this.fiveForm.tableName,							
							appIdShard: appId,	
							dbaGroupId: this.fiveForm.approver,	
							exeSql: sql.substring(0, sql.lastIndexOf(';') != -1 ? sql.lastIndexOf(';') : sql.length),
							userMip: this.$store.state.username,
							opType: opType,
							opComment: opComment,
							v_inc_errormessage: this.fiveErrMsg,
							v_inc_affected_rows: this.fiveAffectedRows,
						}
						this.fiveSubmitBtnDisabled = true;
						successFn = this.fourSubmitFn
					}
					
				}
				app.post(url, params, successFn, type => {
					this.error(type)
				})
			},
			
			//分片环境预检查
			fivePreCheckFn (response) {
				let code = response.data.code
				let res = response.data.data
				if (code === 'Gaea20013') {
					let v_sql_all = data.v_inc_errormessage;
					let msg = app.tools.validate_dba_rule(v_sql_all, 'shared')
					// 不符合DBA审计规则，直接退出，按钮不可用
					if (msg) {
						this.$alert(msg, {
							title: '提示',type: 'info'
						})
						return false;
					}
				}
				this.fiveCheckOutMsg = response.data.msg
				if (code != '505') {
					this.$alert(this.fiveCheckOutMsg, {
						title: '提示',type: 'info'
					})
				}
				if (res) {
					this.fiveErrMsg = res.v_inc_errormessage;
					this.fiveErrLevel = res.v_inc_errlevel;
					this.fiveAffectedRows = res.v_inc_affected_rows;
				}
				if (code === 'Gaea10013' || code === 'Gaea20013') {		//检查通过
					this.fiveSubmitBtnDisabled = false;
				} else {
					this.fiveSubmitBtnDisabled = true;
				}
			},
			//DDL/DML 批量入库预检查
			btnCheckFn (response) {
				let code = response.data.code
				//清空table数据
				this.errorTableData = []
				if (code === 'Gaea10012') {
					this.fourSubmitBtnDisabled = false
					this.$alert(response.data.msg, {title: '提示',type: 'info'})
				} else if (['Gaea20012','Gaea30012'].indexOf(code) != -1) {
					this.errorDialogVisible = true
					let j = 1
					for (let i of response.data.data.batchLog) {
						if (i.errlevel != '0') {
							i.id = j++;
							this.errorTableData.push(i)
						}
					}
					code === 'Gaea20012' && (this.fourSubmitBtnDisabled = false)
				} else if (code != '505') {
					//不管提交成功或失败清除上传成功的文件列表
					this.fileList = []
					this.$alert(response.data.msg, {title: '提示',type: 'info'})
				}
			},
			modify () {
				//此功能暂时不做
				let v_sql_all = this.sqlShowText.toLowerCase();
				return
				let url = '/Gaea_database/submitSingleOntime'
				let params = {
					"v_wait_id": this.sqlId,
          			"cmd_to_change": v_sql_all
				}
				if (!v_sql_all) {
					this.$alert('sql语句为空，不能重提交!!', {title: '提示',type: 'info'})
					return
				}
				if (v_sql_all.indexOf("\"") >= 0) {
					this.$alert('sql语句中，不能带有双引号，请用单引号代替!', {title: '提示',type: 'info'})
					return
				}
				if (this.validateSql(v_sql_all)) {
					this.$alert(this.validateSqls(v_sql_all), {title: '提示',type: 'info'})
					return
				}
				this.modifyBtn = true;
				
				app.post(url, params, this.modifyFn, () => {
					this.modifyBtn = false;
				})
			},
			modifyFn (response) {
				this.modifyBtn = false
				if (response.data.v_inc_errlevel === '0' || (response.data.v_inc_errlevel === '1')) {
					this.checkOutMsg = '检查通过，无错误,Sql已经重新提交，待DBA审核执行,状态置为待入库状态!' + response.data.v_inc_errormessage
					this.$alert(this.checkOutMsg, {title: '提示',type: 'info'})
					//修改状态为带入库
					this.sqlListTableData[ths.rowIndex].status = '待入库'
					//字体颜色修改为blue
					this.sqlListTableData[ths.rowIndex].exe_sql = this.sqlShowText
					this.sqlListTableData[ths.rowIndex].no_success_result = ''
					this.sqlListTableData[ths.rowIndex].affected_rows = response.data.v_inc_affected_rows
				} else {
					this.checkOutMsg = '检查不通过! 错误原因为:' + response.data.v_inc_errormessage
					this.$alert(this.checkOutMsg, {title: '提示',type: 'info'})
				}
			},
			//DDL/DML 批量入库和分片入库提交
			fourSubmitFn (response) {
				let type = this.activeName
				let res = response.data.data
				let arr = []
				let flag = false
				let name = ''
				if (res) {
					arr = res.dmlddl_log_list || res.wait_inyard_list
					flag = res.dmlddl_log_list ? true : false
					name = type + (flag ? 'Log' : 'Sql')
				}
				
				//不管提交成功或失败清除上传成功的文件列表
				this.fileList = [];
				for (let i of arr) {
					this.$alert(i.result_output ? i.result_output : '提交成功，已进入待入库SQL列表!', {
						title: '提示',type: 'info'
					})
					//向table行首增加一行
					this[name + 'AllTableData'].unshift(i)
					this[name + 'Total'] = this[name + 'AllTableData'].length
					!flag && (this[type + 'ActiveName'] = 'two')
					//重新计算分页
					app.tools.changeTable(this, name)
				}
			},
			immediateFn (response) {
				let res = response.data.data
				let arr = []
				let flag = false
				let name = ''
				if (res) {
					arr = res.dmlddl_log_list || res.wait_inyard_list
					flag = res.dmlddl_log_list ? true : false
					name = flag ? 'dml_ddl_' : 'sqlList'
				}
				
				for (let i of arr) {
					this.$alert(i.result_output ? i.result_output : '提交成功，已进入待入库SQL列表!', {
						title: '提示',type: 'info'
					})
					this.resultOutPrint = i.result_output || '提交成功，已进入待入库SQL列表!';
					if (i.result_test_type) {
						this.$alert('测试环境执行结果: ' + i.result_test_output, {
							title: '提示',type: 'info'
						})
					}
					if (i.result_test2_type) {
						this.$alert('UAT环境执行结果: ' + i.result_test2_output, {
							title: '提示',type: 'info'
						})
					}
					!flag && (this.childActiveName = 'two')
					//向table行首增加一行
					this[name + 'AllTableData'].unshift(i)
					this[name + 'Total'] = this[name + 'AllTableData'].length
					//重新计算分页
					app.tools.changeTable(this, name)
				}
			},
			/*为sqltable列表绑定点击事件*/
			tdClick ({row, index}) {
				this.sqlId = row.id
				this.rowIndex = index
				if (row.sql_status != '待入库') {
					this.sqlShowText = row.exe_sql
					this.modifyBtn = false;
				}
			},
			getTableName () {
				let name = ''
				let page = this.activeName
				if ( page === 'three') {
					name = this.childActiveName === 'one' ? 'dml_ddl_' : 'sqlList'
				} else if (page === 'four' || page === 'five') {
					name = this[page + 'ActiveName'] === 'one' ? page + 'Log' : page + 'Sql'
				}
				return name
			},
			sizeChange (pageSize) {
				app.tools.sizeChange(this, pageSize, this.getTableName())
			},
			currentChange (currentPage) {
				app.tools.currentChange(this, currentPage, this.getTableName())
			},
			//关闭对话框需将数据清空
			closeDialog () {
				app.tools.closeDialog(this)
			},
			editRow (row) {
				this.rowDetail = Object.assign({}, row)
				this.tableHeadName = Object.assign({}, this[this.activeName + 'LabelName'])
				this.dialogVisible = true;
				
			},
			resetForm () {
				app.tools.resetFormData(this[this.activeName + "Form"])
			},
			/*获取部门下拉框数据*/
			getDeptList () {
				app.post('/Gaea_database/getDept', {
					userMip: this.$store.state.username
				}, res => {
					for (let i of res.data.data.deptList) {
						i.label = i.deptName;
						i.value = i.deptId;
						this.oneRegionList.push(i)
						this.twoRegionList.push(i)
						this.threeRegionList.push(i)
						this.fourRegionList.push(i)
						this.fiveRegionList.push(i)
					}
				})
			},
			getdmlddlWaitInyardLog () {
				app.post('/Gaea_database/dmlDdlWaitInyardLog', {
					userMip: this.$store.state.username
				}, res => {
					for (let i of res.data.data.dmlddl_log_list) {
						i.create_time = app.tools.formatDate(i.create_time)
						this.dml_ddl_AllTableData.push(i)
						this.fourLogAllTableData.push(i)
						this.fiveLogAllTableData.push(i)
					}
					for (let i of res.data.data.wait_inyard_list) {
						i.create_time = app.tools.formatDate(i.create_time)
						this.sqlListAllTableData.push(i)
						this.fourSqlAllTableData.push(i)
						this.fiveSqlAllTableData.push(i)
					}

					this.dml_ddl_TableData = this.dml_ddl_AllTableData.slice(0, this.dml_ddl_PageSize)
					this.dml_ddl_Total = this.dml_ddl_AllTableData.length;

					this.sqlListTableData = this.sqlListAllTableData.slice(0, this.sqlListPageSize)
					this.sqlListTotal = this.sqlListAllTableData.length;

					this.fourLogTableData = this.fourLogAllTableData.slice(0, this.fourLogPageSize)
					this.fourLogTotal = this.fourLogAllTableData.length;

					this.fourSqlTableData = this.fourSqlAllTableData.slice(0, this.fourSqlPageSize)
					this.fourSqlTotal = this.fourSqlAllTableData.length;

					this.fiveLogTableData = this.fiveLogAllTableData.slice(0, this.fiveLogPageSize)
					this.fiveLogTotal = this.fiveLogAllTableData.length;

					this.fiveSqlTableData = this.fiveSqlAllTableData.slice(0, this.fiveSqlPageSize)
					this.fiveSqlTotal = this.fiveSqlAllTableData.length;

				})
			},
			selfPriApplyLog () {
				app.post('/Gaea_database/selfPriApplyLog', {
					userMip: this.$store.state.username
				}, res => {
					for (let i of res.data.data.grantLogList) {
						i.itime = app.tools.formatDate(i.itime)
						this.oneAllTableData.push(i)
					}
					this.oneTableData = this.oneAllTableData.slice(0, this.onePageSize)
					this.oneTotal = this.oneAllTableData.length;
				})
			},
			grantDbPriLog () {
				app.post('/Gaea_database/grantDbPriLog', {
					userMip: this.$store.state.username
				}, res => {
					for (let i of res.data.data.grantLogList) {
						i.itime = app.tools.formatDate(i.itime)
						this.twoAllTableData.push(i)
					}
					this.twoTableData = this.twoAllTableData.slice(0, this.twoPageSize)
					this.twoTotal = this.twoAllTableData.length;
				})
			},

		},
		created () {
			/*获取部门下拉框选项内容*/
			this.getDeptList();
			//获取环境下拉列表数据
			this.getEnvList();

			//获取操作履历和sql列表数据
			this.getdmlddlWaitInyardLog()

			//获取平台访问权限列表数据
			this.selfPriApplyLog()

			//自助服务/DB创建及访问账号申请 操作列表显示
			this.grantDbPriLog()
		}
	}
</script>