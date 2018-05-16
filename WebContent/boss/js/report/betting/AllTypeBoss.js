/**
 * 投注记录
 */
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
        onPageLoad: function () {
            this._super();
            var _this = this;
            $('[data-toggle="popover"]', _this.formSelector).popover({
                trigger: 'hover',
                placement: 'top'
            });
        },
        validateForm: function (e) {
            var $form = $(window.top.topPage.getCurrentForm(e));
            return !$form.valid || $form.valid();
        },
        queryByCondition: function (e, opt) {
            this.query(e,opt);
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
        },
        /**
         * 自定义查询,在returnValue为true的情况下才刷新dialog,为了让取消按钮不刷新页面
         * @param e
         * @param opt
         */
        custQuery:function(e,opt){
            if(e.returnValue == true){
                this.query(e,opt);
            }
        },
    });
});