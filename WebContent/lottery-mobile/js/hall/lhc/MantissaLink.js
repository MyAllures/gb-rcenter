define(['site/hall/lhc/PlayWay-xywf'], function (PlayWay) {
    return PlayWay.extend({
        lhcBet:null,
        init: function () {
            this.showTable(this.getSecondText(),"传统玩法-尾数连",this.getSecondCode(),$("#weishulian"),"mantissaLink");
            this._super();

        },
        getSecondText:function () {
            return $("div#weishulian a.mui-active span").text()==""?"二尾连":$("div#weishulian a.mui-active span").text();
        },

        getSecondCode:function(){
            return $("#gfwfBetCode").val()=="mantissaLink"?"二尾连":$("#gfwfBetCode").val();
        },

        getOdds: function () {
            var _this = this;
            page.resetBet();
            var url = root + '/' + this.type + '/' + this.code + '/mantissaLinkOdd.html';
            var activeA = $("#weishulian a.main.mui-active[data-subCode]");
            var subCode = activeA.attr("data-subCode");
            var minNum = activeA.attr("min-num");
            var title = activeA.text();
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
                    });

                }
            })
        },
        /**
         * 验证是否符合下注条件
         * @returns {boolean}
         */
        checkBetOrder: function () {
            var result = this._super();
            if(!result){
                return false;
            }
            var activeTds = $("div.bet-table-list .mui-active");
            var minNum = $("#minNum").text();
            if (activeTds.length < minNum) {
                this.toast("请至少选择"+minNum+"个号码");
                return false;
            }
            return true;
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
            var playCode = $("#playCode"+$("#minNum").text()).val();
            var betCode = $("#weishulian a.main.mui-active[data-subCode]").attr("data-subCode");
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