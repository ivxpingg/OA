
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

