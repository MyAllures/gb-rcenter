/**
 *
 */
define(['common/BaseListPage'], function (BaseListPage) {
    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super(this.formSelector);
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
        },

        /**
         * 刷新公共游戏图标
         */
        refreshPublicVersion:function (e) {
            window.top.topPage.ajax({
                url: root + '/chessManager/refreshPublicVersion.html',
                dataType: "json",
                success: function (data) {
                    if (data.state) {
                        page.showPopover(e,{},"success","刷新成功",true);
                    } else {
                        page.showPopover(e,{},"warning","刷新失败",true);
                    }
                    $(e.currentTarget).unlock();
                },
                error:function () {
                    $(e.currentTarget).unlock();
                }

            });
            $(e.currentTarget).unlock();
        },

        /**
         * 刷新游戏图标
         */
        refreshVersion:function (e) {
            var  siteId = $(e.currentTarget).parent().attr("id");
            window.top.topPage.ajax({
                url: root + '/chessManager/refreshVersion.html',
                dataType: "json",
                data: {
                    "search.siteId": siteId,
                },
                success: function (data) {
                    if (data.state) {
                        page.showPopover(e,{},"success","刷新成功",true);
                    } else {
                        page.showPopover(e,{},"warning","刷新失败",true);
                    }

                    $(e.currentTarget).unlock();
                },
                error:function () {
                    $(e.currentTarget).unlock();
                }

            });
            $(e.currentTarget).unlock();
        },
    });
});