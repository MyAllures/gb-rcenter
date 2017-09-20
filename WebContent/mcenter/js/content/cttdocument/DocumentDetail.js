//模板页面
define(['common/BaseEditPage','bootstrapswitch','nestable','css!themesCss/jquery/plugins/jquery.nestable/jquery.nestable.css'], function(BaseEditPage,Bootstrapswitch,nestable) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        sw:true,

        init: function (title) {
            this.formSelector = "form";
            this._super();
            /*$('.help-popover').popover();*/
        },
        /**
         * 页面加载和异步加载时需要重新初始化的工作
         */
        onPageLoad: function () {
            /**
             * super中已经集成了
             *      验证、
             *      chosen Select
             * 控件的初始化
             */
            this._super();
        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            $(this.formSelector).on("click",".langtag", function () {
                var lang=$(this).attr("name");
                $(".contentDiv").hide();
                $("#content"+lang).removeClass("hide");
                $("#content"+lang).show();
                $(".langtag").removeClass("current");
                $(this).addClass("current");
            });
            $(this.formSelector).on("click",".activityTag", function () {
                var lang=$(this).attr("name");
                $(".contentDiv").hide();
                $("#content"+lang).removeClass("hide");
                $("#content"+lang).show();
                $(".activityTag").removeClass("btn-outline");
                $(".activityTag").addClass("btn-outline");
                $(this).removeClass("btn-outline");
            });
        }
    });
});