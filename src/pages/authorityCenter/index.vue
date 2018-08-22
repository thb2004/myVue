<template>
    <div class='box'>
    	<div class='authority-center'>
    		<div class='main-middle'>
    			<el-tabs v-model="activeName">
    				<el-tab-pane label="视图及api权限控制" name="one">
						<div class="compenent-form">
							<el-form label-width='60px'>
								<el-row :gutter='30'>
									<el-col :md='{span:8,offset:16}' :sm='{span:12,offset:12}'>
										<el-form-item>
											<el-input v-model="searchText" placeholder='请输入搜索条件' @keyup.enter.native='search'>
												<el-button @click='search' slot="append" icon="el-icon-search" class='search-btn'></el-button>
											</el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</el-form>
							<v-table 
								:data='oneTableData' 
								:tableHeadName='oneTableHeadName'
								:props='props'
								:showOperator='false'
								:isSetTableHeadWidth='true'
								@setuserinfo='setuserinfo'
								@checkChange='checkChange'
								class='m-t20'
							></v-table>

							<div class="block pagination-wraper">
							   <el-pagination
							   	 v-if='oneTableData.length > 0'
							   	 @size-change='sizeChange'
							   	 @current-change='currentChange'
							     :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]"
							     :current-page.sync="oneCurrentPage"
							     layout="total, sizes, prev, pager, next, jumper"
							     :page-size='onePageSize'
							     :total="oneTotal">
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
	.authority-center .el-table--enable-row-hover .el-table__body tr:hover>td {
		background: #fff;
	}
</style>
<script type="text/javascript">
	export default {
		data () {
			return {
				activeName: 'one',
				searchText: '',
				preText: '',
				onePageSize: 10,
				oneTotal: 1,
				oneCurrentPage: 1,
				oneTableData: [],
				oneTableHeadName: {
					Id: 'Id',
					UserName: '用户Mip',
					UserNav: '导航树',
					UserPri: 'api列表(红色代表此api已开启,蓝色代表未开启)',
					userPriOp: '操作',
				},
				tableHeadObj: {
					Id: 100,
					UserName: 150,
					UserNav: 300,
					UserPri: 500,
				},
				props: {
					children: 'Children',
					label: 'NavName'
				},
			}
		},

		methods: {
			getuserinfo (opType) {
				let offset = '0';
				let searchtext = ''
				switch (opType) {
					case 'search': 				//搜索按钮
						//当前页码重置为第一页
						this[this.activeName + 'CurrentPage'] = 1;
						offset = '0'
						//记录此刻的搜索文字
						this.preText = searchtext = this.searchText;
						break;
					case 'pageChange':
						searchtext = this.preText;
						offset = this[this.activeName + 'PageSize'] * (this[this.activeName + 'CurrentPage'] - 1) + ''
						break;
					case 'refresh':
						this[this.activeName + 'PageSize'] = 10;
						this[this.activeName + 'CurrentPage'] = 1;
						offset = '0';
						searchtext = '';
				}
				app.post('/adm/v1/getuserinfo', {
					pagesize: this[this.activeName + 'PageSize'] + '',
					offset,
					searchtext,
				}, res => {
					this[this.activeName + 'TableData'] = []
					let index = 0
					for (let i of res.data.Data.Users) {
						i.firstnavflag = i.FirstNavFlag
						i.secondnavflag = i.SecondNavFlag
						i.thirdnavflag  = i.ThirdNavFlag
						i.userapiflag = i.APIAccessFlag
						i.userPriSel = []
						this.getNav(i, index++)
						this.oneTableData.push(i)
					}
					this[this.activeName + 'Total'] = res.data.Data.Counts;
				})
			},

			getNav (obj, index) {
				obj.firstNav = {}
				obj.secondNav = {}
				obj.thirdNav = {}
				obj.allRouter = []
				obj.defaultChecked = []
				for (let i of obj.UserNav) {
					obj.allRouter.push(i)
					i.NavName = i.NavName
					obj.firstNav[i.NavName] = 'success'
					//i.Enable === '1' && i.NavName && obj.defaultChecked.push(i.NavName)
					//i.disabled = i.Enable === '1' ? true: false
					i.index = index
					if (i.Children) {
						for (let j of i.Children) {
							obj.allRouter.push(j)
							!j.Children && j.Enable === '1' && j.NavName && obj.defaultChecked.push(j.NavName)
							j.index = index
							j.NavName = j.NavName
							obj.secondNav[j.NavName] = 'success'
							//j.disabled = j.Enable === '1' ? true: false
							if (j.Children) {
								for (let k of j.Children) {
									obj.allRouter.push(k)
									k.Enable === '1' && k.NavName && obj.defaultChecked.push(k.NavName)
									k.index = index
									k.NavName = k.NavName
									obj.thirdNav[k.NavName] = 'success'
									//k.disabled = k.Enable === '1' ? true: false
								}
							}
						}
					}
				}
				return obj
			},
			search () {
				this.getuserinfo('search')
			},
			sizeChange (pageSize) {
				this[this.activeName + 'PageSize'] = pageSize;
				this.getuserinfo('pageChange')
			},
			currentChange (currentPage) {
				this[this.activeName + 'CurrentPage'] = currentPage;
				this.getuserinfo('pageChange')
			},
			checkChange({curCheckdNode, hasChecked}) {
				/*获取当前行数据*/
				let curRow = this.oneTableData[curCheckdNode.index]
				curRow.firstnavflag = curRow.firstnavflag.split('')
				curRow.secondnavflag = curRow.secondnavflag.split('')
				curRow.thirdnavflag = curRow.thirdnavflag.split('')

				/*将选中的和半选中的合并*/
				hasChecked.checkedNodes.push(...hasChecked.halfCheckedNodes)
				/*比较checkedNodes和所有的路由，将未选中的导航按照对应的标志位置为0上送*/
				if (!hasChecked.checkedNodes.length) { 		//length为0，则代表全部未选中
					for (let i of curRow.allRouter) {
						this.setNavFlag(curRow, i, '0')
					}
				} else {
					for (let i of curRow.allRouter) {
						for (let j = 0; j < hasChecked.checkedNodes.length; j++) {
							if (hasChecked.checkedNodes[j].NavName === i.NavName && (hasChecked.checkedNodes[j].RouterName === i.RouterName)) {		//在checkedNodes中找到则跳出循环
								this.setNavFlag(curRow, i, '1')
								break;
							} else if (j === hasChecked.checkedNodes.length - 1) {			//若遍历到最后还未找到，，则代表checkNodes中没有此项
								this.setNavFlag(curRow, i, '0')
							}
						}
					}
				}
				curRow.firstnavflag = curRow.firstnavflag.join('')
				curRow.secondnavflag = curRow.secondnavflag.join('')
				curRow.thirdnavflag = curRow.thirdnavflag.join('')
			},

			setNavFlag (curRow, i, flag) {
				if (curRow.firstNav[i.NavName]) {				//当前元素位于第一级导航栏
					curRow.firstnavflag[i.Id - 1] = flag
				} else if (curRow.secondNav[i.NavName]) {		//当前元素位于第二级导航栏
					curRow.secondnavflag[i.Id - 1] = flag
				} else if (curRow.thirdNav[i.NavName]) {			//当前元素位于第三级导航栏
					curRow.thirdnavflag[i.Id - 1] = flag
				}
			},

			setuserinfo ({row, index}) {
				if (row.firstnavflag === row.FirstNavFlag && row.secondnavflag === row.SecondNavFlag && row.thirdnavflag === row.ThirdNavFlag && !row.userPriSel.length) {
					this.$alert('请先选择需要修改的视图或api权限后再提交', {
						title: '提示',
						type: 'info'
					})
					return;
				}
				this.$confirm('确定需要修改此项视图和api权限', {
					title: '提示',
					type: 'warning',
					callback: (action, instance) => {
						if (action === 'confirm') {
							let userapiflag = row.userapiflag.split('')
							row.userPriSel.forEach((item) => {
								let id = item.split('_')[0]
								let enable = item.split('_')[1]
								userapiflag[id - 1] = enable === '1' ? '0' : '1'
							})
							app.post('/adm/v1/setuserinfo', {
								userid: row.Id + '',
								firstnavflag: row.firstnavflag,
								secondnavflag: row.secondnavflag,
								thirdnavflag: row.thirdnavflag,
								userapiflag: userapiflag.join('')
							}, res => {
								if (res.data.Code != '505') {
									this.$alert(res.data.Message, {
										title: '提示',
										type: 'info'
									})
								}
								if (res.data.Code === '2000000') {
									this.getuserinfo('refresh')
								}
							})
						}
					}
				})
			}
		},

		created () {
			/*获取用户信息*/
			this.getuserinfo('refresh')
		}
	}
</script>