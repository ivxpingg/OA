/*
* 表单验证
* 依赖 validat.js 组件
*/

utils.extend(utils, {
    //@param    
    //#id: String 表单容器id
    //#constraints: Object 表单验证格式,不填采用默认格式
    //#bError: Boolean 是否提示错误, 默认为true
    //@return boolean
	validate: function( id, constraints,  bError ){
        
        var attributes = document.querySelector(id);
        var errors = validate(attributes, constraints) || [];  

        if( !utils.isEmptyObject(errors) ) {
            if( utils.type( bError ) === "[object Undefined]" || bError ) {
	            utils.formToast(errors);            
	        }

	        return false;
        } else {
        	return true;
        }    
	},
     
    //获取表单的所有值，作为一个对象返回
    // 使用input 的name 作为key, value 作为值
    // 例如<input type="text" name="email" value="foo@bar.com" />
    // 将返回 {email: "foo@bar.com"}
    //@return: Object
    collectFormValues: function ( id ) {
        var attributes = document.querySelector(id);
        return validate.collectFormValues(attributes);
    },

    //提示表单错误
	formToast: function( errors ) {

        for (var attr in errors) {
            $.toast(errors[attr]);
            return;
        }

	}

});