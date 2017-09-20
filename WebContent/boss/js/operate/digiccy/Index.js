define(['common/BaseListPage', 'jsrender'], function (BaseListPage) {
    var _this;

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        selectIds:null,
        init: function () {
            this._super();
            _this = this;
        },

        /**
         * 页面加载事件函数
         */
        onPageLoad: function () {
            this._super();
            var _this = this;
            selectIds = null;
        },

        bindEvent: function () {
            this._super();
            // 列表详情事件绑定
        },
        validateForm: function (e) {
            var $form = $(window.top.topPage.getCurrentForm(e));
            return !$form.valid || $form.valid();
        },
    });
})