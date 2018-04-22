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
            var defaultProfit = $("input[name='result.defaultProfit']").val();
            var defaultTransferLimit = $("input[name='result.defaultTransferLimit']").val();
            if((defaultProfit==null||defaultProfit=="")&&(defaultTransferLimit==null||defaultTransferLimit=="")){
                // window.top.topPage.showWarningMessage("买分默认额度和转账默认额度不能同时为空");
                page.showPopover(e, {}, 'warning', "买分默认额度和转账默认额度不能同时为空", true);
                return false;
            }
            var ids = $("textarea[name='siteIds']").val();
            if (ids == null||ids=='') {
                window.top.topPage.showConfirmMessage("确定调整所有站点默认额度吗?", function (state) {
                    if (state) {
                        window.top.topPage.doAjax(e, opt);
                    }
                })
            } else {
                window.top.topPage.showConfirmMessage("确定调整站点"+ids+"默认额度吗?", function (state) {
                    if (state) {
                        window.top.topPage.doAjax(e, opt);
                    }
                })
            }
        }
    });
});