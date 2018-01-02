    /**
 * Created by bruce on 16-12-6.
 */
define(['site/deposit/BaseDeposit','site/deposit/BaseCompanyDeposit'], function(BaseDeposit,BaseCompanyDeposit) {
    return BaseDeposit.extend({

        init: function (formSelector) {
            this._super();
        },
        
        onPageLoad: function () {
            this._super();
            mui('.mui-scroll-wrapper').scroll({});
            var _this = this;

            (function ($$,doc) {
                mui.ajax(root + '/wallet/deposit/loadBankNotice.html', {
                    type: 'post',
                    async: true,
                    success: function (data) {
                        document.getElementById("bankNotice").innerHTML = data;
                        if($("#bankNoticeCount").val() == '0')
                            $("#bankNotice").addClass("mui-hide");
                        else{
                            $("#bankNotice").removeClass("mui-hide");
                            _this.startMarquee(22, 22, 2000);
                        }
                    }
                });

                mui('.bank-selector').on('tap','li > a',function(e){
                    var activeLi = $("a","li").hasClass("active");
                    if (activeLi) {
                        $("a","li").removeClass("active");
                    }
                    $(e.target).addClass("active");
                });
            })(mui,document);

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
                $('.masker-notice-box').css({'height':winHeight}).show();
                $gnb.slideDown(function () {
                    mui('#box-notice').slider().gotoItem(idx, 500);
                });
            });
            mui(".deposit-tab01").on('tap', '#fastDeposit', function (e) {
                var url = $(this).data("href");
                if(os == 'android'){
                    window.gamebox.gotoPay(url);
                }else if(os == 'app_ios'){
                    gotoPay(url);
                }else{
                    window.open(url, "_blank");
                }
            });
            mui('body').on('tap', '.masker-notice-box', function (event) {
                $('.gb-notice-box').slideUp(function(){
                    $('body').removeClass('has-menu-ex');
                    $('.mui-hide-bar').hide();
                    $('.masker-notice-box').hide();
                });
            });

            //如果第一个元素是在线支付,扫码支付默认选中
            var $depositWay = $("#depositWay li>a:first");
            if ($depositWay) {
                var key = $("#depositWay li:first").attr("key");
                if (key && (key == 'online_deposit' || key == 'wechatpay_scan' || key == 'alipay_scan'||key == 'qqwallet_scan')) {
                    mui.trigger($depositWay[0],"tap");
                }
            }
        },
        
        bindEvent: function() {
            this._super();
            var _this = this;
            mui("body").on("tap","[data-scan]",function () {
                if (document.activeElement) {
                    document.activeElement.blur();
                }
                var _href = $(this).attr("data-scan");
                console.log("扫码");
                if(_href!=null&&_href!="") {
                    mui.ajax(_href, {
                        headers: {'Soul-Requested-With': 'XMLHttpRequest'},
                        dataType: 'text/html',
                        type: 'post',
                        async: true,
                        success: function (data) {
                            $("#deposit").html(data);
                            page.formSelector = "#scanForm";
                            _this.bindFormValidation();
                            page.ScanCode.bindRechargeAmount($("#submitAmount"));
                            page.ScanCode.submit();
                        },
                        error: function (xhr, type, errorThrown) {
                            if(xhr.type!=null)
                                _this.toast(window.top.message.deposit_auto['线上支付异常']);
                        }
                    });
                }
            });

            mui("body").on("tap","[data-online]",function () {
                if (document.activeElement) {
                    document.activeElement.blur();
                }
                var _href = $(this).attr("data-online");
                if(_href!=null&&_href!=""&&_href!="undefined") {
                    mui.ajax(_href, {
                        headers: {'Soul-Requested-With': 'XMLHttpRequest'},
                        dataType: 'text/html',
                        type: 'post',
                        async: true,
                        success: function (data) {
                            $("#deposit").html(data);
                            page.formSelector = "#onlineForm";
                            _this.bindFormValidation();
                            page.Online.bindChooseBank();
                            page.Online.bindRechargeAmount($("#submitAmount"));
                            page.Online.submit();
                        },
                        error: function (xhr, type, errorThrown) {
                            if(xhr.type!=null)
                                _this.toast(window.top.message.deposit_auto['线上支付异常']);
                        }
                    });
                }
            });

            mui("body").on("tap","[data-company]",function () {
                var _href = $(this).attr("data-company");
                _this.mySubmit(this,_this,_href);
            });

            mui("body").on("tap","[data-bitcoin]",function () {
                var _href = $(this).attr("data-bitcoin");
                _this.gotoUrl(_href);
            });

            mui("body").on("tap","[data-fast]",function () {
                var _href = $(this).attr("data-fast");
                _this.mySubmit(this,_this,_href);
            });

            mui("body").on("tap","[data-fastRecharge]",function () {
                var url = $(this).attr("data-fastRecharge");
                // _this.gotoUrl(_href);
                // window.location.href = root + _href;
                if(os == 'android'){
                    window.gamebox.gotoPay(url);
                }else if(os == 'app_ios'){
                    gotoPay(url);
                }else{
                    window.open(url, "_blank");
                }
            });

            mui("body").on("tap","a.mui-action-backs",function () {
                if(this.os == "app_ios")
                    goBack();
                else
                    _this.openWindowByMui("/mine/index.html");
            });
        },
        mySubmit:function(e,_this,_href,options){
            if (document.activeElement) {
                document.activeElement.blur();
            }
            var url = null;
            if($(e).attr("data-company")){
                url = '/wallet/deposit/company/depositCash.html';
            }else if($(e).attr("data-fast")){
                url = '/wallet/deposit/company/electronic/depositCash.html';
            }
            mui.ajax(url, {
                headers: {'Soul-Requested-With': 'XMLHttpRequest'},
                dataType: 'text/html',
                type: 'post',
                async: true,
                success: function (data) {
                    $("#deposit").html(data);
                    page.formSelector = "#depositCashForm";
                    _this.bindFormValidation();
                    page.bindRechargeAmount($("#submitAmount"));
                    page.submit(e,_this,_href);
                },
                error: function (xhr, type, errorThrown) {
                    if(xhr.type!=null)
                        _this.toast(window.top.message.deposit_auto['线上支付异常']);
                }
            });
        },
        submit: function (_e,_this,_href) {
            var baseCompanyDeposit = new BaseCompanyDeposit();
            var options = {
                type:"company_deposit",
                submitUrl:"/wallet/deposit/company/submit.html",
                depositUrl:_href,
                statusNum:1
            };
            baseCompanyDeposit.submit(options);
        }
    });
});



