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
            this._super();
            var defaultIndex = "/daily/realTimeSummary.html";
            if(window.top.location.hash!="") {
                window.top.topPage.showPage(window.top.location.hash.substr(1));
                this.lightUp();
            } else {
                window.top.location.hash = defaultIndex;
                this.lightUp();
            }
        },

        /**
         * 当前对象事件初始化
         */
        bindEvent: function () {
            this._super();
            _this = this;

            // 左侧菜单切换
            $('.list-group-item').click(function() {
                if($(this).hasClass("active")) {
                    $(this).removeClass("active");
                    $(this).children().filter('.hideMenu').stop().slideUp();
                } else {
                    $(this).addClass("active").siblings().removeClass("active");
                    $('.hideMenu').stop().slideUp();
                    $(this).children().filter('.hideMenu').stop().slideDown();
                }
            });
        },

        /**
         * 点亮菜单
         */
        lightUp: function () {
            var currentPage = window.top.location.hash.substr(1);
            $("a[nav-target]").each(function() {
                if($(this).attr("href").indexOf(currentPage)>=0) {
                    $(this).parent().addClass('active');
                    return false;
                }
            });
        }
    });
});