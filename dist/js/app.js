/* 
 *长潮OA 
*/
//utils参数
var utils = {};;
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

var com = {
	
	routerLoad: function(id, ignoreCache){
        // ignoreCache 是加载一个新页面时是否忽略缓存而发网络请求，
        //默认是 false，表示使用缓存，可以设为 true 来忽略缓存
        $.router.load(id, ignoreCache);
    }
};

utils.extend(utils, com);


;//导航切换
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
};
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
};/*
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

    //考勤管理
    $(document).on("pageInit","#attendanceManage", function(e, pageId, $page){
    	 attendanceManage.init();
    });

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