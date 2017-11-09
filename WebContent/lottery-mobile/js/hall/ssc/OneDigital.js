define(['site/hall/ssc-gfwf/PlayWay-xywf','site/plugin/template'], function (PlayWay,Template) {

    return PlayWay.extend({
        _this:null,
        init: function () {
            this._super();
        },
        showTable : function(){
            var betCode=$("#gfwfBetCode").val();
            $("a[data-code='ssc_yizidingwei']").addClass("mui-active");
            $("div.s-menu.second").hide();
            $("#yizidingwei").show();
            $("span.x_1.gfwf-tit").text("一字定位");
            $(".s-title.title1 span").text("一字定位");
            $(".s-title.title2 span").text("万定位");
            $("#toobarTitle").text("信用玩法-一字定位");
            if(betCode =="ssc_yizidingwei"){
                $("a[data-code='万']").addClass("mui-active");
                $(".x_3.gfwf-playName").text("万定位");
            }else{
                $("#yizidingwei a").removeClass("mui-active");
                $("a[data-code='"+betCode+"']").addClass("mui-active");
            }
            $(".x_3.gfwf-playName").text(betCode+"定位")
            $(".s-title.title2 span").text(betCode+"定位");
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