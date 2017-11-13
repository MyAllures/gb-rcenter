define(['site/hall/pl3/PlayWay-xywf'], function (PlayWay) {
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
                    $(this).removeClass("mui-active")
                });
                $("#quantity").text(0);
                var betCode = $(this).attr("data-bet-code");
                if (betCode == "pl3_hundred" || betCode == "pl3_ten" || betCode == "pl3_one") {
                    _this.getOdds(betCode, _this.setOneOddList);
                } else if (betCode == "pl3_hundred_ten" || betCode == "pl3_hundred_one" || betCode == "pl3_ten_one") {
                    _this.getOdds(betCode, _this.setTwoOddList);
                } else if (betCode == "pl3_hundred_ten_one") {
                    _this.getOdds(betCode, _this.setThreeOddList);
                }
            })
        },//点击投注选项
        bindTdInput: function (thiz) {
            this._super(thiz);
            var betCode = $("a.mui-active[data-bet-code]").attr("data-bet-code");
            if (betCode == "pl3_hundred_ten" || betCode == "pl3_hundred_one" || betCode == "pl3_ten_one" || betCode == "pl3_hundred_ten_one") {
                var length = 1;
                $("div.fix-div:visible li.screen-munber").each(function () {
                    length = length * $(this).find(".mui-active").length;
                });
                $("#quantity").text(length);
            }
        },
        setOneOddList: function (data) {
            var $oneWordFix = $("div.one-word-fix");
            var title = $("a.mui-active[data-bet-code]").html();
            $oneWordFix.find("div.bet-title").each(function () {
                $(this).html(title);
            });
            var list = data.obj;
            $oneWordFix.find("td[data-bet-num]").each(function () {
                var betNum = $(this).attr("data-bet-num");
                var lottery = list[betNum];
                $(this).attr("data-odds", lottery.odd);
                $(this).attr("data-bet-code", lottery.betCode);
                $(this).attr("data-name", title + "-" + betNum);
                $(this).find("span[name]").html(lottery.odd);
            });
            $oneWordFix.css('display', 'block');
        }, setTwoOddList: function (data) {
            var $twoWordFix = $("div.two-word-fix");
            var title = $("a.mui-active[data-bet-code]").html();
            $twoWordFix.find(".title-play-way").html(title);
            var betCode = $("a.mui-active[data-bet-code]").attr("data-bet-code");
            var titles = [];
            if (betCode == "pl3_hundred_ten") {
                titles[0] = "百位";
                titles[1] = "十位";
            } else if (betCode == "pl3_hundred_one") {
                titles[0] = "百位";
                titles[1] = "个位";
            } else if (betCode == "pl3_ten_one") {
                titles[0] = "十位";
                titles[1] = "个位";
            }
            if (titles.length != 0) {
                $twoWordFix.find("div.title0").html(titles[0]);
                $twoWordFix.find("div.title1").html(titles[1]);
                var lottery = data.obj;
                var $lotteryClass = $twoWordFix.find("input.lottery");

                $lotteryClass.attr("data-odds", lottery.odd);
                $lotteryClass.attr("data-bet-code", lottery.betCode);
                $lotteryClass.attr("data-name", title);
                $twoWordFix.find("span.title-play-way").html(title);
                $twoWordFix.find("span.title-odd").html(lottery.odd);

                $twoWordFix.css('display', 'block');
            }
        }, setThreeOddList: function (data) {
            var $threeWordFix = $("div.three-word-fix");
            var title = $("a.mui-active[data-bet-code]").html();
            $threeWordFix.find(".title-play-way").html(title);
            var lottery = data.obj;
            var $lotteryClass = $threeWordFix.find("input.lottery");

            $lotteryClass.attr("data-odds", lottery.odd);
            $lotteryClass.attr("data-bet-code", lottery.betCode);
            $lotteryClass.attr("data-name", title);
            $threeWordFix.find("span.title-play-way").html(title);
            $threeWordFix.find("span.title-odd").html(lottery.odd);

            $threeWordFix.css('display', 'block');
        },
        getOdds: function (betCode, callback) {
            if (betCode == undefined && callback == undefined) {
                betCode = "pl3_hundred";
                callback = _this.setOneOddList;
            }
            $("div.fix-div").each(function () {
                $(this).css('display', 'none');
            });
            var url = root + '/' + this.type + '/' + this.code + '/getOdds.html';
            mui.ajax(url, {
                dataType: 'json',
                data: {betCode: betCode},
                type: 'POST',
                success: function (data) {
                    if (typeof callback == "function") {
                        callback(data);
                    }
                    _this.hideLoading();
                }
            })
        },
        getBetOrder: function () {
            var betCode = $("a.mui-active[data-bet-code]").attr("data-bet-code");
            if (betCode == "pl3_hundred" || betCode == "pl3_ten" || betCode == "pl3_one") {
                return this._super();
            } else if (betCode == "pl3_hundred_ten" || betCode == "pl3_hundred_one" || betCode == "pl3_ten_one" || betCode == "pl3_hundred_ten_one") {
                return this.getTwoAndThreeBetOrder();
            }
            return undefined;
        },
        getTwoAndThreeBetOrder: function () {
            var code = this.code;
            var expect = $('font#expect').text();
            var type = this.type;
            var allGroup = this.getAllGroup();
            if (typeof allGroup != 'object') {
                return;
            }
            var betForm = {
                code: code,
                expect: expect,
                type: type,
                betOrders: [],
                quantity: 0,
                totalMoney: 0
            };
            var $lotteryClass = $("div.fix-div:visible input.lottery");
            var betCode = $lotteryClass.attr("data-bet-code");
            var odd = $lotteryClass.attr("data-odds");
            var playCode = $lotteryClass.attr("data-play");
            var memo = $lotteryClass.attr("data-name");
            var betAmount = Number($("input#inputMoney").val());
            for (var index in allGroup) {
                var betNum = allGroup[index];
                betForm.betOrders.push({
                    code: code,
                    expect: expect,
                    betAmount: betAmount,
                    betCode: betCode,
                    playCode: playCode,
                    betNum: betNum,
                    odd: odd,
                    memo: memo + "-" + betNum
                });
                betForm.totalMoney = betForm.totalMoney + betAmount;
                betForm.quantity = betForm.quantity + 1;
            }
            return betForm;
        },
        getAllGroup: function () {
            if ($("div.fix-div:visible .mui-active").length == 0) {
                this.toast("请选择");
                return;
            }
            var groupList = [];
            var flag = false;
            var i = 0;
            $("div.fix-div:visible .screen-munber").each(function () {
                var inputList = [];
                var j = 0;
                $(this).find(".mui-active").each(function () {
                    inputList[j++] = $(this).attr("data-name");
                });
                if (inputList.length == 0) {
                    flag = true;
                    return;
                }
                groupList[i++] = inputList;
            });
            if (flag) {
                this.toast("至少选择一组号码");
                return;
            }
            var allBetGroup = [];
            this.doAllBetGroup(groupList, 0, allBetGroup, []);
            return allBetGroup;
        },//递归获取所有勾选号码组合
        doAllBetGroup: function (arr, depth, allBetGroup, betGroup) {
            for (var i = 0; i < arr[depth].length; i++) {
                betGroup[depth] = arr[depth][i]
                if (depth != arr.length - 1) {
                    this.doAllBetGroup(arr, depth + 1, allBetGroup, betGroup);
                } else {
                    allBetGroup.push(betGroup.join(''))
                }
            }
        }
    });
});