    define(['site/hall/PlayWay', 'site/plugin/template'], function (PlayWay, Template) {
    return PlayWay.extend({
        isPl3Open:true,
        init: function () {
            this._super();
        },

        getOdds: function () {
            var url = root + '/' + this.type + '/' + this.code + '/getOdds.html';
            mui.ajax(url, {
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    $(".bet-table-list[data-subCode]").each(function () {
                        var subCode = $(this).attr("data-subCode");
                        var $tdBet = $(this).find("td[data-bet-num]");
                        $tdBet.each(function () {
                            var betNum = $(this).attr('data-bet-num');
                            var thisData = data[subCode];
                            var bet = thisData[betNum];
                            $(this).attr("data-odds", bet.odd);
                            $(this).attr("data-bet-code", bet.betCode);
                            $(this).children("span[name=odd]").text(bet.odd);
                        })
                    });
                }
            })
        },

    });
});