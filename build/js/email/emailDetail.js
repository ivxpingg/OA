/*
*  邮件详情
*/

var emailDetail = {
	init: function(){
		emailDetail.setEvent();

	},

	setEvent: function() {
        $("#btnSwitch").on("click", function(){
             if($(this).hasClass("open")){
             	 $(this).removeClass("open").empty().append("详情");
             	 $("#info_panel").hide();
             }
             else{
             	$(this).addClass("open").empty().append("隐藏");
             	$("#info_panel").show();
             }
        });
	}
};