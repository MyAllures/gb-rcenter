/**
 * Created by bruce on 17-1-30.
 */
define(['site/deposit/BaseDeposit'], function (BaseDeposit) {
    return BaseDeposit.extend({

        init: function (formSelector) {
            this._super(formSelector);
        },

        onPageLoad: function () {
            this._super();
        },

        bindEvent: function () {
            this._super();
        },

        submit: function (options) {
            var _this = this;
            mui(".mui-scroll2").off("tap","#submitAmount");
            mui(".mui-scroll2").on("tap", "#submitAmount", function () {
                if (document.activeElement) {
                    document.activeElement.blur();
                }

                var $form = $(_this.formSelector);
                if (!$form.valid()) {
                    return false;
                }

                var rechargeAmount = $("input[name='result.rechargeAmount']").val();

                mui.ajax(root + options.submitUrl, {
                    data: {"result.rechargeAmount": rechargeAmount,"result.rechargeType":options.type},
                    type: 'post',
                    async: false,
                    success: function (data) {
                        if ($(".mui-scroll2").nextAll() && $(".mui-scroll2").nextAll().length > 0) {
                            $(".mui-scroll2").nextAll().remove();
                        }
                        $(".mui-content").append(data);

                        var unCheckSuccess = $("#unCheckSuccess").attr("unCheckSuccess");
                        if (unCheckSuccess === "true") {
                            var pop = $("#pop").attr("pop");
                            if (pop === "true") {
                                _this.bindReWriteAmount();
                                _this.deposit(options.depositUrl);
                            } else {
                                _this.submitDeposit(options.depositUrl);
                            }
                        } else {
                            //验证提示
                            _this.toast($("#tips").attr("tips"));
                        }
                    },
                    error: function (xhr, type, errorThrown) {
                        console.log('提交失败');
                    }
                });


            });
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

        submitDeposit:function (url) {
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
                    if(data.state) {
                        _this.reWriteAmount();
                        var html='<div class="masker" style="display:block;"></div>' +
                            '<div class="gb-withdraw-box window-ok" style="display:block;">' +
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
                        mui("body").on("tap","._fund",function () {
                            _this.gotoUrl("/fund/record/index.html?search.transactionType=deposit");
                        });
                    } else {
                        _this.toast(data.msg);
                        $("input[name='gb.token']").val(data.token);
                    }
                },
                error: function (xhr, type, errorThrown) {
                    _this.toast(window.top.message.deposit_auto['提交失败']);
                }
            });
        },

        depositAgain: function () {
            var _this = this;
            mui('.cont').on('tap', '._again', function () {
                if (_this.os == 'app_android') {
                    window.gamebox.depositAgain();
                } else if(_this.os == 'app_ios'){
                    if(isMobileUpgrade && isMobileUpgrade == 'true') {
                        //v3存款跳转
                        gotoTab(0);
                    } else {
                        gotoIndex(1);
                    }
                } else {
                    _this.gotoUrl($(this).attr('_href'));
                }
            })
        }
    });
});