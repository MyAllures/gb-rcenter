define(['site/hall/lhc/PlayWay-xywf'], function (PlayWay) {
    return PlayWay.extend({

        init: function () {
            this._super();
        },
        showTable : function(){
            var BetCode=$("#gfwfBetCode").val();
            $("a[data-code='"+BetCode+"']").addClass("mui-active");
            $("a[data-code='tema']").addClass("mui-active");
            $(".x_3.gfwf-playName").text(BetCode);
            $("span.x_1.gfwf-tit").text(BetCode);
            $(".s-title.title1 span").text(BetCode);
            $(".s-title.title2 span").text(BetCode);
            $("#toobarTitle").text("信用玩法-"+BetCode);
            $("a[data-code='tema'] span").text(BetCode);
        },

        bindButtonEvents: function () {
            this._super();
            var _this = this;
            mui(this.formSelector).on("tap", "a.mui-control-item[data-subCode]", function () {
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
        lhcBet:null,
        getOdds: function () {
            var _this = this;
            this.resetBet();
            var url = root + '/' + this.type + '/' + this.code + '/' + this.betCode + 'Odd.html';
            var activeA = $("a.mui-active[data-subCode]");
            var subCode = activeA.attr("data-subCode");
            var title = activeA.text();
            var minNum = activeA.attr("min-num");
            mui.ajax(url, {
                dataType: 'json',
                type: 'POST',
                data: {'betCode': subCode},
                success: function (data) {
                    _this.lhcBet = data;
                    $("#lhc_title").text(title);
                    $("#minNum").text(minNum);

                    $(".bet-table-list td[data-bet-num]").each(function () {
                        var betNum = $(this).attr('data-bet-num');
                        var bet = data[betNum];
                        $(this).attr("data-odds", bet.odd);
                        $(this).attr("data-bet-code", bet.betCode);
                        $(this).children("span:last-child").text(bet.odd);
                    })

                }
            })
        },
        /**
         * 投注
         */
        betOrder: function () {
            if (!this.checkBetOrder()) {
                return;
            }
            var activeTds = $("div.bet-table-list .mui-active");
            var minNum = $("#minNum").text();
            if (activeTds.length < minNum) {
                this.toast("请至少选择"+minNum+"个号码");
                return;
            }
            var betForm = this.getBetOrder();

            this.placeOrder(betForm);
            $("#dingdan").addClass('mui-active');
        },

        /**
         * 获取注单
         * @returns {{code: *, expect: (*|jQuery), type: *, betOrders: Array}}
         */
        getBetOrder: function () {
            var _this = this;
            var betAmount = $("input#inputMoney").val();
            betAmount = parseInt(betAmount);
            var betNumArr = new Array();
            var minNum = $("#minNum").text();
            $("div.bet-table-list .mui-active").each(function () {
                var num = $(this).attr("data-bet-num");
                if(num){
                    betNumArr.push(num);
                }
            });
            var chooseArr = this.combination(betNumArr, minNum);

            var expect = $('font#expect').text();
            var memo = $("#lhc_title").text();
            var playCode = $("#playCode"+minNum).val();
            var betCode = $("a.mui-active[data-subCode]").attr("data-subCode");
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
                for(var index in valueArr){
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
        //点击投注选项
        bindTdInput: function (obj) {
            var flag = $(obj).is('.not-selected');
            if (!flag) {
                $(obj).toggleClass('mui-active');
            }
            var arrLength = $("div.bet-table-list .mui-active").length;
            $("#quantity").text(this.combinationNum(arrLength,$("#minNum").text()));
        }
    });
});