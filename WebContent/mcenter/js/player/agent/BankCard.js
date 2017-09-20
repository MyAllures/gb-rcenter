//模板页面
define(['common/BasePage', 'common/Pagination'], function (BasePage, Pagination) {

    return BasePage.extend({
        pagination : null,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function (title) {
            this.formSelector = "form";
            this.pagination = new Pagination(this.formSelector);
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
            this.pagination.processOrderColumnTag(this);
            this.checkNoRecords();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            /**
             * super中已经集成了
             *      列头全选，全不选
             *      自定义列
             *      自定义查询下拉
             * 事件的初始化
             */
            this._super();
            var _this = this;
            //这里初始化所有的事件

        },
        query: function (e, opt) {
            if (e.returnValue) {
                var userId = opt.userId;
                var content = $(e.currentTarget).parent().parent();
                $(content).html('<img src="' + resRoot + '/images/022b.gif">');
                $(content).load(root + '/userAgent/agent/bankCard.html?search.userId=' + userId);
            }
        }
    });
});