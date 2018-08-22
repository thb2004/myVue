<template>
    <div class='component-table'>
      <el-table
        :data="data"
        :tableHeadName="tableHeadName"
        :stripe='stripe'
        :border='border'
        :showOperator='showOperator'
        :operatorTexts='operatorTexts'
        :operatorText='operatorText'
        :isShowComments='isShowComments'
        :index='index'
        :default-sort = "{prop: 'createTime', order: 'descending'}"
        @cell-click='cellClick'
        @sort-change='sort'
        style="width: 100%"
      >
        <el-table-column :type="type" v-if='type==="expand"'>
            <template slot-scope="props">
                <el-form label-width='90px' class="my-table-expand">
                  <el-form-item label="虚拟机名称:">
                    <span>{{ props.row.vmname }}</span>
                  </el-form-item>
                  <el-form-item label="vc_center:">
                    <span>{{ props.row.vc_center }}</span>
                  </el-form-item>
                  <el-form-item label="产品模块:">
                    <span>{{ props.row.pm_name }}</span>
                  </el-form-item>
                  <el-form-item label="应用名称:">
                    <span>{{ props.row.app_name }}</span>
                  </el-form-item>
                  <el-form-item label="系统管理员:">
                    <span>{{ props.row.sysadmin_name }}</span>
                  </el-form-item>
                  <el-form-item label="应用管理员:">
                    <span>{{ props.row.appadmin_name }}</span>
                  </el-form-item>
                  <el-form-item label="存储位置:">
                    <span>{{ props.row.disk_storage }}</span>
                  </el-form-item>
                </el-form>
          </template>
        </el-table-column>

        <el-table-column 
          v-for='(value,key) in tableHeadName'
          :prop='key' 
          :key='key' 
          :label='value' 
          :sortable='isSort && key==="createTime"'
          :width='isSetTableHeadWidth && tableHeadObj[key]'
          :min-width="key==='no_success_result' || key==='db_all' || key==='MEMORY_USED' || key==='doc_subject' || key==='opComment' ? '160' : key==='hostname' || key==='app_administrator' || key==='COMMAND' || key==='DBA' || key==='db_port' || key==='db_name' || key==='exe_cost_time' ? '100' : key==='ticketNumber' || key==='createTime' || key==='modifyTime' ? '180' : ''"
        >
          <template slot-scope="scope">
            <div v-if='showTips[key]' :class='key'>
              <el-tooltip placement="bottom" popper-class="toolTipClass">
                <div slot="content">{{scope.row[key]}}</div>
                <span>{{scope.row[key]}}</span>
              </el-tooltip>
            </div>
            <div v-else-if='key==="status" && !isShowIcon'>
               <span v-if="scope.row[key]==='pending'" class='pengding'>经理审批中</span>
               <span v-else-if="scope.row[key]==='draft'" class='draft'>草稿</span>
               <span v-else-if="scope.row[key]==='dispose'" class='dispose'>运维审批中</span>
               <span v-else-if="scope.row[key]==='completed'" class='completed'>已完成</span>
               <span v-else>{{scope.row.status}}</span>
            </div>
            <div v-else-if='key==="zabbix_status"' @click="tdClick(scope.row,scope.$index,scope.column,index)" :class='key'>
              <span :class='scope.row[key]==="Disabled"?"status-disabled":scope.row[key]==="Enabled"?"status-enabled":""'>{{scope.row[key]}}</span>
            </div>
            <div v-else-if='key==="job_status"' :class='key'>
              <span v-if="scope.row[key]==='completed'" class='success'>已完成</span>
                <span v-else-if="scope.row[key]==='failed'" class='failure'>失败</span>
                <span v-else-if="scope.row[key]==='running'" class='ongoing'>进行中</span>
                <span v-else-if="scope.row[key]==='canceled'" class='cancel'>已取消</span>
                <span v-else-if="scope.row[key]==='delete'" class='recycled'>已回收</span>
                <span v-else>{{scope.row[key]}}</span>
            </div>
            <div v-else-if='key==="op_03"' :class='key'>
                <el-progress 
                  :text-inside="true" 
                  :stroke-width="18" 
                  :percentage="parseInt(scope.row[key])"
                  :class='[scope.row[key] >= 80 ? "use-warning" : "use-success"]'
                ></el-progress>
            </div>

            <div v-else-if='key==="UserNav"' :class='key'>
                <el-tree
                  :data='scope.row[key]'
                  :props='props'
                  :default-checked-keys='scope.row["defaultChecked"]'
                  show-checkbox
                  node-key='NavName'
                  @check='checkChange'
                >
                </el-tree>
            </div>

            <div v-else-if='key==="userPriOp"' :class='key'>
              <el-button 
                  @click='setuserinfo(scope.row,scope.$index)' 
                  type="primay" 
                  size="small"  
                  style='background: #148EF5;color:#fff'
              >
              修 改     
              </el-button>
            </div>

            <div v-else-if='key==="UserPri"' :class='key'>
               <el-select v-model="scope.row['userPriSel']" multiple filterable placeholder="请选择">
                   <el-option
                     v-for="item in scope.row[key]"
                     :key="item.Id"
                     :label="item.APIName + (item.Enable === '1' ? '(opened)' : '(closed)')"
                     :value="item.Id + '_' + item.Enable">

                     <span :style="{'float':'left','color': (item.Enable==='1' ? 'red' : 'blue')}">{{ item.APIName}}</span>
                     <span :style="{'float':'right','color': (item.Enable==='1' ? 'red' : 'blue'),'margin-right': '30px'}">{{ item.Enable === '1' ? '已开启' : '已关闭'}}</span>
                   </el-option>
                 </el-select>
            </div>

            <div v-else-if='key==="opComment"' :class='key'>
                <div v-if='["3","6"].indexOf(scope.row[key])!=-1'>       <!-- 下线和升级 -->
                  <el-button @click='stopApp(scope.row,scope.$index)' type="primay" size="small" class='fa fa-pause-circle' style='background: #148EF5;color:#fff'></el-button>
                  <el-button @click='editApp(scope.row,scope.$index)' type="primay" size="small" class='fa fa-arrow-circle-up' style='background: #148EF5;color:#fff'></el-button>
                </div>
                <div v-else-if='scope.row[key]==="9"' :class='key'> <!-- 停止 -->
                  <el-button @click="startApp(scope.row,scope.$index)" type="primay" size="small" class='fa fa-play-circle-o' style='background: #148EF5;color:#fff'></el-button>
                </div>

               <div v-else :class='key'> <!-- 不可操作状态 -->
                 <el-button type="info" size="small" class='fa fa-ban' disabled></el-button>
               </div>
            </div>

            <div v-else-if='key==="Status" && isShowIcon' :class='key'>
                <span v-show='scope.row["disabledStatus"]'>
                     <el-badge :value='scope.row["disabledStatus"]' v-show='scope.row["disabledStatus"] > 1'>
                       <i class="fa fa-lg fa-exclamation-triangle" style="color: #dd514c"></i>
                     </el-badge>
                     <i class="fa fa-lg fa-exclamation-triangle" style="color: #dd514c" v-show='scope.row["disabledStatus"] === 1'></i>
                </span>

                <span v-show='scope.row["normalStatus"]'>
                     <el-badge :value='scope.row["normalStatus"]' v-show='scope.row["normalStatus"] > 1'>
                       <i class="fa fa-lg fa-check-circle-o" style="color: #148EF5"></i>
                     </el-badge>
                     <i class="fa fa-lg fa-check-circle-o" style="color: #148EF5" v-show='scope.row["normalStatus"] === 1'></i>
                </span>
            </div>

            <div v-else-if='key==="approvalOperator"' :class='key'>
              <div v-if='scope.row[key]==="1"' :class='key'> <!-- 停止 -->
                <el-button @click='approve(scope.row,scope.$index)' type="primay" size="small" class='fa fa-arrow-circle-o-right' style='background: #148EF5;color:#fff'></el-button>
                <el-button @click='reject(scope.row,scope.$index)' type="primay" size="small" class='fa fa-hand-stop-o ' style='background: #148EF5;color:#fff'></el-button>
              </div>
               <div v-else :class='key'> <!-- 不可操作状态 -->
                 <el-button type="info" size="small" class='fa fa-ban' disabled></el-button>
               </div>
            </div>

            <div v-else-if='key==="approvalStatus"' :class='key'>
                <span :class='["common", scope.row.Status === "1" ? "approving" : scope.row.Status === "2" ? "approve-success" : "approve-reject"]'>{{scope.row[key]}}</span>
            </div>

            <div v-else-if='key==="backup_result_type"' :class='key'>
                <span :class='["common", scope.row[key] === "备份失败" ? "approve-reject" : "approve-success"]'>{{scope.row[key]}}</span>
            </div>

            <div v-else-if='key==="MonitorLink" && isShowIcon' :class='key'>
                <a v-for='(item,index) in scope.row[key].split(";")' :key='index' :href='item' v-show='item' target="_blank">
                   <i class="fa fa-lg fa-chain" style='color:#0e90d2'></i>
                </a>
            </div>

            <div v-else @click="tdClick(scope.row,scope.$index,scope.column,index)" :class='key'>
              <span>{{scope.row[key]}}</span>
            </div>
          </template>
        </el-table-column>
        
        <el-table-column v-if='showOperator && Object.keys(tableHeadName).length > 0'
            :label="labelName"
            :width="width">
           <template slot-scope="scope">
            <div v-if='operatorTexts.length > 2' :class='{"no-margin": showNoMargin}'>
               <el-button @click='editRow(scope.row, item, scope.$index, index)' type="text" size="small" v-for='(item,itemIndex) in operatorTexts' :key='itemIndex' v-show='item'>{{item}}</el-button>
            </div>
            <div v-else-if='!isShowComments'>
               <el-button @click="editRow(scope.row,operatorTexts[0],scope.$index, index)" type="text" size="small">{{operatorTexts[0]}}</el-button>
               <el-button @click='deleteRow(scope.row, scope.$index, operatorTexts[1])' type="text" size="small">{{operatorTexts[1]}}</el-button>
            </div>
            <div v-else>
              <el-button @click='view(scope.row,scope.$index)' type="text" size="small">{{operatorText}}</el-button>
            </div>
           </template>
         </el-table-column>
      </el-table>
     </div>
</template>
<style lang='scss'>

.component-table {
  .el-table__empty-block {
    display: none;
  }
  .my-table-expand label {
    color: #99a9bf;
  }
  .my-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
  }
  .no-margin {
    .el-button+.el-button {
      margin-left: 0;
    }
  }
}

</style>
<script type="text/javascript">
  import {mapState} from 'vuex'
    export default {
        name: 'vTable',
        props: {
            data: Array,   //表单数据
            isSort: {
              type: Boolean,
              default: false,
            },
            showNoMargin: {
              type: Boolean,
              default: false,
            },
            isSetTableHeadWidth: {
              type: Boolean,
              default: false,
            },
            tableHeadObj: {
              type: Object,
              default: function () {
                return {}
              }
            },
            showTips: {
              type: Object,
              default: function () {
                return {}
              }
            },
            isShowIcon: {
              type: Boolean,
              default: false,
            },
            type: {
              type: String,
              default: '',
            },
            width: {
                type: String,
                default: '120',
            },
            index: {
              type: Number,
              default: 0
            },
            labelName: {
              type: String,
              default: '操作'
            },
            isShowComments: {
              type: Boolean,
              default: false
            },
            operatorText: {
              type: String,
              default: '查看'
            },
            operatorTexts: {
              type: Array,
              default: function () {
                return ['编辑','删除']
              }
            },
            props: {
              type: Object,
              default: function () {
                return {}
              }
            }, 
            hiddenField: {
              type: Object,
              default: function () {
                return {}
              }
            },
            showOperator: {
              type: Boolean,
              default: true
            },
            stripe: {
              type: Boolean,
              default: true,
            },
            border: {
              type: Boolean,
              default: false,
            },
            tableHeadName: Object,   //表单表头名字
        },
        data () {
          return {
            loginType: '',
            pageName: ''
          }
        },
        computed: {
          ...mapState(['pages'])
        },
        methods: {
            editRow (row, title, $index, tableIndex) {
              if (this.pages.to === 'workMange' || (this.pages.to === 'myMatters')) {
                this.$emit('viewDetail',{row,type: 'viewDetail'})
              } else {
                this.$emit('editRow', {
                  row,
                  title,
                  $index,
                  tableIndex
                })
              }
            },
            startApp (row, $index) {
              this.$emit('startApp', {row, $index})
            },
            approve (row, $index) {
              this.$emit('approve', {row, $index})
            },
            reject (row, $index) {
              this.$emit('reject', {row, $index})
            },
            stopApp (row, $index) {
              this.$emit('stopApp', {row, $index})
            },
            editApp (row, $index) {
              this.$emit('editApp', {row, $index})
            },
            deleteRow (row, index, title) {
              if (this.pages.to === 'workMange' ||  (this.pages.to === 'myMatters')) {
                this.$emit('viewDetail', {row,type: 'flowHistory'})
              } else if (this.pages.to.indexOf("processingList") != -1) {
                this.$emit('deleteRow', {row, title, index})
              } else {
                this.data.splice(index, 1)
              }
            },
            view (row, index) {
                this.$emit('openRemarkDialog',row, index)
            },
            cellClick (row, column, cell, event) {
              this.$emit('cellClick',{row,column,cell,event})
            },
            tdClick (row, index, column, tableIndex) {
              this.$emit('tdClick',{row, index, column, tableIndex})
            },
            sort({column, prop, order}) {
              this.$emit('sort', {column, prop, order})
            },

            checkChange (curCheckdNode, hasChecked) {
              this.$emit('checkChange', {curCheckdNode, hasChecked})
            },

            setuserinfo (row, index) {
              this.$emit('setuserinfo', {row, index})
            }
        },
        
    }
</script>

