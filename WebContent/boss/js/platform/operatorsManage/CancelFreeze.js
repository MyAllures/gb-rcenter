//账号冻结
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function (formSelector) {
            this.formSelector = "form";
            this._super(this.formSelector);
        },
        /** 当前对象事件初始化函数 */
        bindEvent: function () {
            this._super();
        },
        /**
         * 确认取消冻结
         * @param e
         * @param option
         */
        cancelFreeze: function (e, option) {
            var _this = this;
            window.top.topPage.doAjax(e, {
                url:  this.getCurrentFormAction(e),
                eventTarget: e.currentTarget,
                dataType: 'json',
                callback: function (e, option) {
                    window.top.topPage.closeDialog();
                    _this.returnValue = true;
                }
            });
        }
    });
});