/**
 * Created by eagle on 15-8-27.
 */

define(['common/BaseListPage'], function (BaseListPage) {

    return BaseListPage.extend({

        init:function() {
            this.formSelector = "form";
            this._super();
        },

        onPageLoad: function () {
            this._super();
        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            this._super();
        },

        doCheck:function (e, opt) {
            window.top.topPage.ajax({
                url: root + "/activityHall/activity/queryExistMoneyActivity.html",
                type: "POST",
                dataType: "JSON",
                success: function (data) {
                    if (data.state) {
                        page.showPopover(e, {}, "danger", window.top.message.operation_auto['已经有一个红包活动存在'], true);
                    } else {
                        $("#createMoneyAcvitity").click();
                    }
                }
            });
            return false;
        }
    });
});
