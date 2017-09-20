/**
 * Created by fei on 16-8-5.
 */
define(['common/BaseEditPage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        formSelector: 'form',

        init : function() {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            $('#sub input').keydown(function (e) {
                if (e.which == 13)
                    $('a._sub').trigger('click');
            });
            var $account = $('[name="result.playerAccount"]');
            $account.focus();
            $account.bind('input propertychange', function(){
                $('[name=username]').val($(this).val());
            });
        },
        bindEvent: function () {
            this._super();
        },

        /** 提交并导入账号 */
        importPlayer: function (e, option) {
            var _this = this;
            $('a._sub i').addClass('fa-circle-o-notch fa-spin');
            $('a._sub span').text(window.top.message.newi18n['请稍后']);
            $('#pw').val($('#ppw', parent.document).val());
            $('#pl').val($('#ppl', parent.document).val());
            var id = $('[name="search.id"]').val();
            var username = $('[name="result.playerAccount"]').val();
            var top = window.top.topPage;
            top.ajax({
                url: root + '/passport/verify/importPlayer.html',
                dataType: 'JSON',
                type: 'POST',
                data: $(this.formSelector).serialize(),
                success: function (data) {
                    if (data) {
                        top.closeDialog();
                        option.closable = 'false';
                        option.target = root + '/passport/verify/importSuccess.html?flag=1&search.id=' + id + '&search.playerAccount=' + username;
                        option.text = window.top.message.newi18n['验证提醒'];
                        top.doDialog(e, option);
                    } else {
                        top.showWarningMessage(window.top.message.newi18n['该账号已验证']);
                        _this.recoverSubmitBtn(e);
                    }
                },
                error: function(data) {
                    _this.recoverSubmitBtn(e);
                }
            })
        },

        recoverSubmitBtn: function (e) {
            $('a._sub i').removeClass('fa-circle-o-notch fa-spin');
            $('a._sub span').text(window.top.message.newi18n['确定']);
            $(e.currentTarget).unlock();
        },

        validateForm: function(e) {
            var $form = $(window.top.topPage.getCurrentForm(e));
            return !$form.valid || $form.valid();
        }

    });
});
