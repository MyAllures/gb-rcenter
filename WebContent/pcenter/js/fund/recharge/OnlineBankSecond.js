/**
 * 存款-网银转账第二步
 */
define(['site/fund/recharge/CommonRecharge'], function (CommonRecharge) {
    return CommonRecharge.extend({
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
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
        },
        /**
         * 返回上一步
         * @param e
         * @param option
         */
        goToBack: function (e, option) {
            var payAccountId = $("input[name='result.payAccountId']").val();
            var rechargeAmount = $("input[name='result.rechargeAmount']").val();
            var activityId = $("input[name='activityId']").val();
            $("#mainFrame").load(root + "/fund/recharge/company/onlineBankFirst.html?result.payAccountId=" + payAccountId + "&result.rechargeAmount=" + rechargeAmount + "&activityId=" + activityId);
            $(e.currentTarget).unlock();
        },
        /**
         * 回调
         * @param e
         * @param option
         */
        back: function (e, option) {
            if (e.returnValue == true || this.returnValue == true) {
                var $select = $(".sidebar-nav .select", window.top.document);
                $select.removeClass("select");
                var $current = $(".sidebar-nav a[data^='/fund/transaction/list.html']", window.top.document);
                $current.parent().addClass("select");
                $current.click();
                this.returnValue = null;
            } else {
                var $current = $(".sidebar-nav a[data^='/fund/playerRecharge/recharge.html']", window.top.document);
                $current.parent().addClass("select");
                $("#mainFrame").load(root + "/fund/recharge/company/onlineBankFirst.html");
            }
        },
        /**
         * 展开网上银行
         * @param e
         * @param option
         */
        expendBanks: function (e, option) {
            $("#expendBanks").toggle();
            var $target = $(e.currentTarget);
            var text = $target.children("span");
            var arr = $target.children(".bank-arrico");
            if ($(arr).hasClass("down")) {
                $(arr).removeClass("down");
                $(arr).addClass("up");
                $(text).text(window.top.message.fund_auto['收缩部分网上银行']);
            } else {
                $(arr).removeClass("up");
                $(arr).addClass("down");
                $(text).text(window.top.message.fund_auto['查看更多网上银行']);
            }
            $target.unlock();
        },
        /**
         * 客户服务
         * @param e
         * @param option
         */
        customerService: function (e, option) {
            window.top.topPage.customerService(e, option);
        }
    });
});