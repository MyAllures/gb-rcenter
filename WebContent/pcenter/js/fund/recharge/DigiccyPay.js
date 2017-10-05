/**
 * 线上支付
 */
define(['common/BaseEditPage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        init: function () {
            this.formSelector = "form[name=digiccyPayForm]";
            this.super(this.formSelector);
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

            })
        },
        /**
         * 兑换
         * @param e
         * @param option
         */
        exchange: function (e, option) {
            var currency = option.currency;
        }
    })
});