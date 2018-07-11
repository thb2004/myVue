<template>
    <div class='box'>
    	<div class="content-box x86-resource">
    		<v-form 
		    	:formData='formData'
				:isShowProductModule='isShowProductModule'
				:isShowSearchInput='isShowSearchInput'
				:isShowNoData='isShowNoData'
				:activeClass='activeClass'
				@emitFromChild='emitFromChild'
				@querySearch='querySearch'
				@focus='focus' 
		    	ref='form'
	    	>
	    	</v-form>

    		<v-table 
    			v-if='tableData.length > 0'
    			@editRow='editRow'
    			:data='tableData' 
    			:tableHeadName='tableHeadName'  
    		></v-table>

    		<div class='btn-wraper btn-add'>
    			<button @click="dialogVisible = true">+</button>
    		</div>

    		<div class='btn-group text-right'>
	    		<el-button type="primary" @click="save('form')" size='small'>保存</el-button>
				<el-button @click="resetForm('form')"  size='small'>重置</el-button>
	    	</div>
    	</div>

    	<el-dialog
    	  :title="title"
    	  :visible.sync="dialogVisible"
    	  width="60%"
    	  @close='closeDialog'
    	  >
	    	<v-form 
		    	ref='form' 
		    	:formData='dialogFormData'
		    >
	    	</v-form>
	    	<el-row>
	    		<el-col :md='22' class='text-right'>
    			  	<el-button type="primary" @click="addData">确 定</el-button>
	    	    	<el-button @click="dialogVisible = false">取 消</el-button>
	    		</el-col>
	    	</el-row>
    	</el-dialog>
    </div>
</template>
<style lang='scss' scoped>
	.x86-resource {
		margin-top: 5px;
		padding: 20px;
		background: #fff;
	}
</style>
<script type="text/javascript">
	export default {
		data () {
			return {
				title: '',
				dialogVisible: false,
				productModuleSelArr: [],	//产品模块下拉框选项
				isShowProductModule: false,	//产品模块下拉框是否展示选择产品模块选项
				isShowSearchInput: false,	//产品模块下拉框是否展示模糊搜索输入框
				isShowNoData: false,		//产品模块下拉框是否展示暂无数据
				activeClass: '',
				formData: {
					adminstrator: {
						adminstrator: '',
						labelName: '系统管理员',
						selectData: [],
					},
					applyAdmin: {
						applyAdmin: '',
						labelName: '应用管理员',
						type: 'input',
					},
					region: {
						region: '',
						labelName: '领域',
						selectData: []
					},
					productModule: {
						productModule: '',
						labelName: '产品模块',
						placeholder: '你好',
						selectData: [],
					},
					applicationName: {
						applicationName: '',
						labelName: '应用名称',
						selectData: [],
					},
					envType: {
						envType: '',
						labelName: '环境类型',
					},
				},
				dialogFormData: {
					
				},
				tableData: [],
		        tableHeadName: {}
			}
		},
		methods: {
			//添加数据
			addData (formName) {
				//向表格添加数据
				//校验表单数据
				let res = app.validator.isFormCheck(this.dialogFormData)
				/*if (res !== true) {
					this.$alert(res, {
						title: '提示',
						type: 'info'
					})
					return;
				}*/

				//如果是编辑
				if (this.title === '编辑') {
					for (let key in this.dialogFormData) {
						tableData[this.index][key] = this.dialogFormData[key][key]
					}
				} else {
					let obj = {}
					for (let key in this.dialogFormData) {
						obj[key] = this.dialogFormData[key][key]
						this.tableHeadName[key] = this.dialogFormData[key].labelName
					}
					this.tableData.push(obj)
				}
				//请求接口
				this.dialogVisible = false;
			},
			//关闭对话框需将数据清空
			closeDialog () {
				app.tools.closeDialog(this)
			},
			editRow ({row, title, $index}) {
				app.tools.editRow(this, {row, title, $index})
			},
			//重置表单
			emitFromChild(key) {
				app.tools.emitFromChild(this, key)
			},
			querySearch (querySearch) {
				app.tools.querySearch(this, querySearch)
			},
			focus () {
				app.tools.focus(this)
			},
			save (form) {
				
			},
			resetForm (form) {
				app.tools.resetData(this.formData)
			},
			getData (url) {
				axios.get(url).then(response => {
					let data = {}
					for (let i of response.data) {
						data[i.cloumn] = {
							[i.cloumn]: i.defaultValue || '',
							labelName: i.lableName,
							disabled: i.disabled === 'false' ? false : true,
							type: i.inputType,
						}	
									
						if (i.inputType === 'select') {
							data[i.cloumn].selectData = []
							let obj = JSON.parse(i.value)
							for (let key in obj) {
								data[i.cloumn].selectData.push({
									label: obj[key],
									value: key
								})
							}
						}
					}
					this.dialogFormData = Object.assign({}, data)
				}).catch(data =>{
				})
			}

		},
		created () {
			//获取mysql主机类型table表格下拉框的下拉选项
			this.getData('http://localhost:8080/static/hostType.json')
			//获取领域下拉选项
			axios.get('/Gaea_api/getAllProcessDept/').then(response => {
				for (let i of response.data) {
					i.label = i.org;
					i.value = i.staticid;
					this.formData.region.selectData.push(i)
				}
			}).catch(data =>{
			})
			//获取应用名称下拉框选项
			axios.get('http://localhost:8080/static/x86ApplyName.json').then(response => {
				for (let i of response.data) {
					i.label = i.appName;
					i.value = i.appName;
					this.formData.applicationName.selectData.push(i)
				}
			}).catch(data =>{
			})
		}
	}
</script>