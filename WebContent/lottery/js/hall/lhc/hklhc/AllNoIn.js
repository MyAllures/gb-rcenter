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
            this.getAllNoIn();
        },
        /**
         *  全不中
         */
        getAllNoIn: function () {
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
                                $(this).attr("data-play",$("#playCode"+minNum).val());
                                $(this).attr("data-bet-num",bet.betNum);
                            })

                        });

                        $(".main-left .table-common input").attr("checked",false);
                        $(".main-left .table-common tbody tr td.new-ball-st").removeClass("bg-yellow");
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
                var num = $(this).attr("num");
                if(num){
                    betNumArr.push(num);
                }
            });
            var chooseArr = this.combination(betNumArr, minNum);
            if(chooseArr.length>500){
                layer.msg("注数过大");
                return;
            }

            var expect = $('i#expect').text();
            var playCode = $("#playCode"+minNum).val();
            var betCode = $("a.active").attr("subCode");
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
        xianZhiLHCZhuShu :function () {
            var code = $(".main-left .fr .T-tab a.active").attr("subCode");
            var num = parseInt($("#minNum").text());
            var minNum = code !="lhc_eleven_no_in" && code !="lhc_eight_no_in" && code !="lhc_twelve_no_in" && code !="lhc_ten_no_in" && code !="lhc_nine_no_in" && code !="lhc_seven_no_in"? num+4 : num+2;
            var len = $("td.new-ball-st.bg-yellow").length;
            if(len>minNum){
                layer.msg('注数过大', {icon: 5});
                return false;
            }else{
                return true;
            }
        },
    })
});

