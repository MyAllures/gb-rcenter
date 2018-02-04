/**
 * 管理首页-首页js
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
            this.formSelector = "form";
            this._super("form");
            var clip = new ZeroClipboard($('[name="copy"]'));
            clip.on('copy', function (e) {
                var $obj = $($(e)[0].target).find("a");
                window.top.topPage.customerPopover($obj, window.top.message.fund_auto['复制成功']);
            });
            this.realName = new RealName();
            this.realName.realName();
            window.top.onlineTransactionNo = null;
        },
        onPageLoad: function () {
            this._super();
            var rechargeType = $("input[name='result.rechargeType']").val();
            this.changeSale(rechargeType);
            this.initCaptcha();
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
                _this.changePayerBankMsg();
                $("input[name='result.payerBankcard']").valid();
            });

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
        },
        /**
         * 更换优惠
         */
        changeSale: function (rechargeType) {
            var amount = $("input[name='result.rechargeAmount']").val();
            var url = root + "/fund/playerRecharge/sale.html";
            var data = {};
            data.rechargeType = rechargeType;
            if (amount) {
                data.amount = amount;
            }
            window.top.topPage.ajax({
                url: url,
                dataType: 'json',
                data: data,
                success: function (data) {
                    if (data && data.length > 0) {
                        var len = data.length;
                        var html = $("#rechargeSale").render({
                            sales: data,
                            len: len,
                            isChecked: data[0].preferential
                        });
                        $("div.applysale").html(html);
                    } else {
                        $("div.applysale").find("input[type=radio]").attr("disabled", true);
                        $("input[name=activityId]:eq('')").attr("checked", 'checked');
                    }
                },
                error: function (data) {

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
                            var rechargeType = $("input[name='result.payAccountId']:checked").attr("data-type");
                            window.top.topPage.ajax({
                                url: root + '/fund/recharge/company/counterFee.html',
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
         * 更新存款金额的远程验证提示消息
         */
        changeAmountMsg: function () {
            var max = $(this.formSelector + " input[name=onlinePayMax]").val();
            var min = $(this.formSelector + " input[name=onlinePayMin]").val();
            if (!min || min == 0) {
                min = '1.00';
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
        changePayerBankMsg: function () {
            var msg = $("label[for='result.payerBankcard']").text();
            if(msg) {
                msg = msg.trim().replace(/[:：]$/, '').replace(/^\*/, "").trim();
            }
            msg = window.top.message.common['{org.soul.commons.validation.form.constraints.Depends.message}'].replace('{}', msg);
            this.extendValidateMessage({"result.payerBankcard": {required: msg}});
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
         * 更改验证消息
         */
        bindFormValidation: function () {
            this._super();
            this.changeAmountMsg();
        },
        /**
         * 更换收款账号
         * @param e
         */
        changeBank: function (e) {
            var $target = $(e.currentTarget);
            var text = $target.find("span[name=accountLabel]").text();
            var label = $target.find("input[name='result.payAccountId']:checked").attr("data-label");
            if (label != 'true') {
                $("label[for='result.payerBankcard']").text(text);
                var isTitle = $target.find("input[name='result.payAccountId']:checked").attr("data-title");
                if (isTitle == 'true') {
                    $("div[name='payerName']").show();
                } else {
                    $("div[name='payerName']").hide();
                }
                $("div[name='payerBankcard']").show();
            } else {
                $("div[name='payerBankcard']").hide();
            }
            $(this.formSelector + " label.bank").removeClass("select");
            $target.addClass("select");
            var rechargeType = $target.find("input[name='result.payAccountId']:checked").attr("data-type");
            this.changeSale(rechargeType);
            $("input[name='result.rechargeType']").val(rechargeType);
        },
        submit: function (e, option) {
            var payAccount = $("input[name='result.payAccountId']:checked").val();
            window.top.topPage.ajax({
                url: root + "/fund/recharge/company/electronicPaySecond.html",
                data: this.getCurrentFormData(e),
                type: 'POST',
                success: function (data) {
                    $("#mainFrame").html(data);
                }
            });
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