//导航切换
utils.menu = function(){	
	"use strict";
	
    $(".cc-nav>li").click(function(){
        if($(this).hasClass('active')){ return; }

        var role = $(this).attr("role");

        if( $("#" + role).length == 0 ) return;  // 找不到菜单对象则不执行

        var li_current = $(this).parent().find('li.active');
        if(li_current){            
        	var role_current = $(li_current).attr('role');  
        	$(this).parent().find('li').removeClass('active');
        	$("#" + role_current).addClass('hide');
        }
        
        $(this).addClass('active');

        $("#" + role).removeClass('hide');

    });
}