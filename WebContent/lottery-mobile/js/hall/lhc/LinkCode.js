define(['site/hall/lhc/PlayWay'], function (PlayWay) {
    return PlayWay.extend({

        init: function () {
            this._super();
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
            var url = root + '/' + this.type + '/' + this.code + '/' + this.betCode + 'Odd.html';
            var subCode = $("a.mui-active[data-subCode]").attr("data-subCode");
            var title = $("a.mui-active[data-subCode]").text();

            mui.ajax(url, {
                dataType: 'json',
                type: 'POST',
                data: {'betCode': subCode},
                success: function (data) {

                    var minNum = 0;
                    var index = 0;

                    var bet = null;
                    var nextBet = null;

                    if(title=="二全中"){
                        minNum = 2;
                        index = 2;
                    }
                    if(title=="三全中"){
                        minNum = 3;
                        index = 3;
                    }
                    if(title=="四全中"){
                        minNum = 4;
                        index = 4;
                    }
                    if(title=="三中二"){
                        minNum=3;
                        index = 5;
                    }
                    if(title=="二中特"){
                        minNum = 2;
                        index = 6;
                    }
                    if(title=="特串"){
                        minNum = 2;
                        index = 7;
                    }

                    if(data[title]){
                        bet = data[title];
                        $("#oddValue").text(bet.odd);
                        $(".nextOddValue").hide();
                    }else if(data['三中二之中二'] || data['三中二之中三']){
                        bet = data['三中二之中二'];
                        nextBet = data['三中二之中三'];
                        $("#oddValue").text(bet.odd);
                        $("#nextOddValue").text(nextBet.odd);
                        $(".nextOddValue").show();
                    }else if(data['二中特之中二'] || data['二中特之中特']){
                       bet = data['二中特之中特'];
                       nextBet = data['二中特之中二'];
                       $("#oddValue").text(bet.odd);
                       $("#nextOddValue").text(nextBet.odd);
                       $(".nextOddValue").show();
                   }

                    $("#lhc_title").text(title);
                    $("#minNum").text(minNum);
                    $("#index").val(index);

                    //_this.templateOdd(data);
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

            sessionStorage.betForm = JSON.stringify(betForm);
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
            var index = $("#index").val();
            var playCode = $("#playCode"+index).val();
            var betCode = $("a.mui-active[data-subCode]").attr("data-subCode");
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
        //组合函数
        combination : function (arr, size) {
            var allResult = [];
            if(arr.length >= size){
                var temp = new Array(size)
                temp[size-1]="";
                this.combinationSelect(allResult,arr,0,temp,0);
            }
            return allResult;
        },
        combinationSelect : function(allResult,dataList,dataIndex,resultCode,resultIndex){
            var resultLen = resultCode.length;
            var resultCount = resultIndex + 1;
            if (resultCount > resultLen) { // 全部选择完时，输出组合结果
                allResult.push(resultCode.join(","));
                return;
            }
            var count = dataList.length + resultCount - resultLen;
            for (var i = dataIndex; i < count; i++) {
                resultCode[resultIndex] = dataList[i];
                this.combinationSelect(allResult,dataList, i + 1, resultCode, resultIndex + 1);
            }
        }
    });
});