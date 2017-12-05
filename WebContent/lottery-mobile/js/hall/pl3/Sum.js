/**
 * 和数
 */
define(['site/hall/pl3/PlayWay-xywf'], function (PlayWay) {
    return PlayWay.extend({
        _this:null,
        init: function () {
            _this=this;
            this.showTable(this.getSecondText(),"传统玩法-和数",$("#gfwfBetCode").val(),$("#heshu"),"sum");
            this._super();
        },
        getSecondText:function () {
            return $("div#heshu a.mui-active").attr("data-code")==undefined?"百十和数":$("div#heshu a.mui-active").attr("data-code");
        },

        getOdds: function () {
            var betCode = $("#heshu a.mui-active").data("type");
            var url = root + '/' + this.type + '/' + this.code + '/getOdds.html';
            mui.ajax(url, {
                dataType: 'json',
                data: {betCode: betCode},
                type: 'POST',
                success: function (data) {
                    //todo 增加data判空
                    _this.refreshBetTable(data,$("div.word-sum"));
                    _this.hideLoading();
                }, error: function (xhr, type, errorThrown) {
                    //异常处理
                    console.log("getOdds error:" + type + " errorlog:" + errorThrown);
                    _this.hideLoading();
                }
            })
        },
        refreshBetTable:function(data,$sumDiv) {
            var title = $("a.mui-active[data-type] span").html();
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
        }
    });
});