/**
 * 资金管理-公司入款-存款详细
 */
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({

        init: function (title) {
            this.formSelector = "form";
            this._super();
        },

        onPageLoad: function () {
            this._super();
        },

        bindEvent: function () {
            this._super();
            this.copyText('a[name="copy"]');
        }

    });
});