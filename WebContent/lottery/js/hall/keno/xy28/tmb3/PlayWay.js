define(['site/hall/common/PlayWay'], function (PlayWay) {
    return PlayWay.extend({
        //大彩种
        type: null,
        //小彩种
        code: null,
        //基本路径
        baseUrl: null,
        init: function () {
            this.type = $('[name=type]').val();
            this.code = $('[name=code]').val();
            this.baseUrl = root + '/' + this.type;
            this._super();
        },
        bindButtonEvents: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            page.refreshView();
        },
        /** 获取注单 */
        getBetOrder: function () {
            var _this = this;
            var betForm = {
                code: _this.code,
                totalMoney: 0,
                betOrders: [],
                quantity: 0
            };
            var betAmount = $('input#inputMoney').val();
            var betNumArray = [];
            $(".main-left .table-common input:checked").each(function () {
                var str = $(this).attr('data-bet-num');
                betNumArray.push(Number(str));

            });
            betNumArray.sort(function (a, b) {
                return a - b;
            });
            if (3 != betNumArray.length) {
                alert("只能选择3个号码!");
                return;
            }
            if (betAmount < 1) {
                alert("请输入下注金额!");
                return;
            }
            var betNums = '';
            var count = 0;
            for (var j = 0, len = betNumArray.length; j < len; j++) {
                if (betNumArray[j] || betNumArray[j] == 0) {
                    if (count == 0) {
                        betNums = betNumArray[j];
                    } else {
                        betNums = betNums + "," + betNumArray[j];
                    }
                    count++;
                }
            }
            //改为attr取值，防止值变动，这里的$(this).data值不变
            betForm.betOrders.push({
                expect: $('i#expect').text(),
                code: _this.code,
                betCode: $(".main-left .table-common input").first().attr('data-bet-code'),
                playCode: $(".main-left .table-common input").first().attr('data-play'),
                betNum: betNums,
                odd: $(".main-left .table-common input").first().attr("data-odds"),
                betAmount: betAmount,
                memo: betNums
            });
            betForm.totalMoney = add(betForm.totalMoney, betAmount);
            betForm.quantity = add(betForm.quantity, 1);
            return betForm;
        },
        //点击投注选项
        bindTdInput: function () {

        }
    })
});