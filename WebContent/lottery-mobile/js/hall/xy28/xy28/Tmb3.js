define(['site/hall/xy28/xy28/PlayWay-xywf', 'site/plugin/template'], function (PlayWay, Template) {
    return PlayWay.extend({
        init: function () {
            this._super();
        },
        showTable : function(){
            var BetCode=$("#gfwfBetCode").val();
            var BetCode1="特码包三";
            $("a[data-code='"+BetCode+"']").addClass("mui-active");
            $("a[data-code='hhs']").addClass("mui-active");
            $(".x_3.gfwf-playName").text(BetCode1);
            $("span.x_1.gfwf-tit").text(BetCode1);
            $(".s-title.title1 span").text(BetCode1);
            $(".s-title.title2 span").text(BetCode1);
            $("#toobarTitle").text("传统玩法-"+BetCode1);
            if (this.os == 'app_android' && isLotterySite == 'true') {
                window.gamebox.setTitle("传统玩法-"+BetCode1);
            }
            $("a[data-code='hhs'] span").text(BetCode1);
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
                // $("#quantity").text(0);
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
            }else{
                $("#quantity").text(0);
            }
        }
    });
});