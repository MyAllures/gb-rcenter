/**
 * Created by fei on 16-10-15.
 */
mui.init({
    // swipeBack:true //启用右滑关闭功能
});
mui('.mui-scroll-wrapper').scroll();
/* post register */
mui(".mui-content").on("tap", "._register", function () {
    var $form = $('#regForm');

    /*if ($form.length === 1 ){
     var ruleText = $("#validateRules",$form).text();
     if (ruleText){
     var rule = eval("({" + $("#validateRules",$form).text() + "})");
     $form.validate(rule);
     }
     }*/

    if (!$form.valid()) {
        return false;
    }
    var data = $form.serialize();
    var $this = $(this);
    mui.ajax(root + '/signUp/save.html', {
        data: data,
        dataType: 'json',
        type: 'post',
        beforeSend: function () {
            $this.text(window.top.message.passport_auto['提交中']).attr("disabled", "disabled");
        },
        success: function (data) {
            if (data.state == false) {
                toast(data.msg);
                $this.text(window.top.message.passport_auto['确认']).removeAttr("disabled");
            } else {
                toast(data.msg);
                login();
            }
        },
        error: function (xhr, type, errorThrown) {
            $this.text(window.top.message.passport_auto['确认']).removeAttr("disabled");
        }
    });
}).on("tap", ".captcha_img", function () {
    var $this = $(this);
    $this.attr("src", $this.data("src") + "?_t" + Math.random())
}).on("change", ".termsOfServiceCheck", function () {
    var $this = $(this);
    if ($this.is(':checked')) {
        $("[name=termsOfService]").val("11");
    } else {
        $("[name=termsOfService]").val("");
    }
});

/**
 * 登陆
 */
function login() {
    var _username = $("[name='sysUser.username']").val();
    var _password = $("[name='sysUser.password']").val();
    os = whatOs();
    if (os == 'app_android') {
        var _href = _username + "," + _password;
        window.gamebox.gotoLogin(_href);
    } else if (os == 'app_ios') {
        //0表示是注册成功后调用方法实际上是未登录，需要ios那里直接调用登录
        loginSucc(_username, _password, 0);
    } else {
        mui.ajax({
            type: "POST",
            url: root + "/login/autoLogin.html",
            dataType: "json",
            data: {
                "username": _username,
                "password": _password
            },
            success: function (data) {
                sessionStorage.is_login = true;
                window.location.href = "/index.html";
                if(data != null){
                    if (data.success) {
                        sessionStorage.is_login = true;
                        window.location.href = "/index.html";
                    }
                    if (data.message) {
                        toast(message.passport[data.message] || data.message)
                    }
                    if (data.propMessages) {
                        if (data.propMessages["captcha"])
                            toast(data.propMessages["captcha"]);
                    }
                } else {
                    window.location.href = "/index.html";
                }
            },
            error: function () {
                toast(window.top.message.passport_auto['服务忙']);
            }
        });
    }

}

mui("body").on("tap", "[data-href]", function (e) {
    var $this = $(this);
    var _url = $this.data("href");
    if (_url && _url != "#") {
        newOpenWin(_url)
    }
});


/**
 * 发送邮箱验证码
 */
mui("body").on("tap", "#sendEmailCode", function (e) {
    var $email = $("[name='email.contactValue']");
    var obj = $("#sendEmailCode");
    var email = $email.val();
    if (!email) {
        toast('请输入email！');
    } else if ($email.valid()) {
        var locale = $("[name='sysUser.defaultLocale']").val();
        mui.ajax({
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
        })
    }
});

/**
 * 发送手机验证码
 */
mui("body").on("tap", "#sendPhoneCode", function (e) {
    var $phone = $("[name='phone.contactValue']");
    var obj = $("#sendPhoneCode");
    var phone = $phone.val();
    if (!phone) {
        toast(window.top.message.passport_auto['请输入手机号']);
    } else if ($phone.valid()) {
        mui.ajax({
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
        })
    }
});

mui("body").on("tap", ".mui-action-back", function () {
    goBack();
});

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

(function ($, doc) {
    $.init();
    $.ready(function () {
        /**
         * 性别
         */
        var sexButton = doc.getElementById('sexButton');
        if (sexButton) {
            mui.ajax(root + '/signUp/optionText.html?option=sex', {
                dataType: 'json',
                type: 'post',
                async: true,
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
                },
                error: function (xhr, type, errorThrown) {
                }
            });
        }

        /**
         * 主货币
         */
        var currencyButton = doc.getElementById('currencyButton');
        if (currencyButton) {
            mui.ajax(root + '/signUp/optionText.html?option=mainCurrency', {
                dataType: 'json',
                type: 'post',
                async: true,
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
                },
                error: function (xhr, type, errorThrown) {
                }
            });
        }

        /**
         * 主语言
         */
        var localeButton = doc.getElementById('localeButton');
        if (localeButton) {
            mui.ajax(root + '/signUp/optionText.html?option=defaultLocale', {
                dataType: 'json',
                type: 'post',
                async: true,
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
                },
                error: function (xhr, type, errorThrown) {
                }
            });
        }

        /**
         * 安全问题
         */
        var questionButton = doc.getElementById('questionButton');
        if (questionButton) {
            mui.ajax(root + '/signUp/optionText.html?option=securityIssues', {
                dataType: 'json',
                type: 'post',
                async: true,
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
                },
                error: function (xhr, type, errorThrown) {
                }
            });
        }

        /**
         * 生日
         */
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
    });
})(mui, document);

function newOpenWin(_url) {
    mui.openWindow({
        url: _url,
        id: _url,
        extras: {},
        createNew: false,
        show: {
            autoShow: true
        },

        waiting: {
            autoShow: true,
            title: window.top.message.passport_auto['正在加载'],
            options: {}
        }
    })
}

function whatOs() {
    var ua = navigator.userAgent;
    if (/(app_ios)/i.test(ua)) {
        return 'app_ios';
    } else if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
        return 'ios';
    } else if (/(app_android)/i.test(ua)) {
        return 'app_android';
    } else if (/(android)/i.test(ua)) {
        return 'android';
    } else {
        return 'pc';
    }
}
