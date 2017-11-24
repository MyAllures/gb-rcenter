define(['site/hall/ssc/PlayWay-xywf', 'site/plugin/template'], function (PlayWay, Template) {
    return PlayWay.extend({
        init: function () {
            this._super();
        },
        getOdds: function () {
            var url = root + '/' + this.type + '/' + this.code + '/getOdds.html';
            var _this = this;
            mui.ajax(url, {
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    $(".bet-table-list[data-subCode]").each(function () {
                        var subCode = $(this).attr("data-subCode");
                        var $tdBet = $(this).find("td[data-bet-num]");
                        $tdBet.each(function () {
                            var betNum = $(this).attr('data-bet-num');
                            var thisData = data[subCode];
                            var bet = thisData[betNum];
                            $(this).attr("data-odds", bet.odd);
                            $(this).attr("data-bet-code", bet.betCode);
                            $(this).children("span[name=odd]").text(bet.odd);
                        })
                    });
                }
            })
        },

        showTable : function(){

            //数字盘
            $("div.s-menu.second").hide();
            $("#shuzipan").show();
            $("a[data-code='ssc_shuzipan']").addClass("mui-active");
            $("a[data-code='szp']").addClass("mui-active");
            $(".x_3.gfwf-playName").text("数字盘");
            $("span.x_1.gfwf-tit").text("数字盘");
            $(".s-title.title1 span").text("数字盘");
            $(".s-title.title2 span").text("数字盘");
            $("#toobarTitle").text("传统玩法-数字盘");
            if (this.os == 'app_android' && isLotterySite == 'true') {
                window.gamebox.setTitle('传统玩法-数字盘');
            }
            $("a[data-code='szp'] span").text("数字盘");
        }

    });
});