<template>
	<div class="box">
		<div class="other">
			<div class="main-middle">
			<el-tabs v-model="activeName">
				<el-tab-pane label="帮助" name="one">
					<ul class='counter-ul'>
	                    <li>
	                    	<a target="_blank" href="http://wiki.midea.com/pages/viewpage.action?pageId=4980767">
	                    		linux 初始化使用指南
	                    	</a>
	                    </li>

	                    <li>
	                    	<a target="_blank" href="http://wiki.midea.com/pages/viewpage.action?pageId=5408843">
	                    		Linux 命令行登陆互联网方法
	                    	</a>
	                    </li>

	                    <li>
		                    <a target="_blank"  href="http://wiki.midea.com/pages/viewpage.action?pageId=4361841">
		                    	DBA 新人 工作入职指引
		                    </a>
	                    </li>

	                    <li>
		                    <a target="_blank" href="http://wiki.midea.com/pages/viewpage.action?pageId=4362252">
		                    	DBA管理运维平台 My_DBA_Release 功能描述和操作 系统初始化手册
		                    </a>
	                    </li>
					</ul>
				</el-tab-pane>

				<!-- <el-tab-pane label="用户" name="two">
					<v-table 
						:data='twoTableData' 
						:tableHeadName='twoTableHeadName'
						:showOperator='false'

					></v-table>

					<div class="block pagination-wraper">
					   <el-pagination
					   	 v-if='twoTableData.length > 0'
					   	 @size-change='sizeChange'
					   	 @current-change='currentChange'
					     :page-sizes="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
					     layout="total, sizes, prev, pager, next, jumper"
					     :page-size='twoPageSize'
					     :total="twoTotal">
					   </el-pagination>
					</div>
				</el-tab-pane>

				<el-tab-pane label="外包服务" name="three">
					<el-form :model='threeForm' :label-width='labelWidth' ref='threeForm' :rules='rules'>
						<el-row>
							<el-col :md='18'>
								<el-form-item label="IP列表" prop='hostList'>
								    <el-input
								      type="textarea"
								      :rows='5'
								      :placeholder="'格式如下：\nIP1 \nIP2'"
								      v-model="threeForm.hostList">
								    </el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :md='9'>
								<el-form-item label="用户">
								    <el-input
								      v-model="threeForm.user" disabled>
								    </el-input>
								</el-form-item>
							</el-col>
						</el-row>

						<el-row>
							<el-col>
								<el-form-item>
									<el-radio-group v-model="threeForm.radio" @change='setIsShow'>
									    <el-radio label="option1">借用Root</el-radio>
									    <el-radio label="option2">更改密码</el-radio>
									 </el-radio-group>
								</el-form-item>
							</el-col>
						</el-row>
						
						<el-row v-show='isShowTime'>
							<el-col :md='9'>
								<el-form-item label="借用期限">
								    <el-input
								      v-model="threeForm.time" disabled>
								    </el-input>
								</el-form-item>
							</el-col>
						</el-row>

						<el-row v-show='isShowPwd'>
							<el-col :md='9'>
								<el-form-item label="密码" prop='password'>
								    <el-input
								      v-model="threeForm.password">
								    </el-input>
								</el-form-item>
							</el-col>
						</el-row>


						<div class="text-center m-tb15">	
							<el-button @click="submitForm('threeForm')" class='btn-lg' :disabled='btnDisabled'>提交</el-button>
						</div>
					</el-form>
				</el-tab-pane>

				<el-tab-pane label="外包服务管理" name="four">
					<el-form :model='fourForm' :label-width='labelWidth' ref='fourForm' :rules='rules1'>
						<el-row>
							<el-col :md='18'>
								<el-form-item :label="label" prop='hostList'>
								    <el-input
								      type="textarea"
								      :rows='5'
								      :placeholder="placeholder"
								      v-model="fourForm.hostList">
								    </el-input>
								</el-form-item>
							</el-col>
						</el-row>

						<el-row>
							<el-col>
								<el-form-item>
									<el-radio-group v-model="fourForm.radio">
									    <el-radio label="1">覆盖</el-radio>
									    <el-radio label="2">新增</el-radio>
									    <el-radio label="3">删除</el-radio>
									 </el-radio-group>
								</el-form-item>
							</el-col>
						</el-row>

						<el-row>
							<el-col>
								<el-form-item label='模块'>
									<el-radio-group v-model="fourForm.mangeType" @change='transferMangeType'>
									    <el-radio label="1">机器管理</el-radio>
									    <el-radio label="2">授权管理</el-radio>
									 </el-radio-group>
								</el-form-item>
							</el-col>
						</el-row>

						<el-row>
							<el-col>
								<el-form-item>
									<el-checkbox 
										label="cmdb机器管理权限校验" 
										true-label='true'
									    false-label='false'
										v-model='fourForm.cmdbcheck'
									>
									</el-checkbox>
								</el-form-item>
							</el-col>
						</el-row>

						<div class="text-center m-tb15">	
							<el-button @click="submitForm('fourForm')" class='btn-lg' :disabled='btnDisabled'>提交</el-button>
						</div>
					</el-form>
				</el-tab-pane> -->
			</el-tabs>
			</div>
		</div>
	</div>
</template>
<style lang='scss'>
	.counter-ul {
		counter-reset: myCount;
		
		li {
			line-height: 30px;
			&:before {
				content: counter(myCount) '.';
				counter-increment: myCount;
			}
			a {
				color: #0275d8
			}
		}
	}
</style>

<script type="text/javascript">
	export default {
		data () {
			return {
				activeName: 'one',
				labelWidth: '8rem',
				btnDisabled: false,
				twoTotal: 1,					//总页数
				twoPageSize: 1,					//每页显示数
				twoCurrentPage: 1,				//当前页码
				twoTableData: [],
				twoTableHeadName: {
					uid: 'UID',
					username: '姓名',
					tel: '手机号',
					email: '电子邮箱',
					lastLogin: '最后一次登录',
				},
				threeForm: {
					hostList: '',
					user: 'apps',
					radio: 'option1',
					time: '',
					password: ''
				},
				isShowTime: true,
				isShowPwd: false,
				fourForm: {
					hostList: '',
					radio: '',
					cmdbcheck: 'true',
					mangeType: '1'
				},
				label: 'IP列表',
				placeholder: '格式如下：\nIP1\nIP2',
				rules: {
					/*IP列表*/
					hostList: [{
						required: true,
						message: '请输入IP',
						trigger: 'blur'
					}, {
						validator: (rule, value, callback) => {
							if (!app.validator.ipList(value)) {
								callback(new Error("请填写正确的IP格式"));
							} else {
								callback()
							}
						},
						trigger: 'blur'
					}],
					password: [{
						validator: (rule, value, callback) => {
							if (this.isShowPwd) {
								if (!value) {
									callback(new Error("请输入密码"));
								} else {
									callback()
								}
							} else {
								callback()
							}
						},
						trigger: 'blur',
						required: true,
					}]
				},
				rules1: {
					/*IP列表*/
					hostList: [{
						validator: (rule, value, callback) => {
							let flag = this[this.activeName + 'Form'].mangeType === '1'
							if (!app.validator[flag ? "ipList" : "mipList"](value)) {
								callback(new Error(flag ? "请填写正确的IP格式" : "请填写正确的mip格式"));
							} else {
								callback()
							}
							
						},
						trigger: 'blur',
						required: true,
					}],
				},
			}
		},
		methods: {
			transferMangeType (val) {
				if (val === '1') {
					this.label = 'IP列表'
					this.placeholder = '格式如下：\nIP1\nIP2'
				} else {
					this.label = 'user 列表'
					this.placeholder = '格式如下：\nMIP1\nMIP2'
				}
			},
			setIsShow (val) {
				if (val === 'option1') {
					this.isShowTime = true;
					this.isShowPwd = false
				} else {
					this.isShowTime = false;
					this.isShowPwd = true
				}
			},
			submitForm (formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.btnDisabled = true
						app.post('/auto/osinit', {}, res => {
							this.btnDisabled = false
							app.go('otherAllResult')
						})
					} else {
						return false;
					}
				}, this.error);
			},
			error () {
				this.btnDisabled = false
			},
			sizeChange (pageSize) {
				app.tools.sizeChange(this, pageSize)
			},
			currentChange (currentPage) {
				app.tools.currentChange(this, currentChange)
			},
		}
	}
</script>