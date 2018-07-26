<template>
  <div class="box">
    <div class="dml-ddl">
      <div class="main-middle">
        <el-tabs v-model="activeName">
          <el-tab-pane label="DDL/DML操作查询" name="one">
            <div class="compenent-form">
              <el-form v-model='oneForm' :label-width='labelWidth'>
                <el-row>
                  <el-col>
                    <p class="title m-b20">主机过滤</p>
                  </el-col>

                  <el-col :md='9' class='required'>
                    <el-form-item label="部门">
                        <el-select v-model="oneForm.dept" placeholder="请选择" @change='clearData' clearable filterable>
                                <el-option v-for='(item,index) in oneDeptList' :key='index' :label='item.label' :value='item.value'></el-option>
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

                  <el-col :md='9' class='required'>
                    <el-form-item label="应用">
                        <el-select v-model="oneForm.region" placeholder="请选择" @change='getServerList' clearable filterable>
                                <el-option v-for='(item,index) in oneRegionList' :label='item.label' :value='item.value' :key='index'></el-option>
                        </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :md='{span:9,offset:2}' class='required'>
                    <el-form-item label="主机">
                        <el-select v-model="oneForm.host" placeholder="请选择主机">
                                <el-option v-for='(item,index) in oneHostList' :label='item.label' :value='item.value' :key='index'></el-option>
                        </el-select>
                    </el-form-item>
                  </el-col>
                  
                  <el-col>
                    <p class="title m-b20">操作人、数据库和模糊命令</p>
                  </el-col>

                  <el-col :md='9'>
                    <el-form-item label="操作人">
                        <el-input v-model="oneForm.operator" placeholder='请输入最少执行时间'></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :md='{span:9,offset:2}'>
                    <el-form-item label="数据库名称">
                        <el-input v-model="oneForm.database" placeholder='请输入数据库名称'></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :md='20'>
                    <el-form-item label="模糊命令">
                        <el-input v-model="oneForm.command" placeholder='请输入模糊命令' type='textarea' :rows='2'></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :md='9'>
                    <el-form-item label="时间查询方式">
                        <el-select v-model="oneForm.queryMode" placeholder="请选择" @change='setDateDisabled'>
                            <el-option :value="5" label="最近3天"></el-option>
                            <el-option :value="2" label="今天"></el-option>
                            <el-option :value="3" label="昨天"></el-option>
                            <el-option :value="4" label="前天"></el-option>
                            <el-option :value="6" label="最近7天"></el-option>
                            <el-option :value="0" label="按时间范围查询"></el-option>
                            <el-option :value="1" label="所有时间"></el-option>
                        </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :md='{span:9,offset:2}'>
                    <el-form-item label="查询时间范围">
                        <el-col :md='11'>
                          <el-date-picker
                              v-model="oneForm.startDate"
                              :disabled='oneTimeDisabled'
                              format='yyyy-MM-dd hh:mm:ss'
                              value-format='yyyy-MM-dd hh:mm:ss'
                              type="datetime"
                              popper-class='my-animation'
                              placeholder="开始时间">
                          </el-date-picker>
                        </el-col>

                        <el-col :md='{span:1,offset:1}'>
                          -
                        </el-col>

                        <el-col :md='11'>
                          <el-date-picker
                              v-model="oneForm.endDate"
                              :disabled='oneTimeDisabled'
                              format='yyyy-MM-dd hh:mm:ss'
                              value-format='yyyy-MM-dd hh:mm:ss'
                              type="datetime"
                              placeholder="结束时间">
                          </el-date-picker>
                        </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <div class='btn-group-lg'>
                    <el-button type="primary" @click="onSubmit" size='small' :disabled='btnDisabled'>查询</el-button>
                    <el-button @click="resetForm" size='small'>重置</el-button>
                </div>
              </el-form>
            </div>
            <div class="empty"></div>
            <div class="compenent-form">
                 <p class='title m-b10'>DDL/DML查询</p>
                 <v-table 
                    :data='oneTableData' 
                    :tableHeadName='oneTableHeadName'
                    :showOperator='false'
                    @cellClick='cellClick'
                    class='color-blue one-table'
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

              <el-tab-pane label="DBA审核入库" name="two">
                <div class="compenent-form">
                   <el-form v-model='twoForm' :label-width='labelWidth'>
                      <el-row>
                         <el-col :md='9' class='required'>
                            <el-form-item label="部门">
                                <el-select v-model="twoForm.dept" placeholder="请选择" @change='clearData' clearable filterable>
                                    <el-option v-for='(item,index) in twoDeptList' :label='item.label' :value='item.value' :key='index'></el-option>
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

                          <el-col :md='9' class='required'>
                            <el-form-item label="应用">
                                <el-select v-model="twoForm.region" placeholder="请选择应用" @change='getHostList' clearable filterable>
                                     <el-option v-for='(item,index) in twoRegionList' :label='item.label' :value='item.value' :key='index'></el-option>
                                </el-select>
                            </el-form-item>
                         </el-col>

                         <el-col :md='{span:9,offset:2}' class='required'>
                            <el-form-item label="主机">
                                <el-select v-model="twoForm.host" placeholder="请选择主机" @change='getDBList' clearable filterable>
                                     <el-option v-for='(item,index) in twoHostList' :label='item.label' :value='item.value' :key='index'></el-option>
                                </el-select>
                            </el-form-item>
                         </el-col>

                          <el-col :md='9'>
                              <el-form-item label="DB">
                                  <el-select v-model="twoForm.DB" placeholder="请选择DB" clearable filterable>
                                       <el-option v-for='(item,index) in twoDBList' :label='item.label' :value='item.value' :key='index'></el-option>
                                  </el-select>
                              </el-form-item>
                          </el-col>

                          <el-col :md='{span:9,offset:2}'>
                              <el-form-item label="提交人">
                                  <el-select v-model="twoForm.submiter" placeholder="请选择提交人" clearable filterable>
                                      <el-option v-for='(item,index) in twoSubmiterList' :label='item.label' :value='item.value' :key='index'></el-option>
                                  </el-select>
                              </el-form-item>
                          </el-col>

                         <el-col :md='9'>
                            <el-form-item label="过滤类型">
                                <el-select v-model="twoForm.filterType" placeholder="请选择过滤类型">
                                     <el-option :value="0" label="待入库"></el-option>
                                     <el-option :value="1" label="审核不合格"></el-option>
                                     <el-option :value="2" label="执行失败"></el-option>
                                     <el-option :value="3" label="执行成功"></el-option>
                                     <el-option :value="4" label="审核不合格和执行失败"></el-option>
                                </el-select>
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
                   <p class='title m-b10'>DDL/DML查询列表</p>
                   <v-table 
                      :data='twoTableData' 
                      :tableHeadName='twoTableHeadName'
                      :showOperator='showOperator'
                      :operatorTexts='["SQL详情及修正","删除",""]'
                      @editRow='viewDetail'
                      @cellClick='cellClick'
                      class='color-blue two-table'
                      width='150'
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
                 <el-dialog
                    title="SQL详情及修正"
                   :visible.sync="twoDialogVisible"
                   width="50%"
                   @close='closeDialog'
                   >
                   <P class='m-b10'>当前DML/DDL SQL显示</P>
                   <div>
                      <el-input type='textarea' v-model='exe_sql' :rows='6'></el-input>
                   </div>

                    <div class='flex' v-if='isShowBar'><p>执行进度</p><el-progress :percentage="percentage" :show-text='false'></el-progress></div>


                    <div v-if='exeResult === "failure"'>
                       <p class='my-remark'><span>执行失败！</span></p>
                    </div>
                    <div v-else-if='exeResult === "success"'>
                       <p class='success'><span>执行成功!</span></p>
                    </div>

                    <div class='m-t20 text-right'>
                       <el-button type="primary" :disabled='btnDisabled' @click='modifyExe'>SQL修正并执行</el-button>
                    </div>

                    <p class='m-b10'>审核不合格原因</p>
                    <el-input type='textarea' v-model='reasons' :rows='3'></el-input>
                    <div class='m-t20 text-right'>
                       <el-button type="primary" @click='setUnqualified' :disabled='btnDisabled'>提 交</el-button>
                    </div>
                 </el-dialog>
              </el-tab-pane>

        </el-tabs>
      </div>
    </div>

      <el-dialog
        title="执行命令"
        :visible.sync="dialogVisible"
        width="50%"
        @close='dialogVisible=false'
        >
         <div>{{exe_sql}}</div>
         <div class="text-right">
            <el-button type="primary" @click="dialogVisible=false">关 闭</el-button>
         </div>
      </el-dialog>

  </div>

</template>
<style lang='scss'>
.dml-ddl {
  .main-middle {
    padding: 0;
  }
  .el-tabs__header,.compenent-form,{
    padding: 0 20px;
  }
  .flex {
    p {
      line-height: 60px;
    }
    .el-progress {
      flex: 8;
      margin: 27px 0 0 10px;
    }
  }
  .one-table {
      .cell {
        .result_output {
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
        .no_success_result {
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
  .dml-ddl {
      .color-blue {
         tbody td:nth-child(7) {
            color: #409EFF;
            cursor: pointer
         }
      }
  }
</style>
<script type="text/javascript">
  export default {
    data() {
      return {
        showOperator: true,
        labelWidth: '140px',
        activeName: 'one',
        row_id: '',
        index: 0,
        twoDialogVisible: false,
        dialogVisible: false,
        oneTimeDisabled: true, //日期选择下拉框是否禁用
        btnDisabled: false, //查询按钮是否禁用
        twoFormSubmitBtnDisabled: false, //查询按钮是否禁用
        oneHostList: [], //主机下拉列表
        onePageSize: 10, //table表单每页显示数    
        oneCurrentPage: 1, //table表单当前页码  
        oneTotal: 10, //table表单总页数
        oneTableData: [], //table数据
        oneAllTableData: [],
        oneTableHeadName: { //table表头名
          op_user: '操作人',
          op_type: '操作类型',
          op_comment: '操作备注',
          db_ip: '数据库IP',
          db_port: '数据库PORT',
          db_name: '数据库名称',
          exe_sql: '执行命令',
          result_output: '执行结果',
          create_time: '创建时间',
        },
        oneForm: {
          dept: '',
          envType: '',
          region: '', //与
          host: '', //主机
          operator: '', //操作人
          database: '', //数据库名称
          command: '', //模糊命令
          queryMode: 5, //时间查询方式
          startDate: '', //开始日期
          endDate: '', //结束日期
        },
        oneFormInitData: {
          queryMode: 'disabled'
        },
        oneDeptList: [],
        oneRegionList: [],
        oneEnvTypeList: [],

        isShowBar: false,
        twoTableData: [], //table数据
        twoAllTableData: [],
        twoTableHeadName: { //table表头名
          id: 'ID',
          op_user: '提交人',
          op_comment: '操作备注',
          db_ip: '数据库IP',
          db_port: '数据库端口',
          db: 'DB',
          exe_sql: '执行命令',
          status: '状态',
          no_success_result: '未成功原因/其它提示',
          affected_rows: '影响行数',
          exe_cost_time: 'cost_time',
          last_update_date: '提交时间',
        },
        twoPageSize: 10, //请table表单每页显示数   
        twoCurrentPage: 1, //table表单当前页码  
        twoTotal: 10, //table表单总页数
        exeResult: '', //sql语句执行结果
        exe_sql: '', //sql详情及修正输入框数据
        reasons: '', //不合格原因
        percentage: 0, //执行进度百分比
        twoRegionList: [], //应用下拉框数据
        twoHostList: [], //主机下拉框数据
        twoDBList: [], //DB下拉框数据
        twoDeptList: [],
        twoEnvTypeList: [],
        twoSubmiterList: [],
        twoForm: {
          dept: '',               //部门
          envType: '',            //环境
          region: '',        //应用
          host: '',               //主机
          DB: '',                 //DB
          filterType: 0,         //过滤类型
          submiter: '',           //提交人
        },
        twoFormInitData: {
          filterType: 0,         //过滤类型
        },
        timer: null,

      }
    },
    methods: {
      validatorReason () {
        let msg = '';
        if (!this.reasons) {
          msg = '必须输入审核不合格原因!!'
        } else if (this.reasons.indexOf("'") != -1) {
          msg = '审核不合格原因描述中，不能包含单引号，请用双引号代替!!'
        }
        return msg
      },
      setUnqualified () {
        let res = this.validatorReason()
        let url = '/Gaea_database/sqlSetRejection'
        let params = {
          v_wait_id: this.row_id,
          op_comment: this.reasons,
        }
        if (res) {
          this.$alert(res, {title: '提示', type: 'info'})
          return
        }
        this.btnDisabled = true;
        app.post(url, params, res => {
          this.btnDisabled = false
          if (res.data.code != '505') {
            this.$alert(res.data.msg, {title: '提示', type: 'info'})
          }
          if (res.data.code === 'Gaea10056') {
            this.twoTableData[this.index].status = '审核不合格'
            this.twoTableData[this.index].no_success_result = this.reasons
          }
        }, this.error)
      },
      closeDialog () {
        this.twoDialogVisible=false
        this.exeResult = ''
        this.reasons = ''
        this.percentage = 0
      },
      viewDetail({row, title, $index}) {
        let url = '/Gaea_database/sqlInyardOrDel';
        this.exe_sql = row.exe_sql;
        this.row_id = row.id
        let params = {
          op_type: 0,
          exe_sql: '',
          v_wait_id: row.id,
          exe_type: 0,
          userMip: this.$store.state.username,
        }
        if (title === 'SQL详情及修正') {
          this.index = $index;
          this.twoDialogVisible = true; 
        } else {
          this.$confirm('确认刪除？', {
            title: '提示',
            type: 'warning',
            callback: (action, instance) => {
              if (action === 'confirm') {
                  app.post(url, params, res => {
                    /**/
                    let code = res.data.code;
                    if (code != '505') {
                      this.$alert(res.data.msg)
                    }
                    if (code === 'Gaea10055') { //删除成功,从table列表删除此条数据
                      this.twoAllTableData = this.twoAllTableData.filter(item => {
                        return item.id != row.id
                      })
                    }
                    this.twoTotal = this.twoAllTableData.length
                    //重新计算分页
                    app.tools.changeTable(this)
                  })
              }
            }
          })
          
        }
       
      },
      setDateDisabled(val) {
        val == 0 ? this.oneTimeDisabled = false : this.oneTimeDisabled = true
      },
      sizeChange(pageSize) {
        app.tools.sizeChange(this, pageSize)
      },
      currentChange(currentPage) {
        app.tools.currentChange(this, currentPage)
      },
      submitSuccess(response) {
        let res = this.activeName === 'one' ? response.data.data.dml_ddl_query_list : response.data.data.wait_inyard_list
        //清空table数据
        this[this.activeName + 'AllTableData'] = [];
        if (this.activeName === 'two' && this.twoForm.filterType === 3) { //如果是dba审核入库并且过滤类型未执行成功。。table不显示操作
          this.showOperator = false
        } else {
          this.showOperator = true
        }
        //将数据加入table中
        for (let i of res) {
          if (i.db_all) {
            let arr = i.db_all.split(':')
            i.db_ip = arr[0]
            i.db_port = arr[1]
            i.db = arr[2]
          }
          this[this.activeName + 'AllTableData'].push(i);
        }
        this[this.activeName + 'Total'] = this[this.activeName + 'AllTableData'].length;
        app.tools.changeTable(this)
        this.btnDisabled = false
      },
      error() {
        this.$alert('查询失败', {
          title: '提示',
          type: 'info'
        })
        this.btnDisabled = false
      },
      validateForm() {
        let msg = ''
        let formObj  = this[this.activeName + 'Form']
        if (!formObj.dept) {
          msg = '请选择部门'
        } else if (!formObj.envType) {
          msg = '请选择环境'
        } else if (!formObj.region) {
          msg = '请选择应用'
        } else if (!formObj.host) {
          msg = '请选择主机'
        }
        return msg
      },
      //修正并执行
      modifyExe () {
        let url = '/Gaea_database/sqlInyardOrDel';
        let exe_sql = this.exe_sql
        if (exe_sql.lastIndexOf(';') !=-1 ) {
          exe_sql = exe_sql.substring(0, exe_sql.lastIndexOf(';'));
        }
        let params = {
          v_wait_id: this.row_id,
          op_type: 1,
          exe_sql,
          exe_type: 1,
          userMip: this.$store.state.username,
        }
        this.btnDisabled = true
        //进度条百分比恢复初始化，避免第一次调用到一半失败再次调用时显示第一次失败的进度值,现将失败成功提示隐藏
        this.percentage = 0;
        this.exeResult = ''
        app.post(url, params, res => {
          if (res.data.code === 'Gaea30055') {
            /*this.isShowBar = true;
            this.timer = window.setInterval( () => {
              this.showBar(res.data.data.node_id)
            }, 800)*/
            this.exeResult = 'success'
          } else {
            this.exeResult = 'failure'
          }
          if (res.data.code != '505') {
            this.$alert(res.data.msg, {title: '提示', type: 'info'})
          }
          
          this.btnDisabled = false
          for (let i of res.data.data.wait_inyard_list) {
              this.twoTableData[this.index].exe_sql = i.exe_sql;
              this.twoTableData[this.index].status = i.status;
              this.twoTableData[this.index].no_success_result = i.no_success_result;
              this.twoTableData[this.index].affected_rows = i.affected_rows;
              this.twoTableData[this.index].exe_cost_time = i.exe_cost_time;
          }
        }, this.error)
      },
      showBar (node_id) {
        app.post('/Gaea_database/showProcessBar', {
          node_id,
        }, res => {
          let code = res.data.code
          this.percentage = res.data.data.iprogress_bar
          if (code === 'Gaea10031') {     //请求接口成功
            if (res.data.data.iprogress_bar >= 100) {
              //安装节点进度完成，则将输入框ip清空，避免用户再次安装
              clearInterval(this.timer)
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
      onSubmit() {
        let msg = this.validateForm(),
            url = '',
            params = {};
        let formObj = this[this.activeName + 'Form']
        let server_id = formObj.host
        if (msg) {
          this.$alert(msg, {
            title: '提示', type: 'info'
          })
          return;
        }
        if (this.activeName === 'one') {
          url = '/Gaea_database/dmlDdlQuery';
          params = {
            server_id,
            text_oper_user: formObj.operator,
            text_db_name: formObj.database,
            text_exe_sql: formObj.command,
            time_type: formObj.queryMode,
            time_start: formObj.startDate,
            time_end: formObj.endDate,
            userMip: this.$store.state.username
          }
        } else if (this.activeName === 'two') {
          url = '/Gaea_database/dbaAuditQuery'
          params = {
            server_id,
            db_name: formObj.DB || '0',
            query_type: formObj.filterType,
            submitter_mip: formObj.submiter || '0',
          }
        }
        //请求接口并禁用按钮
        this.btnDisabled = true
        app.post(url, params, this.submitSuccess, this.error)
      },

      resetForm() {
        app.tools.resetFormData(this[this.activeName + "Form"], this[this.activeName + "FormInitData"])
      },
      cellClick({
        row,
        column,
        cell
      }) {
        if (column.label === '执行命令') {
          this.dialogVisible = true;
          this.exe_sql = row.exe_sql;
        }
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
          }
        })
      },
      //获取主机列表数据
      getHostList (val) {
        //主机清空
        this[this.activeName + 'Form'].host = ''
        this[this.activeName + 'HostList'] = []
        //清空db
        this[this.activeName + 'Form'].DB = ''
        this[this.activeName + 'DBList'] = []

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
      //获取应用列表数据
      getAppList (val) {
        //应用/主机清空
        this[this.activeName + 'Form'].region = ''
        this[this.activeName + 'Form'].host = ''
        this[this.activeName + 'RegionList'] = []
        this[this.activeName + 'HostList'] = []
        //清空db
        this[this.activeName + 'Form'].DB = ''
        this[this.activeName + 'DBList'] = []

        this[this.activeName + 'Form'].dept && val && app.post('/Gaea_database/getApp', {
          deptId: this[this.activeName + 'Form'].dept,
          envId: val,
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

      clearData () {
        //清空环境所选内容
        this[this.activeName + 'Form'].envType=""
        //清空应用
        this[this.activeName + 'Form'].region = ''
        this[this.activeName + 'Form'].host = ''
        //清空主机
        this[this.activeName + 'RegionList'] = []
        this[this.activeName + 'HostList'] = []
        //清空db
        this[this.activeName + 'Form'].DB = ''
        this[this.activeName + 'DBList'] = []
      },

      //获取主机列表数据
      getServerList (val) {
        //主机清空
        this[this.activeName + 'Form'].host = ''
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
      },

      //获取数据库列表数据
      getDBList (val) {
          this[this.activeName + 'Form'].DB = ''
          this[this.activeName + 'DBList'] = []
          val && app.post('/Gaea_database/getDB', {
            serverId: val + ''
          }, response => {
              for (let i of response.data.dbList) {
                this[this.activeName + 'DBList'].push({
                  label: i.dbName,
                  value: i.dbName
                })
              }
          })
      },
      getCommiter () {
        app.post('/Gaea_database/waitInyardSubmitterList', {
          userMip: this.$store.state.username
        }, response => {
            for (let i of response.data.data.submitter_list) {
              i.label = i.user_all;
              i.value = i.username
              this.twoSubmiterList.push(i)
            }
            for (let i of response.data.data.wait_inyard_list) {
              i.last_update_date = app.tools.formatDate(i.last_update_date)
              if (i.db_all) {
                let arr = i.db_all.split(':')
                i.db_ip = arr[0]
                i.db_port = arr[1]
                i.db = arr[2]
              }
              this.twoAllTableData.push(i)
            }
            this.twoTotal = this.twoAllTableData.length;
            app.tools.changeTable(this,'two')
        })
      },
      getDmlDdlLog () {
        app.post('/Gaea_database/dmlDdlLog', {
          userMip: this.$store.state.username
        }, response => {
            for (let i of response.data.data.dmlddl_log_list) {
              this.oneAllTableData.push(i)
            }
            this.oneTotal = this.oneAllTableData.length;
            app.tools.changeTable(this)
        })
      }, 
    },
    created() {
      /*获取部门下拉框选项内容*/
      this.getDeptList();
      //获取环境下拉列表数据
      this.getEnvList();
      //获取提交人数据和待审核列表数据
      this.getCommiter();
      //获取DDL 操作履历数据
      this.getDmlDdlLog()
    },
    destroyed () {
      //组件销毁，清除timer
      clearInterval(this.timer)
    },
  }
</script>