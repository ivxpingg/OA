/*
*  写邮件
*/

var email = {
	domTree: null,
	init: function(){
         email.addressList();		
	},

    addressList: function() {
        if(!email.domTree) {
             email.domTree = tree({
				target: "#listAddress",
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
	            id: "id",
	            checkbox: true,
	            name: "name",
	            children: "item",
	            list: {
	              id: "id",
	              name: "名字",
	              online: "名字",
	              orgpathname: "名字"
	           }
			});
        }

    }
};