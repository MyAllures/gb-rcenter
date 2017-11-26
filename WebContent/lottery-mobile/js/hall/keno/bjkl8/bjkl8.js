define(['site/hall/keno/bjkl8/PlayWay-xywf', 'site/plugin/template'], function (PlayWay, Template) {
    return PlayWay.extend({
        init: function () {
            this._super();
        },

        showTable : function(){
            var BetCode=$("#gfwfBetCode").val();
            var BetCode1="选5";
            if(BetCode=="selection5"){
                BetCode1="选5";
            }else if(BetCode=="selection4"){
                BetCode1="选4";
            }else if(BetCode=="selection3"){
                BetCode1="选3";
            }else if(BetCode=="selection2"){
                BetCode1="选2";
            }else if(BetCode=="selection1"){
                BetCode1="选1";
            }

            $("a[data-code='"+BetCode+"']").addClass("mui-active");
            $("a[data-code='s5']").addClass("mui-active");
            $(".x_3.gfwf-playName").text(BetCode1);
            $("span.x_1.gfwf-tit").text(BetCode1);
            $(".s-title.title1 span").text(BetCode1);
            $(".s-title.title2 span").text(BetCode1);
            $("#toobarTitle").text("传统玩法-"+BetCode1);
            if (this.os == 'app_android' && isLotterySite == 'true') {
                window.gamebox.setTitle('传统玩法-'+BetCode1);
            }
            $("a[data-code='s5'] span").text(BetCode1);
        },

        bindTdInput: function (obj) {
            var flag = $(obj).is('.not-selected');
            if (!flag) {
                $(obj).toggleClass('mui-active');
            }
            var numsLength = $('#numsLength').attr('numsLength');
            var realNumLength = $("div.bet-table-list td.mui-active").length;
            if(realNumLength != undefined && numsLength == realNumLength){
                $("#quantity").text(1);
            }else{
                $("#quantity").text(0);
            }
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
                    $(".title-odds[data-subCode]").each(function () {
                        var subCode = $(this).attr("data-subCode");
                        var $span = $(this).find("span[data-bet-num]");
                        $span.each(function () {
                            var betNum = $(this).attr('data-bet-num');
                            var thisData = data[subCode];
                            var bet = thisData[betNum];

                            $(this).attr("data-odds", bet.odd);
                            $(this).attr("data-bet-code", bet.betCode);
                            $(this).text(bet.odd);
                        })
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
            $("div.bet-table-list td.mui-active").each(function () {
                betNumArray.push($(this).attr('data-bet-num'));
            });
            var numsLength = $('#numsLength').attr('numsLength');
            if (betNumArray.length != numsLength) {
                this.toast("只能选择" + numsLength + "个号码!");
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
                quantity: 0,
                totalMoney: 0
            };
            var betNumArray = [];
            $("div.bet-table-list td.mui-active").each(function () {
                betNumArray.push($(this).attr('data-bet-num'));
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
            var betOdd = $(".title-odds[data-subCode]").find("span[data-bet-num]").first().attr("data-odds");
            var betCode = $(".title-odds[data-subCode]").find("span[data-bet-num]").first().attr("data-bet-code");
            betForm.betOrders.push({
                code: code,
                expect: expect,
                betAmount: betAmount,
                betCode: betCode,
                playCode: $('#numsLength').attr('data-play'),
                betNum: betNums,
                odd: betOdd,
                memo: betNums
            });
            betForm.totalMoney = betForm.totalMoney + betAmount;
            betForm.quantity = betForm.quantity + 1;

            return betForm;
        }
    });
});