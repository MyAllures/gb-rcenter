/**
 * 线上支付
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
            this.formSelector = "form[name=onlineForm]";
            this._super(this.formSelector);
            this.realName = new RealName();
            var realNameDialog = $("input[name=realNameDialog]").val();
            if (!realNameDialog) {
                this.realName.realName();
            }
        },
        /**
         * 页面加载和异步加载时需要重新初始化的工作
         */
        onPageLoad: function () {
            this._super();
            this.initCaptcha();
            this.showRandomAmountMsg();
            window.top.onlineTransactionNo = null;
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            //更换存款银行
            $(this.formSelector).on("click", "label.bank", function (e) {
                _this.changeBank(e);
            });

            $(this.formSelector).on("change", "input[name='result.payerBank']", function (e) {
                _this.changeValid(e);
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
         * 显示/隐藏随机额度提示信息
         */
        showRandomAmountMsg:function () {
            //var flag = $("input[name='randomAmount']");
            var flag = $("#randomAmount").val();
            if(flag=="false"||flag==""){
                $('#randomAmountMsg').addClass('tiphide');
                return;
            }
            $('#randomAmountMsg').removeClass('tiphide');
            return;
        },

        /**
         * 更换存款银行
         */
        changeBank: function (e) {
            $(this.formSelector + " label.bank").removeClass("select");
            var $target = $(e.currentTarget);
            $target.addClass("select");
        },
        changeValid: function (e) {
            var $target = $(e.currentTarget).parent().parent();
            var max = $target.find("input.onlinePayMax").val();
            var min = $target.find("input.onlinePayMin").val();
            if (!min) {
                min = 1;
            }
            if (!max) {
                max = '99,999,999';
            }
            $("#depositMin").text(min);
            $("#depositMax").text(max);
            this.changeAmountMsg();
            $(this.formSelector + " span.fee").hide();
            var ele = $(this.formSelector).find("input[name='result.rechargeAmount']");
            $.data(ele[0], "previousValue", null);
            if ($(ele).val()) {
                ele.valid();
            }
        },
        /**
         * 线上支付-立即存款
         * @param e
         * @param option
         */
        submit: function (e, option) {
            var _window = window.open("", '_blank');
            _window.document.write("<div style='text-align:center;'><img style='margin-top:" + document.body.clientHeight / 2 + "px;' src='" + resRoot + "/images/022b.gif'></div>");
            var _this = this;
            window.top.topPage.ajax({
                url: root + "/fund/recharge/online/onlineSubmit.html",
                loading: true,
                data: this.getCurrentFormData(e),
                dataType: 'json',
                success: function (data) {
                    var state = data.state;
                    var msg = data.msg;
                    if (state) {
                        window.top.onlineTransactionNo = data.transactionNo;
                        _window.location = root + "/fund/recharge/online/pay.html?search.transactionNo=" + data.transactionNo;
                    } else {
                        _window.close();
                    }
                    var url = root + "/fund/recharge/online/onlinePending.html?state=" + state;
                    if (msg) {
                        url = url + "&msg=" + msg;
                    }
                    var btnOption = {};
                    btnOption.text = window.top.message.fund_auto['等待支付'];
                    btnOption.target = url;
                    btnOption.callback = "back";
                    window.top.topPage.doDialog(e, btnOption);
                },
                error: function (data) {
                    _window.close();
                }
            });
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
                    url: root + '/fund/recharge/online/checkOnlineRechargeAmount.html',
                    cache: false,
                    type: 'POST',
                    data: {
                        'result.rechargeAmount': function () {
                            return $("[name='result.rechargeAmount']").val();
                        },
                        'result.payerBank': function () {
                            return $("[name='result.payerBank']:checked").val();
                        }
                    },
                    complete: function (data) {
                        if (data.responseText == "true") {
                            var rechargeAmount = $($form).children().find("[name='result.rechargeAmount']").val();
                            window.top.topPage.ajax({
                                url: root + '/fund/recharge/online/counterFee.html',
                                data: {"result.rechargeAmount": rechargeAmount, "type": 'online_deposit'},
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
            if (e.returnValue == true) {
                var $select = $(".sidebar-nav .select", window.top.document);
                $select.removeClass("select");
                var $current = $(".sidebar-nav a[data^='/fund/transaction/list.html']", window.top.document);
                $current.parent().addClass("select");
                $current.click();
            } else {
                var $current = $(".sidebar-nav a[data^='/fund/playerRecharge/recharge.html']", window.top.document);
                $current.parent().addClass("select");
                $("#mainFrame").load(root + "/fund/recharge/online/onlinePay.html?realNameDialog=true");
            }
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
            var $target = $(this.formSelector + " label.bank.select");
            var max = $target.find("input.onlinePayMax").val();
            var min = $target.find("input.onlinePayMin").val();
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