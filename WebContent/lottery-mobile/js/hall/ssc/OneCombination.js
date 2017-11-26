define(['site/hall/ssc/PlayWay-xywf','site/plugin/template'], function (PlayWay,Template) {

    return PlayWay.extend({
        _this:null,
        init: function () {
            this._super();
            _this=this;

        },

        showTable : function(){
            var betCode=$("#gfwfBetCode").val();
            $("a[data-code='ssc_yizizuhe']").addClass("mui-active");
            $("div.s-menu.second").hide();
            $("#yizizuhe").show();
            $("span.x_1.gfwf-tit").text("一字组合");
            $(".s-title.title1 span").text("一字组合");
            $(".s-title.title2 span").text(betCode);
            $("#toobarTitle").text("传统玩法-一字组合");
            if (this.os == 'app_android' && isLotterySite == 'true') {
                window.gamebox.setTitle('传统玩法-一字组合');
            }
            if(betCode =="ssc_yizizuhe"){
                $("a[data-code='全五一字']").addClass("mui-active");
            }else{
                $("#yizizuhe a").removeClass("mui-active");
                $("a[data-code='"+betCode+"']").addClass("mui-active");
            }

            $(".x_3.gfwf-playName").text(betCode)

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