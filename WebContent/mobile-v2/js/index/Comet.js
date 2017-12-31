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
                    {subscribeType:"SYS_ANN",callBack:_this.sys_announcement},
                    {subscribeType:"SITE_ANN",callBack:_this.site_announcement},
                    {subscribeType: "MSITE-Player-Announcement-Notice", callBack: _this.msite_player_announcement}
                ];
                _this.subscribeMsgs(subscribes);
            };
            param.failure = function () {
                console.info('connect failed');
            };
            this._super(param);
        },
        sys_announcement: function (result) {
            var _this = this;
            var dataObj = $.parseJSON(result);
            console.info('订阅类型为' + dataObj.subscribeType + "的订阅点收到消息，成功调用回调函数，参数值为" + result);
            $("#unReadCount").text(parseInt($("#unReadCount").text()) + 1);
            var msgBody = dataObj.msgBody;
            var content = msgBody.content.replace("${user}", $('#ofullname').text().trim());
            content = "<div style='padding: 20px'>" + content + "</div>";
            var title = msgBody.title;
            layer.open({
                title: title,
                content: content,
                btn: [window.top.message.announcement_auto['查看消息'], window.top.message.announcement_auto['关闭']],
                yes: function (index) {
                    var url = root + "/message/gameNotice.html";
                    if(window.top.page){
                        window.top.page.gotoUrl(url)
                    }else if(window.top.game){
                        window.top.game.gotoUrl(url)
                    }
                },
                no: function (index) {
                    layer.close(index);
                }
            })

        },
        site_announcement: function (result) {
            var _this = this;
            var dataObj = $.parseJSON(result);
            var id = dataObj.msgBody;
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
                            var url = root + "/message/gameNotice.html";
                            if(window.top.page){
                                window.top.page.gotoUrl(url)
                            }else if(window.top.game){
                                window.top.game.gotoUrl(url)
                            }
                        },
                        no: function (index) {
                            layer.close(index);
                        }
                    })
                }
            });

        },
        msite_player_announcement: function (result) {
            var _this = this;
            var dataObj = $.parseJSON(result);
            var id = dataObj.msgBody;
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
                            var url = root + "/message/gameNotice.html";
                            if(window.top.page){
                                window.top.page.gotoUrl(url)
                            }else if(window.top.game){
                                window.top.game.gotoUrl(url)
                            }
                        },
                        no: function (index) {
                            layer.close(index);
                        }
                    })
                }
            });
        }
    });


});