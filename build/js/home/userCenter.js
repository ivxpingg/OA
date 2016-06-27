
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
        utils.routerLoad( com.root + "../login.html", true);//忽略缓存
	},
     
    //修改密码
	modifyPwd: function(){
        var constraints = {
	        oldPassword: {
	            presence: true
	        },
	        ePassword1: {
	            presence: true,
	            length: {
	                minimum: 6,
	                maximum: 20
	            }
	        },
	        ePassword2: {
	            presence: true,
	            equality: {
	                attribute: "ePassword1",
	                message: "^2个密码不相等"
	            }
	        }

	    }
        
        if( utils.validate('#editPwd', constraints) ){
           var formValues = utils.collectFormValues('#editPwd');
	       console.log(formValues);
	       utils.routerLoad(com.root + "../login.html", true);
	    }

	}
};