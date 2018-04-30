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

            //左侧一级导航收起/展开图切换
            $('.list-group li').click(function() {
                $(this).addClass("active").siblings().removeClass("active");
            });

            //左侧二级导航
            $('.list-group li').click(function() {
                window.event.cancelBubble = true;
                $(this).children().filter('.hideMenu').stop().slideToggle()
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