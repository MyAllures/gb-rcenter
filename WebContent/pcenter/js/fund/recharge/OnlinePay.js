/**
 * 线上支付
 */
define(['site/fund/recharge/BaseOnlinePay'], function (BaseOnlinePay) {
    return BaseOnlinePay.extend({
        realName: null,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form[name=onlineForm]";
            this._super(this.formSelector);
        },
        /**
         * 页面加载和异步加载时需要重新初始化的工作
         */
        onPageLoad: function () {
            this._super();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            $(this.formSelector).on("change", "input[name='result.payerBank']", function (e) {
                _this.showRandomAmountMsg();
                var $payBank = $(_this.formSelector + " input[name='result.payerBank']:checked");
                $(_this.formSelector + " input[name=account]").val($payBank.attr("account"));
                var limitTip = $payBank.attr("amountLimit");
                $("input[name=rechargeAmount]").attr("placeholder", limitTip);
                _this.changeValid();
            });
            /**
             * 金额监控
             */
            $(this.formSelector).on("input", "input[name=rechargeAmount]", function () {
                $(_this.formSelector + " span.fee").hide();
                var rechargeAmount = $("input[name=rechargeAmount]").val();
                var $account = $("input[name=account]:checked");
                var isRandomAmount = $account.attr("randomAmount");
                if (isRandomAmount == 'true') {
                    var rechargeDecimals = $("input[name=rechargeDecimals]").val();
                    rechargeAmount = rechargeAmount + "." + rechargeDecimals;
                }
                $(_this.formSelector + " input[name='result.rechargeAmount']").val(rechargeAmount);
                $(_this.formSelector + " span.fee").hide();
                _this.changeValid();
            });
        },
        /**
         * 更改存款规则-更改存款金额的remote规则
         * @param $form
         * @returns {*}
         */
        getValidateRule: function ($form) {
            return this.changeRemoteRule($form);
        },
        /**
         * 银行收/展
         * @param e
         * @param option
         */
        expendBank: function (e, option) {
            $("div[name=hideBank]").toggle();
            var $target = $(e.currentTarget);
            var text = $target.children("span");
            var arr = $target.children(".bank-arrico");
            if ($(arr).hasClass("down")) {
                $(arr).removeClass("down");
                $(arr).addClass("up");
                $(text).text(window.top.message.fund['Recharge.onlinePay.hideMoreBank']);
            } else {
                $(arr).removeClass("up");
                $(arr).addClass("down");
                $(text).text(window.top.message.fund['Recharge.onlinePay.showMoreBank']);
            }
            $target.unlock();
        },
        onlinePayContinueDeposit:function(e,option){
            var _this = this;
            _this.onlineContinueDeposit(e,option);
        },
    });
});