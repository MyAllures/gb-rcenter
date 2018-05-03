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

            // 左侧一级菜单收缩
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

            // 左侧二级菜单点亮
            $('.hideMenu a').click(function(e) {
                $(this).parent().addClass("active").siblings().removeClass("active");
                e.stopPropagation();//阻止事件冒泡
            });

            $('.dropdown-toggle').click(function(e) {
                $(this).next('.dropdown-menu').stop().slideToggle();
                $(this).focus();
                $(this).blur(function() {
                    $(this).next('.dropdown-menu').stop().slideUp();
                });
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