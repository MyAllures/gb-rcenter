define(['gb/components/PopUp'], function (PopUp) {

    return PopUp.extend({
        tones: null,
        init: function () {
            this._super();
        },
        popUpCallBack: function (data) {
            console.info("订阅类型为ACENTER-popUp-Notice的订阅点收到消息，成功调用回调函数，参数值为" + data);
            var msgBody = $.parseJSON($.parseJSON(data).msgBody);
            var content = "<a herf='#' onclick='alert(\"你点到人家啦\")'>" + msgBody.content + "</a>";
            var date = msgBody.date;
            popUp.pop(content, date, "success");
        },
        dialogCallBack: function (data) {
            console.info("订阅类型为ACENTER-dialog-Notice的订阅点收到消息，成功调用回调函数，参数值为" + data);
            var msgBody = $.parseJSON($.parseJSON(data).msgBody);
            var content = "<a herf='#' onclick='alert(\"你点到人家啦\")'>" + msgBody.content + "</a>";
            var date = msgBody.date;
            popUp.showDialog(content, date);
        },
        /**
         * 系统公告-公告弹窗
         * @param data
         */
        playerAnnouncementDialogCallBack: function (data) {
            var btnOption = {};
            var dataObj = $.parseJSON(data);
            var id = dataObj.msgBody;
            btnOption.target = root + "/messageAnnouncement/announcementPopup.html?search.id=" + id;
            btnOption.text = "公告";
            btnOption.callback = function (e, opt) {
                if (e.returnValue && e.returnValue.isDetail) {
                    if (e.returnValue.apiId != "") {
                        $("#mainFrame").load(root + "/messageAnnouncement/gameAnnouncementDetail.html?search.id=" + e.messageId);
                    } else {
                        $("#mainFrame").load(root + "/messageAnnouncement/systemAnnouncementDetail.html?search.id=" + e.messageId);
                    }
                }
            };
            window.top.topPage.doDialog({page: this, messageId: id}, btnOption);
        },
        profit: function (data) {
            var msgBody = $.parseJSON($.parseJSON(data).msgBody);
            var level = msgBody.level;
            var rate = msgBody.rate;
            var siteName = msgBody.siteName;
            var userName = msgBody.userName;
            var key = 'profit.' + level + '.warning';
            var msg = window.top.message.report[key];
            console.log("盈利预警弹窗key:" + key + ",消息提示：" + msg);
            if (msg) {
                msg = msg.replace("${siteName}", siteName);
                msg = msg.replace("${rate}", rate);
                msg = msg.replace("${userName}", userName);
                msg = msg.replace("${siteId}", msgBody.siteId);
                msg = msg.replace("${maxProfit}", msgBody.maxProfit);
                msg = msg.replace("${profit}", msgBody.profit);
                var content = '<a nav-target="mainFrame" name="tellerReminder" href="/site/detail/viewSiteBasic.html?search.id=' + msgBody.siteId + '">' + msg + '&nbsp;</a>';
                popUp.pop(content, null, "warning");
                $("a[name=tellerReminder]").click(function (e) {
                    $(e.currentTarget).parent().parent().parent().remove()
                });
            }
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
                if ("notice" == tone.paramCode) {
                    if ($.browser && $.browser.version == '8.0') {
                        //本来这里用的是<bgsound src="system.wav"/>,结果IE8不播放声音,于是换成了embed
                        $('#newMessageDIV').html("<embed src='" + resRoot + "/" + tone.paramValue + "'/>");
                    } else {
                        //IE9+,Firefox,Chrome均支持<audio/>
                        $('#newMessageDIV').html("<audio autoplay='autoplay'><source src='" + resRoot + "/" + tone.paramValue + "' type='audio/wav'/></audio>");
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
        playerAudio: function (data) {
            window.top.popUp.queryTones();
            var tones = window.top.tones;
            var map = $.parseJSON(data);
            //声音集合
            for (var index = 0; index < tones.length; index++) {
                var tone = tones[index];
                if (map.msgBody == tone.paramCode) {
                    if ($.browser && $.browser.version == '8.0') {
                        //本来这里用的是<bgsound src="system.wav"/>,结果IE8不播放声音,于是换成了embed
                        $('#newMessageDIV').html("<embed src='" + resRoot + "/" + tone.paramValue + "'/>");
                    } else {
                        //IE9+,Firefox,Chrome均支持<audio/>
                        $('#newMessageDIV').html("<audio autoplay='autoplay'><source src='" + resRoot + "/" + tone.paramValue + "' type='audio/wav'/></audio>");
                    }
                }
            }
        },
        /**
         * 转账上限提醒
         * @param data
         */
        transferLimit: function (data) {
            var msgBody = $.parseJSON($.parseJSON(data).msgBody);
            var date = window.top.topPage.formatToMyDateTime(new Date(msgBody.leftTime), dateFormat.daySecond);
            var rate = Number(msgBody.rate);
            var warnRate = Number(msgBody.warnRate);
            var stopRate = Number(msgBody.stopRate);
            var msg;
            if (rate >= stopRate) { //立即停止
                msg = "站点【${siteId}】${siteName}转账上限已使用${rate},已停止玩家转账！";
            } else if (rate >= warnRate) {
                msg = "站点【${siteId}】${siteName}转账上限已使用${rate},需提醒站点在${date}之前充值，请及时关注！";
            }
            if (msg) {
                msg = msg.replace("${siteId}", msgBody.siteId);
                msg = msg.replace("${siteName}", msgBody.siteName);
                msg = msg.replace("${rate}", msgBody.rate);
                msg = msg.replace("${date}", date);
                var content = '<a nav-target="mainFrame" name="tellerReminder" href="/site/detail/viewSiteBasic.html?search.id=' + msgBody.siteId + '">' + msg + '&nbsp;</a>';
                popUp.pop(content, date, "warning");
            }
        }

    });
});