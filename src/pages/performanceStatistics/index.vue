<template>
	<div class="box">
		<div class="performance-statistics">
			<div class="main-middle">
				<el-tabs v-model="activeName">
					<el-tab-pane label="性能Dashbord" name="one">
						<p class='title m-b10'>ORZDBA服务器转态显示</p>
						<v-table 
							v-if='oneTableData.length > 0'
							:data='oneTableData' 
							:tableHeadName='oneTableHeadName'
							:showOperator='false'
						></v-table>

						<div class="block pagination-wraper">
						   <el-pagination
						   	 @size-change='sizeChange'
						   	 @current-change='currentChange'
						     :page-sizes="[1, 2, 3, 4, 5]"
						     layout="total, sizes, prev, pager, next, jumper"
						     :page-size='twoPageSize'
						     :total="twoTotal">
						   </el-pagination>
						</div>	
					</el-tab-pane>

					<el-tab-pane label="DB级别周报" name="two">
						<el-form :model='twoForm' label-width='8rem'>
							<el-row>
								<el-col :md='9'>
									<el-form-item label="周报类型选择">
									    <el-select v-model="twoForm.weekly" placeholder="请选择">
											<el-option v-for='(item,index) in twoWeeklyList' :key='index' :label='item.label' :value='item.value'></el-option>
									    </el-select>
									</el-form-item>
								</el-col>

								<el-col>
									<el-form-item label="主机号DB选择" class='title'>
									    <el-checkbox v-model="twoForm.chooseEnv">仅生产环境</el-checkbox>
									</el-form-item>
								</el-col>

								<el-col :md='9'>
								   <el-form-item label="事业部">
								       <el-select v-model="twoForm.dept" placeholder="请选择">
								           <el-option v-for='(item,index) in twoDeptList' :label='item.label' :value='item.value' :key='index'></el-option>
								       </el-select>
								   </el-form-item>
								 </el-col>

								 <el-col :md='{span:9,offset:2}'>
								   <el-form-item label="域">
								       <el-select v-model="twoForm.region" placeholder="请选择">
								            <el-option v-for='(item,index) in twoRegionList' :label='item.label' :value='item.value' :key='index'></el-option>
								       </el-select>
								   </el-form-item>
								</el-col>

								<el-col :md='9'>
								   <el-form-item label="主机">
								       <el-select v-model="twoForm.host" placeholder="请选择主机">
								            <el-option v-for='(item,index) in twoHostList' :label='item.label' :value='item.value' :key='index'></el-option>
								       </el-select>
								   </el-form-item>
								</el-col>

								 <el-col :md='{span:9,offset:2}'>
								     <el-form-item label="DB">
								         <el-select v-model="twoForm.DB" placeholder="请选择DB">
								              <el-option v-for='(item,index) in twoDbList' :label='item.label' :value='item.value' :key='index'></el-option>
								         </el-select>
								     </el-form-item>
								 </el-col>
							</el-row>

							<div class='btn-group-lg'>
							    <el-button type="primary" @click="onSubmit" size='small' :disabled='btnDisabled'>查询</el-button>
							    <el-button @click="resetForm" size='small'>重置</el-button>
							</div>

						</el-form>

					</el-tab-pane>

					<el-tab-pane label="自增ID查询" name="three">
						<el-form :model='threeForm' label-width='8.33rem'>
							<el-row>
								<el-col>
									<p class="title m-b20">主机和表过滤</p>
								</el-col>
								<el-col :md='9'>
									<el-form-item label="域">
									    <el-select v-model="threeForm.region" placeholder="请选择">
											<el-option v-for='(item,index) in threeRegionList' :key='index' :label='item.label' :value='item.value'></el-option>
									    </el-select>
									</el-form-item>
								</el-col>

								<el-col :md='{span:9,offset:2}'>
								   <el-form-item label="主机">
								       <el-select v-model="threeForm.host" placeholder="请选择主机">
								            <el-option v-for='(item,index) in threeHostList' :label='item.label' :value='item.value' :key='index'></el-option>
								       </el-select>
								   </el-form-item>
								</el-col>

								<el-col>
									<p class="title m-b20">对象、表和使用率过滤</p>
								</el-col>

								<el-col :md='9'>
								   <el-form-item label="库名">
								   		<el-input
								   			v-model='threeForm.libName'
								   			placeholder='请输入'
								   		>
								   		</el-input>
								   </el-form-item>
								 </el-col>

								 <el-col :md='{span:9,offset:2}'>
								   <el-form-item label="表名">
								   		<el-input
								   			v-model='threeForm.tableName'
								   			placeholder='请输入'
								   		>
								   		</el-input>
								   </el-form-item>
								 </el-col>

								 <el-col :md='9'>
								   <el-form-item label="自增ID使用率大于">
								   		<el-input
								   			v-model='threeForm.usageRate'
								   			placeholder='请输入'
								   		>
								   			<template slot="append">%</template>
								   		</el-input>
								   </el-form-item>
								 </el-col>
							</el-row>

							<div class='btn-group-lg'>
							    <el-button type="primary" @click="onSubmit" size='small' :disabled='btnDisabled'>查询</el-button>
							    <el-button @click="resetForm" size='small'>重置</el-button>
							</div>
						</el-form>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</div>
</template>


<style lang='scss'>
	
</style>

<script type="text/javascript">
	export default {
		data () {
			return {
				activeName: 'one',
				onePageSize: 1,				//table表单每页显示数		
		 		oneCurrentPage: 1,			//table表单当前页码	
				oneTotal: 10,				//table表单总页数
				twoPageSize: 1,				//请table表单每页显示数		
		 		twoCurrentPage: 1,			//table表单当前页码	
				twoTotal: 10,				//table表单总页数
				oneTableData: [],			//table数据
				oneTableHeadName: {			//table表头名
					loadtime: 'Load time',
					ip: 'IP:PORT',
					role: 'Role',
					usr: 'Usr',
					sys: 'Sys',
					idl: 'Idle',
					await: 'Await',
					util: 'IO_util',
					qps: 'QPS',
					tps: 'TPS',
					run: 'Run_Threads',
					con: 'Conn_Threads'
				},		
				twoTableData: [],			//table数据
				twoTableHeadName: {			//table表头名
					
				},
				twoForm: {
					weekly: '',
					chooseEnv: '',
					dept: '',
					region: '',
					host: '',
					DB: '',
				},
				twoWeeklyList: [],
				twoDeptList: [],
				twoRegionList: [],
				twoHostList: [],
				twoDbList: [],
				threeForm: {
					region: '',
					host: '',
					libName: '',
					tableName: '',
					usageRate: '',
				},
				threeRegionList: [],
				threeHostList: [],
				btnDisabled: false	
			}
		},
		methods: {
			sizeChange (pageSize) {
				app.tools.sizeChange(this, pageSize)
			},
			currentChange (currentPage) {
				app.tools.currentChange(this, currentPage)
			},
			onSubmit () {},
			resetForm () {},

		},

		created () {
			//获取table数据
			let url = 'get_db_refresh',
				params = {t: 3}
			app.post(url, params, function (response) {
				for (let i of response.data.db_refresh_list) {
					this.oneTableData.push(i)
				}
			}, function () {})
			/*测试代码*/
			axios.get('http://localhost:8080/static/get_db_refresh.json').then(response => {
				for (let i of response.data.db_refresh_list) {
					this.oneTableData.push(i)
				}
			}).catch(err => {
				
			})
		}
	}
</script>