/**
 * 线上支付
 */
define(['site/fund/recharge/BaseEditPage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        realName: null,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form[name=scanElectronicForm]";
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
                    url: root + '/fund/recharge/ScanElectronic/checkRechargeAmount.html',
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
                            if (!rechargeType) {
                                rechargeType = 'online_deposit';
                            }
                            window.top.topPage.ajax({
                                url: root + '/fund/recharge/ScanElectronic/counterFee.html',
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
        }
    });
});