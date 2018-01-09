/**
 * Created by linsen on 17-6-22.
 */
define(['site/deposit/BaseCompanyDeposit', 'clipboard'], function (BaseCompanyDeposit, Clipboard) {
    return BaseCompanyDeposit.extend({

        init: function (formSelector) {
            this.formSelector = "#bitcoinForm";
            this._super(this.formSelector);
            mui('.main-coutent').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },

        onPageLoad: function () {
            this._super();
            var _this = this;
            _this.bindFormValidation();
            if($("#ImageQrCodeUrl").val()) {
                document.getElementById("saveImage").addEventListener("tap", function (e) {
                    var href = $(this).attr("url");
                    if (_this.os == "app_android") {
                        window.gamebox.saveImage(href);
                    } else if (_this.os == 'app_ios') {
                        gotoPay(href);
                        _this.toast(window.top.message.deposit_auto['请截屏再扫描二维码']);
                    } else {
                        if (/.(gif|jpg|jpeg|png)$/.test(href)) {
                            var a = document.createElement('a');
                            a.href = href;
                            a.download = href;
                            a.click();
                        }
                    }
                });
            }
        },

        copyAccount: function () {
            var _this = this;
            var cb = new Clipboard('.copy');
            cb.on('success', function (e) {
                _this.toast(window.top.message.deposit_auto['复制成功']);
                e.clearSelection();
            });
            cb.on('error', function (e) {
                console.log('error!!!');
            });
        },

        bindEvent: function () {
            this._super();
            var _this = this;
            var format = dateFormat.dayminute;
            //设置开始时间选择器
            mui("body").on("tap", "input[name='result.returnTime']", function () {
                var dtpicker = new mui.DtPicker({
                    "type": "datetime",
                    "value": $("input[name='result.returnTime']").val(),
                    beginDate: new Date($("input[name='result.returnTime']").attr("minDate")),
                    labels: [window.top.message.fund_auto['年'], window.top.message.fund_auto['月'], window.top.message.fund_auto['日'], '时', '分']//设置默认标签区域提示语
                });
                dtpicker.show(function (e) {
                    var date = e.date;
                    $("input[name='result.returnTime']").val(_this.formatDateTime(date, format));
                    dtpicker.dispose();
                })
            });

            var type = $("input[name='result.rechargeType']").val();
            var options = {
                type: type,
                depositUrl: "/wallet/deposit/company/bitcoin/deposit.html"
            };
            this.submit(options);
        },
        /**
         * 提交订单
         */
        submit: function (options) {
            var _this = this;
            mui(".mui-content").off("tap", "#submitAmount");
            mui(".mui-content").on("tap", "#submitAmount", function () {
                if (document.activeElement) {
                    document.activeElement.blur();
                }
                var $form = $(_this.formSelector);
                if (!$form.valid()) {
                    return false;
                }
                var bitAmount = $("input[name='result.bitAmount']").val();
                mui.ajax(root + "/wallet/deposit/company/bitcoin/getSales.html", {
                    dataType: 'json',
                    type: 'post',
                    success: function (data) {
                        if (data && data.length > 0) {
                            _this.reWriteAmount();
                            var html = '<div class="masker" style="display:block;"></div>' +
                                '<div class="gb-withdraw-box pro-window" style="display:block">' +
                                '<div class="cont"><h3>'+window.top.message.deposit_auto['优惠']+'</h3><div class="cont-text"></div>' +
                                '<div class="text-pro applysale"><p></p><ul><li><div class="text-warp">' +
                                '<span>'+window.top.message.deposit_auto['不参与优惠']+'</span><input name="activityId" type="radio" value="" checked="checked/"></div></li>';
                            for (var i = 0; i < data.length; i++) {
                                var sale = data[i];
                                html = html + '<li><div class="text-warp"><span>' + sale.activityName + '</span>' +
                                    '<input name="activityId" type="radio" value="' + sale.id + '"></div></li>';
                            }
                            html = html + '</ul></div><div class="pro-btn"><a class="next-btn">'+window.top.message.deposit_auto['已存款']+'</a><a class="agin-btn">'+window.top.message.deposit_auto['重新填写']+'</a></div><div class="close"></div></div></div>';
                            $(".main-coutent").append(html);
                            mui(".pro-btn").on("tap", ".next-btn", function () {
                                _this.deposit(options);
                            });
                            mui(".pro-btn").on("tap", ".agin-btn", function () {
                                $(".masker").remove();
                                $(".pro-window").remove();
                            });
                            mui(".pro-window").on("tap",".close",function(){
                                $(".masker").remove();
                                $(".pro-window").remove();
                            })
                        } else { //无优惠
                            _this.deposit(options);
                        }
                    }
                })

            });
        },
        deposit: function (options) {
            var _this = this;
            var $form = $(_this.formSelector);

            mui.ajax(root + options.depositUrl, {
                data: $form.serialize(),
                type: 'post',
                async: false,
                dataType: 'json',
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
                            '<div class="ft">' +
                            '<p>' + window.top.message.deposit_auto["等待处理"] + '</p>' +
                            '</div>' +
                            '<div class="ft">' +
                            '<a _href="/wallet/deposit/index.html" class="btn mui-btn mui-btn-primary _again">' + window.top.message.deposit_auto["再存一次"] + '</a>' +
                            '<a class="btn mui-btn mui-btn-outlined _fund" >' + window.top.message.deposit_auto["查看资金记录"] + '</a> ' +
                            '</div> ' +
                            '</div> ' +
                            '</div>';
                        $(".main-coutent").append(html);
                        _this.depositAgain();
                        mui("body").on("tap", "._fund", function () {
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
        //快选金额
        bindChooseAmount: function () {
            $("body").on("tap", "#chooseAmount a", function (e) {
                $("#chooseAmount").find("a").removeClass("active");
                $(this).addClass("active");
                $("input[name='result.bitAmount']").val($(this).attr("money"));
            })
        }
    });
});
