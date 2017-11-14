define(['site/hall/sfc/PlayWay-xywf', 'site/plugin/template'], function (PlayWay, Template) {

    return PlayWay.extend({
        _this: null,
        init: function () {
            this._super();
            _this = this;

        },
        showTable : function(){
            var BetCode=$("#gfwfBetCode").val();
            var BetCode1="第一球";
            if(BetCode=="sfc_first"){
                BetCode1="第一球";
            }else if(BetCode=="sfc_second"){
                BetCode1="第二球";
            }else if(BetCode=="sfc_third"){
                BetCode1="第三球";
            }else if(BetCode=="sfc_fourth"){
                BetCode1="第四球";
            }else if(BetCode=="sfc_fifth"){
                BetCode1="第五球";
            }else if(BetCode=="sfc_sixth"){
                BetCode1="第六球";
            }else if(BetCode=="sfc_seventh"){
                BetCode1="第七球";
            }else if(BetCode=="sfc_eighth"){
                BetCode1="第八球";
            }

            $("a[data-code='"+BetCode+"']").addClass("mui-active");
            $("a[data-code='sm']").addClass("mui-active");
            $(".x_3.gfwf-playName").text(BetCode1);
            $("span.x_1.gfwf-tit").text(BetCode1);
            $(".s-title.title1 span").text(BetCode1);
            $(".s-title.title2 span").text(BetCode1);
            $("#toobarTitle").text("信用玩法-"+BetCode1);
            $("a[data-code='sm'] span").text(BetCode1);
        },

        getOdds: function () {
            var betCode = $("#lotteryBetCode").val();
            var url = root + '/' + this.type + '/' + this.code + '/getOdds.html';
            var _this = this;
            mui.ajax(url, {
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    console.log(data[betCode]);
                    $("div.bet-table > div > table > tbody tr td").each(function (i,item) {
                        var ii =i+1;
                        var td = $("#tdnum" + ii);
                        var spans = td.find("span");
                        var index;
                        if (ii<10){
                            index = "0"+ii;
                        }else {
                            index = ii + "";
                        }
                        var tdata = data[betCode][index];
                        $(spans[1]).text(tdata.odd);
                        td.attr("data-odds",tdata.odd);
                        td.attr("data-bet-code",tdata.betCode);
                        td.attr("data-bet-num",tdata.betNum);
                        td.attr("data-play","sfc_digital");
                        td.attr("data-name",$("a.main.mui-active").text()+"-"+tdata.betNum);
                    });

                }
            })
        }
    });
});