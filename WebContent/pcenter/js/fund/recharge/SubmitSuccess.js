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
        init: function () {
            this._super("form");
        },
        /**
         * 再存一次
         * @param e
         * @param option
         */
        rechargeAgain: function (e, option) {
            this.closePage();
        },
        /**
         * 查看资金记录
         * @param e
         * @param option
         */
        viewRecharge: function (e, option) {
            this.returnValue = true;
            window.top.page.returnValue = true;
            this.closePage();
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