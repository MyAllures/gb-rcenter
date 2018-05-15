/**
 * 资金管理-充值管理列表
 */
define(['common/BaseListPage'], function (BaseListPage) {

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form";
            this._super();
        },
        /**
         * 重写query中onPageLoad方法，为了查询回调函数带页面初始化方法
         * @param form
         */
        onPageLoad: function () {
            this._super();
        },

        bindEvent: function () {
            this._super();
            var _this = this;
        },

        /**
         * 检测转账状态
         * @param e
         * @param option
         */
        checkStatus: function (e, option) {
            var _this = this;
            window.top.topPage.ajax({
                url: root + "/operate/transferBySite/checkTransfer.html?search.transactionNo=" + option.transactionNo + "&siteId=" + option.siteId,
                loading: true,
                dataType: 'json',
                success: function (data) {
                    if (data.state == true) {
                        var transferState = data.transferState;
                        if (transferState == 'success') {
                            window.top.topPage.showInfoMessage("该笔订单已自动处理为成功！");
                        } else if (transferState == 'failure') {
                            window.top.topPage.showInfoMessage("该笔订单已自动处理为失败！失败原因为：" + data.reason);
                        } else {
                            window.top.topPage.showInfoMessage("获取api结果为处理中，请稍后再试！获取api结果为：" + data.reason);
                        }
                    } else {
                        window.top.topPage.showErrorMessage("非法请求：无订单或者订单已处理，可刷新页面重新尝试！");
                    }
                    _this.query(e);
                    $(e.currentTarget).unlock();
                },
                error: function (data) {
                    window.top.topPage.showInfoMessage("服务忙，请稍后再试！");
                    $(e.currentTarget).unlock();
                }
            })
        },
        /**
         * 仅查询状态
         * @param e
         * @param option
         */
        checkStatusOnly: function (e, option) {
            var _this = this;
            window.top.topPage.ajax({
                url: root + "/operate/transferBySite/checkTransferOnly.html?search.transactionNo=" + option.transactionNo + "&siteId=" + option.siteId,
                loading: true,
                dataType: 'json',
                success: function (data) {
                    window.top.topPage.showInfoMessage(data.transferResult);
                    $(e.currentTarget).unlock();
                },
                error: function (data) {
                    window.top.topPage.showErrorMessage(data);
                    $(e.currentTarget).unlock();
                }
            })
        },
        /**
         * 重发
         * @param e
         * @param option
         */
        resend: function (e, option) {
            var _this = this;
            var _time = 10;
            var interval = setInterval(function () {
                _time = _time - 1;
                if (_time == 0) {
                    window.clearInterval(interval);
                    $(e.currentTarget).unlock();
                }
            }, 1000);
            _this._confirmResend(e, option);
        },
        _confirmResend: function (e, option) {
            var _this = this;
            var siteId = option.siteId;
            var apiId = option.apiId;
            var orderNo = option.orderNo;
            var userId = option.userId;
            var exceptionTransferId = option.exceptionTransferId;
            window.top.topPage.ajax({
                url: root + "/operation/exceptionTransfer/resend.html",
                dataType: 'json',
                data: {
                    "search.apiId": apiId,
                    "search.userId": userId,
                    "search.transactionNo": orderNo,
                    "siteId": siteId,
                    "exceptionTransferId": exceptionTransferId
                },
                success: function (data) {
                    if (data.state) {
                        window.top.topPage.showSuccessMessage("重发完成，结果：" + data.msg);
                        _this.query(e);
                    } else {
                        window.top.topPage.showErrorMessage(data.msg);
                    }
                },
                error: function (data) {
                    window.top.topPage.showInfoMessage("服务忙，请稍后再试！");
                }
            })
        }
    });
});