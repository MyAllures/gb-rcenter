/**
 * 管理首页-首页js
 */
define(['common/BaseEditPage'], function (BasePage) {
    return BasePage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form";
            this._super(this.formSelector);
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();

        },
        /**
         * 某一项api回收资金后资金刷新
         *
         * @param e
         * @param option
         */
        refresh: function (e, option) {
            window.top.topPage.recoveryReturnValue = true;
            window.location.reload();
        }
    });
});