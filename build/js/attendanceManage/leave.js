
/*
* 请假管理
*/

var leave = {
	init: function(){
		leave.mdater();

        leave.initDate();
	},

    initDate: function (){
        $("#txtStartTime, #txtEndTime").datetimePicker();
    },

	mdater: function(){
        $('#cal').mdater({
            marks:{                    
                violet_o: ["2016-03-01 09:00","2016-03-02 09:00"], // 迟到 紫色  、签卡
                yellow_o: ["2016-03-03 09:00"],  //早退  黄色
                red_o: ["2016-03-04 09:00"],    //红色，异常
                green_o: ["2016-03-05 09:00"],  //绿色 ，出差 、加班 、 请假、 外出
                orange_o: ["2016-03-06 09:00"],   //橙色 外派
                blue_o: ["2016-03-08 09:00","2016-03-09 09:00","2016-03-19 09:00"] //  正常 
            }
        });
	},

    validate: function() {
        var constraints = {
            userName: {
                // 必须的
                presence: true
            }

        };

        return utils.validate( "#formList", constraints );
    },

    saveAjax: function() {         
        utils.ajax({
            url: "",
            success: function (data, status, error) {
                 
            } 
        });

    },

    save: function() {
        //表单验证
        if( leave.validate() ) {

        }
    }
};