define(['common/BaseEditPage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        pagination: null,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super();
            this.formSelector = "form";
        },
        onPageLoad: function () {
            this._super();
        },
        bindEvent: function () {
            this._super();
            var _this = this;
            $(_this.formSelector).on("change","input[type='checkbox']", function () {
                $("input[name='inadequateState.paramValue']").val($(this).is(":checked"));
            });
        },
    });
});