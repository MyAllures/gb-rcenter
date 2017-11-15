define(['site/hall/lhc/PlayWay-xywf'], function (PlayWay) {
    return PlayWay.extend({
        init: function () {
            this._super();
        },
        showTable : function(){
            var BetCode=$("#gfwfBetCode").val();
            $("a[data-code='"+BetCode+"']").addClass("mui-active");
            $("a[data-code='tema']").addClass("mui-active");
            $(".x_3.gfwf-playName").text(BetCode);
            $("span.x_1.gfwf-tit").text(BetCode);
            $(".s-title.title1 span").text(BetCode);
            $(".s-title.title2 span").text(BetCode);
            $("#toobarTitle").text("信用玩法-"+BetCode);
            $("a[data-code='tema'] span").text(BetCode);
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