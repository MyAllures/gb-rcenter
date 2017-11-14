define(['site/hall/pl3/PlayWay-xywf'], function (PlayWay) {
    return PlayWay.extend({
        _this: null,
        init: function () {
            _this = this;
            this._super();

        },
        showTable : function(){
            var gfwfBetCode=$("#gfwfBetCode").val();
            $("a[data-code='fix']").addClass("mui-active");
            $("a[data-code='"+gfwfBetCode+"']").addClass("mui-active");
            $("div.s-menu.second").hide();
            $("#dingwei").show();
            $("span.x_1.gfwf-tit").text(gfwfBetCode);
            $(".s-title.title1 span").text(gfwfBetCode);
            $("#toobarTitle").text("官方玩法-定位");
            $(".x_3.gfwf-playName").text(gfwfBetCode)
            $(".s-title.title2 span").text(gfwfBetCode);
        },

        bindButtonEvents: function () {
            this._super();
            mui(this.formSelector).on("tap", "a.mui-control-item[data-bet-code]", function () {
                $("div.bet-table .mui-active").each(function () {
                    $(this).removeClass("mui-active")
                });
                $("#quantity").text(0);
                var betCode = $(this).attr("data-bet-code");
                _this.getOdds(betCode, _this.setOneOddList);
            })
        },

        setOneOddList: function (data) {
            var $oneWordFix = $("div.one-word-fix");
            var title = $("a.mui-active[data-bet-code]  span").html();
            $oneWordFix.find("div.bet-title").each(function () {
                $(this).html(title);
            });
            var list = data.obj;
            $oneWordFix.find("td[data-bet-num]").each(function () {
                var betNum = $(this).attr("data-bet-num");
                var lottery = list[betNum];
                $(this).attr("data-odds", lottery.odd);
                $(this).attr("data-bet-code", lottery.betCode);
                $(this).attr("data-name", title + "-" + betNum);
                $(this).find("span[name]").html(lottery.odd);
            });
            $oneWordFix.css('display', 'block');
        },

        getOdds: function (betCode, callback) {
            if (betCode == undefined && callback == undefined) {
                betCode = "pl3_hundred";
                callback = _this.setOneOddList;
            }
            var url = root + '/' + this.type + '/' + this.code + '/getOdds.html';
            mui.ajax(url, {
                dataType: 'json',
                data: {betCode: betCode},
                type: 'POST',
                success: function (data) {
                    if (typeof callback == "function") {
                        callback(data);
                    }
                    _this.hideLoading();
                }
            })
        },

    });
});