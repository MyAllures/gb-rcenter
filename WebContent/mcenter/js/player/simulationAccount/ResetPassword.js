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
        },
        onPageLoad: function () {
            this._super();
            var clip = new ZeroClipboard($('[name="copy"]'));
            clip.on('aftercopy', function (e) {
                var $obj = $($(e)[0].target);
                window.top.topPage.customerPopover($obj, window.top.message.report_auto['复制成功']);
            });
        },
    });
});