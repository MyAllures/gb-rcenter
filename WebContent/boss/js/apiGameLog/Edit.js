/**
 * Created by e
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
            var _this = this;
        },
        myCallBak: function (e, option) {
            if(option.data.state){
                this.returnValue = true;
                window.top.topPage.closeDialog();
            }
        }
});
});