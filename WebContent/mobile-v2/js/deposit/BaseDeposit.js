/**
 * Created by bruce on 16-12-13.
 */
define(['common/MobileBasePage','validate'], function(Mobile) {
    return Mobile.extend({

        init: function (formSelector) {
            this._super(formSelector);
            mui.init({});
        },

        onPageLoad: function () {
            this._super();
        },

        bindEvent: function() {
            this._super();
            var _this = this;

            mui("body").on("tap", "[data-href]", function () {
                _this.openWindowByMui($(this).data('href'))               
            });

            this.bindChooseAmount();
        },
        
        openWindowByMui:function (_href) {
            mui.openWindow({
                url: _href,
                id: _href,
                extras: {},
                createNew: false,
                show: {
                    autoShow: true
                },
                waiting: {
                    autoShow: true, //自动显示等待框，默认为true
                    title: '正在加载...'
                }
            })
        },

        /**
         * 实时监听输入框
         */
        bindRechargeAmount:function($submitBtn){
            var _this = this;
            var $btn = $submitBtn || $("#submitAmount");
            if (document.getElementById('result.rechargeAmount')) {
                document.getElementById('result.rechargeAmount').addEventListener("input", function () {
                    if ($("input[name='result.randomCash']").val()) {
                        if($(this).val() == null && $(this).val()=="") {
                            $btn.attr("category","isNull");
                        }else if (!/^[0-9]*$/.test($(this).val())) {
                            $btn.attr("category","notThrough");
                        }else{
                            var min = Number($("#onlinePayMin").val());
                            var max = Number($("#onlinePayMax").val());
                            var amount = Number($(this).val()) + Number($("input[name='result.randomCash']").val())/100;
                            if(/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/.test(amount.toFixed(2))) {
                                if (amount >= min && amount <= max) {
                                    $btn.attr("category", "through");
                                } else {
                                    $btn.attr("category", "excess");
                                }
                            }else{
                                $btn.attr("category", "error");
                            }
                        }
                    }
                });
            }
        },


        /**
         * 更新存款金额的远程验证提示消息
         */
        /*changeAmountMsg: function () {
            var $form = $("form");
            var max = $("input[name=onlinePayMax]").val();
            var min = $("input[name=onlinePayMin]").val();
            if (!min || min == 0) {
                min = '1';
            }
            if (!max || max == 0) {
                max = '99,999,999';
            }

            var minInt = parseInt(min.replace(/,/g, ""));
            var maxInt = parseInt(max.replace(/,/g, ""));
            var rechargeAmount = $("form" + " input[name='result.rechargeAmount']").val();
            var msg;
            if (rechargeAmount && minInt <= rechargeAmount && rechargeAmount <= maxInt) {
                msg = window.top.message.valid['rechargeForm.rechargeAmountLTFee'];
            } else {
                msg = window.top.message.valid['rechargeForm.rechargeAmountOver'];
                msg = msg.replace("{0}", min);
                msg = msg.replace("{1}", max);
            }
            var validate = $form.validate();
            if(validate && validate.settings) {
                $.extend(true, validate.settings.messages, {"result.rechargeAmount": {remote: msg}});
                $.extend(true, validate.settings.messages, {"result.rechargeAmount": {max: msg}});
            }
        },*/

        //快选金额
        bindChooseAmount: function () {
            $("body").on("tap", "#chooseAmount a", function (e) {
                $("#chooseAmount").find("a").removeClass("active");
                $(this).addClass("active");
                $("input[name='result.rechargeAmount']").val($(this).attr("money"));
                // $("#submitAmount").removeAttr("disabled");
            })
        },

        reWriteAmount: function () {
            $("#master").remove();
            $(".pro-window").remove();
        },

        bindReWriteAmount: function () {
            var _this = this;
            mui(".cont").on("tap", ".agin-btn,.close", function () {
                _this.linkDeposit();
            })
        },
        linkDeposit:function() {
            var url = root + "/wallet/deposit/index.html";
            if (this.os == 'app_android') {
                window.gamebox.gotoFragment(1);
            } else if (this.os == 'app_ios') {
                gotoTab(1);
            } else {
                this.gotoUrl(url);
            }
        },
        otoFragment: function () {
            var _this = this;
            mui("body").on("tap", "[data-skip]", function () {
                var target = $(this).data('target');
                var dos = $(this).data('os');
                var url = $(this).data('skip');
                if (_this.os == 'app_android' && target) {
                    window.gamebox.gotoFragment(target);
                } else if (dos == 'app_ios') {
                    if (target || target == 0) {
                        gotoTab(target);
                    } else {
                        gotoGame(url);
                    }
                } else {
                    _this.gotoUrl(url);
                }
            });
        }
    });
});