define(['gb/components/Comet','site/index/PopUp'], function(Comet,PopUp) {

    return Comet.extend({

        init : function () {
            var param = {url: mdRoot,
                localeType:language.replace("-","_"),isImmediatelyConnect:true};
            var _this = this;
            popUp = new PopUp();
            param.success = function () {
                console.info("connect successfully");
                subscribes = [
                    {subscribeType:"PCENTER-popUp-Notice",callBack:popUp.popUpCallBack},
                    {subscribeType:"SYS_ANN",callBack:popUp.dialogCallBack},
                    {subscribeType:"SITE_ANN",callBack:popUp.dialogCallBack},
                    {subscribeType:"MSITE-Player-Announcement-Notice",callBack:popUp.playerAnnouncementDialogCallBack},
                    {subscribeType:"MCENTER_READ_COUNT",callBack:popUp.unReadNotice}
                ];
                _this.subscribeMsgs(subscribes);
            };
            param.failure = function () {
                console.info('connect failed');
            };
            this._super(param);
        }
    });



});