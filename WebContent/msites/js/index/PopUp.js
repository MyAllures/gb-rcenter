define(['gb/components/PopUp'], function (PopUp) {

    return PopUp.extend({
        init: function () {
            this._super();
        },
        popUpCallBack: function (data) {
            var dataObj = $.parseJSON(data);
            console.info('订阅类型为' + dataObj.subscribeType + "的订阅点收到消息，成功调用回调函数，参数值为" + data);
            $("#unReadCount").text(parseInt($("#unReadCount").text()) + 1);
            var msgBody = dataObj.msgBody;
            var content = "<a herf='#' onclick='alert(\"你点到人家啦\")'>" + msgBody.content + "</a>"
            var date = msgBody.title;
            popUp.pop(content, date, "success");
        },
        dialogCallBack: function (data) {
            var dataObj = $.parseJSON(data);
            console.info('订阅类型为' + dataObj.subscribeType + "的订阅点收到消息，成功调用回调函数，参数值为" + data);
            $("#unReadCount").text(parseInt($("#unReadCount").text()) + 1);
            var msgBody = dataObj.msgBody;
            var content = msgBody.content.replace("${user}", $('#ofullname').text().trim());
            content = "<div style='padding: 20px'>" + content + "</div>";
            var title = msgBody.title;
            var opt = {};
            opt.title = title;
            opt.message = content;
            popUp.showDialog(opt);
        },

        /**
         * 系统公告-公告弹窗
         * @param data
         */
        playerAnnouncementDialogCallBack: function (data) {
            var btnOption = {};
            var dataObj = $.parseJSON(data);
            var id = dataObj.msgBody;
            btnOption.target =  "/operation/pAnnouncementMessage/announcementPopup.html?searchId=" + id;
            btnOption.text = '公告';
            btnOption.callback = function (e, opt) {
                if (e.returnValue && e.returnValue.isDetail) {
                    if (e.returnValue.apiId != "") {
                        var $select = $(".sidebar-nav .select", window.top.document);
                        $select.removeClass("select");
                        var $current = $(".sidebar-nav a[data^='/operation/pAnnouncementMessage/gameNotice.html']", window.top.document);
                        $current.parent().addClass("select");
                        $current.click();

                    } else {
                        var $select = $(".sidebar-nav .select", window.top.document);
                        $select.removeClass("select");
                        var $current = $(".sidebar-nav a[data^='/operation/pAnnouncementMessage/gameNotice.html']", window.top.document);
                        $current.parent().addClass("select");
                        $("#mainFrame").load(root + "/operation/pAnnouncementMessage/systemNoticeDetail.html");
                    }
                }
            };
            window.top.topPage.doDialog({page: this, messageId: id}, btnOption);
        },
        /**
         * 更新顶部消息数量
         */
        unReadNotice: function (data) {
            window.top.popUp.queryTones();
            var tones = window.top.tones;

            //声音集合
            for (var index = 0; index < tones.length; index++) {
                var tone = tones[index];
                var map = $.parseJSON(data);
                console.log(map);
                if ("notice" == tone.paramCode) {
                    if ($.browser && $.browser.version == '8.0') {
                        //本来这里用的是<bgsound src="system.wav"/>,结果IE8不播放声音,于是换成了embed
                        $('#newMessageDIV').html("<embed src='" + root + "/mcenter/" + tone.paramValue + "'/>");
                    } else {
                        //IE9+,Firefox,Chrome均支持<audio/>
                        $('#newMessageDIV').html("<audio autoplay='autoplay'><source src='" + root + "/mcenter/" + tone.paramValue + "' type='audio/wav'/></audio>");
                    }
                    $("#unReadCount").text(parseInt($("#unReadCount").text()) + 1);
                }
            }
        },
        queryTones: function () {
            var _this = this;
            if (!window.top.tones) {
                window.top.topPage.ajax({
                    url: root + '/index/queryTones.html',
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        window.top.tones = data;
                    }
                })
            } else {
                return window.top.tones;
            }
        },

    });
});