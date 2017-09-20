define(['gb/components/Comet','site/index/PopUp','cookie'], function(Comet,PopUp,cookie) {

    return Comet.extend({

        init : function () {
            var param = {url: mdRoot,
                localeType:language.replace("-","_"),isImmediatelyConnect:true};
            var _this = this;
            popUp = new PopUp();
            popUp.bindEvent();
            param.success = function () {
                console.info(window.top.message.index_auto['连接成功']);
                subscribes = [
                    {subscribeType:"ACENTER-popUp-Notice",callBack:popUp.popUpCallBack},
                    {subscribeType:"SYS_ANN",callBack:popUp.dialogCallBack},
                    {subscribeType:"ACENTER-dialog-Notice",callBack:popUp.dialogCallBack},
                    {subscribeType:"MSITE-Player-Announcement-Notice",callBack:popUp.playerAnnouncementDialogCallBack},
                    {subscribeType: "EXPORT_DOWNLOAD_REMINDER",callBack:popUp.exportDownload}
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