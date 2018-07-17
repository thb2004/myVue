
export default {
	isFormCheck (obj, type) {
		for (let key in obj) {
			if (obj[key].required ==='required' && !obj[key][key]) {
				return obj[key].labelName + '必填'
			}
			if (obj[key].inputType === 'number') {
				let reg = /^[1-9]\d{0,6}$/;
				if (!reg.test(obj[key][key])) {
					return obj[key].labelName + '格式不正确'
				}
			}
			if (key === 'ipAddress') {
				let res = type ? this.ipValidateManyIP(obj[key][key]): this.ipValidate(obj[key][key])
				if (res) {
					return res
				}	
			}
		}
		return ''
	},
	ipValidateManyIP (ip) {
		let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])((;\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]))*$/;
		var vald = reg.test(ip);
		if (vald) {
			return ''
		} else {
			return 'ip地址格式不正确,多个ip之间以;分号连接';
		}
	},
	ipValidate (ip) {
		let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
		var vald = reg.test(ip);
		if (vald) {
			return ''
		} else {
			return 'ip地址格式不正确';
		}
	},
	/*校验ip格式*/
	ipCheck (ip) {
		let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
		return reg.test(ip)
	},

	ipPassword (ipPassword) {
		let reg = /^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]);\S+(\r|\n)*)+$/;
		return this.ipList(ipPassword) || reg.test(ipPassword)
	},
	ipList (ipList) {
		let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(((\r|\n)+(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]))\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]))*$/;
		return reg.test(ipList)
	},
	ipUserPwd (ipUserPwd) {
		let reg = /^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]);\w+;\S+(\r|\n)*)+$/;
		return reg.test(ipUserPwd)
	},
	ipPwdOrIp (ipList) {
		let reg = /^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]);\S+(\n|\n)*)+$/;
		let reg1 = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]);(((\n|\n)+\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]))*$/;
		return reg.test(ipList) || reg1.test(ipList)
	},

	validatorIp (ip) {
		let reg = /^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]);\S+(\r|\n)*)+$/;
		return reg.test(ip)
	},

	/*校验mip*/

	mipList (mipList) {
		let reg = /^\w{3,}(\n\r\w{3,})*$/;
		return reg.test(mipList)
	},

	isUrl (url) {
		let strReg = "^((https|http|ftp|rtsp|mms)?://)" +
			"?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" // ftp的user@
			+
			"(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
			+
			"|" // 允许IP和DOMAIN（域名）
			+
			"([0-9a-z_!~*'()-]+\.)*" // 域名- www.
			+
			"([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
			+
			"[a-z]{2,6})" // first level domain- .com or .museum
			+
			"(:[0-9]{1,4})?" // 端口- :80
			+
			"((/?)|" // a slash isn't required if there is no file name
			+
			"(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)" +
			"((\n|\r)(https|http|ftp|rtsp|mms)?://)" +
			"?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" // ftp的user@
			+
			"(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
			+
			"|" // 允许IP和DOMAIN（域名）
			+
			"([0-9a-z_!~*'()-]+\.)*" // 域名- www.
			+
			"([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
			+
			"[a-z]{2,6})" // first level domain- .com or .museum
			+
			"(:[0-9]{1,4})?" // 端口- :80
			+
			"((/?)|" // a slash isn't required if there is no file name
			+
			"(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)*"
			+
			"$";
		let reg = new RegExp(strReg);
		return reg.test(url);
	}

}