<template>
	<div class="box">
		<div class="IP-List">
			<div class="main-middle">
				<v-table 
	    			:data='oneTableData' 
	    			:tableHeadName='tableHeadName'
	    			:showOperator='false'
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
		</div>
	</div>
</template>

<script type="text/javascript">
	import { mapState } from "vuex";
	export default {
		data () {
			return {
				activeName: 'one',
				oneTableData: [],
				oneAllTableData: [],
				tableHeadName: {
					start_time: 'Date',
					vmname: 'Hostname',
					ipaddress: 'IP',
					app_name: 'appname',
					dept_name: 'dept',
					pm_name: 'pmname',
					sysadmin_name: 'sysadmin',
					appadmin_name: 'appadmin',
					cpu_count: 'vCPU',
					mem_count: 'RAM',
					disk_storage: 'Disk',
				},
				onePageSize: 10,
				oneCurrentPage: 1,
				oneTotal: 1,

			}
		},
		computed: {
			...mapState(['pages'])
		},
		methods: {
			getNetVlanList (netvlan) {
				app.post('/auto/netvlanlist', {
					netvlan,
					mipuser: this.$store.state.username,
				}, res => {
					for (let i of res.data.data) {
						this.oneAllTableData.push(i)
					}
					this.oneTotal = this.oneAllTableData.length;
					app.tools.changeTable(this)
				})
			},
			/*页面每页显示数变化时重新分页*/
			sizeChange(pageSize) {
			  app.tools.sizeChange(this, pageSize)
			},
			/*当前页码变化时重新分页*/
			currentChange(currentPage) {
			  app.tools.currentChange(this, currentPage)
			},
		},

		created () {
			let pages = this.pages
			//获取ipList
			this.getNetVlanList(pages.params.ipaddress)
		}

	}
</script>