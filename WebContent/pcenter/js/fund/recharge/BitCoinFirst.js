/**
 * 管理首页-首页js
 */
define(['common/BasePage'], function (BasePage) {
    return BasePage.extend({
        realName: null,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form";
            this._super("form");
            var clip = new ZeroClipboard($('[name="copy"]'));
            clip.on('copy', function (e) {
                var $obj = $($(e)[0].target).find("a");
                window.top.topPage.customerPopover($obj, window.top.message.fund_auto['复制成功']);
            });
            window.top.onlineTransactionNo = null;
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;

            //更换收款账号
            $(this.formSelector).on("click", "label.bank", function (e) {
                _this.changeBank(e);
            });
        },
        /**
         * 更换收款账号
         * @param e
         */
        changeBank: function (e) {
            $(this.formSelector + " label.bank").removeClass("select");
            var $target = $(e.currentTarget);
            $target.addClass("select");
            var id = $("input[name='result.payAccountId']:checked").val();
            $(".accountMap").hide();
            $("#payAccount" + id).show();
        },
        submit: function (e, option) {
            var payAccount = $("input[name='result.payAccountId']:checked").val();
            var url = root + "/fund/recharge/company/bitCoinSecond.html?result.payAccountId=" + payAccount;
            $("#mainFrame").load(url);
        },
        /**
         * 客户服务
         * @param e
         * @param option
         */
        customerService: function (e, option) {
            window.top.topPage.customerService(e, option);
        },
    });
});