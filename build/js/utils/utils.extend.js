
//复制覆盖属性
//第一个参数最为目标对象， 剩下参数作为来源
utils.extend = function(obj) {
    [].slice.call(arguments, 1).forEach(function(source) {
      for (var attr in source) {
        obj[attr] = source[attr];
      }
    });
    return obj;
};