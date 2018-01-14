/**
 * Created by bruce on 16-12-6.
 */
define(['site/deposit/BaseDeposit', 'site/deposit/BaseCompanyDeposit'], function (BaseDeposit, BaseCompanyDeposit) {
    var map = {};
    return BaseDeposit.extend({
        init: function (formSelector) {
            this._super();
            /*window.top.page.depositAccount = {};*/
        },

        onPageLoad: function () {
            this._super();
            mui('.mui-scroll-wrapper.deposit-scroll-wrapper').scroll({});
            var _this = this;
            (function ($$, doc) {
                mui('.bank-selector').on('tap', 'li > a', function (e) {
                    var activeLi = $("a", "li").hasClass("active");
                    if (activeLi) {
                        $("a", "li").removeClass("active");
                    }
                    $(e.target).addClass("active");
                });
            })(mui, document);

            $('._userAsset').removeClass('mui-hide');
            //银行公告
            mui('.gb-notice').on('tap', 'a[data-idx]', function (event) {
                if (document.activeElement) {
                    document.activeElement.blur();
                }

                var winHeight = $(window).height();
                var topHeight = $('.mui-bar-nav').height();

                // 此句非常重要，否则item初始化错误
                $('#box-notice').addClass('mui-slider');
                var $gnb = $('.gb-notice-box');
                var boxHeight = $gnb.height();
                var boxTop = (winHeight - boxHeight) / 2 - topHeight;
                $gnb.css({'top': boxTop});
                var idx = $(this).data('idx');
                $('.masker-notice-box').css({'height': winHeight}).show();
                $gnb.slideDown(function () {
                    mui('#box-notice').slider().gotoItem(idx, 500);
                });
            });
            mui(".deposit-tab01").on('tap', '#fastDeposit', function (e) {
                var url = $(this).data("href");
                if (os == 'android') {
                    window.gamebox.gotoPay(url);
                } else if (os == 'app_ios') {
                    gotoPay(url);
                } else {
                    window.open(url, "_blank");
                }
            });
            mui('body').on('tap', '.masker-notice-box', function (event) {
                $('.gb-notice-box').slideUp(function () {
                    $('body').removeClass('has-menu-ex');
                    $('.mui-hide-bar').hide();
                    $('.masker-notice-box').hide();
                });
            });

            //如果第一个元素是在线支付,扫码支付默认选中
            var $depositWay = $("#depositWay li>a:first");
            if ($depositWay) {
                var key = $("#depositWay li:first").attr("key");
                if (key && (key == 'online_deposit' || key == 'wechatpay_scan' || key == 'alipay_scan' || key == 'qqwallet_scan')) {
                    mui.trigger($depositWay[0], "tap");
                }
            }
        },

        bindEvent: function () {
            this._super();
            var _this = this;
            mui("body").on("tap", "[data-scan]", function () {
                $(".bank-selector >.ct a").removeClass("active");
                var key = $(this).parent().attr("key");
                var _href = $(this).attr("data-scan");
                if (_href != null && _href != "undefined" && !map[key]) {
                    mui.ajax(_href, {
                        headers: {'Soul-Requested-With': 'XMLHttpRequest'},
                        dataType: 'text/html',
                        type: 'post',
                        async: true,
                        success: function (data) {
                            $("#deposit").html(data);
                            map[key] = data;
                            page.formSelector = "#scanForm";
                            _this.bindFormValidation();
                            // page.ScanCode.bindRechargeAmount($("#submitAmount"));
                            page.ScanCode.submit();
                        },
                        error: function (xhr, type, errorThrown) {
                            if (xhr.type != null)
                                _this.toast(window.top.message.deposit_auto['线上支付异常']);
                        }
                    });
                } else {
                    $("#deposit").html(map[key]);
                    /*$("#deposit").html(window.top.page.depositAccount.online);*/
                    page.formSelector = "#scanForm";
                    _this.bindFormValidation();
                    // page.ScanCode.bindRechargeAmount($("#submitAmount"));
                    page.ScanCode.submit();
                }

                $(this).addClass("active");
            });

            mui("body").on("tap", "[data-online]", function () {
                $(".bank-selector >.ct a").removeClass("active");
                var key = $(this).parent().attr("key");
                var _href = $(this).attr("data-online");
                if (_href != null && _href != "undefined" && !map[key]) {
                    mui.ajax(_href, {
                        headers: {'Soul-Requested-With': 'XMLHttpRequest'},
                        dataType: 'text/html',
                        type: 'post',
                        async: true,
                        success: function (data) {
                            $("#deposit").html(data);
                            map[key] = data;
                            page.formSelector = "#onlineForm";
                            _this.bindFormValidation();
                            page.Online.bindChooseBank();
                            page.Online.bindRechargeAmount($("#submitAmount"));
                            page.Online.submit();
                        },
                        error: function (xhr, type, errorThrown) {
                            if (xhr.type != null)
                                _this.toast(window.top.message.deposit_auto['线上支付异常']);
                        }
                    });
                } else {
                    $("#deposit").html(map[key]);
                    page.formSelector = "#onlineForm";
                    _this.bindFormValidation();
                    page.Online.bindChooseBank();
                    page.Online.bindRechargeAmount($("#submitAmount"));
                    page.Online.submit();
                }
                $(this).addClass("active");
            });

            mui("body").on("tap", "[data-company]", function () {
                var _href = $(this).attr("data-company");
                _this.nextStep(this, _this, _href);
            });

            mui("body").on("tap", "[data-bitcoin]", function () {
                var _href = $(this).attr("data-bitcoin");
                _this.gotoUrl(_href);
            });

            mui("body").on("tap", "[data-fast]", function () {
                var _href = $(this).attr("data-fast");
                _this.nextStep(this, _this, _href);
            });

            mui("body").on("tap", "[data-fastRecharge]", function () {
                var url = $(this).attr("data-fastRecharge");
                // _this.gotoUrl(_href);
                // window.location.href = root + _href;
                if (os == 'android') {
                    window.gamebox.gotoPay(url);
                } else if (os == 'app_ios') {
                    gotoPay(url);
                } else {
                    window.open(url, "_blank");
                }
            });

            mui("body").on("tap", "a.mui-action-backs", function () {
                if (this.os == "app_ios")
                    goBack();
                else
                    _this.openWindowByMui("/mine/index.html");
            });
        },
        nextStep: function (e, _this, _href) {
            $(".bank-selector >.ct a").removeClass("active");
            var key = $(e).parent().attr("key");
            var url = null;
            var formId = "" ;
            if ($(e).attr("data-company")) {
                url = '/wallet/deposit/company/depositCash.html?searchId='+key;
                formId = "#companyCashForm";
            } else if ($(e).attr("data-fast")) {
                url = '/wallet/deposit/company/electronic/depositCash.html?searchId='+key;
                formId = "#electronicCashForm";
            }
            if (!map[key]) {
                mui.ajax(url, {
                    headers: {'Soul-Requested-With': 'XMLHttpRequest'},
                    dataType: 'text/html',
                    type: 'post',
                    async: true,
                    success: function (data) {
                        if (data != null) {
                            $("#deposit").html(data);
                            map[key] = data;
                            page.formSelector = formId;
                            _this.bindFormValidation();
                            // page.bindRechargeAmount($("#submitAmount"));
                            page.jumpSubmit(_this,_href);
                        }
                    },
                    error: function (xhr, type, errorThrown) {
                        if (xhr.type != null)
                            _this.toast(window.top.message.deposit_auto['线上支付异常']);
                    }
                });
            }else{
                $("#deposit").html(map[key]);
                page.formSelector = "#depositCashForm";
                _this.bindFormValidation();
                // page.bindRechargeAmount($("#submitAmount"));
                page.jumpSubmit(_this,_href);
            }
            $(e).addClass("active");
        },
        jumpSubmit: function (_this,_href) {
            _this._super;
            var baseCompanyDeposit = new BaseCompanyDeposit();
            var options = {
                type: "company_deposit",
                submitUrl: "/wallet/deposit/company/submit.html",
                depositUrl: _href,
                statusNum: 1,
                fromId : $(_this.formSelector)
            };
            baseCompanyDeposit.submit(options);
        }
    });
});
