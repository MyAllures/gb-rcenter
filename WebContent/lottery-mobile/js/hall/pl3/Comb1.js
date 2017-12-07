/**
 * 组合
 */
define(['site/hall/pl3/PlayWay-xywf'], function (PlayWay) {
    return PlayWay.extend({
        _this: null,
        init: function () {
            _this = this;
            this.showTable(this.getSecondText(),"传统玩法-组合",$("#gfwfBetCode").val(),$("#zuhe"),"comb");
            this._super();
        },
        getSecondText:function () {
            return $("div#zuhe a.mui-active").attr("data-code")==undefined?"一字组合":$("div#zuhe a.mui-active").attr("data-code");
        },

        bindButtonEvents: function () {
            this._super();
            mui(this.formSelector).on("tap", "a.mui-control-item[data-bet-code]", function () {
                $("div.bet-table .mui-active").each(function () {
                    $(this).removeClass("mui-active");
                });
                $("#quantity").text(0);
                var betCode = $(this).attr("data-bet-code");
                _this.getOdds(betCode, _this.setOneOddList);
            })
        },

        setOneOddList: function (data) {
            var $oneWordComb = $("div.one-word-comb");
            var title = $("a.mui-active[data-bet-code] span").html();
            $oneWordComb.find("div.bet-title").each(function () {
                $(this).html(title);
            });
            var list = data.obj;
            $oneWordComb.find("td[data-bet-num]").each(function () {
                var betNum = $(this).attr("data-bet-num");
                var lottery = list[betNum];
                $(this).attr("data-odds", lottery.odd);
                $(this).attr("data-bet-code", lottery.betCode);
                $(this).attr("data-name", title + "-" + betNum);
                $(this).find("span[name]").html(lottery.odd);
            });
            $oneWordComb.css('display', 'block');
        },

        getOdds: function (betCode, callback) {
            $("#quantity").text(0);
            if (betCode == undefined && callback == undefined) {
                betCode = "comb_one";
                callback = _this.setOneOddList;
            }
            $("div.comb-div").each(function () {
                $(this).css('display', 'none');
            });
            var url = root + '/' + this.type + '/' + this.code + '/getOdds.html';
            mui.ajax(url, {
                dataType: 'json',
                data: {betCode: betCode},
                type: 'POST',
                success: function (data) {
                    //todo 增加data判空
                    if (callback) {
                        callback(data);
                    }
                    _this.hideLoading();
                }
            })
        },

    });
});