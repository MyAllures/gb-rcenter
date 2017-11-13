/**
 * 跨度
 */
define(['site/hall/pl3/PlayWay-xywf'], function (PlayWay) {
    return PlayWay.extend({
        _this:null,
        init: function () {
            _this=this;
            this._super();
        },
        getOdds: function () {
            var url = root + '/' + this.type + '/' + this.code + '/getOdds.html';
            mui.ajax(url, {
                dataType: 'json',
                data: {betCode: "pl3_span"},
                type: 'POST',
                success: function (data) {
                    //todo 增加data判空
                    _this.refreshBetTable(data);
                    _this.hideLoading();
                }
            })
        },refreshBetTable:function(data) {
            var $spanList = $("#span-list");
            var list = data.obj;
            var title = $spanList.find("div.bet-title:eq(0)").html();
            $spanList.find("td[data-bet-num]").each(function () {
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