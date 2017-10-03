define(['site/hall/lhc/hklhc/PlayWay'], function (PlayWay) {
    return PlayWay.extend({
        playCode:null,
        betCode:null,
        init: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            $(".main-left .fr .T-tab a.active").click();
        },
        bindButtonEvents: function () {
            this._super();
            this.getSumZodiac();
        },
        /**
         * 合肖
         */
        getSumZodiac: function () {
            var _this = this;
            $(".main-left .fr .T-tab a").click(function () {
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
                        var bet = null;
                        if(data[minNum]){
                            bet = data[minNum];
                            $("#oddValue").text(bet.odd);
                        }

                        $("#minNum").text(minNum);

                        $(".lhc-ztm tr").each(function (i) {
                            var $tr = $(this).find("input");
                            $($tr).each(function () {
                                $(this).attr("data-odds", bet.odd);
                                $(this).attr("data-bet-code", bet.betCode);
                                $(this).attr("data-bet-num",bet.betNum);
                            })

                        });

                        var tdList = $(".main-left .table-common tbody tr td.hx-list");
                        tdList.removeClass("bg-yellow");
                        tdList.each(function() {
                            $(this).find("input").attr("checked",false);
                        });

                        _this.playCode=$("#playCode").val();
                        _this.betCode=bet.betCode;

                    },
                    error: function (e) {
                        console.log("error");
                    }
                });
                $(".main-left .fl input").val("");
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
                var num = $(this).children("strong:first-child").text();
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
            var count = chooseArr.length;
            for(var i = 0; i < count; i++){
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

