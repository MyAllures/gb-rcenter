/**
 * 第三方支付、电子支付
 */
define(['site/fund/recharge/CommonRecharge'], function (BaseEditPage) {
    return BaseEditPage.extend({
        realName: null,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form[name=ysfForm]";
            this._super(this.formSelector);
        },
        /**
         * 页面加载和异步加载时需要重新初始化的工作
         */
        onPageLoad: function () {
            this._super();
            this.changeSale();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            /**
             * 切换账号
             */
            $(this.formSelector).on("click", "label.bank", function (e) {
                _this.changeAccount($(this));
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
                _this.changeAmountMsg();
            });
        },
        changeAccount: function (obj) {
            var $target = $(obj).find("input[name=account]");
            $("label.bank").removeClass("select");
            $(obj).addClass("select");
            //存款金额范围提示
            var amountLimit = $target.attr("amountLimit");
            $("input[name='rechargeAmount']").attr("placeholder", amountLimit);
            //随机额度
            var isRandomAmount = $target.attr("randomAmount");
            if (isRandomAmount == 'true') {
                $("#rechargeDecimals").show();
            } else {
                $("#rechargeDecimals").hide();
            }
            this.changeAmountMsg();
        },
        /**
         * 更新存款金额的远程验证提示消息
         */
        changeAmountMsg: function () {
            var $target = $(this.formSelector + " label.bank.select");
            var $account = $target.find("input[name=account]");
            var max = $account.attr("payMax");
            var min = $account.attr("payMin");
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
            var ele = $(this.formSelector).find("input[name='result.rechargeAmount']");
            $.data(ele[0], "previousValue", null);
            if ($(ele).val()) {
                ele.valid();
            }
        },
        /**
         * 更改存款规则-更改存款金额的remote规则
         * @param $form
         * @returns {*}
         */
        getValidateRule: function ($form) {
            var rule;
            var $ruleDiv = $form.find('div[id=validateRule]');
            if ($ruleDiv.length > 0) {
                rule = eval("({" + $ruleDiv.text() + "})");
                rule.ignore = ".ignore";
            }
            if (!rule) {
                return null;
            }
            var _this = this;
            if (rule && rule.rules['result.rechargeAmount']) {
                var displayFee = $("input[name=displayFee]").val();
                rule.rules['result.rechargeAmount'].remote = {
                    url: root + '/fund/recharge/online/checkRechargeAmount.html',
                    cache: false,
                    type: 'POST',
                    data: {
                        'result.rechargeAmount': function () {
                            return $("[name='result.rechargeAmount']").val();
                        },
                        'account': function () {
                            return $(_this.formSelector + " input[name=account]:checked").val();
                        }
                    },
                    complete: function (data) {
                        if (data.responseText == "true") {
                            var rechargeAmount = $("[name='result.rechargeAmount']").val();
                            var rechargeType = $("[name='result.rechargeType']").val();
                            window.top.topPage.ajax({
                                url: root + '/fund/recharge/online/counterFee.html',
                                data: {"result.rechargeAmount": rechargeAmount, "type": rechargeType},
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
                                        $("div#applysale").find("input[type=radio]").attr("disabled", true);
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
         * 立即存款
         * @param e
         * @param option
         */
        submit: function (e, option) {
            var $account = $("input[name=account]:checked");
            var _window = window.open("", '_blank');
            _window.document.write("<div style='text-align:center;'><img style='margin-top:" + document.body.clientHeight / 2 + "px;' src='" + resRoot + "/images/022b.gif'></div>");

            window.top.topPage.ajax({
                url: root + "/fund/recharge/online/ysfSubmit.html",
                data: this.getCurrentFormData(e),
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    var state = data.state;
                    if (state == false && _window) {
                        _window.close();
                    }
                    var msg = data.msg;
                    if (state == true) {
                        window.top.onlineTransactionNo = data.transactionNo;
                        _window.location = root + "/fund/recharge/online/pay.html?search.transactionNo=" + data.transactionNo;
                    }
                    var url = root + "/fund/recharge/online/onlinePending.html?state=" + state;
                    window.top.onlineFailMsg = msg;
                    var btnOption = option;
                    btnOption.text = window.top.message.fund_auto['等待支付'];
                    btnOption.target = url;
                    btnOption.callback = "back";
                    window.top.topPage.doDialog(e, btnOption);
                    $(e.currentTarget).unlock();
                }
            })
        },
        /**
         * 更换优惠
         */
        changeSale: function () {
            var amount = $("input[name='result.rechargeAmount']").val();
            var rechargeType = $("[name='result.rechargeType']").val();
            var url = root + "/fund/recharge/online/changeScanType.html?rechargeType=" + rechargeType;
            if (amount) {
                url = url + "&amount=" + amount;
            }
            window.top.topPage.ajax({
                url: url,
                dataType: 'json',
                success: function (data) {
                    if (data && data.length > 0) {
                        var len = data.length;
                        var html = $("#rechargeSale").render({
                            sales: data,
                            len: len,
                            isChecked: data[0].preferential
                        });
                        $("div#applysale").html(html);
                    } else {
                        $("div#applysale").find("input[type=radio]").attr("disabled", true);
                        $("input[name=activityId]:eq('')").attr("checked", 'checked');
                    }
                }
            })
        }
    });
});