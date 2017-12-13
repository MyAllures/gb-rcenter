define(['gb/components/Comet', 'common/MobileBasePage'], function (Comet, Mobile) {

    return Comet.extend({

        init: function () {
            var param = {
                url: mdRoot,
                localeType: language.replace("-", "_"), isImmediatelyConnect: true
            };
            var _this = this;
            param.success = function () {
                console.info("connect successfully");
                subscribes = [
                    {subscribeType:"SYS_ANN",callBack:_this.announcement},
                    {subscribeType:"SITE_ANN",callBack:_this.announcement},
                    {subscribeType: "MSITE-Player-Announcement-Notice", callBack: _this.announcement}
                ];
                _this.subscribeMsgs(subscribes);
            };
            param.failure = function () {
                console.info('connect failed');
            };
            this._super(param);
        },
        announcement: function (result) {
            var dataObj = $.parseJSON(result);
            var id = dataObj.msgBody;
            var _this = this;
            $.ajax({
                url: root + "/operation/pAnnouncementMessage/announcementPopup.html?searchId=" + id,
                dataType: "html",
                type: 'POST',
                async: false,
                success: function (data) {
                    layer.open({
                        title: window.top.message.announcement_auto['公告'],
                        content: data,
                        btn: [window.top.message.announcement_auto['查看消息'], window.top.message.announcement_auto['关闭']],
                        yes: function (index) {
                            window.top.page.gotoUrl(root + "/message/gameNotice.html")
                        },
                        bo: function (index) {
                            layer.close(index);
                        }
                    })
                }
            });

        }
    });


});