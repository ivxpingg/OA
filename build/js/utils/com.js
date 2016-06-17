 
 /*
 * 公共方法 
 */

//路由跳转

var com = {
	
	routerLoad: function(id, ignoreCache){
        // ignoreCache 是加载一个新页面时是否忽略缓存而发网络请求，
        //默认是 false，表示使用缓存，可以设为 true 来忽略缓存
        $.router.load(id, ignoreCache);
    }
};

utils.extend(utils, com);


