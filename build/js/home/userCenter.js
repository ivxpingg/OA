
/*
* 用户中心
*/

var userCenter = {
	init: function(){
		console.log('用户中心初始化');
	},
    
    //注销
	signOut: function(){

		//window.location.href = ""
        utils.routerLoad("../login.html", true);//忽略缓存
	}
};