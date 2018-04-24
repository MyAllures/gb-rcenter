define(['common/BaseEditPage','jqFileInput','css!themesCss/fileinput/fileinput','validate'], function(BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init : function() {
            this._super();
        },
        bindEvent:function()
        {
            this._super();
        },
        onPageLoad: function () {
            this._super();
        },
        myValidateForm:function (e, opt) {
            if(!this.validateForm(e)){
                return false;
            }
            var ids = $("textarea[name='siteIds']").val();
            if (ids == null||ids=='') {
                window.top.topPage.showConfirmMessage("确定调整所有站点兑换比例吗?", function (state) {
                    if (state) {
                        window.top.topPage.doAjax(e, opt);
                    }
                })
            } else {
                window.top.topPage.showConfirmMessage("确定调整站点"+ids+"兑换比例吗?", function (state) {
                    if (state) {
                        window.top.topPage.doAjax(e, opt);
                    }
                })
            }
        }
    });
});