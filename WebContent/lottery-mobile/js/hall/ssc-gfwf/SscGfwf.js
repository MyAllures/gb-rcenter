define(['site/hall/ssc/AllSsc', 'site/plugin/template'], function (PlayWay, Template) {

    return PlayWay.extend({
        _this: null,
        //筛选数字组合
        screeningDigtal: new Array(),
        init: function () {
            _this = this;
            this._super();
            this.bindEvent();
        },

        getOdds: function () {
            /*$(".s-menu a").removeClass("mui-active");*/
            var url = root + '/' + this.type + '/' + this.code + '/getGfwfOdds.html';
            mui.ajax(url, {
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    $(".s-menu a").each(function () {
                        var dwd = data.ssc_yixing_dwd.定位胆;
                        $("a[data-code='ssc_yixing_dwd']").attr("data-odd", dwd.oddLimit).attr("data-num",dwd.rebateLimit);

                    });
                }
            })
        },

        bindEvent: function () {
            mui("#betCodeDiv").on('tap', 'a', function () {
                $("#betCodeDiv a").removeClass("mui-active");
                $(this).addClass("mui-active");
                _this.getOdds();
            });
            //清除下注按钮点击事件
            mui("body").on('tap', 'a#del-bet', function () {
                $(".screen-munber a").removeClass("mui-active");
            });
        },//点击投注选项
        bindTdInput: function (thiz) {
            var flag = $(thiz).is('.not-selected');
            if (!flag) {
                $(thiz).toggleClass('mui-active');
            }
            var toua = Number($("#bettouli div a.mui-active").length);
            var zhonga = Number($("#betzhongli div a.mui-active").length);
            var weia = Number($("#betweili div a.mui-active").length);
            if (toua > 0 && weia > 0 && zhonga > 0) {
                $("#quantity").text(toua * weia * zhonga);
            } else {
                $("#quantity").text(0);
            }
        },
        /**
         * 获取注单
         * @returns {{code: *, expect: (*|jQuery), type: *, betOrders: Array}}
         */
        getBetOrder: function () {
            var code = this.code;
            var expect = $('font#expect').text();
            var type = this.type;
            var betAmount = Number($("input#inputMoney").val());
            var betForm = {
                code: code,
                expect: expect,
                type: type,
                betOrders: [],
                quantity: 0,
                totalMoney: 0
            };
            var toua = $("#bettouli div a.mui-active");
            var zhonga = $("#betzhongli div a.mui-active");
            var weia = $("#betweili div a.mui-active");
            for (var i = 0; i < toua.length; ++i) {
                for (var j = 0; j < zhonga.length; ++j) {
                    for (var k = 0; k < weia.length; ++k) {
                        betForm.betOrders.push({
                            code: code,
                            expect: expect,
                            betAmount: betAmount,
                            betCode: $("#betCodeDiv a.mui-active").attr("data-type"),
                            playCode: $(toua[i]).attr("data-play"),
                            betNum: $(toua[i]).attr("data-bet-num") + "" + $(zhonga[j]).attr("data-bet-num") + "" + $(weia[k]).attr("data-bet-num"),
                            odd: $(toua[i]).attr("data-odd"),
                            memo: $(toua[i]).attr("data-name") + "-" + $(toua[i]).attr("data-bet-num") + " " + $(zhonga[j]).attr("data-name") + "-" + $(zhonga[j]).attr("data-bet-num") + " " + $(weia[k]).attr("data-name") + "-" + $(weia[k]).attr("data-bet-num")
                        });
                        betForm.totalMoney = betForm.totalMoney + betAmount;
                        betForm.quantity = betForm.quantity + 1;
                    }
                }
            }
            return betForm;
        }
    });
});