(function(){


	 // 默认必须要执行$.init(),实际业务里一般不会在HTML文档里执行，通常是在业务页面代码的最后执行 
    $.init();
    
 
    $(document).on("pageInit","#userCenter", function(e, pageId, $page){
    	 console.log(window.location);
    });

    $(document).on("pageInit","#route1333", function(e, pageId, $page){
    	 console.log(e);
    });

})();
