
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
 };