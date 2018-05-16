//初始化
$(function () {
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-content.mui-scroll-wrapper'
    };
    muiInit(options);
});

/**
 * 请求验证码
 * @param obj
 * @param options
 */
function captchaChange(obj, options) {
    obj.src = obj.src;
}

/**
 * 立即登录
 */
function loginOk(obj, options) {
    var _username = $("#username").val();
    var _password = $("#password").val();
    var _captcha = $("#captcha").val();
    if (_username == "") {
        $("#username-error-msg").html('<i class="icon-warn">!</i>' + window.top.message.passport_auto['用户名不能为空']);
        $("[name='username']").focus();
        return;
    } else {
        $("#username-error-msg").html("");
    }
    if (_password == "") {
        $("#password-error-msg").html('<i class="icon-warn">!</i>' + window.top.message.passport_auto['密码不能为空']);
        $("[name='password']").focus();
        return;
    } else if (_password.length < 6) {
        $("#password-error-msg").html('<i class="icon-warn">!</i>' + window.top.message.passport_auto['密码不能少于６位']);
        $("[name='password']").focus();
        return;
    } else {
        $("#password-error-msg").text("");
    }
    $("#loginForm").submit();
    var $this = $(this);
    if (_username && _password) {
        mui.ajax(root + "/passport/login.html", {
            type: "POST",
            async: false,
            dataType: "json",
            data: {
                "username": _username,
                "password": _password,
                "captcha": _captcha
            },
            beforeSend: function () {
                $this.text(window.top.message.passport_auto['登录中']).attr("disabled", "disabled");
            },
            success: function (data) {
                if (data.success) {
                    sessionStorage.is_login = true;
                    sessionStorage.isDemo = false;
                    var url = sessionStorage.getItem(LOGIN_TARGET_URL);
                    if (!url || url == 'null' || url.indexOf("mine/index.html") > 0) {
                        url = root + '/mainIndex.html';
                    }
                    sessionStorage.removeItem(LOGIN_TARGET_URL);
                    goToUrl(url);
                } else {
                    if (data.isOpenCaptcha) {
                        mui("#captcha_div")[0].style.display = "block";
                    }
                    if (data.message) {
                        //data.message("用户名或密码错误");
                        data.message = "用户名或密码错误";
                        toast(message.passport[data.message] || data.message);
                    }
                    if (data.propMessages) {
                        if (data.propMessages["captcha"]) {
                            $('._pass').removeClass('final');
                            $('._captcha').addClass('final');
                            $("#captcha-error-msg").html('<i class="icon-warn">!</i>' + data.propMessages["captcha"]);
                        } else {
                            $("#captcha-error-msg").html("");
                        }
                    }
                    setTimeout(function () {
                        $this.text(window.top.message.passport_auto['登录']).removeAttr("disabled");
                    }, 1000);
                }
            },
            error: function (error) {
                var data = eval('(' + error.response + ')');
                if (data.propMessages) {
                    $("#middlePopover").addClass("mui-active");
                } else {
                    toast(window.top.message.passport_auto['服务忙']);
                    setTimeout(function () {
                        $this.text(window.top.message.passport_auto['登录']).removeAttr("disabled");
                    }, 1000);
                }
            }
        })
    }
}