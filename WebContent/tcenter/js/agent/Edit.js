/**
 * Created by jeff on 15-9-7.
 */
define(['common/BaseEditPage','mailAutoComplete'], function (BaseEditPage) {
    return BaseEditPage.extend({
        init: function () {
            this._super();
            $(".inputMailList").mailAutoComplete();
        },
        bindEvent: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();
        },
        saveCallbak: function() {
            window.top.topPage.goToLastPage(true);
        }
    });
});
