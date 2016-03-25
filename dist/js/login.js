

function login(){   
    //#region 表单验证 
    var constraints = {
    	userName: {
    	  // 必须的
          presence: true
    	},

    	password: {
    		presence: true
    	}

    }
    var attribute = document.querySelector("#formLogin");
    var errors = validate(attribute, constraints) || [];

    for(var attr in errors){
    	$.toast(errors[attr]);
    	return;
    }

    //#regionEnd 表单验证

    
    //
	window.location.href = "home/home.html";
}



//修改密码, 进入修改密码页面
function forgetPwd(pageId){

	$.router.load(pageId);
}

//下一步
function editPwd(pageId){

	var constraints = {
		telephone: {
			presence: true,
			telephone: {
				message: "^请输入正确电话号码"
			}
		}
	}

	var attribute = document.querySelector("#formTelephone");
    var errors = validate(attribute, constraints) || [];

    for(var attr in errors){
    	$.toast(errors[attr]);
    	return;
    }

	$.router.load(pageId);
};

//确定修改密码
function modifyPwd(pageId){

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

	}

	var attribute = document.querySelector("#formPassword");
    var errors = validate(attribute, constraints) || [];

    for(var attr in errors){
    	$.toast(errors[attr]);
    	return;
    }

	$.router.load(pageId);    
};


(function(){



	 // 默认必须要执行$.init(),实际业务里一般不会在HTML文档里执行，通常是在业务页面代码的最后执行 
    $.init();

})();