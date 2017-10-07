define(['site/hall/lhc/hklhc/PlayWay'], function (PlayWay) {
    return PlayWay.extend({
        playCode:"lhc_three_all_in",
        betCode:"lhc_three_all_in",
        init: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            $(".main-left .fr .T-tab a.active").click();
        },
        bindButtonEvents: function () {
            this._super();
            this.getLinkCode();
        },
        /**
         * 六合彩正码特跳转子页面
         */
        getLinkCode: function () {
            var _this = this;
            $(".main-left .fr .T-tab a").click(function () {
                _this.clearTdInput();
                $(".main-left .fr .T-tab a").removeClass("active");
                $(this).addClass("active");
                var subCode = $(this).attr("subCode");
                var title = $(this).text();
                var minNum = $(this).attr("min-num");

                ajaxRequest({
                    url: root + '/lhc/hklhc/getLhcBet.html',
                    data: {"subCode": subCode},
                    dataType: "json",
                    success: function (data) {
                        var bet = null;
                        var nextBet = null;
                        if(data['中2'] && data['中3']){
                            bet = data['中2'];
                            nextBet = data['中3'];
                            $("#oddValue").text(bet.odd);
                            $("#nextOddValue").text(nextBet.odd);
                            $(".nextOddValue").show();
                            $("#lhc_title").text("中2");
                            $("#nextOddTitle").text("中3");
                        }else if(data['中2'] && data['中特']){
                            bet = data['中特'];
                            nextBet = data['中2'];
                            $("#oddValue").text(bet.odd);
                            $("#nextOddValue").text(nextBet.odd);
                            $(".nextOddValue").show();
                            $("#lhc_title").text("中特");
                            $("#nextOddTitle").text("中2");
                        }//二,三,四全中
                        else if(data[minNum]){
                            bet = data[minNum];
                            $("#oddValue").text(bet.odd);
                            $(".nextOddValue").hide();
                            $("#lhc_title").text(title);
                        }
                        $("#minNum").text(minNum);
                        _this.playCode=$("#"+subCode).val();
                        _this.betCode=bet.betCode;
                    },
                    error: function (e) {
                        console.log("error");
                    }
                });
            });
        },
        /** 获取注单 */
        getBetOrder: function () {
            var _this = this;
            var minNum = $("#minNum").text();
            if ($(".main-left .table-common td.bg-yellow").length < minNum) {
                layer.msg("请至少选择"+minNum+"个号码");
                return;
            }
            var betAmount = $("input#inputMoney").val();
            if(betAmount == "" || betAmount == undefined || betAmount == null){
                layer.msg("请输入正确金额");
                return;
            }
            betAmount = parseInt(betAmount);
            var betNumArr = new Array();
            $(".main-left .table-common td.bg-yellow").each(function () {
                var num = $(this).attr("num");
                if(num){
                    betNumArr.push(num);
                }
            });
            var chooseArr = this.combination(betNumArr, minNum);

            var expect = $('i#expect').text();
            var odd = $("#oddValue").text();
            var memo = $("#lhc_title").text();

            var betForm = {
                code: _this.code,
                totalMoney: 0,
                betOrders: [],
                quantity: 0
            };
            for(var i = 0; i < chooseArr.length; i++){
                var value = chooseArr[i];
                betForm.betOrders.push({
                    expect: expect,
                    code: _this.code,
                    betCode: _this.betCode,
                    playCode: _this.playCode,
                    betNum: value,
                    odd: odd,
                    betAmount: betAmount,
                    memo: memo+"-"+value
                });
                betForm.totalMoney += betAmount;
                betForm.quantity++;
            }
            return betForm;
        }
    })
});

