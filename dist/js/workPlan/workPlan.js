
function notCompletedWorkPlan(){
	'use strict';
    
     console.log('未完成的工作计划');

     $.router.load("#completed_work_plan");  //加载内联页面
};


function completedWorkPlan(){
	'use strict';
	 console.log('已完成的工作计划');
	 
	 $.router.load("#not_completed_work_plan");  //加载内联页面
}


(function(){


	 // 默认必须要执行$.init(),实际业务里一般不会在HTML文档里执行，通常是在业务页面代码的最后执行 
    $.init();
})();