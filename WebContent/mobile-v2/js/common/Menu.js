define(['common/MobileBasePage'], function (Mobile) {
    var t = this;
    return Mobile.extend({
        init: function () {
            this._super();
            mui('.mui-off-canvas-left .mui-scroll-wrapper').scroll({
                indicators: false
            });
        },
        onPageLoad: function () {
            this._super();
            this.getHeadInfo();
            this.gotoFragment();
            this.logout();
            var _this = this;
            mui(".mui-off-canvas-left").on("tap","li.mui-table-view-cell",function (e) {
                $("li.mui-table-view-cell").removeClass("active");
                mui('.mui-off-canvas-wrap').offCanvas('toggle');
                $(this).addClass("active");
            });
            mui(".mui-off-canvas-left").on("tap",".login-status .h-btn",function (e) {
                mui('.mui-off-canvas-wrap').offCanvas('toggle');
            });
            $("._download").on("tap",function (e) {
                var win = window.open($(this).data("download"), "_blank");
                win.document.cookie = "ACCESS_TERMINAL=mobile;expires=0";
            });
            mui("body").on('tap', "button.user-login", function () {
                var _href = "/index.html";
                _this.toLogin(_href);
            });

            this.refreshBalance();
        },
        //获取头部信息
        getHeadInfo: function () {
            var _this = this;
            if ($(".aside-right-menu").length <= 0) {
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
                        _this.loadBalance();
                    } else { //未登录
                        isLogin = 'false';
                        $(".is-login").hide();
                        $(".un-login").show();
                    }
                }
            })
        },
        gotoFragment : function () {
            var _this = this;
            mui("body").on("tap", "[data-skip]", function() {
                var canvasStatus;
                if (mui('.mui-off-canvas-right').length > 0) {
                    canvasStatus = mui('.mui-off-canvas-right').offCanvas().isShown();
                } else if (mui('.mui-off-canvas-left').length > 0) {
                    canvasStatus = mui('.mui-off-canvas-left').offCanvas().isShown();
                }
                if (canvasStatus) {
                    mui('.mui-off-canvas-right').offCanvas('close');
                }

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

        logout: function () {
            var _this = this;
            mui("body").on("tap", ".user-logout", function () {
                sessionStorage.is_login = false;
                if(os === 'app_ios')
                    loginOut();
                if (os === 'android')
                    window.gamebox.logout();
                else
                    _this.gotoUrl("/passport/logout.html?t=lottery");
            });
        },

        refreshBalance: function () {
            var _this = this;
            mui('.mui-media').on('tap', '#refreshBalance', function () {
                _this.loadBalance();
                _this.toast('刷新成功')
            });
        },

        loadBalance: function () {
            mui.ajax(root + '/mine/getBalance.html', {
                type: 'POST',
                success: function (data) {
                    $('font#_balance').text('￥' + data);
                }
            })
        }
    });
});

