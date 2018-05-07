/**
 * 继承TopPage
 */
define(['gb/home/TopPage'], function (TopPage) {
    return TopPage.extend({

        /**
         * 初使化
         */
        init: function () {
            this._super();
        },

        /**
         * 重写该方法
         * 原有的$(document).on("click", "a[nav-top]"写法绑定事件在有些情况下会失效.
         * 当通过curl同时加载了TopPage和另外一个有事件绑定的js文件，这时bindNavigation就会失效。
         */
        bindNavigation: function () {
            var _this = this;
            //为防止重复绑定事件，绑定前先解除绑定
            $("a[nav-top]").off("click");
            $("a[nav-top]").click(function (e) {
                e.preventDefault();
                _this._doNavigate(e);
                e.stopPropagation();//阻止事件冒泡
            });
            //为防止重复绑定事件，绑定前先解除绑定
            $("a[nav-target]").off("click");
            $("a[nav-target]").click(function (e) {
                if ($(this).attr("href")==='#') {
                    return;
                }
                e.preventDefault();
                _this._doNavigate(e);
                e.stopPropagation();//阻止事件冒泡
            });
        },
    });
});