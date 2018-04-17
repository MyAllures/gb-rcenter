$(function () {

    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-scroll-wrapper'
    };
    muiInit(options);
    var sumit = $('.submit');
    checkHasRealName(sumit);
});

/**
 * 修改安全码
 *mui监听事件点击直接触发:submitSafePassword()
 */
function submitSafePassword () {
        if (checkForm()) {
            mui.ajax(root + '/passport/securityPassword/updatePassword.html', {
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
                            _this.toast(window.top.message.passport_auto['真实姓名错误']);
                            break;
                        case '97':
                            $('[name=code]').select();
                            _this.toast(window.top.message.passport_auto['验证码错误2']);
                            break;
                        case '98':
                            _this.showCaptcha(data, window.top.message.passport_auto['原密码错误']);
                            break;
                        case '99':
                            _this.freezeTip(data);
                            break;
                        case '100':
                            _this.toast(window.top.message.passport_auto['修改成功']);
                            setTimeout(function () {
                                if(os == 'android'){
                                    window.gamebox.finish();
                                }else if(os == 'app_ios'){
                                    goBack();
                                }else{
                                    location.replace(root + '/mine/index.html');
                                }
                            }, 800);
                    }
                },
                error: function () {
                    window.top.pd.hide();
                }
            });
        }
}
function  checkForm() {
    return checkRealName($('[name=realName]')) && this.checkOriginPwd()
        && this.checkNewPwd() && this.checkCaptcha();
}

function checkHasRealName (obj) {
    var hasName = $('[name=hasName]').val();
    if (hasName == 'false') {
        var content = '<input type="text" name="realName" maxlength="30" placeholder="' + window.top.message.passport_auto['请输入真实姓名'] + '"/>';

        options = {
            confirm:content,
            title:window.top.message.passport_auto['设置真实姓名'],
            btnArray:[window.top.message.passport_auto['确定'], '取消'],
            func:setRealName
        };
        showConfirmMsg(options,obj);
        /*layer.open({
            title: window.top.message.passport_auto['设置真实姓名'],
            content: content,
            shadeClose: false,
            btn: [window.top.message.passport_auto['确定'], ''],
            yes: function (index) {
                var realName = $('[name=realName]').val();

                if (_this.checkRealNameForm(realName)) {
                    mui.ajax(root + '/passport/securityPassword/setRealName.html', {
                        type: 'POST',
                        data: {'realName': realName},
                        success: function (data) {
                            if (data == 'true') {
                                $('[name=hasName]').val('true');
                                layer.close(index);
                            }
                        }
                    })
                }
            },
            no: function (index) {
                location.replace(root + '/mine/index.html');
            }
        })*/
    }
}

function setRealName(){
    var realName = $('[name=realName]');
    if (checkRealName(realName)) {
        /*mui.ajax(root + '/passport/securityPassword/setRealName.html', {
            type: 'POST',
            data: {'realName': realName},
            success: function (data) {
                if (data == 'true') {
                    $('[name=hasName]').val('true');
                    layer.close(index);
                }
            }
        });*/
        var options = {
            url:root + '/passport/securityPassword/setRealName.html',
            type: 'POST',
            data: {'realName': realName},
            dataType:'json',
            success: function (data) {
                if (data == 'true') {
                    $('[name=hasName]').val('true');
                    /*layer.close(index);*/
                }
            }
        };
        muiAjax(options);
    }
}

/** 检测真实姓名 */
function checkRealName($ele) {
    var realName = $ele.val();

    if (realName == null || realName.trim().length == 0) {
        toast(window.top.message.passport_auto['请输入真实姓名']);
        $ele.focus();

        return false;
    }

    var reg = /^(?!\d+$)^[a-zA-Z0-9\u4E00-\u9FA5\u0800-\u4e00\·]{2,30}$/;
    if (!reg.test(realName)) {
        toast(window.top.message.passport_auto['真实姓名长度']);
        $ele.focus();
        return false;
    }
    return true;
}

/**
 * 设置安全密码
 */
 function setSecurityPassword (callback) {
    var content = '<input type="password" name="pwd1" placeholder="' + window.top.message.passport_auto['输入安全密码'] + '" maxlength="6">'
        + '<input type="password" name="pwd2" placeholder="' + window.top.message.passport_auto['确认安全密码'] + '" maxlength="6">';

    layer.open({
        title: window.top.message.passport_auto['设置安全密码'],
        content: content,
        btn: [window.top.message.passport_auto['确定'], window.top.message.passport_auto['取消']],
        yes: function(index) {
            var pwd1 = $('[name="pwd1"]').val();
            var pwd2 = $('[name="pwd2"]').val();
            var isOk = checkSecurityPasswordForm(pwd1, pwd2);
            if (isOk) {
                saveSecurityPassword(pwd1, callback);
                layer.close(index);
            }
        }
    });

    inputNumber.init($('[name=pwd1]'), {negative: false, decimal: false, intSize: 6});
    inputNumber.init($('[name=pwd2]'), {negative: false, decimal: false, intSize: 6});
}
function checkSecurityPasswordForm (pwd1, pwd2) {
    var _this = this;
    var reg = /^[0-9]{6}$/;

    if (pwd1 == null || pwd1.trim().length == 0) {
        _this.toast(window.top.message.passport_auto['请输入安全密码']);
        $('[name=pwd1]').focus();
        return false;
    } else if (!reg.test(pwd1)) {
        _this.toast(window.top.message.passport_auto['安全密码长度2']);
        $('[name=pwd1]').focus();
        return false;
    } else if (_this.checkPasswordStrength(pwd1) == 'false') {
        _this.toast(window.top.message.passport_auto['安全密码过于简单']);
        $('[name=pwd1]').focus();
        return false;
    }

    if (pwd2 == null || pwd2.trim().length == 0) {
        _this.toast(window.top.message.passport_auto['请再次输入安全密码']);
        $('[name=pwd2]').focus();
        return false;
    } else if (pwd1 != pwd2) {
        _this.toast(window.top.message.passport_auto['两次密码不一致']);
        $('[name=pwd2]').focus();
        return false;
    }

    return true;
}
function saveSecurityPassword(pwd, callback) {
    mui.ajax(root + '/passport/securityPassword/saveSecurityPassword.html', {
        type: 'POST',
        data: {'pwd': pwd},
        beforeSend: function () {
            _this.disableBtn();
            window.top.pd.show();
        },
        success: function (data) {
            if (data) {
                $('#hasPass').val(true);
                window.top.pd.changeTip(window.top.message.passport_auto['设置成功']);
                setTimeout(function () {
                    window.top.pd.hide();
                    if(callback && callback instanceof Function) {
                        callback();
                    }
                }, 2000);
            } else {
                _this.toast(window.top.message.passport_auto['连接超时']);
            }
        },
        error: function () {
            window.top.pd.hide();
        },
        complete: function () {
            _this.enableBtn();
        }
    })
}