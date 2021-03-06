/**
 * Created by bruce on 16-12-6.
 */
define(['site/deposit/BaseDeposit', 'site/deposit/BaseCompanyDeposit', 'site/plugin/swiper.min.js'], function (BaseDeposit, BaseCompanyDeposit, Swiper) {
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

            //如果第一个元素不是比特币支付或数字货币支付则默认选中
            var $depositWay = $("#depositWay li>a:first");
            if ($depositWay) {
                var key = $("#depositWay li:first").attr("key");
                if (key && (key != 'bitcoin_fast' && key != 'digiccyAccountInfo' && key != 'isFastRecharge')) {
                    mui.trigger($depositWay[0], "tap");
                }
            }

            var mySwiper = new Swiper ('.swiper-container', {
                observer:true,
                observeParents:true,
                pagination: {
                    el: '.swiper-pagination'
                }
            });
            for(var i=0;i<mySwiper.length;i++) {
                mySwiper[i].init();
            }

        },

        bindEvent: function () {
            this._super();
            var _this = this;
            _this.os = this.whatOs();
            if (_this.os == 'android') {
                window.addEventListener("resize", function () {
                    if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
                        window.setTimeout(function () {
                            document.activeElement.scrollIntoViewIfNeeded();
                        }, 0);
                    }
                })
            }

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
                if (this.os == 'app_android') {
                    window.gamebox.gotoFragment(1);
                } else if (this.os == 'app_ios') {
                    gotoTab(1);
                } else {
                    _this.gotoUrl(_href);
                }
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

            mui("body").on("tap", "div.closeHelpBox", function () {
                $("div.depositHelpBox").hide();
            });
            //联系客服
            mui("body").on('tap', '#loadCustomerId', function () {
                page.footer.loadCustomerService();
                var url = $('.customer').attr('data-skip');
                _this.gotoUrl(url);
            });
            //绑定关闭失败提示弹窗事件
            mui("body").on('tap', '#continueDeposit', function () {
                $("#failureHints").hide();
                $("#failureHintsMasker").hide();
                var channel = $("#channel").val();
                if(channel == "online"){
                    page.Online.onlineContinueDeposit();
                }else if(channel == "scanCode"){
                    page.ScanCode.scanContinueDeposit();
                }else if(channel == "company" || channel == "electronic"){
                    var baseCompanyDeposit = new BaseCompanyDeposit();
                    baseCompanyDeposit.companyContinueDeposit();
                }


            });
            //绑定失败提示弹窗重新存款事件
            mui("body").on('tap', '#goToDepositPage', function () {
                if (_this.os == 'app_android') {
                    window.gamebox.depositAgain();
                } else if (_this.os == 'app_ios') {
                    gotoIndex(1);
                } else {
                    _this.gotoUrl($(this).attr('_href'));
                }
            });

        },
        nextStep: function (e, _this, _href) {
            $(".bank-selector >.ct a").removeClass("active");
            var key = $(e).parent().attr("key");
            var url = null;
            var formId = "";
            var depositType = "";
            if ($(e).attr("data-company")) {
                url = '/wallet/deposit/company/depositCash.html?searchId=' + key;
                formId = "#companyCashForm";
                depositType = "company";
            } else if ($(e).attr("data-fast")) {
                url = '/wallet/deposit/company/electronic/depositCash.html?searchId=' + key;
                formId = "#electronicCashForm";
                depositType = "electronic";
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
                            page.jumpSubmit(_this, _href,depositType);
                        }
                    },
                    error: function (xhr, type, errorThrown) {
                        if (xhr.type != null)
                            _this.toast(window.top.message.deposit_auto['线上支付异常']);
                    }
                });
            } else {
                $("#deposit").html(map[key]);
                page.formSelector = formId;
                _this.bindFormValidation();
                // page.bindRechargeAmount($("#submitAmount"));
                page.jumpSubmit(_this, _href);
            }
            $(e).addClass("active");
        },
        jumpSubmit: function (_this, _href ,depositType) {
            _this._super;
            var baseCompanyDeposit = new BaseCompanyDeposit();
            var options = {
                type: "company_deposit",
                submitUrl: "/wallet/deposit/company/submit.html",
                depositUrl: _href,
                statusNum: 1,
                fromId: $(_this.formSelector),
                depositType:depositType
            };
            baseCompanyDeposit.submit(options);
        }
    });
});
