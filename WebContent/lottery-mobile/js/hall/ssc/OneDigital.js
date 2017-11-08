define(['site/hall/GfwfPlayWay','site/plugin/template'], function (PlayWay,Template) {

    return PlayWay.extend({
        _this:null,
        init: function () {
            this._super();
            _this=this;

        },
        bindButtonEvents: function () {
            this._super();
            mui(this.formSelector).on("tap", "a.mui-control-item[data-type]", function () {
                var type = $(this).attr("data-type");
                if(type!="ten_thousand"){
                    $(".hideText").css('display','none');
                }else{
                    $(".hideText").css('display','block');
                }
                var betTitle = $(this).text();
                $(".bet-title1").html(betTitle);
                $(".bet-table-list[data-subCode]").each(function (i) {
                    if(i==0)
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