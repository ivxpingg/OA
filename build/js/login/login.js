/*
* 工作计划
*/

var login = {
	init: function(){
		
	},
    //登录验证
	loginValidate: function(){
		//#region 表单验证 
	    var constraints = {
	        userName: {
	            // 必须的
	            presence: true
	        },

	        password: {
	            presence: true
	        }

	    };
	     //var error = utils.validate('formTelephone', constraints, false); //不提示错误
	    if( utils.validate('#formLogin', constraints) ){
           var formValues = utils.collectFormValues('#formLogin');
	       console.log(formValues);
	       utils.routerLoad(com.root + "home/home.html");
	    }
	    
	},
    //手机验证
	editPwd: function(pageId){
        var constraints = {
	        telephone: {
	            presence: true,
	            telephone: {
	                message: "^请输入正确电话号码"
	            }
	        }
	    }

	    if( utils.validate('#formTelephone', constraints) ){
	       utils.routerLoad(pageId);
	    }	

	},
    //修改密码
	modifyPwd: function(pageId) {

	    var constraints = {
	        ePassword: {
	            presence: true,
	            length: {
	                minimum: 6,
	                maximum: 20
	            }
	        },
	        ePassword2: {
	            presence: true,
	            equality: {
	                attribute: "ePassword",
	                message: "^2个密码不相等"
	            }
	        }

	    };

	    if( utils.validate('#formPassword', constraints) ){

           var formValues = utils.collectFormValues('#formPassword');
	       console.log(formValues);

	       utils.routerLoad(pageId);
	    }

	}

};