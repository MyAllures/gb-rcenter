/**
 * Created by fei on 16-8-4.
 */
define(['common/MobileBasePage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        formSelector:'form',

        /*密码强度*/
        level1: new RegExp('^[a-zA-Z]+$'),/*单一形式字母*/
        level2: new RegExp('^[0-9]+$'),
        level3: new RegExp('^[0-9a-zA-Z]+$'),/*单一形式字母+数字*/
        level4: new RegExp('^[A-Za-z0-9~!@#$%^&*()_+\\{\\}\\[\\]|\\:;\'\"<>,./?]+$'),/*大小写字母+数字+字符*/

        init : function() {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            var _this = this;
            mui('body').on('tap', '.v-captcha', function () {
                _this.changeCode();
            });
            mui('body').on('tap', '._ok', function () {
                var $realName = $('[name="result.realName"]');
                var $pwd = $('[name=tempPass]');
                var $pwd2 = $('[name=newPassword]');
                var $captcha = $('[name=tempCapt]');
                if (_this.checkRealName($realName) && _this.checkPassword($pwd) && _this.checkPwd2($pwd, $pwd2) && _this.checkCaptcha($captcha)) {
                    _this._ok($realName, $pwd, $captcha);
                }
            });
            mui("body").on("tap", "[data-href]", function (e) {
                _this.gotoUrl($(this).data('href'));
            });
        },

        /** 检测真实姓名 */
        checkRealName: function ($ele) {
            var _this = this;
            var needRealName = $('[name=needRealName]').val();
            if (needRealName == 'no') return true;

            var realName = $ele.val();
            if (realName == null || realName.trim().length == 0) {
                _this.toast(window.top.message.verify_auto['请输入真实姓名']);
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
                _this.toast(window.top.message.verify_auto['请输入新密码']);
                $ele.focus();
                return false;
            } else {
                var reg = /^[A-Za-z0-9~!@#$%^&*()_+\{\}\[\]|\:;'"<>,./?]{6,20}$/;
                if (!reg.test(pwd)) {
                    _this.toast(window.top.message.verify_auto['密码长度']);
                    $ele.focus();
                    return false;
                }
            }
            return true;
        },
        /** 确认密码 */
        checkPwd2: function ($pwd1, $pwd2) {
            var _this = this;
            var pwd1 = $pwd1.val();
            var pwd2 = $pwd2.val();

            if (pwd2 == null || pwd2.trim().length == 0) {
                _this.toast(window.top.message.verify_auto['请再次输入新密码']);
                $pwd2.focus();
                return false;
            } else if (pwd1 != pwd2) {
                _this.toast(window.top.message.verify_auto['两次密码输入不一致']);
                $pwd2.focus();
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

        _ok: function ($realName, $pwd, $captcha) {
            var $ele = $('button._ok');
            $ele.attr('disabled', 'disabled').text(window.top.message.verify_auto['请稍后']);

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
                            _this.recoverOkBtn($ele);
                        } else {
                            _this._okService($realName, $pwd, $captcha, $ele);
                        }
                    }
                });
            } else {
                _this._okService($realName, $pwd, $captcha, $ele);
            }
        },

        _okService: function ($realName, $pwd, $captcha, $ele) {
            var _this = this;
            var level = _this.checkPassStrength($pwd) * 10;
            $('[name="passLevel"]').val(level);
            var playerId = $('[name="search.id"]').val();

            mui.ajax(root + '/passport/verify/checkRealName.html', {
                type: 'POST',
                data: $('form').serialize(),
                dataType: 'JSON',
                success: function (data) {
                    var d = eval('(' + data + ')');

                    if (d.nameSame) {
                        // 验证真实姓名通过
                        if (d.conflict) {
                            // 账号冲突
                            _this.gotoUrl('/passport/verify/setNewUsername.html?search.id=' + playerId + "&passLevel=" + level);
                        } else {
                            if (_this._checkPwdIsOk(d.weak, $pwd, $ele)) {
                                _this.importPlayer(playerId, $pwd, $captcha, $ele);
                            }
                        }
                    } else {
                        if (_this._checkPwdIsOk(d.weak, $pwd, $ele)) {
                            _this.toast(window.top.message.verify_auto['真实姓名与账号不匹配']);
                            $realName.val('').focus();
                            _this.showCaptcha();
                            _this.recoverOkBtn($ele);
                        }
                    }
                },
                error: function () {
                    _this.recoverOkBtn($ele);
                }
            });
        },

        _checkPwdIsOk: function (weak, $pwd, $ele) {
            var _this = this;
            if (!weak) {
                _this.toast(window.top.message.verify_auto['密码过于简单']);
                $pwd.val('').focus();
                _this.recoverOkBtn($ele);
                return false;
            } else {
                return true;
            }
        },

        importPlayer: function (playerId, pwd, captcha, $ele) {
            var _this = this;
            var username = $('[name="result.playerAccount"]').val();

            mui.ajax(root + '/passport/verify/importPlayer.html', {
                type: 'POST',
                data: $('form').serialize(),
                dataType: 'JSON',
                success: function (data) {
                    if (data) {
                        _this.gotoUrl(root + '/passport/verify/importSuccess.html?flag=1&search.id=' + playerId + '&search.playerAccount=' + username);
                    } else {
                        _this.toast(window.top.message.verify_auto['该账号已验证']);
                    }
                    _this.recoverOkBtn($ele);
                },
                error: function() {
                    _this.recoverOkBtn($ele);
                }
            });
        },

        recoverOkBtn: function ($ele) {
            $ele.text(window.top.message.verify_auto['确定']).removeAttr('disabled');
        },

        showCaptcha: function () {
            $('div._pass').removeClass('final');
            $('[name=needCaptcha]').val('yes');
            $('div.securityCode').addClass('final').show();
            $('[name=tempCapt]').val('');
        },

        /** 验证密码强度 */
        checkPassStrength :function($pwd) {
            var pwd = $pwd.val();
            var level = 0;
            if(this.level1.test(pwd) || this.level2.test(pwd)) {
                level = 1;
            } else if(this.level3.test(pwd)) {
                level = 2;
            } else if(this.level4.test(pwd)) {
                level = 3;
            }
            return level;
        },

        changeCode: function (e) {
            var timestamp = (new Date()).valueOf();
            var src = root + '/captcha/code.html?t=' + timestamp;
            $('.v-captcha').attr('src', src);
            e && $(e.currentTarget).unlock();
        }

    });
});
