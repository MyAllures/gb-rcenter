/**
 * 数字货币支付
 */
define(['common/BaseEditPage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        init: function () {
            this.formSelector = "form[name=digiccyPayForm]";
            this._super(this.formSelector);
        },
        /**
         * 页面加载后加载
         */
        onPageLoad: function () {
            this._super();
            var clip = new ZeroClipboard($('button[name="copy"]'));
            clip.on('aftercopy', function (e) {
                e.currentTarget = e.target;
                page.showPopover(e, {}, 'success', window.top.message.fund_auto['复制成功'], true);
            });
        },
        /**
         * 生成地址
         */
        newAddress: function (e, option) {
            var currency = option.currency;
            window.top.topPage.ajax({
                url: root + "/fund/recharge/digiccy/newAddress.html",
                data: {'currency': currency},
                dataType: 'json',
                success: function (data) {
                    var address = data.address;
                    if (address) {
                        e.page.showPopover(e, option, 'success', '生成地址成功', true);
                        window.setTimeout(function () {
                            var html = $("#addressRender").render({data: data});
                            $("#" + currency).html(html);
                            var clip = new ZeroClipboard($('button[name="copy"]'));
                            clip.on('aftercopy', function (e) {
                                e.currentTarget = e.target;
                                page.showPopover(e, {}, 'success', window.top.message.fund_auto['复制成功'], true);
                            });
                        }, 1000);
                    } else {
                        e.page.showPopover(e, option, 'warning', '生成地址失败请稍后再试！', true);
                    }
                    $(e.currentTarget).unlock();
                }
            })
        },
        /**
         * 兑换
         * @param e
         * @param option
         */
        exchange: function (e, option) {
            var currency = option.currency;
            window.top.topPage.ajax({
                url: root + "/fund/recharge/digiccy/exchange.html",
                data: {'currency': currency},
                dataType: 'json',
                success: function (data) {
                    var state = data.state;
                    var msg = window.top.message.fund['Recharge.digiccyRecharge.'+data.msg];
                    if (state == false && data.msg && msg) {
                        option.callback = 'back';
                        e.page.showPopover(e, option, 'warning', msg, true);
                    } else if (state == true) {
                        var btnOption = {};
                        btnOption.target = root + '/fund/recharge/digiccy/sale.html?search.transactionNo=' + data.transactionNo;
                        btnOption.callback = "back";
                        btnOption.text = option.text;
                        window.top.topPage.doDialog(e, btnOption);
                    } else {
                        e.page.showPopover(e, option, 'warning', '兑换金额失败请稍后再试', true);
                    }
                    $(e.currentTarget).unlock();
                }
            })
        },
        /**
         * 回调
         * @param e
         * @param option
         */
        back: function (e, option) {
            var currency = option.currency;
            var _e = {currentTarget: $(e.currentTarget).prev(), page: e.page};
            this.refresh(_e, option);
        },
        /**
         * 刷新金额
         * @param e
         * @param option
         */
        refresh: function (e, option) {
            var currency = option.currency;
            var text = $(e.currentTarget).prev(".orange").text();
            var loading = '<em class="t-load"></em>';
            $(e.currentTarget).prev(".orange").html(loading);
            window.top.topPage.ajax({
                url: root + "/fund/recharge/digiccy/refresh.html",
                data: {'currency': currency},
                dataType: 'json',
                success: function (data) {
                    $(e.currentTarget).prev(".orange").text(data.amount);
                    if (data.amount <= 0) {
                        $(e.currentTarget).next().hide();
                    } else {
                        $(e.currentTarget).next().show();
                    }
                    $(e.currentTarget).unlock();
                },
                error: function () {
                    $(e.currentTarget).prev(".orange").text(text);
                    $(e.currentTarget).unlock();
                }
            })
        }
    })
});