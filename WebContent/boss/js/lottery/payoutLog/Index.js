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
            var siteId = $("#search.siteId").val();
            var code = opt.code;
            if(!siteId){
                if(!code){
                    opt.placement="left";
                }
                opt.callback=function () {
                    $("#search.siteId").focus();
                }
                page.showPopover(e,opt,"danger","站点ID不能为空",true);
                return false;
            }
            return true;
        }
    });
});