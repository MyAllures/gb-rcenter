/**
 * Created by fei on 16-8-13.
 */
define(['common/MobileBasePage'], function (Mobile) {
    return Mobile.extend({
        errorMap: null,
        init: function () {
            this._super();
            this.errorMap = new Map();
        },
        onPageLoad: function () {
            this._super();
            inputNumber.init($('[name=withdrawAmount]'), {
                negative: false,
                decimal: false,
                intSize: 9
            });
            this.checkForm();
            var _this = this;
            mui.back = function () {
                if (os != 'app_ios')
                    _this.gotoUrl("/mine/index.html");
            };

            //是否需添加银行卡、比特币
           this.hasBank();
           this.initPage();
           this.gotoFragment();
        },
        /**
         * 无银行卡弹窗提示
         */
        noBankLayer: function () {
            var _this = this;
            layer.open({
                title: window.top.message.withdraw_auto['提示'],
                content: window.top.message.withdraw_auto['没有取款银行卡'],
                btn: [window.top.message.withdraw_auto['立即添加'], window.top.message.withdraw_auto['取消']],
                yes: function (index) {
                    _this.gotoUrl(root + '/bankCard/page/addCard.html?action=withdraw')
                }
            })
        },
        /**
         * 无比特币地址弹窗提示
         */
        noBtcLayer: function () {
            var _this = this;
            layer.open({
                title: window.top.message.withdraw_auto['提示'],
                content: '没有绑定比特币地址',
                btn: [window.top.message.withdraw_auto['立即添加'], window.top.message.withdraw_auto['取消']],
                yes: function (index) {
                    _this.gotoUrl(root + '/bankCard/page/addBtc.html?action=withdraw')
                }
            })
        },
        bindEvent: function () {
            this._super();
            var _this = this;
            //切换取款账号
            mui("body").on("tap", ".account_tab .mui-segmented-control a.mui-control-item[data]", function () {
                _this.changeBankcard($(this));
            });
            mui('.mine-form').on('tap', '.bankitem', function () {
                $(this).addClass('bk-hover');
                var url = $(this).attr("data-url");
                setTimeout(function () {
                    $('.bankitem').removeClass('bk-hover');
                    _this.gotoUrl(url);
                }, 100);
            });

            mui("form").on('tap', 'button.submit', function () {
                if(!_this.hasBank()) {
                    return;
                }
                if (_this.checkAmout()) {
                    var errMsg = _this.errorMap.get('errMsg');
                    if (!errMsg) {
                        window.top.page.security.checkSecurityPassword(function () {
                            _this.submitWithdraw();
                        });
                    } else {
                        _this.toast(errMsg);
                        $('[name=withdrawAmount]').focus();
                    }
                }
            })
        },
        checkForm: function () {
            var _this = this;
            $('[name=withdrawAmount]').bind('input propertychange', function () {
                var min = parseFloat($(this).attr('min'));
                var max = parseFloat($(this).attr('max'));
                var amount = parseFloat($(this).val());
                if (amount < min) {
                    $('.submit').attr('disabled', 'disabled');
                }
                if (amount >= min) {
                    $('.submit').removeAttr('disabled');
                    if (_this.checkAmout())
                        _this.calcFee(amount);
                } else {
                    _this.recoverAmount();
                }
            });
        },

        recoverAmount: function () {
            $('span.poundage').html($('[name="poundageHide"]').val());
            $('span.actual').html($('[name="actualHide"]').val());
            $('div.final').removeClass('bg-error');
        },
        checkAmout: function () {
            var _this = this;
            var $amount = $('[name=withdrawAmount]');
            var min = parseFloat($amount.attr('min'));
            var max = parseFloat($amount.attr('max'));
            var amount = parseFloat($amount.val());
            var balance = parseFloat($('[name=walletBalance]').val());

            if(!/^[1-9]\d*$/.test($amount.val())) {
                _this.toast(window.top.message.withdraw_auto['取款金额为正整数']);
                _this.recoverAmount();
                $amount.focus();
                return false;
            } else if (amount > balance) {
                _this.toast(window.top.message.withdraw_auto['取款金额不得大于钱包余额']);
                _this.recoverAmount();
                $amount.focus();
                return false;
            } else if (amount > max) {
                _this.toast(window.top.message.withdraw_auto['单笔取款金额不得大于'].replace('{0}', max));
                _this.recoverAmount();
                $amount.focus();
                return false;
            } else if (amount < min) {
                _this.toast(window.top.message.withdraw_auto['单笔取款金额不得小于'].replace('{0}', min));
                $amount.focus();
                return false;
            }

            return true;
        },
        /** 计算各种费用 */
        calcFee: function (amount) {
            var _this = this;
            var $poundage = $('span.poundage');
            var $actual = $('span.actual');
            var ph = $('[name="poundageHide"]').val();
            var ah = $('[name="actualHide"]').val();

            var withdrawFee = $('[name=withdrawFee]').val();
            if (withdrawFee != 0) {
                $poundage.html('').addClass('mui-spinner');
            }
            $actual.html('').addClass('mui-spinner');

            // 计算各种费
            mui.ajax(root + '/wallet/withdraw/withdrawFee.html', {
                dataType: 'json',
                data: {"withdrawAmount": amount},
                type: 'post',
                success: function (data) {
                    if (data) {
                        // 移除错误信息
                        _this.errorMap.remove('errMsg');

                        if (data.legalNum) {    // 不在规定范围内
                            _this.toast(data.legalNum);
                            $poundage.html(ph).removeClass('mui-spinner');
                            $("span.actual").html(ah).removeClass('mui-spinner');
                            return false;
                        }
                        var sign = $('#sign').val();
                        // 实际可取款金额
                        var money = data.actualWithdraw;
                        // 手续费
                        var poundage = data.poundage;

                        if (withdrawFee != 0) {
                            if (poundage == '0.00')
                                $poundage.html(sign + '' + poundage).removeClass('mui-spinner');
                            else
                                $poundage.html(sign + '-' + poundage).removeClass('mui-spinner');
                        }
                        if (poundage > 0) {
                            $('[name=withdrawFee]').val(-poundage);
                        }

                        $('[name=actualWithdraw]').val(money);
                        $actual.html(sign + money).removeClass('mui-spinner');

                        var tooSmall = data.amountTooSmall;
                        var actualLess0 = data.actualLess0;
                        var $final = $('div.final');

                        if (tooSmall == "true") {
                            _this.errorMap.put('errMsg', window.top.message.withdraw_auto['取款金额需大于手续费']);
                            if (actualLess0) {
                                $final.addClass('bg-error');
                            } else {
                                $final.removeClass('bg-error');
                            }
                            return false;
                        }

                        if (actualLess0) {
                            _this.errorMap.put('errMsg', window.top.message.withdraw_auto['实际取款金额需大于0']);
                            $final.addClass('bg-error');
                        } else {
                            $final.removeClass('bg-error');
                        }
                    } else {
                        $poundage.html(ph).removeClass('mui-spinner');
                        $actual.html(ah).removeClass('mui-spinner');
                    }
                }
            });
        },
        changeBankcard: function ($target) {
            $(".account_tab .mui-segmented-control a.mui-control-item[data]").removeClass("mui-active");
            $target.addClass("mui-active");
            var id = $target.attr("data");
            $(".bankcard").hide();
            $("#" + id).show();
            this.hasBank();
        },
        /**
         * 是否绑定银行卡
         */
        hasBank:function() {
            var $target = $(".account_tab .mui-segmented-control a.mui-active[data]");
            var id = $target.attr("data");
            if (id == 'bank_account') {
                $("input[name=remittanceWay]").val("1");
                var noBank = $("input[name=noBank]").val();
                if (noBank == 'true') {
                    this.noBankLayer();
                    return false;
                }
            } else {
                $("input[name=remittanceWay]").val("2");
                var noBtc = $("input[name=noBtc]").val();
                if (noBtc == 'true') {
                    this.noBtcLayer();
                    return false;
                }
            }
            return true;
        },
        submitWithdraw: function () {
            var _this = this;
            mui.ajax(root + '/wallet/withdraw/submitWithdraw.html', {
                dataType: 'json',
                data: $("form").serialize(),
                type: 'post',
                beforeSend: function () {
                    window.top.pd.show();
                },
                success: function (data) {
                    if (data.state) {
                        layer.open({
                            title: window.top.message.withdraw_auto['提示'],
                            content: window.top.message.withdraw_auto['取款提交成功'],
                            btn: [window.top.message.withdraw_auto['好的'], window.top.message.withdraw_auto['取款记录']],
                            shadeClose:false,
                            yes: function(index) {
                                if(_this.os=="app_android")
                                    window.gamebox.gotoFragment(4);
                                else if(_this.os == 'app_ios')
                                    goBack();
                                else
                                    _this.gotoUrl(root + '/mine/index.html');
                            },
                            no: function(index) {
                                _this.gotoUrl(root + '/fund/record/index.html?search.transactionType=withdrawals');
                            }
                        });
                    } else {
                        layer.open({
                            title: window.top.message.withdraw_auto['提示'],
                            content: data.msg,
                            btn: [window.top.message.withdraw_auto['联系客服'], window.top.message.withdraw_auto['取消']],
                            shadeClose:false,
                            yes: function(index) {
                                if(os == 'android'){
                                    window.gamebox.gotoFragment('3');
                                }else if(os == 'app_ios'){
                                    gotoIndex(3);
                                }else{
                                    _this.gotoUrl(root + '/index/gotoCustomerService.html');
                                }
                            }
                        });
                    }
                },
                complete: function () {
                    window.top.pd.hide();
                }
            });
        },

        initPage: function () {
            var _this = this;
            mui("body").on("tap", "[data-href]", function() {
                if($(this).parent().find(".btn-deposit").size()>0 && _this.os === 'app_ios'){
                    gotoIndex(1);
                } else {
                    if (_this.os === 'app_android') {
                        if (siteType === 'lottery') {
                            window.gamebox.gotoFragment('2');
                        } else if (action === 'default') {
                            window.gamebox.gotoFragment('1');
                        }
                    } else {
                        _this.gotoUrl($(this).data('href'));
                    }
                }
            });
        },

        gotoFragment : function () {
            var _this = this;
            mui("body").on("tap", "[data-skip]", function() {
                var target = $(this).data('target');
                var dos = $(this).data('os');
                var url = $(this).data('skip');
                if (_this.os === 'app_android' && typeof target !== 'undefined') {
                    window.gamebox.gotoFragment(target);
                } else if (dos === 'app_ios') {
                    if (target || target === 0) {
                        gotoTab(target);
                    } else {
                        gotoGame(url);
                    }
                } else {
                    _this.gotoUrl(url);
                }
            });
        },
    });
});
