/**
 * Created by ke on 15-7-1.
 */
define(['common/BaseEditPage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        init: function () {
            this._super();

        },

        bindEvent: function () {
            this._super();
            var _this = this;
            _this.initCaptcha();

            $('textarea').bind('input propertychange', function () {
                if ($(this).val().length <= 2000) {
                    $(".textareaMsg").html(
                        _this.formatStr(window.top.message.systemFeedBack_auto['还可以输入']),2000-$(this).val().length);
                } else {
                    $(".textareaMsg").html(window.top.message.systemFeedBack_auto['还可输入2000个字符']);
                }
            });
        },

        onPageLoad:function() {
            this._super();
        }

    });
});