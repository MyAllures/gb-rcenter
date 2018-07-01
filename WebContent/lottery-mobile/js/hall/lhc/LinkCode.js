define(['site/hall/lhc/PlayWay-xywf'], function (PlayWay) {
    return PlayWay.extend({

        init: function () {
            this.showTable(this.getSecondText(),"传统玩法-连码",this.getSecondCode(),$("#lianma"),"linkCode");
            this._super();
        },

        getSecondText:function () {
            return $("div#lianma a.mui-active span").text()==""?"三全中":$("div#lianma a.mui-active span").text();
        },

        getSecondCode:function(){
            return $("#gfwfBetCode").val()=="linkCode"?"三全中":$("#gfwfBetCode").val();
        },

        getOdds: function () {
            page.resetBet();
            var url = root + '/' + this.type + '/' + this.code + '/linkCodeOdd.html';
            var activeA = $("a.main.mui-active[data-subCode]");
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
            var betCode = $("a.main.mui-active[data-subCode]").attr("data-subCode");
            var playCode = $("#"+betCode).val();
            var betForm = {
                code: _this.code,
                totalMoney: 0,
                betOrders: [],
                quantity: 0
            };
            var count = chooseArr.length;
            if(count>500){
                mui.toast("注数过大");
                return;
            }
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
            //限制注数
            var minNum = parseInt($("a.main.mui-active").attr("min-num"));
            minNum = minNum !=2?minNum==4?minNum+8:minNum+12:minNum+30;
            var flag = $(obj).is('.not-selected');
            if (!flag) {
                $(obj).toggleClass('mui-active');
                if($("td.mui-active").length>minNum){
                    mui.toast("注数过大");
                    $(obj).removeClass('mui-active');
                }
            }
            var arrLength = $("div.bet-table-list .mui-active").length;
            $("#quantity").text(this.combinationNum(arrLength,$("#minNum").text()));
        }
    });
});