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
            success: function (data) {
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
                            cancelRealName();
                        }, 800);
                }
            }
        };
        muiAjax(options);
    }
}

/*展示验证码*/
function showCaptcha(data, tip) {
    $('[name=originPwd]').select();
    toast(tip);
    if (data.captcha) {
        $('._pass').removeClass('final');
        $('._captcha').css('display', '');
        $('._times').text(data.times);
        $('[name=needCaptcha]').val(true);
    }
}

/*表单验证*/
function checkForm() {
    return checkRealNameForm($('[name=realName]').val()) && checkOriginPwd()
        && checkNewPwd() && checkCaptcha();
}

/*验证码是否规范*/
function checkCaptcha() {

    var needCaptcha = $('[name=needCaptcha]').val();
    if (needCaptcha == 'false') {
        return true;
    }

    var $captcha = $('[name=code]');
    var captcha = $captcha.val();

    if (captcha == null || captcha.trim().length == 0) {
        toast(window.top.message.passport_auto['请输入验证码']);
        $captcha.focus();
        return false;
    }
    return true;
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
