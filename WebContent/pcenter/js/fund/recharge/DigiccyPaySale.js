/**
 * 数字货币支付
 */
define(['common/BaseEditPage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        init: function () {
            this.formSelector = "form[name=digiccyPaySaleForm]";
            this._super(this.formSelector);
        },
        /**
         * 页面加载后加载
         */
        onPageLoad: function () {
            this._super();
        },
        applySale: function (e, option) {
            window.top.topPage.ajax({
                url: root + "/fund/recharge/digiccy/saveSale.html",
                data: this.getCurrentFormData(e),
                dataType: "json",
                success: function (data) {
                    if (data.state == true) {
                        e.page.showPopover(e, option, 'success', window.top.message.common['submit.success'], true);
                    } else {
                        e.page.showPopover(e, option, 'warning', window.top.message.common['submit.fail'], true);
                    }
                }
            })
        }
    })
});