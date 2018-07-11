<template>
	<div class="box">
		<div class="automation">
			<div class="main-middle">
				<el-tabs v-model="activeName">
					<el-tab-pane label="批量增加URL监控" name="one">
						<el-form :model='oneForm' :label-width='labelWidth' ref='oneForm' :rules='rules'>
							<el-row>
								<el-col :md='9'>
									<el-form-item label="部门" prop='dept'>
									    <el-select v-model="oneForm.dept" placeholder="请选择" clearable filterable>
						                    <el-option v-for='(item,index) in oneDeptList' :label='item.label' :value='item.value' :key='index'></el-option>
									    </el-select>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :md='9'>
									<el-form-item label="区域" prop='region'>
									    <el-select v-model="oneForm.region" placeholder="请选择">
						                    <el-option label="APP区主机(10开头）" value="app"></el-option>
						                    <el-option label="DMZ区主机(172开头)" value="dmz"></el-option>
									    </el-select>
									</el-form-item>
								</el-col>
							</el-row>

							<el-row>
								<el-col :md='9'>
									<el-form-item label="地区" prop='sdnh'>
									    <el-select v-model="oneForm.sdnh" placeholder="请选择">
						                    <el-option label="顺德" value="sd"></el-option>
						                    <el-option label="南海" value="nh"></el-option>
									    </el-select>
									</el-form-item>
								</el-col>
							</el-row>

							<el-row>
								<el-col :md='9'>
									<el-form-item label="URL分组" prop='urlGroup'>
										<el-input v-model="oneForm.urlGroup"  placeholder='例如: 美信红包URL'></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :md='18'>
									<el-form-item label="URL链接" prop='urlLink'>
									    <el-input
									      type="textarea"
									      :rows='5'
									      :placeholder="'填写格式如下：\nurl1 \nurl2 \nurl3'"
									      v-model="oneForm.urlLink">
									    </el-input>
									</el-form-item>
								</el-col>
							</el-row>
							
							<div class="text-center m-tb15">	
								<el-button @click="submitForm('oneForm')" class='btn-lg' :disabled='btnDisabled'>提 交</el-button>
							</div>
						</el-form>
					</el-tab-pane>

					<el-tab-pane label="增加主机监控_web端" name="two">
						<el-form :model='twoForm' :label-width='labelWidth' ref='twoForm' :rules='rules'>
							<el-row>
								<el-col :md='9'>
									<el-form-item label="部门" prop='dept'>
									    <el-select v-model="twoForm.dept" placeholder="请选择">
						                    <el-option v-for='(item,index) in twoDeptList' :label='item.label' :value='item.value' :key='index'></el-option>
									    </el-select>
									</el-form-item>
								</el-col>
							</el-row>

							<el-row>
								<el-col :md='9'>
									<el-form-item label="地区" prop='sdnh'>
									    <el-select v-model="twoForm.sdnh" placeholder="请选择">
						                    <el-option label="顺德" value="sd"></el-option>
						                    <el-option label="南海" value="nh"></el-option>
									    </el-select>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :md='18'>
									<el-form-item label="主机列表" prop='hostList'>
									    <el-input
									      type="textarea"
									      :rows='5'
									      :placeholder="'填写格式如下：\n10.11.11.1  mip-mms'"
									      v-model="twoForm.hostList">
									    </el-input>
									</el-form-item>
								</el-col>
							</el-row>

							<div class="text-center m-tb15">	
								<el-button @click="submitForm('twoForm')" class='btn-lg' :disabled='btnDisabled'>提 交</el-button>
							</div>

						</el-form>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</div>
</template>
<style lang='scss'>
	.automation-content {
		margin-top: 5px;
		padding: 20px;
		background: #fff;
		.el-select {
			width: 100%;
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
				oneForm: {
					dept: '',			//部门
					region: 'app',				//区域
					urlGroup: '',			//url分组
					urlLink: '',			//urllink
					sdnh: 'sd',
				},
				oneDeptList: [],
				twoForm: {
					dept: '',
					hostList: '',
					sdnh: 'sd',
				},
				twoDeptList: [],
				rules: {
					dept: [{
						required: true,
						message: '请选择部门',
						trigger: 'change'
					}],
					urlGroup: [{
						required: true,
						message: '请输入url',
						trigger: 'blur'
					}],
					region: [{
						required: true,
						message: '请选择区域',
						trigger: 'blur'
					}],
					sdnh: [{
						required: true,
						message: '请选择地区',
						trigger: 'change'
					}],
					urlLink: [{
						required: true,
						message: '请输入url',
						trigger: 'blur'
					}, {
						validator: (rule, value, callback) => {
							if (!app.validator.isUrl(value)) {
								callback(new Error("请填写正确的url格式"));
							} else {
								callback()
							}
						},
						trigger: 'blur'
					}],
					/*IP列表*/
					hostList: [{
						required: true,
						message: '请输入主机列表',
						trigger: 'blur'
					}],
				}
			}
		},
		methods: {
			submitForm (formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.btnDisabled = true
						let url = ''
						let formObj = this[this.activeName + 'Form']
						let params = {
							domain: app.tools.findValInArray(formObj.dept, this[this.activeName +'DeptList']),
							sdnh: formObj.sdnh,
							urls: formObj.urlLink,
							mipuser: this.$store.state.username
						}
						switch (this.activeName) {
							case 'one':
								url = '/auto/zurlself';
								params.urlname = formObj.urlGroup
								params.dmzapp = formObj.region
								break
							case 'two':
								url = '/auto/zwebadd';
								params.urls = formObj.hostList
								break
						}
						app.post(url, params, res => {
							this.btnDisabled = false
							this.$alert(res.data.msg, {
								title: '提示',
								type: 'info'
							})
						}, this.error)
					} else {
						return false;
					}
				});
			},
			error () {
				this.$alert('提交失败', {
					title: '提示',
					type: 'error'
				})
				this.btnDisabled = false
			},
		},
		created () {
			//获取部门数据
			app.tools.getSphereDept(this.oneDeptList, this.twoDeptList,)
		}
	}
</script>