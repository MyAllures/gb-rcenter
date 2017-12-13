/**
 * Created by Orange on 2015-11-17
 */

define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        init: function () {
            this._super();
        },

        onPageLoad: function () {
            this._super();

            //消息公告-站点消息
            $(".siteMessage").on("click", function (e) {
                var $select = $(".sidebar-nav .select", window.top.document);
                $select.removeClass("select");
                var $current = $(".sidebar-nav a[data^='/operation/pAnnouncementMessage/gameNotice.html']", window.top.document);
                $current.parent().addClass("select");
            });
            //消息公告-系统公告
            $(".systemAnn").on("click", function (e) {
                var $select = $(".sidebar-nav .select", window.top.document);
                $select.removeClass("select");
                var $current = $(".sidebar-nav a[data^='/operation/pAnnouncementMessage/gameNotice.html']", window.top.document);
                $current.parent().addClass("select");
            });
            //消息公告-游戏公告
            $(".gameAnn").on("click", function (e) {
                var $select = $(".sidebar-nav .select", window.top.document);
                $select.removeClass("select");
                var $current = $(".sidebar-nav a[data^='/operation/pAnnouncementMessage/gameNotice.html']", window.top.document);
                $current.parent().addClass("select");
            })
        },
        //游戏公告弹窗
        gameNoticeDetail: function (e) {
            var _this = e.currentTarget;
            var apiId = $(_this).parent().attr("apiId");
            this.returnValue = {isDetail: true, apiId: apiId};
            window.top.topPage.closeDialog();
        }

    });

});
