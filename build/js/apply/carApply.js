/*
* 用车申请
*/
var carApply = {	
    init: function(){
       
    },

    carDetail: function() {
    	var dom = "<div>"
                         + "<ul class='cc-list'>"
                             + "<li>用车人：<span>林思雨</span></li>"
                             + "<li>部门：<span>软件部</span></li>"
                             + "<li>开始时间：<span class='font-color-red'>2016-06-22 00:00:00</span></li>"
                             + "<li>结束时间：<span class='font-color-red'>2016-06-22 00:00:00</span></li>"
                             + "<li>流程状态：<span class='font-color-cyan'>已结束</span></li>"
                         + "</ul>"
    		        +"</div>";

        $.alert(dom);

    }
}