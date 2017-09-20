//模板页面
define(['common/BaseEditPage', 'bootstrapswitch'], function (BaseEditPage, Bootstrapswitch) {

    return BaseEditPage.extend({
        bootstrapswitch: Bootstrapswitch,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form";
            this._super();
            $("#li_top_7").addClass("active");
        },
        /**
         * 页面加载和异步加载时需要重新初始化的工作
         */
        onPageLoad: function () {
            /**
             * super中已经集成了
             *      验证、
             *      chosen Select
             * 控件的初始化
             */
            this._super();
        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            var _this = this;
            $("#li_top_7").addClass("active");

        },
        loadArea: function () {
            $("#mainFrame").load(root + window.location.hash.slice(1));
        }

    });
});