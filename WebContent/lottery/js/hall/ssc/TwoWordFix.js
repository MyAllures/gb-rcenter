/**
 * 二字定位
 */
define(['site/hall/ssc/PlayWay'], function (PlayWay) {
    return PlayWay.extend({
        init: function () {
            this._super();
            this.getBetOdds($("div#betCodeDiv a.active"));
        },
        onPageLoad: function () {
            this._super();
        },
        bindButtonEvents: function () {
            this._super();
            var _this = this;
            $("div.T-tab.fix-type.clearfix a").on('click', function () {
                $("div.T-tab.fix-type.clearfix a").removeClass('active');
                $(this).addClass('active');
                $("#inputMoney").val("");
                _this.getBetOdds($(this));
            });
        },
        getBetOdds: function (obj) {
            var allcheck = $("#betTalble tbody tr td");
            allcheck.removeClass("bg-yellow");
            var betCode = obj.attr("data-code");
            var key = "中2";
            var betname = obj.text();
            var code = this.code;
            var type = this.type;
            ajaxRequest({
                url: root + '/' + type + '/getBetOdds.html',
                data: {code: code, betCode: betCode},
                success: function (data) {
                    if (!$.isEmptyObject(data)) {
                        var allcheck = $("#betTalble tbody tr td");
                        allcheck.prop("checked", false);
                        var toucheck = $("#betTalble tbody tr.headtr td");
                        var szdata = data[key];
                        $("#touwei").text(betname.substring(0,1));
                        $("#weiwei").text(betname.substring(1,2));
                        toucheck.attr("data-name",betname.substring(0,1) + "位");
                        var weicheck = $("#betTalble tbody tr.weitr td");
                        allcheck.attr("data-bet-code", szdata.betCode);
                        allcheck.attr("data-odd", szdata.odd);
                        allcheck.attr("data-code", szdata.code);
                        weicheck.attr("data-name", betname.substring(1,2) + "位");
                        $("#betTalble  thead tr th").html(betname + "定位(中2@<strong id='pl' class='pl red'>" + szdata.odd + "</strong>)");
                    } else {
                        console.log(name + ":odd is null");
                    }
                }
            })
        },
        getBetOrder: function () {
            var _this = this;
            var betForm = {
                code: _this.code,
                totalMoney: 0,
                betOrders: [],
                quantity: 0
            };
            var toucheck = $("#betTalble tbody tr.headtr td.bg-yellow");
            var weicheck = $("#betTalble tbody tr.weitr td.bg-yellow");
            if (Number(toucheck.length) == 0) {
                layer.msg("请选择");
                return;
            }
            if (Number(weicheck.length) == 0) {
                layer.msg("请选择");
                return;
            }
            var betAmount = $("input#inputMoney").val();
            if (betAmount == '') {
                layer.msg("请输入金额");
                return;
            }
            var totalMoney = 0;
            var quantity = 0;
            for (var i = 0; i < toucheck.length; ++i) {
                for (var j = 0; j < weicheck.length; ++j) {
                    betForm.betOrders.push({
                        expect: $('i#expect').text(),
                        code: _this.code,
                        betCode: $(toucheck[i]).attr("data-bet-code"),
                        playCode: $(toucheck[i]).attr("data-play"),
                        betNum: $(toucheck[i]).attr("data-bet-num") + "" + $(weicheck[j]).attr("data-bet-num"),
                        odd: $(toucheck[i]).attr("data-odd"),
                        betAmount: betAmount,
                        memo: $(toucheck[i]).attr("data-name") + "-" + $(toucheck[i]).attr("data-bet-num") + " " + $(weicheck[j]).attr("data-name") + "-" + $(weicheck[j]).attr("data-bet-num")
                    });
                    totalMoney = Number(totalMoney) + Number(betAmount);
                    quantity = Number(quantity) + Number(1);
                }
            }
            betForm.totalMoney = totalMoney;
            betForm.quantity = quantity;
            return betForm;
        }
    })
});