//依赖utils.extend.js

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
                _s = this;
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

            if( p.checked ) {
                var dom_checked = document.createElement("input");
                dom_checked.type = "checkbox";
                dom_checked.id = item[p.id];
                dom_li.appendChild(dom_checked);

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
                
                if( p.checked ) {
                    var dom_checked = document.createElement("input");
                    dom_checked.type = "checkbox";
                    dom_checked.id = item[value][p.id];
                    dom_div.appendChild(dom_checked);
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

        checkbox: function(){
            var p = this.options, _s = this;

            if( !p.checkbox ) return;


        }

    	
    });



    tree.exposeModule(tree, this, exports, module, define)

}).call(this,
        typeof exports !== 'undefined' ? /* istanbul ignore next */ exports : null,
        typeof module !== 'undefined' ? /* istanbul ignore next */ module : null,
        typeof define !== 'undefined' ? /* istanbul ignore next */ define : null);