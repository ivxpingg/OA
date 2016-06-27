
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

 };