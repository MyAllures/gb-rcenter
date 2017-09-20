define(['site/hall/PlayWay', 'site/plugin/template'], function (PlayWay, Template) {
    return PlayWay.extend({
        init: function () {
            this._super();
        },
        getRandomNumber: function (len) {
            var list = [];
            var sum = 0;
            for (var i = 0; i < len; ++i) {
                var value = Math.floor(Math.random() * 10);
                list[i] = value;
                sum += value;
            }
            var tmpStr = Template('template_lastOpenCode', {numArr: list, sum: sum});
            return tmpStr;
        }, /**
         * 展示最近开奖记录
         */
        showRecentHistory: function (data) {
            var openList = '';
            $.each(data, function (index, value) {
                var numArr = value.openCode ? value.openCode.split(",") : [];
                var sum = 0;
                $.each(numArr, function (ind, val) {
                    sum += parseInt(val);
                });
                openList = openList + Template('template_recentHistory', {
                        number: value.expect,
                        list: numArr,
                        len: numArr.length,
                        sum: sum
                    });
            });
            $("#recentHistory").html(openList);
        },
        /**
         * 获取赔率
         */
        getOdds: function () {
            var url = root + '/' + this.type + '/' + this.code + '/getOdd.html';
            var _this = this;
            mui.ajax(url, {
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    $(".bet-table-list[data-subCode]").each(function () {
                        var subCode = $(this).attr("data-subCode");
                        var $tdBet = $(this).find("td[data-bet-num]");
                        var bet = data[subCode]["特码包三"];
                        $tdBet.each(function () {

                            $(this).attr("data-odds", bet.odd);
                            $(this).attr("data-bet-code", bet.betCode);
                            $(this).children("span[name=odd]").text(bet.odd);
                        });
                        $("#tmb3odd").text(bet.odd);
                    });
                }
            })
        },
        showLastOpenCode: function (openCodeArr) {
            var tmpStr = '';
            var sum = 0;
            var colorBg = 'lottery-ball';

            $.each(openCodeArr, function (index, value) {
                sum += parseInt(value);

                if (index < 2) {
                    tmpStr += '<span  class="lottery-ball">' + value + '</span><span class="plus">+</span>';
                } else {
                    tmpStr += '<span  class="lottery-ball">' + value + '</span><span class="plus">=</span><span class="lottery-ball xy28-num" num="' + sum + '">' + sum + '</span>';
                }

            });
            $("#lastOpenCode").html(tmpStr);
        },
        /**
         * 验证是否符合下注条件
         * @returns {boolean}
         */
        checkBetOrder: function () {
            var isValid = this._super();
            if (!isValid) {
                return false;
            }
            var betNumArray = [];
            $("div.bet-table-list .mui-active").each(function () {
                betNumArray.push($(this).attr('data-bet-num'));
            });
            if (betNumArray.length != 3) {
                this.toast("只能选择" + 3 + "个号码!");
                return false;
            }
            return true;
        },
        /**
         * 获取注单
         * @returns {{code: *, expect: (*|jQuery), type: *, betOrders: Array}}
         */
        getBetOrder: function () {
            var code = this.code;
            var expect = $('font#expect').text();
            var type = this.type;
            var betAmount = Number($("input#inputMoney").val());
            var betForm = {
                code: code,
                expect: expect,
                type: type,
                betOrders: [],
                quantity: 1,
                totalMoney: betAmount
            };
            var betNumArray = [];
            var betCode;
            var playCode;
            $("div.bet-table-list .mui-active").each(function () {
                betNumArray.push($(this).attr('data-bet-num'));
                betCode = $(this).attr("data-bet-code");
                playCode = $(this).attr("data-play");
            });
            betNumArray.sort(function (a, b) {
                return a - b;
            });
            var betNums = '';
            for (var i = 0; i < betNumArray.length; i++) {
                if (betNums == '') {
                    betNums = betNumArray[i];
                } else {
                    betNums = betNums + "," + betNumArray[i];
                }
            }
            betForm.betOrders.push({
                code: code,
                expect: expect,
                betAmount: betAmount,
                betCode: betCode,
                playCode: playCode,
                betNum: betNums,
                odd: $("#tmb3odd").text(),
                memo: betNums
            });
            return betForm;
        },
        bindTdInput: function (obj) {
            var flag = $(obj).is('.not-selected');
            if (!flag) {
                $(obj).toggleClass('mui-active');
            }
            if ($("div.bet-table-list .mui-active").length == 3) {
                $("#quantity").text(1);
            }
        }
    });
});