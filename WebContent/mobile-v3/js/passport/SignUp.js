//初始化
$(function () {
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-content.mui-scroll-wrapper'
    };
    muiInit(options);
    //加载验证码
    $("img.captcha_img").attr("src", $("img.captcha_img").attr("data-src") + "?t=" + random);
    //加载性别下拉
    sex();
    //加载货币下拉
    currency();
    //语言
    locale();
    //安全问题
    question();
    //生日
    birthday();
});

/**
 * 性别
 */
function sex() {
    var sexButton = doc.getElementById('sexButton');
    if (sexButton) {
        var options = {
            url: root + '/signUp/optionText.html?option=sex',
            success: function (data) {
                if (data) {
                    sexButton.addEventListener('tap', function (event) {
                        var sexPick = new $.PopPicker();
                        sexPick.setData(data);
                        sexPick.show(function (items) {
                            doc.getElementById("sysUser.sex").value = items[0].value;
                            sexButton.innerText = items[0].text;
                            sexPick.dispose();
                            sexPick = null;
                        });
                    }, false);
                }
            }
        };
        muiAjax(options);
    }
}

/**
 * 主货币
 */
function currency() {
    var currencyButton = doc.getElementById('currencyButton');
    if (currencyButton) {
        var options = {
            url: root + '/signUp/optionText.html?option=mainCurrency',
            success: function (data) {
                if (data) {
                    currencyButton.addEventListener('tap', function (event) {
                        var currencyPick = new $.PopPicker();
                        currencyPick.setData(data);
                        currencyPick.show(function (items) {
                            doc.getElementById('sysUser.defaultCurrency').value = items[0].value;
                            currencyButton.innerText = items[0].text;
                            currencyPick.dispose();
                            currencyPick = null;
                        });
                    }, false);
                }
            }
        };
        muiAjax(options);
    }
}

/**
 * 主语言
 */
function locale() {
    var localeButton = doc.getElementById('localeButton');
    if (localeButton) {
        var options = {
            url: root + '/signUp/optionText.html?option=defaultLocale',
            success: function (data) {
                if (data) {
                    localeButton.addEventListener('tap', function (event) {
                        var localePick = new $.PopPicker();
                        localePick.setData(data);
                        localePick.show(function (items) {
                            doc.getElementById("sysUser.defaultLocale").value = items[0].value;
                            localeButton.innerText = items[0].text;
                            localePick.dispose();
                            localePick = null;
                        });
                    }, false);
                }
            }
        };
        muiAjax(options);
    }
}

/**
 * 安全问题
 */
function question() {
    var questionButton = doc.getElementById('questionButton');
    if (questionButton) {
        var options = {
            url: root + '/signUp/optionText.html?option=securityIssues',
            success: function (data) {
                if (data) {
                    questionButton.addEventListener('tap', function (event) {
                        var questionPick = new $.PopPicker();
                        questionPick.setData(data);
                        questionPick.show(function (items) {
                            doc.getElementById("sysUserProtection.question1").value = items[0].value;
                            questionButton.innerText = items[0].text;
                            questionPick.dispose();
                            questionPick = null;
                        });
                    }, false);
                }
            }
        };
        muiAjax(options);
    }
}

/**
 * 生日
 */
function birthday() {
    var dateButton = doc.getElementById('dateButton');
    if (dateButton) {
        var optionsJson = dateButton.getAttribute('data-options') || '{}';
        var options = JSON.parse(optionsJson);
        dateButton.addEventListener('tap', function (event) {
            var datePick = new $.DtPicker(options);
            var id = this.getAttribute('id');
            datePick.show(function (rs) {
                dateButton.innerText = rs.text;
                doc.getElementById("sysUser.birthday").value = rs.text;
                datePick.dispose();
                datePick = null;
            });
        }, false);
    }
}

//请求验证码
function captchaImg(obj, options) {
    $(".captcha_img").attr("src", options.src + "?_t" + random);
}

//注册条款选项改变
function termsOfService() {
    if ($("[name=termsOfService]").is(':checked')) {
        $("[name=termsOfService]").val("");
    } else {
        $("[name=termsOfService]").val("11");
    }
}

//注册提交
function register(obj, options) {
    var $form = $('#regForm');
    if (!$form.valid()) {
        return;
    }
    var data = $form.serialize();
    options = {
        data: data,
        dataType: 'json',
        type: 'post',
        url: root + '/signUp/save.html',
        beforeSend: function () {
            $(obj).text(window.top.message.passport_auto['提交中']).attr("disabled", "disabled");
        },
        success: function (data) {
            if (data.state == false) {
                toast(data.msg);
            } else {
                toast(data.msg);
                autoLogin();
            }
        },
        complete: function () {
            $(obj).text(window.top.message.passport_auto['立即注册']).removeAttr("disabled");
        }
    };
    muiAjax(options);
}

/**
 * 登陆
 */
function autoLogin() {
    var _username = $("[name='sysUser.username']").val();
    var _password = $("[name='sysUser.password']").val();
    if (isNative) { //调用原生方法
        nativeAutoLogin();
    } else {
        var options = {
            type: "POST",
            url: root + "/login/autoLogin.html",
            dataType: "json",
            data: {
                "username": _username,
                "password": _password
            },
            success: function (data) {
                if (data != null) {
                    if (data.success) {
                        sessionStorage.is_login = true;
                        goToUrl("/mainIndex.html");
                    } else if (data.message) {
                        toast(message.passport[data.message] || data.message)
                    }
                } else {
                    sessionStorage.is_login = true;
                    goToUrl("/mainIndex.html");
                }
            }
        };
        muiAjax(options);
    }
}

//发送手机验证码
function sendPhoneCode() {
    var $phone = $("[name='phone.contactValue']");
    var obj = $("#sendPhoneCode");
    var phone = $phone.val();
    if (!phone) {
        toast(window.top.message.passport_auto['请输入手机号']);
        return;
    } else if ($phone.valid()) {
        var options = {
            type: "POST",
            url: root + "/verificationCode/getPhoneVerificationCode.html",
            dataType: "json",
            data: {"phone": phone},
            success: function (data) {
                if (data) {
                    var phoneInterval;
                    wait(60, obj, phoneInterval);
                }
            },
            error: function () {
                toast(window.top.message.passport_auto['服务忙']);
            }
        };
        muiAjax(options);
    }
}

//发送邮箱验证码
function sendEmailCode() {
    var $email = $("[name='email.contactValue']");
    var obj = $("#sendEmailCode");
    var email = $email.val();
    if (!email) {
        toast('请输入email！');
        return;
    } else if ($email.valid()) {
        var locale = $("[name='sysUser.defaultLocale']").val();
        var options = {
            type: "POST",
            url: root + "/signUp/checkEmail.html",
            dataType: "json",
            data: {"email": email, "locale": typeof locale === 'undefined' ? '' : locale},
            success: function (data) {
                if (data) {
                    var emailInterval;
                    wait(60, obj, emailInterval);
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