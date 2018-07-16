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
          :min-width="key==='no_success_result' || key==='db_all' || key==='MEMORY_USED' || key==='doc_subject' ? '160' : key==='hostname' || key==='app_administrator' || key==='COMMAND' || key==='DBA' || key==='db_port' || key==='db_name' || key==='exe_cost_time' ? '100' : key==='ticketNumber' || key==='createTime' || key==='modifyTime' ? '180' : ''"
        >
          <template slot-scope="scope">
            <div v-if='key==="role" || key==="group_dns" || key==="exe_sql" || key==="no_success_result" || key==="result_output" || key==="INFO" || key==="sql" || key==="remark" || key==="cmd"' :class='key'>
              <el-tooltip placement="bottom" popper-class="toolTipClass">
                <div slot="content">{{scope.row[key]}}</div>
                <span>{{scope.row[key]}}</span>
              </el-tooltip>
            </div>
            <div v-else-if='key==="status"'>
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
            <div v-else @click="tdClick(scope.row,scope.$index,scope.column,index)" :class='key'>
              <span>{{scope.row[key]}}</span>
            </div>
          </template>
        </el-table-column>
        
        <el-table-column v-if='showOperator && Object.keys(tableHeadName).length > 0'
            :label="labelName"
            :width="width">
           <template slot-scope="scope">
            <div v-if='operatorTexts.length > 2'>
               <el-button @click='editRow(scope.row, item, scope.$index, index)' type="text" size="small" v-for='(item,itemIndex) in operatorTexts' :key='itemIndex'>{{item}}</el-button>
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
              if (this.pages.to === 'workMange' || (this.pages.to === 'myMattersFirstPage')) {
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
            deleteRow (row, index, title) {
              if (this.pages.to === 'workMange' ||  (this.pages.to === 'myMattersFirstPage')) {
                this.$emit('viewDetail', {row,type: 'flowHistory'})
              } else if (this.pages.to.indexOf("ProcessingList") != -1) {
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
            }
        },
        
    }
</script>

