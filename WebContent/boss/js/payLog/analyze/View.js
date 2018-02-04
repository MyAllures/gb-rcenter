define(['common/BaseListPage'], function (BaseListPage) {
    return BaseListPage.extend({

        init: function () {
            this._super();
        },

        onPageLoad: function () {
            this._super();
            //分页下拉向上显示
            $('[selectdiv="paging.pageSize"]').addClass("dropup");
            this.resizeDialog();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
        },
    });
});