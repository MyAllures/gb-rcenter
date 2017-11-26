/**
 * 组合
 */
define(['site/hall/pl3/PlayWay-xywf'], function (PlayWay) {
    return PlayWay.extend({
        _this: null,
        init: function () {
            _this = this;
            this._super();
        },
        showTable : function(){
            var gfwfBetCode=$("#gfwfBetCode").val();
            $("a[data-code='comb']").addClass("mui-active");
            $("a[data-code='"+gfwfBetCode+"']").addClass("mui-active");
            $("div.s-menu.second").hide();
            $("#zuhe").show();
            $("span.x_1.gfwf-tit").text(gfwfBetCode);
            $(".s-title.title1 span").text(gfwfBetCode);
            $("#toobarTitle").text("传统玩法-组合");
            if (this.os == 'app_android' && isLotterySite == 'true') {
                window.gamebox.setTitle('传统玩法-组合');
            }
            $(".x_3.gfwf-playName").text(gfwfBetCode)
            $(".s-title.title2 span").text(gfwfBetCode);
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