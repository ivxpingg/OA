/* 
 *长潮OA 
*/
//utils参数

var utils = {},
    com = {};

;
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

com = {

    //根目录设置
	root: "",
    
    //获取URL参数
    //@return: string | null
    getUrlParam: function (name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    },
    
    // 路由跳转
    //@param
    //#id 跳转的路径 
    // 例子  utils.routerLoad("#page") 跳转本页面
    //       utils.routerLoad("./home/home.html")  跳转新页面
    //#ignoreCache 是加载一个新页面时是否忽略缓存而发网络请求，默认是 false，表示使用缓存，可以设为 true 来忽略缓存
	routerLoad: function(id, ignoreCache){

        $.router.load(id, ignoreCache);

    },
    routerBack: function(){
        $.router.back();
    },
    
    //判断是否是数组
    isArray: Array.isArray,

    //
    isWindow: function( obj ) {
    	return obj != null && obj === obj.window;
    },
    
    //
    isFunction: function(value){
        return typeof value === 'function';
    },
    
    //
    type: function( obj ) {

    	if( !(obj === obj) ) { return "[object NaN]"; }

    	return Object.prototype.toString.apply( obj );

    },
    
    //
    error: function( str ) {

        throw new Error( str );

    },
    
    //判断是否是空对象
    isEmptyObject: function( obj ) { 

        var name;

		for ( name in obj ) {
			return false;
		}

		return true;

    }

};

utils.extend(utils, com);


;/*
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
});;//导航切换
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
};
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
};// 依赖
// utils.extend.js
// Zepto.js | jQuery.js
// 2016-06-22  sgj


(function(exports, module, define) {
  "use strict";
     
    
    var tree = function(options){

        // options = {
        //     target: "",
        //     data: null,
        //     id: "",
        //     name: "",
        //     children: "",
        //     list: {},
        //     checkbox: false
        // };
    	
    	return new tree.fn.init(options);
    };

    tree.fn = tree.prototype = {

        version: "1.0.0",

        constructor: tree,
        //获取选中数据
        getCheckedData: function(){
        	var p = this.options,
                _s = this,
                nodes,
                data = [];

            nodes = document.querysSelector(p.target).querySelectorAll(".sub-chb");

            nodes.forEach(function(){
                data.push($(this.parentNode).data("data"));
            });

        }
    };

    var init = tree.fn.init = function(options){
        tree.options = utils.extend( {}, options );
        tree.build();
        return tree;
    };

    init.prototype = tree.prototype;
    
    
    utils.extend( tree.fn, {
        
    });

    utils.extend( tree, {

        isEmptyObject: function( obj ){
            if( obj === null ) return true;
            var name;
            for(name in obj) { return false; }

            return true;
        },
        exposeModule: function(tree, root, exports, module, define){
            if (exports) {
                if (module && module.exports) {
                  exports = module.exports = tree;
                }
                exports.tree = tree;
              } else {
                root.tree = tree;
                if (utils.isFunction(define) && define.amd) {
                  define([], function () { return tree; });
                }
              }
        }
    });

    utils.extend( tree, {  
        build: function(){
            var p = this.options,
                _s = this,
                data = p.data,
                item;

            if( data === null && tree.isEmptyObject(data) ) {
                return ;
            }
             
             //如果目标元素不是空元素
            if( document.querySelector(p.target).childNodes.length > 0 ) {

                document.querySelector(p.target).innerHTML = "";

            }

            for( item in data ){
                tree.level(data[item]);
            }

            tree.setEvent();
            tree.checkbox();
        },

        //判断构建层级
        level: function(item){
            var p = this.options,
                _s = this;

            document.querySelector(p.target).appendChild( tree.buildLv1(item) );  
            
        },

        //构建第一层
        buildLv1: function(item) {
            var p = this.options,
                _s = this,
                dom_li,
                dom_a;

            dom_li = document.createElement("li");

            if( p.checkbox ) {
                var dom_checked = document.createElement("input");
                dom_checked.type = "checkbox";
                dom_checked.id = item[p.id];
                dom_checked.className = "chb";
                dom_checked.name = "treeNodeLv1";
                
                $(dom_checked).data("data", item);

                dom_li.appendChild(dom_checked);                
                dom_li.className = "checkboxs"; 

            }

            dom_a = document.createElement("a");
            dom_a.className = "cc-box";    
            
            dom_li.appendChild(dom_a);

            dom_a.innerHTML += "<div class='value value-lger pad-tb-11'>"+ item[p.name] +"</div>"
                              + "<div class='value value-lger pad-tb-11 pull-right mg-r-15'>"+ ((item[p.children] && item[p.children].length) || 0) +"</div>"
                              + "<img class='goto-img' src='../../dist/img/goto-right.png' alt='' >";

            if( item[p.children] && item[p.children].length > 0 ) { tree.buildLv2( item[p.children], dom_li ); }
         
            return dom_li;
        },

        //构建第二层
        buildLv2: function(item, parentNode) {
            var p = this.options,
                _s = this,
                value,
                dom_div_body,
                dom_ul,

            dom_div_body = document.createElement("div");
            dom_div_body.className = "box-body hide";
            dom_ul = document.createElement("ul");
            dom_ul.className = "cc-list cc-list-border";
            
            dom_div_body.appendChild(dom_ul);
            parentNode.appendChild(dom_div_body);

            for( value in item ) {
                var dom_li = document.createElement("li");
                
                var dom_div = document.createElement("div");
                dom_div.className = "cc-box";

                dom_div.innerHTML = "<div class='value pad-tb-4 mg-t-6'>"+ item[value][p.name] +"</div>";
                
                if( p.checkbox ) {
                    var dom_checkeds = document.createElement("input");
                    dom_checkeds.type = "checkbox";
                    dom_checkeds.id = item[value][p.id];
                    dom_checkeds.name = "treeNodeLv2";                  
                    dom_checkeds.className = "sub-chb";
                    $(dom_div).data("data",item[value]);   //不知道为什么数据放在 dom_checkeds 对象一直获取不到，所以把数据存放在父节点

                    dom_div.appendChild(dom_checkeds);
                }

                for(var key in p.list){
                    dom_div.innerHTML += "<div class='sub-value sub-value-lg pad-tb-3'>"+ p.list[key] +": <span>"+ item[value][key] +"</span></div>";
                }    

                dom_li.appendChild(dom_div);
                dom_ul.appendChild(dom_li);
            }

        },

        //设置事件
        setEvent: function() { 
            var p = this.options, _s = this,
                dom_target, dom_boxs;

            // dom_target = document.querySelector(p.target);

            // dom_boxs = dom_target.querySelectorAll(".cc-box");

            // dom_boxs.forEach(function(dom){
            //     dom.addEventListener("click", function(){
            //         var dom_box = this.nextSibling();
            //         var dom_img = this.querySelector(".goto-img");


            //     }, false);
            // });
            $( p.target +'>li>.cc-box').click(function(){
                    
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
        },
        
        //选择事件设置
        checkbox: function(){
            var p = this.options, _s = this,
                pNodes, subNodes;
            
            if( !p.checkbox ) return;

            var treeDom = document.querySelector(p.target);

            pNodes = treeDom.querySelectorAll(".chb");
            subNodes = treeDom.querySelectorAll(".sub-chb");
            
            pNodes.forEach(function(n){
                n.addEventListener("change", function(){
                    if(this.checked) {                        
                        this.parentNode.querySelectorAll(".sub-chb").forEach(function(sub){
                             sub.checked = true;
                        });
                    } else {
                        this.parentNode.querySelectorAll(".sub-chb").forEach(function(sub){
                             sub.checked = false;
                        });
                    }

                },false);
            });

            subNodes.forEach(function(n) {
                n.addEventListener("change", function(){
                    if(this.checked) {                        
                        this.parentNode.parentNode.parentNode.parentNode.previousSibling.previousSibling.checked = true;
                    } else {
                        
                    }
                }, false);


            });

        },

        //获取选中数据
        getCheckedData: function(){
            var p = this.options,
                _s = this,
                nodes,
                data = [];

            nodes = document.querySelector(p.target).querySelectorAll(".sub-chb");

            nodes.forEach(function(n){
                if(n.checked)  data.push($(n.parentNode).data("data"));
            });

            return data;
        }

    	
    });



    tree.exposeModule(tree, this, exports, module, define)

}).call(this,
        typeof exports !== 'undefined' ? /* istanbul ignore next */ exports : null,
        typeof module !== 'undefined' ? /* istanbul ignore next */ module : null,
        typeof define !== 'undefined' ? /* istanbul ignore next */ define : null);;/*
* 表单验证
* 依赖 validat.js 组件
*/

utils.extend(utils, {
    //@param    
    //#id: String 表单容器id
    //#constraints: Object 表单验证格式,不填采用默认格式
    //#bError: Boolean 是否提示错误, 默认为true
    //@return boolean
	validate: function( id, constraints,  bError ){
        
        var attributes = document.querySelector(id);
        var errors = validate(attributes, constraints) || [];  

        if( !utils.isEmptyObject(errors) ) {
            if( utils.type( bError ) === "[object Undefined]" || bError ) {
	            utils.formToast(errors);            
	        }

	        return false;
        } else {
        	return true;
        }    
	},
     
    //获取表单的所有值，作为一个对象返回
    // 使用input 的name 作为key, value 作为值
    // 例如<input type="text" name="email" value="foo@bar.com" />
    // 将返回 {email: "foo@bar.com"}
    //@return: Object
    collectFormValues: function ( id ) {
        var attributes = document.querySelector(id);
        return validate.collectFormValues(attributes);
    },

    //提示表单错误
	formToast: function( errors ) {

        for (var attr in errors) {
            $.toast(errors[attr]);
            return;
        }

	}

});;
/*
 * 通讯地址
 */

 var addressList = {
 	domTree: null,   //存储通讯录对象
 	init: function(){
        addressList.addressList();
         
 	},
 	 // 初始化通讯录
    addressList: function() {
		 addressList.domTree = tree({
			target: "#listAddress",   //通讯录在页面的节点， 必须是id
			//通讯录数据 暂不支持按需加载
		    data: [{
		        id: '1',
		        item: [{
		            face:"/cos/styles/mobile/images/user_male.png",
		            id:10000003730292,
		            isCharge:1,
		            name:"甘志强(在线)",
		            online:1,
		            orgpathname:"/长潮科技",
		            sex:"1"
		        },{
		            face:"/cos/styles/mobile/images/user_male.png",
		            id:10000003730293,
		            isCharge:1,
		            name:"甘志强(在线2)",
		            online:1,
		            orgpathname:"/长潮科技",
		            sex:"1"
		        }],
		        name: "长潮科技",
		        nums: 2
		    },{
		        id: '1',
		        item: [],
		        name: "长潮科技/工程中心",
		        nums: 2
		    }],
		    id: "id",          //节点标识符
		    //checkbox: false,    //是否有选择框
		    name: "name",      //节点展示的属性
		    children: "item",  //第二层数据对应属性
		    list: {            //自定义第二层要展示的数据
		      id: "id",
		      name: "名字",
		      online: "名字",
		      orgpathname: "名字"
		   }
		});

    }

 };;/*
* 配件领用
*/
var accessoryTake = {
    init: function(){
        accessoryTake.buildData();
    },

    //页面配件数据
    buildData: function(){
         
        /* doSomething */ 

        utils.numberChoices();  // 页面配件加载完执行
    },
    //选择配件，并返回
    ok: function(){
        
        /* doSomething */ 
        
        utils.routerBack();  //返回
    }
};
/*
* 个人申请
*/
var applyList = {
    init: function(){
       
    }
};/*
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
};
/*
* 车辆维护
*/
var carUpkeep = {	
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
};/*
* 易耗品领用
*/
var consumableTake = {
    init: function(){
       utils.numberChoices();  // 页面易耗品加载完执行
    }
};/*
* 固定资产领用
*/
var fixedTake = {
    init: function(){
       utils.numberChoices();  // 页面固定资产加载完执行
    }
};/*
* 会议申请
*/
var meetingApply = {
    init: function(){
       
    }
};
/*
* 外派管理
*/

var assignment = {
	init: function(){
		assignment.mdater();

        assignment.initDate();
	},

    initDate: function (){
        $("#txtStartTime, #txtEndTime").datetimePicker();
    },

	mdater: function(){
        $('#cal').mdater({
            marks:{                    
                violet_o: ["2016-03-01 09:00","2016-03-02 09:00"], // 迟到 紫色  、签卡
                yellow_o: ["2016-03-03 09:00"],  //早退  黄色
                red_o: ["2016-03-04 09:00"],    //红色，异常
                green_o: ["2016-03-05 09:00"],  //绿色 ，出差 、加班 、 请假、 外出
                orange_o: ["2016-03-06 09:00"],   //橙色 外派
                blue_o: ["2016-03-08 09:00","2016-03-09 09:00","2016-03-19 09:00"] //  正常 
            }
        });
	},

    validate: function() {
        var constraints = {
            userName: {
                // 必须的
                presence: true
            }
        };

        return utils.validate( "#formList", constraints );
    },

    saveAjax: function() {         
        utils.ajax({
            url: "",
            success: function (data, status, error) {
                 
            } 
        });

    },

    save: function() {
        //表单验证
        if( assignment.validate() ) {

        }
    }
};;/*
* 考勤管理
*/

var attendanceManage = {
	init: function(){
		attendanceManage.mdater();
	},

	mdater: function(){
        $('#cal').mdater({
            marks:{                    
                violet_o: ["2016-03-01 09:00","2016-03-02 09:00"], // 迟到 紫色  、签卡
                yellow_o: ["2016-03-03 09:00"],  //早退  黄色
                red_o: ["2016-03-04 09:00"],    //红色，异常
                green_o: ["2016-03-05 09:00"],  //绿色 ，出差 、加班 、 请假、 外出
                orange_o: ["2016-03-06 09:00"],   //橙色 外派
                blue_o: ["2016-03-08 09:00","2016-03-09 09:00","2016-03-19 09:00"] //  正常 
            }
        });
	}
};;
/*
* 出差管理
*/

var businessTrip = {
	init: function(){
		businessTrip.mdater();
        businessTrip.initDate();
	},

    initDate: function (){
        $("#txtStartTime").datetimePicker();
    },

	mdater: function(){
        $('#cal').mdater({
            marks:{                    
                violet_o: ["2016-03-01 09:00","2016-03-02 09:00"], // 迟到 紫色  、签卡
                yellow_o: ["2016-03-03 09:00"],  //早退  黄色
                red_o: ["2016-03-04 09:00"],    //红色，异常
                green_o: ["2016-03-05 09:00"],  //绿色 ，出差 、加班 、 请假、 外出
                orange_o: ["2016-03-06 09:00"],   //橙色 外派
                blue_o: ["2016-03-08 09:00","2016-03-09 09:00","2016-03-19 09:00"] //  正常 
            }
        });
	},

    validate: function() {

        validate.extend(validate.validators.datetime, {
          // The value is guaranteed not to be null or undefined but otherwise it
          // could be anything.
          parse: function(value, options) {
            return +moment.utc(value);
          },
          // Input is a unix timestamp
          format: function(value, options) {
            var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
            return moment.utc(value).format(format);
          }
        });

        var constraints = {
            txtStartTime: {
                
            },
            txtEndTime: {
            }


        };

        return utils.validate( "#formList", constraints );
    },

    saveAjax: function() {         
        utils.ajax({
            url: "",
            success: function (data, status, error) {
                 
            } 
        });
    },

    save: function () {
        //表单验证
        if( businessTrip.validate() ) {

        }

    }
};;
/*
* 外出管理
*/

var goOut = {
	init: function(){
		goOut.mdater();
        goOut.initDate();
	},

    initDate: function (){
        $("#txtStartTime, #txtEndTime").datetimePicker();
    },

	mdater: function(){
        $('#cal').mdater({
            marks:{                    
                violet_o: ["2016-03-01 09:00","2016-03-02 09:00"], // 迟到 紫色  、签卡
                yellow_o: ["2016-03-03 09:00"],  //早退  黄色
                red_o: ["2016-03-04 09:00"],    //红色，异常
                green_o: ["2016-03-05 09:00"],  //绿色 ，出差 、加班 、 请假、 外出
                orange_o: ["2016-03-06 09:00"],   //橙色 外派
                blue_o: ["2016-03-08 09:00","2016-03-09 09:00","2016-03-19 09:00"] //  正常 
            }
        });
	},

    validate: function() {
        var constraints = {
            userName: {
                // 必须的
                presence: true
            },
            txtStartTime: {
                presence: true
            },
            txtEndTime: {
                presence: true
            },
            txtTimes: {
                presence: true,
                numericality: {
                    onlyInteger: true//,
                    //greaterThan: 0
                }
            }

        };

        return utils.validate( "#formList", constraints );
    },

    saveAjax: function() {         
        utils.ajax({
            url: "",
            success: function (data, status, error) {
                 
            } 
        });

    },

    save: function() {
        //表单验证
        if( goOut.validate() ) {

        }
    }

};;
/*
* 请假管理
*/

var leave = {
	init: function(){
		leave.mdater();

        leave.initDate();
	},

    initDate: function (){
        $("#txtStartTime, #txtEndTime").datetimePicker();
    },

	mdater: function(){
        $('#cal').mdater({
            marks:{                    
                violet_o: ["2016-03-01 09:00","2016-03-02 09:00"], // 迟到 紫色  、签卡
                yellow_o: ["2016-03-03 09:00"],  //早退  黄色
                red_o: ["2016-03-04 09:00"],    //红色，异常
                green_o: ["2016-03-05 09:00"],  //绿色 ，出差 、加班 、 请假、 外出
                orange_o: ["2016-03-06 09:00"],   //橙色 外派
                blue_o: ["2016-03-08 09:00","2016-03-09 09:00","2016-03-19 09:00"] //  正常 
            }
        });
	},

    validate: function() {
        var constraints = {
            userName: {
                // 必须的
                presence: true
            }

        };

        return utils.validate( "#formList", constraints );
    },

    saveAjax: function() {         
        utils.ajax({
            url: "",
            success: function (data, status, error) {
                 
            } 
        });

    },

    save: function() {
        //表单验证
        if( leave.validate() ) {

        }
    }
};;
/*
* 加班管理
*/

var overtime = {
	init: function(){
		overtime.mdater();

        overtime.initDate();
	},

    initDate: function (){
        $("#txtStartTime, #txtEndTime").datetimePicker();
    },

	mdater: function(){
        $('#cal').mdater({
            marks:{                    
                violet_o: ["2016-03-01 09:00","2016-03-02 09:00"], // 迟到 紫色  、签卡
                yellow_o: ["2016-03-03 09:00"],  //早退  黄色
                red_o: ["2016-03-04 09:00"],    //红色，异常
                green_o: ["2016-03-05 09:00"],  //绿色 ，出差 、加班 、 请假、 外出
                orange_o: ["2016-03-06 09:00"],   //橙色 外派
                blue_o: ["2016-03-08 09:00","2016-03-09 09:00","2016-03-19 09:00"] //  正常 
            }
        });
	},

    validate: function() {
        var constraints = {
            userName: {
                // 必须的
                presence: true
            }
        };

        return utils.validate( "#formList", constraints );
    },

    saveAjax: function() {         
        utils.ajax({
            url: "",
            success: function (data, status, error) {
                 
            } 
        });

    },

    save: function() {
        //表单验证
        if( overtime.validate() ) {

        }
    }
};;
/*
* 考勤管理
*/

var signCard = {
	init: function(){
		signCard.mdater();
        signCard.initDate();
	},

    initDate: function (){
        $("#txtStartTime").datetimePicker();
    },

	mdater: function(){
        $('#cal').mdater({
            marks:{                    
                violet_o: ["2016-03-01 09:00","2016-03-02 09:00"], // 迟到 紫色  、签卡
                yellow_o: ["2016-03-03 09:00"],  //早退  黄色
                red_o: ["2016-03-04 09:00"],    //红色，异常
                green_o: ["2016-03-05 09:00"],  //绿色 ，出差 、加班 、 请假、 外出
                orange_o: ["2016-03-06 09:00"],   //橙色 外派
                blue_o: ["2016-03-08 09:00","2016-03-09 09:00","2016-03-19 09:00"] //  正常 
            }
        });
	},

    validate: function() {
        var constraints = {
            userName: {
                // 必须的
                presence: true
            }
        };

        return utils.validate( "#formList", constraints );
    },

    saveAjax: function() {         
        utils.ajax({
            url: "",
            success: function (data, status, error) {
                 
            } 
        });

    },

    save: function() {
        //表单验证
        if( signCard.validate() ) {

        }
    }
};;/*
*  写邮件
*/

var email = {
	domTree: null,   //存储通讯录对象
	init: function(){
         email.addressList();		
	},
    // 初始化通讯录
    addressList: function() {
        if(!email.domTree) {
             email.domTree = tree({
				target: "#listAddress",   //通讯录在页面的节点， 必须是id
				//通讯录数据 暂不支持按需加载
	            data: [{
	                id: '1',
	                item: [{
	                    face:"/cos/styles/mobile/images/user_male.png",
	                    id:10000003730292,
	                    isCharge:1,
	                    name:"甘志强(在线)",
	                    online:1,
	                    orgpathname:"/长潮科技",
	                    sex:"1"
	                },{
	                    face:"/cos/styles/mobile/images/user_male.png",
	                    id:10000003730293,
	                    isCharge:1,
	                    name:"甘志强(在线2)",
	                    online:1,
	                    orgpathname:"/长潮科技",
	                    sex:"1"
	                }],
	                name: "长潮科技",
	                nums: 2
	            },{
	                id: '1',
	                item: [],
	                name: "长潮科技/工程中心",
	                nums: 2
	            }],
	            id: "id",          //节点标识符
	            checkbox: true,    //是否有选择框 默认 false
	            name: "name",      //节点展示的属性
	            children: "item",  //第二层数据对应属性
	            list: {            //自定义第二层要展示的数据
	              id: "id",
	              name: "名字",
	              online: "名字",
	              orgpathname: "名字"
	           }
			});
        }

    },
    //获取选中的通讯录人员并返回
    ok: function() {
    	var value = "",  
    	    reVal = email.domTree.getCheckedData(), //获取通讯录选中的数据
    	    n;

    	for( n in reVal) {
            value += reVal[n].name + ",";
    	}

    	value = value.substring(0, value.length);    	

    	$("#sender").val(value);

    	utils.routerBack();
    	//utils.routerLoad("#email");
    }

};;/*
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
};;/*
*  已读邮件
*/

var readEmails = {
	init: function(){
		
	},

	//
	detail: function( url ){
		utils.routerLoad(url);
	}
};;/*
*  已发送邮件
*/

var sendEmails = {
	init: function(){
		
	},

	detail: function( url ){
		utils.routerLoad(url);
	}
};;/*
*  未读邮件
*/

var unreadEmails = {
	init: function(){
		
	},
	detail: function( url ){
		utils.routerLoad(url);
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
        utils.routerLoad( com.root + "../login.html", true);//忽略缓存
	},
     
    //修改密码
	modifyPwd: function(){
        var constraints = {
	        oldPassword: {
	            presence: true
	        },
	        ePassword1: {
	            presence: true,
	            length: {
	                minimum: 6,
	                maximum: 20
	            }
	        },
	        ePassword2: {
	            presence: true,
	            equality: {
	                attribute: "ePassword1",
	                message: "^2个密码不相等"
	            }
	        }

	    }
        
        if( utils.validate('#editPwd', constraints) ){
           var formValues = utils.collectFormValues('#editPwd');
	       console.log(formValues);
	       utils.routerLoad(com.root + "../login.html", true);
	    }

	}
};;/*
* 工作计划
*/

var login = {
	init: function(){
		
	},
    //登录验证
	loginValidate: function(){
		//#region 表单验证 
	    var constraints = {
	        userName: {
	            // 必须的
	            presence: true
	        },

	        password: {
	            presence: true
	        }

	    };
	     //var error = utils.validate('formTelephone', constraints, false); //不提示错误
	    if( utils.validate('#formLogin', constraints) ){
           var formValues = utils.collectFormValues('#formLogin');
	       console.log(formValues);
	       utils.routerLoad(com.root + "home/home.html");
	    }
	    
	},
    //手机验证
	editPwd: function(pageId){
        var constraints = {
	        telephone: {
	            presence: true,
	            telephone: {
	                message: "^请输入正确电话号码"
	            }
	        }
	    }

	    if( utils.validate('#formTelephone', constraints) ){
	       utils.routerLoad(pageId);
	    }	

	},
    //修改密码
	modifyPwd: function(pageId) {

	    var constraints = {
	        ePassword: {
	            presence: true,
	            length: {
	                minimum: 6,
	                maximum: 20
	            }
	        },
	        ePassword2: {
	            presence: true,
	            equality: {
	                attribute: "ePassword",
	                message: "^2个密码不相等"
	            }
	        }

	    };

	    if( utils.validate('#formPassword', constraints) ){

           var formValues = utils.collectFormValues('#formPassword');
	       console.log(formValues);

	       utils.routerLoad(pageId);
	    }

	}

};;
/*
* 审批流程
*/
var process = {
  init: function() {
    process.menuInit();
  },

  /*
  菜单初始化
   */
  menuInit: function() {
    utils.menu();
  },

  /**
   * 查看待我审批任务详情
   * @param  {[string]} id    要展示的数据标识或其他
   * @param  {[string]} domId 跳转的页面元素ID
   * @return {[type]}       [description]
   */
  approveInfo: function(id, domId) {
    utils.routerLoad(domId);
  },

  /**
   * 查看待我审批任务详情
   * @param  {[string]} id    要展示的数据标识或其他
   * @param  {[string]} domId 跳转的页面元素ID
   * @return {[type]}       [description]
   */
  applyInfo: function(id, domId) {
    utils.routerLoad(domId);
  },

  /*
  同意审批
   */
  agree: function() {},

  /*
    不同意审批
   */
  disagree: function() {}


};
;/*
* 通知公告
*/

var publicNotion = {
	init: function(){
		
	}
};;/*
* 工作计划
*/

var workPlan = {
  init: function() {
    utils.menu();
  },

  newOk: function() {}

};
;
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

    //登陆页
    $(document).on("pageInit","#login", function(e, pageId, $page){
    	 login.init();
    });

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

    //邮件详情
    $(document).on("pageInit","#emailDetail", function(e, pageId, $page){
    	 emailDetail.init();
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

    //#region考勤管理
    $(document).on("pageInit","#attendanceManage", function(e, pageId, $page){
    	 attendanceManage.init();
    });
                
        //出差
        $(document).on("pageInit","#businessTrip", function(e, pageId, $page){
    	     businessTrip.init();
        });
        //外出
        $(document).on("pageInit","#goOut", function(e, pageId, $page){
    	     goOut.init();
        });
        //加班
        $(document).on("pageInit","#overtime", function(e, pageId, $page){
    	     overtime.init();
        });
        //请假
        $(document).on("pageInit","#leave", function(e, pageId, $page){
    	     leave.init();
        });
        //签卡
        $(document).on("pageInit","#signCard", function(e, pageId, $page){
    	     signCard.init();
        });
        //外派
        $(document).on("pageInit","#assignment", function(e, pageId, $page){
    	     assignment.init();
        });
    //#endregion


    //工作计划
    $(document).on("pageInit","#workPlan", function(e, pageId, $page){
    	 workPlan.init();
    });

    //#region 个人申请
    $(document).on("pageInit","#applyList", function(e, pageId, $page){
    	 applyList.init();
    });

        //会议申请
        $(document).on("pageInit","#meetingApply", function(e, pageId, $page){
	    	 meetingApply.init();
	    });

        //用车申请
        $(document).on("pageInit","#carApply", function(e, pageId, $page){
	    	 carApply.init();
	    });

        //车辆维护
        $(document).on("pageInit","#carUpkeep", function(e, pageId, $page){
	    	 carUpkeep.init();
	    });

	    //固定资产领用
        $(document).on("pageInit","#fixedTake", function(e, pageId, $page){
	    	 fixedTake.init();
	    });

	    //配件领用
        $(document).on("pageInit","#accessoryTake", function(e, pageId, $page){
	    	 accessoryTake.init();
	    });

	    //易耗品领用
        $(document).on("pageInit","#consumableTake", function(e, pageId, $page){
	    	 consumableTake.init();
	    });


    //#endregion 个人申请

    //写邮件
    $(document).on("pageInit","#email", function(e, pageId, $page){
    	 email.init();
    });

    //用户中心
    $(document).on("pageInit","#userCenter", function(e, pageId, $page){
    	 userCenter.init();
    	 console.log(window.location.href);
    });


    
     
    $.init();   //此方法务必在以上 初始化 之后执行。

})();


//# sourceMappingURL=app.js.map