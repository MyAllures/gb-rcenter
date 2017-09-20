/**
 * api免转页面js
 *
 **/

define(['common/MobileBasePage'], function (MobileBasePage) {
    /*单个api回收时间间隔*/
    var API_RECOVERY_TIME_INTERVAL = 3;
    /*一键回收时间间隔*/
    var RECOVER_TIME_INTERVAL = 10;
    return MobileBasePage.extend({
        init: function () {
            /*内容区域滚动*/
            mui('.mui-content.mui-scroll-wrapper').scroll({
                scrollY: true, //是否竖向滚动
                scrollX: false, //是否横向滚动
                startX: 0, //初始化时滚动至x
                startY: 0, //初始化时滚动至y
                indicators: false, //是否显示滚动条
                deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
                bounce: true //是否启用回弹
            });
            mui('.popover-scroll').scroll();
            this._super();
        },
        onPageLoad: function () {
            this._super();
            var _this = this;
            mui('body').on('tap', '.recovery', function () {
                _this.recovery(this);
            });

            mui('body').on('tap', '.reload', function () {
                window.location.reload();
            });
        },
        recovery: function (obj) {
            if(isAutoPay == false) {
                this.toast(window.top.message.transfer_auto["无免转"]);
                return;
            }
            if (!this.isAllowRecovery(obj)) {
                this.toast(window.top.message.transfer_auto["太频繁"]);
                return;
            }
            var title = $(obj).text();
            $(obj).attr("disabled", true);
            $(obj).text(window.top.message.transfer_auto["回收中"]);
            var apiId = $(obj).attr("apiId");
            var _this = this;
            var url = root + "/transfer/auto/recovery.html";
            if (apiId) {
                url = url + "?search.apiId=" + apiId;
            }
            mui.ajax(url, {
                dataType: 'json',
                success: function (data) {
                    if (data) {
                        if (data.msg) {
                            _this.toast(data.msg);
                        } else if (!apiId) {
                            _this.toast(window.top.message.transfer_auto["正在回收"]);
                        } else if (data.resultStatus) {
                            if (data.resultStatus == 'SUCCESS') {
                                _this.toast(window.top.message.transfer_auto["回收成功"]);
                                _this.recoveryCallback(obj, apiId);
                            } else if (data.resultCode == 1) {
                                _this.toast(window.top.message.transfer_auto["回收失败"].replace('{0}', data.resultStatus));
                            } else {
                                _this.toast(window.top.message.transfer_auto["正在回收中"]);
                                _this.recoveryCallback(obj, apiId);
                            }
                        } else {
                            _this.toast(window.top.message.transfer_auto["正在回收中"]);
                            _this.recoveryCallback(obj, apiId);
                        }
                    } else {
                        _this.toast(window.top.message.transfer_auto["系统繁忙"]);
                    }
                },
                error: function (data) {
                    _this.toast(window.top.message.transfer_auto["系统繁忙"]);
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
            var apiId = $(obj).attr("apiId");
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
         * 回收回调
         */
        recoveryCallback: function (obj, apiId) {
            if (!apiId) {
                window.location.reload();
            } else {
                mui.ajax(root + "/transfer/auto/getApiBalance.html?apiId=" + apiId, {
                    dataType: 'json',
                    success: function (data) {
                        $("._apiMoney_" + apiId).text(data.money);
                        $("#bar-asset").text(data.playerAssets);
                        $("header .bar-wallet").text(data.playerWallet);
                        $("header #_api_" + apiId).text(data.money);
                    },
                    error: function (data) {
                        console.log(data);
                    }
                });
            }
        }
    });
});