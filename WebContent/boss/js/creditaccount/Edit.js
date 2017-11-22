//模板页面
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function (title) {
            this.formSelector = "form#editForm";
            this._super();
            $('.help-popover').popover();
            if ($("#resultId").val() != "") {
                var key = $("[name='result.bankCode']").val();
                if (key != null && key != "") {
                    var e = {};
                    e.key = key;
                    e.page = this;
                    e.currentTarget = $("a[key=" + key + "]");
                    this.bankChannel(e);
                }
            }
        },
        /**
         * 页面加载和异步加载时需要重新初始化的工作
         */
        onPageLoad: function () {
            /**
             * super中已经集成了
             *      验证、
             *      chosen Select
             * 控件的初始化
             */
            this._super();
        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            //这里初始化所有的事件
            /**
             * 货币
             */
            $(this.formSelector).on("validate", "#currencyStr", function (e, message) {
                var currencyNum = $("input[name='currency']:checked").length;
                if (!currencyNum > 0) {
                    $(".currency").formtip(message);
                    e.result = true;
                }
            });
            /**
             * 选择全部支付类型
             */
            $(this.formSelector).on("click", "input[name=allPayTypes]", function () {
                var isChecked = $("input[name=allPayTypes]").prop("checked");
                if (isChecked) {
                    $("input[name='result.payTypes']").prop("checked", true);
                } else {
                    $("input[name='result.payTypes']").prop("checked", false);
                }
            });
            $(this.formSelector).on("input", "input[name=onLinePay]", function () {
                $("input.domainClass").val($("input[name=onLinePay]").val());
            });
        },
        savePlayer: function (e, option) {
            var that = this;
            //最大值有值最小值没值，赋默认值1
            var singleDepositMin = $("#singleDepositMin").val();
            var singleDepositMax = $("#singleDepositMax").val();
            if (singleDepositMin.length == 0 && singleDepositMax.length > 0) {
                $("#singleDepositMin").val(1);
            }
            //拼装货币
            var currencyStr = "";
            $('input[name="currency"]:checked').each(function (index) {
                var val = $(this).val();
                if (index == 0) {
                    currencyStr = currencyStr + val;
                } else {
                    currencyStr = currencyStr + "," + val;
                }
            });
            $("#currencyStr").val(currencyStr);
            //拼装接口参数json
            var jsonArray = [];
            var $form = $(this.getCurrentForm(e));
            var validate = $form.validate();
            var $column = $(".column");
            for (var index = 0; index < $column.length; index++) {
                var json = {};
                var column = $("#column" + index).val();
                var val = $("#val" + index).val();
                var view = $("#view" + index).val();
                if (!val) {
                    if(column=="payDomain"){
                        validate.settings.highlight.call(validate, $("#onLinePay"), validate.settings.errorClass, validate.settings.validClass);
                        $("#onLinePay").formtip('不能为空');
                    }else {
                        validate.settings.highlight.call(validate, $("#val" + index), validate.settings.errorClass, validate.settings.validClass);
                        $("#val" + index).formtip('不能为空');
                    }
                    return;
                }
                if(column=='payDomain') {
                    $("input[name='result.payUrl']").val(val.trim());
                }
                json.column = column.trim();
                json.value = val.trim();
                json.view = view.trim();
                jsonArray.push(json);
            }
            $("#channelJson").val(JSON.stringify(jsonArray));
            if (!$(this.formSelector).valid()) {
                return;
            }

            return true;
        }
        ,
        savePayAccountAndFlowOrder: function (e, opt) {
            if (opt.data.state) {
                window.top.topPage.showMainPage("/creditAccount/cashFlowOrder.html");
            }

        },

        bankChannel: function (e) {
            var _this = this;
            $(".payDomain").addClass("hide");
            $(".column").remove();
            $("#currenct").children().remove();
            var channel_code = e.key;
            window.top.topPage.ajax({
                url: root + '/creditAccount/queryChannelColumn.html',
                dataType: "json",
                data: {"channelCode": channel_code},
                success: function (data) {
                    for (var index = data.payApiParams.length - 1; index >= 0; index--) {
                        var name = "channelJson";
                        var domainClass = '';
                        var hide = '';
                        if (data.payApiParams[index].paramMean == "merchantCode") {
                            name = "result.account"
                        } else if (data.payApiParams[index].paramMean == "payDomain") {
                            $(".payDomain").removeClass("hide");
                            domainClass = "domainClass";
                            hide = 'hide';
                        }
                        var val = "";
                        var mean = data.payApiParams[index].paramMean || data.payApiParams[index].paramDesc;
                        if ($("[name='" + mean + "']")) {
                            val = $("[name='" + mean + "']").val();
                            if (!val) {
                                val = "";
                            }
                        }
                        if (data.payApiParams[index].paramMean == 'payDomain') {
                            val = $("[name='" + mean + "']").val();
                            var e = {};
                            e.key = val;
                            _this.onLinePay(e, null);
                        }
                        val = !val ? "" : val;
                        var newVar = data.payApiParams[index].paramDesc || window.top.message.content['pay_channel.' + channel_code + "." + data.payApiParams[index].paramMean]
                            || window.top.message.content['pay_channel.' + data.payApiParams[index].paramMean];
                        var CloneHtml = "<div class='form-group clearfix line-hi34 column " + hide + "'>\
                                   <input type='hidden' id='column" + index + "' value='" + data.payApiParams[index].paramName + "'/>\
                                   <input type='hidden' id='view" + index + "' value='" + data.payApiParams[index].paramMean + "'/>\
                                   <input type='hidden' id='" + data.payApiParams[index].paramMean + "' value='column" + index + "'/>\
                                   <label class='ft-bold col-sm-3 al-right line-hi34'><span\
                              class='co-red m-r-sm'>*</span>" + newVar + "：</label>\
                              <div class='col-sm-5'>\
                                  <div class='input-group date'><input class='form-control " + domainClass + "' id='val" + index + "' name='" + name + "' value='" + val + "'/><span\
                              class='input-group-addon bdn'>&nbsp;&nbsp;</span>\
                              </div>\
                              </div>\
                              </div>";
                        $(".third").after(CloneHtml);
                    }
                    //删除子元素
                    var currencys = $("#old-currency-div").text();
                    var curs;
                    if (currencys) {
                        currencys = currencys.trim();
                        curs = currencys.split(",");

                    }
                    $(data.supportCurrencies).each(function (index) {
                        var supportCurrencies = data.supportCurrencies;
                        var checked = "";
                        if (curs) {
                            for (var i = 0; i < curs.length; i++) {
                                if (curs[i] == supportCurrencies[index]) {
                                    checked = "checked";
                                    break;
                                }
                            }
                        }
                        var currency = "<label class='m-r-sm'><input name='currency' type='checkbox' class='i-checks' " + checked +
                            " value='" + supportCurrencies[index] + "'> " + window.top.message.common[supportCurrencies[index]] + "</label>";
                        $("#currenct").append(currency);
                    });
                    //支持终端
                    var supportTerminalSet = data.supportTerminalSet;
                    var $terminal = $("input[name='result.terminal']");
                    $terminal.attr("disabled", true);
                    var checked = $("input[name='result.terminal']:checked").val();
                    for (var i = 0; i < supportTerminalSet.length; i++) {
                        var terminal = supportTerminalSet[i];
                        if (terminal == '0' && checked) {
                            $terminal.removeAttr("disabled");
                            break;
                        } else if (terminal == '0' && !checked) {
                            $("input[name='result.terminal']").prop("checked", false);
                            $terminal.removeAttr("disabled");
                            $("input[name='result.terminal']:eq(0)").prop("checked", true);
                            break;
                        } else if (terminal == checked) {
                            $terminal.removeAttr("disabled");
                            break;
                        } else {
                            $("input[name='result.terminal']").prop("checked", false);
                            $("input[name='result.terminal']:eq(" + terminal + ")").removeAttr("disabled");
                            $("input[name='result.terminal']:eq(" + terminal + ")").prop("checked", true);
                        }
                    }
                }
            })
        },
        onLinePay: function (e, option) {
            $("input.domainClass").val(!e.key ? "" : e.key);
        },
        saveCallbak: function () {
            window.top.topPage.goToLastPage(true);
        },
        revertDepositTotal: function (e, opt) {
            var id = $("#resultId").val();
            window.top.topPage.ajax({
                url: root + '/payAccount/revertData.html',
                dataType: "json",
                data: {"id": id},
                success: function (data) {
                    if (data != null) {
                        $("[name='result.depositTotal']").val(data.depositDefaultTotal);
                    }
                    $(e.currentTarget).unlock();
                }
            });
        },
        revertDepositCount: function (e, opt) {
            var id = $("#resultId").val();
            window.top.topPage.ajax({
                url: root + '/payAccount/revertData.html',
                dataType: "json",
                data: {"id": id},
                success: function (data) {
                    if (data != null) {
                        $("[name='result.depositCount']").val(data.depositDefaultCount);
                    }
                    $(e.currentTarget).unlock();
                }
            });
        }
    });
});