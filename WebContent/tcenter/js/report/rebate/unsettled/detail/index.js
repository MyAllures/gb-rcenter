/**
 * Created by eagle on 16-03-09.
 */
define(['common/BaseListPage'], function (BaseListPage) {

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function (formSelector) {
            this._super();
        },
        /** 页面加载事件函数 */
        onPageLoad: function () {
            this._super();
        },
        /** 当前对象事件初始化函数 */
        bindEvent: function () {
            this._super();
            var _this=this;
            //这里初始化所有的事件
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                placement: 'top'
            });
        }
    });
});