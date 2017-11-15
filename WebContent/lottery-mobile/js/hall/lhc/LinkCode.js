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
        getOdds: function () {
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
                    if(data['中2'] && data['中3']){
                        var bet = data['中2'];
                        var nextBet = data['中3'];
                        $("#oddValue").text(bet.odd);
                        $("#nextOddValue").text(nextBet.odd);
                        $(".nextOddValue").show();
                        $("#lhc_title").text("中2");
                        $("#nextOddTitle").text("中3");
                    }else if(data['中2'] && data['中特']){
                        var bet = data['中特'];
                        var nextBet = data['中2'];
                        $("#oddValue").text(bet.odd);
                        $("#nextOddValue").text(nextBet.odd);
                        $(".nextOddValue").show();
                        $("#lhc_title").text("中特");
                        $("#nextOddTitle").text("中2");
                    }else if(data[minNum]){
                        var bet = data[minNum];
                        $("#oddValue").text(bet.odd);
                        $(".nextOddValue").hide();
                        $("#lhc_title").text(title);
                    }

                    $("#minNum").text(minNum);
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
            var odd = $("#oddValue").text();
            var memo = $("#lhc_title").text();
            var betCode = $("a.mui-active[data-subCode]").attr("data-subCode");
            var playCode = $("#"+betCode).val();
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