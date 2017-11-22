/**
 * 玩家中心-消息公告
 */
define(['common/BaseListPage'], function (BaseListPage) {

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super();
            this.initShowTab();//自动弹窗iframe高度
        },

        /**
         * 页面加载事件函数
         */
        onPageLoad: function () {
            this._super();
            $(".setotal").on("click", function (e) {
                var _this = this;
                var target = e.currentTarget;
                var signId = $(target).attr("data-id");
                var noSign = $(target).hasClass('remark');
                var yesSign = $(target).hasClass('remarkred');
                var isSign = null;
                //没有标记的改为标记，标记的改为没有标记
                if (noSign) {
                    isSign = true;
                }
                if (yesSign) {
                    isSign = false;
                }
                window.top.topPage.ajax({
                    type: "post",
                    url: root + "/operation/pAnnouncementMessage/stationLetterSign.html",
                    data: {'search.signId': signId, 'search.isSign': isSign},
                    success: function (data) {
                        var data = eval('(' + data + ')');
                        if (data.state) {
                            if (data.isSign) {//标记
                                $(_this).removeClass().addClass("setotal remarkred");
                                $(_this).next().removeClass().addClass("select");
                                var isRead = $(_this).attr("data-name");
                                if (isRead == "true") {//是否已读：是
                                    $(_this).parent().removeClass().addClass("left");
                                } else {
                                    $(_this).parent().removeClass().addClass("left on");
                                }
                            }
                            if (!data.isSign) {//取消标记
                                $(_this).removeClass().addClass("setotal remark");
                                $(_this).next().removeClass();
                                var isRead = $(_this).attr("data-name");
                                if (isRead == "true") {
                                    $(_this).parent().removeClass().addClass("left");
                                } else {
                                    $(_this).parent().removeClass().addClass("left on");
                                }
                            }
                        }
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

        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
        },
        /**
         * 获取勾选id-消息公告-标记已读
         * @param e
         */
        getSelectAdvisoryMessageIds: function (e, p) {
            var ids = this.getSelectIdsArray(e).join(",");
            if (ids != "") {
                window.top.topPage.ajax({
                    type: "post",
                    url: root + "/operation/pAnnouncementMessage/getSelectAdvisoryMessageIds.html",
                    data: {"ids": ids},
                    dataType: 'json',
                    success: function (data) {
                        if (data.state) {
                            $(".returnMain").click();
                        }
                    }
                });
            }
            $(e.currentTarget).unlock();
        },
        /**
         * 获取勾选id-系统公告-标记已读
         * @param e
         */
        getSelectSystemMessageIds: function (e, p) {
            var ids = this.getSelectIdsArray(e).join(",");
            if (ids != "") {
                window.top.topPage.ajax({
                    type: "post",
                    url: root + "/operation/pAnnouncementMessage/systemMessageEditStatus.html",
                    data: {"ids": ids},
                    dataType: 'json',
                    success: function (data) {
                        $(".returnMain").click();
                        window.top.index.loadPlayerMessage();
                    }
                });
            }
            $(e.currentTarget).unlock();
        },
        /**
         * 获取勾选id-系统公告-删除
         * @param e
         */
        deleteMessage: function (e, p) {
            var ids = this.getSelectIdsArray(e).join(",");
            if (ids == '') {
                window.top.topPage.showWarningMessage(window.top.message.operation['view.advisory.noChosseMessage']);
                $(e.currentTarget).unlock();
            } else {
                window.top.topPage.showConfirmMessage(window.top.message.operation['view.advisory.sureToDelete'], function (result) {
                    if (result) {
                        window.top.topPage.ajax({
                            type: "post",
                            url: root + "/operation/pAnnouncementMessage/deleteNoticeReceived.html",
                            data: {"ids": ids},
                            dataType: 'json',
                            success: function (data) {
                                if (data.state) {
                                    window.top.topPage.showSuccessMessage(data.msg);
                                    //that.query(e, p);
                                    $(".returnMain").click();
                                }
                                $(e.currentTarget).unlock();
                            },
                            error: function () {
                                $(e.currentTarget).unlock();
                            }
                        });
                    }
                    else {
                        $(e.currentTarget).unlock();

                    }
                });
            }
        },
        /**
         * 获取勾选id-消息公告-删除
         * @param e
         */
        deleteAdvisoryMessage: function (e, p) {
            var ids = this.getSelectIdsArray(e).join(",");
            if (ids == '') {
                window.top.topPage.showWarningMessage(window.top.message.operation['view.advisory.noChosseMessage']);
                $(e.currentTarget).unlock();
            } else {
                window.top.topPage.ajax({
                    type: "post",
                    url: root + "/operation/pAnnouncementMessage/deleteAdvisoryMessage.html",
                    data: {"ids": ids},
                    dataType: 'json',
                    success: function (data) {
                        if (data.state) {
                            window.top.topPage.showSuccessMessage(data.msg);
                            //that.query(e, p);
                            $(".returnMain").click();
                        }
                    }
                });
            }
            $(e.currentTarget).unlock();
        }
    });
});