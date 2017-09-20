/**
 * 管理首页-首页js
 */
define(['common/BasePage'], function (BasePage) {
    return BasePage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super("form");
        },
        /**
         * 再试一次
         * @param e
         * @param option
         */
        reconnectTransfer: function (e, option) {
            var _this = this;
            window.top.topPage.ajax({
                url: root + "/fund/playerTransfer/reconnectTransfer.html",
                data: this.getCurrentFormData(e),
                dataType: "json",
                loading: true,
                success: function (data) {
                    if (data.state == false) {
                        option.callback = "reTransfer";
                        e.page.showPopover(e, option, 'danger', window.top.message.fund['transferDanger'], true);
                        return;
                    }
                    //转账成功后提示
                    if (data.state == true && data.resultCode == 0) {
                        option.callback = "back";
                        e.page.showPopover(e, option, 'success', window.top.message.fund['transferSuccess'], true);
                        return;
                    }
                    //转账不成功或待确认
                    window.location.href = root + "/fund/playerTransfer/transferResult.html?resultStatus=" + data.resultStatus + '&transactionNo=' + data.orderId + "&resultCode=" + data.resultCode + "&transferOut=" + data.transferOut;
                    $(e.currentTarget).unlock();
                },
                error: function (data) {
                    $(e.currentTarget).unlock();
                }
            });
        },
        /**
         * 重新转账
         * @param e
         * @param option
         */
        reTransfer: function (e, option) {
            this.closePage();
        },
        back: function (e, option) {
            window.top.topPage.recoveryReturnValue = true;
            this.closePage();
        }
    });
});