/*
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

};