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
            $("#index_1").children().text(window.top.message.operation_auto['编辑中']);
            $(".click_Detail").on("click", function (e) {
                var _this = e.currentTarget;
                var id = $(_this).prop("id").substr(6, 7);
                $(".click_Detail").each(function (e) {
                    var this_id = $(this).prop("id").substr(6, 7);
                    if (this_id == id) {
                        $("#div_" + this_id).removeClass("hide");
                        $(this).addClass("current");
                        $(this).children().text(window.top.message.operation_auto['编辑中']);
                    } else {
                        $("#div_" + this_id).addClass("hide");
                        $(this).removeClass("current");
                        $(this).children().text(window.top.message.operation_auto['已编辑']);
                    }
                });
            });

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
        //系统公告弹窗
        systemNoticeDetail: function (e) {
            var _this = e.currentTarget;
            var apiId = $(_this).parent().attr("apiId");
            this.returnValue = {isDetail: true, apiId: apiId};
            window.top.topPage.closeDialog();
        }

    });

});
