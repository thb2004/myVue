/**
 * 引用页面
 */
import './core/directives' //自定义指令
import './extend/extends' // 扩展类
import app from './core/app'
import validator from './core/validator' // 验证方法类
import tools from './core/tools' // 验证方法类
import plugin from './core/plugin' // 插件
import cookie from './api/cookie'

//统一用app来调用 (eg: app.tools.xxx())

window.app = Object.assign(app, {
	validator,
	tools,
	plugin,
	cookie
})