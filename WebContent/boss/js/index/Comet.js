define(['gb/components/Comet', 'site/index/PopUp', 'cookie'], function (Comet, PopUp, cookie) {

    return Comet.extend({
        init: function () {
            var param = {
                url: mdRoot,
                localeType: window.top.language, isImmediatelyConnect: true
            };
            var _this = this;
            popUp = new PopUp();
            popUp.bindEvent();
            param.success = function () {
                console.info("连接成功!");
                subscribes = [
                    {subscribeType: "BOSS_TRANSFER_REMINDER", callBack: popUp.transferCallback},
                    {subscribeType: "BOSS_API_TRANS_REMINDER", callBack: popUp.transMonitorCallback},
                    {subscribeType: "BOSS_API_ORDER_REMINDER", callBack: popUp.apiOrderCallback},
                    {subscribeType: "BOSS_LOTTREY_RESULT_REMINDER", callBack: popUp.lotteryGatherCallback},
                    {subscribeType: "BOSS_LOTTREY_RESULT_INIT_REMINDER", callBack: popUp.lotteryInitCallback},
                    {subscribeType: "BOSS_ATTACK_REMINDER", callBack: popUp.attackCallback},
                    {subscribeType: "EXPORT_DOWNLOAD_REMINDER", callBack: popUp.exportDownload},
                    {subscribeType: "MCENTER_PROFIT", callBack: popUp.profit},
                    {subscribeType: "BOSS_LOTTERY_RESULT_WARNING", callBack: popUp.lotteryResultWarning},
                    {subscribeType: "BOSS_CREDIT_PAY_REMINDER", callBack: popUp.creditPayReminder},
                    {subscribeType:'TRANSFER_LIMIT_WARNING',callBack:popUp.transferLimit},
                    {subscribeType:'LARGE_TRANSACTION_MONITOR',callBack:popUp.largeTransactionMonitor},
                    //自动停用账户
                    {subscribeType:'PAY_ACCOUNT_DISABLE',callBack:popUp.payAccountDisable},
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