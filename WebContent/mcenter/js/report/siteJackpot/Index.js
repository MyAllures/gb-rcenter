define(['common/BaseListPage', 'autocompleter'], function (BaseListPage) {
    var _this = this;
    return BaseListPage.extend({
        init: function () {
            this.formSelector = "#mainFrame form";
            this._super("formSelector");

        },
    
        onPageLoad: function () {
            this._super();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
        }
    });
});