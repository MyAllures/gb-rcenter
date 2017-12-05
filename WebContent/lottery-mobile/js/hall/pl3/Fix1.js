define(['site/hall/pl3/PlayWay-xywf'], function (PlayWay) {
    return PlayWay.extend({
        _this: null,
        init: function () {
            _this = this;
            this.showTable(this.getSecondText(),"传统玩法-定位",$("#gfwfBetCode").val(),$("#dingwei"),"fix");
            this._super();
        },
        getSecondText:function () {
            return $("div#dingwei a.mui-active").attr("data-code")==undefined?"百定位":$("div#dingwei a.mui-active").attr("data-code");
        },

        getOdds: function () {
            var betCode = $("#dingwei a.mui-active").data("type");
            var url = root + '/' + this.type + '/' + this.code + '/getOdds.html';
            mui.ajax(url, {
                dataType: 'json',
                data: {betCode: betCode},
                type: 'POST',
                success: function (data) {
                    var list = data.obj;
                    var $oneWordFix = $("div.one-word-fix");
                    var title = $("#dingwei a.main.mui-active span").html();
                    $oneWordFix.find("div.bet-title").each(function () {
                        $(this).html(title);
                    });
                    $oneWordFix.find("td[data-bet-num]").each(function () {
                        var betNum = $(this).attr("data-bet-num");
                        var lottery = list[betNum];
                        $(this).attr("data-odds", lottery.odd);
                        $(this).attr("data-bet-code", lottery.betCode);
                        $(this).attr("data-name", title + "-" + betNum);
                        $(this).find("span[name]").html(lottery.odd);
                    });
                    _this.hideLoading();
                }
            })
        },

    });
});