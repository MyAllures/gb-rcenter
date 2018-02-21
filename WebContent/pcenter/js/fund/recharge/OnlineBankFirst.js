/**
 * 管理首页-首页js
 */
define(['site/fund/recharge/CommonRecharge', 'site/fund/recharge/RealName'], function (CommonRecharge, RealName) {
    return CommonRecharge.extend({
        realName: null,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form";
            this._super(this.formSelector);
            this.realName = new RealName();
            this.realName.realName();
        },
        /**
         * 页面加载和异步加载时需要重新初始化的工作
         */
        onPageLoad: function () {
            this._super();
            this.initCaptcha();
            window.top.onlineTransactionNo = null;
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;

            $(this.formSelector).on("input", "[name='result.rechargeAmount']", function () {
                $(_this.formSelector + " span.fee").hide();
                _this.changeAmountMsg();
            });

            //修改验证码提示信息的地方
            $(this.formSelector).on("validate", "[name='code']", function (e, message) {
                if (message) {
                    $(_this.formSelector + " span[name=codeTitle]").html("<span class=\"tips orange\"><i class=\"mark plaintsmall\"></i>" + message + "</span>");
                    e.result = true;
                } else {
                    $(_this.formSelector + " span[name=codeTitle]").html("<i class='mark successsmall'></i>");
                    $(_this.formSelector + " [name='code']").removeClass("error");
                    e.result = false;
                }
            });

            $(this.formSelector).on("click", "label.bank", function (e) {
                $("label.bank.select").removeClass("select");
                var $account = $(this).find("input[name='account']");
                var bankCode = $account.attr("bankCode");
                var account = $account.attr("account");
                $(".accountInfo").hide();
                $("[name=accountInfo" + bankCode + account + "]").show();
                $(this).addClass("select");
            })
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
         * 立即存款
         * @param e
         * @param option
         */
        submit: function (e, option) {
            window.top.topPage.ajax({
                url: root + "/fund/recharge/company/onlineBankConfirm.html",
                data: this.getCurrentFormData(e),
                type: "post",
                dataType: 'json',
                success: function (data) {
                    $("#backdrop").show();
                    if (data.state == true) {
                        $("#confirmRechargeAmount").text(data.rechargeAmount);
                        $("#confirmFee").text(data.formatFee);
                        if (data.fee > 0) {
                            $("#confirmFee").addClass("green m-l");
                            $("#confirmFee").removeClass("red");
                        } else {
                            $("#confirmFee").addClass("red");
                            $("#confirmFee").removeClass("green m-l");
                        }
                        $("#confirmRechargeTotal").text(data.rechargeTotal);
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
                url: root + "/fund/recharge/company/onlineBankSubmit.html",
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
        },
        /**
         * 更改存款规则-更改存款金额的remote规则
         * @param $form
         * @returns {*}
         */
        getValidateRule: function ($form) {
            var rule = this._super($form);
            var _this = this;
            if (rule && rule.rules['result.rechargeAmount']) {
                var displayFee = $("input[name=displayFee]").val();
                rule.rules['result.rechargeAmount'].remote = {
                    url: '/pcenter/fund/recharge/company/checkAmount.html',
                    cache: false,
                    type: 'POST',
                    data: {
                        'result.rechargeAmount': function () {
                            return $("[name='result.rechargeAmount']").val();
                        }
                    },
                    complete: function (data) {
                        if (data.responseText == "true") {
                            var rechargeAmount = $($form).children().find("[name='result.rechargeAmount']").val();
                            window.top.topPage.ajax({
                                url: root + '/fund/recharge/company/counterFee.html',
                                data: {"result.rechargeAmount": rechargeAmount, "type": 'company_deposit'},
                                dataType: 'json',
                                success: function (data) {
                                    var fee = data.fee;
                                    var counterFee = data.counterFee;
                                    var msg;
                                    if (fee > 0) {
                                        msg = window.top.message.fund['Recharge.recharge.returnFee'].replace("{0}", counterFee);
                                    } else if (fee < 0) {
                                        msg = window.top.message.fund['Recharge.recharge.needFee'].replace("{0}", counterFee);
                                    } else if (fee == 0) {
                                        msg = window.top.message.fund['Recharge.recharge.freeFee'];
                                    }
                                    if (displayFee == 'true' || fee != 0) {
                                        $(_this.formSelector + " span.fee").html(msg);
                                        $(_this.formSelector + " span.fee").show();
                                    }


                                    var sales = data.sales;
                                    if (sales && sales.length > 0) {
                                        var len = sales.length;
                                        var html = $("#rechargeSale").render({
                                            sales: sales,
                                            len: len
                                        });
                                        $("div#applysale").html(html);
                                        if (sales[0].preferential != true) {
                                            $("input[name=activityId]:eq('')").prop("checked", 'checked');
                                        }
                                    } else {
                                        $("div#pplysale").find("input[type=radio]").attr("disabled", true);
                                        $("input[name=activityId]:eq('')").prop("checked", 'checked');
                                    }
                                    $("._submit").removeClass("disabled");
                                },
                                error: function () {
                                    $("._submit").addClass("disabled");
                                }
                            });
                        } else {
                            $("._submit").addClass("disabled");
                        }
                    }
                }
            }
            return rule;
        },
        /**
         * 更改验证消息
         */
        bindFormValidation: function () {
            this._super();
            this.changeAmountMsg();
        },
        /**
         * 更新存款金额的远程验证提示消息
         */
        changeAmountMsg: function () {
            var max = $(this.formSelector + " input[name=onlinePayMax]").val();
            var min = $(this.formSelector + " input[name=onlinePayMin]").val();
            if (!min || min == 0) {
                min = '0.01';
            }
            if (!max || max == 0) {
                max = '99,999,999.00';
            }

            var minInt = parseInt(min.replace(/,/g, ""));
            var maxInt = parseInt(max.replace(/,/g, ""));
            var rechargeAmount = $(this.formSelector + " input[name='result.rechargeAmount']").val();
            var msg;
            if (rechargeAmount && minInt <= rechargeAmount && rechargeAmount <= maxInt) {
                msg = window.top.message.fund['rechargeForm.rechargeAmountLTFee'];
            } else {
                msg = window.top.message.fund['rechargeForm.rechargeAmountOver'];
                msg = msg.replace("{0}", min);
                msg = msg.replace("{1}", max);
            }
            this.extendValidateMessage({"result.rechargeAmount": {remote: msg}});
            this.extendValidateMessage({"result.rechargeAmount": {max: msg}});
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

    });
});