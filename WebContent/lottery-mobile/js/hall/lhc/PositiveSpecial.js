define(['site/hall/lhc/PlayWay-xywf'], function (PlayWay) {
    return PlayWay.extend({
        init: function () {
            this._super();
        },
        showTable : function(){
            var BetCode=$("#gfwfBetCode").val();
            $("a[data-code='"+BetCode+"']").addClass("mui-active");
            $("a[data-code='tema']").addClass("mui-active");
            $(".x_3.gfwf-playName").text(BetCode);
            $("span.x_1.gfwf-tit").text(BetCode);
            $(".s-title.title1 span").text(BetCode);
            $(".s-title.title2 span").text(BetCode);
            $("#toobarTitle").text("信用玩法-"+BetCode);
            $("a[data-code='tema'] span").text(BetCode);
        },

        bindButtonEvents: function () {
            this._super();
            var _this = this;
            mui(this.formSelector).on("tap", "a.mui-control-item[data-subCode]", function () {
                _this.resetBet();
                var oldBetTitle = $("a.mui-active[data-subCode]").text();
                $("a.mui-control-item[data-subCode]").removeClass("mui-active");
                $(this).addClass("mui-active");
                _this.getOdds();
                var betTitle = $("a.mui-active[data-subCode]").text();
                $("td[data-name]").removeClass("mui-active");
                $("td[data-name]").each(function () {
                    var name = $(this).attr("data-name");
                    name = name.replace(oldBetTitle, betTitle);
                    $(this).attr("data-name", name);
                });

            })
        },
        getOdds: function () {
            var url = root + '/' + this.type + '/' + this.code + '/' + this.betCode + 'Odd.html';
            var subCode = $("a.mui-active[data-subCode]").attr("data-subCode");
            var betTitle = $("a.mui-active[data-subCode]").text();
            var _this = this;
            $(".bet-title").text(betTitle);
            mui.ajax(url, {
                dataType: 'json',
                type: 'POST',
                data: {'subCode': parseInt(subCode)},
                success: function (data) {
                    _this.templateOdd(data);
                }
            })
        }
    });
});