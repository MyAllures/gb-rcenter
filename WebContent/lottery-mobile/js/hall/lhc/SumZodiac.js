define(['site/hall/lhc/PlayWay-xywf'], function (PlayWay) {
    return PlayWay.extend({

        init: function () {
            this.showTable(this.getSecondText(),"传统玩法-合肖",this.getSecondCode(),$("#hexiao"),"sumZodiac");
            this._super();

        },

        getSecondText:function () {
            return $("div#hexiao a.mui-active span").text()==""?"二肖":$("div#hexiao a.mui-active span").text();
        },

        getSecondCode:function(){
            return $("#gfwfBetCode").val()=="sumZodiac"?"二肖":$("#gfwfBetCode").val();
        },

        getOdds: function () {
            page.resetBet();
            var url = root + '/' + this.type + '/' + this.code + '/sumZodiacOdd.html';
            var subCode = $("#hexiao a.main.mui-active[data-subCode]").attr("data-subCode");
            var title = $("a.mui-active[data-subCode]").text();
            var minNum = $("#hexiao a.main.mui-active[data-subCode]").attr("min-num");
            mui.ajax(url, {
                dataType: 'json',
                type: 'POST',
                data: {'betCode': subCode},
                success: function (data) {
                    $("#oddValue").text(data[minNum].odd);
                    $("#lhc_title").text(title);
                    $("#minNum").text(minNum);
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
            var odd = $("#oddValue").text();
            var memo = $("#lhc_title").text();
            var playCode = $("#playCode").val();
            var betCode = $("a.main.mui-active[data-subCode]").attr("data-subCode");
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