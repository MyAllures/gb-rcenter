/**
 * 资金管理-提现管理列表
 */
define(['common/BaseListPage', 'gb/share/ListFiltersPage'], function (BaseListPage) {

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super();
            this.initShowTab()
        },
        /**
         * 页面加载事件函数
         */
        onPageLoad: function () {
            this._super();
            $(".m-r-sm").on("click", function (e) {
                var _this = this;
                var target = e.currentTarget;
                var signId = $(target).attr("data-id");
                var noSign = $(target).hasClass('fa-flag-o');
                var yesSign = $(target).hasClass('fa-flag');
                var isSign = null;
                //没有标记的改为标记，标记的改为没有标记
                if(noSign){
                    isSign = true;
                }
                if(yesSign){
                    isSign = false;
                }
                window.top.topPage.ajax({
                    type: "post",
                    url: root + "/messageAnnouncement/stationLetterSign.html",
                    data:{"search.signId":signId,"search.isSign":isSign},
                    success: function (data) {
                        var data = eval('('+data+')');
                        if(data.state){
                            if(data.isSign){//标记
                                $(_this).removeClass().addClass("co-red3 fa fa-flag m-r-sm");
                                var isRead = $(_this).attr("data-name");
                                if(isRead=="true"){
                                    $(_this).next().removeClass("co-gray6").addClass("co-red3 red");
                                }else{
                                    $(_this).next().find("a").removeClass("co-gray6").addClass("co-red3 red");
                                }
                            }
                            if(!data.isSign){//取消标记
                                $(_this).removeClass().addClass("fa fa-flag-o m-r-sm");
                                var isRead = $(_this).attr("data-name");
                                if(isRead=="true"){
                                    $(_this).next().removeClass("co-red3 red").addClass("co-gray6");
                                }else{
                                    $(_this).next().find("a").removeClass("co-red3 red").addClass("co-gray6");
                                }
                            }
                        }
                    }
                });
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
        getSelectMessageIds: function (e, p) {
            var ids = this.getSelectIdsArray(e).join(",");
            var that = this;
            if(ids!=""){
                window.top.topPage.ajax({
                    type: "post",
                    url: root + "/messageAnnouncement/messageEditStatus.html",
                    data: {"ids": ids},
                    dataType: 'json',
                    success: function (data) {
                        if (data.state) {
                            //that.query(e, p);
                            $(".returnMain").click();
                        }else{
                            //that.query(e, p);
                            $(".returnMain").click();
                        }
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
            var that = this;
            window.top.topPage.ajax({
                type: "post",
                url: root + "/messageAnnouncement/deleteNoticeReceived.html",
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
            $(e.currentTarget).unlock();
        }

    });
});