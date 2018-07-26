const filters = {
	/**
	 * 状态类型选择
	 * @AuthorHTL
	 * @DateTime  2018-05-28T15:50:51+0800
	 * @return    {[type]}                 [description]
	 */
	statusFilter (sourceData, val) {
		if (!val) {
			return sourceData
		} else {
			sourceData = sourceData.filter( (item) => {
				return item.status === val
			})
		}
		return sourceData
	},
	productModuleFilter (sourceData, val) {
		if (!val) {
			return sourceData
		} else {
			sourceData = sourceData.filter( (item) => {
				return item.moduleId === val
			})
		}
		return sourceData
	},
	requestTypeFilter (sourceData, val) {
		if (!val) {
			return sourceData
		} else {
			sourceData = sourceData.filter( (item) => {
				return item.resourceType === val
			})
		}
		return sourceData
	},
	createrFilter (sourceData, val) {
		if (!val) {
			return sourceData
		} else {
			sourceData = sourceData.filter( (item) => {
				return item.createPerson === val
			})
		}
		return sourceData
	},
	dateFilter (sourceData, val) {
		if (!val || val.length === 0) {
			return sourceData
		} else {
			sourceData = sourceData.filter( (item) => {
				return val[0] <= item.createTime && item.createTime <= val[1]
			})
		}
		return sourceData
	},
	workOrderFilter (sourceData, val) {
		if (!val) {
			return sourceData
		} else {
			sourceData = sourceData.filter( (item) => {
				return item.ticketNumber.toLowerCase().indexOf(val.toLowerCase()) != -1
			})
		}
		return sourceData
	},
}
export default {
	/**
	 * 前端刷选数据
	 * @thb
	 * @DateTime  2018-05-28
	 * @param     {[Array]}                 sourceData 要刷选的源数据
	 * @param     {[Object]}                 conditions 刷选的条件
	 * @return    {[Array]}                  返回刷选后的数据          
	 */
	doFilter(vm,sourceData, conditions) {
		for (let key in conditions) {
			// 判断是否有需要的过滤方法
	       if (filters.hasOwnProperty(key + 'Filter') && typeof filters[key + 'Filter'] === 'function') {
	           sourceData = filters[key + 'Filter'](sourceData, conditions[key]);
	       }
		}
		//得到刷选出来的所有数据
		vm[vm.activeName + 'AllTableData'] = sourceData
		//重新计算分页
		vm[vm.activeName + 'Total'] = sourceData.length;
		this.changeTable(vm)
	},
	sizeChange(vm, pageSize, name) {
		vm[(name ? name : vm.activeName) + "PageSize"] = pageSize;
		this.changeTable(vm, name)

	},
	currentChange(vm, currentPage, name) {
		vm[(name ? name : vm.activeName) + "CurrentPage"] = currentPage
		this.changeTable(vm, name)
	},

	changeTable(vm, name) {
		let pageSize = vm[(name ? name : vm.activeName) + "PageSize"]
		let tableData = vm[(name ? name : vm.activeName) + "TableData"] = []
		let allTableData = vm[(name ? name : vm.activeName) + "AllTableData"]
		let currentPage = vm[(name ? name : vm.activeName) + "CurrentPage"]
		let allTotal = allTableData.length;
		if (allTotal/pageSize < currentPage) {
			currentPage = Math.ceil(allTotal/pageSize)
		}

		if (currentPage) {
			for (let i = (currentPage - 1)*pageSize; i < (currentPage*pageSize > allTableData.length ? allTableData.length : currentPage*pageSize); i++) {
				tableData.push(allTableData[i])
			}
		}
	},
	resetData(data) {
		for (let key in data) {
			if (data[key].disabled) {
				continue;
			}
			data[key][key] = ''
		}
	},
	resetFormData(data, initData) {
		for (let key in data) {
			if (Array.isArray(data[key])) {
				data[key] = !initData ? [] : initData[key] != 'disabled' ? initData[key] : data[key]
			} else if (Object.prototype.toString.call(data[key]) === "[object Object]") {
				data[key] = !initData ? {} : initData[key] != 'disabled' ? initData[key] : data[key]
			} else {
				data[key] = !initData ? '' : initData[key] != 'disabled' ? initData[key] : data[key]
			}
		}
	},
	closeDialog(vm) {
		vm.title = '添加'
		let formData = vm.activeName ? vm[vm.activeName + 'DialogFormData'] : vm.dialogFormData
		for (let key in formData) {
			if (formData[key].disabled && formData[key].defaultValue) {
				continue
			}
			formData[key][key] = '';
		}
	},
	editRow(vm, {
		row,
		title,
		$index
	}) {
		let formData = vm.activeName ? vm[vm.activeName + 'DialogFormData'] : vm.dialogFormData
		for (let key in row) {
			formData[key] && (formData[key][key] = row[key]);
		}
		vm.index = $index
		vm.title = title
		vm.dialogVisible = true;
	},
	findValInArray(val, arr) {
		for (let i of arr) {
			if (i.value === val) return i.label
		}

		return ''
	},
	/*从数组中找出某一条数据*/
	findInArr (val, arr) {
		for (let i of arr) {
			if (i.value === val) return i
		}
		return {}
	},
	emitFromChild(vm, key) {
		switch (key) {
			//选择的是主机套餐
			case 'package':
				let obj = vm[vm.activeName + 'DialogFormData'] || vm.dialogFormData;
				if (obj[key][key] !== '自定义') {
					obj.cpu.cpu = obj[key][key] ? obj[key][key].match(/\d+/g)[0] : 0
					obj.ram.ram = obj[key][key] ? obj[key][key].match(/\d+/g)[1] : 0
					obj.cpu.disabled = true;
					obj.ram.disabled = true;
				} else {
					obj.cpu.disabled = false;
					obj.ram.disabled = false;
				}
				break;
				//选择的是领域
			case 'groupId':
				/*模块/环境类型/应用/系统及应用管理员清空*/
				vm.formData.moduleId.moduleId = ''
				vm.formData.moduleId.selectData = [];
				//环境清空
				vm.formData.env.env = ''

				//应用清空
				vm.formData.applicationId.applicationId = ''
				vm.formData.applicationId.selectData = []

				//系统管理员和应用管理员清空
				vm.formData.applicationManager.applicationManager = ''
				vm.formData.systemManager.systemManager = ''
				
				vm.regionValue = this.findValInArray(vm.formData[key][key], vm.formData[key].selectData)
				vm.formData.moduleId.moduleId = ''
				vm.formData.moduleId.selectData = [];
				vm.activeClass = '';
				vm.productModuleSelArr = [];
				vm.formData[key][key] && app.post('/Gaea_api/getAllProcessDept', {
					staticid: vm.formData[key][key]
				}, res => {
					let len = res.data.data.length;
					for (let i of res.data.data) {
						i.label = i.module;
						i.value = i.staticid;
						vm.productModuleSelArr.push(i)
						vm.formData.moduleId.selectData.push(i)
					}
				})
				break;
			case 'moduleId':  						//选择模块
				//环境清空
				vm.formData.env.env = ''

				//应用清空
				vm.formData.applicationId.applicationId = ''
				vm.formData.applicationId.selectData = []

				//系统管理员和应用管理员清空
				vm.formData.applicationManager.applicationManager = ''
				vm.formData.systemManager.systemManager = ''
				
				break;	

			case 'env':     							//选择的是环境类型
				//应用清空
				vm.formData.applicationId.applicationId = ''
				vm.formData.applicationId.selectData = [];

				//系统管理员和应用管理员清空
				vm.formData.applicationManager.applicationManager = ''
				vm.formData.systemManager.systemManager = ''

				/*选择了领域才能调接口*/
				let regionText = this.findValInArray(vm.formData['groupId']['groupId'], vm.formData['groupId'].selectData)
				vm.formData.groupId.groupId && vm.formData.env.env && app.post('/Gaea_api/getApplication', {
					dept: regionText,
					env: vm.formData.env.env,
				}, res => {
					for (let i of res.data.data) {
						i.label = i.app_name;
						i.value = i.app_id;
						vm.formData.applicationId.selectData.push(i)
					}
				})
				break;
				//选择应用名称
			case 'applicationId':
				//系统管理员和应用管理员清空
				vm.formData.applicationManager.applicationManager = ''
				vm.formData.systemManager.systemManager = ''

				vm.applicationName = this.findValInArray(vm.formData[key][key], vm.formData[key].selectData)
				vm.formData[key][key] && app.post('/Gaea_api/getAppmanager', {
					appId: vm.formData[key][key]
				}, response => {
					vm.formData.applicationManager.applicationManager = response.data.data.app;
					vm.formData.systemManager.systemManager = response.data.data.sys;
					vm.applicationName = val;
				})
				break;
			case 'ipNet':
				if (vm[vm.activeName + 'DialogFormData'][key][key] === 'oldnet') { //ip网段选择的是旧网段
					vm[vm.activeName + 'DialogFormData']['oldnet'].required = 'required'
					vm[vm.activeName + 'DialogFormData']['oldnet'].disabled = false
				} else {
					vm[vm.activeName + 'DialogFormData']['oldnet']['oldnet'] = ''
					vm[vm.activeName + 'DialogFormData']['oldnet'].required = ''
					vm[vm.activeName + 'DialogFormData']['oldnet'].disabled = true
				}
				break;
				//选择主机类型
			case 'master':
				//清空磁盘数据
				if (vm.activeName === 'x86Add') {
					vm[vm.activeName + 'DialogFormData']['disk']['disk'] = '';
					vm[vm.activeName + 'DialogFormData']['disk'].selectData = [];
					//选择的是虚拟机

					for (let i of Object.keys(vm.diskData)) {
						if (vm[vm.activeName + 'DialogFormData'][key][key] === 'virtualMachine') {
							if (i.indexOf('t') === -1) {
								vm[vm.activeName + 'DialogFormData']['disk'].selectData.push({
									label: vm.diskData[i],
									value: i,
								})
							}
						} else {
							if (i.indexOf("t") !== -1) {
								vm[vm.activeName + 'DialogFormData']['disk'].selectData.push({
									label: vm.diskData[i],
									value: i,
								})
							}
						}
					}
				}
				break;
			case 'updateType':
				let chhooseItem = vm[vm.activeName + 'DialogFormData'][key][key]
				for (let key in vm[vm.activeName + 'TableHeadName']) {
					if (key === 'updateType' || key === 'masterName' || key === 'ipAddress' || chhooseItem === key) {
						vm[vm.activeName + 'HiddenFormField'][key] = true;
					} else {
						vm[vm.activeName + 'HiddenFormField'][key] = false;
					}
				}
				break;
			case 'component':
				let formData = vm.currentName === 'midwareAdd' ? vm.dialogFormData :
					vm.currentName === 'processingList' ? vm.oneDialogFormData : {}
				if (vm.currentName === 'midwareAdd' || vm.currentName === 'processingList') {
					if (formData[key][key].indexOf('tomcat') != -1) {
						formData['jdk'].disabled = false;
						formData['jdk'].required = 'required';
					} else {
						formData['jdk'].disabled = true;
						formData['jdk'].required = '';
					}
				}
				break;
			case 'version':
				let formObj = vm.currentName === 'openResource' ? vm[vm.activeName + 'DialogFormData'] :
							  vm.currentName === 'processingList' ? vm.oneDialogFormData : {}	
				if (['mariadb 10.1','3.2.4','3.2.9'].indexOf(formObj[key][key]) != -1) {	//版本为10.1则系统只能为6.9
					formObj['os']['os'] = 'centos 6.9'
					formObj['os'].disabled = true
				} else if (formObj[key][key] === 'mariadb 10.3') {
					formObj['os']['os'] = 'centos 7.3'
					formObj['os'].disabled = true
				} else {
					formObj['os'].disabled = false
				}
				break;

		}
	},
	focus(vm) {
		vm.formData.moduleId && (vm.formData.moduleId.selectData = vm.productModuleSelArr);
	},
	querySearch(vm, querySearch) {
		if (querySearch) {
			vm.formData.moduleId.selectData = vm.moduleId.filter(item => {
				return item.label.toLowerCase().indexOf(querySearch.toLowerCase()) > -1;
			})
			vm.isShowNoData = vm.formData.moduleId.selectData.length == 0 ? true : false
		} else {
			vm.formData.moduleId.selectData = vm.productModuleSelArr
		}
	},

	sizeChange(vm, pageSize, name) {
		vm[(name ? name : vm.activeName) + "PageSize"] = pageSize;
		this.changeTable(vm, name)

	},
	currentChange(vm, currentPage, name) {
		vm[(name ? name : vm.activeName) + "CurrentPage"] = currentPage
		this.changeTable(vm, name)
	},

	changeTable(vm, name) {
		let pageSize = vm[(name ? name : vm.activeName) + "PageSize"]
		let tableData = vm[(name ? name : vm.activeName) + "TableData"] = []
		let allTableData = vm[(name ? name : vm.activeName) + "AllTableData"]
		let currentPage = vm[(name ? name : vm.activeName) + "CurrentPage"]
		let allTotal = allTableData.length;
		if (allTotal/pageSize < currentPage) {
			currentPage = Math.ceil(allTotal/pageSize)
		}

		if (currentPage) {
			for (let i = (currentPage - 1)*pageSize; i < (currentPage*pageSize > allTableData.length ? allTableData.length : currentPage*pageSize); i++) {
				tableData.push(allTableData[i])
			}
		}
	},
	transformStatus(i) {
		let status = i.status
		i.status = status === 'draft' ? '草稿' :
			status === 'pending' ? '审核中' :
			status === 'dispose' ? '处理中' :
			'已完成'
		return i
	},
	validateSqls(vm, v_sql_all, type) {
		v_sql_all = v_sql_all.toLowerCase()
		let env = vm[vm.activeName + 'Form'][vm.activeName === 'three' ? 'envType' : 'application']
		let regu = /^[\n\t\s\S]*?drop[\s\t\n]+(?!index)[\n\t\s\S]*?$/; //正则表达式  匹配drop后跟的是否index
		let arr = v_sql_all.split(";"); //返回数组

		let arr2 = v_sql_all.split(","); //逗号分隔，每行一个字段定义
		let v_sql_all_line = []

		let is_dml;

		let msg = '';
		let item_key = '';

		let fdStart1 = v_sql_all.indexOf("create");
        let fdStart2 = v_sql_all.indexOf("alter");

		/*if (fdStart1 == -1 && fdStart2 == -1) {
			msg = '只允许执行create或alter操作！';
			vm.checkOutMsg = msg
			return msg
		}*/

		if (v_sql_all.startsWith('insert') || v_sql_all.startsWith('update') || v_sql_all.startsWith('delete')) {
			is_dml = 1;
		} else {
			is_dml = 0;
		}

		

		if (arr[1] && (arr[1].trim() != '')) { //说明分号后面还有其他字符
			msg = '检查未通过:由于sql执行后，不能回滚，暂时只能一次跑一个sql！';
			vm.checkOutMsg = msg
			return msg
		}

		if (is_dml == 0) { // 是DDL 操作才后续判断
			if (v_sql_all.indexOf("myisam") >= 0) {
				msg = '检查未通过:不能使用Myisam引擎，使用Innodb引擎代替!!'
				vm.checkOutMsg = msg
				return msg
			}
			if (v_sql_all.indexOf("constraint") >= 0) {
				msg = '检查未通过:不能使用外键，建议使用业务逻辑判断来代替外键!!'
				vm.checkOutMsg = msg
				return msg
			}
			/*应丁工的要求此段校验逻辑暂时先屏蔽*/
			/*if (v_sql_all.indexOf("database") >= 0 || v_sql_all.indexOf("grant") >= 0 || v_sql_all.indexOf("revoke") >= 0 || v_sql_all.indexOf("flush") >= 0 || v_sql_all.indexOf("truncate") >= 0 || v_sql_all.indexOf("rename") >= 0 || v_sql_all.indexOf("view") >= 0 || v_sql_all.indexOf("function") >= 0 || v_sql_all.indexOf("procedure") >= 0) {
				msg = '检查未通过:包含数据库敏感关键字(database,grant,revoke,flush,truncate,rename,view,function,procedure)中的一个或多个，为防止误操作，禁止执行，有误判情况，请联系DBA!!'
				vm.checkOutMsg = msg
				return msg
			}*/
			//prd,uat,ver环境需校验drop
			if ([3,2,6,33,38].indexOf(env) != -1) {
				if (regu.test(v_sql_all)) {
					vm.checkOutMsg = msg = '检查未通过:包含 "Drop" 数据库敏感关键字，为防止误操作，线上环境禁止执行，有误判情况，请联系DBA!!'
					return msg
				}
			}

			if (v_sql_all.indexOf("float") >= 0 || v_sql_all.indexOf("double") >= 0) {
				msg = '检查未通过:float或者double做小数点通常是不精准的，建议采用decimal!!'
				vm.checkOutMsg = msg
				return msg
			}

			if (v_sql_all.indexOf("engine") >= 0 && v_sql_all.indexOf("innodb") < 0) {
				msg = '检查未通过:您设置了建表引擎，但不是innodb,一般不需要设置建表引擎,数据库级别已经统一设置了!!'
				vm.checkOutMsg = msg
				return msg
			}

			if (((v_sql_all.indexOf("character") >= 0 && v_sql_all.indexOf("set") >= 0) || v_sql_all.indexOf("charset") >= 0) && v_sql_all.indexOf("utf8") < 0 && v_sql_all.indexOf("utf8mb4") < 0) {

				msg = '检查未通过:您设置了表级别字符集，但不是utf8或者utf8mb4，一般不需要设置表级别字符集，数据库级别已经统一设置了!!'
				vm.checkOutMsg = msg
				return msg
			}

			if (v_sql_all.indexOf("create table") >= 0 && !(v_sql_all.indexOf("primary") >= 0 && v_sql_all.indexOf("key") >= 0)) {
				msg = '检查未通过:新创建表没有主键，表必须有主键!!'
				vm.checkOutMsg = msg
				return msg
			}

			if (v_sql_all.indexOf("create table") >= 0) {
				v_sql_all_line = v_sql_all.split(',')
				for (let i = 0; i < v_sql_all_line.length; i++) {
					let value = v_sql_all_line[i]
					if (value.indexOf("primary key") >= 0 ) {
						let k = 1
						while (1) {
							if (value.indexOf(")") >= 0 || k >= 10) {
								break;
							}
							let jj = i + Number(k)
							item_key = value + "," + v_sql_all_line[jj]
							k = k + 1
						}
						let item_key_str = item_key.substring(item_key.indexOf("(") + 1, item_key.indexOf(")"))
						item_key_str = item_key_str.replace(/`/g, "")
						item_key_str = item_key_str.replace(/'/g, "")
						let item_key_str_arr = item_key_str.split(',')
						for (let i_item_key_str of item_key_str_arr) {
							let bo_key = 0
							for (let jtem_key of v_sql_all_line) {
								if (jtem_key.indexOf(i_item_key_str) >= 0) {
									if (jtem_key.indexOf(" int") >= 0 || jtem_key.indexOf("bigint") >= 0 || jtem_key.indexOf("mediumint") >= 0) {
										bo_key = 1
									}
								}
							}
							if (bo_key == 0) {
								msg = '检查未通过:出于数据库性能考虑新创建表主键必须是int、bigint、mediumint类型,字符串则可以做唯一性约束'
								vm.checkOutMsg = msg
								return msg

							}
						}
					}
				}
			}


			for (let p of arr2) {
				if (p.indexOf("auto_increment") >= 0 && (p.indexOf("smallint") >= 0 || p.indexOf("mediaint") >= 0 || p.indexOf("tinyint") >= 0)) {
					msg = '检查未通过:自增长字段必须用Int或者Bigint!!'
					vm.checkOutMsg = msg
					return msg
				}
			}

			// 'key'的数量为一，and index的数量为0，则表示除主键外无索引，检查不通过
			let v_have_key_n = (v_sql_all.split('key')).length - 1; //取得'key'字符串的数量 

			if (v_sql_all.indexOf("create table") >= 0 && v_have_key_n == 1 && v_sql_all.indexOf("index") < 0 && type) {
				vm.checkOutMsg = msg = '检查未通过:除了主键外没有索引，请创建比如id类型字段上的索引，或者在时间范围查询字段例如add_time上创建索引。确实业务不需要创建索引的，请联系DBA手工执行!!'
				return msg
			}
		}

		return msg
	},
	validate_dba_rule(v_sql_all, type) {
		let msg = '';
		if (v_sql_all.indexOf("Set the field list for insert statements") >= 0) {
			msg = '违反审核规则:' + 'insert into 必须 指定字段!'
		} else if (v_sql_all.indexOf("set the where condition for select statement") >= 0) {
			msg = '违反审核规则:' + '更新和删除时 ，必须有where条件!';
		} else if (v_sql_all.indexOf("Limit is not allowed in update/delete statement") >= 0) {
			msg = '违反审核规则:' + '更新和删除时，不能有limit条件!';
		} else if (v_sql_all.indexOf("Order by is not allowed in update/delete statement") >= 0) {
			msg = '违反审核规则:' + '更新和删除时，不能有order by语句!';
		} else if (v_sql_all.indexOf("Set comments for table") >= 0) {
			msg = '违反审核规则:' + '表必须要有注释!';
		} else if (v_sql_all.indexOf("Not supported data type") >= 0) {
			msg = '违反审核规则:' + '列的类型不能使用集合、枚举、位图类型!';
		} else if (v_sql_all.indexOf("no comments") >= 0) {
			msg = '违反审核规则:' + '列必须要有注释!';
		} else if (v_sql_all.indexOf("to VARCHAR type") >= 0) {
			msg = '违反审核规则:' + 'char长度大于16的时候需要改为varchar!';
		} else if (v_sql_all.indexOf("Type blob/text is used") >= 0 && type){
             msg ='违反审核规则:列的类型不能是BLOB/TEXT!';
            return false; 
        } else if (v_sql_all.indexOf("Set unsigned attribute on auto increment column") >= 0) {
			msg = '违反审核规则:' + '自增列，则必须使用无符号（unsigned）类型!';
		}
		return msg
	},
	/**
	 * 格式化日期
	 * @AuthorHTL
	 * @DateTime  2018-05-23T17:20:18+0800
	 * @param     {Number}                 formatType 日期格式化方式 1代表 yyyy-mm-dd hh-mm-ss
	 * @return    {[type]}                            [description]
	 */
	formatDate (dateStr, formatType=1) {
		let date  = new Date(dateStr.replace(/\s*GMT/g, ''))
		let y = date.getFullYear();
		let m = ('00' + (date.getMonth() + 1)).substr(-2)
		let d =('00' + date.getDate()).substr(-2)
		let hh = ('00' + date.getHours()).substr(-2)
		let mm = ('00' + date.getMinutes()).substr(-2)
		let ss = ('00' + date.getSeconds()).substr(-2)
		if (formatType === 1) {
			return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
		}
		return ''
	},
	/**
	 * 判断一个对象是否是空对象
	 * @AuthorHTL
	 * @DateTime  2018-05-30T11:01:36+0800
	 * @param     {[Objecc]}                 obj
	 * @return    {Boolean}                  
	 */
	isEmpty (obj) {
		return Object.keys(obj).length === 0
	},

	//获取浑天仪部门数据
	getSphereDept (arr, arr1) {
		app.post('/auto/getdept', {}, res => {
			for (let i of res.data.data) {
				i.label = i.op_name;
				i.value = i.id;
				arr.push(i)
				Object.prototype.toString.call(arr1) === '[object Array]' && arr1.push(i)
			}
		})
	},

	/*根据部门获取浑天仪产品模块数据*/
	getSphereProductModule (dept, arr) {
		app.post('/auto/getpm', {
			dept
		}, res => {
			for (let i of res.data.data) {
				i.label = i.pm_name;
				i.value = i.id;
				arr.push(i)
			}
		})
	},

	/*根据部门/产品模块/环境/获取浑天仪应用名称数据*/
	getSphereApplicationName ({dept, env, pm}, arr) {
		app.post('/auto/getApplication', {
			dept,
			env,
			pm
		}, res => {
			for (let i of res.data.data) {
				i.label = i.app_name;
				i.value = i.app_name;
				arr.push(i)
			}
		})
	},

	isChecked (formObj, arr) {
		for (let key in formObj) {
			if (arr.indexOf(key) != -1) {
				if (formObj[key] === 'true') {
					return true
				}
			}
		}
		return false
	},

}