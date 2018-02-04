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
            mui(".mui-off-canvas-left").on("tap", "li.mui-table-view-cell", function (e) {
                $("li.mui-table-view-cell").removeClass("active");
                mui('.mui-off-canvas-wrap').offCanvas('toggle');
                $(this).addClass("active");
            });
            mui(".mui-off-canvas-left").on("tap", ".login-status .h-btn", function (e) {
                mui('.mui-off-canvas-wrap').offCanvas('toggle');
            });
            $("._download").on("tap", function (e) {
                var isLogin = sessionStorage.is_login;
                var url = $(this).data("download");

                var isShowQrCode = $("#isShowQrCode").val(); //获取二维码开关
                if (isLogin != true && isLogin != "true" && (isShowQrCode == true || isShowQrCode == "true")) {
                    _this.toast("请登入下载");
                    window.setTimeout(function () {
                        _this.gotoUrl(url)
                    },3000);
                } else {
                    _this.gotoUrl($(this).data("download"));
                }
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
           /* if ($(".mui-pull-right").length <= 0 && $(".mui-off-canvas-left").length <= 0 && sessionStorage.is_login!='false') {
                return;
            }*/
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
                        $("._leftLogin").removeClass("mui-hide");
                        $("._leftLogout").removeClass("mui-hide");
                        $("._leftUsername").text(data.name);
                        $("._leftUnLogin").hide();
                        _this.loadBalance();
                        sessionStorage.is_login = true;
                    } else { //未登录
                        isLogin = 'false';
                        $(".is-login").hide();
                        $(".un-login").show();
                        $("._leftLogin").addClass("mui-hide");
                        $("._leftLogout").addClass("mui-hide");
                        $("._leftUnLogin").show();
                    }
                }
            })
        },
        gotoFragment: function () {
            var _this = this;
            mui("body").on("tap", "[data-skip]", function () {
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
                var demo = $(this).data('demo');
                if (demo) {
                    window.top.page.openLayer('试玩账号无权限访问');
                    return;
                }
                if (isLogin == 'true' && url.indexOf('/lottery/mainIndex') > 0) {
                    var postData = {};
                    postData.apiId = 22;
                    mui.ajax(root + "/transfer/auto/loginAndAutoTransfer.html", {
                        dataType: 'json',
                        data: postData,
                        type: "POST",
                        success: function (data) {
                            _this.hideLoading();
                            if (data) {
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
                            } else {
                                _this.openLayer(window.top.message.game_auto['无法登录']);
                                $("[class='mui-backdrop mui-active']").remove();
                                _this.reload();
                            }
                        },
                        error: function (error) {
                            if (error.status === 600) {
                                _this.signIn(postData);
                            } else if (error.status === 606) {
                                _this.gotoUrl(root + '/errors/606.html');
                            } else {
                                _this.openLayer(window.top.message.game_auto['无法登录']);
                                $("[class='mui-backdrop mui-active']").remove();
                                _this.reload();
                            }
                        },
                        complete: function () {
                            _this.hideGameLoading();
                        }
                    });
                } else {
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
                }
            });
        },

        logout: function () {
            var _this = this;
            mui("body").on("tap", ".user-logout", function () {
                sessionStorage.is_login = false;
                if (os === 'app_ios') {
                    mui.ajax(root + "/passport/logout.html", {
                        headers: {
                            "Soul-Requested-With": "XMLHttpRequest"
                        },
                        success: function (data) {
                            if (data) {
                                loginOut();
                            }
                        }
                    });
                } else if (os === 'android') {
                    window.gamebox.logout();
                } else {
                    _this.gotoUrl("/passport/logout.html?t=lottery");
                }
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

