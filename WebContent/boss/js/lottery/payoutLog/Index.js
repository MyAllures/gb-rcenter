define(['common/BaseListPage'], function (BaseListPage) {
    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form[name=payoutLogForm]";
            this._super(this.formSelector);
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();
        },
        checkSiteId:function (e, opt) {
            var siteId = $("#siteId").val();
            if(!siteId){
                opt.callback=function () {
                    $("#siteId").focus();
                };
                page.showPopover(e,opt,"danger","站点ID不能为空",true);
                return false;
            }
            return true;
        }
    });
});