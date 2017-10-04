/**
 * 柜员机存款
 */
define(['common/BaseEditPage', 'site/fund/recharge/RealName'], function (BaseEditPage, RealName) {
    return BaseEditPage.extend({
        realName: null,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form[name=atmCounterForm]";
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
            //更换支付方式
            $(this.formSelector).on("click", "label.bank", function (e) {
                _this.changeType(e);
            });

            $(this.formSelector).on("input", "[name='result.rechargeAmount']", function () {
                $(_this.formSelector + " span.fee").hide();
                _this.changeAmountMsg();
            });

            /**
             * 更改银行
             */
            $(this.formSelector).on("click", "[name='result.payerBank']", function (e) {
                var payerBank = $("[name='result.payerBank']").val();
                var type = $("input[name='result.rechargeType']:checked").val();
                $(".tail-number").hide();
                if (type == 'atm_money' && $("#accountMap" + payerBank + " option").length > 1) {
                    $('#accountMap' + payerBank).show();
                }
                if (payerBank) {
                    var payAccountId = $('#accountMap' + payerBank).val();
                    $("input[name='result.payAccountId']").val(payAccountId);
                } else {
                    $("input[name='result.payAccountId']").val("");
                }
            });

            /**
             * 更改尾号
             */
            $(this.formSelector).on("click", "select.tail-number", function (e) {
                var payAccountId = $(e.currentTarget).val();
                $("input[name='result.payAccountId']").val(payAccountId);
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

            //修改选择尾号提示信息的地方
            $(this.formSelector).on("validate", "input[name='result.payAccountId']", function (e, message) {
                if (message) {
                    $("span[name=payAccountIdMsg]").html("<span class=\"tips orange\"><i class=\"mark plaintsmall\"></i>" + message + "</span>");
                    $("span[name=payAccountIdMsg]").show();
                    e.result = true;
                }
                else {
                    $("div[name=payAccountIdMsg]").hide();
                    e.result = false;
                }
            });
        },
        /**
         *更换支付方式
         */
        changeType: function (e) {
            $(this.formSelector + " label.bank").removeClass("select");
            var $target = $(e.currentTarget);
            $target.addClass("select");
            var type = $("input[name='result.rechargeType']:checked").val();
            $(".tail-number").hide();
            var payerBank = $("[name='result.payerBank']").val();
            var payAccountId = $("#accountMap" + payerBank + " option:nth-child(1)").val();
            if (type == 'atm_money' && $("#accountMap" + payerBank + " option").length > 1) {
                $('#accountMap' + payerBank).show();
            }
            $("#accountMap" + payerBank).val(payAccountId);
            $("input[name='result.payAccountId']").val(payAccountId);
        },
        /**
         * 立即存款
         * @param e
         * @param option
         */
        submit: function (e, option) {
            var amount = $("input[name='result.rechargeAmount']").val();
            var activityId = $("input[name=activityId]:checked").val();
            var payAccountId = $("input[name='result.payAccountId']").val();
            var code = $("input[name='code']").val();
            var rechargeType = $("input[name='result.rechargeType']:checked").val();
            var payerBank = $("input[name='result.payerBank']").val();
            var url = root + "/fund/recharge/company/atmCounterSecond.html?result.rechargeAmount=" + amount + "&result.rechargeType=" + rechargeType + "&result.payerBank=" + payerBank + "&result.payAccountId=" + payAccountId;
            if (activityId) {
                url = url + "&activityId=" + activityId;
            }
            if (code) {
                url = url + "&code=" + code;
            }
            $("#mainFrame").load(url);
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
                    url: root + '/fund/recharge/company/checkAmount.html',
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
                                        $("div.applysale").html(html);
                                        if (sales[0].preferential != true) {
                                            $("input[name=activityId]:eq('')").prop("checked", 'checked');
                                        }
                                    } else {
                                        $("div.applysale").find("input[type=radio]").attr("disabled", true);
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
         * 支付后回调
         * @param e
         * @param option
         */
        back: function (e, option) {
            $("#mainFrame").load(root + "/fund/recharge/online/onlinePay.html");
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
            var max = $("input[name=onlinePayMax]").val();
            var min = $("input[name=onlinePayMin]").val();
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
        /**
         * 展开其它优惠
         * @param e
         * @param option
         */
        expendSale: function (e, option) {
            $("tr.expendSales").show();
            $(e.currentTarget).hide();
            $(e.currentTarget).unlock();
        }
    });
});