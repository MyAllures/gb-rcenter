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
            $(this.formSelector).on("input", "input[name=onLinePay]", function () {
                $("input.domainClass").val($("input[name=onLinePay]").val());
            });
        },
        savePre: function (e, option) {
            var that = this;

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
                        validate.settings.highlight.call(validate, $("[name=onLinePay]"), validate.settings.errorClass, validate.settings.validClass);
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
        },

        bankChannel: function (e) {
            var _this = this;
            $(".payDomain").addClass("hide");
            $(".column").remove();
            $("#currenct").children().remove();
            var channel_code = e.key;
            window.top.topPage.ajax({
                url: root + '/withdrawAccount/queryChannelColumn.html',
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
                }
            })
        },
        onLinePay: function (e, option) {
            $("input.domainClass").val(!e.key ? "" : e.key);
        },
        saveCallbak: function (event) {
            if(event.returnValue==true)
            {
                window.top.topPage.goToLastPage(true);
            }
        }
    });
});