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
            this.getLinkZodiac();
        },

        lhcBet:null,
        /**
         * 连肖
         */
        getLinkZodiac: function () {
            var _this = this;
            $(".main-left .fr .T-tab a").click(function () {
                _this.clearTdInput();
                $(".main-left .fr .T-tab a").removeClass("active");
                $(this).addClass("active");
                var subCode = $(this).attr("subCode");
                var title = $(this).text();
                $("#lhc_title").text(title);
                var minNum = $(this).attr("min-num");
                ajaxRequest({
                    url: root + '/lhc/hklhc/getLhcBet.html',
                    data: {"subCode": subCode},
                    dataType: "json",
                    success: function (data) {
                        _this.lhcBet = data;
                        $("#minNum").text(minNum);
                        $(".lhc-ztm td.hx-list").each(function (i) {
                            var bet = data[$(this).attr("data-name")];
                            $(this).attr("data-odds", bet.odd);
                            $(this).attr("data-bet-code", bet.betCode);
                            $(this).attr("data-play",$("#playCode"+minNum).val());
                            $(this).attr("data-bet-num", bet.betNum);
                            $(this).next().children().text(bet.odd);
                        });
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
                var num = $(this).attr("data-name");
                if(num){
                    betNumArr.push(num);
                }
            });
            var chooseArr = this.combination(betNumArr, minNum);

            var expect = $('i#expect').text();
            var memo = $("#lhc_title").text();
            var playCode = $("#playCode"+$("#minNum").text()).val();

            var betCode = $("a.active").attr("subCode");

            var betForm = {
                code: _this.code,
                totalMoney: 0,
                betOrders: [],
                quantity: 0
            };
            for(var i = 0; i < chooseArr.length; i++){
                var value = chooseArr[i];

                var arrayMin = new Array();
                var valueArr = value.split(",");
                for(var index = 0; index < valueArr.length; index++){
                    arrayMin.push(this.lhcBet[valueArr[index]].odd);
                }
                var odd = eval("Math.min(" + arrayMin.toString() + ")");

                betForm.betOrders.push({
                    expect: expect,
                    code: _this.code,
                    betCode: betCode,
                    playCode: playCode,
                    betNum: value,
                    odd: odd,
                    betAmount: betAmount,
                    memo: memo+"-"+value
                });
                betForm.totalMoney += betAmount;
                betForm.quantity++;
            }
            return betForm;
        },

        bindTdInput : function(){
            // 点击变黄
            $(".main-left .table-common tbody tr td.hx-list").click(function() {
                var xz = $(this).hasClass("bg-yellow");
                if (xz == true) {
                    $(this).removeClass("bg-yellow");
                } else{
                    $(this).addClass("bg-yellow");
                }
            });
        }
    })


});

