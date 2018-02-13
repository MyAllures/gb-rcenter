define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "#mainFrame form";
            this._super();
        },

        /**
         * 当前对象事件初始化函数
         */
        bindEvent : function() {
            this._super();
        },

        onPageLoad: function () {
            this._super();
            //分页下拉向上显示
            $('[selectdiv="result.type"]').addClass("dropup");
            this.resizeDialog();
        }
    });
});