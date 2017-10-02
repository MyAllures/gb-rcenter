define(['gb/components/PopUp'], function (PopUp) {

    return PopUp.extend({
        tones: null,
        init: function () {
            this._super();
        },

        /**
         * 转账异常提醒
         */
        transferCallback: function (data) {
            var msgBody = $.parseJSON($.parseJSON(data).msgBody);
            var date = window.top.topPage.formatToMyDateTime(new Date(msgBody.date), dateFormat.daySecond);
            var content = '<a nav-target="mainFrame" name="tellerReminder" href="/operation/exceptionTransfer/list.html?search.orderNo=' + msgBody.orderNo + '">' + date + '&nbsp;新增一笔待处理转账订单，请审核！</a>';
            popUp.pop(content, date, "warning");
            window.top.voice.playVoice(data, 'transfer');
            $("a[name=tellerReminder]").click(function (e) {
                $(e.currentTarget).parent().parent().parent().remove()
            });
        },

        /**
         * 转账监控提醒
         * @param data
         */
        transMonitorCallback: function (data) {
            var msgBody = $.parseJSON($.parseJSON(data).msgBody);
            var date = window.top.topPage.formatToMyDateTime(new Date(msgBody.date), dateFormat.daySecond);
            var content = '<a nav-target="mainFrame" name="tellerReminder" href="/vApi/list.html?search.orderNo">' + date + '&nbsp;' + msgBody.message + '</a>';
            popUp.pop(content, date, "warning");
            window.top.voice.playVoice(data, "transfer");
            $("a[name=tellerReminder]").click(function (e) {
                $(e.currentTarget).parent().parent().parent().remove()
            });
        },

        /**
         * 彩票开奖结果提醒
         * @param data
         */
        lotteryGatherCallback: function (data) {
            var msgBody = $.parseJSON($.parseJSON(data).msgBody);
            var date = window.top.topPage.formatToMyDateTime(new Date(msgBody.date), dateFormat.daySecond);
            var content = '<a nav-target="mainFrame" name="tellerReminder" href="/lotteryResult/list.html">' + date + '&nbsp;' + msgBody.message + '</a>';
            popUp.pop(content, date, "warning");
            window.top.voice.playVoice(data, "order");
            $("a[name=tellerReminder]").click(function (e) {
                $(e.currentTarget).parent().parent().parent().remove()
            });
        },

        /**
         * 彩票开奖初始化提醒
         * @param data
         */
        lotteryInitCallback: function (data) {
            var msgBody = $.parseJSON($.parseJSON(data).msgBody);
            var date = window.top.topPage.formatToMyDateTime(new Date(msgBody.date), dateFormat.daySecond);
            var content = '<a nav-target="mainFrame" name="tellerReminder" href="/lotteryResult/list.html">' + date + '&nbsp;' + msgBody.message + '</a>';
            popUp.pop(content, date, "warning");
            window.top.voice.playVoice(data, "order");
            $("a[name=tellerReminder]").click(function (e) {
                $(e.currentTarget).parent().parent().parent().remove()
            });
        },

        /**
         * 注单采集进度提醒
         */
        apiOrderCallback: function (data) {
            var msgBody = $.parseJSON($.parseJSON(data).msgBody);
            var date = window.top.topPage.formatToMyDateTime(new Date(msgBody.date), dateFormat.daySecond);
            var content = '<a nav-target="mainFrame" name="orderReminder" href="#">' + date + ':&nbsp;' + msgBody.apiName + '已经好久没有采集订单了！</a>';
            popUp.pop(content, date, "warning");
            window.top.voice.playVoice(data, "order");
            $("a[name=orderReminder]").click(function (e) {
                $(e.currentTarget).parent().parent().parent().remove()
            });
        },
        attackCallback: function (data) {
            var date = new Date();
            var content = $.parseJSON(data).msgBody;
            popUp.pop(content, date, "warning");
            window.top.voice.playVoice(data, "attack");
        },

        profit: function (data) {
            var msgBody = $.parseJSON($.parseJSON(data).msgBody);
            var level = msgBody.level;
            var rate = msgBody.rate;
            var siteName = msgBody.siteName;
            var userName = msgBody.userName;
            var key = 'profit.' + level + '.warning';
            var msg = window.top.message.report[key];
            if (msg) {
                msg = msg.replace("${siteName}", siteName);
                msg = msg.replace("${rate}", rate);
                msg = msg.replace("${userName}", userName);
                msg = msg.replace("${siteId}", msgBody.siteId);
                msg = msg.replace("${maxProfit}", msgBody.maxProfit);
                msg = msg.replace("${profit}", msgBody.profit);
                window.top.topPage.showWarningMessage(msg);
            }
        },
        lotteryResultWarning: function (data) {
            var msgBody = $.parseJSON($.parseJSON(data).msgBody);
            var lottery;
            for (var i = 0; i < msgBody.length; i++) {
                lottery = msgBody[i];
                var date = window.top.topPage.formatToMyDateTime(new Date(lottery.openTime), dateFormat.daySecond);
                var content = '<a name="tellerReminder"  nav-target="mainFrame" href="#">彩票未能及时开奖' + '彩种：' + lottery.code + '&nbsp;未能准时开奖，开奖时间:' + date + '期数：' + lottery.expect + '</a>';
                var win = popUp._getWin(content, date, "warning");
                popUp.oldPop(win);
            }
            window.top.popUp.playVoice(data, "order");
        },
        /**
         * 买分提醒
         * @param data
         */
        creditPayReminder: function (data) {
            var msgBody = $.parseJSON($.parseJSON(data).msgBody);
            var date = window.top.topPage.formatToMyDateTime(new Date(msgBody.date), dateFormat.daySecond);
            var content = '<a name="tellerReminder"  nav-target="mainFrame" href="#">[站点' + data.siteId + ']  ' + data.siteName + '在' + date + '提交买分,购买额度' + data.amount + ',请及时确认';
            popUp.pop(content, date, "warning");
            window.top.voice.playVoice(data, "order");
        },
        /**
         * 转账上限提醒
         * @param data
         */
        transferLimit: function (data) {
            var msgBody = $.parseJSON($.parseJSON(data).msgBody);
            var date = window.top.topPage.formatToMyDateTime(new Date(msgBody.leftTime), dateFormat.daySecond);
            var rate = Number(data.rate);
            var warnRate = Number(data.warnRate);
            var stopRate = Number(data.stopRate);
            if (rate >= stopRate) { //立即停止
                var msg = "站点【${siteId}】${siteName}转账上限已使用${rate},已停止玩家转账！";
                msg = msg.replace("${siteId}", data.siteId);
                msg = msg.replace("${siteName}", data.siteName);
                msg = msg.replace("${rate}", data.rate);
                window.top.topPage.showConfirmMessage(msg)
            } else if (rate >= warnRate) {
                var msg = "站点【${siteId}】${siteName}转账上限已使用${rate},需提醒站点在${date}之前充值，请及时关注！";
                msg = msg.replace("${siteId}", data.siteId);
                msg = msg.replace("${siteName}", data.siteName);
                msg = msg.replace("${rate}", data.rate);
                window.top.topPage.showConfirmMessage(msg);
            }
        },
        largeTransactionMonitor: function (data) {
            var msgBody = $.parseJSON($.parseJSON(data).msgBody);
            var date = window.top.topPage.formatToMyDateTime(new Date(msgBody.date), dateFormat.daySecond);
            var content = '<a nav-target="mainFrame" name="tellerReminder" href="/largeTransactionMonitor/list.html?search.transactionNo=' + msgBody.transactionNo + '">' + '站点[' + msgBody.siteId + ']玩家' + msgBody.name + '于' + date + '新增&nbsp;' + msgBody.amount + '&nbsp;大额交易!,交易号为' + msgBody.transactionNo + +'&nbsp;</a>';
            popUp.pop(content, date, "warning");
            $("a[name=tellerReminder]").click(function (e) {
                $(e.currentTarget).parent().parent().parent().remove()
            });
        }
    });
});