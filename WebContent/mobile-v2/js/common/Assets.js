/**
 * 资产 API
 * Created by fei on 16-12-5.
 */
define([], function () {
    /*一键回收时间间隔*/
    var RECOVER_TIME_INTERVAL = 10;

    return Class.extend({
        init: function () {
            this.onPageLoad();
            this.bindEvent();
        },

        bindEvent: function () {
            var _this = this;
            mui('.mui-bar-nav').on('tap', '.menu', function () {
                if (document.activeElement) {
                    document.activeElement.blur();
                }
                $('.mui-hide-bar').show();
                $('body').addClass('has-menu-ex');
                return false;
            });
            mui('body').on('tap', '.mui-hide-bar', function () {
                $(this).hide();
                $('body').removeClass('has-menu-ex');
                return false;
            });
            mui('header').on('tap', '.btn-refresh', function () {
                var loading = '<div class="loader api-loader"><div class="loader-inner ball-pulse api-div"><div></div><div></div><div></div></div></div>';
                $('.bar-wallet').html(loading);
                $('.bar-asset').html(loading);
                $('table#api-balance').find('td._money').html(loading);

                setTimeout(function () {
                    mui.ajax(root + '/api/refreshApi.html', {
                        type: 'POST',
                        dateType: 'json',
                        success: function (data) {
                            var d = eval('(' + data + ')');
                            $('.bar-wallet').html(d.currSign + d.playerWallet);
                            $('.bar-asset').html(d.currSign + d.playerAssets);

                            var apis = d.apis;
                            for (var i = 0; i < apis.length; i++) {
                                var html;
                                if (apis[i].status == 'maintain') {
                                    html = '<span class="text-red" style="font-size: 10px;">' + window.top.message.common_auto["游戏维护中"] + '</span>';
                                } else {
                                    html = d.currSign + apis[i].balance;
                                }
                                $('td#_api_' + apis[i].apiId).html(html);
                            }
                            _this.initScroll();
                        }
                    });
                }, 1000);
            });

            /**
             * 跳转页面
             */
            mui('header').on('tap', 'a[data-url]', function () {
                var url = $(this).attr("data-url");
                if ($(this).parent().find(".btn-deposit").size() > 0 && os == 'app_ios') {
                    gotoIndex(1);
                } else {
                    if (window.top.page)
                        window.top.page.gotoUrl(url);
                    else if (window.top.game)
                        window.top.game.gotoUrl(url);
                }

            });

            /**
             * 一键回收
             */
            mui('header').on('tap', '.btn-recovery', function () {
                _this.recovery();
            });
        },
        onPageLoad: function () {
            var _this = this;
            var href = window.location.href;
            if (sessionStorage.is_login == 'true' || isLogin == 'true'){
                _this.getAllApiBalance();
            }

            $('.mui-bar-nav .menu .ex').height(function () {
                return $(window).height() - 49 - $('nav').height();
            });

            $("#mui-asset").removeClass("mui-hide");
        },

        initScroll: function () {
            $('.mui-assets').height($(window).height() - 210 - $('nav').height());
            mui('.mui-assets').scroll({
                scrollY: true,
                indicators: true,
                deceleration: 0.0001,
                bounce: true
            })
        },
        recovery: function (obj) {
            if (isAutoPay == false) {
                this.toast(window.top.message.common_auto["无免转"]);
                return;
            }
            if (!this.isAllowRecovery(obj)) {
                this.toast(window.top.message.common_auto["太频繁"]);
                return;
            }
            var title = $(obj).text();
            $(obj).attr("disabled", true);
            $(obj).text("回收中...");
            var _this = this;
            var url = root + "/transfer/auto/recovery.html";
            mui.ajax(url, {
                dataType: 'json',
                success: function (data) {
                    if (data) {
                        if (data.msg) {
                            _this.toast(data.msg);
                        } else {
                            _this.toast(window.top.message.common_auto["正在回收"]);
                        }
                    } else {
                        _this.toast(window.top.message.common_auto["系统繁忙"]);
                    }
                    _this.recoveryCallBack();
                },
                error: function (data) {
                    _this.toast(window.top.message.common_auto["系统繁忙"]);
                },
                complete: function () {
                    $(obj).attr("disabled", false);
                    $(obj).text(title);
                    $(obj).attr('lastTime', new Date().getTime());
                }
            })
        },
        /**
         * 是否允许回收
         */
        isAllowRecovery: function (obj) {
            var lastTime = $(obj).attr("lastTime");
            if (!lastTime) {
                return true;
            }
            var date = new Date();
            var timeInterval = parseInt(date.getTime() - lastTime) / 1000;
            if (timeInterval >= RECOVER_TIME_INTERVAL) {
                return true;
            }
            return false;
        },
        recoveryCallBack: function () {
            var _this = this;
            var loading = '<div class="loader api-loader"><div class="loader-inner ball-pulse api-div"><div></div><div></div><div></div></div></div>';
            $('.bar-wallet').html(loading);
            $('.bar-asset').html(loading);
            $('table#api-balance').find('td._money').html(loading);

            setTimeout(function () {
                mui.ajax(root + '/transfer/auto/getApiBalances.html', {
                    type: 'POST',
                    dateType: 'json',
                    success: function (data) {
                        var d = eval('(' + data + ')');
                        $('.bar-wallet').html(d.currSign + d.playerWallet);
                        $('.bar-asset').html(d.currSign + d.playerAssets);

                        var apis = d.apis;
                        for (var i = 0; i < apis.length; i++) {
                            var html;
                            if (apis[i].status == 'maintain') {
                                html = '<span class="text-red" style="font-size: 10px;">' + window.top.message.common_auto["游戏维护中"] + '</span>';
                            } else {
                                html = d.currSign + apis[i].balance;
                            }
                            $('td#_api_' + apis[i].apiId).html(html);
                        }
                        _this.initScroll();
                    }
                });
            }, 1000);
        },
        /**
         * 消息提示
         * @param msg
         */
        toast: function (msg) {
            if (this.os == 'ios') {
                mui.toast(msg);
            } else if (this.os == 'app_android') {
                window.gamebox.toast(msg);
            } else {
                mui.toast(msg);
            }
        },

        getAllApiBalance: function () {
            var _this = this;
            mui.ajax(root + '/api/getSiteApi.html', {
                type: 'POST',
                dateType: 'json',
                beforeSend: function () {
                    $('table#api-balance').html('');
                },
                success: function (data) {
                    if (data) {
                        var d = eval('(' + data + ')');
                        $('#bar-username').html(d.username);
                        $('.bar-wallet').html(d.currSign + d.playerWallet);
                        $('.bar-asset').html(d.currSign + d.playerAssets);
                        var apis = d.apis;
                        for (var i = 0; i < apis.length; i++) {
                            var html = '<tr><td>' + apis[i].apiName + '</td>';
                            if (apis[i].status == 'maintain') {
                                html += '<td class="_money" id="_api_' + apis[i].apiId + '"><span class="text-red" style="font-size: 10px;">' + window.top.message.common_auto["游戏维护中"] + '</span></td></tr>';
                            } else {
                                html += '<td class="_money" id="_api_' + apis[i].apiId + '">' + d.currSign + '' + apis[i].balance + '</td></tr>';
                            }
                            $('table#api-balance').append(html);
                        }
                        _this.initScroll();
                    } else {
                        sessionStorage.is_login = "false";
                    }
                },
                error: function (xhr) {
                    if (xhr.status == '600')
                        sessionStorage.is_login = "false";
                }
            });
        }
    });
});

