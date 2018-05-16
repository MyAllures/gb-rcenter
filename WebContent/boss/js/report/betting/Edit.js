define(['common/BaseEditPage'], function (BaseListPage) {
    return BaseListPage.extend({
        init: function () {
            this.formSelector = "#mainFrame form";
            this._super();
        },

        bindEvent: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            var _this=this;
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                html: true
            });
        },
        /**
         * 提交参数之后的回调,关闭dialog,并设置返回值为true:表明需要刷新list
         * @param e
         * @param option
         */
        saveCallbak: function (e, option){
            this.returnValue = true;
            window.top.topPage.closeDialog();
        },
    });
});
