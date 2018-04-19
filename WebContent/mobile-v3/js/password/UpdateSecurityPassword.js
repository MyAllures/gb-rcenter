/**
 * Created by snake on 18-4-17.
 */

$(function () {
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-scroll-wrapper'
    };
    /*初始化mui框架*/
    muiInit(options);
    /*检查真实姓名*/
    checkHasRealName();
    /*初始化修改安全码*/
    initInput();
});


/**
 * 提交修改安全密码
 *mui监听事件点击直接触发
 */
function submitSafePassword() {
    if (checkForm()) {
        var options = {
            url: root + '/passport/securityPassword/updatePassword.html',
            type: 'POST',
            dataType: 'json',
            data: $('#updateSecurityPwd').serialize(),
            beforeSend: function () {
                window.top.pd.show();
            },
            success: function (data) {
                window.top.pd.hide();
                switch (data.state) {
                    case '94':
                        $('[name=realName]').select();
                        toast(window.top.message.passport_auto['真实姓名错误']);
                        break;
                    case '97':
                        $('[name=code]').select();
                        toast(window.top.message.passport_auto['验证码错误2']);
                        break;
                    case '98':
                        showCaptcha(data, window.top.message.passport_auto['原密码错误']);
                        break;
                    case '99':
                        customerUrl = data.customer;
                        freezeTip(data);
                        break;
                    case '100':
                        toast(window.top.message.passport_auto['修改成功']);
                        setTimeout(function () {
                            gotoUrl(root + '/mine/index.html');
                        }, 800);
                }
            }
        };
        muiAjax(options);
    }
}

function checkForm() {
    return checkRealNameForm($('[name=realName]').val()) && checkOriginPwd()
        && checkNewPwd() && checkCaptcha();
}

/** 检测原密码 */
function checkOriginPwd() {
    var $originPwd = $('[name=originPwd]');
    var originPwd = $originPwd.val();

    if (originPwd == null || originPwd.trim().length == 0) {
        toast(window.top.message.passport_auto['请输入原密码']);
        $originPwd.focus();
        return false;
    }

    var reg = /^[0-9]{6}$/;
    if (!reg.test(originPwd)) {
        toast(window.top.message.passport_auto['安全密码长度']);
        $originPwd.focus();
        return false;
    }
    return true;
}

/**
 * 验证新密码
 */
function checkNewPwd() {
    var $pwd1 = $('[name=pwd1]');
    var pwd1 = $pwd1.val();
    var reg = /^[0-9]{6}$/;

    if (pwd1 == null || pwd1.trim().length == 0) {
        toast(window.top.message.passport_auto['请输入新的安全密码']);
        $pwd1.focus();
        return false;
    } else if (!reg.test(pwd1)) {
        toast(window.top.message.passport_auto['安全密码长度2']);
        $pwd1.focus();
        return false;
    }

    else if (checkPasswordStrength(pwd1) == false) {
        toast(window.top.message.passport_auto['安全密码过于简单']);
        $pwd1.focus();
        return false;
    }

    var $pwd2 = $('[name=pwd2]');
    var pwd2 = $pwd2.val();

    if (pwd2 == null || pwd2.trim().length == 0) {
        toast(window.top.message.passport_auto['请再次输入安全密码']);
        $pwd2.focus();
        return false;
    } else if (pwd1 != pwd2) {
        toast(window.top.message.passport_auto['两次密码不一致']);
        $pwd2.focus();
        return false;
    }

    return true;
}

/*效验提交安全码*/
/*function checkSecurityPasswordForm(pwd1, pwd2) {
    var reg = /^[0-9]{6}$/;

    if (pwd1 == null || pwd1.trim().length == 0) {
        toast(window.top.message.passport_auto['请输入安全密码']);
        $('[name=pwd1]').focus();
        return false;
    } else if (!reg.test(pwd1)) {
        toast(window.top.message.passport_auto['安全密码长度2']);
        $('[name=pwd1]').focus();
        return false;
    } else if (checkPasswordStrength(pwd1) == false) {
        toast(window.top.message.passport_auto['安全密码过于简单']);
        $('[name=pwd1]').focus();
        return false;
    }

    if (pwd2 == null || pwd2.trim().length == 0) {
        toast(window.top.message.passport_auto['请再次输入安全密码']);
        $('[name=pwd2]').focus();
        return false;
    } else if (pwd1 != pwd2) {
        toast(window.top.message.passport_auto['两次密码不一致']);
        $('[name=pwd2]').focus();
        return false;
    }

    return true;
}*/

/*检查密码强度*/
/*function checkPasswordStrength(pwd1) {
    var isOk = false;
    var options = {
        url: root + '/passport/securityPassword/checkPwdStrength.html',
        type: 'POST',
        data: {'pwd': pwd1},
        async: false,
        success: function (data) {
            isOk = data;
        }
    };
    muiAjax(options);
    /!*mui.ajax(root + '/passport/securityPassword/checkPwdStrength.html', {
     type: 'POST',
     data: {'pwd': pwd1},
     async: false,
     success: function (data) {
     isOk = data;
     }
     });*!/
    return isOk;
}*/

/**
 * 异步添加名字
 */
/*function setRealName() {
    var realName = $('[name=realName]').val();
    if (checkRealNameForm(realName)) {
        var options = {
            url: root + '/passport/securityPassword/setRealName.html',
            type: 'POST',
            data: {'realName': realName},
            dataType: 'json',
            success: function (data) {
                if (data == 'true' || data == true) {
                    $('[name=hasName]').val('true');
                    toast(window.top.message.passport_auto['成功']);
                }
            }
        };
        muiAjax(options);
    } else {
        return false;
    }
}*/
