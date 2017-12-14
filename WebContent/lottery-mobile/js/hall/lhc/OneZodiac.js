define(['site/hall/lhc/PlayWay-xywf'], function (PlayWay) {
    return PlayWay.extend({
        init: function () {
            this.showTable("一肖/尾","传统玩法-一肖/尾","tema",$("#tema"),"");
            this._super();
        },
        /**
         * 获取赔率
         */
        getOdds: function () {
            var dataCode=$("a.selected-btn.main.mui-active").attr("data-code");
            var url = root + '/' + this.type + '/' + this.code + '/' + dataCode + 'Odd.html';
            var _this = this;
            mui.ajax(url, {
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    $("#bet-table-list td[data-bet-num]").each(function () {
                        var betNum = $(this).attr('data-bet-num');
                        var bet = data[0][betNum];
                        $(this).attr("data-odds", bet.odd);
                        $(this).attr("data-bet-code", bet.betCode);
                        $(this).children("span[name=odd]").text(bet.odd);
                    }),
                    $("#bet-table-list-mantissa td[data-bet-num]").each(function () {
                        var betNum = $(this).attr('data-bet-num');
                        var bet = data[1][betNum];
                        $(this).attr("data-odds", bet.odd);
                        $(this).attr("data-bet-code", bet.betCode);
                        $(this).children("span[name=odd]").text(bet.odd);
                    })
                }
            })
        }
    });
});