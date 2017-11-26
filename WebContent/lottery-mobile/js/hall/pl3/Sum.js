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
        showTable : function(){
            var gfwfBetCode=$("#gfwfBetCode").val();
            $("a[data-code='sum']").addClass("mui-active");
            $("a[data-code='"+gfwfBetCode+"']").addClass("mui-active");
            $("div.s-menu.second").hide();
            $("#heshu").show();
            $("span.x_1.gfwf-tit").text(gfwfBetCode);
            $(".s-title.title1 span").text(gfwfBetCode);
            $("#toobarTitle").text("传统玩法-和数");
            if (this.os == 'app_android' && isLotterySite == 'true') {
                window.gamebox.setTitle('传统玩法-和数');
            }
            $(".x_3.gfwf-playName").text(gfwfBetCode)
            $(".s-title.title2 span").text(gfwfBetCode);
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