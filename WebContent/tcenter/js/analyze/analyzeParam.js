
define(['common/BaseEditPage'], function(BaseEditPage) {
    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super();
            this.formSelector = "form[name=editForm]";
        },
        onPageLoad: function () {
            this._super();
            var _that = this;
            $('[data-toggle="popover"]', _that.formSelector).popover({
                trigger: 'hover',
                placement: 'bottom',
                html: true
            });
        },

        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();

        }
    })
})
