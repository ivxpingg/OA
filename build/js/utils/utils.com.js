 
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


