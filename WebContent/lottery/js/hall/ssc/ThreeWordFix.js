/**
 * 三字定位
 */
define(['site/hall/ssc/PlayWay'], function (PlayWay) {
    return PlayWay.extend({
        init: function () {
            this._super();
            this.getBetOdds($("div#betCodeDiv a.active"));
        },
        onPageLoad:function() {
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
            var allcheck =$("#betTalble tbody tr td");
            allcheck.removeClass("bg-yellow");
            var betCode = obj.data("code");
            var key = "中3";
            var betname = obj.text();
            var code = this.code;
            var type = this.type;
            ajaxRequest({
                url: root +'/' +type+'/getBetOdds.html',
                data: {code: code, betCode: betCode},
                success: function (data) {
                    if (!$.isEmptyObject(data)) {
                        var toucheck =$("#betTalble tbody tr.headtr td");
                        var szdata =data[key];
                        $("#touwei").text(betname.substring(0,1));
                        $("#zhongwei").text(betname.substring(1,2));
                        $("#weiwei").text(betname.substring(2,3));
                        toucheck.attr("data-name",betname.substring(0,1)+"位");
                        var zhcheck =$("#betTalble tbody tr.zhongtr td");
                        var weicheck =$("#betTalble tbody tr.weitr td");
                        allcheck.attr("data-bet-code",szdata.betCode);
                        allcheck.attr("data-odd",szdata.odd);
                        allcheck.attr("data-code",szdata.code);
                        zhcheck.attr("data-name",betname.substring(1,2)+"位");
                        weicheck.attr("data-name",betname.substring(2,3)+"位");
                        $("#betTalble  thead tr th").html(betname+"定位(中3@<strong id='pl' class='pl red'>"+szdata.odd+"</strong>)");
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
            var toucheck=$("#betTalble tbody tr.headtr td.bg-yellow");
            var zhcheck=$("#betTalble tbody tr.zhongtr td.bg-yellow");
            var weicheck=$("#betTalble tbody tr.weitr td.bg-yellow");
            var tLen = Number(toucheck.length);
            var zLen = Number(zhcheck.length);
            var wLen = Number(weicheck.length);
            if (tLen==0){
                layer.msg("请选择");
                return;
            }
            if (zLen==0){
                layer.msg("请选择");
                return;
            }
            if (wLen==0){
                layer.msg("请选择");
                return;
            }
            if(tLen*zLen*wLen >500){
                layer.msg("注数过大");
                return;
            }
            var betAmount =$("input#inputMoney").val();
            if (betAmount ==''){
                layer.msg("请输入金额");
                return;
            }
            var totalMoney = 0;
            var quantity = 0;
            for (var i = 0; i < toucheck.length; ++i) {
                for (var j = 0; j <zhcheck.length; ++j) {
                    for (var k = 0; k < weicheck.length; ++k) {
                        betForm.betOrders.push({
                            expect: $('i#expect').text(),
                            code: _this.code,
                            betCode: $(toucheck[i]).attr("data-bet-code"),
                            playCode: $(toucheck[i]).attr("data-play"),
                            betNum: $(toucheck[i]).attr("data-bet-num") + "" + $(zhcheck[j]).attr("data-bet-num")+ "" + $(weicheck[k]).attr("data-bet-num"),
                            odd: $(toucheck[i]).attr("data-odd"),
                            betAmount: betAmount,
                            memo: $(toucheck[i]).attr("data-name") + "-" + $(toucheck[i]).attr("data-bet-num") + " " + $(zhcheck[j]).attr("data-name") + "-" + $(zhcheck[j]).attr("data-bet-num") + " " + $(weicheck[k]).attr("data-name") + "-" + $(weicheck[k]).attr("data-bet-num")
                        });
                        totalMoney = Number(totalMoney) + Number(betAmount);
                        quantity = Number(quantity) + Number(1);
                    }
                }
            }
            betForm.totalMoney = totalMoney;
            betForm.quantity = quantity;
            return betForm;
        }
    })
});