define(['common/BaseListPage','common/BaseEditPage'], function(BaseListPage,BaseEditPage) {

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        selectedIds:null,
        init : function() {
            this._super();
        },
        bindEvent:function()
        {
            this._super();
            this.copyText('[name="copy"]')
        },
        onPageLoad: function () {
            this._super();
        },
    });
});