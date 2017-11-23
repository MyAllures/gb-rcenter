define(['site/hall/ssc/PlayWay-xywf','site/plugin/template'], function (PlayWay,Template) {

    return PlayWay.extend({
        _this:null,
        init: function () {
            this._super();
            _this=this;
        },

        showTable : function(){
            var betCode=$("#gfwfBetCode").val();
            $("a[data-code='ssc_kaudu']").addClass("mui-active");
            $("div.s-menu.second").hide();
            $("#qiansankuadu").show();
            $("span.x_1.gfwf-tit").text("跨度");
            $(".s-title.title1 span").text("跨度");
            $(".s-title.title2 span").text(betCode);
            $("#toobarTitle").text("传统玩法-跨度");
            if(betCode =="ssc_kaudu"){
                $("a[data-code='前三组选六']").addClass("mui-active");
            }else{
                $("#qiansankuadu a").removeClass("mui-active");
                $("a[data-code='"+betCode+"']").addClass("mui-active");
            }
            $(".x_3.gfwf-playName").text(betCode)
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