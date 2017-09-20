/**
 * 电子支付第二步-回执信息
 */
define(['common/BaseEditPage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form";
            this._super(this.formSelector);
            var clip = new ZeroClipboard($('[name="copy"]'));
            clip.on('copy', function (e) {
                var $obj = $($(e)[0].target).find("a");
                window.top.topPage.customerPopover($obj, window.top.message.fund_auto['复制成功']);
            });
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
        },
        /**
         * 立即存款
         * @param e
         * @param option
         */
        /*submit: function (e, option) {
            window.top.topPage.ajax({
                url: root + "/fund/playerRecharge/atmCounterSubmit.html",
                data: this.getCurrentFormData(e),
                dataType: 'json',
                type: 'post',
                success: function (data) {
                    var state = data.state;
                    if (state == true) {
                        var btnOption = {};
                        btnOption.text = window.top.message.fund_auto['提交存款订单'];
                        btnOption.target = root + "/fund/playerRecharge/submitSuccess.html";
                        btnOption.callback = "back";
                        window.top.topPage.doDialog(e, btnOption);
                    } else {
                        option.callback = "back";
                        e.page.showPopover(e, option, 'danger', data.msg, true);
                    }
                    $(e.currentTarget).unlock();
                }
            })
        },*/
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