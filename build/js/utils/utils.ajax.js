/*
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
});