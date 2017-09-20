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
        bindEvent: function () {
            var _this = this;
            $(this.formSelector).on("click", "table tr", function (e) {
                _this.selectTr(e);
            });
        },
        /**
         * 重写query中onPageLoad方法，为了查询回调函数带页面初始化方法
         * @param form
         */
        onPageLoad: function () {
            this._super();
        },
        /**
         * 查询并设置状态
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
        selectTr: function (e) {
            var $checkbox = $(e.currentTarget).find("input[type=checkbox]");
            var $checkTarget = $("input[type=checkbox]:checked");
            if (e.target.tagName != 'INPUT' && $checkbox.val() != $checkTarget.val()) {
                $("input[type=checkbox]").prop("checked", false);
                $(e.currentTarget).find("input[type=checkbox]").prop("checked", true);
            } else {
                $(e.currentTarget).find("input[type=checkbox]").prop("checked", false);
            }
        }

    });
});