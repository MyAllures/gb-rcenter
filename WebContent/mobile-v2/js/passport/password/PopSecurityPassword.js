/**
 * Created by bruce on 16-12-6.
 */
define(['common/MobileBasePage'], function (Mobile) {
    return Mobile.extend({
        init: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            this.initPage();
        },

        initPage: function () {
            var _this = this;
            mui('.gb-userinfo').on('tap', 'img.avatar', function () {
                var demo = $(this).data('demo');
                if (demo) {
                    _this.openLayer('试玩账号无权限访问');
                } else {
                    _this.checkSecurityPassword(function () {
                        _this.callback();
                    });
                }
            });
        },

        genCode: function () {
            return root + '/captcha/privilege.html';
        },

        /** 检测安全密码状态 */
        checkSecurityPassword: function (callback) {
            var _this = this;
            mui.ajax(root + '/passport/securityPassword/checkSecurityPassword.html', {
                type: 'POST',
                beforeSend: function () {
                    pd.show(window.top.message.passport_auto['请稍后...']);
                },
                success: function (data) {
                    pd.hide();
                    var d = eval('(' + data + ')');
                    var state = d.state;

                    switch (state) {
                        case "96":
                            _this.setSecurityPassword(callback);
                            break;
                        case "99":
                            _this.freezeTip(d);
                            break;
                        case "100":
                            if(callback && callback instanceof Function) {
                                callback();
                            }
                            break;
                        default:
                            _this.verifySecurityPassword(typeof d.captcha == 'undefined' ? false : d.captcha, callback);
                            break;
                    }
                },
                error: function () {
                    pd.hide();
                }
            });
        },

        callback: function () {
            this.gotoUrl(root + '/personalInfo/index.html');
        },

        freezeTip: function(data) {
            var _this = this;
            layer.open({
                title: window.top.message.passport_auto['提示'],
                content: '<b>' + window.top.message.passport_auto["已达上限"]
                        + '</b><br/><span class="assist">' + window.top.message.passport_auto["冻结3小时"]
                        + '<br/>' + window.top.message.passport_auto["冻结3小时"] + '：' + data.force + '</span>',
                btn: [window.top.message.passport_auto['联系客服'], window.top.message.passport_auto['取消']],
                yes: function (index) {
                    if(os == 'android'){
                        if (siteType === 'lottery') {

                        } else {
                            window.gamebox.gotoFragment('3');
                        }
                    }else if(os == 'app_ios'){
                        if (siteType === 'lottery') {
                            gotoGame(data.customer)
                        } else {
                            gotoIndex(3);
                        }
                    }else {
                        _this.gotoUrl(data.customer);
                    }
                    layer.close(index);
                }
            });
        },

        /**
         * 验证安全密码
         */
        verifySecurityPassword: function (captcha, callback) {
            var _this = this;
            var hideCode = captcha ? 'mui-show' : 'mui-hide';
            var content = '<input type="password" id="perPwd" autofocus="" placeholder="'
                + window.top.message.passport_auto['请输入安全密码'] + '" maxlength="6">'
                + '<div class="pop_code ' + hideCode + '"><input type="text" id="perCode" class="code" placeholder="'
                + window.top.message.passport_auto['请输入验证码'] + '" maxlength="4">'
                + '<img class="code" src="' + root + '/captcha/privilege.html?t="' + new Date().getTime() + '></div>'
                + '<input type="hidden" name="needCaptcha" value="' + captcha + '">';

            layer.open({
                title: window.top.message.passport_auto['安全密码'],
                content: content,
                btn: [window.top.message.passport_auto['确定'], window.top.message.passport_auto['取消']],
                yes: function(index) {
                    var pwd = $('#perPwd').val();
                    var code = $('#perCode').val();

                    if (_this.checkPasswordForm(pwd, code)) {
                        mui.ajax(root + '/passport/securityPassword/verifySecurityPassword.html', {
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
                                    if(callback && callback instanceof Function) {
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
                        });
                    }
                },
                no: function(index) {
                    layer.close(index);
                }
            });

            inputNumber.init($('#perPwd'), {negative: false, decimal: false, intSize: 6});

            if (_this.os == 'android') {
                $('img.code').css({'margin-top': '-1px'});
                var ua = navigator.userAgent;
                if (/(UCBrowser)/i.test(ua)) {
                    // _this.toast('ucdd');
                    $('img.code').css({'margin-top': '1px'});
                }
            }

            mui(".layermcont").on('tap', 'img.code', function (e) {
                $(this).attr('src', _this.genCode());
            });
        },

        disableBtn: function () {
            $('.layer-disable').show();
            $('.layermbtn').addClass('btn-disable');
        },
        enableBtn: function () {
            $('.layer-disable').hide();
            $('.layermbtn').removeClass('btn-disable');
        },

        checkPasswordForm: function (pwd, code) {
            var _this = this;
            if (pwd == null || pwd.trim().length == 0) {
                _this.toast(window.top.message.passport_auto['请输入安全密码']);
                $('#perPwd').focus();
                return false;
            } else if (pwd.trim().length < 6) {
                _this.toast(window.top.message.passport_auto['安全密码长度']);
                $('#perPwd').focus();
                return false;
            }

            var captcha = $('[name=needCaptcha]').val();
            if (captcha == 'true') {
                if (code == null || code.trim().length == 0) {
                    _this.toast(window.top.message.passport_auto['请输入验证码']);
                    $('#perCode').focus();
                    return false;
                } else if (code.trim().length < 4) {
                    _this.toast(window.top.message.passport_auto['请输入正确的验证码']);
                    $('#perCode').focus();
                    return false;
                }
            }
            return true;
        },

        /**
         * 设置安全密码
         */
        setSecurityPassword: function (callback) {
            var _this = this;
            var content = '<input type="password" name="pwd1" placeholder="' + window.top.message.passport_auto['输入安全密码'] + '" maxlength="6">'
                + '<input type="password" name="pwd2" placeholder="' + window.top.message.passport_auto['确认安全密码'] + '" maxlength="6">';

            layer.open({
                title: window.top.message.passport_auto['设置安全密码'],
                content: content,
                btn: [window.top.message.passport_auto['确定'], window.top.message.passport_auto['取消']],
                yes: function(index) {
                    var pwd1 = $('[name="pwd1"]').val();
                    var pwd2 = $('[name="pwd2"]').val();
                    var isOk = _this.checkSecurityPasswordForm(pwd1, pwd2);
                    if (isOk) {
                        _this.saveSecurityPassword(pwd1, callback);
                        layer.close(index);
                    }
                }
            });

            inputNumber.init($('[name=pwd1]'), {negative: false, decimal: false, intSize: 6});
            inputNumber.init($('[name=pwd2]'), {negative: false, decimal: false, intSize: 6});
        },

        checkSecurityPasswordForm: function (pwd1, pwd2) {
            var _this = this;
            var reg = /^[0-9]{6}$/;

            if (pwd1 == null || pwd1.trim().length == 0) {
                _this.toast(window.top.message.passport_auto['请输入安全密码']);
                $('[name=pwd1]').focus();
                return false;
            } else if (!reg.test(pwd1)) {
                _this.toast(window.top.message.passport_auto['安全密码长度2']);
                $('[name=pwd1]').focus();
                return false;
            } else if (_this.checkPasswordStrength(pwd1) == 'false') {
                _this.toast(window.top.message.passport_auto['安全密码过于简单']);
                $('[name=pwd1]').focus();
                return false;
            }

            if (pwd2 == null || pwd2.trim().length == 0) {
                _this.toast(window.top.message.passport_auto['请再次输入安全密码']);
                $('[name=pwd2]').focus();
                return false;
            } else if (pwd1 != pwd2) {
                _this.toast(window.top.message.passport_auto['两次密码不一致']);
                $('[name=pwd2]').focus();
                return false;
            }

            return true;
        },

        checkPasswordStrength: function (pwd1) {
            var isOk = false;
            mui.ajax(root + '/passport/securityPassword/checkPwdStrength.html', {
                type: 'POST',
                data: {'pwd': pwd1},
                async: false,
                success: function (data) {
                    isOk = data;
                }
            });
            return isOk;
        },

        saveSecurityPassword: function (pwd, callback) {
            var _this = this;
            mui.ajax(root + '/passport/securityPassword/saveSecurityPassword.html', {
                type: 'POST',
                data: {'pwd': pwd},
                beforeSend: function () {
                    _this.disableBtn();
                    window.top.pd.show();
                },
                success: function (data) {
                    if (data) {
                        $('#hasPass').val(true);
                        window.top.pd.changeTip(window.top.message.passport_auto['设置成功']);
                        setTimeout(function () {
                            window.top.pd.hide();
                            if(callback && callback instanceof Function) {
                                callback();
                            }
                        }, 2000);
                    } else {
                        _this.toast(window.top.message.passport_auto['连接超时']);
                    }
                },
                error: function () {
                    window.top.pd.hide();
                },
                complete: function () {
                    _this.enableBtn();
                }
            })
        }
    })
});