/**
 * 数据中心首页-首页js
 */
define(['common/BasePage'], function (BasePage) {
    return BasePage.extend({

        /**
         * 初使化
         */
        init: function () {
            this.formSelector = "form";
        },

        /**
         * 当前对象事件初始化
         */
        bindEvent: function () {
            this._super();
            var _this = this;

            $('.dropdown-toggle').click(function(e) {
                $(this).next('.dropdown-menu').stop().slideToggle();
                $(this).focus();
                $(this).blur(function() {
                    $(this).next('.dropdown-menu').stop().slideUp();
                });
            });
        }
    });
});