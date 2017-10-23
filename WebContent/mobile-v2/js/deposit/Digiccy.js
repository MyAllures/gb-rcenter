define(['common/MobileBasePage', 'validate'], function (MobileBasePage) {
    return MobileBasePage.extend({
        init: function () {
            this._super();
        },
        /**
         * 绑定事件
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            //切换币种
            mui("body").on("tap", ".bank-selector li a[data-id]", function (e) {
                $(".bank-selector li a[data-id]").removeClass("active");
                $(this).addClass("active");
                $("div[id^=digiccy]").hide();
                var id = $(this).attr("data-id");
                $("div#" + id).show();
            });

            //刷新余额
            mui("body").on("tap", "button[name=refresh]", function (e) {
                _this.refresh(e);
            });
            //生成新地址
            mui("body").on("tap", "a[name=newAddress]", function (e) {
                _this.newAddress(e);
            });
            //兑换金额
            mui("body").on("tap", "a[name=exchange]", function (e) {
                _this.exchange(e);
            });
            //确认选择优惠
            mui("body").on("tap", "a#confirmSale", function (e) {
                var url = $(this).attr("sale-url");
                window.top.topPage.ajax(url, {
                    dataType: 'json',
                    data: {},
                    success: function (data) {
                        var msg = data.msg;
                        if (msg) {
                            _this.toast(msg);
                        } else if (data.state == true) {
                            _this.toast("申请优惠成功！");
                        } else if (!data.state == false) {
                            _this.toast("申请优惠失败！");
                        }
                    }
                })
            });
            //取消选择优惠
            mui("body").on("tap", "a#cancelSale", function (e) {
                $("#applySale").removeClass("mui-active");
                $("#applySale").html("");
            });
            //关闭优惠弹窗
            mui("body").on("tap", ".gb-withdraw-box.close", function (e) {
                $("#applySale").removeClass("mui-active");
                $("#applySale").html("");
            });
        },
        /**
         * 页面加载
         */
        onPageLoad: function () {
            this._super();
        },
        /**
         * 生成地址
         */
        newAddress: function (e) {
            var currency = $(e.target).attr("currency");
            var _this = this;
            mui.ajax(root + "/wallet/deposit/digiccy/newAddress.html", {
                data: {'currency': currency},
                dataType: 'json',
                success: function (data) {
                    var address = data.address;
                    if (address) {
                        _this.toast("生成地址成功！");
                        window.setTimeout(function () {
                            $("[name=account" + currency + "] .list-xzzf img").attr("src", data.addressQrcodeUrl);
                            $("[name=account" + currency + "] .list-xzzf textarea").val(address);
                            $("[name=account" + currency + "] .mui-input-row").show();
                            $("[name=notAddress" + currency + "]").hide();
                        }, 1000);
                    } else {
                        _this.toast("生成地址失败请稍后再试！");
                    }
                }
            })
        },
        /**
         * 兑换
         * @param e
         */
        exchange: function (e) {
            $(e.target).attr("disabled", true);
            var currency = $(e.target).attr("currency");
            var _this = this;
            mui.ajax(root + "/wallet/deposit/digiccy/exchange.html", {
                data: {'currency': currency},
                dataType: 'json',
                success: function (data) {
                    var state = data.state;
                    var msg = window.top.message.fund['Recharge.digiccyRecharge.' + data.msg];
                    if (state == false && data.msg && msg) {
                        _this.toast(msg);
                        window.setTimeout(function () {
                            _this.back(currency);
                        }, 1000);
                    } else if (state == true) {
                        //展示选择优惠内容
                        _this.sale(data.transactionNo);
                    } else {
                        _this.toast('兑换金额失败，请稍后再试');
                    }
                },
                complete: function () {
                    $(e.target).removeAttr("disabled");
                }
            })
        },
        /**
         * 选择优惠
         * @param transactionNo
         */
        sale: function (transactionNo) {
            mui.ajax(root + '/wallet/deposit/digiccy/sale.html?search.transactionNo=' + transactionNo, {
                success: function (data) {
                    $("#applySale").html(data);
                    $("#applySale").addClass("mui-active");
                }
            })
        },
        /**
         * 回调 刷新余额
         * @param currency
         */
        back: function (currency) {
            var _e = {currentTarget: $("[name=account" + currency + "]").find("button[name=refresh]")};
            this.refresh(_e);
        },
        /**
         * 刷新金额
         * @param e
         * @param currency
         */
        refresh: function (e) {
            var currency = $(e.target).attr("currency");
            var $amount = $(e.target).prev();
            var text = $amount.text();
            var loading = '<div class="loader api-loader"><div class="loader-inner ball-pulse api-div"><div></div><div></div><div></div></div></div>';
            $amount.html(loading);
            mui.ajax(root + "/wallet/deposit/digiccy/refresh.html", {
                data: {'currency': currency},
                dataType: 'json',
                success: function (data) {
                    $amount.text(data.amount);
                    if (data.amount <= 0) {
                        $("[name=exchange" + currency + "]").hide();
                    } else {
                        $("[name=exchange" + currency + "]").next().show();
                    }
                },
                error: function () {
                    $amount.text(text);
                }
            })
        }
    })
});