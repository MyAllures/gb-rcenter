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
            this.formSelector = "form";
            this._super("form");
            $("a[name=closePage]").click();
        },
        bindEvent: function () {
            $(this.formSelector).on("click", "a[name=closePage]", function (e) {
                window.close();
            });
        }
    });
});