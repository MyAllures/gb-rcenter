define(['common/BasePage'], function(BasePage) {
    var _this=this;
    return BasePage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function (title) {
            this.formSelector = "#viewPlatformPartialForm";
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
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
        },

        painView:function(e,option) {
            if (e.returnValue==true) {
                $("#mainFrame").load(root+"/vPlatformManage/view.html?id="+$("[name='siteId']").val());
            }
        }
    });
});