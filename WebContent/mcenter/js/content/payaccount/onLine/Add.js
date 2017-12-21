//模板页面
define(['common/BaseEditPage','bootstrapswitch', 'jschosen'], function (BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function (title) {
            this.formSelector = "form";
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
                key = $("[name='result.payType']").val();
                if (key != null && key != "") {
                    var el = {};
                    el.key = key;
                    el.page = this;
                    el.currentTarget = $("a[key=" + key + "]");
                    this.bankChannel(el);
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
            this.initSwitch();
            $("[name='result.bankCode']", this.formSelector).chosen({
                no_results_text: window.top.message.fund_auto['没有找到']
            });
            var _this = this;
            $("[name='result.bankCode']", this.formSelector).chosen().change(function (item) {
                var _e = {'key': $(item.target).val()};
                _this.bankChannel(_e);
            });
            $("[name='result.payType']", this.formSelector).chosen({
                no_results_text: window.top.message.fund_auto['没有找到']
            });
            $("[name='result.payType']", this.formSelector).chosen().change(function (item) {
                var _e = {'key': $(item.target).val()};
                _this.bankChannel(_e);
            });
        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            //这里初始化所有的事件
            $(this.formSelector).on("change", "#fullRank", function () {
                var sta = $(this).is(':checked');
                $("input[name='result.fullRank']").val(sta);
                if (sta) {
                    $(".allRank").addClass('hide');
                    $("input[name='rank']").prop('checked', true);
                } else {
                    $(".allRank").removeClass('hide');
                    $("input[name='rank']").prop('checked', false);
                }
            });

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
             * 层级
             */
            $(this.formSelector).on("validate", "#rankStr", function (e, message) {
                var currencyNum = $("input[name='rank']:checked").length;
                if (!currencyNum > 0) {
                    $(".rank").formtip(message);
                    e.result = true;
                }
            });
            /**
             * 域名
             */
            $(this.formSelector).on("validate", ".domainClass", function (e, message) {
                if (message && $(this).is(":hidden")) {
                    $("#onLinePay").formtip(window.top.message.content_auto['请选择域名']);
                    e.result = true;
                }
                else {
                    e.result = false;
                }
            });
            /**
             * 异步加载存款渠道
             */
            $("#SelectPayment").change(function (e, option) {
                var paytype = $("#SelectPayment").find("option:selected").val();
                window.top.topPage.ajax({
                    url: root + '/payAccount/loadPayType.html',
                    dataType: "json",
                    data: {"paytype": paytype},
                    success: function (data) {
                        if (data != null) {
                            var $select = $("#selectDeposit");
                            var html = '<option value="">'+window.top.message.content_auto["请选择支付渠道"]+'</option>';
                            var bankList = data.bankList;
                            for (var index = 0; index < bankList.length; index++) {
                                var bank = bankList[index];
                                html = html + '<option value="' + bank.bankName + '" ${command.result.bankCode==' + bank.bankName + '?"selected":""}>' + bank.bankShortName + '</option>';
                            }
                            $select.html(html);
                            $select.trigger("chosen:updated"); // bind  .chosen
                        }
                    }
                });
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
            //拼装层级
            var rankStr = "";
            $('input[name="rank"]:checked').each(function (index) {
                var val = $(this).val();
                if (index == 0) {
                    rankStr = rankStr + val;
                } else {
                    rankStr = rankStr + "," + val;
                }
            });
            $("#rankStr").val(rankStr);
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
                json.column = column.trim();
                json.value = val.trim();
                json.view = view.trim();
                jsonArray.push(json);
            }
            $("#channelJson").val(JSON.stringify(jsonArray));
            //域名没填写
            if ($("input").hasClass("domainClass")) {
                if (!$(".domainClass").val()) {
                    $("#onLinePay").formtip(window.top.message.content_auto['请选择域名']);
                    return;
                }
            }
            if (!this.validateForm(e)) {
                return;
            }

            return true;
        }
        ,
        savePayAccountAndFlowOrder: function (e, opt) {
            if (opt.data.state) {
                $("#savePlsyer").click();
            }

        },

        bankChannel: function (e) {
            var _this = this;
            $(".payDomain").addClass("hide");
            $(".column").remove();
            $("#currenct").children().remove();
            var channel_code = e.key;
            window.top.topPage.ajax({
                url: root + '/payAccount/queryChannelColumn.html',
                dataType: "json",
                data: {"channelCode": channel_code},
                success: function (data) {
                    for (var index = data.payApiParams.length - 1;index >= 0;index--){
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
                        // window.top.message.content['pay_channel.'+data.payApiParams[index].paramMean]
                        $(".third").after(CloneHtml);
                    }
                    //删除子元素
                    var currencys = $("#old-currency-div").text();
                    var curs;
                    if (currencys) {
                        currencys = currencys.trim();
                        curs = currencys.split(",");

                    }
                    $(data.openAndSupportList).each(function (index) {
                        var openAndSupportList = data.openAndSupportList;
                        var checked = "";
                        if (curs) {
                            for (var i = 0; i < curs.length; i++) {
                                if (curs[i] == openAndSupportList[index].code) {
                                    checked = "checked";
                                    break;
                                }
                            }
                        }


                        var currency = "<label class='m-r-sm'><input name='currency' type='checkbox' class='i-checks' " + checked +
                            " value='" + openAndSupportList[index].code + "'> " + window.top.message.common[openAndSupportList[index].code] + "</label>";
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
                data: {"id": id,},
                success: function (data) {
                    if (data != null) {
                        $("[name='result.depositCount']").val(data.depositDefaultCount);
                    }
                    $(e.currentTarget).unlock();
                }
            });
        },
        initSwitch:function(){
            var _this=this;
            var $bootstrapSwitch = $("[name='my-checkbox']");
            this.unInitSwitch($bootstrapSwitch)
                .bootstrapSwitch({
                        onText: window.top.message.common['enable'],
                        offText: window.top.message.common['forbidden'],
                        onSwitchChange: function (e, state) {
                            $("[name='result.randomAmount']").val(state);
                        }
                    }
                );
        }
    });
});