define(['site/hall/ssc/PlayWay-xywf','site/plugin/template'], function (PlayWay,Template) {

    return PlayWay.extend({
        _this:null,
        init: function () {
            this.showTable(this.getSecondText(),"传统玩法-一字组合",$("#gfwfBetCode").val(),$("#yizizuhe"),"ssc_yizizuhe");
            this._super();
            _this=this;
        },

        getSecondText:function () {
            return $("div#yizizuhe a.mui-active").attr("data-code")==undefined?"全五一字":$("div#yizizuhe a.mui-active").attr("data-code");
        },

        getOdds: function () {
            var url = root + '/' + this.type+ '/' + this.code +'/getOdds.html';
            var _this = this;
            mui.ajax(url, {
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                   $(".bet-table-list[data-subCode]").each(function () {
                        var subCode = $(this).attr("data-subCode");
                        var $tdBet = $(this).find("td[data-bet-num]");
                        $tdBet.each(function(){
                            var betNum = $(this).attr('data-bet-num');
                            var thisData=data[subCode];
                            var bet = thisData[betNum];
                            $(this).attr("data-odds", bet.odd);
                            $(this).attr("data-bet-code", bet.betCode);
                            $(this).attr("data-play","one_combination")
                            $(this).children("span[name=odd]").text(bet.odd);
                        })
                    });
                }
            })
        }
    });
});