/**
 * Created by eagle on 16-5-29.
 */

define(['common/BaseViewPage'], function(BaseViewPage) {

    return BaseViewPage.extend({

        init: function (title) {
            this._super();
        },

        /**
         * 页面加载和异步加载时需要重新初始化的工作
         */
        onPageLoad: function () {
            this._super();
        },

        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            this._super();
        },

       toEdit:function(e,opt) {
           var _this = this;
           opt.url=root+'/personalInfo/edit.html';
           opt.dataType="text";
           opt.callback=function(e,opt) {
               $("#mainFrame").html(opt.data);
           };
           window.top.topPage.doAjax(e,opt);
       }
    });
});