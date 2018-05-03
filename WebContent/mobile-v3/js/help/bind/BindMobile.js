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
});
var delayTime = 90;

/**
 * 倒计时
 * @param that
 * @param e
 */
function countDown(that, e) {
    that.delayTime--;
    $(e.currentTarget).text(window.top.message.personInfo_auto['几秒后重新获取'].replace("{0}", that.delayTime));
    if (that.delayTime == 1) {
        that.timer = '';
        that.delayTime = 90;
        $(e.currentTarget).text(window.top.message.personInfo_auto['免费获取验证码']);
        $(e.currentTarget).removeClass("disable-gray");
        $(e.currentTarget).unlock();
    } else {
        that.timer = setTimeout(function () {
            that.countDown(that, e);
        }, 1000);
    }
}

//发送手机验证码
function sendPhoneCode() {
    var $phone = $("[name='phone.contactValue']");
    var obj = $("#sendPhoneCode");
    if ($phone.val() == "") {
        toast(window.top.message.passport_auto['请输入手机号']);
        return;
    } else if ($phone.valid()) {
        var options = {
            type: "POST",
            url: root + "/verificationCode/getPhoneVerificationCode.html",
            dataType: "json",
            data: {"phone": $phone.val()},
            success: function (data) {
                if (data) {
                    var phoneInterval;
                    wait(90, obj, phoneInterval);
                }
            },
            error: function () {
                toast(window.top.message.passport_auto['服务忙']);
            }
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

function bindMobile(obj) {
    var $phone = $("[name='phone.contactValue']");
    var $phoneCode = $("#phoneCode");
    if ($phone.val() == "") {
        toast(window.top.message.passport_auto['请输入手机号']);
        return;
    } else if ($phoneCode.val() == "") {
        toast("请输入验证码");
        return;
    } else if ($phone.valid() && $phoneCode.valid()) {
        var data = {'search.contactValue': $phone.val(), 'code': $phoneCode.val()}
        var options = {
            data: data,
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
                    goToUrl(root + '/help/updataMobile.html');
                }
            },
            complete: function () {
                $(obj).text("立即绑定").removeAttr("disabled");
            }
        };
        muiAjax(options);

    }
}