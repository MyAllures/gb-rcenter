define(['common/BaseListPage'], function (BaseListPage) {
    return BaseListPage.extend({

        init: function () {
            this._super();
        },

        onPageLoad: function () {
            this._super();
            this.resizeDialog();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
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
        },
    });
});