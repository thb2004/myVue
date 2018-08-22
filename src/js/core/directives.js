/**
 * 自定义指令
 * v-focus       --自动聚焦
 */

import Vue from "vue";

Vue.directive('focus', (el,binding) => {
	if (binding.value) {
		el.focus()
	}
})