/**
 * Created by fei on 16-10-15.
 */
define(['common/MobileBasePage'], function (Mobile) {
    return Mobile.extend({

        init: function () {
            this._super();
        },

        onPageLoad: function () {
            this._super();
            this.checkHasRealName();
            this.initInput();

            var _this = this;
            mui('.mui-content').on('tap', 'button.submit', function () {
                if (_this.checkForm()) {
                    mui.ajax(root + '/passport/securityPassword/updatePassword.html', {
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
                                    _this.toast(window.top.message.passport_auto['真实姓名错误']);
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
                                        if(os == 'android'){
                                            window.gamebox.finish();
                                        }else if(os == 'app_ios'){
                                            goBack();
                                        }else{
                                            location.replace(root + '/mine/index.html');
                                        }
                                    }, 800);
                            }
                        },
                        error: function () {
                            window.top.pd.hide();
                        }
                    });
                }
            })
        },

        showCaptcha: function (data, tip) {
            $('[name=originPwd]').select();
            this.toast(tip);
            if (data.captcha) {
                $('._pass').removeClass('final');
                $('._captcha').removeClass('mui-hide');
                $('._times').text(data.times);
                $('[name=needCaptcha]').val(true);
            }
        },

        initInput: function () {
            window.inputNumber.init($('[name=originPwd]'), {negative: false, decimal: false, initSize: 6});
            window.inputNumber.init($('[name=pwd1]'), {negative: false, decimal: false, initSize: 6});
            window.inputNumber.init($('[name=pwd2]'), {negative: false, decimal: false, initSize: 6});
        },

        checkForm: function () {
            return this.checkRealName($('[name=realName]')) && this.checkOriginPwd()
                && this.checkNewPwd() && this.checkCaptcha();
        },

        /** 检测真实姓名 */
        checkRealName: function ($ele) {
            var _this = this;
            var realName = $ele.val();

            if (realName == null || realName.trim().length == 0) {
                _this.toast(window.top.message.passport_auto['请输入真实姓名']);
                $ele.focus();
                return false;
            }

            var reg = /^(?!\d+$)^[a-zA-Z0-9\u4E00-\u9FA5\u0800-\u4e00\·]{2,30}$/;
            if (!reg.test(realName)) {
                _this.toast(window.top.message.passport_auto['真实姓名长度']);
                $ele.focus();
                return false;
            }
            return true;
        },

        /** 检测原姓名 */
        checkOriginPwd: function () {
            var _this = this;
            var $originPwd = $('[name=originPwd]');
            var originPwd = $originPwd.val();

            if (originPwd == null || originPwd.trim().length == 0) {
                _this.toast(window.top.message.passport_auto['请输入原密码']);
                $originPwd.focus();
                return false;
            }

            var reg = /^[0-9]{6}$/;
            if (!reg.test(originPwd)) {
                _this.toast(window.top.message.passport_auto['安全密码长度']);
                $originPwd.focus();
                return false;
            }
            return true;
        },

        /**
         * 验证新密码
         */
        checkNewPwd: function () {
            var _this = this;
            var $pwd1 = $('[name=pwd1]');
            var pwd1 = $pwd1.val();
            var reg = /^[0-9]{6}$/;
            var regNum = /^\d{6}$/;

            if (pwd1 == null || pwd1.trim().length == 0) {
                _this.toast(window.top.message.passport_auto['请输入新的安全密码']);
                $pwd1.focus();
                return false;
            } else if (!reg.test(pwd1)) {
                _this.toast(window.top.message.passport_auto['安全密码长度']);
                $pwd1.focus();
                return false;
            }else if (!regNum.test(pwd1)) {
                _this.toast(window.top.message.passport_auto['只能为数字']);
                $pwd1.focus();
                return false;
            }

            else if (window.top.page.security.checkPasswordStrength(pwd1) == 'false') {
                _this.toast(window.top.message.passport_auto['安全密码过于简单']);
                $pwd1.focus();
                return false;
            }

            var $pwd2 = $('[name=pwd2]');
            var pwd2 = $pwd2.val();

            if (pwd2 == null || pwd2.trim().length == 0) {
                _this.toast(window.top.message.passport_auto['请再次输入安全密码']);
                $pwd2.focus();
                return false;
            } else if (pwd1 != pwd2) {
                _this.toast(window.top.message.passport_auto['两次密码不一致']);
                $pwd2.focus();
                return false;
            }

            return true;
        },

        checkCaptcha: function () {
            var _this = this;

            var needCaptcha = $('[name=needCaptcha]').val();
            if (needCaptcha == 'false') {
                return true;
            }

            var $captcha = $('[name=code]');
            var captcha = $captcha.val();

            if (captcha == null || captcha.trim().length == 0) {
                _this.toast(window.top.message.passport_auto['请输入验证码']);
                $captcha.focus();
                return false;
            }

            return true;
        },

        freezeTip: function(data) {
            layer.open({
                title: window.top.message.passport_auto['提示'],
                content: '<b>' + window.top.message.passport_auto["已达上限"]
                    + '</b><br/><span class="assist">' + window.top.message.passport_auto["冻结3小时"] + '<br/>'
                    + window.top.message.passport_auto["冻结时间"] + '：' + data.force + '</span>',
                btn: [window.top.message.passport_auto['联系客服'], window.top.message.passport_auto['返回我的']],
                shadeClose: false,
                yes: function (index) {
                    if(os == 'app_ios')
                        gotoIndex(3);
                    else
                        location.replace(data.customer);
                },
                no: function (index) {
                    if(os == 'android'){
                        window.gamebox.finish();
                    }else if(os == 'app_ios'){
                        goBack();
                    }else {
                        location.replace(root + '/mine/index.html');
                    }
                }
            });
        },

        checkHasRealName: function () {
            var _this = this;
            var hasName = $('[name=hasName]').val();
            if (hasName == 'false') {
                var content = '<input type="text" name="popName" maxlength="30" placeholder="' + window.top.message.passport_auto['请输入真实姓名'] + '"/>';
                layer.open({
                    title: window.top.message.passport_auto['设置真实姓名'],
                    content: content,
                    shadeClose: false,
                    btn: [window.top.message.passport_auto['确定'], window.top.message.passport_auto['返回我的']],
                    yes: function (index) {
                        var $realName = $('[name=popName]');
                        var realName = $realName.val();

                        if (_this.checkRealName($realName)) {
                            mui.ajax(root + '/passport/securityPassword/setRealName.html', {
                                type: 'POST',
                                data: {'realName': realName},
                                success: function (data) {
                                    if (data == 'true') {
                                        $('[name=hasName]').val('true');
                                        layer.close(index);
                                    }
                                }
                            })
                        }
                    },
                    no: function (index) {
                        if(os == 'android'){
                            window.gamebox.finish();
                        }else if(os == 'app_ios'){
                            goBack();
                        }else {
                            location.replace(root + '/mine/index.html');
                        }
                    }
                })
            }
        }

    });
});
