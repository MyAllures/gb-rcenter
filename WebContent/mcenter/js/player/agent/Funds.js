/**
 * 代理信息-资金
 */
define(['common/BasePage', 'common/Pagination'], function (BasePage, Pagination) {

    return BasePage.extend({
        pagination: null,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "#fundForm";
            this.pagination = new Pagination(this.formSelector);
            this._super();
        },
        onPageLoad: function () {
            this._super();
            this.pagination.processOrderColumnTag(this);
            this.checkNoRecords();
        },
        query: function (e, option) {
            e.page=this;
            var currentForm = window.top.topPage.getCurrentForm(e);
            var content = currentForm.parentNode;
            var url = currentForm.action + '?' + window.top.topPage.getCurrentFormData(e);
            $(content).html('<img src="' + resRoot + '/images/022b.gif">');
            $(content).load(url);
        }
    });

});