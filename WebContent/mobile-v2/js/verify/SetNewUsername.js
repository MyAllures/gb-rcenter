/**
 * Created by fei on 16-8-5.
 */
define(['common/MobileBasePage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        formSelector: 'form#subForm',

        init : function() {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            var _this = this;
            mui("body").on("tap", "[data-href]", function (e) {
                _this.gotoUrl($(this).data('href'));
            });

            mui('body').on('tap', '._sub', function () {
                var $account = $('[name="result.playerAccount"]');
                if (_this.checkAccount($account)) {
                    _this.handleImport($account);
                }
            })
        },

        /** 检测用户名 */
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

        /** 提交并导入账号 */
        handleImport: function ($account) {
            var _this = this;
            var $btn = $('button._sub');
            var account = $account.val();
            var id = $('[name="search.id"]').val();

            $btn.attr('disabled', 'disabled').text(window.top.message.verify_auto['请稍后']);

            mui.ajax(root + '/passport/verify/isUsernameExist.html', {
                type: 'POST',
                data: {'result.playerAccount': account},
                success: function (data) {
                    if (data == 'true') {
                        _this.importPlayer(account, $btn)
                    } else {
                        _this.toast(window.top.message.verify_auto['账号已存在']);
                        _this.recoverSubBtn($btn);
                    }
                }
            });
        },

        importPlayer: function (account, $btn) {
            var _this = this;
            var id = $('[name="search.id"]').val();
            mui.ajax(root + '/passport/verify/importPlayer.html', {
                dataType: 'JSON',
                type: 'POST',
                data: $(this.formSelector).serialize(),
                success: function (data) {
                    if (data) {
                        _this.gotoUrl(root + '/passport/verify/importSuccess.html?flag=1&search.id=' + id + '&search.playerAccount=' + account);
                    } else {
                        _this.toast(window.top.message.verify_auto['该账号已验证']);
                    }
                    _this.recoverSubBtn($btn);
                },
                error: function() {
                    _this.recoverSubBtn($btn);
                }
            })
        },

        recoverSubBtn: function ($btn) {
            $btn.removeAttr('disabled').text(window.top.message.verify_auto['确定']);
        }

    });
});
