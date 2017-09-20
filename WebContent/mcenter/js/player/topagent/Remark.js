/**
 * 总代列表中的备注js
 */
define(['common/BasePage', 'common/Pagination'], function (BasePage, Pagination) {

    return BasePage.extend({
        pagination : null,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "#topagentRemarkForm";
            this.pagination = new Pagination(this.formSelector);
            this._super();
        },
        /**
         * 页面加载事件函数
         */
        onPageLoad: function () {
            this._super();
            this.pagination.processOrderColumnTag(this);
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent : function() {
            this._super();
        },
        /**
         * 总代列表中的备注
         * @param e
         */
        query: function (e, o) {
            var load = this.getCurrentForm(e).parentNode;
            window.top.topPage.ajax({
                type:'post',
                data: this.getCurrentFormData(e),
                url: this.getCurrentFormAction(e),
                success: function(data) {
                    $(load).html(data);
                }
            });
        },
        callBack: function (e, o) {
            if (e.returnValue) {
                this.query(e, o);
            }
        }
    });

});