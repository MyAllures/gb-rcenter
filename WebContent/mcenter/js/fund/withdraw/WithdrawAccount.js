/**
 * 出款账户
 */
define(['common/BaseEditPage','bootstrapswitch'], function (BaseEditPage) {
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
            var key = $("[name='result.paramValue']").val();
            if (key != null && key != "") {
                var e = {};
                e.key = key;
                e.page = this;
                e.currentTarget = $("a[key=" + key + "]");
                this.bankChannel(e);
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

        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;

        },
        initSwitch:function(){
            var _this=this;
            var $bootstrapSwitch = $("[name='my-checkbox']");
            this.unInitSwitch($bootstrapSwitch)
                .bootstrapSwitch({
                        onText: window.top.message.common['enable'],
                        offText: window.top.message.common['forbidden'],
                        onSwitchChange: function (e, state) {
                            $("[name='result.active']").val(state);
                        }
                    }
                );
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
                    for (var index = data.payApiParams.length - 1; index >= 0; index--) {
                        var name = "channelJson";
                        var domainClass = '';
                        var hide = '';
                        if (data.payApiParams[index].paramMean == "merchantCode") {
                            name = "result.paramValue"
                        } else if (data.payApiParams[index].paramMean == "payDomain") {
                            $(".payDomain").removeClass("hide");
                            domainClass = "domainClass";
                            hide = 'hide';
                        }else if(data.payApiParams[index].paramMean == "key"){
                            name = "result.paramValue"
                        }else if(data.payApiParams[index].paramMean == "publicKey"){
                            name = "result.paramValue"
                        }else if(data.payApiParams[index].paramMean == "private_key"){
                            name = "result.paramValue"
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
                        var a ;
                        if ($("#withdrawChannel").val() == "fengyunjuhe"){

                             a = $("#withdrawChannel").val();
                        }

                        var b = $("#middleValue").val(a);

                        if ($("#withdrawChannel").val() != b.val()){
                            val = "";
                        }
                        var newVar = data.payApiParams[index].paramDesc || window.top.message.content['pay_channel.' + channel_code + "." + data.payApiParams[index].paramMean]
                            || window.top.message.content['pay_channel.' + data.payApiParams[index].paramMean];
                        var CloneHtml = "<div class='form-group clearfix line-hi34 column " + hide + "'>\
                                   <input type='hidden' id='column" + index + "' value='" + data.payApiParams[index].paramName + "'/>\
                                   <input type='hidden' id='view" + index + "' value='" + data.payApiParams[index].paramMean + "'/>\
                                   <input type='hidden' id='" + data.payApiParams[index].paramMean + "' value='column" + index + "'/>\
                                   <label class='col-xs-3 al-right'><span\
                              class='co-red m-r-sm'>*</span>" + newVar + "：</label>\
                              <div class='col-xs-8 p-x'>\
                                  <div class='input-group date'><input class='form-control " + domainClass + "' id='val" + index + "' name='" + name + "' value='" + val + "'/><span\
                              class='input-group-addon bdn'>&nbsp;&nbsp;</span>\
                              </div>\
                              </div>\
                              </div>";
                        // window.top.message.content['pay_channel.'+data.payApiParams[index].paramMean]
                        $(".third").append(CloneHtml);
                    }
                    //删除子元素
                    /*var currencys = $("#old-currency-div").text();
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
                    });*/
                    //支持终端
                    /*var supportTerminalSet = data.supportTerminalSet;
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
                    }*/
                    _this.resizeDialog();
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


        accountValidateForm: function (e,opt) {
            var isActive = $("[name='result.active']").val();
            var withdrawChannel=$("#withdrawChannel").val();
            var merchantCode=$("#merchantCode").val();
            var platformId=$("#platformId").val();
            var key=$("#key").val();
            var publickKey=$("#publicKey").val();
            var privateKey=$("#private_key").val();

            isUndefined(key);

            if(isActive=="true"){
                if (withdrawChannel==null||withdrawChannel==""){
                    page.showPopover(e,opt,"danger","出款渠道不能为空",true);
                    return false;
                }else if (merchantCode==null||merchantCode==""){
                    page.showPopover(e,opt,"danger","商户号不能为空",true);
                    return false;
                }else if (key==null||key==""){
                    page.showPopover(e,opt,"danger","秘钥不能为空",true);
                    return false;
                }
            }
            return true;
        },

        isUndefined:function (value){
        //获得undefined，保证它没有被重新赋值
        var undefined = void(0);
        return value === undefined;
        },

        /**
         * 示例删除回调函数
         * @param e             事件对象
         * @param option        Button标签的参数
         */
        saveCallbak: function (e, option) {
            if (e.returnValue == true) {
                this.returnValue=true;
                window.top.topPage.closeDialog();
            }
        }

    });
});