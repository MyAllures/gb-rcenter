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
            var _this = this;

            _this.checkHasRealName();

            var $pwd1 = $('[name=pwd1]');
            var $pwd2 = $('[name=pwd2]');

            window.inputNumber.init($pwd1, {negative: false, decimal: false, initSize: 6});
            window.inputNumber.init($pwd2, {negative: false, decimal: false, initSize: 6});

            mui('.mine-page').on('tap', 'button.submit', function () {
                var pwd1 = $pwd1.val();
                var pwd2 = $pwd2.val();

                var isOk = window.top.page.security.checkSecurityPasswordForm(pwd1, pwd2);
                if (isOk) {
                    window.top.page.security.saveSecurityPassword(pwd1, function () {
                        _this.gotoUrl(root + '/mine/index.html');
                    });
                }
            })
        },

        checkHasRealName: function () {
            var _this = this;
            var hasName = $('[name=hasName]').val();
            if (hasName == 'false') {
                var content = '<input type="text" name="realName" maxlength="30" placeholder="' + window.top.message.passport_auto['请输入真实姓名'] + '"/>';
                layer.open({
                    title: window.top.message.passport_auto['设置真实姓名'],
                    content: content,
                    shadeClose: false,
                    btn: [window.top.message.passport_auto['确定'], ''],
                    yes: function (index) {
                        var realName = $('[name=realName]').val();

                        if (_this.checkRealNameForm(realName)) {
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
                        location.replace(root + '/mine/index.html');
                    }
                })
            }
        },

        checkRealNameForm: function (realName) {
            var isOk = false;
            var _this = this;
            if (realName == null || realName.trim().length == 0) {
                _this.toast(window.top.message.passport_auto['请输入真实姓名']);
            } else {
                var reg = /^(?!\d+$)^[a-zA-Z0-9\u4E00-\u9FA5\u0800-\u4e00\·]{2,30}$/;
                if (!reg.test(realName)) {
                    _this.toast(window.top.message.passport_auto['真实姓名长度']);
                } else {
                    isOk = true;
                }
            }
            return isOk;
        }
        
    });
});
