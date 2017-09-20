/**
 * 公司入款-兑换
 */
define(['common/BaseEditPage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        init: function () {
            this._super();
        },
        exchange: function (e, option) {
            var _this = this;
            var url = root + "/fund/deposit/company/exchange.html";
            window.top.topPage.ajax({
                url: url,
                data: this.getCurrentFormData(e),
                type: 'POST',
                dataType: 'json',
                success: function (data) {
                    $(e.currentTarget).unlock();
                    if (data.hasExchange) {
                        e.page.showPopover(e, option, 'warning', window.top.message.fund_auto['该笔交易已经兑换过了'], true);
                        return;
                    }
                    if (data.depositStatus) {
                        if (data.code == '6') {
                            e.page.showPopover(e, option, 'warning', window.top.message.fund_auto['该笔订单在第三方平台状态为进行中'], true);
                        } else if (data.code == '7') {
                            window.top.topPage.showWarningMessage(window.top.message.fund_auto['该笔订单金额不一致'] + data.amount);
                        } else {
                            e.page.showPopover(e, option, 'warning', window.top.message.fund_auto['该笔交易状态无法确定'], true);
                        }
                        return;
                    }
                    if (data.rate) {
                        e.page.showPopover(e, option, 'warning', window.top.message.fund_auto['该笔交易查询汇率繁忙'], true);
                        return;
                    }
                    if (data.exchangeBit) {
                        e.page.showPopover(e, option, 'warning', window.top.message.fund_auto['该笔交易兑换美元过程繁忙'], true);
                        return;
                    }
                    if (data.exchangeProcess) {
                        e.page.showPopover(e, option, 'warning', window.top.message.fund_auto['正在兑换中'], true);
                        return;
                    }
                    if (data.state == false) {
                        e.page.showPopover(e, option, 'warning', window.top.message.fund_auto['无该笔交易'], true);
                        return;
                    }
                    if (data.state) {
                        if (data.msg) {
                            e.page.showPopover(e, option, 'warning', result.error, true);
                            return;
                        }
                        if (data.amount == 0) {
                            e.page.showPopover(e, option, 'warning', window.top.message.fund_auto['没有获取该笔交易历史记录'], true);
                            return;
                        }
                        var msg = window.top.message.fund_auto['兑换成功'] + data.amount + window.top.message.fund_auto['兑换美元金额'] + data.total;
                        window.top.topPage.showSuccessMessage(msg, function () {
                            _this.returnValue = true;
                            window.top.topPage.closeDialog();
                        });
                    }
                }
            })
        }
    })
});