/**
 * Created by fei on 16-8-13.
 */
define(['common/MobileBasePage'], function (Mobile) {
    return Mobile.extend({
        errorMap: null,
        init: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            inputNumber.init($('[name=withdrawAmount]'), {
                negative: false,
                decimal: false,
                intSize: 9
            });
            this.errorMap = new Map();
            this.initPage();
            this.checkForm();
        },
        initPage: function () {
            mui("body").on("tap", "[data-href]", function() {
                if($(this).parent().find(".btn-deposit").size()>0 && os == 'app_ios'){
                    gotoIndex(1);
                }
                else{
                    _this.gotoUrl($(this).data('href'));

                }
            });
            var _this = this;

            mui.back = function(){
                if(os != 'app_ios')
                    _this.gotoUrl("/mine/index.html");
            };

            mui('.mine-form').on('tap', '.bankitem', function () {
                $(this).addClass('bk-hover');
                setTimeout(function () {
                    $('.bankitem').removeClass('bk-hover');
                    _this.gotoUrl(root + '/bankCard/page/addCard.html');
                }, 100);
            });

            if ('no' == $('#hasBankcard').val()) {
                layer.open({
                    title: window.top.message.withdraw_auto['提示'],
                    content: window.top.message.withdraw_auto['没有取款银行卡'],
                    btn: [window.top.message.withdraw_auto['立即添加'], window.top.message.withdraw_auto['取消']],
                    yes: function(index) {
                        _this.gotoUrl(root + '/bankCard/page/addCard.html?action=withdraw')
                    }
                })
            }

            mui('.mine-page').on('tap', 'button.submit', function () {
                if (_this.checkAmout()) {
                    var errMsg = errorMap.get('errMsg');
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
                if (amount > 0) {
                    $('.submit').removeAttr('disabled');
                } else {
                    $('.submit').attr('disabled', 'disabled');
                }
                if (amount >= min) {
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
                        errorMap.remove('errMsg');

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
                            errorMap.put('errMsg', window.top.message.withdraw_auto['取款金额需大于手续费']);
                            if (actualLess0) {
                                $final.addClass('bg-error');
                            } else {
                                $final.removeClass('bg-error');
                            }
                            return false;
                        }

                        if (actualLess0) {
                            errorMap.put('errMsg', window.top.message.withdraw_auto['实际取款金额需大于0']);
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

        submitWithdraw: function () {
            var _this = this;
            mui.ajax(root + '/wallet/withdraw/submitWithdraw.html', {
                dataType: 'json',
                data: {"withdrawAmount": $('[name=withdrawAmount]').val(),"gb.token":$("[name='gb.token']").val()},
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
        }

    });
});
