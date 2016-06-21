/* 
 *长潮OA 
*/
//utils参数

var utils = {},
    com = {};

;
//复制覆盖属性
//第一个参数最为目标对象， 剩下参数作为来源
utils.extend = function(obj) {
    [].slice.call(arguments, 1).forEach(function(source) {
      for (var attr in source) {
        obj[attr] = source[attr];
      }
    });
    return obj;
};; 
 /*
 * 公共方法 
 */

//路由跳转

com = {

    //根目录设置
	root: "",
    
	routerLoad: function(id, ignoreCache){
        // ignoreCache 是加载一个新页面时是否忽略缓存而发网络请求，
        //默认是 false，表示使用缓存，可以设为 true 来忽略缓存
        $.router.load(id, ignoreCache);
    },

    isArray: Array.isArray,

    isWindow: function( obj ) {
    	return obj != null && obj === obj.window;
    },

    type: function( obj ) {

    	if( !(obj === obj) ) { return "[object NaN]"; }

    	return Object.prototype.toString.apply( obj );

    },

    error: function( str ) {
        throw new Error( str );
    },

    isEmptyObject: function( obj ) { 
        var name;
		for ( name in obj ) {
			return false;
		}
		return true;
    }

};

utils.extend(utils, com);


;/*
* ajax请求
* 依赖 Zepto.js 或 jQuery.js 组件
*/

utils.extend( utils, {
	ajax: function( options ) {
        var opt = {
        	url: "",
        	type: "GET",
        	data: null,
        	timeout: 0,
        	async: true,
        	cache: true,
        	jsonp: "callback",
        	dataType: null,
        	beforeSend: function (xhr, settings){
                $.showPreloader();
        	},
        	success: function (data, status, error) {
                
        	},
        	complete: function (xhr, status) { 
        		$.hidePreloader();
        	},
        	error: function(xhr, status) {
        		$.hidePreloader();
        		utils.error( "请求错误：" + opt.url );
        	}
        };

        utils.extend( opt, options );
        
        $.ajax( opt );
	}
});;//导航切换
utils.menu = function(){	
	"use strict";
	
    $(".cc-nav>li").click(function(){
        if($(this).hasClass('active')){ return; }

        var role = $(this).attr("role");

        var li_current = $(this).parent().find('li.active');
        if(li_current){
        	var role_current = $(li_current).attr('role');
        	$(this).parent().find('li').removeClass('active');
        	$("#" + role_current).addClass('hide');
        }
        
        $(this).addClass('active');

        $("#" + role).removeClass('hide');

    });
};/*
* 表单验证
* 依赖 validat.js 组件
*/

utils.extend(utils, {
    //@param    
    //#id: String 表单容器id
    //#constraints: Object 表单验证格式,不填采用默认格式
    //#bError: Boolean 是否提示错误, 默认为true
    //@return boolean
	validate: function( id, constraints,  bError ){
        
        var attributes = document.querySelector(id);
        var errors = validate(attributes, constraints) || [];  

        if( !utils.isEmptyObject(errors) ) {
            if( utils.type( bError ) === "[object Undefined]" || bError ) {
	            utils.formToast(errors);            
	        }

	        return false;
        } else {
        	return true;
        }    
	},
     
    //获取表单的所有值，作为一个对象返回
    // 使用input 的name 作为key, value 作为值
    // 例如<input type="text" name="email" value="foo@bar.com" />
    // 将返回 {email: "foo@bar.com"}
    //@return: Object
    collectFormValues: function ( id ) {
        var attributes = document.querySelector(id);
        return validate.collectFormValues(attributes);
    },

    //提示表单错误
	formToast: function( errors ) {

        for (var attr in errors) {
            $.toast(errors[attr]);
            return;
        }

	}

});;
/*
 * 通讯地址
 */

 var addressList = {
 	 init: function(){
         addressList.setEvent();
 	 },

 	 setEvent: function(){
 	 	$('#listAddress>li>.cc-box').click(function(){
	                
	        var $box =  $(this).next('.box-body');
	        var $img = $(this).find('.goto-img');

	        if($(this).hasClass('active')){
	        	$(this).removeClass('active');

	            $img.animate({
	                  rotateZ: '0deg'
	            });

	        	$box.animate({
	        		height: 0
	        	},function(){
	        		$box.addClass('hide');
	        	});
	        }
	        else{        	
	            $(this).addClass('active');
	            $box.removeClass('hide');
	        	var height = $($box).find('ul').height() + 1;
	        	$box.removeClass('hide');
	            
	            $img.animate({
	                  rotateZ: '90deg'
	            });

	        	$box.animate({
	        		height: height
	        	});
	        }

	    });
 	 }
 };;
/*
* 个人申请
*/
var applyList = {
    init: function(){
       
    }
};
/*
* 外派管理
*/

var assignment = {
	init: function(){
		assignment.mdater();

        assignment.initDate();
	},

    initDate: function (){
        $("#txtStartTime, #txtEndTime").datetimePicker();
    },

	mdater: function(){
        $('#cal').mdater({
            marks:{                    
                violet_o: ["2016-03-01 09:00","2016-03-02 09:00"], // 迟到 紫色  、签卡
                yellow_o: ["2016-03-03 09:00"],  //早退  黄色
                red_o: ["2016-03-04 09:00"],    //红色，异常
                green_o: ["2016-03-05 09:00"],  //绿色 ，出差 、加班 、 请假、 外出
                orange_o: ["2016-03-06 09:00"],   //橙色 外派
                blue_o: ["2016-03-08 09:00","2016-03-09 09:00","2016-03-19 09:00"] //  正常 
            }
        });
	},

    validate: function() {
        var constraints = {
            userName: {
                // 必须的
                presence: true
            }
        };

        return utils.validate( "#formList", constraints );
    },

    saveAjax: function() {         
        utils.ajax({
            url: "",
            success: function (data, status, error) {
                 
            } 
        });

    },

    save: function() {
        //表单验证
        if( assignment.validate() ) {

        }
    }
};;/*
* 考勤管理
*/

var attendanceManage = {
	init: function(){
		attendanceManage.mdater();
	},

	mdater: function(){
        $('#cal').mdater({
            marks:{                    
                violet_o: ["2016-03-01 09:00","2016-03-02 09:00"], // 迟到 紫色  、签卡
                yellow_o: ["2016-03-03 09:00"],  //早退  黄色
                red_o: ["2016-03-04 09:00"],    //红色，异常
                green_o: ["2016-03-05 09:00"],  //绿色 ，出差 、加班 、 请假、 外出
                orange_o: ["2016-03-06 09:00"],   //橙色 外派
                blue_o: ["2016-03-08 09:00","2016-03-09 09:00","2016-03-19 09:00"] //  正常 
            }
        });
	}
};;
/*
* 出差管理
*/

var businessTrip = {
	init: function(){
		businessTrip.mdater();
        businessTrip.initDate();
	},

    initDate: function (){
        $("#txtStartTime").datetimePicker();
    },

	mdater: function(){
        $('#cal').mdater({
            marks:{                    
                violet_o: ["2016-03-01 09:00","2016-03-02 09:00"], // 迟到 紫色  、签卡
                yellow_o: ["2016-03-03 09:00"],  //早退  黄色
                red_o: ["2016-03-04 09:00"],    //红色，异常
                green_o: ["2016-03-05 09:00"],  //绿色 ，出差 、加班 、 请假、 外出
                orange_o: ["2016-03-06 09:00"],   //橙色 外派
                blue_o: ["2016-03-08 09:00","2016-03-09 09:00","2016-03-19 09:00"] //  正常 
            }
        });
	},

    validate: function() {

        validate.extend(validate.validators.datetime, {
          // The value is guaranteed not to be null or undefined but otherwise it
          // could be anything.
          parse: function(value, options) {
            return +moment.utc(value);
          },
          // Input is a unix timestamp
          format: function(value, options) {
            var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
            return moment.utc(value).format(format);
          }
        });

        var constraints = {
            txtStartTime: {
                
            },
            txtEndTime: {
            }


        };

        return utils.validate( "#formList", constraints );
    },

    saveAjax: function() {         
        utils.ajax({
            url: "",
            success: function (data, status, error) {
                 
            } 
        });
    },

    save: function () {
        //表单验证
        if( businessTrip.validate() ) {

        }

    }
};;
/*
* 外出管理
*/

var goOut = {
	init: function(){
		goOut.mdater();
        goOut.initDate();
	},

    initDate: function (){
        $("#txtStartTime, #txtEndTime").datetimePicker();
    },

	mdater: function(){
        $('#cal').mdater({
            marks:{                    
                violet_o: ["2016-03-01 09:00","2016-03-02 09:00"], // 迟到 紫色  、签卡
                yellow_o: ["2016-03-03 09:00"],  //早退  黄色
                red_o: ["2016-03-04 09:00"],    //红色，异常
                green_o: ["2016-03-05 09:00"],  //绿色 ，出差 、加班 、 请假、 外出
                orange_o: ["2016-03-06 09:00"],   //橙色 外派
                blue_o: ["2016-03-08 09:00","2016-03-09 09:00","2016-03-19 09:00"] //  正常 
            }
        });
	},

    validate: function() {
        var constraints = {
            userName: {
                // 必须的
                presence: true
            },
            txtStartTime: {
                presence: true
            },
            txtEndTime: {
                presence: true
            },
            txtTimes: {
                presence: true,
                numericality: {
                    onlyInteger: true//,
                    //greaterThan: 0
                }
            }

        };

        return utils.validate( "#formList", constraints );
    },

    saveAjax: function() {         
        utils.ajax({
            url: "",
            success: function (data, status, error) {
                 
            } 
        });

    },

    save: function() {
        //表单验证
        if( goOut.validate() ) {

        }
    }

};;
/*
* 请假管理
*/

var leave = {
	init: function(){
		leave.mdater();

        leave.initDate();
	},

    initDate: function (){
        $("#txtStartTime, #txtEndTime").datetimePicker();
    },

	mdater: function(){
        $('#cal').mdater({
            marks:{                    
                violet_o: ["2016-03-01 09:00","2016-03-02 09:00"], // 迟到 紫色  、签卡
                yellow_o: ["2016-03-03 09:00"],  //早退  黄色
                red_o: ["2016-03-04 09:00"],    //红色，异常
                green_o: ["2016-03-05 09:00"],  //绿色 ，出差 、加班 、 请假、 外出
                orange_o: ["2016-03-06 09:00"],   //橙色 外派
                blue_o: ["2016-03-08 09:00","2016-03-09 09:00","2016-03-19 09:00"] //  正常 
            }
        });
	},

    validate: function() {
        var constraints = {
            userName: {
                // 必须的
                presence: true
            }

        };

        return utils.validate( "#formList", constraints );
    },

    saveAjax: function() {         
        utils.ajax({
            url: "",
            success: function (data, status, error) {
                 
            } 
        });

    },

    save: function() {
        //表单验证
        if( leave.validate() ) {

        }
    }
};;
/*
* 加班管理
*/

var overtime = {
	init: function(){
		overtime.mdater();

        overtime.initDate();
	},

    initDate: function (){
        $("#txtStartTime, #txtEndTime").datetimePicker();
    },

	mdater: function(){
        $('#cal').mdater({
            marks:{                    
                violet_o: ["2016-03-01 09:00","2016-03-02 09:00"], // 迟到 紫色  、签卡
                yellow_o: ["2016-03-03 09:00"],  //早退  黄色
                red_o: ["2016-03-04 09:00"],    //红色，异常
                green_o: ["2016-03-05 09:00"],  //绿色 ，出差 、加班 、 请假、 外出
                orange_o: ["2016-03-06 09:00"],   //橙色 外派
                blue_o: ["2016-03-08 09:00","2016-03-09 09:00","2016-03-19 09:00"] //  正常 
            }
        });
	},

    validate: function() {
        var constraints = {
            userName: {
                // 必须的
                presence: true
            }
        };

        return utils.validate( "#formList", constraints );
    },

    saveAjax: function() {         
        utils.ajax({
            url: "",
            success: function (data, status, error) {
                 
            } 
        });

    },

    save: function() {
        //表单验证
        if( overtime.validate() ) {

        }
    }
};;
/*
* 考勤管理
*/

var signCard = {
	init: function(){
		signCard.mdater();
        signCard.initDate();
	},

    initDate: function (){
        $("#txtStartTime").datetimePicker();
    },

	mdater: function(){
        $('#cal').mdater({
            marks:{                    
                violet_o: ["2016-03-01 09:00","2016-03-02 09:00"], // 迟到 紫色  、签卡
                yellow_o: ["2016-03-03 09:00"],  //早退  黄色
                red_o: ["2016-03-04 09:00"],    //红色，异常
                green_o: ["2016-03-05 09:00"],  //绿色 ，出差 、加班 、 请假、 外出
                orange_o: ["2016-03-06 09:00"],   //橙色 外派
                blue_o: ["2016-03-08 09:00","2016-03-09 09:00","2016-03-19 09:00"] //  正常 
            }
        });
	},

    validate: function() {
        var constraints = {
            userName: {
                // 必须的
                presence: true
            }
        };

        return utils.validate( "#formList", constraints );
    },

    saveAjax: function() {         
        utils.ajax({
            url: "",
            success: function (data, status, error) {
                 
            } 
        });

    },

    save: function() {
        //表单验证
        if( signCard.validate() ) {

        }
    }
};;/*
*  已读邮件
*/

var readEmails = {
	init: function(){
		
	}
};;/*
*  已发送邮件
*/

var sendEmails = {
	init: function(){
		
	}
};;/*
*  未读邮件
*/

var unreadEmails = {
	init: function(){
		
	}
};;
/*
* 首页
*/

var home = {
    init: function(){
       console.log('首页初始化');
    }
};
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
};;/*
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

};;
(function(){
	$.config = {
	    autoInit: false,                //在 document.onload 之后自动调用 $.init 方法。如果你的页面内容是异步加载的，应该关闭这个配置，并且在加载完成之后手动调用 $.init
	    router: true,                   //默认启用MSUI内置的Router功能
	    routerFilter: null,             //当前点击链接是否使用路由功能的自定义过滤器。这是一个函数，实参是当前点击的链接的 Zepto 对象（即 $('the-link'）），返回 false 表示不使用路由功能，返回 true 表示进入路由功能后续处理。
	    showPageLoadingIndicator: true, //在加载新页面过程中显示一个加载指示器。
	    swipePanel: "left",             //是否可以通过左右滑动打开侧栏，一次只能指定一个方向。
	    swipePanelOnlyClose: true       //只允许滑动关闭侧栏，不允许滑动打开
	  }
	
    /*
    * 页面初始化
    */

    //登陆页
    $(document).on("pageInit","#login", function(e, pageId, $page){
    	 login.init();
    });

    //首页
    $(document).on("pageInit","#home", function(e, pageId, $page){
    	 home.init();
    });

    //未读邮件
    $(document).on("pageInit","#unreadEmails", function(e, pageId, $page){
    	 unreadEmails.init();
    });
    //已读邮件
    $(document).on("pageInit","#readEmails", function(e, pageId, $page){
    	 readEmails.init();
    });
    //已发邮件
    $(document).on("pageInit","#sendEmails", function(e, pageId, $page){
    	 sendEmails.init();
    });



    //流程审批
    $(document).on("pageInit","#publicNotion", function(e, pageId, $page){
    	 publicNotion.init();
    });

    //流程审批
    $(document).on("pageInit","#process", function(e, pageId, $page){
    	 process.init();
    });

    //通讯录
    $(document).on("pageInit","#addressList", function(e, pageId, $page){
    	 addressList.init();
    });

    //#region考勤管理
    $(document).on("pageInit","#attendanceManage", function(e, pageId, $page){
    	 attendanceManage.init();
    });
                
        //出差
        $(document).on("pageInit","#businessTrip", function(e, pageId, $page){
    	     businessTrip.init();
        });
        //外出
        $(document).on("pageInit","#goOut", function(e, pageId, $page){
    	     goOut.init();
        });
        //加班
        $(document).on("pageInit","#overtime", function(e, pageId, $page){
    	     overtime.init();
        });
        //请假
        $(document).on("pageInit","#leave", function(e, pageId, $page){
    	     leave.init();
        });
        //签卡
        $(document).on("pageInit","#signCard", function(e, pageId, $page){
    	     signCard.init();
        });
        //外派
        $(document).on("pageInit","#assignment", function(e, pageId, $page){
    	     assignment.init();
        });
    //#endregion


    //工作计划
    $(document).on("pageInit","#workPlan", function(e, pageId, $page){
    	 workPlan.init();
    });

    //个人申请
    $(document).on("pageInit","#applyList", function(e, pageId, $page){
    	 applyList.init();
    });

    

    //用户中心
    $(document).on("pageInit","#userCenter", function(e, pageId, $page){
    	 userCenter.init();
    	 console.log(window.location.href);
    });


    
     
    $.init();   //此方法务必在以上 初始化 之后执行。

})();

;
/*
* 审批流程
*/
var process = {
	init: function(){
         process.menuInit();
	},

    menuInit: function(){
       utils.menu();
    }


};;/*
* 通知公告
*/

var publicNotion = {
	init: function(){
		
	}
};;/*
* 工作计划
*/

var workPlan = {
	init: function(){
        utils.menu();
	}

};
//# sourceMappingURL=app.js.map