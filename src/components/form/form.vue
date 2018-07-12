<template>
	<div class='my-compenent-form'>
		<el-form ref='form' :model='formData' :label-position="pos" :label-width="labelWidth">
			<el-row :gutter='isGutter?gutter:0'>
				<el-col 
					v-for='(value,key,index) in formData'
					:key='key'
					:class='{"required": value.required==="required"}'
					:md='{span,offset:!isOffset?0:(index+1)%2===0?2:0}' 
				>
					<el-form-item
						v-show='hiddenField[key]!=false'
						:label='value.labelName' 
						:hiddenField='hiddenField'
					>
						<el-tooltip placement="right" v-if='key==="osauto"&&isShowTooltips'>
						  <div slot="content">
						  	应用  ：针对开源类的应用，数据盘挂载/apps 下<br>
						  	应用（云主机）：专门针对美的云的系统，会改非标准主机名，数据盘挂载/apps 下<br>
						  	应用（传统）: 针对传统类应用，比如商业套件。装NFS，不挂盘<br>
						  	数据库（开源）：针对开源数据库，xfs，python，perl 包，数据盘挂载/apps 下<br>
						  	EBS（RHEL6.3）: EBS RHEL6.3 专用<br>
						  	Oracle（RHEL6.9）：专门针对oracle的linux机器标准化,无apps用户<br>
						  </div>
						  <el-button style='position:absolute;left:102%' class='fa fa-info fa-lg' circle></el-button>
						</el-tooltip>

						<el-tooltip placement="right" v-else-if='key==="lifeSpan"&&isShowTooltips'>
						  <div slot="content">
						  	申请的时候如果环境类型选的是(传统)测试环境 或 (开源)测试环境 或 (开源)开发环境  就对使用期限不能超过366天<br>
						  </div>
						  <el-button style='position:absolute;left:102%' class='fa fa-info fa-lg' circle></el-button>
						</el-tooltip>
						
					    <!--带提示的输入框 -->
					    <el-autocomplete 
					    	v-if='value.type === "input"'
						    v-model="value[key]" 
						    :placeholder="value.placeholder ? value.placeholder : '请输入内容'"  
						    :fetch-suggestions='querySearch' 
						    :trigger-on-focus="false"
						    clearable 
					    >
					    	<template slot-scope="{ item }">
					    	    <div>{{ item.cn_name }} {{item.uid}}</div>
					    	</template>
					    </el-autocomplete>
				
						<!--文本输入框 -->
					    <el-input
					    	v-else-if='value.type === "text"'
							v-model="value[key]" 
						    :placeholder="value.placeholder ? value.placeholder : '请输入内容'" 
						    :disabled = 'value.disabled'
						    clearable
					    >
					    	
					    </el-input>
						
						<!--数字输入框 -->
					    <el-input-number 
					    	v-else-if='value.type === "number"'
						    v-model="value[key]" 
						    controls-position="right" 
						    :min="min"
						    :disabled = 'value.disabled'
						    clearable
					    >
					    </el-input-number>
					    <!-- 日期选择框 -->
					    <el-date-picker type="date" 
					    	v-else-if='value.type === "date"'
					    	v-model="value[key]" 
						    :placeholder="value.placeholder ? value.placeholder : '请选择日期'" 
						    :disabled = 'value.disabled'
						    :picker-options="pickerOptions"
						    format="yyyy-MM-dd"
						    popper-class='my-animation'
						    value-format='yyyy-MM-dd'
						    clearable
					    >
					    </el-date-picker>
					    <!-- textare输入框 -->
					    <el-input 
						    v-else-if='value.type === "textarea"' 
						    v-model="value[key]" 
						    :disabled='value.disabled'
						    type="textarea" 
						    class='textarea' 
						    placeholder="请输入内容"
						    clearable
					    ></el-input>
					    <!-- 只有当为产品模块的时候才去根据数量更改产品模块的图标 -->
					    <el-select 
					    	v-else
					    	v-model="value[key]"
						    :placeholder="value.placeholder ? value.placeholder : '请选择'" 
						    :class='[key === "moduleId" ? "more-ten" : ""]'
						    @change='handle(key)'
						    @focus='focus'
					    	filterable
					    	clearable
					    >
					    	<!-- <el-option 
					    		v-if='isShowProductModule && key === "moduleId"'
					    		value='none'
					    		disabled 
					    	>
					    		<div class='choose-module'>选择产品模块</div>
					    	</el-option>
					    	
					    	<el-option 
					    		v-if='isShowSearchInput && key === "moduleId"'
					    		value='none'
					    							    	disabled 
					    							    	class='search-sel'
					    	>
					    		<div>
					    							    		<el-input placeholder="输入关键词模糊查询" suffix-icon="el-icon-search" v-model="inputSearch" @input='searchMatch'
					    							    		></el-input>
					    		</div>
					    	</el-option> -->

					    	<el-option 
						    	v-for='(item,index) in value.selectData' 
						    	:label='item.label' 
						    	:value='item.value' 
						    	:key='index'
						    	:disabled='value.disabled'
					    	>
					    		<span style="float: left">{{ item.label }}</span>
					    	</el-option>

					    	<!-- <el-option
					    		v-if='isShowNoData && key === "moduleId"'
					    		value='none'
					    							    	disabled 
					    	>
					    		<div class='text-center'>暂无数据</div>
					    	</el-option> -->
					    </el-select>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>
<style lang='scss'>
	/* 数量在0 - 10之间的样式 */
	/* .low-ten {
		.el-icon-arrow-up {
			font-family: element-icons!important;
			&:before {
				content: "\E605"
			}
		}
	} */
	/* 数量在10以上的样式 */
	.more-ten {
		.el-icon-arrow-up {
			font-family: FontAwesome !important;
			&:before {
				content: "\f0c9"
			}
		}
	}
	.my-compenent-form {
		form {
			margin-top: 22px;
		}
	} 
</style>
<script type="text/javascript">
	import {mapState} from 'vuex'
	export default {
		name: 'vForm',
		data () {
			return {
				inputSearch: '',
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() <= Date.now();
					},
				}
			}
		},
		props: {
			isShowTooltips: {
				type: Boolean,
				default: false
			},
			activeClass: {
				type: String,
				default: ''
			},
			isGutter: {
				type: Boolean,
				default: false
			},
			gutter: {
				type: Number,
				default: 30
			},
			span: {
				type: Number,
				default: 9
			},
			isOffset: {
				type: Boolean,
				default: true
			},
			hiddenField: {
				type: Object,
				default: function () {
					return {}
				}
			},
			isShowProductModule: {	//产品模块下拉框是否展示选择产品模块选项
				type: Boolean,
				default: false,
			},
			isShowSearchInput: {	//产品模块下拉框是否展示模糊搜索输入框
				type: Boolean,
				default: false,
			},
			isShowNoData: {			//产品模块下拉框无数据是否展示
				type: Boolean,
				default: false,
			},
			min: {				//number输入框最小值
				type: Number,
				default: 0
			},
			formData: Object, //所有表单数据的键值对
			pos: {			 //表单label文字对齐方向
				type: String,
				default: 'right'
			},
			labelWidth: {
				type: String,
				default: '10rem',
			}
		},
		computed: {
          ...mapState(['pages'])
        },
		methods: {
			focus () {
				this.inputSearch = ''
				this.$emit('focus')
			},
			/*searchMatch (querySearch) {
				this.$emit('querySearch', querySearch)
			},*/

			querySearch (queryString, cb) {
				queryString && app.post('/Gaea_api/getUserlike', {search: queryString}, res => {
					for (let item of res.data.data) {
						item.label = item.cn_name + item.uid;
						item.value = item.uid
					}
					cb(res.data.data)
				}, err => {}, false)
			},
			handle(key) {
				this.$emit('emitFromChild', key)
			}
		},
	}
</script>