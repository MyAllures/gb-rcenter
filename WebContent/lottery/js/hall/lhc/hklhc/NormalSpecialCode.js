define(['site/hall/lhc/hklhc/PlayWay'], function (PlayWay) {
    return PlayWay.extend({
        init: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            $(".main-left .fr .T-tab a.active").click();
        },
        bindButtonEvents: function () {
            this._super();
            this.getNormalSpecialCode();
        },
        /**
         * 六合彩正码特跳转子页面
         */
        getNormalSpecialCode: function () {
            var _this=this;
            $(".main-left .fr .T-tab a").click(function () {
                _this.clearTdInput();
                $(".main-left .fr .T-tab a").removeClass("active");
                $(this).addClass("active");
                var subCode = $(this).attr("subCode");
                var title = $(this).text();
                ajaxRequest({
                    url: root + '/lhc/hklhc/getLhcBet.html',
                    data: {"subCode": subCode},
                    dataType: "json",
                    success: function (data) {
                        $(".lhc-ztm tr").each(function (i) {
                            var $tr = $(this).find("input");
                            $($tr).each(function () {
                                var betNum = $(this).attr("data-bet-num");
                                var bet = data[betNum];
                                $(this).parent("td").prev().find("strong").html(bet.odd);
                                $(this).attr("data-odds", bet.odd);
                                $(this).attr("data-bet-code", bet.betCode);
                                var num = $(this).parent("td[data-num]").attr("data-num");
                                $(this).attr("data-name", title + "-" + num);
                            })

                        });
                    },
                    error: function (e) {
                        console.log("error");
                    }
                });
                $(".main-left .fl input").val("");
            });
        }
    })
});
