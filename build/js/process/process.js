
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
