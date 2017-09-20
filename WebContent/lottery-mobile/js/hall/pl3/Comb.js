/**
 * 组合
 */
define(['site/hall/pl3/PlayWay'], function (PlayWay) {
    return PlayWay.extend({
        _this: null,
        init: function () {
            _this = this;
            this._super();
        },
        bindButtonEvents: function () {
            this._super();
            mui(this.formSelector).on("tap", "a.mui-control-item[data-bet-code]", function () {
                $("div.bet-table .mui-active").each(function () {
                    $(this).removeClass("mui-active");
                });
                $("#quantity").text(0);
                var betCode = $(this).attr("data-bet-code");
                if (betCode == "comb_one") {
                    _this.getOdds(betCode, _this.setOneOddList);
                } else if (betCode == "comb_two") {
                    _this.getOdds(betCode, _this.setTwoOddList);
                } else if (betCode == "comb_three") {
                    _this.getOdds(betCode, _this.setThreeOddList);
                }
            })
        },
        //点击投注选项
        bindTdInput: function (thiz) {
            this._super(thiz);
            var betCode = $("a.mui-active[data-bet-code]").attr("data-bet-code");
            if (betCode == "comb_two" || betCode == "comb_three") {
                var length = 1;
                $("div.comb-div:visible .screen-munber").each(function () {
                    length = length * $(this).find(".mui-active").length;
                });
                if (length > 1) {
                    length = 1;
                }
                $("#quantity").text(length);
            }
        },
        setOneOddList: function (data) {
            var $oneWordComb = $("div.one-word-comb");
            var title = $("a.mui-active[data-bet-code]").html();
            $oneWordComb.find("div.bet-title").each(function () {
                $(this).html(title);
            });
            var list = data.obj;
            $oneWordComb.find("td[data-bet-num]").each(function () {
                var betNum = $(this).attr("data-bet-num");
                var lottery = list[betNum];
                $(this).attr("data-odds", lottery.odd);
                $(this).attr("data-bet-code", lottery.betCode);
                $(this).attr("data-name", title + "-" + betNum);
                $(this).find("span[name]").html(lottery.odd);
            });
            $oneWordComb.css('display', 'block');
        },
        setTwoOddList: function (data) {
            var $twoWordComb = $("div.two-word-comb");
            var twoSameLottery = data.obj['二同'];
            var $twoSame = $twoWordComb.find("input.twoSame");
            $twoSame.attr("data-odd", twoSameLottery.odd);
            $twoSame.attr("data-bet-code", twoSameLottery.betCode);
            $twoWordComb.find("span.two-same-odd").html(twoSameLottery.odd);

            var twoDiffLottery = data.obj['二不同'];
            var $twoDiff = $twoWordComb.find("input.twoDiff");
            $twoDiff.attr("data-odd", twoDiffLottery.odd);
            $twoDiff.attr("data-bet-code", twoDiffLottery.betCode);
            $twoWordComb.find("span.two-diff-odd").html(twoDiffLottery.odd);

            $twoWordComb.css('display', 'block');
        },
        setThreeOddList: function (data) {
            var $threeWordComb = $("div.three-word-comb");

            var theeSameLottery = data.obj['三同'];
            var $threeSame = $threeWordComb.find("input.threeSame");
            $threeSame.attr("data-odd", theeSameLottery.odd);
            $threeSame.attr("data-bet-code", theeSameLottery.betCode);
            $threeWordComb.find("span.three-same-odd").html(theeSameLottery.odd);

            var threeGroup3Lottery = data.obj['组三'];
            var $threeGroup3 = $threeWordComb.find("input.threeGroup3");
            $threeGroup3.attr("data-odd", threeGroup3Lottery.odd);
            $threeGroup3.attr("data-bet-code", threeGroup3Lottery.betCode);
            $threeWordComb.find("span.three-group3-odd").html(threeGroup3Lottery.odd);

            var threeGroup6Lottery = data.obj['组六'];
            var $threeGroup6 = $threeWordComb.find("input.threeGroup6");
            $threeGroup6.attr("data-odd", threeGroup6Lottery.odd);
            $threeGroup6.attr("data-bet-code", threeGroup6Lottery.betCode);
            $threeWordComb.find("span.three-group6-odd").html(threeGroup6Lottery.odd);

            $threeWordComb.css('display', 'block');
        },
        getOdds: function (betCode, callback) {
            $("#quantity").text(0);
            if (betCode == undefined && callback == undefined) {
                betCode = "comb_one";
                callback = _this.setOneOddList;
            }
            $("div.comb-div").each(function () {
                $(this).css('display', 'none');
            });
            var url = root + '/' + this.type + '/' + this.code + '/getOdds.html';
            mui.ajax(url, {
                dataType: 'json',
                data: {betCode: betCode},
                type: 'POST',
                success: function (data) {
                    //todo 增加data判空
                    if (callback) {
                        callback(data);
                    }
                    _this.hideLoading();
                }
            })
        },
        getBetOrder: function () {
            var betCode = $("a.mui-active[data-bet-code]").attr("data-bet-code");
            if (betCode == "comb_one") {
                return this._super();
            } else if (betCode == "comb_two") {
                return this.getTwoBetOrder();
            } else if (betCode == "comb_three") {
                return this.getThreeBetOrder();
            }
            return undefined;
        },
        getTwoBetOrder: function () {
            var betNum = this.getBetNumArray();
            if (typeof betNum != 'object') {
                return;
            }
            var $betType = $("div.comb-div:visible input.twoDiff");
            if (betNum[0] == betNum[1]) {
                $betType = $("div.comb-div:visible input.twoSame");
            }
            return this.getBetForm($betType, betNum.join(""));
        },
        getThreeBetOrder: function () {
            var betNum = this.getBetNumArray();
            if (typeof betNum != 'object') {
                return;
            }
            var $betType = $("div.comb-div:visible input.threeGroup6");
            if (betNum[0] == betNum[1] && betNum[0] == betNum[2] && betNum[1] == betNum[2]) {
                $betType = $("div.comb-div:visible input.threeSame");
            } else if (betNum[0] == betNum[1] || betNum[0] == betNum[2] || betNum[1] == betNum[2]) {
                $betType = $("div.comb-div:visible input.threeGroup3");
            }
            return this.getBetForm($betType, betNum.join(""));
        },
        getBetNumArray: function () {
            if ($("div.comb-div:visible .mui-active").length == 0) {
                this.toast("请选择");
                return;
            }
            var flag = false;
            var betNum = [];
            var i = 0;
            $("div.comb-div:visible .screen-munber").each(function () {
                if ($(this).find(".mui-active").length != 1) {
                    flag = true;
                    return;
                }
                betNum[i++] = $(this).find(".mui-active").attr("data-name");
            });
            if (flag) {
                this.toast("仅且只能选择一组号码");
                return;
            }
            return betNum;
        },
        getBetForm: function ($betType, betNum) {
            var betAmount = Number($("input#inputMoney").val());
            var betForm = {
                code: this.code,
                expect: $('font#expect').text(),
                type: this.type,
                betOrders: [],
                quantity: 1,
                totalMoney: betAmount
            };
            betForm.betOrders.push({
                code: this.code,
                expect: $('font#expect').text(),
                betAmount: betAmount,
                betCode: $betType.attr("data-bet-code"),
                playCode: $betType.attr("data-play"),
                betNum: betNum,
                odd: $betType.attr("data-odd"),
                memo: $betType.attr("data-name") + "-" + betNum
            });
            return betForm;
        }
    });
});