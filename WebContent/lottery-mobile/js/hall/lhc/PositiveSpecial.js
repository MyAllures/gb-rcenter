define(['site/hall/lhc/PlayWay'], function (PlayWay) {
    return PlayWay.extend({
        init: function () {
            this._super();
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