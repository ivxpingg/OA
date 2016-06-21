 
 /*
 * 公共方法 
 */

//路由跳转

com = {

    //根目录设置
	root: "",
    
	routerLoad: function(id, ignoreCache){
        // ignoreCache 是加载一个新页面时是否忽略缓存而发网络请求，
        //默认是 false，表示使用缓存，可以设为 true 来忽略缓存
        $.router.load(id, ignoreCache);
    },

    isArray: Array.isArray,

    isWindow: function( obj ) {
    	return obj != null && obj === obj.window;
    },

    type: function( obj ) {

    	if( !(obj === obj) ) { return "[object NaN]"; }

    	return Object.prototype.toString.apply( obj );

    },

    error: function( str ) {
        throw new Error( str );
    },

    isEmptyObject: function( obj ) { 
        var name;
		for ( name in obj ) {
			return false;
		}
		return true;
    }

};

utils.extend(utils, com);


