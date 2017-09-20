/**
 * 管理首页-首页js
 */
define(['common/BasePage'], function (BasePage) {
    return BasePage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        flag: true,
        timeOutInterval: null,
        init: function () {
            this.formSelector = "div.theme-popcon";
        },
        despoitFinish: function (e, option) {
            this.returnValue = true;
            window.top.topPage.closeDialog();
        },
        /**
         * 客户服务
         * @param e
         * @param option
         */
        customerService: function (e, option) {
            window.top.topPage.customerService(e, option);
        }
    });
});