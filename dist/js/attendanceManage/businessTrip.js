


(function(){
     'use strict';
	 // $.init();

     $("#txtStartTime, #txtEndTime").datetimePicker({});


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

})();


//提交

function save(){
    'use strict';
     formValidate();
    //var attributes = document.querySelector("#formList");

    //console.log(validate.collectFormValues(attributes));
    //console.log(validate.collectFormValues(attributes)); 获取表单值

};

//表单验证
function formValidate(){

    validate.extend(validate.validators.datetime, {
        // The value is guaranteed not to be null or undefined but otherwise it
        // could be anything.
        parse: function(value, options) {
          return +moment.utc(value);
        },
        // Input is a unix timestamp
        format: function(value, options) {
          var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
          return moment.utc(value).format(format);
        }
      });

    var attribute = document.querySelector("#formList");    
    var constraints = {
        txtName: {
            presence: true        
        },

        txtStartTime: {
            presence: true
        },
        
        txtEndTime: {
            presence: true,
            datetime: {
                //结束时间不能早于开始时间
                earliest: document.querySelector("#txtStartTime").value == "" ? "1900-01-01" : document.querySelector("#txtStartTime").value
            }

        }

    };

    
    var errors = validate(attribute, constraints) || [];

    for(var attr in errors){
        $.toast(errors[attr]);
        return;
    }
};