define(['common/BasePage'], function(BasePage) {
    var _this=this;
    return BasePage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        noRecordMessage:window.top.message.common["find.norecord"],
        init: function (title) {
            this.formSelector = "#mainFrame form";
            this._super("formSelector");
            this.pagination = new Pagination(this.formSelector);
            this.noRecordMessage = window.top.message.common["find.norecord"];
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
            this.pagination.processOrderColumnTag(this);
            this.checkNoRecords();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            $("ul li a","#mainFrame  .panel").on("click",function(e){
                var $href = $(this).attr("data-href");
                $(".tab-content").load(root+$href);
            });
        },

        requery:function(event,option) {
            $(".tab-content").load(window.top.topPage.getCurrentFormAction(event));
        }

    });
});