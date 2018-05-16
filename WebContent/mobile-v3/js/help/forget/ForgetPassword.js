$(function () {
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-content.mui-scroll-wrapper',
        /*禁用侧滑手势指定样式*/
        disabledHandSlip: ['mui-off-canvas-left']
    };
    muiInit(options);
});

/**
 * 判断用户是否可以短信设置登录密码
 * @param obj
 * @param options
 */
function judgeUserExist(obj, options) {
    var userName = $('#userName').val();
    if (userName == null || userName == '') {
        toast("账号不能为空");
        return;
    }
    var ajaxOptions = {
        url: root + '/forgetPassword/getFindWay.html',
        data: {"forgetUserName": userName},
        type: 'post',
        dataType: "json",
        success: function (data) {
            if (typeof data.phone == 'undefined') {
                alertConfirm(obj);
                return;
            }
            if (data.encryptedId) {
                goToUrl(root + "/help/sendPhoneCode.html?encryptedId=" + data.encryptedId + "&phone=" + data.phone);
            } else {
                toast("发送失败");
            }
        }
    };
    muiAjax(ajaxOptions);
}

/**
 * 未绑定手机,或没开启手机短信找回密码
 */
function alertConfirm(obj) {
    var options = {//创建一个div
        title: '温馨提示',
        confirm: '该账号未绑定手机，请联系客服找回密码',
        btnArray: ['联系客服', '取消'],
        func: loadCustomer
    };
    showConfirmMsg(options, obj);
}

