/**
 * Created by bruce on 17-1-30.
 */
define(['site/deposit/BaseDeposit'], function (BaseDeposit) {
    var ajaxMap = {};
    return BaseDeposit.extend({

        init: function (formSelector) {
            this._super(formSelector);
        },

        onPageLoad: function () {
            this._super();
            mui('.mui-scroll-wrapper').scroll({
                scrollY: true, //是否竖向滚动
                scrollX: false, //是否横向滚动
                startX: 0, //初始化时滚动至x
                startY: 0, //初始化时滚动至y
                indicators: false, //是否显示滚动条
                deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
                bounce: false //是否启用回弹
            });
        },

        bindEvent: function () {
            this._super();
        },

        submit: function (options) {
            var _this = this;
            mui(".main-contents").off("tap","#submitAmount");
            mui(".main-contents").on("tap", "#submitAmount", function () {
                if (document.activeElement) {
                    document.activeElement.blur();
                }
                var $form;
                if(options.statusNum){
                    $form = options.fromId;
                }else{
                    $form = $(_this.formSelector);
                }
                var channel = "";
                if(!$form || !$form[0]) {
                    var $active =$("#depositWay li a.active");
                    if($active.attr("data-fast")) {
                        $form = $("#electronicCashForm");
                        channel = "electronic";
                    } else if($active.attr("data-company")) {
                        $form = $("#companyCashForm");
                        channel = "company";
                    }
                }else{
                    channel = options.depositType;
                }
                if ($form && !$form.valid()) {
                    return false;
                }

                var rechargeAmount = $("input[name='result.rechargeAmount']").val();
                // var bankCode = options.statusNum ? $("input[name='bankCode']").val() : "";

                mui.ajax(root + options.submitUrl, {
                    data: {
                        "result.rechargeAmount": rechargeAmount,
                        "result.rechargeType": options.type,
                        "statusNum": options.statusNum
                        // "result.payerBank":bankCode
                    },
                    type: 'post',
                    async: false,
                    success: function (data) {
                        if ($("#depositSalePop") && $("#depositSalePop").length > 0) {
                            $("#depositSalePop").remove();
                        }
                        var failureCount = $(data).find("#failureCount").attr("failureCount");
                        var unCheckSuccess = $(data).find("#unCheckSuccess").attr("unCheckSuccess");
                        ajaxMap["ajaxData"] = data;
                        ajaxMap["_this"] = _this;
                        ajaxMap["ajaxOptions"] = options;
                        ajaxMap["rechargeAmount"] = rechargeAmount;
                        if(unCheckSuccess == "true" && options.statusNum && failureCount >= 3){
                            $("#failureHints").show();
                            $("#failureHintsMasker").show();
                            $("#channel").val(channel);
                        }else{
                            $("#channel").val("");
                            _this.companyContinueDeposit();
                        }
                    },
                    error: function (xhr, type, errorThrown) {
                        console.log('提交失败');
                    }
                });


            });
        },

        companyContinueDeposit:function(){
            var ajaxData = ajaxMap["ajaxData"];
            var _this = ajaxMap["_this"];
            var options = ajaxMap["ajaxOptions"];
            var rechargeAmount = ajaxMap["rechargeAmount"];
            $(".mui-content").append(ajaxData);
            var unCheckSuccess = $("#unCheckSuccess").attr("unCheckSuccess");
            if (unCheckSuccess === "true") {
                var pop = $("#pop").attr("pop");
                if (pop === "true") {
                    _this.bindReWriteAmount();
                    if (!options.statusNum) {
                        _this.deposit(options.depositUrl);
                    } else {
                        _this.gotoUrl(options.depositUrl + "&depositCash=" + rechargeAmount);
                    }
                } else {
                    if (!options.statusNum) {
                        _this.submitDeposit(options.depositUrl);
                    } else {
                        _this.gotoUrl(options.depositUrl + "&depositCash=" + rechargeAmount);
                    }
                }
            } else {
                //验证提示
                _this.toast($("#tips").attr("tips"));
            }
        },

        deposit: function (url) {
            var _this = this;
            /**
             * 提交存款订单
             */
            mui(".cont").on("tap", ".next-btn", function () {
                _this.submitDeposit(url);
            });
        },

        submitDeposit: function (url) {
            var _this = this;

            var $form = $(_this.formSelector);
            if (!$form.valid()) {
                return false;
            }

            var data = $form.serialize();

            mui.ajax(root + url, {
                dataType: 'json',
                data: data,
                type: 'post',
                async: false,
                success: function (data) {
                    if (data.state) {
                        _this.reWriteAmount();
                        var html = '<div class="masker" style="display:block;"></div>' +
                            '<div class="gb-withdraw-box window-ok" style="display:block;">' +
                            '<a _href="/wallet/deposit/index.html" class="_again"><span style="color: #999;background-color: #fff;font-size: 20px"> X &nbsp;</span></a>' +
                            '<div class="cont">' +
                            '<div class="ok-box">' +
                            '<i class="ok-icon"></i>' +
                            '<span>' + window.top.message.deposit_auto["提交成功"] + '</span>' +
                            '</div>' +
                            '<div class="ct">' +
                            '<p>' + window.top.message.deposit_auto["等待处理"] + '</p>' +
                            '</div>' +
                            '<div class="ft">' +
                            '<a _href="/wallet/deposit/index.html" class="btn mui-btn mui-btn-primary _again">' + window.top.message.deposit_auto["再存一次"] + '</a>' +
                            '<a class="btn mui-btn mui-btn-outlined _fund" >' + window.top.message.deposit_auto["查看资金记录"] + '</a> ' +
                            '</div> ' +
                            '</div> ' +
                            '</div>';
                        $(".mui-content").append(html);
                        _this.depositAgain();
                        mui("body").on("tap", "._fund", function () {
                            _this.gotoUrl("/fund/record/index.html?search.transactionType=deposit");
                        });
                    } else {
                        _this.toast(data.msg);
                        $("input[name='gb.token']").val(data.token);
                        if(data.accountNotUsing){
                            setTimeout(function(){
                                _this.linkDeposit();
                            },2000);
                        }
                    }
                },
                error: function (xhr, type, errorThrown) {
                    _this.toast(window.top.message.deposit_auto['提交失败']);
                    _this.linkDeposit();
                }
            });
        },

        depositAgain: function () {
            var _this = this;
            mui('.window-ok').on('tap', '._again', function () {
                if (_this.os == 'app_android') {
                    window.gamebox.depositAgain();
                } else if (_this.os == 'app_ios') {
                    gotoIndex(1);
                } else {
                    _this.gotoUrl($(this).attr('_href'));
                }
            })
        }
    });
});