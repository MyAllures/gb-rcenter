define(['gb/components/Comet', 'site/index/PopUp', 'cookie'], function (Comet, PopUp, cookie) {

    return Comet.extend({

        init: function () {
            var param = {
                url: mdRoot,
                localeType: language.replace("-", "_"), isImmediatelyConnect: true
            };
            var _this = this;
            popUp = new PopUp();
            popUp.bindEvent();
            param.success = function () {
                console.info(window.top.message.index_auto['连接成功']);
                subscribes = [
                    {subscribeType: "IM", callBack: popUp.imCallBack},
                    {subscribeType: "MCENTER-popUp-Notice", callBack: popUp.popUpCallBack},
                    {subscribeType: "MCENTER-dialog-Notice", callBack: popUp.dialogCallBack},
                    {subscribeType: "MCENTER_WITHDRAW_REMINDER", callBack: popUp.TellerReminderCallBack},
                    {
                        subscribeType: "MSITE-Player-Announcement-Notice",
                        callBack: popUp.playerAnnouncementDialogCallBack
                    },
                    {subscribeType: "MCENTER_READ_COUNT", callBack: popUp.unReadNotice},
                    //层级账户不足弹窗提醒
                    {subscribeType: "MCENTER_RANKINADEQUATE", callBack: popUp.rankInadequate},
                    {subscribeType: "MCENTER_TASK_REMINDER", callBack: popUp.unTaskNotice},
                    {subscribeType: "MCENTER_PAY_EX", callBack: popUp.unPayExNotice},
                    {subscribeType: "MCENTER_PROFIT", callBack: popUp.profit},
                    //存款审核提醒
                    {subscribeType: "MCENTER_RECHARGE_REMINDER", callBack: popUp.RechargeReminderCallBack},
                    //存款审核完成提醒
                    {subscribeType: "MCENTER_RECHARGE_CHECK_REMINDER", callBack: popUp.RechargeCheckReminderCallBack},
                    //在线支付
                    {subscribeType: "MCENTER_ONLINE_RECHARGE_REMINDER", callBack: popUp.OnlineRechargeReminderCallBack},
                    //手动回充提醒
                    {subscribeType: "MCENTER_NEGATIVE_WIHTHDRAW_REMINDER", callBack: popUp.negativeWithdrawReminder},
                    //播放声音
                    {subscribeType: "MCENTER_PLAYER_AUDIO", callBack: popUp.playerAudio},
                    {subscribeType: "MCENTER_WITHDRAW_AUDIT_UPDATE_STATUS",callBack:popUp.fetchWithdrawRecord},
                    {subscribeType: "EXPORT_DOWNLOAD_REMINDER",callBack:popUp.exportDownload},
                    {subscribeType: "MESSAGE_NOTICE",callBack:popUp.playerNoticeVoice},
                    {subscribeType:'TRANSFER_LIMIT_WARNING',callBack:popUp.transferLimit},
                    {subscribeType:'IMPORT_DOMAIN_CHECK_RESULT_SUCCESS',callBack:popUp.importDomainCheckResultSuccess},
                    //自动停用账户
                    {subscribeType:'PAY_ACCOUNT_DISABLE',callBack:popUp.payAccountDisable},
                ];
                _this.subscribeMsgs(subscribes);
            };
            param.failure = function () {
                console.info(window.top.message.index_auto['连接失败']);
            };
            this._super(param);
        }
    });


});