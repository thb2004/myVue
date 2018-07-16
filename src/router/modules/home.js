
import firstHomeContent from '../../pages/firstHomeContent/router'
/*import copyApply from '../../pages/copyApply/router'*/
import IPResource from '../../pages/IPResource/router'
import middleResource from '../../pages/middleResource/router'
import myMatters from '../../pages/myMatters/router'
import openResource from '../../pages/openResource/router'
import resourceSaveApply from '../../pages/resourceSaveApply/router'
import workMange from '../../pages/workMange/router'
import X86Resource from '../../pages/X86Resource/router'
/*import sysMange from '../../pages/sysMange/router'*/
import resetPwd from '../../pages/resetPwd/router'

/*开源数据库平台*/
import selfService from '../../pages/selfService/router'
import slowSQL from '../../pages/slowSQL/router'
import MYSQLMange from '../../pages/MYSQLMange/router'
import NosqlMange from '../../pages/NosqlMange/router'
import dataSetsMange from '../../pages/dataSetsMange/router'
import MySqlCopyMange from '../../pages/MySqlCopyMange/router'
import performanceStatistics from '../../pages/performanceStatistics/router'
import platformGuide from '../../pages/platformGuide/router'
import backMange from '../../pages/backMange/router'
import DMLDDL from '../../pages/DMLDDL/router'
import secondHomeContent from '../../pages/secondHomeContent/router'

/*云系统平台*/

import VirtualMachineApply from '../../pages/VirtualMachineApply/router'
import linuxMange from '../../pages/linuxMange/router'
import LinuxBatchInit from '../../pages/LinuxBatchInit/router'
import netMange from '../../pages/netMange/router'
import LinuxBatchStandardization from '../../pages/LinuxBatchStandardization/router'
import automation from '../../pages/automation/router'
import other from '../../pages/other/router'
import history from '../../pages/history/router'
import threeHomeContent from '../../pages/threeHomeContent/router'

/*云管理平台*/
import authorityCenter from '../../pages/authorityCenter/router'

/*云容器平台*/
import developing from '../../pages/developing/router'

export default [
	{
		path: '/home',	
		name: 'home',
		meta: {
		  requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
		},
		component: resolve => require(['../../pages/index'], resolve),
		redirect: {name:'firstHomeContent'},
		children: [
			...firstHomeContent,			//首页第一个页面主体内容
			...X86Resource,					//x86资源
			//...copyApply,					//备份资源
			...IPResource,					//IP资源
			...middleResource,				//中间件资源
			...myMatters,					//x86资源
			...openResource,				//开源数据库资源
			...resourceSaveApply,			//资源存储申请
			...workMange,					//工单管理
			//...sysMange,
			/*开源数据库平台*/
			...secondHomeContent,			//首页第二个页面主体内容
			...selfService,
			...slowSQL,
			...MYSQLMange,
			...NosqlMange,
			...dataSetsMange,
			...MySqlCopyMange,
			...performanceStatistics,
			...platformGuide,
			...backMange,
			...DMLDDL,

			/*云系统平台*/
			...threeHomeContent,			//首页第三个页面主体内容
			...VirtualMachineApply,
			...linuxMange,
			...LinuxBatchInit,
			...netMange,
			...LinuxBatchStandardization,
			...automation,
			...history,
			...other,

			/*云管理平台*/
			...authorityCenter,
			...developing,
		]
	},
	{
		path: '/',
		name: 'login',
		component: resolve => require(['../../pages/login'], resolve),
	},
	{
		path: '/resetPwd',
		name: 'resetPwd',
		component: resolve => require(['../../pages/resetPwd/index'], resolve),
	},
	{
		path: '*',
		name: 'Page404',
		component: resolve => require(['../../pages/notFound'], resolve),
	}
]