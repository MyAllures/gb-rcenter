define(['common/BaseListPage'], function (BaseListPage) {
    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super();
        },
        /**
         * 页面加载事件函数
         */
        onPageLoad: function () {
            /**
             * super中已经集成了
             *      验证、
             *      排序、
             *      分页、
             *      chosen Select
             * 控件的初始化
             */
            this._super();
            $(".tab-content > .tab-pane").css("display", "block");
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();

            $("ul li a", "#mainFrame div.panel").on("click", function () {
                var $href = $(this).attr("data-href");
                $(".tab-content").addClass("hide");
                $("#tab-content" + $(this).attr("index")).load(root + $href);
                $("#tab-content" + $(this).attr("index")).removeClass("hide");
            });
        }
    });
});