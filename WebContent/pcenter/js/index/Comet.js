define(['gb/components/Comet','site/index/PopUp','cookie'], function(Comet,PopUp,cookie) {

    return Comet.extend({

        init : function () {
            var param = {url: mdRoot,
                localeType:language.replace("-","_"),isImmediatelyConnect:true};
            var _this = this;
            popUp = new PopUp();
            param.success = function () {
                console.info(window.top.message.index_auto['连接成功']);
                subscribes = [
                    {subscribeType:"PCENTER-popUp-Notice",callBack:popUp.popUpCallBack},
                    {subscribeType:"SYS_ANN",callBack:popUp.dialogCallBack},
                    {subscribeType:"SITE_ANN",callBack:popUp.dialogCallBack},
                    {subscribeType:"PCENTER-dialog-Notice",callBack:popUp.dialogCallBack},
                    {subscribeType:"MSITE-Player-Withdraw-Notice",callBack:popUp.playerWithdrawDialogCallBack},
                    {subscribeType:"MSITE-Player-Announcement-Notice",callBack:popUp.playerAnnouncementDialogCallBack},
                    {subscribeType:"MCENTER_READ_COUNT",callBack:popUp.unReadNotice},
                    {subscribeType:"MSITE-ONLINERECHARGE",callBack:popUp.onlineRecharge},
                    {subscribeType:"MSITE_DIGICCY_REFRESH_BALANCE",callBack:popUp.digiccyRefreshBalance}
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