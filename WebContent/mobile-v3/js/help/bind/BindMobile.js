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

//发送手机验证码
function sendPhoneCode() {
    var $phone = $("[name='search.contactValue']");
    var obj = $("#sendPhoneCode");
    if ($phone.valid()) {
        var options = {

            url: root + "/verificationCode/getPhoneVerificationCode.html",

            data: {"phone": $phone.val()},
            success: function (data) {
                if (data) {
                    var phoneInterval;
                    wait(90, obj, phoneInterval);
                }//不到90如果再次点击
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
    if ($oldPhone.length > 0){
        if($oldPhone.val() == ""){
            return toast("旧手机号码不能为空");
        }else if ($oldPhone.val() == $("[name='search.contactValue']").val()){
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
