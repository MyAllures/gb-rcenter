/**
 * Created by fei on 16-10-15.
 */
mui.init({});
mui("#offCanvasWrapper").on("tap", "._captcha_img", function (e) {
    var $this = $(this);
    var _src = $this.data("src");
    $this.attr("src", _src);
}).on("tap", "._login", function (e) {
    login();
});

function login() {
    var _username = $("#username").val();
    var _password = $("#password").val();
    var _captcha = $("#captcha").val();
    if(_username==""){
        $("#username-error-msg").text(window.top.message.passport_auto['用户名不能为空']);
        $("[name='username']").focus();
        return;
    }else{
        $("#username-error-msg").text("");
    }
    if(_password==""){
        $("#password-error-msg").text(window.top.message.passport_auto['密码不能为空']);
        $("[name='password']").focus();
        return;
    }else if(_password.length<6){
        $("#password-error-msg").text(window.top.message.passport_auto['密码不能少于６位']);
        $("[name='password']").focus();
        return;
    }else{
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
                    if(os == 'app_ios'){
                        loginSucc(_username,_password,1);
                    }else{
                        window.location.replace('/mainIndex.html');
                    }
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
                            toast(data.propMessages["captcha"]);
                        }
                    }
                    setTimeout(function () {
                        $this.text(window.top.message.passport_auto['登录']).removeAttr("disabled");
                    }, 1000);
                }
            },
            error: function (error) {
                var data = eval('(' + error.response + ')');
                if(data.propMessages){
                    $("#middlePopover").addClass("mui-active");
                }else{
                    toast(window.top.message.passport_auto['服务忙']);
                    setTimeout(function () {
                        $this.text(window.top.message.passport_auto['登录']).removeAttr("disabled");
                    }, 1000);
                }
            }
        })
    }
}

mui("body").on("tap", "[data-href]", function (e) {
    var $this = $(this);
    var _url = $this.data("href");
    if (_url && _url != "#") {
        newOpenWin(_url)
    }
});

mui("body").on("tap",".verify-name",function(){
    var realName = $("#result_realName").val();
    if(realName==''||realName==null){
        toast(window.top.message.passport_auto['用户名不能为空']);
        return;
    }
    var _username = $("#username").val();
    var _password = $("#password").val();
    $("#result_playerAccount").val(_username);
    $("#search_playerAccount").val(_username);
    $("#tempPass").val(_password);
    $("#newPassword").val(_password);
    $("._login").text(window.top.message.verify_auto['立即登录']).removeAttr("disabled");
    verify();
});

mui("body").on("tap",".verify-cancel",function(){
    closeVerify();
});


function closeVerify() {
    $("#middlePopover").removeClass("mui-active");
    $("#result_realName").val("");
    $("._login").text(window.top.message.verify_auto['立即登录']).removeAttr("disabled");
}
function verify() {
    $.ajax({
        url: '/passport/verify/verifyRealName.html',
        dataType: 'JSON',
        type: 'POST',
        async: false,
        data: $(".form-horizontal").serialize(),
        success: function (data) {
            // 验证真实姓名通过
            if (data.nameSame) {
                importPlayer()
            } else {
                toast(window.top.message.verify_auto['真实姓名与账号不匹配']);
            }
        },
        error: function (data) {
            toast("验证失败")
        }
    })
}

/** 提交并导入账号 */
function　importPlayer () {
    var _this = this;
    $.ajax({
        url: '/passport/verify/importOldPlayerNew.html',
        dataType: 'JSON',
        type: 'POST',
        data: $(".form-horizontal").serialize(),
        success: function (data) {
            if(data){
                login();
                closeVerify();
            }else {
                toast(window.top.message.newi18n['请稍后']);
            }
        },
        error: function (data) {
            toast(data);
        }
    })
}

mui("body").on("tap",".btn-demo",function(){
    layer.open({
        title: window.top.message.game_auto['提示'],
        content: window.top.message.game_auto['欢迎使用试玩模式'],
        btn: [window.top.message.game_auto['确定'], ''],
        yes: function (index) {
            layer.close(index);
            sessionStorage.is_login = true;
            sessionStorage.isLogin = true;
            sessionStorage.isDemo = true;
            if (os === 'app_ios') {
                demoEnter();
            } else {
                mui.ajax('/signUp/createFreeAccount.html', {
                    dataType: 'json',
                    success: function (data) {
                        if (data.status) {
                            var demoModel = data.demoModel;
                            sessionStorage.demoModel = demoModel;
                            window.location.replace('/mainIndex.html');
                        }
                    }
                })
            }
        }
    })
});

mui("body").on("tap","button.try",function(){
    layer.open({
        title: window.top.message.game_auto['提示'],
        content: window.top.message.game_auto['游客盘口只供试玩'],
        btn: [window.top.message.game_auto['确定'], ''],
        yes: function (index) {
            layer.close(index);
            sessionStorage.is_login = true;
             if (os === 'app_ios') {
                demoEnter();
             } else {
                 mui.ajax('/demo/lottery.html', {
                     dataType: 'json',
                     success: function (data) {
                         if (data) {
                             window.location.replace('/mainIndex.html');
                         }
                     }
                 })
             }
        }
    })
});

if(os == 'app_ios')
    mui("body").on("tap", ".mui-action-back", function () {
        goBack();
    });

function newOpenWin(_url) {
    mui.openWindow({
        url: _url,
        id: _url,
        extras: {
            aaaaa: "aaaaaa"
        },
        createNew: false,
        show: {
            autoShow: true,
        },
        waiting: {
            autoShow: true,
            title: window.top.message.passport_auto['正在加载'],
            options: {}
        }
    })
}