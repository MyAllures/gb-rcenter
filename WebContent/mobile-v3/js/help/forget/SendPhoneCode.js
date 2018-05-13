$(function () {
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-content.mui-scroll-wrapper',
        /*禁用侧滑手势指定样式*/
        disabledHandSlip: ['mui-off-canvas-left']
    };
    muiInit(options);
    sendPhoneCode();
    initSendPhoneCode();
});

/*
 初始化获取验证码按钮
 */
function initSendPhoneCode() {
    var obj = $("#sendPhone");
    var phoneInterval;
    var sendTime = sessionStorage.getItem("phoneCountdown");
    if (typeof sendTime != 'undefined' && sendTime != 'null') {
        var nowDate = new Date();
        var newDate = Date.parse(nowDate) - Date.parse(sendTime);
        if (newDate < 90000) {
            var seconds = newDate / 1000;
            seconds = 90 - seconds;
            if (0 < seconds < 90) {
                wait(seconds, obj, phoneInterval);
            }
        }
    }
}

/**
 * 找回密码发送手机短信
 */
function sendPhoneCode() {
    var encryptedId = $("#encryptedId").val();
    if (typeof encryptedId == 'undefined') {
        toast("发送手机短信失败");
        return;
    }
    var obj = $("#sendPhone");
    var ajaxOptions = {
        url: root + '/forgetPassword/getPhoneVerificationCode.html',
        data: {"encryptedId": encryptedId},
        type: 'post',
        dataType: "json",
        success: function (data) {
            if (data) {
                var interval;
                sessionStorage.setItem("phoneCountdown", new Date());
                wait(90, obj, interval);
            }else{
                toast("发送失败");
                $('#sendPhone').text(window.top.message.passport_auto['重新发送']);
            }
        }
    };
    muiAjax(ajaxOptions);
}

/**
 * 倒计时
 * @param t
 * @param obj
 * @param interval
 */
function wait(t, obj, interval) {
    interval = setInterval(function () {
        if (t > 0) {
            obj.text((t--) + window.top.message.passport_auto['重新发送2']);
            obj.attr("disabled", true);
            obj.addClass("mui-disabled");
        } else {
            window.clearInterval(interval);
            obj.text(window.top.message.passport_auto['重新发送']);
            obj.removeAttr("disabled");
            obj.removeClass("mui-disabled");
        }
    }, 1000);
}

/**
 * 验证手机短信
 */
function checkPhoneCode() {
    var phoneCode = $("#phoneCode").val();
    if (phoneCode == null || phoneCode == '') {
        toast("手机验证码不能为空");
        return;
    }
    var encryptedId = $("#encryptedId").val();
    var ajaxOptions = {
        url: root + '/forgetPassword/checkPhoneCode.html',
        data: {"phoneCode": phoneCode},
        type: 'post',
        dataType: "json",
        success: function (data) {
            if (data) {
                goToUrl(root + "/help/setLoginPassword.html?encryptedId=" + encryptedId);
            } else {
                toast("验证手机验证码错误");
                return;
            }
        }
    };
    muiAjax(ajaxOptions);
}