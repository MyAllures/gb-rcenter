define(['site/hall/ssc/PlayWay-xywf','site/plugin/template'], function (PlayWay,Template) {

    return PlayWay.extend({
        _this:null,
        init: function () {
            this.showTable(this.getSecondText(),"传统玩法-跨度",$("#gfwfBetCode").val(),$("#qiansankuadu"),"ssc_kaudu");
            this._super();
            _this=this;
        },

        getSecondText:function () {
            return $("div#qiansankuadu a.mui-active").attr("data-code")==undefined?"前三跨度":$("div#qiansankuadu a.mui-active").attr("data-code");
        },

        onPageLoad: function () {
            this._super();
            var betTitle = $('div.bet-title').text();
            if (betTitle === '前三跨度') {
                $('div.bet-table-list').attr('data-subCode', 'span_first_three');
            } else if (betTitle === '中三跨度') {
                $('div.bet-table-list').attr('data-subCode', 'span_in_three');
            } else if (betTitle === '后三跨度') {
                $('div.bet-table-list').attr('data-subCode', 'span_after_three');
            }
        },

        bindButtonEvents: function () {
            this._super();
            mui(this.formSelector).on("tap", "a.mui-control-item[data-type]", function () {
                _this.resetBet();
                var type = $(this).attr("data-type");
                var betTitle = $(this).text();
                $(".bet-title").html(betTitle);
                $(".bet-table-list[data-subCode]").each(function () {
                    $(this).attr("data-subCode",type);
                    var $tdBet = $(this).find("td[data-bet-num]");
                    $tdBet.each(function(){
                        var betNum = $(this).attr('data-bet-num');
                        $(this).attr("data-name",betTitle+"-"+betNum);
                    })
                });
                _this.getOdds();
            })
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
                            $(this).children("span[name=odd]").text(bet.odd);
                        })
                    });
                }
            })
        }
    });
});