/**
 * 资金管理-转账js
 */
define(['common/BaseEditPage', 'Util', 'tooltips'], function (BaseEditPage) {
    /*单个api回收时间间隔*/
    var API_RECOVERY_TIME_INTERVAL = 3;
    /*一键回收时间间隔*/
    var RECOVER_TIME_INTERVAL = 10;
    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form[name=transferForm]";
            this._super(this.formSelector);
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            //显示隐藏刷新按钮
            $(this.formSelector).on("mouseenter", ".game", function (e) {
                $(this).find(".btn-money-back-blue").show();
            });

            $(this.formSelector).on("mouseleave", ".game", function (e) {
                $(this).find(".btn-money-back-blue").hide();
            });
        },
        onPageLoad: function () {
            this._super();
            this.loadGameAnnouncement();
        },
        /**
         * 加载游戏公告
         */
        loadGameAnnouncement: function () {
            var _this = this;
            window.top.topPage.ajax({
                url: root + "/home/loadGameAnnouncement.html?t=" + new Date().getTime(),
                success: function (data) {
                    $(_this.formSelector + " div.gameAnnouncement").html(data);
                }
            });
        },
        /**
         * 更多游戏公告
         */
        moreGameAnnouncement: function (e, option) {
            var $select = $(".sidebar-nav .select", window.top.document);
            $select.removeClass("select");
            var $current = $(".sidebar-nav a[data^='/operation/pAnnouncementMessage/gameNotice.html']", window.top.document);
            $current.parent().addClass("select");
            $current.click();
            $(e.currentTarget).unlock();
        },
        /**
         * 加载轮播图
         */
        loadCarousel: function () {
            var _this = this;
            window.top.topPage.ajax({
                url: root + "/home/loadCarousel.html?t=" + new Date().getTime(),
                success: function (data) {
                    $(_this.formSelector + " div.right-asset").html(data);
                }
            });
        },
        /**
         * 游戏公告详细
         * @param e
         * @param option
         */
        gameDetail: function (e, option) {
            var $select = $(".sidebar-nav .select", window.top.document);
            $select.removeClass("select");
            var $current = $(".sidebar-nav a[data^='/operation/pAnnouncementMessage/gameNotice.html']", window.top.document);
            $current.parent().addClass("select");
            $current.click();
            $(e.currentTarget).unlock();
        },
        /**
         * 刷新总资产
         * @param e
         * @param option
         */
        getAllApiBalance: function (e, option) {
            $(".total-money").hide();
            $(".wallet-money").hide();
            $(".game").hide();
            $(".loading-api").show();
            $(".m-loading-icon-x").show();
            window.top.topPage.ajax({
                url: root + "/transfer/auto/getApiBalances.html",
                dataType: 'json',
                success: function (data) {
                    var apis = data.apis;
                    for (var i = 0; i < apis.length; i++) {
                        var apiId = apis[i].apiId;
                        if (apis[i].synStatus == 'abnormal') {
                            $('#api-money-' + apiId).html('<img src="' + resRoot + '/images/loadingimg2.gif">');
                        } else {
                            $('#api-money-' + apiId).text(apis[i].balance);
                        }
                        if (apis[i].id) {
                            $(".api-" + apiId).find(".api-logo-box").addClass("active");
                        }
                    }
                    $(".total-money").text(data.playerAssets);
                    $(".wallet-money").text(data.playerWallet);
                },
                error: function () {

                },
                complete: function () {
                    var obj = $(".api-info");
                    for (var i = 0; i < obj.length; i++) {
                        $(obj[i]).next(".loading-api").hide();
                        $(obj[i]).show();
                    }
                    $(".m-loading-icon-x").hide();
                    $(".wallet-money").show();
                    $(".total-money").show();
                    $(e.currentTarget).unlock();
                }
            })
        },
        /**
         * 刷新单个api余额
         * @param e
         * @param option
         */
        getApiBalance: function (e, option) {
            var apiId = option.api;
            $(".total-money").hide();
            $(".wallet-money").hide();
            $(".api-" + apiId).hide();
            $(".loading-" + apiId).show();
            $(".m-loading-icon-x").show();
            if (apiId) {
                window.top.topPage.ajax({
                    url: root + "/transfer/auto/getApiBalance.html?apiId=" + apiId,
                    dataType: 'json',
                    success: function (data) {
                        $(".api-" + apiId).find(".api-money").text(data.money);
                        $(".total-money").text(data.playerAssets);
                        $(".wallet-money").text(data.playerWallet);
                        if (data.synchronizationStatus == 'abnormal') {
                            $('#api-money-' + apiId).html('<img src="' + resRoot + '/images/loadingimg2.gif">');
                        } else {
                            $('#api-money-' + apiId).find(".api-money").text(data.money);
                        }
                        if (data.id) {
                            $(".api-" + apiId).find(".api-logo-box").addClass("active");
                        }
                    },
                    error: function () {

                    },
                    complete: function () {
                        $(".m-loading-icon-x").hide();
                        $(".loading-" + apiId).hide();
                        $(".api-" + apiId).show();
                        $(".wallet-money").show();
                        $(".total-money").show();
                    }
                });
            }
        },
        /**
         * 回收资金
         * @param e
         * @param option
         */
        recoveryApi: function (e, option) {
            var isAutoPay = this.getCookie("isAutoPay");
            if (isAutoPay != 'true') {
                e.page.showPopover(e, option, 'warning', window.top.message.fund_auto['当前设置无免转不能回收'], true);
                return;
            }
            if (!this.isAllowRecovery(e, option)) {
                e.page.showPopover(e, option, 'warning', window.top.message.fund_auto['回收太频繁请休息片刻'], true);
                return;
            }
            var apiId = option.api;
            var url = root + "/transfer/auto/recovery.html";
            if (apiId) {
                url = url + "?search.apiId=" + apiId;
            }
            var _this = this;
            $(e.currentTarget).attr("lastTime", new Date().getTime());
            window.top.topPage.ajax({
                url: url,
                dataType: 'json',
                success: function (data) {
                    if (data) {
                        if (data.msg) {
                            e.page.showPopover(e, option, 'warning', data.msg, true);
                        } else if (!apiId) {
                            e.page.showPopover(e, option, 'warning', window.top.message.fund_auto['正在回收所有api资金请稍候'], true);
                            _this.recoveryCallback(e, option);
                        } else if (data.resultStatus) {
                            if (data.resultStatus == 'SUCCESS') {
                                e.page.showPopover(e, option, 'success',window.top.message.fund_auto['回收成功请查看钱包余额'] , true);
                                _this.recoveryCallback(e, option);
                            } else if (data.resultCode == 1) {
                                e.page.showPopover(e, option, 'error', window.top.message.fund_auto['回收失败'].replace("{0}",data.resultStatus), true);
                            } else {
                                e.page.showPopover(e, option, 'warning', window.top.message.fund_auto['正在回收中请稍候再来查看'], true);
                                _this.recoveryCallback(e, option);
                            }
                        } else {
                            e.page.showPopover(e, option, 'warning', window.top.message.fund_auto['正在回收中请稍候再来查看'], true);
                            _this.recoveryCallback(e, option);
                        }
                    } else {
                        e.page.showPopover(e, option, 'warning', window.top.message.fund_auto['系统繁忙请稍候再试'], true);
                    }
                }
            })
        },

        /**
         * 是否允许回收
         */
        isAllowRecovery: function (e, option) {
            var obj = e.currentTarget;
            var apiId = option.api;
            var lastTime = $(obj).attr("lastTime");
            if (!lastTime) {
                return true;
            }
            var date = new Date();
            var timeInterval = parseInt(date.getTime() - lastTime) / 1000;
            if (apiId && timeInterval >= API_RECOVERY_TIME_INTERVAL) {
                return true;
            } else if (!apiId && timeInterval >= RECOVER_TIME_INTERVAL) {
                return true;
            }
            return false;
        },
        /**
         * 切换额度转换回调
         * @param e
         * @param option
         */
        changeAutoPayCallback: function (e, option) {
            var isAutoPay = this.getCookie("isAutoPay");
            if ( !isAutoPay||option.data != isAutoPay) {
                this.setCookie("isAutoPay", option.data);
                window.top.topPage.showPage(window.top.location.hash.subString(1));
            }
        },
        /**
         *
         * @param e
         * @param option
         */
        recoveryCallback: function (e, option) {
            if (option.api) {
                this.getApiBalance(e, option);
            } else {
                this.getAllApiBalance(e, option);
            }
        },
        /**
         * 链接到资金记录
         */
        linkTransaction: function () {
            var $select = $(".sidebar-nav .select", window.top.document);
            $select.removeClass("select");
            var $current = $(".sidebar-nav a[data^='/fund/transaction/list.html']", window.top.document);
            $current.parent().addClass("select");
            $current.click();
        }
    });
});