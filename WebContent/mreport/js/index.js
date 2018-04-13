/**
 * 数据中心首页-首页js
 */
define(['common/BasePage'], function (BasePage) {
    return BasePage.extend({

        /**
		 * 初使化
         */
		init: function () {
            this._super();
        },

        /**
         * 当前对象事件初始化
         */
        bindEvent: function () {
            this._super();

            //左侧一级导航收起/展开图切换
            $('.list-group li').click(function() {
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                } else {
                    $(this).addClass('active');
                }
            });

            //左侧二级导航
            $('.list-group li').click(function() {
                window.event.cancelBubble = true;
                $(this).children().filter('.hideMenu').stop().slideToggle()
            })
        }
    });
});