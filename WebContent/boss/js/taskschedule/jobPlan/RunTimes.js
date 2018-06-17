/**
 * Created by mark on 15-7-14.
 */
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        init: function () {
            this._super();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent : function() {
            this._super();
        },

        onPageLoad: function () {
            this._super();
        },

        /**
         * 保存后回调函数
         * @param e             事件对象
         * @param option        Button标签的参数
         */
        saveCallbak: function (e, option) {
            if (option && option.data && option.data.state) {
                this.returnValue = true;
                window.top.topPage.closeDialog();
            }
        },
    });
});