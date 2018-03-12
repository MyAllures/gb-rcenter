/**
 * 电子支付第二步-回执信息
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
            this.copyText('a[name="copy"]');
        },
        /**
         * 支付后回调
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
            } else {
                var $current = $(".sidebar-nav a[data^='/fund/playerRecharge/recharge.html']", window.top.document);
                $current.parent().addClass("select");
                $("#mainFrame").load(root + "/fund/recharge/company/atmCounterFirst.html");
            }
        },
        /**
         * 验证
         */
        bindFormValidation: function () {
            this._super();
        },
        /**
         * 展开其它优惠
         * @param e
         * @param option
         */
        expendSale: function (e, option) {
            $("tr.expendSales").show();
            $(e.currentTarget).hide();
            $(e.currentTarget).unlock();
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