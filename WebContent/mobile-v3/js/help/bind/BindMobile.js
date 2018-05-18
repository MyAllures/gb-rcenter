/**
 * Created by snake on 18-5-2.
 */
$(function () {
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-content.mui-scroll-wrapper',
        /*禁用侧滑手势指定样式*/
        disabledHandSlip: ['mui-off-canvas-left']
    };
    muiInit(options);
    initSendPhoneCode();
});

/*
 初始化获取验证码按钮
 */
function initSendPhoneCode() {
    var obj = $("#sendPhoneCode");
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

//发送手机验证码
function sendPhoneCode() {
    var $phone = $("[name='search.contactValue']");
    /*var reg = '/^\d{7,20}$/';
    if (!reg.text($phone.val())){
        toast("手机号码格式不正确，请输入7-20位纯数字");
        return;
    }*/
    var phone = $phone.val();
    if (!phone){
        toast("请输入7-20位纯数字");
        return;
    }
    var obj = $("#sendPhoneCode");
    if ($phone.valid()) {
        var options = {
            url: root + "/verificationCode/getPhoneVerificationCode.html",
            data: {"phone": $phone.val()},
            success: function (data) {
                if (data) {
                    var phoneInterval;
                    sessionStorage.setItem("phoneCountdown", new Date());
                    wait(90, obj, phoneInterval);
                } else {
                    initSendPhoneCode();
                }
            },

        };
        muiAjax(options);
    }
}

//发送短信，邮箱等待
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

//绑定手机号提交
function bindMobile(obj, options) {
    var $oldPhone = $("[name='oldPhone']");
    if ($oldPhone.length > 0) {
        var oldPhone = $oldPhone.val();
        if (oldPhone) {
            return toast("旧手机号码不能为空");
        } else if (oldPhone == $("[name='search.contactValue']").val()) {
            return toast("旧手机号码不能与新手机号码一致");
        }
    }
    var $form = $('#regForm');
    if (!$form.valid()) {
        return;
    }
    var formData = $form.serialize();
    options = {
        data: formData,
        dataType: 'json',
        type: 'post',
        url: root + '/help/savePhone.html',
        beforeSend: function () {
            $(obj).text(window.top.message.passport_auto['提交中']).attr("disabled", "disabled");
        },
        success: function (data) {
            if (data.state == false) {
                toast(data.msg);
            } else {
                toast(data.msg);
                goToUrl(root + '/help/phoneNumber.html');
            }
        },
        complete: function () {
            $(obj).text("立即绑定").removeAttr("disabled");
        }
    };
    muiAjax(options);
}