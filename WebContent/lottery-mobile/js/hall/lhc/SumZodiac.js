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
            this.resetBet();
            var url = root + '/' + this.type + '/' + this.code + '/' + this.betCode + 'Odd.html';
            var subCode = $("a.mui-active[data-subCode]").attr("data-subCode");
            var title = $("a.mui-active[data-subCode]").text();
            var minNum = $("a.mui-active[data-subCode]").attr("min-num");
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
            var playCode = $("#playCode").val();
            var betCode = $("a.mui-active[data-subCode]").attr("data-subCode");
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
        combinationNum : function(m,n) {
            var o = 1;
            var j = m - n + 1;
            while (m >= j) {
                o *= m--;
            }
            if(o==0){
                return 0;
            }
            while (n >= 1) {
                o /= n--;
            }
            return o;
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