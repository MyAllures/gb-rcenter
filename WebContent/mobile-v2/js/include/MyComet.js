define(['site/common/Comet','cookie'], function(Comet,cookie) {

    return Comet.extend({

        init : function () {
            var param = {url: mdRoot,
                localeType:language.replace("-","_"),isImmediatelyConnect:true};
            var _this = this;
            param.success = function () {
                console.info(window.top.message.include_auto['连接成功']);
                subscribes = [
                    {subscribeType:"MSITE-Player-Announcement-Notice",callBack:_this.popUp()}
                ];
                _this.subscribeMsgs(subscribes);
            };
            param.failure = function () {
                console.info(window.top.message.include_auto['连接失败']);
            };
            this._super(param);
        },
        popUp : function (data) {
            var jsonData = $.parseJSON(data);

        }
    });
    
});