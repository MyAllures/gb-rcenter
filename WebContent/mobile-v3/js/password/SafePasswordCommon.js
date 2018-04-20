var customerUrl;
var verifyCallBack;


/*初始化安全密码样式*/
function initInput() {
    window.inputNumber.init($('[name=originPwd]'), {negative: false, decimal: false, initSize: 6});
    window.inputNumber.init($('[name=pwd1]'), {negative: false, decimal: false, initSize: 6});
    window.inputNumber.init($('[name=pwd2]'), {negative: false, decimal: false, initSize: 6});
}

function freezeTip(data, obj) {
    var options = {
        title: window.top.message.passport_auto['提示'],
        content: '<b>' + window.top.message.passport_auto["已达上限"]
        + '</b><br/><span class="assist">' + window.top.message.passport_auto["冻结3小时"] + '<br/>'
        + window.top.message.passport_auto["冻结时间"] + '：' + data.force + '</span>',
        btn: [window.top.message.passport_auto['联系客服'], window.top.message.passport_auto['返回我的']],
        func: frezzYes,
        cancelFunc: cancelRealName //cancelFunc代表点取消做的操作
    };
    showConfirmMsg(options, obj);

}

/**
 * 跳到个人信息界面
 */
function cancelRealName() {
    goToUrl(root + '/mine/index.html');
}

function frezzYes() {
    goToUrl(customerUrl);
}

/**
 * 效验输入名字是否规范
 * @param realName
 * @returns {boolean}
 */
function checkRealNameForm(realName) {
    var isOk = false;
    if (realName == null || realName.trim().length == 0) {
        toast(window.top.message.passport_auto['请输入真实姓名']);
    } else {
        var reg = /^(?!\d+$)^[a-zA-Z0-9\u4E00-\u9FA5\u0800-\u4e00\·]{2,30}$/;
        if (!reg.test(realName)) {
            toast(window.top.message.passport_auto['真实姓名长度']);
        } else {
            isOk = true;
        }
    }
    return isOk;
}

/**
 * 判断是否存在真实姓名
 */
function checkHasRealName(obj) {
    var hasName = $('[name=hasName]').val();
    if (hasName == 'false') {
        var content = '<input type="text" name="realName" maxlength="30" placeholder="' + window.top.message.passport_auto['请输入真实姓名'] + '"/>';

        var options = {//创建一个div
            confirm: content,
            title: window.top.message.passport_auto['设置真实姓名'],
            btnArray: [window.top.message.passport_auto['确定'], '取消'],
            func: setRealName,
            cancelFunc: cancelRealName //cancelFunc代表点取消做的操作
        };
        showConfirmMsg(options, obj);
    }
}

/**
 * 异步添加名字
 */
function setRealName() {
    var realName = $('[name=realName]');
    if (checkRealName(realName)) {
        var options = {
            url: root + '/passport/securityPassword/setRealName.html',
            type: 'POST',
            data: {'realName': realName.val()},
            dataType: 'json',
            success: function (data) {
                if (data == 'true') {
                    $('[name=hasName]').val('true');
                    /*layer.close(index);*/
                }
            }
        };
        muiAjax(options);
    } else {
        return false;
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
function setSecurityPassword(callback, obj) {
    var content = '<input type="password" name="pwd1" placeholder="' + window.top.message.passport_auto['输入安全密码'] + '" maxlength="6">'
        + '<input type="password" name="pwd2" placeholder="' + window.top.message.passport_auto['确认安全密码'] + '" maxlength="6">';

    var options = {//创建一个div
        title: window.top.message.passport_auto['设置安全密码'],
        confirm: content,
        btnArray: [window.top.message.passport_auto['确定'], window.top.message.passport_auto['取消']],
        func: securityCode,
        cancelFunc: cancelRealName //cancelFunc代表点取消做的操作
    };
    showConfirmMsg(options, obj);

    inputNumber.init($('[name=pwd1]'), {negative: false, decimal: false, intSize: 6});
    inputNumber.init($('[name=pwd2]'), {negative: false, decimal: false, intSize: 6});
}

/*异步添加安全码*/
function securityCode() {
    var pwd1 = $('[name="pwd1"]').val();
    var pwd2 = $('[name="pwd2"]').val();
    var isOk = checkSecurityPasswordForm(pwd1, pwd2);
    if (isOk) {
        saveSecurityPassword(pwd1);
        /*layer.close(index);*/
    }
}

/**
 * 验证安全密码
 */
function verifySecurityPassword(captcha, callback) {
    verifyCallBack = callback;
    //var hideCode = captcha ? 'mui-show' : 'mui-hide';
    var hideCode = captcha ? 'mui-show' : 'display:none';
    var content = '<input type="password" id="perPwd" autofocus="" placeholder="'
        + window.top.message.passport_auto['请输入安全密码'] + '" maxlength="6">'
        + '<div class="pop_code" style="' + hideCode + '"><input type="text" id="perCode" class="code" placeholder="'
        + window.top.message.passport_auto['请输入验证码'] + '" maxlength="4">'
        + '<img class="code" src="' + root + '/captcha/privilege.html?t=' + new Date().getTime() + '"></div>'
        + '<input type="hidden" name="needCaptcha" value="' + captcha + '">';

    var options = {
        confirm: content,
        title: window.top.message.passport_auto['安全密码'],
        btnArray: [window.top.message.passport_auto['确定'], window.top.message.passport_auto['取消']],
        func: verifySuccess
    };
    showConfirmMsg(options);

    inputNumber.init($('#perPwd'), {negative: false, decimal: false, intSize: 6});
    $("#perCode").css({'width': '154px', 'margin': '0px 1px 0px -5px', 'padding': '0px 9px'});
    $('img.code').css({'margin': '-15px -18px -10px 0px', 'width': '95px', 'height': '40px'});

    mui(".pop_code").on('tap', 'img.code', function (e) {
        $(this).attr('src', genCode());
    });
}

function checkPasswordForm(pwd, code) {
    if (pwd == null || pwd.trim().length == 0) {
        toast(window.top.message.passport_auto['请输入安全密码']);
        $('#perPwd').focus();
        return false;
    } else if (pwd.trim().length < 6) {
        toast(window.top.message.passport_auto['安全密码长度']);
        $('#perPwd').focus();
        return false;
    }

    var captcha = $('[name=needCaptcha]').val();
    if (captcha == 'true') {
        if (code == null || code.trim().length == 0) {
            toast(window.top.message.passport_auto['请输入验证码']);
            $('#perCode').focus();
            return false;
        } else if (code.trim().length < 4) {
            toast(window.top.message.passport_auto['请输入正确的验证码']);
            $('#perCode').focus();
            return false;
        }
    }
    return true;
}

function verifySuccess(callback) {
    callback = verifyCallBack;
    var pwd = $('#perPwd').val();
    var code = $('#perCode').val();

    var result;
    if (checkPasswordForm(pwd, code)) {
        var options = {
            url: root + '/passport/securityPassword/verifySecurityPassword.html',
            dataType: 'json',
            data: {'pwd': pwd, 'code': code},
            type: 'post',
            success: function (data) {
                var state = data.state;
                var captcha = data.captcha;
                if (state == '100') {
                    if (callback && callback instanceof Function) {
                        callback();
                    }
                    //layer.close(index);
                } else if (state == '99') {
                    //layer.close(index);
                    freezeTip(data);
                } else if (state == '98') {
                    var times = data.times;
                    $('#perPwd').focus();
                    if (times > 3) {
                        toast(window.top.message.passport_auto['密码错误1']);
                    }
                    else {
                        toast(window.top.message.passport_auto['密码错误2'].replace('{0}', times));
                    }
                    $('#perPwd').val('').select();
                    if (captcha) {
                        $('.pop_code').removeClass('mui-hide').addClass('mui-show');
                        $('[name=needCaptcha]').val(true);
                    }
                    result = false;
                } else if (state == '97') {
                    toast(window.top.message.passport_auto['验证码错误']);
                    $('#perCode').focus();
                    $('img.code').attr('src', genCode());
                    $('#perCode').val('').select();
                    result = false;
                }
            }
        };
        muiAjax(options);
    } else {
        result = false;
    }
    return result;
}

function genCode() {
    return root + '/captcha/privilege.html';
}

/*效验提交安全码*/
function checkSecurityPasswordForm(pwd1, pwd2) {
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
}
/**
 * 判断安全密码复杂度
 * @param pwd1
 * @returns {boolean}
 */
function checkPasswordStrength(pwd1) {
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
    return isOk;
}

/*设置安全码，并返回到个人页面*/
function saveSecurityPassword(pwd, callback) {
    var options = {
        url: root + '/passport/securityPassword/saveSecurityPassword.html',
        type: 'POST',
        data: {'pwd': pwd},
        success: function (data) {
            if (data) {
                $('#hasPass').val(true);
                toast(window.top.message.passport_auto['设置成功']);
                setTimeout(function () {
                    if (callback && callback instanceof Function) {
                        callback();
                    }
                }, 2000);
            } else {
                toast(window.top.message.passport_auto['连接超时']);
            }
        }
    };
    muiAjax(options);
}

/** 检测安全密码状态 */
function checkSecurityPassword(callback) {
    var options = {
        url: root + '/passport/securityPassword/checkSecurityPassword.html',
        type: 'POST',
        success: function (data) {
            var d = eval('(' + JSON.stringify(data) + ')');
            var state = d.state;
            switch (state) {
                case "96":
                    setSecurityPassword(callback);
                    break;
                case "99":
                    freezeTip(d);
                    break;
                case "100":
                    if (callback && callback instanceof Function) {
                        callback();
                    }
                    break;
                default:
                    verifySecurityPassword(typeof d.captcha == 'undefined' ? false : d.captcha, callback);
                    break;
            }
        }
    };
    muiAjax(options);
}