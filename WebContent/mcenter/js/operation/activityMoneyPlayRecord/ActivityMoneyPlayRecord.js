define(['common/BaseListPage'], function(BaseListPage) {

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init : function() {
            this._super();
            //两个from，两个分页，所以要分两次查询，第一次请求查询出一个form的数据，页面加载完成初始化时，触发另一个form的查询
            $("button:eq(3)").click();
        },
        onPageLoad: function () {
            this._super();
            var _this=this;
        },

        /**
         * 当前对象事件初始化函数
         */
        bindEvent : function() {
            this._super();
            var _this=this;


        },

    });

});
