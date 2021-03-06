define(['site/hall/lhc/PlayWay-xywf'], function (PlayWay) {
    return PlayWay.extend({
        lhcBet:null,
        init: function () {
            this.showTable(this.getSecondText(),"传统玩法-连肖",this.getSecondCode(),$("#lianxiao"),"linkZodiac");
            this._super();

        },
        getSecondText:function () {
            return $("div#lianxiao a.mui-active span").text()==""?"二肖连":$("div#lianxiao a.mui-active span").text();
        },

        getSecondCode:function(){
            return $("#gfwfBetCode").val()=="linkZodiac"?"二肖连":$("#gfwfBetCode").val();
        },

        getOdds: function () {
            var _this = this;
            page.resetBet();
            var url = root + '/' + this.type + '/' + this.code + '/linkZodiacOdd.html';
            var activeA = $("#lianxiao a.main.mui-active[data-subCode]");
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
            this.betForm = betForm;
            sessionStorage.betForm = JSON.stringify(betForm);

            this.placeOrder(betForm);
            $("#dingdan").addClass('mui-active');

            //重新操作表单
            this.initBetFormBtn();
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
            var betCode = $("a.main.mui-active[data-subCode]").attr("data-subCode");
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
                if($(obj).attr("data-bet-num") !=undefined){
                    $(obj).toggleClass('mui-active');
                }
            }
            var arrLength = $("div.bet-table-list .mui-active").length;
            $("#quantity").text(this.combinationNum(arrLength,$("#minNum").text()));
        }
    });
});