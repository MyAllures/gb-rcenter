/**
 * 左右两侧菜单js
 */
define(['site/plugin/template'], function (Template) {
    return Class.extend({
        tos: null,
        init: function () {
            this.tos = whatOs();
            this.onPageLoad();
            this.bindButtonEvents();
            this.gotoFragment();
        },
        onPageLoad: function () {
            this.getHeadInfo();
            this.refreshBalance();
            this.betBack();
            if ($("#template_lotteryMenu").length > 0) {
                mui.ajax(root + "/hall/getLottery.html", {
                    type: 'post',
                    dataType: 'json',
                    success: function (data) {
                        $(".lottery-kind-list").html(Template('template_lotteryMenu', {list: data}));
                    }
                })
            }
            if (this.tos === 'app_android') {
                $('div.middle-content-bat').attr('style', 'top:0');
            }
            if(this.tos == 'app_android' || this.tos == 'app_ios'){
                $(".mui-scroll-wrapper.middle-content").addClass("app-middle-content");
            }
        },
        bindButtonEvents: function () {
            var _this = this;
            mui('body').on('tap', 'li.mui-table-view-cell a[data-href]', function () {
                page.gotoUrl($(this).data('href'));
            });

            mui('body').on('tap', 'li.mui-table-view-cell a[data-url]', function () {
                var code = $(this).data('code');
                var url = $(this).data('url');
                mui.ajax(root + "/hall/getLotteryStatus.html", {
                    data: {'code': code},
                    type: "post",
                    dataType: 'json',
                    success: function (data) {
                        if (data == 1) {
                            page.gotoUrl(root + url);
                        } else {
                            mui.toast("正在维护中");
                        }
                    }
                })
            });

            mui("body").on("tap", "span.mui-icon-refreshempty", function () {
                _this.getBalance();
            });

            mui("body").on('tap', "button.user-login", function () {
                var canvasRight = $('.mui-off-canvas-right').hasClass('mui-active');
                if (canvasRight) {
                    mui('.mui-off-canvas-right').offCanvas('close');
                }
                page.gotoUrl("/login/commonLogin.html");
            });

            this.gotoBet();
            //退出登录
            this.logout();
        },
        //获取头部信息
        getHeadInfo: function () {
            var _this = this;
            if ($(".aside-right-menu").length <= 0 && $('a.bet_menu').length <= 0) {
                return;
            }
            mui.ajax(root + "/getHeadInfo.html", {
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    if (data.isLogin == true) { //已登录
                        $(".right_username").text(data.name);
                        isLogin = 'true';
                        $(".is-login").show();
                        $(".un-login").hide();
                        if (data.avatar) {
                            $(".avatar").attr("src", data.avatar);
                        }
                        _this.getBalance();
                    } else { //未登录
                        isLogin = 'false';
                        $(".is-login").hide();
                        $(".un-login").show();
                    }
                }
            })
        },
        /**
         * 获取余额
         */
        getBalance: function () {
            if (isLogin && isLogin == 'true' && $(".balance").length > 0) {
                mui.ajax(root + '/hall/getBalance.html', {
                    dataType: 'json',
                    type: 'POST',
                    success: function (data) {
                        $(".balance").text('￥' + data.balance);
                        $(".right_username").text(data.userName);
                    }
                });
            }
        },

        gotoFragment: function () {
            var _this = this;
            mui("body").on("tap", "[data-skip]", function () {
                var canvasLeft = $('.mui-off-canvas-left').hasClass('mui-active');
                if (canvasLeft) {
                    mui('.mui-off-canvas-left').offCanvas('close');
                }
                var canvasRight = $('.mui-off-canvas-right').hasClass('mui-active');
                if (canvasRight) {
                    mui('.mui-off-canvas-right').offCanvas('close');
                }

                var target = $(this).data('target');
                var dos = $(this).data('os');
                var url = $(this).data('skip');
                if (_this.tos === 'app_android' && typeof target !== 'undefined') {
                    window.gamebox.gotoFragment(target);
                } else if (dos === 'app_ios') {
                    gotoTab(target);
                } else {
                    page.gotoUrl(url);
                }
            });
        },

        logout: function () {
            var _this = this;
            mui("body").on("tap", ".user-logout", function () {
                sessionStorage.is_login = false;
                if (_this.tos === 'app_ios')
                    loginOut();
                if (_this.tos === 'app_android')
                    window.gamebox.logout();
                else
                    page.gotoUrl("/passport/logout.html");
            });
        },

        gotoBet: function () {
            var _this = this;
            mui('body').on('tap', '[data-bet]', function () {
                var href = $(this).data('bet');
                if (_this.tos === 'app_android' && isLotterySite == 'true') {
                    window.gamebox.gotoBet(window.location.origin + href);
                } else {
                    page.gotoUrl(href);
                }
            });
        },

        refreshBalance: function () {
            var _this = this;
            mui('.mui-media').on('tap', '#refreshBalance', function () {
                _this.loadBalance();
                mui.toast('刷新成功')
            });
        },

        loadBalance: function () {
            var _this = this;
            mui.ajax('/mine/getBalance.html', {
                type: 'POST',
                success: function (data) {
                    $('font#_balance').text('￥' + data);
                }
            })
        },

        betBack: function () {
            var _this = this;
            mui('header').on('tap', '.betBack', function () {
                if (_this.tos === 'app_ios') {
                    gotoIndex('/lottery/mainIndex.html');
                } else {
                    page.gotoUrl('/lottery/mainIndex.html');
                }
            })
        }
    });
});
