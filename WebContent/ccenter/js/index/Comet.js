define(['gb/components/Comet','site/index/PopUp','cookie'], function(Comet,PopUp,cookie) {

    return Comet.extend({

        init : function () {
            var param = {url: mdRoot,
                localeType:window.top.language,isImmediatelyConnect:true};
            var _this = this;
            popUp = new PopUp();
            popUp.bindEvent();
            param.success = function () {
                console.info("连接成功!");
                subscribes = [{subscribeType:"ACENTER-popUp-Notice",callBack:popUp.popUpCallBack},
                    {subscribeType:"ACENTER-dialog-Notice",callBack:popUp.dialogCallBack},
                    {subscribeType:"MCENTER_PROFIT",callBack:popUp.profit},
                    {subscribeType:"MCENTER_READ_COUNT",callBack:popUp.unReadNotice},
                    //任务提醒
                    {subscribeType:"MCENTER_TASK_REMINDER",callBack:popUp.playerAudio},
                    //播放声音
                    {subscribeType:"MCENTER_PLAYER_AUDIO",callBack:popUp.playerAudio},
                    {subscribeType:"MSITE-Player-Announcement-Notice",callBack:popUp.playerAnnouncementDialogCallBack},
                    {subscribeType: "EXPORT_DOWNLOAD_REMINDER",callBack:popUp.exportDownload},
                ];
                _this.subscribeMsgs(subscribes);
            };
            param.failure = function () {
                console.info("连接失败!");
            };
            this._super(param);
        }
    });



});