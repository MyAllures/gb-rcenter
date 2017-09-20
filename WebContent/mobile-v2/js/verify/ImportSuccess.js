/**
 * Created by fei on 16-8-5.
 */
define(['common/MobileBasePage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        formSelector: 'form',

        init : function() {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            var _this = this;
            _this.beforeLogin();
            mui("body").on("tap", "._know", function () {
                _this.gotoUrl('/');
            });
        },

        /** 验证成功后登录 */
        beforeLogin: function () {
            var _this = this;
            var $form = $('form#loginForm');

            mui.ajax(root + '/passport/verify/getLoginInfo.html', {
                type: "POST",
                data: $form.serialize(),
                dataType: "JSON",
                success: function (data) {
                    var d = eval('(' + data + ')');
                    $('[name=password]', $form).val(d.pass);
                    $('[name=captcha]', $form).val(d.code);
                    _this.login($form);
                }
            })
        },

        login: function ($form) {
            if ($('[name=username]', $form).val().trim() && $('[name=password]', $form).val().trim()) {
                mui.ajax(root + '/passport/login.html', {
                    type: "POST",
                    data: $form.serialize(),
                    dataType: "JSON",
                    success: function (data) {
                        console.log('Log in ' + data.success);
                    }
                })
            }
        }
    });
});
