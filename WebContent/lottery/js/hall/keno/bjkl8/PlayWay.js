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
            var betNums = '';
            var betAmount = $('input#inputMoney').val();
            var numsLength = $('#numsLength').attr('numsLength');
            var betNumArray = [];
            $(".main-left .table-common td.bg-yellow").each(function () {
                betNumArray.push($(this).attr('data-bet-num'));
            });

            betNumArray.sort();
            if (betNumArray.length != numsLength) {
                layer.msg("只能选择" + numsLength + "个号码!");
                return;
            }
            if (betAmount < 1) {
                layer.msg("请输入下注金额!");
                return;
            }
            for (j = 0, len = betNumArray.length; j < len; j++) {
                if (betNums == '') {
                    betNums = betNumArray[j];
                } else {
                    betNums = betNums + "," + betNumArray[j];
                }
            }
            //改为attr取值，防止值变动，这里的$(this).data值不变
            betForm.betOrders.push({
                expect: $('i#expect').text(),
                code: _this.code,
                betCode: $(".main-left .table-common td").first().attr('data-bet-code'),
                playCode: $(".main-left .table-common td").first().attr('data-play'),
                betNum: betNums,
                odd: $(".main-left .table-common td").first().attr("data-odds"),
                betAmount: betAmount,
                memo: betNums
            });
            betForm.totalMoney = add(betForm.totalMoney, betAmount);
            betForm.quantity = add(betForm.quantity, 1);
            return betForm;
        }

    })
})