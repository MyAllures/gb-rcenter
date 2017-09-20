//模板页面
define(['common/BaseEditPage', 'bootstrap-dialog','bootstrapswitch'], function (BaseEditPage, BootstrapDialog,Bootstrapswitch) {

    return BaseEditPage.extend({
        bootstrapswitch:Bootstrapswitch,
        bootstrapDialog: BootstrapDialog,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function (title) {
            this.formSelector = "form";
            this._super();
            this.loadPageField();

            $(".maxFee").text("≤"+$("#withdrawMaxFee").val());

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
            //输入0时，按比例收费和固定收费输入框禁用；
            $(this.formSelector).on("change", "#withdrawMaxFee", function () {
                var withdrawMaxFee = $("#withdrawMaxFee").val();
                if (withdrawMaxFee == '0'||withdrawMaxFee=="") {
                    $(".withdrawFeeType").attr("disabled", "disabled");
                    $("input[name='withdrawFeeTypeRedio']").attr("disabled", "disabled");
                    $(".withdrawFeeType").val("");
                } else {
                    //当手续费上限金额未填时，按比例收费和固定收费输入框禁用；
                    if (withdrawMaxFee.length < 1) {
                        $("input[name='withdrawFeeType']").attr("disabled", "disabled");
                        $("input[name='withdrawFeeTypeRedio']").attr("disabled", "disabled");
                        $(".withdrawFeeType").val("");
                        /*$("input[name='txFeeVal']").attr("disabled", "disabled");
                        $("input[name='txFeeVal']").val("");*/
                    } else {
                        var withdrawFeeType = $("input[name='withdrawFeeTypeRedio']:checked").val();
                        $("input[name='withdrawFeeTypeRedio']").removeAttr("disabled");
                        if(withdrawFeeType==2){
                            $("#Type1").val("");
                            $("#Type1").attr("disabled", "disabled");
                            $("#Type2").removeAttr("disabled");
                        }else{
                            $("#Type2").val("");
                            $("#Type2").attr("disabled", "disabled");
                            $("#Type1").removeAttr("disabled");
                        }
                    }
                }
                _this.loadFee();

            });
            //改变按比例收费和固定收费的文本框内容
            $(this.formSelector).on("change", "[name='withdrawFeeTypeRedio']", function () {
                var checkedVal = $("input[name='withdrawFeeTypeRedio']:checked").val();
                $("input[name='result.withdrawFeeType']").val(checkedVal);
                var withdrawMaxFee = $("#withdrawMaxFee").val();
                if(withdrawMaxFee!="0"){
                    if (checkedVal == 1) {
                        $("#Type2").attr("disabled", "disabled");
                        $("#Type2").val("");
                        $("#Type1").removeAttr("disabled");
                    } else {
                        $("#Type2").removeAttr("disabled");
                        $("#Type1").attr("disabled", "disabled");
                        $("#Type1").val("");
                    }
                }
            });
            //每输入一个字符就判断是不是数字，不是数字就清空内容边框变红
            $(this.formSelector).on("keyup", ".withdrawFeeType", function () {
                var reg =/\d+[\.\d{2}]{0,1}/;
                if (!reg.test($(this).val())) {
                    //如果不是数字
                    $(this).val("");
                    $(this).css("border", "1px solid red");
                } else {
                    $(this).css("border", "");
                }
            });
            //失去焦点，重置边框

            $(this.formSelector).on("blur", ".withdrawFeeType", function () {
                $(this).css("border", "");
            });
            //启用取款审核，处理时间输入框可用，否则不可用
            $(this.formSelector).on("switchChange.bootstrapSwitch", "#isWithdrawLimit", function (event, state) {
                 $("input[name='result.isWithdrawLimit']").val(state);
                if (state) {
                    $("#withdrawCount").removeAttr("disabled");
                } else {
                    $("#withdrawCount").attr("disabled", "disabled");
                    $("#withdrawCount").val("");
                }
            });
            //启用普通提现审核，处理时间输入框可用，否则不可用
            $(this.formSelector).on("switchChange.bootstrapSwitch", "#withdrawCheckStatus", function (event, state) {

                $("input[name='result.withdrawCheckStatus']").val(state);
                if (state) {
                    $("#withdrawCheckTime").removeAttr("disabled");
                } else {
                    $("#withdrawCheckTime").attr("disabled", "disabled");
                    $("#withdrawCheckTime").val("");
                }
            });
            //启用超额提现审核，处理时间输入框可用，否则不可用
            $(this.formSelector).on("switchChange.bootstrapSwitch", "#withdrawExcessCheckStatus", function (event, state) {
                $("input[name='result.withdrawExcessCheckStatus']").val(state);
                if (state) {
                    $("#withdrawExcessCheckTime").removeAttr("disabled");
                    $("#withdrawExcessCheckNum").removeAttr("disabled");
                } else {
                    $("#withdrawExcessCheckTime").attr("disabled", "disabled");
                    $("#withdrawExcessCheckNum").attr("disabled", "disabled");
                    $("#withdrawExcessCheckTime").val("");
                    $("#withdrawExcessCheckNum").val("");
                }
            });
            //复选框
            //switch
            this.unInitSwitch($("[name='my-checkbox']"))
                .bootstrapSwitch();
            $(this.formSelector).on("blur", "#withdrawMaxFee", function () {
                 $(".maxFee").text("≤"+$(this).val());
            });
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                placement: 'top'
            });
        },
        loadPageField: function () {
            this.loadFee();
            //当手续费上限金额未填时，按比例收费和固定收费输入框禁用；
            var withdrawMaxFee = $("#withdrawMaxFee").val();
            var withdrawFeeType=$("input[name='result.withdrawFeeType']").val();
            if (withdrawMaxFee.length < 1) {
                $("input[name='withdrawFeeTypeRedio']").attr("disabled", "disabled");
                $("input[name='txFeeVal']").attr("disabled", "disabled");
            }else{
                //默认比例可填
                $("input[name='withdrawFeeTypeRedio'][value='"+withdrawFeeType+"']").attr("checked",true);
                $("#Type"+withdrawFeeType).val($("input[name='result.withdrawFeeNum']").val());

            }
        },
        saveWithdrawLimit: function (e) {
            var _this = this;
            _this.parentTarget = e.currentTarget;

            //时限跟免手续费次数需都设置后才能生效；
            var withdrawTimeLimit = $("#withdrawTimeLimit").val();
            var withdrawFreeCount = $("#withdrawFreeCount").val();
            if ((!withdrawTimeLimit&&withdrawFreeCount)||(withdrawTimeLimit&&!withdrawFreeCount)) {
                if (_this.parentTarget == undefined || $(e.currentTarget).attr("isContinue") != 1) {
                    window.top.topPage.bootstrapDialog.show({
                        type: BootstrapDialog.TYPE_PRIMARY,
                        title: window.top.message.common['notice'],
                        message:window.top.message.playerRank['withdrawlimit.txTimeLimitOrtxFreeCountBlank'],
                        buttons: [{
                            label: window.top.message.playerRank['withdrawlimit.returnSetting'],
                            action: function (dialog) {
                                dialog.options.callback(false);
                                dialog.close();
                            }
                        }, {
                            label: window.top.message.playerRank['withdrawlimit.continueCommit'],
                            action: function (dialog) {
                                dialog.options.callback(true);
                                dialog.close();
                            }
                        }],
                        callback: function (val) {
                            if (val) {
                                $(e.currentTarget).attr("isContinue", 1);
                                $(e.currentTarget).click();
                            }
                        }
                    });
                    return false;
                }
                $(e.currentTarget).attr("isContinue", 0);

            }
            //手续费收费相关判断和保存
            var withdrawMaxFee = $("#withdrawMaxFee").val();
            var withdrawFeeType = $("input[name='withdrawFeeTypeRedio']:checked").val();
            if (withdrawMaxFee > 0) {
                $("input[name='result.withdrawFeeType']").val(withdrawFeeType);
                $("input[name='result.withdrawFeeNum']").val($("#Type" + withdrawFeeType).val());
            } else {
                $("input[name='result.withdrawFeeNum']").val("");
            }
            $("input[name='result.isWithdrawLimit']").val($("#isWithdrawLimit").is(":checked"));
            $("input[name='result.withdrawCheckStatus']").val($("#withdrawCheckStatus").is(":checked"));
            $("input[name='result.withdrawExcessCheckStatus']").val($("#withdrawExcessCheckStatus").is(":checked"));
           if (!this.validateForm(e)) {
                return false;
            }
            return true;
        },
        //加载按比例收费和固定收费单选框和input状态
        loadFee: function () {
            var withdrawFeeType = $("#withdrawFeeType").val();
            $("input[name='withdrawFeeType'][value='" + withdrawFeeType + "']").attr("checked", true);
            if (withdrawFeeType == 1) {
                $("#Type2").attr("disabled", "disabled");
            } else if (withdrawFeeType == 2) {
                $("#Type1").attr("disabled", "disabled");
            }
            $("#Type" + withdrawFeeType).val($("#withdrawFeeNum").val());
        },
        copyParam: function (e,option) {
            //复制参数
                var copyParameter = e.key;

                if (copyParameter) {
                    window.top.topPage.ajax({
                        url: root + '/playerRank/copyParameter.html',
                        dataType: "json",
                        data: {"search.id": copyParameter},
                        success: function (data,state) {
                            $("input[name='my-checkbox']").bootstrapSwitch('state', false, false);
                            $("input[type='text']").val("");
                            $("#withdrawTimeLimit").val(data.result.withdrawTimeLimit);
                            $("#withdrawFreeCount").val(data.result.withdrawFreeCount);

                            $("#withdrawMaxFee").val(data.result.withdrawMaxFee);
                            $("#withdrawMaxFee").focus();
                            $("#withdrawMaxFee").blur();
                            //比例 固定 禁用 值清空
                            $(".withdrawFeeType").attr("disabled", "disabled");

                            if(!data.result.withdrawMaxFee>0){
                                $("#withdrawMaxFee0").show();
                                $("input[name='txFeeVal']").attr("disabled", "disabled");
                                $("input[name='txFeeVal']").val("");
                                $("input[name='withdrawFeeTypeRedio']").attr("disabled", "disabled");
                            }else{
                                $("input[name='withdrawFeeTypeRedio']").removeAttr("disabled");
                                $("input[name='withdrawFeeTypeRedio'][value='" + data.result.withdrawFeeType + "']").attr("checked", true);
                                //$("input[name='withdrawFeeTypeRedio'][value='" + data.result.withdrawFeeType + "']").removeAttr("disabled");
                                $("#Type"+ data.result.withdrawFeeType).removeAttr("disabled");
                                $("#Type"+ data.result.withdrawFeeType).val(data.result.withdrawFeeNum);

                            }
                        //    //是否启用取款审核
                            if (data.result.isWithdrawLimit) {
                                $("#isWithdrawLimit").bootstrapSwitch('state', true, true);
                                $("#withdrawCount").removeAttr('disabled');
                                $("#withdrawCount").val(data.result.withdrawCount);
                            } else {
                                $("#withdrawCount").val("");
                                $("#withdrawCount").attr("disabled", "disabled");
                                $("#isWithdrawLimit").bootstrapSwitch('state', false, false);
                            }
                        //    //是否启用提现审核1
                            if (data.result.withdrawCheckStatus) {
                                $("#withdrawCheckStatus").bootstrapSwitch('state', true, true);
                                $("#withdrawCheckTime").removeAttr('disabled');
                                $("#withdrawCheckTime").val(data.result.withdrawCheckTime);
                            } else {
                                $("#withdrawCheckTime").val("");
                                $("#withdrawCheckTime").attr("disabled", "disabled");
                                $("#withdrawCheckStatus").bootstrapSwitch('state', false, false);
                            }
                        //    // 是否启用超额提现审核
                            if (data.result.withdrawExcessCheckStatus) {
                                $("#withdrawExcessCheckStatus").bootstrapSwitch('state', true, true);
                                $("#withdrawExcessCheckNum").removeAttr("disabled");
                                $("#withdrawExcessCheckTime").removeAttr("disabled");
                            } else {
                                $("#withdrawExcessCheckStatus").bootstrapSwitch('state', false, false);
                                $("#withdrawExcessCheckNum").val("");
                                $("#withdrawExcessCheckTime").val("");
                                $("#withdrawExcessCheckNum").attr("disabled", "disabled");
                                $("#withdrawExcessCheckTime").attr("disabled", "disabled");
                            }
                            $("#withdrawExcessCheckNum").val(data.result.withdrawExcessCheckNum);
                            $("#withdrawExcessCheckTime").val(data.result.withdrawExcessCheckTime);
                            $("#withdrawMaxNum").val(data.result.withdrawMaxNum);
                            $("#withdrawMinNum").val(data.result.withdrawMinNum);
                            $("#withdrawNormalAudit").val(data.result.withdrawNormalAudit);
                            $("#withdrawAdminCost").val(data.result.withdrawAdminCost);
                            $("#withdrawRelaxCredit").val(data.result.withdrawRelaxCredit);
                            $("#withdrawDiscountAudit").val(data.result.withdrawDiscountAudit);
                        }
                    });
                } else {
                    $("input").val("");
                    $("input[name='my-checkbox']").bootstrapSwitch('state', false, false);

                }
        },
        saveReturnCallbak: function () {
            $("#saveReturnCallbak").click();
        }
    });
});