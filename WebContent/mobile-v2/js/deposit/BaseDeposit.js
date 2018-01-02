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
            // mui('.mui-scroll-wrapper').scroll();
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
        bindRechargeAmount:function ($submitBtn) {
            var _this = this;
            var $btn = $submitBtn || $("#submitAmount");
            if (document.getElementById('payerBankcard1') || document.getElementById('payerBankcard2')) {
                var id=document.getElementById('payerBankcard1');
                if(document.getElementById('payerBankcard2')){
                    id=document.getElementById('payerBankcard2');
                }

                if ($(id).val()) {
                    $btn.removeAttr("disabled");
                }
                id.addEventListener("input",function () {
                    /*if (/^[0-9]*$/.test($(this).val())) {*/
                    /*^\d+(\.\d+)?$*/

                    if ($(this).val()) {
                        $btn.removeAttr("disabled");
                    }
                    if (!$(this).val()) {
                        $btn.attr("disabled", "disabled");
                    }
                });

            } else if (document.getElementById('result.rechargeAmount')) {
                // if($("#result.rechargeAmount").val()){
                //     $btn.removeAttr("disabled");
                //     return;
                // }
                document.getElementById('result.rechargeAmount').addEventListener("input", function () {
                    var $a = $("#chooseAmount").find("a");
                    if ($a.hasClass("active")) {
                        $a.removeClass("active");
                    }
                    /*if (/^[0-9]*$/.test($(this).val())) {*/
                    /*^\d+(\.\d+)?$*/
                    if (/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/.test($(this).val())) {
                        $btn.removeAttr("disabled");
                    }
                    if (!$(this).val()) {
                        $btn.attr("disabled", "disabled");
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
                $("#submitAmount").removeAttr("disabled");
            })
        },

        /*reWriteAmount: function () {
            $("#master").remove();
            $(".pro-window").remove();
        },*/

        bindReWriteAmount: function () {
            var _this = this;
            mui(".cont").on("tap", ".agin-btn,.close", function () {
                // _this.reWriteAmount();
                // _this.gotoPage(url);
                var url = root+"/wallet/deposit/index.html?t="+Math.random();
                if(os == 'android'){
                    window.gamebox.gotoPay(url);
                }else if(os == 'app_ios'){
                    gotoPay(url);
                }else{
                    // window.open(url, "_blank");
                    _this.gotoUrl(url);
                }
            })
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