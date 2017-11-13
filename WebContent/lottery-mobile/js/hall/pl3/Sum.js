/**
 * 和数
 */
define(['site/hall/pl3/PlayWay-xywf'], function (PlayWay) {
    return PlayWay.extend({
        _this:null,
        init: function () {
            _this=this;
            this._super();
        },
        bindButtonEvents: function () {
            this._super();
            mui(this.formSelector).on("tap", "a.mui-control-item[data-bet-code]", function () {
                $("div.bet-table td.mui-active").each(function(){
                    $(this).removeClass("mui-active")
                });
                var betCode = $(this).attr("data-bet-code");
                if(betCode == "pl3_hundred_ten_sum" || betCode == "pl3_hundred_one_sum" || betCode == "pl3_ten_one_sum"){
                    _this.getOdds(betCode,$("div.two-word-sum"));
                }else if(betCode == "pl3_hundred_ten_one_sum") {
                    _this.getOdds(betCode,$("div.three-word-sum"));
                }
            })
        },
        getOdds: function (betCode,$sumDiv) {
            if(betCode == undefined && $sumDiv == undefined){
                betCode = "pl3_hundred_ten_sum";
                $sumDiv = $("div.two-word-sum");
            }
            $("div.sum-div").each(function(){
                $(this).css('display','none');
            });
            var url = root + '/' + this.type + '/' + this.code + '/getOdds.html';
            mui.ajax(url, {
                dataType: 'json',
                data: {betCode: betCode},
                type: 'POST',
                success: function (data) {
                    //todo 增加data判空
                    _this.refreshBetTable(data,$sumDiv);
                    _this.hideLoading();
                }, error: function (xhr, type, errorThrown) {
                    //异常处理
                    console.log("getOdds error:" + type + " errorlog:" + errorThrown);
                    _this.hideLoading();
                }
            })
        },refreshBetTable:function(data,$sumDiv) {
            var title = $("a.mui-active[data-bet-code]").html();
            $sumDiv.find(".title0").html(title);
            $sumDiv.find(".title1").html(title+"尾数");
            $sumDiv.find(".title2").html(title+"双面");
            $sumDiv.find(".title3").html(title+"尾数双面");

            var list = data.obj;
            $sumDiv.find(".sum-list td[data-bet-num]").each(function(){
                var betNum = $(this).attr("data-bet-num");
                var lottery = list[betNum];
                $(this).attr("data-odds",lottery.odd);
                $(this).attr("data-bet-code",lottery.betCode);
                $(this).attr("data-name",title+"-"+betNum);
                $(this).find("span[name]").html(lottery.odd);
            });
            title += "尾数";
            $sumDiv.find(".mantissa-list td[data-bet-num]").each(function(){
                var betNum = $(this).attr("data-bet-num");
                var lottery = list[betNum];
                $(this).attr("data-odds",lottery.odd);
                $(this).attr("data-bet-code",lottery.betCode);
                $(this).attr("data-name",title+"-"+betNum);
                $(this).find("span[name]").html(lottery.odd);
            });

            $sumDiv.css('display','block');
        }
    });
});