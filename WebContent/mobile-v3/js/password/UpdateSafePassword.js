var customerUrl;
var verifyCallBack;

/**
 * 修改安全码
 *mui监听事件点击直接触发:submitSafePassword()
 */
function submitSafePassword() {
    if (checkForm()) {
        /*mui.ajax(root + '/passport/securityPassword/updatePassword.html', {
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
         if (os == 'android') {
         window.gamebox.finish();
         } else if (os == 'app_ios') {
         goBack();
         } else {
         location.replace(root + '/mine/index.html');
         }
         }, 800);
         }
         },
         error: function () {
         window.top.pd.hide();
         }
         });*/

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
                            location.replace(root + '/mine/index.html');
                        }, 800);
                }
            }
        };
        muiAjax(options);
    }
}

function showCaptcha(data, tip) {
    $('[name=originPwd]').select();
    toast(tip);
    if (data.captcha) {
        $('._pass').removeClass('final');
        $('._captcha').removeClass('mui-hide');
        $('._times').text(data.times);
        $('[name=needCaptcha]').val(true);
    }
}

function freezeTip(data) {
    /*layer.open({
     title: window.top.message.passport_auto['提示'],
     content: '<b>' + window.top.message.passport_auto["已达上限"]
     + '</b><br/><span class="assist">' + window.top.message.passport_auto["冻结3小时"] + '<br/>'
     + window.top.message.passport_auto["冻结时间"] + '：' + data.force + '</span>',
     btn: [window.top.message.passport_auto['联系客服'], window.top.message.passport_auto['返回我的']],
     shadeClose: false,
     yes: function (index) {
     if (os == 'app_ios')
     gotoIndex(3);
     else
     location.replace(data.customer);
     },
     no: function (index) {
     if (os == 'android') {
     window.gamebox.finish();
     } else if (os == 'app_ios') {
     goBack();
     } else {
     location.replace(root + '/mine/index.html');
     }
     }
     });*/
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

    /*    yes: function () {

     },
     no: function (index) {


     }
     })
     }*/
}

function frezzYes() {
    location.replace(customerUrl);
}

function checkForm() {
    return checkRealName($('[name=realName]')) && checkOriginPwd()
        && checkNewPwd() && checkCaptcha();
}

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

    else if (checkPasswordStrength(pwd1) == 'false') {
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

function checkPasswordStrength(pwd1) {
    var isOk = false;
    /*mui.ajax(root + '/passport/securityPassword/checkPwdStrength.html', {
     type: 'POST',
     data: {'pwd': pwd1},
     async: false,
     success: function (data) {
     isOk = data;
     }
     });*/
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
 * 跳到个人信息界面
 */
function cancelRealName() {
    location.replace(root + '/mine/index.html');
}

/**
 * 异步添加名字
 */
function setRealName() {
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
    var hideCode = captcha ? 'mui-show' : 'mui-hide';
    var content = '<input type="password" id="perPwd" autofocus="" placeholder="'
        + window.top.message.passport_auto['请输入安全密码'] + '" maxlength="6">'
        + '<div class="pop_code ' + hideCode + '"><input type="text" id="perCode" class="code" placeholder="'
        + window.top.message.passport_auto['请输入验证码'] + '" maxlength="4">'
        + '<img class="code" src="' + root + '/captcha/privilege.html?t="' + new Date().getTime() + '></div>'
        + '<input type="hidden" name="needCaptcha" value="' + captcha + '">';

    var options = {
        confirm: content,
        title: window.top.message.passport_auto['安全密码'],
        btnArray: [window.top.message.passport_auto['确定'], window.top.message.passport_auto['取消']],
        func: verifySuccess
    };
    showConfirmMsg(options);

    inputNumber.init($('#perPwd'), {negative: false, decimal: false, intSize: 6});
    if (os == 'android') {
        $('img.code').css({'margin-top': '-1px'});
        var ua = navigator.userAgent;
        if (/(UCBrowser)/i.test(ua)) {
            // _this.toast('ucdd');
            $('img.code').css({'margin-top': '1px'});
        }
    }
    mui(".layermcont").on('tap', 'img.code', function (e) {
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
                } else if (state == '97') {
                    toast(window.top.message.passport_auto['验证码错误']);
                    $('#perCode').focus();
                    $('img.code').attr('src', genCode());
                    $('#perCode').val('').select();
                }
            }
        };
        muiAjax(options);
        /*mui.ajax(root + '/passport/securityPassword/verifySecurityPassword.html', {
         dataType: 'json',
         data: {'pwd': pwd, 'code': code},
         type: 'post',
         beforeSend: function () {
         _this.disableBtn();
         },
         success: function (data) {
         var state = data.state;
         var captcha = data.captcha;
         if (state == '100') {
         if (callback && callback instanceof Function) {
         callback();
         }
         layer.close(index);
         } else if (state == '99') {
         layer.close(index);
         _this.freezeTip(data);
         } else if (state == '98') {
         var times = data.times;
         $('#perPwd').focus();
         if (times > 3)
         _this.toast(window.top.message.passport_auto['密码错误1']);
         else
         _this.toast(window.top.message.passport_auto['密码错误2'].replace('{0}', times));

         $('#perPwd').val('').select();
         if (captcha) {
         $('.pop_code').removeClass('mui-hide').addClass('mui-show');
         $('[name=needCaptcha]').val(true);
         }
         } else if (state == '97') {
         _this.toast(window.top.message.passport_auto['验证码错误']);
         $('#perCode').focus();
         $('img.code').attr('src', _this.genCode());
         $('#perCode').val('').select();
         }
         },
         complete: function () {
         _this.enableBtn();
         }
         });*/
    }
}

function genCode() {
    return root + '/captcha/privilege.html';
}

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
    } else if (checkPasswordStrength(pwd1) == 'false') {
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
    /*mui.ajax(root + '/passport/securityPassword/checkPwdStrength.html', {
     type: 'POST',
     data: {'pwd': pwd1},
     async: false,
     success: function (data) {
     isOk = data;
     }
     });*/
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

function saveSecurityPassword(pwd) {
    var options = {
        url: root + '/passport/securityPassword/saveSecurityPassword.html',
        type: 'POST',
        data: {'pwd': pwd},
        success: function (data) {
            if (data) {
                $('#hasPass').val(true);
                toast(window.top.message.passport_auto['设置成功']);
                setTimeout(function () {
                    window.top.pd.hide();
                    /*if (callback && callback instanceof Function) {
                     callback();
                     }*/
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