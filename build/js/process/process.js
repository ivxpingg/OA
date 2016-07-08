
/*
* 审批流程
*/
var process = {
  init: function() {
    process.menuInit();
  },

  //菜单初始化
  menuInit: function() {
    utils.menu();
  },

  //查看待我审批任务详情
  approveInfo: function(id, domId) {
    utils.routerLoad(domId);
  },

  //查看我的审批任务详情
  applyInfo: function(id, domId) {
    utils.routerLoad(domId);
  },

  // 同意审批
  agree: function() {},

  //不同意审批
  disagree: function() {}


};
