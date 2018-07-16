<template>
	<div class='box'>
		<div class="all-result">
			<div class="main-middle">
				<el-tabs v-model="activeName">
					<el-tab-pane label="执行结果" name="exeRes">
						<p class='title m-b20'>执行结果:<i class="fa fa-refresh fa-lg refresh" @click='refreshData'></i></p>	
						<el-form :model='twoForm' label-width='0'>
							<el-form-item label-width='0'>
								<el-col :md='18'>
									<el-input readonly type='textarea' :rows='20' v-model='twoForm.exeResult'></el-input>
								</el-col>
							</el-form-item>
						</el-form>
					</el-tab-pane>

					<el-tab-pane label="操作记录" name="operRecord">
						<v-table 
							:data='operRecordTableData' 
							:tableHeadName='operRecordTableHeadName' 
							:isShowComments='true'
							labelName='详情'
							@openRemarkDialog='viewDetail'
						>
							
						</v-table>

						<div class="block pagination-wraper">
						   <el-pagination
						     v-if='operRecordTableData.length>0'
						   	 @size-change='sizeChange'
						   	 @current-change='currentChange'
						     :page-sizes="[10, 15, 20, 25, 30, 35, 40, 45, 50]"
						     layout="total, sizes, prev, pager, next, jumper"
						     :page-size='operRecordPageSize'
						     :total="operRecordTotal">
						   </el-pagination>
						</div>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>

		<el-dialog
			title='操作详细信息'
			:visible.sync="dialogVisible"
			width="60%"
		>
			<div>
				<el-input readonly type='textarea' :rows='20' v-model='operDetailMsg'></el-input>
			</div>

			<div class='text-right m-tb15'>
		    	<span slot="footer" class="dialog-footer">
		    	  	<el-button type="primary" @click="dialogVisible=false" size='small'>关闭</el-button>
		    	</span>
	    	</div>
		</el-dialog>
	</div>
</template>

<style lang='scss' scoped>
.all-result {
	.iplist {
		span {
			display: block;
		    width: 150px;
		    word-break: break-word;
		}
	}
	.refresh {
		cursor: pointer;
	}
}
</style>

<script type="text/javascript">
	export default {
		data () {
			return {
				activeName: 'exeRes',
				dialogVisible: false,
				operDetailMsg: '',
				twoForm: {
					exeResult: ''
				},
				operRecordTableData: [],
				operRecordAllTableData: [],
				operRecordTableHeadName: {
					iplist: '主机',
					task: '执行操作',
					bo: '状态',
					itime: '操作时间',
				},
				operRecordPageSize: 10,
				operRecordTotal: 10,
				operRecordCurrentPage: 1,
			}
		},
		created () {
			let url = '/auto/allresult'
			app.post(url, {
				mipuser: this.$store.state.username
			}, res => {
				let code = res.data.code;
				this.operRecordAllTableData = []
				if (code === '100001') {
					this.twoForm.exeResult = res.data.data[0].info
					for (let i of res.data.data) {
						i.bo = i.bo === '0' ? '运行中' : i.bo === '2' ? '失败' : '成功'
						this.operRecordAllTableData.push(i)
					}
					this.operRecordTotal = this.operRecordAllTableData.length;
					//重新计算分页
					app.tools.changeTable(this, 'operRecord')
				}
			})
		},
		methods: {
			viewDetail (row, index) {
				this.dialogVisible = true
				this.operDetailMsg = row.info
			},

			sizeChange (pageSize) {
				app.tools.sizeChange(this, pageSize)
			},
			currentChange (currentPage) {
				app.tools.currentChange(this, currentPage)
			},
			/*获取最新数据*/
			refreshData () {
				app.post('/auto/newresult', {
					mipuser: this.$store.state.username
				}, res => {
					let code = res.data.code;
					if (code === '100001') {
						this.twoForm.exeResult = res.data.data[0].info
					}
				})
			}
		}
	}
</script>