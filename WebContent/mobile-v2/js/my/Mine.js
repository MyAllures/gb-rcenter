/**
 * Created by bill on 16-12-3.
 */
define(['common/MobileBasePage'], function (Mobile) {
    var t;
    var isload = false;
    return Mobile.extend({
        isLoad: false,
        init: function () {
            this._super();
            mui.init({});
            mui('.mui-scroll-wrapper').scroll();
        },
        onPageLoad: function () {
            this._super();
            t = this;
            this.getUserInfo();
            mui(document.body).on('tap', '.index-action-menu', function () {
                mui('.mui-off-canvas-wrap').offCanvas('show');
            });
            mui('#mineRefreshContainer').pullRefresh({
                container: '#mineRefreshContainer',
                down: {
                    height: 40,//可选.默认50.触发下拉刷新拖动距离
                    callback: t.getUserInfo
                }
            });
            $("li._promo").on("tap", function (e) {
                if (t.os == "app_android") {
                    window.gamebox.gotoFragment("0,/game.html?typeId=5");
                } else if (t.os == 'app_ios') {
                    setTimeout(function () {
                        gotoIndexUrl(0, "/game.html?typeId=5");
                    }, 260);
                } else
                    t.gotoUrl($(this).data("href"));
            });
            mui('body').on('tap', '[data-href]', function () {
                if (!$(this).hasClass("_promo")) {
                    t.gotoUrl($(this).data("href"));
                }
            });
            $(window).bind("pageshow", function () {
                if (isload) {
                    t.getUserInfo();
                    $("#footer_mine").addClass("mui-active");
                    $("[id!='footer_mine'][id*='footer_']").removeClass("mui-active");
                }
                isload = true;
            });
            mui('body').on('tap', 'a[data-url]', function () {
                var demo = $(this).data('demo');
                if (demo) {
                    t.openLayer('试玩账号无权限访问');
                } else {
                    t.gotoUrl($(this).data('url'));
                }
            });
            this.updateOpenHistoryHref();
        },
        getUserInfo: function () {
            mui.ajax(root + "/mine/userInfo.html", {
                type: 'post',//HTTP请求类型
                timeout: 20000,//超时时间设置为10秒；
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Soul-Requested-With': 'XMLHttpRequest'
                },
                dataType: "json",
                success: function (data) {
                    var currency = data.currency;
                    //总资产
                    if (data.totalAssets != null && data.totalAssets != 0) {
                        $("#totalAssets").html(currency + data.totalAssets.toFixed(2));
                    } else {
                        $("#totalAssets").html(currency + "0.00");
                    }
                    //钱包余额
                    if (data.walletBalance != null && data.walletBalance != 0) {
                        $("#walletBalance").html(currency + data.walletBalance.toFixed(2));
                    } else {
                        $("#walletBalance").html(currency + "0.00");
                    }
                    //正在处理中取款金额
                    if (data.withdrawAmount != null && data.withdrawAmount != 0) {
                        $("#withdrawAmount").html(window.top.message.my_auto['处理中'] + ":" + currency + data.withdrawAmount);
                    } else {
                        $("#withdrawAmount").html("");
                    }
                    //正在处理中转账金额,额度转换
                    if (data.transferAmount != null && data.transferAmount != 0) {
                        $("#transferAmount").html(window.top.message.my_auto['处理中'] + ":" + currency + data.transferAmount);
                    } else {
                        $("#transferAmount").html("");
                    }
                    //银行卡信息
                    if(data.bankcard) {
                        var no = data.bankcard.bankcardNumber;
                        var bankcardNumber = $("#bankcardNumber").get(0);
                        bankcardNumber.innerHTML = "<span id='bankImg'></span>" + no;
                        $("#bankImg").addClass("pay-bank s " + data.bankcard.bankName);
                    }
                    //比特币
                    if(data.btcNum) {
                        $("#btcNumber").text(data.btcNum);
                    }
                    //推荐好友,昨日收益
                    if (data.recomdAmount != null && data.recomdAmount != 0) {
                        $("#recomdAmount").html(window.top.message.my_auto['昨日收益'] + ":" + currency + data.recomdAmount);
                    } else {
                        $("#recomdAmount").html("");
                    }
                    //计算近7日收益（优惠金额）
                    if (data.preferentialAmount != null && data.preferentialAmount != 0) {
                        $("#preferentialAmount").html(window.top.message.my_auto['近7日收益'] + ":" + currency + data.preferentialAmount);
                    } else {
                        $("#preferentialAmount").html("");
                    }
                    //系统消息-未读数量
                    if (data.unReadCount != null && data.unReadCount != 0) {
                        $("#unReadCount").html("<i ></i>");
                    } else {
                        $("#unReadCount").html("");
                    }
                    mui('#mineRefreshContainer').pullRefresh().endPulldownToRefresh();
                },
                error: function (e) {
                    mui('#mineRefreshContainer').pullRefresh().endPulldownToRefresh();
                    t.toast(window.top.message.my_auto['加载失败']);
                    //异常处理；
                    // console.log(e);
                }
            });
        },

        setting: function () {
            mui('gb-userinfo').on('tap', '.setting', function () {
                window.gamebox.setting();
            })
        },

        updateOpenHistoryHref: function () {
            var href = $('a._open_lottery').attr('data-href');
            $('a._open_lottery').attr('data-href', href + "4");
        }

    });
});