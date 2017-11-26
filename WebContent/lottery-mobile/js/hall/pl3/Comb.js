/**
 * 组合
 */
define(['site/hall/pl3/PlayWay-xywf'], function (PlayWay) {
    return PlayWay.extend({
        _this: null,
        init: function () {
            _this = this;
            this._super();
        },

        showTable : function(){
            var gfwfBetCode=$("#gfwfBetCode").val();
            $("a[data-code='comb']").addClass("mui-active");
            $("a[data-code='"+gfwfBetCode+"']").addClass("mui-active");
            $("div.s-menu.second").hide();
            $("#zuhe").show();
            $("span.x_1.gfwf-tit").text(gfwfBetCode);
            $(".s-title.title1 span").text(gfwfBetCode);
            $("#toobarTitle").text("传统玩法-组合");
            if (this.os == 'app_android' && isLotterySite == 'true') {
                window.gamebox.setTitle('传统玩法-组合');
            }
            $(".x_3.gfwf-playName").text(gfwfBetCode)
            $(".s-title.title2 span").text(gfwfBetCode);
        },

        /**
         * 绑定事件
         */
        bindButtonEvents: function () {
            var _this = this;

            mui("body").off('tap', 'div.bet-table-list td,div.bet-table-list .n-btn').on('tap', 'div.bet-table-list td,div.bet-table-list .n-btn', function () {
                _this.bindTdInput($(this));
            });

            //清除下注项
            mui("body").off('tap','a#del-bet1').on('tap', 'a#del-bet1', function () {
                page.resetBet();
            });
            //投注
            mui("body").off('tap','a#show-t').on("tap", 'a#show-t', function () {
                _this.betOrder();
            });

            //取消下注
            mui("body").off('tap','#cancel').on("tap", "#cancel", function () {
                $("#dingdan").html('');
                $("#dingdan").removeClass('mui-active');
            });
            //确认投注
            mui("body").off('tap','#confirmOrder').on("tap", "#confirmOrder", function () {

                if(_this.checkJinE()){
                    _this.confirmOrder(_this.betForm);
                }
            });

            //清除下注按钮点击事件
            mui("body").off('tap','a#del-bet').on('tap', 'a#del-bet', function () {
                $(".screen-munber a").removeClass("mui-active");
            });
        },


        //点击投注选项
        bindTdInput: function (thiz) {
            this._super(thiz);
            var length = 1;
            $("div.comb-div:visible .screen-munber").each(function () {
                length = length * $(this).find(".mui-active").length;
            });
            if (length > 1) {
                length = 0;
            }
            if(page.isOpen) {
                $("#quantity").text(length);
            }else{
                $("#quantity").text(0);
            }


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
        },


        getOdds: function () {
            var code=$("#zuhe a.main.mui-active").attr("data-bet-code");
            var url = root + '/' + this.type + '/' + this.code + '/getOdds.html';
            mui.ajax(url, {
                dataType: 'json',
                data: {betCode: code},
                type: 'POST',
                success: function (data) {
                    //todo 增加data判空
                    if(code=="comb_two"){
                        if (_this.setTwoOddList) {
                            _this.setTwoOddList(data);
                        }
                    }else{
                        if (_this.setThreeOddList) {
                            _this.setThreeOddList(data);
                        }
                    }
                    _this.hideLoading();
                }
            })
        },
        getBetOrder: function () {
            var code=$("#zuhe a.main.mui-active").attr("data-bet-code");
            if(code=="comb_two"){
                return this.getTwoBetOrder();
            }else{
                return this.getThreeBetOrder();
            }

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