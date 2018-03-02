/**
 * Created by bruce on 16-7-11.
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