/**
 * 取款-兑换
 */
define(['common/BaseEditPage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        init: function () {
            this._super();
        },
        exchange: function (e, option) {
            if (!$("[name=payAccountId]").val()) {
                e.page.showPopover(e, option, 'warning', '请选择收款帐号', true);
                return;
            }
            var url = root + "/fund/withdraw/exchange.html";
            var _this = this;
            window.top.topPage.ajax({
                url: url,
                data: this.getCurrentFormData(e),
                type: 'POST',
                dataType: 'json',
                success: function (data) {
                    $(e.currentTarget).unlock();
                    if (data.hasExchange) {
                        e.page.showPopover(e, option, 'warning', '该笔交易已经兑换过了', true);
                        return;
                    }
                    if (data.notAccount) {
                        e.page.showPopover(e, option, 'warning', '没有选择收款帐号', true);
                        return;
                    }
                    if (data.rate) {
                        e.page.showPopover(e, option, 'warning', '第三方查询美元兑换汇率繁忙，请稍候！', true);
                        return;
                    }
                    if(data.exchangeProcess) {
                        e.page.showPopover(e, option, 'warning', '正在兑现中，不可重复点击，请稍后再试！', true);
                        return;
                    }
                    if (data.msg) {
                        e.page.showPopover(e, option, 'warning', data.msg, true);
                        return;
                    }
                    if(data.exchange) {
                        e.page.showPopover(e, option, 'warning', "第三方兑现繁忙，请稍侯!", true);
                        return;
                    }
                    if (data.state == false) {
                        e.page.showPopover(e, option, 'warning', '系统繁忙，请稍候！', true);
                        return;
                    }
                    if(data.state == true && data.usd >0 && data.bit > 0) {
                        var msg = "购买比特币成功！共转换美元：" + data.usd + ",购买比特币:" + data.bit;
                        window.top.topPage.showSuccessMessage(msg, function(){
                            _this.returnValue = true;
                            window.top.topPage.closeDialog();
                        });
                    }
                }
            })
        }
    })
});