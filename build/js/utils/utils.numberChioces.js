
/*  HTML模版
 *  <div class="number-choices"><div class="minus">-</div><div class="value">1</div><div class="plus">+</div></div>
*/

//数量选择
utils.numberChoices = function(){	
	"use strict";
	
    $(".number-choices>.minus").off("click").on( "click", function(){
        var value = +$(this).next(".value").html();
        if( value > 0 ) {
            $(this).next(".value").empty().append(--value);
        }
        
    });

    $(".number-choices>.plus").off("click").on( "click", function(){
        var value = +$(this).prev(".value").html();
        $(this).prev(".value").empty().append(++value);
    });
}