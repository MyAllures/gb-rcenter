/**
 * Created by ed 17-10-23.
 */
define(['common/BaseEditPage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        init: function () {
            this._super();
        },

        bindEvent: function () {
            this._super();

        },
        onPageLoad: function () {
            this._super();
        },
        /**
         * 保存或更新前验证
         * @param e   事件对象
         * @return 验证是否通过
         */
        validateForm: function (e) {
            var $form = $(window.top.topPage.getCurrentForm(e));
            return !$form.valid || $form.valid();
        }
    })
});
