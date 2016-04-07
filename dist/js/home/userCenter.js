//确定修改密码
function modifyPwd(pageId) {

    var constraints = {
        oldPassword: {
            presence: true
        },
        ePassword1: {
            presence: true,
            length: {
                minimum: 6,
                maximum: 20
            }
        },
        ePassword2: {
            presence: true,
            equality: {
                attribute: "ePassword1",
                message: "^2个密码不相等"
            }
        }

    }

    var attribute = document.querySelector("#formPassword");
    var errors = validate(attribute, constraints) || [];

    for (var attr in errors) {
        $.toast(errors[attr]);
        return;
    }
    $.toast('修改成功');
    $.router.load(pageId);
};
