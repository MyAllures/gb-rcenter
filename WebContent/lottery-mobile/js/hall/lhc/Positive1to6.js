define(['site/hall/lhc/PlayWay-xywf'], function (PlayWay) {
    return PlayWay.extend({
        init: function () {
            this.showTable("正码1~6","传统玩法-正码1~6","tema",$("#tema"),"");
            this._super();

        },

        /**
         * 获取赔率
         */
        getOdds: function () {
            var url = root + '/' + this.type + '/' + this.code + '/positiveSpecialOdd.html';
            var _this = this;
            $(".bet-table-list[data-subCode]").each(function () {
                var subCode = $(this).attr("data-subCode");
                var $tdBet = $(this).find("td[data-bet-num]");
                mui.ajax(url, {
                    dataType: 'json',
                    type: 'POST',
                    data: {'subCode': parseInt(subCode)},
                    success: function (data) {
                        $tdBet.each(function(){
                            var betNum = $(this).attr('data-bet-num');
                            var bet = data[betNum];
                            $(this).attr("data-odds", bet.odd);
                            $(this).attr("data-bet-code", bet.betCode);
                            $(this).children("span[name=odd]").text(bet.odd);
                        })
                    }
                })
            });
        }
    });
});