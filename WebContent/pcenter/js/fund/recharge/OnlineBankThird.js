/**
 * 网银存款第3步-确认存款
 */
define(['common/BaseEditPage', 'site/fund/recharge/SubmitSuccess'], function (BaseEditPage, SubmitSuccess) {
    return BaseEditPage.extend({
        submitSuccess: null,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.submitSuccess = new SubmitSuccess();
            this.formSelector = "form";
            this._super(this.formSelector);
            $("input[name='result.payerName']").val(window.top.topPage.online_payName);
            window.top.topPage.online_payName = null;
            $("input[name='result.payerBankcard']").val(window.top.topPage.payerBankcard);
            window.top.topPage.payerBankcard = null;
            $("input[name='result.rechargeAddress']").val(window.top.topPage.rechargeAddress);
            window.top.topPage.rechargeAddress = null;
        },
        bindEvent: function () {
            this._super();
        },
        submit: function (e, option) {
            var _this = this;
            var data = option.data;
            window.top.topPage.ajax({
                url: root + "/fund/recharge/company/" + data + ".html",
                data: this.getCurrentFormData(e),
                headers: {
                    "Soul-Requested-With": "XMLHttpRequest"
                },
                type: "post",
                success: function (data) {
                    window.document.body.innerHTML = data;
                    _this.resizeDialog();
                    _this.submitSuccess.bindButtonEvents();
                    e.returnValue=true;
                }
            });
            $(e.currentTarget).unlock();
        }
    });
});