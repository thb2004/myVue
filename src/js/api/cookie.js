export default {
	//设置cookie
	setCookie(cname, cvalue, exdays = 2) {
	    let d = new Date();
	    d.setTime(d.getTime() + exdays*60*60*1000);
	    let expires = "expires="+d.toUTCString();
	    console.log(expires)
	    document.cookie = cname + "=" + cvalue + "; " + expires;
	    console.log(document.cookie)
	},
	//获取cookie
	getCookie(cname) {
	    let name = cname + "=";
	    let ca = document.cookie.split(';');
	    for(let i=0; i<ca.length; i++) {
	        let c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
	    }
	    return "";
	},
	//清除cookie  
	clearCookie(name) {  
	    setCookie(name, "", -1);  
	}
}