/**
 * Created by fei on 16-8-4.
 */
define(['common/MobileBasePage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        formSelector:'form',

        init : function() {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            var _this = this;
            mui('body').on('tap', '.v-captcha', function () {
                _this.changeCode();
            });
            mui('body').on('tap', '._login', function () {
                var $account = $('[name="search.playerAccount"]');
                var $pwd = $('[name=tempPass]');
                var $captcha = $('[name=tempCapt]');
                if (_this.checkAccount($account) && _this.checkPassword($pwd) && _this.checkCaptcha($captcha)) {
                    _this.login($account, $pwd, $captcha);
                }
            });
            mui("body").on("tap", "[data-href]", function (e) {
                var href = $(this).data('href');
                if(href == '/' && os =='app_ios'){
                    gotoIndex(0);
                }else if(href == '/' && os == 'android'){
                    window.gamebox.finish();
                }else {
                    _this.gotoUrl(href);
                }
            });
        },

        /** 检测账号 */
        checkAccount: function ($ele) {
            var _this = this;
            var account = $ele.val();

            if (account == null || account.trim().length == 0) {
                _this.toast(window.top.message.verify_auto['请输入玩家账号']);
                $ele.focus();
                return false;
            }
            return true;
        },
        /** 检测密码 */
        checkPassword: function ($ele) {
            var _this = this;
            var pwd = $ele.val();

            if (pwd == null || pwd.trim().length == 0) {
                _this.toast(window.top.message.verify_auto['请输入账号密码']);
                $ele.focus();
                return false;
            }
            return true;
        },
        /** 检测验证码 */
        checkCaptcha: function ($ele) {
            if ($('[name=needCaptcha]').val() == 'no') {
                return true;
            }

            var _this = this;
            var captcha = $ele.val();

            if (captcha == null || captcha.trim().length == 0) {
                _this.toast(window.top.message.verify_auto['请输入验证码']);
                $ele.focus();
                return false;
            }
            return true;
        },

        login: function ($account, $pwd, $captcha) {
            var $ele = $('button._login');
            $ele.attr('disabled', 'disabled').text(window.top.message.verify_auto['登录中']);
            var _this = this;

            if ($('[name=needCaptcha]').val() == 'yes') {
                var captcha = $captcha.val();
                $.ajax({
                    url: root + '/passport/verify/checkCaptchaCode.html',
                    type: 'POST',
                    data: {'tempCapt': captcha},
                    async: false,
                    success: function (data) {
                        if (data == 'false') {
                            _this.toast(window.top.message.verify_auto['验证码错误']);
                            $captcha.focus();
                            _this.recoverLoginBtn($ele);
                        } else {
                            _this.loginService($account, $pwd, $captcha, $ele);
                        }
                    }
                });
            } else {
                _this.loginService($account, $pwd, $captcha, $ele);
            }
        },

        loginService: function ($account, $pwd, $captcha, $ele) {
            var _this = this;
            mui.ajax(root + '/passport/verify/login.html', {
                type: 'POST',
                data: $('form#vForm').serialize(),
                dataType: 'JSON',
                success: function (data) {
                    var d = eval('(' + data + ')');
                    if (d.redirect) {
                        $('[name=username]').val($account.val());
                        $('[name=password]').val($pwd.val());
                        $('[name=captcha]').val($captcha.val());
                        _this.siteLogin();
                        return false;
                    }
                    if (d.exist) {
                        _this.recoverLoginBtn($ele);
                        if(d.repeat) {
                            _this.toast(window.top.message.verify_auto['多个相同玩家账号']);
                        } else {
                            _this.gotoUrl(root + '/passport/verify/toCheckRealName.html?search.id=' + d.id);
                        }
                    } else {
                        _this.recoverLoginBtn($ele);
                        _this.showCaptcha();
                        if (d.flag == 1) {
                            layer.open({
                                title: window.top.message.verify_auto['提示'],
                                content: window.top.message.verify_auto['账户不存在'],
                                btn: [window.top.message.verify_auto['重新输入'], window.top.message.verify_auto['联系客服']],
                                yes: function (index) {
                                    layer.close(index);
                                    $account.focus();
                                },
                                no: function () {
                                    _this.gotoUrl($('[name=customer]').val());
                                }
                            })
                        } else if (d.flag == 2) {
                            _this.toast(window.top.message.verify_auto['账号或密码错误']);
                            _this.showCaptcha();
                        }
                    }
                }
            });
        },

        recoverLoginBtn: function ($ele) {
            $ele.text(window.top.message.verify_auto['立即登录']).removeAttr('disabled');
        },

        showCaptcha: function () {
            $('div._pass').removeClass('final');
            $('[name=needCaptcha]').val('yes');
            $('div.securityCode').addClass('final').show();
            $('[name=tempCapt]').val('');
        },

        siteLogin: function ($ele) {
            var _this = this;
            var $form = $('form#loginForm');
            if ($('[name=username]', $form).val().trim() && $('[name=password]', $form).val().trim()) {
                mui.ajax(root + "/passport/login.html", {
                    type: "POST",
                    dataType: "json",
                    data: $form.serialize(),
                    success: function (data) {
                        if (data.success) {
                            sessionStorage.is_login = true;
                            window.location.href = '/';
                        } else {
                            if (data.message) {
                                _this.toast(message.passport[data.message] || data.message);
                            }
                            _this.recoverLoginBtn($ele);
                        }
                    },
                    error: function () {
                        _this.recoverLoginBtn($ele);
                    }
                });
            } else {
                _this.recoverLoginBtn($ele);
            }
        },

        changeCode: function (e) {
            var timestamp = (new Date()).valueOf();
            var src = root + '/captcha/code.html?t=' + timestamp;
            $('.v-captcha').attr('src', src);
            e && $(e.currentTarget).unlock();
        }

    });
});
