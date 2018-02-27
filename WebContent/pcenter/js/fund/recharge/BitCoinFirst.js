/**
 * 管理首页-首页js
 */
define(['site/fund/recharge/CommonRecharge'], function (CommonRecharge) {
    return CommonRecharge.extend({
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
         * 页面加载和异步加载时需要重新初始化的工作
         */
        onPageLoad: function () {
            this._super();
            this.initCaptcha();
            $(this.formSelector + " .daterangepickers input.form-control").attr("style", "padding-left: 20px;padding-right: 2px;")
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
            window.top.topPage.ajax({
                url: root + "/fund/recharge/company/bitCoinConfirm.html",
                data: this.getCurrentFormData(e),
                type: "post",
                dataType: 'json',
                success: function (data) {
                    $("#backdrop").show();
                    if (data.state == true) {
                        $("#bitAmount").text(data.bitAmount);
                        $("[name=bitcoinRecharge]").show();
                        $("[name=companyRecharge]").hide();
                        $("#confirmDialog").show();
                    } else {
                        $("#failDialog").show();
                    }
                    $(e.currentTarget).unlock();
                }
            });
        },
        /**
         * 确认存款提交
         * @param e
         * @param options
         */
        companyConfirmSubmit: function (e, option) {
            var _this = this;
            window.top.topPage.ajax({
                url: root + "/fund/recharge/company/bitCoinSubmit.html",
                data: this.getCurrentFormData(e),
                dataType: 'json',
                type: "post",
                success: function (data) {
                    _this.closeConfirmDialog(e, option);
                    $("#backdrop").show();
                    if (data.state == true) {
                        $("#successDialog").show();
                    } else {
                        $("#failDialog").show();
                    }
                    $(e.currentTarget).unlock();
                }
            })
        }
    });
});