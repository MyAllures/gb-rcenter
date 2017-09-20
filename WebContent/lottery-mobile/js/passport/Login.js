/**
 * 手机彩票登录
 * */
define(['site/common/BasePage'], function (BasePage) {
    return BasePage.extend({
        init: function () {
            this.captchaCode();
            mui.init();
            this.bindButtonEvents();
        },
        /**
         * 初始化验证码图片
         */
        captchaCode: function () {
            var src = $("img._captcha_img").attr("data-src");
            src = src + "?t=" + random;
            $("img._captcha_img").attr("src", src);
        },
        bindButtonEvents: function () {
            var _this = this;
            mui(".mui-content").on("tap", "button#login", function () {
                var captcha = $("input#captcha").val();
                if ($("input#captcha").length > 0 && captcha) {
                    _this.toast("请输入验证码!");
                    return;
                }
                var username = $("input#username").val();
                var password = $("input#password").val();
                if (!username || !password) {
                    _this.toast("请输入账号或者密码!");
                    return;
                }
                var url = root + '/passport/login.html';
                mui.ajax(url, {
                    type: 'POST',
                    dataType: 'json',
                    data: $("form#login-form").serialize(),
                    success: function (data) {
                        if (data.success) {
                            _this.gotoUrl(root + '/mainIndex.html');
                        } else {
                            _this.toast('账号或密码错误!');
                            window.setTimeout(function () {
                                window.location.reload();
                            }, 1500);
                        }
                    }
                })

            });
        }
    })
});