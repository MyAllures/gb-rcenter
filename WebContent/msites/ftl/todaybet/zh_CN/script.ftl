<#include "../../commonPage/zh_CN/script.ftl">
<script>
    /*全局变量：是否已经登录*/
    var isLogin = false;
    isOpenCaptcha = true;
    $(function () {
        init();
        userTime(true);
    });

    function init() {
        function onLogin() {
            if (sessionStorage.is_login != "true") {
                loginObj.getLoginPopup();
            }
        }

        textBlink($(".link-blink"), "#fa6200", "#0f3f94", 250);
    }

    function apiLogin(apiId, gameCode, apiTypeId,thiz) {
        sessionStorage.lottery_type = $(thiz).attr("data-lottery-type");
        sessionStorage.lottery_code = $(thiz).attr("data-lottery-code");
        //未登录的时候
        if (sessionStorage.is_login != "true") {
            if (apiId == "22") {
                window.location.href = "/lottery/hall/index.html";
            }
            return;
        }
        if (apiId) {
            var newWindow = window.open();
            newWindow.location = "/commonPage/gamePage/loading.html?apiId=" + apiId + "&apiTypeId=" + apiTypeId + "&gameCode=" + gameCode;
        }
    }
    /**
     * 登录后修改登录状态
     */
    function changeLoginStatus() {
        $.ajax({
            url: "/headerInfo.html?t=" + new Date().getTime().toString(36),
            type: "get",
            dataType: "JSON",
            beforeSend: function () {
                if (window.sessionStorage && (sessionStorage.is_login === "false" || typeof sessionStorage.is_login === "undefined")) {
                    $("._vr_unLogin").show();
                    sessionStorage.is_login = false;
                }
            },
            success: function (data) {

                /*已经登录*/
                if (data.isLogin) {
                    sessionStorage.is_login = true;
                    setCookie("isAutoPay", data.isAutoPay);
                    /*登录成功div jquery对象*/
                    var $loginSuccess = $("._vr_loginSuccess");
                    /*头部 登录成功内容*/
                    /*替换 昵称*/
                    $loginSuccess.find("._vr_nickname").text(data.nickname);
                    /*替换 未读消息数*/
                    $loginSuccess.find("._vr_messageCount").text(data.messageCount);
                    /*钱包余额*/
                    $loginSuccess.find("._vr_player_balance").text(data.playerBalance);
                    /*钱包余额*/
                    $loginSuccess.find("._vr_wallet_balance").text(data.walletBalance);
                    /* 玩家货币 */
                    /*$loginSuccess.find(".currency").text(data.currency);*/

                    /*显示登录成功内容*/
                    $loginSuccess.show();
                    $("._vr_unLogin").hide();
                    /*刷新钱包余额*/
                    $("._vr_player_balance").text(data.playerBalance);
                    $("._vr_wallet_balance").text(data.walletBalance);
                    changeBalanceHide();
                    if (window.sessionStorage) {
                        sessionStorage.is_login = true;
                    }
                } else {
                    /*强制踢出*/
                    if (data.isKickOut) {
                        BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_PRIMARY,
                            title: data.KickOutMessage.title,
                            message: data.KickOutMessage.message
                        });
                    }
                    /*未登录*/
                    $("._vr_unLogin").show();
                    if (window.sessionStorage) {
                        sessionStorage.is_login = "false";
                    }

                    /*显示验证码*/
                    isOpenCaptcha = true;
                    $("._vr_login", "._vr_unLogin").removeAttr("style");//判断个别情况永利登陆按钮取消样式
                    $("._vr_unLogin").each(function () {
                        var captchaObj = $(this).find('._vr_captcha_code');
                        $(captchaObj).attr("src", "${data.contextInfo.playerCenterContext}captcha/" + $(captchaObj).data("code") + ".html?t=" + new Date().getTime().toString(36));
                        $("._vr_captcha_box").show();
                    })
                }
            },
            error: function () {
            },
            complete: function () {
                /*重新绑定隐藏元素的事件*/
                openNewPopWindow();
            }

        });
    }

    /*显示验证码*/
    $(function () {
        $.ajax({
            url: "/passport/displayCaptcha.html",
            async:false,
            dataType: 'json',
            type: 'POST',
            success: function (data) {
            }
        })
    })
</script>